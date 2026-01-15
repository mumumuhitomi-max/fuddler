import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { triggerDataRefresh } from "../lib/useDataRefresh";

export default function TodayMyAction() {
  const [type, setType] = useState("买入");
  const [fundName, setFundName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!amount) return;

    setLoading(true);

    const { error } = await supabase.from("my_records").insert({
      action_type: type,
      fund_name: fundName || null, // ✅ 存基金
      amount,
      created_at: new Date().toISOString(),
    });

    setLoading(false);

    if (error) {
      alert("记录失败");
      return;
    }

    setDone(true);
    setFundName("");
    setAmount("");

    triggerDataRefresh();
  };

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
          {loading ? "提交中…" : "提交我的操作"}
        </button>
      </div>

      {done && (
        <div className="action-confirm">
          今日操作已记录 ✔
        </div>
      )}
    </div>
  );
}