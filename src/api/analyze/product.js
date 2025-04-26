// src/api/analyze/product.js
import fs from 'fs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';
import usePromptStore from '../../store/promptStore.js';

dotenv.config();
const router = express.Router();

router.use(cors());
router.use(express.json());

// ✅ 注册 POST 接口：/api/analyze/product
router.post('/', async (req, res) => {
  try {
    const recommendedPrompt = usePromptStore.getState().prompt || '（无推荐内容）';

    const templatePath = path.resolve('src/prompts/productThinkingPrompt.txt');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const finalPrompt = template.replace('{{recommendedPrompt}}', recommendedPrompt);
    console.log('[Final Prompt]:', finalPrompt);  // 打印最终的 prompt，确认替换成功


    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner',
        messages: [
          { role: 'user', content: finalPrompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '❌ 未返回内容';
    res.json({ result: content });

  } catch (err) {
    console.error('[Product Analyze] 错误：', err);
    res.status(500).json({ error: '产品分析失败，请稍后再试。' });
  }
});

export default router;
