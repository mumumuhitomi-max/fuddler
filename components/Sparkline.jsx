import { useState } from "react";

export default function Sparkline({
  data = [],
  records = [],
  onSelect,
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data.length) {
    return <div className="sparkline-placeholder">暂无节奏数据</div>;
  }

  const width = 160;
  const height = 48;
  const padding = 6;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((v - min) / (max - min || 1)) * (height - padding * 2);
    return { x, y };
  });

  return (
    <div className="sparkline-wrapper">
      <svg
        width={width}
        height={height}
        className="sparkline"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <polyline
          fill="none"
          stroke="url(#sparkGradient)"
          strokeWidth="2"
          points={points.map(p => `${p.x},${p.y}`).join(" ")}
        />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hoverIndex === i ? 4 : 2}
            fill={hoverIndex === i ? "#ff7abf" : "rgba(255,255,255,0.6)"}
            onMouseEnter={() => setHoverIndex(i)}
            onClick={() => onSelect?.(records[i])}
            style={{ cursor: "pointer" }}
          />
        ))}

        <defs>
          <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff7abf" />
            <stop offset="100%" stopColor="#6b5cff" />
          </linearGradient>
        </defs>
      </svg>

      {hoverIndex !== null && records[hoverIndex] && (
        <div className="sparkline-tooltip">
          <div className="tooltip-date">
            {new Date(records[hoverIndex].created_at).toLocaleDateString()}
          </div>
          <div className="tooltip-action">
            {records[hoverIndex].action_type} ·{" "}
            {records[hoverIndex].fund_name || "未知基金"}
          </div>
        </div>
      )}
    </div>
  );
}