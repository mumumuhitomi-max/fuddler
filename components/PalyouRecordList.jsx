"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function PalyouRecordList({
  refreshKey = 0,
  filters,
  onData,
}) {
  const [records, setRecords] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchRecords();
  }, [refreshKey, filters]);

  async function fetchRecords() {
    let query = supabase
      .from("palyou_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.palyouId) {
      query = query.eq("palyou_id", filters.palyouId);
    }
    if (filters?.actionType) {
      query = query.eq("action_type", filters.actionType); // ✅
    }
    if (filters?.fundName) {
      query = query.ilike("fund_code", `%${filters.fundName}%`); // ✅
    }

    const { data } = await query;
    setRecords(data || []);
    onData?.(data || []);
  }

  return (
    <div className="record-list">
      {records.map((r) => (
        <div
          key={r.id}
          className="record-card clickable"
          onClick={() =>
            router.push(`/analysis?palyou_id=${r.palyou_id}`)
          }
        >
          <div className="record-main">
            <div>
              <div className="record-palyou">
                {r.palyou_id || "未知盘友"}
              </div>
              <div className="record-action-row">
                <span>{r.action_type}</span>
                <span>{r.fund_code || "未知基金"}</span>
              </div>
            </div>

            <div className="record-right">
              {r.amount && (
                <div>¥{Number(r.amount).toLocaleString()}</div>
              )}
            </div>
          </div>

          <div className="record-meta">
            {new Date(r.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}