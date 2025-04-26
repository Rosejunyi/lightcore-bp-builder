// src/pages/PromptRecommendation.jsx
import { useState } from 'react';
import { fetchPromptRecommendation } from '../api/deepseek';
import { useNavigate } from 'react-router-dom';
import usePromptStore from '../store/promptStore';

export default function PromptRecommendation() {
  const [idea, setIdea] = useState('');
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const setData = usePromptStore((state) => state.setData);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setPrompt('');
    setError('');
    try {
      const result = await fetchPromptRecommendation(idea);
      const newPrompt = result.prompt || '默认推荐内容';
      setTimeout(() => {
        setPrompt(newPrompt); // 更新了组件的 prompt
        setData({ prompt: newPrompt }); // 把 prompt 存入 store
        console.log('[Updated Prompt in Store]:', usePromptStore.getState().prompt);
      }, 10);
    } catch (err) {
      console.error('API Request Failed:', err);
      setError('生成失败，请稍后重试或检查网络连接。');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  const handleJump = () => {
    if (!prompt.trim()) {
      alert('未生成有效的推荐内容，请先生成推荐 Prompt');
      return;
    }
    setData({ prompt });
    navigate('/analysis');
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          项目分析 — 推荐 Prompt
        </h1>

        <textarea
          rows={4}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="在此输入你的项目创意…"
          className="block w-1/2 mx-auto mb-6 border border-gray-300 rounded-lg p-3 text-base resize-none"
        />

        <button
          onClick={handleGenerate}
          disabled={!idea.trim() || loading}
          className="block mx-auto mb-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow-md"
        >
          {loading ? '生成中…' : '生成推荐 Prompt'}
        </button>

        {error && (
          <div className="text-center text-red-600 mb-4 w-1/2 mx-auto">
            {error}
          </div>
        )}

        {prompt && !error && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 w-1/2 mx-auto max-h-[400px] overflow-auto">
            <pre className="whitespace-pre-wrap text-gray-800">{prompt}</pre>
            <button
              onClick={handleCopy}
              className="mt-4 mx-auto block bg-green-500 text-white px-4 py-1 rounded text-sm"
            >
              {copied ? '✅ 已复制' : '📋 复制 Prompt'}
            </button>
            <div className="mt-6 text-center">
              <button
                onClick={handleJump}
                className="px-5 py-2 bg-indigo-600 text-white rounded-full shadow"
              >
                ✨ 进入分析中心
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
