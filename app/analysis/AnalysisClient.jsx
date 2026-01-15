"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import PageContainer from "../../components/PageContainer";
import FortunePanel from "../../components/FortunePanel";

export default function AnalysisClient() {
  const searchParams = useSearchParams();
  const palyouId = searchParams.get("palyou_id");

  const [summary, setSummary] = useState({
    buy: 0,
    sell: 0,
    swap: 0,
    total: 0,
    behavior_changes: [],
  });

  useEffect(() => {
    fetchData();
  }, [palyouId]);

  async function fetchData() {
    const { data: palyou } = await supabase
      .from("palyou_records")
      .select("*")
      .eq("palyou_id", palyouId);

    const { data: mine } = await supabase
      .from("my_records")
      .select("*")
      .eq("palyou_id", palyouId);

    const all = [...(palyou || []), ...(mine || [])].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    let buy = 0, sell = 0, swap = 0;
    const changes = [];
    let last = null;

    all.forEach((r) => {
      if (r.action_type === "买入") buy++;
      if (r.action_type === "卖出") sell++;
      if (r.action_type === "转换") swap++;

      if (last && last !== r.action_type) {
        changes.push({
          from: last,
          to: r.action_type,
          time: r.created_at,
        });
      }
      last = r.action_type;
    });

    setSummary({
      buy,
      sell,
      swap,
      total: all.length,
      behavior_changes: changes.slice(-3),
    });
  }

  return (
    <PageContainer>
      <section className="analysis-hero">
        <h1 className="text-display">
          盘友 {palyouId} 的操作分析
        </h1>
      </section>

      <FortunePanel
        summary={summary}
        behaviorChanges={summary.behavior_changes}
      />
    </PageContainer>
  );
}