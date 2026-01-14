import { Suspense } from "react";
import AnalysisClient from "./AnalysisClient";

export default function AnalysisPage() {
  return (
    <Suspense fallback={<AnalysisLoading />}>
      <AnalysisClient />
    </Suspense>
  );
}

function AnalysisLoading() {
  return (
    <div style={{ padding: 24, color: "#666" }}>
      正在加载分析页面…
    </div>
  );
}