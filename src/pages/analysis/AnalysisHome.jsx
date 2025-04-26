// src/pages/analysis/AnalysisHome.jsx
import { useNavigate } from 'react-router-dom';
import usePromptStore from '../../store/promptStore';

export default function AnalysisHome() {
  const navigate = useNavigate();
  const { prompt } = usePromptStore();

  const handleClick = async (type) => {
    if (!prompt) return;

    console.log('[🚨 即将发送的 prompt]:', prompt); // 👈 加这行

    const apiMap = {
      project: '/api/analyze/project',
      product: '/api/analyze/product',
      plan: '/api/analyze/plan',
    };

    try {
      const res = await fetch(`http://localhost:5174${apiMap[type]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recommendedPrompt: prompt }), // ✅ 正确传入 prompt
      });

      const data = await res.json();
      navigate(`/analysis/${type}`, {
        state: {
          result: data.result ?? '❌ 无返回内容',
          html: data.html ?? '',
          type: data.type ?? '',
        },
      });
    } catch (err) {
      alert('生成失败，请稍后再试');
      console.error(`[${type} 接口失败]:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ✨ AI 分析中心
        </h1>
        <p className="text-center text-gray-600 mb-10">
          请选择要生成或查看的分析文档类型
        </p>

        <div className="grid gap-6">
          <button
            onClick={() => handleClick('project')}
            className="w-full py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            商业项目评估报告
          </button>
          <button
            onClick={() => handleClick('product')}
            className="w-full py-4 text-white bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
          >
            产品思维分析报告
          </button>
          <button
            onClick={() => handleClick('plan')}
            className="w-full py-4 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            商业计划书草案
          </button>
        </div>
      </div>
    </div>
  );
}
