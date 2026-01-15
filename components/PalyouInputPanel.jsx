"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PalyouInputPanel({ onSuccess }) {
  const [palyouId, setPalyouId] = useState("");
  const [knownIds, setKnownIds] = useState([]);

  const [actionType, setActionType] = useState("买入");
  const [fundName, setFundName] = useState("");
  const [amount, setAmount] = useState("");

  // 拉取已有盘友 ID，作为候选
  useEffect(() => {
    supabase
      .from("palyou_records")
      .select("palyou_id")
      .then(({ data }) => {
        if (data) {
          setKnownIds([...new Set(data.map(d => d.palyou_id).filter(Boolean))]);
        }
      });
  }, []);

  const submit = async () => {
    if (!palyouId || !fundName) {
      alert("请填写盘友ID和基金名称");
      return;
    }

    const { error } = await supabase.from("palyou_records").insert({
      palyou_id: palyouId,
      action: actionType,
      fund_name: fundName,
      amount: amount ? Number(amount) : null,
    });

    if (!error) {
      setFundName("");
      setAmount("");
      onSuccess?.();
    }
  };

  return (
    <div className="glass-card">
      <div className="card-title">新增盘友操作</div>

      <div className="palyou-form">
        <input
          list="palyou-ids"
          placeholder="盘友 ID"
          value={palyouId}
          onChange={(e) => setPalyouId(e.target.value)}
        />
        <datalist id="palyou-ids">
          {knownIds.map(id => (
            <option key={id} value={id} />
          ))}
        </datalist>

        <select value={actionType} onChange={e => setActionType(e.target.value)}>
          <option>买入</option>
          <option>卖出</option>
          <option>转换</option>
        </select>

        <input
          placeholder="基金名称"
          value={fundName}
          onChange={e => setFundName(e.target.value)}
        />

        <input
          placeholder="金额（可选）"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <button onClick={submit}>记录</button>
      </div>
    </div>
  );
}