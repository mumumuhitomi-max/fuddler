"use client";

import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import TodayPalyou from "../../components/TodayPalyou";
import TodayMyAction from "../../components/TodayMyAction";

export default function TodayPage() {
  const [followPreset, setFollowPreset] = useState(null);

  const today = new Date().toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

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
        <TodayPalyou onFollow={setFollowPreset} />
      </div>

      <div className="today-divider">我的今日决策</div>

      <div className="glass-card-strong">
        <TodayMyAction preset={followPreset} />
      </div>
    </PageContainer>
  );
}