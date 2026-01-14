export default function RecordList({ records }) {
    if (!records.length)
      return <p className="text-gray-400">暂无记录</p>;
    return (
      <div className="mt-2 space-y-3">
        {records.map((r) => (
          <div
            key={r.id}
            className="bg-gray-900 p-3 rounded text-white"
          >
            <div className="text-xs text-gray-400">
              {r.palyou_id} | {r.fund_code} | {r.action_type}{" "}
              {r.amount}
            </div>
            <div className="text-sm">{r.record_source}</div>
          </div>
        ))}
      </div>
    );
  }