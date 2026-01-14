"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function PalyouRecordList({ refreshKey = 0, palyouFilter }) {
  const [records, setRecords] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchRecords();
  }, [refreshKey, palyouFilter]);

  async function fetchRecords() {
    let query = supabase
      .from("palyou_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (palyouFilter?.palyou_id) {
      query = query.eq("palyou_id", palyouFilter.palyou_id);
    }
    if (palyouFilter?.action) {
      query = query.eq("action", palyouFilter.action);
    }
    if (palyouFilter?.fund_name) {
      query = query.ilike("fund_name", `%${palyouFilter.fund_name}%`);
    }

    const { data } = await query;
    setRecords(data || []);
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
          {/* 主信息行 */}
          <div className="record-main">
            <div className="record-left">
              <div className="record-palyou">{r.palyou_id || "未知盘友"}</div>

              <div className="record-action-row">
                <span className="record-action">{r.action}</span>
                <span className="record-fund-name">
                  {r.fund_name || "未知基金"}
                </span>
              </div>
            </div>

            <div className="record-right">
              {r.amount && (
                <div className="record-amount">
                  ¥{Number(r.amount).toLocaleString()}
                </div>
              )}
              <button className="record-edit">编辑</button>
            </div>
          </div>

          {/* 次信息 */}
          <div className="record-meta">
            {new Date(r.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}