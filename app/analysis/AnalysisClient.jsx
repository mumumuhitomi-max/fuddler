"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import PageContainer from "../../components/PageContainer";
import FortunePanel from "../../components/FortunePanel";
import PalyouProfile from "../../components/PalyouProfile";
import PalyouBehaviorTimeline from "../../components/PalyouBehaviorTimeline";

export default function AnalysisClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const palyouId = searchParams.get("palyou_id");

  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!palyouId) return;
    fetchRecords();
  }, [palyouId]);

  async function fetchRecords() {
    setLoading(true);

    const { data } = await supabase
      .from("palyou_records")
      .select("*")
      .eq("palyou_id", palyouId)
      .order("created_at", { ascending: false });

    const list = data || [];
    setRecords(list);

    let buy = 0, sell = 0, swap = 0;
    list.forEach(r => {
      if (r.action_type === "买入") buy++;
      if (r.action_type === "卖出") sell++;
      if (r.action_type === "转换") swap++;
    });

    const changes = [];
    let last = null;
    list.forEach(r => {
      if (!last) {
        last = r.action_type;
        return;
      }
      if (r.action_type !== last) {
        changes.push({
          from: last,
          to: r.action_type,
          time: r.created_at,
        });
        last = r.action_type;
      }
    });

    setSummary({
      buy,
      sell,
      swap,
      total: list.length,
      palyou_id: palyouId,
      behavior_changes: changes.slice(-3),
    });

    setLoading(false);
  }

  // ===== 没有 palyou_id 的兜底 =====
  if (!palyouId) {
    return (
      <PageContainer>
        <div className="glass-card" style={{ marginTop: 40 }}>
          <h2 className="section-title">投资分析</h2>
          <p className="text-subtitle">
            请从「盘友操作」中点击某一位盘友，进入其操作分析。
          </p>
          <button
            className="primary-button"
            onClick={() => router.push("/palyou")}
            style={{ marginTop: 16 }}
          >
            去盘友操作
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section className="analysis-hero">
        <h1 className="text-display">盘友 {palyouId} 的操作分析</h1>
        <p className="text-subtitle">
          基于该盘友的真实操作记录，解析其交易节奏与行为倾向。
        </p>
      </section>

      {loading && <div className="glass-card">加载中…</div>}

      {!loading && summary && (
        <>
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

          <FortunePanel
            summary={summary}
            behaviorChanges={summary.behavior_changes}
          />
        </>
      )}
    </PageContainer>
  );
}