"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useDataRefresh } from "../lib/useDataRefresh";

export default function TodayPalyou() {
  const [records, setRecords] = useState([]);
  const refreshKey = useDataRefresh(); // 👈 监听全局刷新

  useEffect(() => {
    fetchTodayPalyou();
  }, [refreshKey]);

  async function fetchTodayPalyou() {
    // ⚠️ 这里先不严格卡 15:00，你后面可以再精修
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const { data } = await supabase
      .from("palyou_records")
      .select("id, action, fund_name, created_at")
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
              {r.action} · {r.fund_name || "未填写基金"}
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