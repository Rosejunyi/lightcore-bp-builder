// src/api/analyze/project.js
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

// ✅ 注册 POST 接口：/api/analyze/project
router.post('/', async (req, res) => {
  try {
    const recommendedPrompt = usePromptStore.getState().prompt || '（无推荐内容）';

    const templatePath = path.resolve('src/prompts/projectEvaluationPrompt.txt');
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

    // ✅ 为支持 PDF 导出，返回 markdown 和 html 两种格式（html 便于前端直接转换为 PDF）
    const html = `<div style="font-family: Arial, sans-serif; white-space: pre-wrap;">${content.replace(/\n/g, '<br>')}</div>`;

    res.json({ result: content, html, type: '项目评估' });

  } catch (err) {
    console.error('[Project Analyze] 错误：', err);
    res.status(500).json({ error: '项目分析失败，请稍后再试。' });
  }
});

export default router;
