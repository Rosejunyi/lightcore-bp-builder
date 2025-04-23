// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch'; // 使用 node-fetch@2 版本

dotenv.config();
const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

app.post('/api/prompt', async (req, res) => {
  const { idea } = req.body;
  console.log('🟢 接收到请求 idea =', idea);

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner',
        messages: [
          {
            role: 'user',
            content: `请根据以下项目创意，智能识别项目类型、专家角色、分析维度、关键词，并生成推荐 Prompt：\n\n${idea}`
          }
        ]
      }),
    });

    const text = await response.text();
    console.log('🧾 DeepSeek 返回原始文本 =', text);

    // 检查是否是有效 JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      console.error('⚠️ DeepSeek 返回非 JSON，可能是 Key 无效或被限制：', jsonErr);
      return res.status(502).json({ error: 'DeepSeek 返回异常，请检查 API Key 或请求内容' });
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.warn('⚠️ DeepSeek 返回中未找到推荐内容');
      return res.status(204).json({ prompt: '⚠️ DeepSeek 返回中无推荐内容' });
    }

    return res.json({ prompt: content });

  } catch (err) {
    console.error('❌ DeepSeek 请求失败：', err);
    return res.status(500).json({ error: '服务器内部错误，请稍后再试。' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
