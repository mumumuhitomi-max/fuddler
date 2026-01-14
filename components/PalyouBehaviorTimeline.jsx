"use client";

import dayjs from "dayjs";

function getMainBehavior({ buy, sell, swap }) {
  if (buy > sell + swap) return "买入主导";
  if (sell > buy + swap) return "卖出主导";
  if (swap >= buy && swap >= sell) return "调仓主导";
  return "混合行为";
}

export default function PalyouBehaviorTimeline({ records = [] }) {
  if (records.length === 0) {
    return (
      <div className="glass-card timeline-card">
        <div className="timeline-title">行为时间轴</div>
        <div className="timeline-empty">暂无可分析的行为记录</div>
      </div>
    );
  }

  // ===== 按 15:00 分组 =====
  const groups = {};
  records.forEach((r) => {
    const t = dayjs(r.created_at);
    const key =
      t.hour() < 15
        ? t.subtract(1, "day").format("YYYY-MM-DD")
        : t.format("YYYY-MM-DD");

    if (!groups[key]) {
      groups[key] = { buy: 0, sell: 0, swap: 0, total: 0 };
    }

    groups[key][r.action]++;
    groups[key].total++;
  });

  const days = Object.keys(groups).sort();
  let lastBehavior = null;

  return (
    <div className="glass-card timeline-card">
      <div className="timeline-title">行为时间轴</div>

      <div className="timeline-list">
        {days.map((day) => {
          const g = groups[day];
          const behavior = getMainBehavior(g);
          const changed = lastBehavior && behavior !== lastBehavior;
          lastBehavior = behavior;

          return (
            <div key={day} className="timeline-item">
              <div className="timeline-date">
                {day} 15:00 → 次日 15:00
              </div>

              <div className="timeline-meta">
                <span>买 {g.buy}</span>
                <span>卖 {g.sell}</span>
                <span>转 {g.swap}</span>
              </div>

              <div className={`timeline-behavior ${changed ? "changed" : ""}`}>
                {behavior}
                {changed && <span className="change-flag">风格变化</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}