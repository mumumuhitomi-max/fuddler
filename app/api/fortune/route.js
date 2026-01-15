import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { summary, behaviorChanges } = await req.json();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_KEY || !summary) {
      return NextResponse.json({ text: "" });
    }

    const prompt = `
你是一个理性的盘友行为分析助手。

【基础统计】
买入：${summary.buy}
卖出：${summary.sell}
转换：${summary.swap}
总计：${summary.total}

【近期行为变化】
${
  behaviorChanges?.length
    ? behaviorChanges
        .map(
          (c) =>
            `- ${new Date(c.time).toLocaleDateString()}：从 ${c.from} 转为 ${c.to}`
        )
        .join("\n")
    : "暂无明显变化"
}

请给出一段不超过 5 行的分析建议，语气冷静、专业，不给具体买卖点。
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    const raw = await res.json();
    const text =
      raw?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ text });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ text: "" });
  }
}