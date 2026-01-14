export default function SideDetailPanel({ record, onClose }) {
    if (!record) return null;
  
    return (
      <>
        {/* 遮罩 */}
        <div className="side-mask" onClick={onClose} />
  
        {/* 面板 */}
        <div className="side-panel">
          <div className="side-header">
            <div className="side-title">操作详情</div>
            <button className="side-close" onClick={onClose}>
              ✕
            </button>
          </div>
  
          <div className="side-content">
            <div className="side-row">
              <span>时间</span>
              <span>
                {new Date(record.created_at).toLocaleString()}
              </span>
            </div>
  
            <div className="side-row">
              <span>操作</span>
              <span>{record.action_type}</span>
            </div>
  
            <div className="side-row">
              <span>基金</span>
              <span>{record.fund_name || "—"}</span>
            </div>
  
            {record.amount && (
              <div className="side-row">
                <span>金额</span>
                <span>{record.amount}</span>
              </div>
            )}
  
            <div className="side-hint">
              来自节奏点击
            </div>
          </div>
        </div>
      </>
    );
  }