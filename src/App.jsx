import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PromptRecommendation from './pages/PromptRecommendation.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 欢迎页 */}
        <Route path="/" element={<HomePage />} />
        {/* 推荐 Prompt 页 */}
        <Route path="/prompt" element={<PromptRecommendation />} />
      </Routes>
    </BrowserRouter>
  );
}
