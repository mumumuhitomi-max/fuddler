"use client";

import { useEffect, useState } from "react";

export default function FortunePanel({ summary, behaviorChanges }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!summary || summary.total === 0) {
      setText("暂无可解读的数据");
      return;
    }
    fetchFortune();
  }, [summary?.total]);

  async function fetchFortune() {
    setLoading(true);
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, behaviorChanges }),
      });

      const data = await res.json();
      setText(data.text || "（模型未返回内容）");
    } catch {
      setText("解读失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card fortune-card">
      <div className="fortune-title">AI 解读</div>

      {loading ? (
        <div className="fortune-loading">正在生成解读…</div>
      ) : (
        <div className="fortune-content">
          {text.split("\n").map((line, i) => (
            <p key={i} className="fortune-line">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}