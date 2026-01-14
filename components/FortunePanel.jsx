"use client";

import { useEffect, useState } from "react";

export default function FortunePanel({ summary, behaviorChanges }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 没有数据就不请求 AI
    if (!summary || summary.total === 0) {
      setText("暂无可解读的数据");
      return;
    }

    fetchFortune();
    // ⚠️ 依赖数组必须“结构固定”
  }, [summary.total]);

  async function fetchFortune() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          behaviorChanges, // ⭐ 关键：传给后端
        }),
      });

      const data = await res.json();

      if (!data || !data.text) {
        setText("（模型未返回内容）");
      } else {
        setText(data.text);
      }
    } catch (e) {
      setError("解读失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card fortune-card">
      <div className="fortune-title">AI 解读</div>

      {loading && (
        <div className="fortune-loading">正在生成解读…</div>
      )}

      {error && (
        <div className="fortune-error">{error}</div>
      )}

      {!loading && !error && (
        <div className="fortune-content">
          {text.split("\n").map((line, i) => (
            <p key={i} className="fortune-line">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}