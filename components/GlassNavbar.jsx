"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "盘友操作", href: "/palyou" },
  { name: "今日操作", href: "/today" },
  { name: "投资分析", href: "/analysis" },
];

export default function GlassNavbar() {
  const pathname = usePathname();

  return (
    <div className="glass-navbar-wrapper">
      <div className="glass-navbar">
        {/* 左侧 Logo */}
        <div className="glass-navbar-logo">
          Fuddler
        </div>

        {/* 中间 Tabs */}
        <div className="glass-navbar-tabs">
          {tabs.map(tab => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`glass-tab ${active ? "active" : ""}`}
              >
                {tab.name}
                {active && <span className="tab-indicator" />}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}