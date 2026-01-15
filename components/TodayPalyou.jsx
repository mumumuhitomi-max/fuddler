"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useDataRefresh } from "../lib/useDataRefresh";

export default function TodayPalyou() {
  const [records, setRecords] = useState([]);
  const refreshKey = useDataRefresh();

  useEffect(() => {
    fetchTodayPalyou();
  }, [refreshKey]);

  async function fetchTodayPalyou() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const { data } = await supabase
      .from("palyou_records")
      .select("id, action_type, fund_code, created_at")
      .gte("created_at", start.toISOString())
      .order("created_at", { ascending: false });

    setRecords(data || []);
  }

  return (
    <div>
      <div className="section-title">今日盘友操作</div>

      {records.length === 0 && (
        <div className="empty-hint">今日暂无盘友操作。</div>
      )}

      {records.map((r) => (
        <div key={r.id} className="today-record">
          <div className="record-dot" />
          <div className="record-content">
            <div className="record-main">
              {r.action_type} · {r.fund_code || "未填写基金"}
            </div>
            <div className="record-sub">
              {new Date(r.created_at).toLocaleTimeString("zh-CN")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}