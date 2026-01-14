"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import PageContainer from "../../components/PageContainer";
import FortunePanel from "../../components/FortunePanel";
import PalyouProfile from "../../components/PalyouProfile";
import PalyouBehaviorTimeline from "../../components/PalyouBehaviorTimeline";

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const palyouId = searchParams.get("palyou_id");

  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({
    buy: 0,
    sell: 0,
    swap: 0,
    total: 0,
    palyou_id: palyouId || null,
  });

  useEffect(() => {
    fetchRecords();
  }, [palyouId]);

  async function fetchRecords() {
    let query = supabase
      .from("palyou_records")
      .select("*")
      .order("created_at", { ascending: false });

    // ⭐ 关键：只分析该盘友
    if (palyouId) {
      query = query.eq("palyou_id", palyouId);
    }

    const { data } = await query;

    const list = data || [];
    setRecords(list);

    // 统计 summary
    let buy = 0;
    let sell = 0;
    let swap = 0;

    list.forEach((r) => {
      if (r.action === "买入") buy++;
      if (r.action === "卖出") sell++;
      if (r.action === "转换") swap++;
    });

    setSummary({
      buy,
      sell,
      swap,
      total: list.length,
      palyou_id: palyouId || null,
    });

    // ===== 计算行为变化点摘要 =====
    const changes = [];

    let lastMain = null;

    records.forEach((r) => {
      const action = r.action;
      if (!lastMain) {
        lastMain = action;
        return;
      }
      if (action !== lastMain) {
        changes.push({
          from: lastMain,
          to: action,
          time: r.created_at,
        });
        lastMain = action;
      }
    });

    setSummary((prev) => ({
      ...prev,
      behavior_changes: changes.slice(-3), // 只取最近 3 次
    }));
  }

  return (
    <PageContainer>
      {/* ===== Hero ===== */}
      <section className="analysis-hero">
        <h1 className="text-display">
          {palyouId ? `盘友 ${palyouId} 的操作分析` : "投资分析"}
        </h1>
        <p className="text-subtitle">
          {palyouId
            ? "基于该盘友的真实操作记录，解析其交易节奏与行为倾向。"
            : "数据给你事实，解读帮你理解。"}
        </p>
      </section>

      {/* ===== Summary ===== */}
      <section className="glass-card summary-grid">
        <div>
          <div className="summary-label">总记录</div>
          <div className="summary-value">{summary.total}</div>
        </div>
        <div>
          <div className="summary-label">买入</div>
          <div className="summary-value">{summary.buy}</div>
        </div>
        <div>
          <div className="summary-label">卖出</div>
          <div className="summary-value">{summary.sell}</div>
        </div>
        <div>
          <div className="summary-label">转换</div>
          <div className="summary-value">{summary.swap}</div>
        </div>
      </section>
      
      <PalyouProfile summary={summary} />

      <PalyouBehaviorTimeline records={records} />

      {/* ===== AI Fortune ===== */}
      <FortunePanel
        summary={summary}
        behaviorChanges={summary.behavior_changes}
      />
    </PageContainer>
  );
}