"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function TodayOps({ todayOps, myOps, onUpdate }) {
  const [myType, setMyType] = useState("");
  const [myAmt, setMyAmt] = useState("");

  const addMyOp = async () => {
    if (!myType) return;
    await supabase
      .from("my_records")
      .insert([{ action_type: myType, amount: myAmt }]);
    onUpdate();
    setMyAmt("");
    setMyType("");
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 p-3 rounded text-white">
        <h2 className="font-semibold text-lg">今日盘友操作</h2>
        {todayOps.map((o) => (
          <div key={o.id} className="text-sm text-gray-300">
            {o.palyou_id} | {o.fund_code} | {o.action_type}{" "}
            {o.amount}
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-3 rounded text-white">
        <h2 className="font-semibold text-lg">我的今日操作</h2>
        <select
          className="w-full border p-1 rounded bg-gray-900"
          value={myType}
          onChange={(e) => setMyType(e.target.value)}
        >
          <option value="">操作类型</option>
          <option value="买入">买入</option>
          <option value="卖出">卖出</option>
          <option value="转换">转换</option>
        </select>
        <input
          className="w-full border p-1 rounded bg-gray-900"
          placeholder="金额/份额"
          value={myAmt}
          onChange={(e) => setMyAmt(e.target.value)}
        />
        <button
          className="w-full bg-pink-600 text-white p-2 rounded"
          onClick={addMyOp}
        >
          提交我的操作
        </button>

        {myOps.map((m) => (
          <div key={m.id} className="text-sm text-gray-300">
            {m.action_type} — {m.amount}
          </div>
        ))}
      </div>
    </div>
  );
}