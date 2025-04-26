// server.js（最终版，含三个分析接口）
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

import projectAnalysis from './src/api/analyze/project.js';
import productAnalysis from './src/api/analyze/product.js';
import planAnalysis from './src/api/analyze/plan.js';

dotenv.config();
const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

// 三个分析接口
app.use('/api/analyze/project', projectAnalysis);
app.use('/api/analyze/product', productAnalysis);
app.use('/api/analyze/plan', planAnalysis);

// 推荐 Prompt 接口
app.post('/api/prompt', async (req, res) => {
  const { idea } = req.body;
  console.log('🟢 接收到项目创意 =', idea);

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner',
        messages: [
          {
            role: 'user',
            content: `你是一位资深商业策划顾问，请根据以下项目创意，完成以下任务：
1. 提炼一个不超过 10 个中文字符的简洁项目名称
2. 判断该项目属于哪一类（如农业、文旅、文创、科技等）
3. 输出一段推荐提示词（Prompt），用于后续生成项目分析报告，结构清晰、风格专业，

项目创意如下：

${idea}`
          }
        ]
      }),
    });

    const raw = await response.text();
    console.log('🧾 DeepSeek 返回内容 =', raw);

    const data = JSON.parse(raw);
    const result = data.choices?.[0]?.message?.content ?? '';

    const matchName = result.match(/项目名称[:：]\s*(.*)/);
    const matchPrompt = result.match(/推荐提示词[:：]?[\n\r]*([\s\S]*)/);

    const projectName = matchName ? matchName[1].trim().slice(0, 20) : '未命名项目';
    const recommendedPrompt = matchPrompt ? matchPrompt[1].trim() : result;

    return res.json({
      title: projectName,
      prompt: recommendedPrompt
    });

  } catch (err) {
    console.error('❌ 接口异常：', err);
    return res.status(500).json({ error: 'DeepSeek 请求失败，请稍后再试。' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
