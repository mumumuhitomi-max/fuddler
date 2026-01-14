export default function PalyouRecordCard({ record, onEdit }) {
    return (
      <div className="bg-white/40 backdrop-blur rounded-xl p-4 flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex gap-2 items-center">
            <span className="font-medium">{record.palyou_id}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-white/60">
              {record.action}
            </span>
            <span className="text-slate-700">
              {record.fund_name || "未知基金"}
            </span>
          </div>
          <div className="text-sm text-slate-600">
            ¥{record.amount || "-"} · {new Date(record.created_at).toLocaleString()}
          </div>
        </div>
  
        <button
          onClick={() => onEdit(record)}
          className="text-sm px-3 py-1 rounded-lg bg-white/70 hover:bg-white"
        >
          编辑
        </button>
      </div>
    );
  }