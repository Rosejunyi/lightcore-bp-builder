// src/pages/api/prompt.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { idea } = await req.json();

  const apiKey = process.env.DEEPSEEK_API_KEY!;
  const model = 'deepseek-reasoner';
  const url = 'https://api.deepseek.ai/v1/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'user',
            content: `请根据以下项目创意，智能识别项目类型、专家角色、分析维度、关键词，并生成推荐 Prompt：\n\n${idea}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? 'Deepseek 未返回内容';
    return NextResponse.json({ prompt: content });

  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? '服务器异常' }, { status: 500 });
  }
}
