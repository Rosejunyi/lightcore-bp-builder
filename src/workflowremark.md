PromptRecommendation.jsx
   │ 输入 idea
   ▼
fetchPromptRecommendation (deepseek.js)
   │ POST 到 /api/prompt.ts
   ▼
prompt.ts（调用 deepseek API）
   │ 返回推荐 prompt
   ▼
PromptRecommendation.jsx
   │ 调用 setData({ prompt }) 存入 Zustand（promptStore.js）
   ▼
AnalysisHome.jsx（从 store 中读取 prompt）
   │ 点击按钮时发送请求
   ▼
对应 API（plan.js / product.js / project.js）
   │ 将 prompt 拼入 finalPrompt（模板内 or JS 构建）
   ▼
请求 deepseek 接口（生成分析内容）
   │ 返回 result 和 html
   ▼
跳转对应分析页组件（如 BusinessPlanPage.jsx）
   │ 展示报告 + 支持导出 markdown/pdf
