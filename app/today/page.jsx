"use client";

import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import TodayPalyou from "../../components/TodayPalyou";
import TodayMyAction from "../../components/TodayMyAction";

export default function TodayPage() {
  const today = new Date().toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const [followTarget, setFollowTarget] = useState(null);

  return (
    <PageContainer>
      <div className="today-hero">
        <div className="today-title">今日操作</div>
        <div className="today-date">{today}</div>
        <div className="today-subtitle">
          今天发生了什么，以及你打算如何回应。
        </div>
      </div>

      <div className="glass-card">
        <TodayPalyou onFollow={setFollowTarget} />
      </div>

      <div className="today-divider">我的今日决策</div>

      <div className="glass-card-strong">
        <TodayMyAction followTarget={followTarget} />
      </div>
    </PageContainer>
  );
}