import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PromptRecommendation from './pages/PromptRecommendation.jsx';

import AnalysisHome from './pages/analysis/AnalysisHome.jsx';
import ProjectEvaluationPage from './pages/analysis/ProjectEvaluationPage.jsx';
import ProductThinkingPage from './pages/analysis/ProductThinkingPage.jsx';
import BusinessPlanPage from './pages/analysis/BusinessPlanPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 欢迎页 */}
        <Route path="/" element={<HomePage />} />

        {/* 推荐 Prompt 页 */}
        <Route path="/prompt" element={<PromptRecommendation />} />

        {/* 分析首页与三类文档页 */}
        <Route path="/analysis" element={<AnalysisHome />} />
        <Route path="/analysis/project" element={<ProjectEvaluationPage />} />
        <Route path="/analysis/product" element={<ProductThinkingPage />} />
        <Route path="/analysis/plan" element={<BusinessPlanPage />} />
      </Routes>
    </BrowserRouter>
  );
}
