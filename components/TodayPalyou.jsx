export default function TodayPalyou({ records = [] }) {
    return (
      <div>
        <div className="section-title">今日盘友操作</div>
  
        {records.length === 0 && (
          <div className="empty-hint">
            今日暂无盘友操作。
          </div>
        )}
  
        {records.map((r) => (
          <div key={r.id} className="today-record">
            <div className="record-dot" />
            <div className="record-content">
              <div className="record-main">
                {r.action_type} · {r.fund_name}
              </div>
              <div className="record-sub">
                {new Date(r.created_at).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }