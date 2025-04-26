// src/pages/analysis/ProjectEvaluationPage.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { downloadMarkdownFile } from '../../utils/browserExport';
import html2pdf from 'html2pdf.js';

export default function ProjectEvaluationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, html, type } = location.state || {};

  // 页面加载时检查结果是否存在
  useEffect(() => {
    if (!result) {
      navigate('/analysis');
    }
  }, [result, navigate]);

  const downloadPdf = (htmlContent, filename) => {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    html2pdf().from(element).set({ filename }).save();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          商业项目评估报告
        </h1>

        {result && (
          <>
            <div className="mb-6 text-center whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-100 border border-gray-300 rounded-lg p-4 max-h-[500px] overflow-auto shadow-inner">
              {result}
            </div>
            <div className="text-center space-x-4">
              <button
                onClick={() => downloadMarkdownFile(result, `分析结果_${type}.md`)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
              >
                📥 下载 Markdown
              </button>
              <button
                onClick={() => downloadPdf(html, `分析结果_${type}.pdf`)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition"
              >
                📄 下载 PDF
              </button>
            </div>
          </>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/analysis')}
            className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full transition text-sm"
          >
            🔙 返回分析中心
          </button>
        </div>
      </div>
    </div>
  );
}
