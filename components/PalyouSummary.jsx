export default function PalyouSummary({ records }) {
  const buy = records.filter(r => r.action_type === "买入").length;
  const sell = records.filter(r => r.action_type === "卖出").length;
  const swap = records.filter(r => r.action_type === "转换").length;

  let rhythm = "观察阶段";
  if (buy > sell * 2) rhythm = "明显偏买入";
  if (sell > buy * 1.5) rhythm = "开始兑现";

  return (
    <div className="glass-card summary-grid">
      <div>
        <div className="summary-label">总操作</div>
        <div className="summary-value">{records.length}</div>
      </div>
      <div>
        <div className="summary-label">买入</div>
        <div className="summary-value">{buy}</div>
      </div>
      <div>
        <div className="summary-label">卖出</div>
        <div className="summary-value">{sell}</div>
      </div>
      <div>
        <div className="summary-label">节奏判断</div>
        <div className="summary-value">{rhythm}</div>
      </div>
    </div>
  );
}