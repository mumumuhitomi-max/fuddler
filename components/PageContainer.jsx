export default function PageContainer({ children }) {
  return (
    <div className="page-bg">
      {/* 顶部安全间距，给 Navbar 呼吸 */}
      <div className="page-top-offset" />

      <div className="page-container">
        {children}
      </div>
    </div>
  );
}