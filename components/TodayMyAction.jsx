import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { triggerDataRefresh } from "../lib/useDataRefresh";

export default function TodayMyAction({ preset }) {
  const [type, setType] = useState("买入");
  const [fund, setFund] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preset) {
      setType(preset.action_type);
      setFund(preset.fund_code || "");
    }
  }, [preset]);

  async function submit() {
    if (!amount) return;

    setLoading(true);

    await supabase.from("my_records").insert({
      action_type: type,
      amount: Number(amount),
      fund_code: fund || null,
      created_at: new Date().toISOString(),
    });

    setAmount("");
    setLoading(false);
    triggerDataRefresh();
  }

  return (
    <div>
      <div className="section-title">我的今日操作</div>

      <div className="action-form">
        <select value={type} onChange={e => setType(e.target.value)}>
          <option>买入</option>
          <option>卖出</option>
          <option>转换</option>
        </select>

        <input
          placeholder="基金名称"
          value={fund}
          onChange={e => setFund(e.target.value)}
        />

        <input
          placeholder="金额 / 份额"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "提交中…" : "提交我的操作"}
        </button>
      </div>
    </div>
  );
}