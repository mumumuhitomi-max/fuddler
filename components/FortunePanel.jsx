"use client";

import { useEffect, useState } from "react";

export default function FortunePanel({ summary, behaviorChanges }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!summary || summary.total === 0) {
      setText("暂无可解读的数据");
      return;
    }
    fetchFortune();
  }, [summary.total]);

  async function fetchFortune() {
    const res = await fetch("/api/fortune", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary, behaviorChanges }),
    });

    const data = await res.json();
    setText(data.text || "（模型未返回内容）");
  }

  return (
    <div className="glass-card fortune-card">
      <div className="fortune-title">AI 解读</div>
      <div className="fortune-content">
        {text.split("\n").map((l, i) => <p key={i}>{l}</p>)}
      </div>
    </div>
  );
}