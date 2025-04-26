// src/api/analyze/plan.js
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

// ✅ 改用方法二：直接在 JS 中定义结构化模板并拼接 recommendedPrompt
router.post('/', async (req, res) => {
  const { recommendedPrompt } = req.body;

  try {
    const finalPrompt = `你是一位商业计划书撰写专家，请基于以下推荐提示词，进一步分析优化，生成一份用于投资、申报或商业合作的标准化商业计划书内容草案。请内容清晰、结构完整、语言专业、逻辑合理。

推荐提示词如下：
${recommendedPrompt}

请按照以下结构进行输出：
1. 项目名称
2. 项目简介
3. 项目背景与市场机会
4. 产品/服务解决方案
5. 商业模式与盈利逻辑
6. 市场推广与运营策略
7. 核心团队（如有）
8. 融资计划或资源需求（如适用）
9. 附录或补充说明（如有）`;

    console.log('[Plan Final Prompt]:', finalPrompt);

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner',
        messages: [{ role: 'user', content: finalPrompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '❌ 未返回内容';
    res.json({ result: content });

  } catch (err) {
    console.error('[Plan Analyze] 错误：', err);
    res.status(500).json({ error: '计划书生成失败，请稍后再试。' });
  }
});

export default router;
