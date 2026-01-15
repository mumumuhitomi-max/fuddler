"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { triggerDataRefresh } from "../lib/useDataRefresh";

export default function TodayMyAction({ followTarget }) {
  const [type, setType] = useState("买入");
  const [fundName, setFundName] = useState("");
  const [amount, setAmount] = useState("");
  const [palyouId, setPalyouId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ⭐ 接收一键跟单
  useEffect(() => {
    if (!followTarget) return;

    setType(followTarget.action_type);
    setFundName(followTarget.fund_name || "");
    setAmount(followTarget.amount || "");
    setPalyouId(followTarget.palyou_id);
  }, [followTarget]);

  async function submit() {
    if (!amount || !fundName) return;

    setLoading(true);

    const { error } = await supabase.from("my_records").insert({
      palyou_id: palyouId,
      fund_name: fundName,
      action_type: type,
      amount: Number(amount),
    });

    setLoading(false);

    if (error) {
      alert("记录失败");
      return;
    }

    setAmount("");
    triggerDataRefresh();
  }

  return (
    <div>
      <div className="section-title">我的今日操作</div>

      <div className="action-form">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>买入</option>
          <option>卖出</option>
          <option>转换</option>
        </select>

        <input
          placeholder="基金名称"
          value={fundName}
          onChange={(e) => setFundName(e.target.value)}
        />

        <input
          placeholder="金额 / 份额"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="primary-button"
          disabled={loading}
          onClick={submit}
        >
          提交我的操作
        </button>
      </div>
    </div>
  );
}