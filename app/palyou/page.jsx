"use client";

import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PalyouInputPanel from "../../components/PalyouInputPanel";
import PalyouFilterBar from "../../components/PalyouFilterBar";
import PalyouSummary from "../../components/PalyouSummary";
import PalyouRecordList from "../../components/PalyouRecordList";
import { supabase } from "../../lib/supabaseClient";

export default function PalyouPage() {
  const [filters, setFilters] = useState({
    palyouId: "",
    actionType: "",
    fundName: "",
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const [records, setRecords] = useState([]);
  const [palyouOptions, setPalyouOptions] = useState([]);

  // 拉取已有盘友 ID，作为全局筛选项
  useEffect(() => {
    supabase
      .from("palyou_records")
      .select("palyou_id")
      .then(({ data }) => {
        if (data) {
          const ids = Array.from(
            new Set(data.map(d => d.palyou_id).filter(Boolean))
          );
          setPalyouOptions(ids);
        }
      });
  }, []);

  return (
    <PageContainer>
      {/* ===== Hero ===== */}
      <section className="hero space-y-2">
        <div className="text-display">盘友操作</div>
        <div className="text-subtitle">
          记录你观察到的盘友行为，而不是你自己的操作。
        </div>
      </section>

      {/* ===== 新增盘友操作 ===== */}
      <section className="space-y-4">
        <PalyouInputPanel
          onSuccess={() => setRefreshKey(v => v + 1)}
        />
      </section>

      {/* ===== 全局筛选 ===== */}
      <section className="space-y-2">
        <PalyouFilterBar
          filters={filters}
          onChange={setFilters}
          palyouOptions={palyouOptions}
        />
      </section>

      {/* ===== 操作总结 ===== */}
      <section className="space-y-2">
        <PalyouSummary records={records} />
      </section>

      {/* ===== 操作明细 ===== */}
      <section className="space-y-2">
        <PalyouRecordList
          filters={filters}
          refreshKey={refreshKey}
          onData={setRecords}
        />
      </section>
    </PageContainer>
  );
}