"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Sparkline from "./Sparkline";
import AnalysisRecordList from "./AnalysisRecordList";

export default function AnalysisSummary({ refreshKey, onSelectRecord }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("palyou_records")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("fetch summary error", error);
      setLoading(false);
      return;
    }

    const total = data.length;
    const buy = data.filter(d => d.action_type === "买入").length;
    const sell = data.filter(d => d.action_type === "卖出").length;
    const swap = data.filter(d => d.action_type === "转换").length;

    const rhythm = data.map(d => {
      if (d.action_type === "买入") return 1;
      if (d.action_type === "卖出") return -1;
      return 0;
    });

    setSummary({
      total,
      buy,
      sell,
      swap,
      timeline: data,
      rhythm,
    });

    setLoading(false);
  };

  // 🔥 关键：监听 refreshKey
  useEffect(() => {
    fetchSummary();
  }, [refreshKey]);

  if (loading) {
    return <div className="loading-hint">分析中…</div>;
  }

  if (!summary) return null;

  return (
    <div>
      <div className="summary-grid">
        <div className="summary-item">
          <div className="summary-label">总记录</div>
          <div className="summary-value">{summary.total}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">买入</div>
          <div className="summary-value">{summary.buy}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">卖出</div>
          <div className="summary-value">{summary.sell}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">转换</div>
          <div className="summary-value">{summary.swap}</div>
        </div>
      </div>

      <div className="summary-sparkline">
        <Sparkline
          data={summary.rhythm}
          records={summary.timeline}
          onSelect={onSelectRecord}
        />
      </div>

      <div className="summary-records">
        <div className="section-title">操作明细</div>
        <AnalysisRecordList
          records={summary.timeline}
          onSelect={onSelectRecord}
        />
      </div>
    </div>
  );
}