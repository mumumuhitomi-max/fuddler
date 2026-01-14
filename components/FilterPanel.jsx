"use client";

export default function FilterPanel({ params, onChange }) {
  return (
    <div className="flex gap-3 items-center py-2">
      <input
        className="border p-1 rounded bg-gray-900 text-sm"
        placeholder="盘友 ID"
        value={params.palyou_id}
        onChange={(e) =>
          onChange({ ...params, palyou_id: e.target.value })
        }
      />
      <input
        className="border p-1 rounded bg-gray-900 text-sm"
        placeholder="基金名称"
        value={params.fund_code}
        onChange={(e) =>
          onChange({ ...params, fund_code: e.target.value })
        }
      />
    </div>
  );
}