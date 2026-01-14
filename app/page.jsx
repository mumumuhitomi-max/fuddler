export default function Home() {
  return (
    <div className="min-h-screen bg-hero text-white flex flex-col">
      {/* 顶部导航 */}
      <header className="flex items-center justify-between px-10 py-6">
        <div className="font-bold tracking-widest text-sm">
          FUDDLER
        </div>
        <nav className="flex items-center gap-8 text-sm opacity-90">
          <span className="cursor-pointer hover:opacity-100">
            盘友
          </span>
          <span className="cursor-pointer hover:opacity-100">
            今日
          </span>
          <span className="cursor-pointer hover:opacity-100">
            分析
          </span>
        </nav>
      </header>

      {/* 主视觉 */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold fade-in">
          Hello！你好
        </h1>

        <p
          className="mt-6 max-w-xl text-sm md:text-base opacity-85 fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          这是你的跟单助手。  
          帮你把盘友操作、个人决策与 AI 分析，
          重新整理成你能真正使用的信息。
        </p>

        <div
          className="mt-10 fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <a href="/palyou" className="btn-primary">
            开始使用
          </a>
        </div>
      </main>

      {/* 底部空间占位（视觉承托） */}
      <div className="h-24" />
    </div>
  );
}