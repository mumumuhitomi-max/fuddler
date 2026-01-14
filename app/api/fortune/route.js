import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const body = await req.json();
    const record = body?.record || null;

    if (!GEMINI_KEY) {
      return NextResponse.json(
        { state: "", rhythm: "", advice: "" },
        { status: 200 }
      );
    }

    const prompt = `
    你是一个“跟单分析助手”，目标是帮助用户判断一个盘友是否仍值得跟踪。

    【基础统计】
    - 买入次数：${summary.buy}
    - 卖出次数：${summary.sell}
    - 转换次数：${summary.swap}
    - 总操作次数：${summary.total}

    【近期行为变化】
    ${
      behaviorChanges && behaviorChanges.length > 0
        ? behaviorChanges
            .map(
              (c) =>
                `- ${new Date(c.time).toLocaleDateString()}：从「${c.from}」转为「${c.to}」`
            )
            .join("\n")
        : "近期未观察到明显行为变化"
    }

    请完成以下分析，每一段单独一行输出：

    【变化解读】
    解释这些行为变化可能意味着什么，不要臆测具体市场消息。

    【当前状态判断】
    判断该盘友当前更可能处于：建仓 / 兑现 / 观察 / 摇摆。

    【跟单建议】
    明确给出：继续跟踪 / 降低权重 / 暂停跟踪。

    要求：
    - 用冷静、克制、专业的投资语言
    - 不给具体买卖点
    - 不制造情绪
    `;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
        GEMINI_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: basePrompt + recordPrompt }],
            },
          ],
        }),
      }
    );

    const raw = await res.text();
    console.log("=== GEMINI RAW RESPONSE ===");
    console.log(raw);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { state: "", rhythm: "", advice: "" },
        { status: 200 }
      );
    }

    const text =
      parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { state: "", rhythm: "", advice: "" };
    }

    return NextResponse.json(
      {
        state: result.state || "",
        rhythm: result.rhythm || "",
        advice: result.advice || "",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { state: "", rhythm: "", advice: "" },
      { status: 200 }
    );
  }
}