"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PalyouForm({ onAdd }) {
  const [id, setId] = useState("");
  const [fund, setFund] = useState("");
  const [type, setType] = useState("");
  const [amt, setAmt] = useState("");
  const [txt, setTxt] = useState("");

  const handleSubmit = async () => {
    if (!id || !type) return;
    await supabase.from("palyou_records").insert([
      {
        palyou_id: id,
        fund_code: fund,
        action_type: type,
        amount: amt,
        record_source: txt,
      },
    ]);
    onAdd();
    setId("");
    setFund("");
    setType("");
    setAmt("");
    setTxt("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md space-y-2 text-white">
      <input
        className="w-full border p-1 rounded bg-gray-900"
        value={id}
        placeholder="盘友 ID"
        onChange={(e) => setId(e.target.value)}
      />
      <input
        className="w-full border p-1 rounded bg-gray-900"
        value={fund}
        placeholder="基金名称/代码"
        onChange={(e) => setFund(e.target.value)}
      />
      <select
        className="w-full border p-1 rounded bg-gray-900"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">操作类型</option>
        <option value="买入">买入</option>
        <option value="卖出">卖出</option>
        <option value="转换">转换</option>
      </select>
      <input
        className="w-full border p-1 rounded bg-gray-900"
        value={amt}
        placeholder="金额/份额"
        onChange={(e) => setAmt(e.target.value)}
      />
      <textarea
        className="w-full border p-1 rounded bg-gray-900"
        value={txt}
        placeholder="备注/截图链接"
        onChange={(e) => setTxt(e.target.value)}
      ></textarea>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded"
        onClick={handleSubmit}
      >
        提交记录
      </button>
    </div>
  );
}