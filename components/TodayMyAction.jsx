import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { triggerDataRefresh } from "../lib/useDataRefresh";

export default function TodayMyAction() {
  const [type, setType] = useState("买入");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!amount) return;

    setLoading(true);

    await supabase.from("my_records").insert({
      action_type: type,
      amount,
      created_at: new Date().toISOString(),
    });

    setLoading(false);
    setDone(true);

    // 🔥 关键：通知全局数据更新
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