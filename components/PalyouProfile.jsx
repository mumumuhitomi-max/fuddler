"use client";

export default function PalyouProfile({ summary }) {
  if (!summary || summary.total === 0) {
    return (
      <div className="glass-card profile-card">
        <div className="profile-title">盘友画像</div>
        <div className="profile-empty">暂无足够数据生成画像</div>
      </div>
    );
  }

  const { buy, sell, swap, total } = summary;

  // ===== 行为判断 =====
  let behavior = "观察型";
  if (buy > sell * 2) behavior = "偏买入";
  if (sell > buy * 2) behavior = "偏卖出";
  if (swap > buy && swap > sell) behavior = "频繁调仓";

  // ===== 稳定性判断 =====
  let stability = "中等";
  if (total >= 5 && swap === 0) stability = "较稳定";
  if (swap >= total / 2) stability = "不稳定";

  // ===== 跟踪建议 =====
  let suggestion = "继续观察";
  if (behavior === "偏买入" && stability === "较稳定") {
    suggestion = "值得持续跟踪";
  }
  if (stability === "不稳定") {
    suggestion = "谨慎跟踪";
  }

  return (
    <div className="glass-card profile-card">
      <div className="profile-title">盘友画像</div>

      <div className="profile-grid">
        <div>
          <div className="profile-label">行为倾向</div>
          <div className="profile-value">{behavior}</div>
        </div>

        <div>
          <div className="profile-label">稳定性</div>
          <div className="profile-value">{stability}</div>
        </div>

        <div>
          <div className="profile-label">跟踪建议</div>
          <div className="profile-value highlight">{suggestion}</div>
        </div>
      </div>
    </div>
  );
}