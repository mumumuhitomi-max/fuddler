"use client";

import PageContainer from "../../components/PageContainer";
import TodayPalyou from "../../components/TodayPalyou";
import TodayMyAction from "../../components/TodayMyAction";

export default function TodayPage() {
  const today = new Date().toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <PageContainer>
      {/* Hero */}
      <div className="today-hero">
        <div className="today-title">今日操作</div>
        <div className="today-date">{today}</div>
        <div className="today-subtitle">
          今天发生了什么，以及你打算如何回应。
        </div>
      </div>

      {/* 今日盘友 */}
      <div className="glass-card">
        <TodayPalyou />
      </div>

      {/* 我的决策 */}
      <div className="today-divider">我的今日决策</div>

      <div className="glass-card-strong">
        <TodayMyAction />
      </div>
    </PageContainer>
  );
}