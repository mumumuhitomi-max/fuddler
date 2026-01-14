export default function PageShell({ title, subtitle, children }) {
    return (
      <div className="min-h-screen bg-hero text-white">
        {/* Hero 区 */}
        <section className="px-10 pt-14 pb-20 text-center">
          <h1 className="text-4xl font-bold fade-in">{title}</h1>
          <p
            className="mt-4 text-sm opacity-85 max-w-2xl mx-auto fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {subtitle}
          </p>
        </section>
  
        {/* 内容区 */}
        <section className="px-6 pb-20 -mt-16 max-w-6xl mx-auto">
          <div className="grid gap-6">{children}</div>
        </section>
      </div>
    );
  }