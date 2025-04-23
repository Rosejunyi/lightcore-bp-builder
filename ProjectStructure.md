# 📁 项目结构说明（Lightcore BP Builder）

本项目为一个商业计划书生成器，基于 Vite + React + TailwindCSS，具备智能提示推荐、结构化分析及本地后端代理能力。

## 顶层结构

```bash
lightcore-bp-builder/
├── .env                        # 环境变量配置（API Key、模型等）
├── index.html                 # 应用入口 HTML
├── package.json               # 项目信息和依赖配置
├── postcss.config.cjs         # PostCSS 配置
├── tailwind.config.cjs        # Tailwind 配置
├── vite.config.js             # Vite 构建工具配置
├── server.js                  # ✅ 本地 Express 服务代理（用于转发请求至 DeepSeek）
├── README.md                  # 项目说明文档
│
├── public/                    # 静态资源目录
│   └── vite.svg               # 示例图标
│
├── src/                       # 源码目录
│   ├── api/                   # ✅ 前端请求封装
│   │   └── deepseek.js        # 前端封装请求 /api/prompt 的方法
│   │
│   ├── pages/                 # 页面组件
│   │   ├── HomePage.jsx       # 首页页面
│   │   ├── PromptRecommendation.jsx  # Prompt 推荐页面
│   │   └── api/               # ✅ Next.js 风格 API 路由（可部署于 vercel、netlify 等）
│   │       └── prompt.ts      # API 路由处理 /api/prompt 请求，转发至 DeepSeek
│   │
│   ├── assets/                # 项目资源文件
│   │   └── react.svg
│   │
│   ├── App.jsx                # 应用主组件
│   ├── main.jsx               # 应用入口 JS
│   ├── index.css              # 全局样式
│   └── App.css                # App 组件样式
```

## ✅ 补充说明

- 后端代理已配置于 `server.js`，开发时运行 `npm run start:server` 启动。
- 前端调用地址为 `http://localhost:5174/api/prompt`（或 `/api/deepseek`，视 server.js 而定）。
- 环境变量 `.env` 中需设置：
  - `VITE_DEEPSEEK_API_KEY=sk-...`
  - `VITE_DEFAULT_MODEL=deepseek-response`

---

## 推荐说明

- 若部署在 Vercel，可继续使用 `src/pages/api/prompt.ts`
- 若部署在自有服务器或本地开发，建议用 `server.js` 统一接口代理，并将前端调用 `http://localhost:5174/api/prompt`

最后更新：由 ChatGPT 于 2025 年协助生成。✨
