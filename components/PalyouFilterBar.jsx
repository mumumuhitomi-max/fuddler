"use client";

export default function PalyouFilterBar({ filters, onChange, palyouOptions }) {
  return (
    <div className="glass-card filter-bar">
      <select
        value={filters.palyouId || ""}
        onChange={e => onChange({ ...filters, palyouId: e.target.value })}
      >
        <option value="">全部盘友</option>
        {palyouOptions.map(id => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>

      <select
        value={filters.actionType || ""}
        onChange={e => onChange({ ...filters, actionType: e.target.value })}
      >
        <option value="">全部行为</option>
        <option>买入</option>
        <option>卖出</option>
        <option>转换</option>
      </select>

      <input
        placeholder="基金名称"
        value={filters.fundName || ""}
        onChange={e => onChange({ ...filters, fundName: e.target.value })}
      />
    </div>
  );
}