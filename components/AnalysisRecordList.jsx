export default function AnalysisRecordList({ records = [], onSelect }) {
    if (!records.length) {
      return <div className="empty-hint">暂无操作记录</div>;
    }
  
    return (
      <div className="analysis-record-list">
        {records
          .slice()
          .reverse()
          .map((r) => (
            <div
              key={r.id}
              className="analysis-record-item"
              onClick={() => onSelect?.(r)}
            >
              <div className="record-main">
                <span className="record-action">{r.action_type}</span>
                <span className="record-fund">{r.fund_name || "未知基金"}</span>
              </div>
              <div className="record-time">
                {new Date(r.created_at).toLocaleString()}
              </div>
            </div>
          ))}
      </div>
    );
  }