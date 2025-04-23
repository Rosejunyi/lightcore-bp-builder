# 🧾 项目阶段快照：第一阶段（推荐 Prompt 模块打通）

## ✅ 项目说明

本阶段已完成推荐 Prompt 模块的开发，支持用户输入项目创意，
并通过 DeepSeek API 成功返回结构化推荐提示词。
可作为后续三类分析逻辑的第一步输入来源。

## ✅ 技术栈

- 前端：Vite + React + TailwindCSS
- 后端：Node.js + Express + DeepSeek API Proxy
- 插件：REST Client 调试、dotenv 管理密钥

## ✅ 当前接口情况

- POST `/api/prompt`：成功
- `fetchPromptRecommendation(idea)`：已集成并运行稳定

## ✅ 示例返回

```json
{
  "prompt": "你是一位文旅产业分析专家，请分析以下乡村共享项目的结构与关键词..."
}
```

---

## 🔐 .env 示例（不含真实 Key）

```env
VITE_DEEPSEEK_API_KEY=sk-xxx
VITE_DEFAULT_MODEL=deepseek-reasoner
```

---

## 📌 下一阶段预期目标

- 使用推荐 prompt + 原始 idea，作为输入
- 生成以下三类结构化内容：
  1. 商业项目评估报告（SWOT 等）
  2. 梁宁产品思维商业需求分析
  3. 商业计划书草案（结构完整）
