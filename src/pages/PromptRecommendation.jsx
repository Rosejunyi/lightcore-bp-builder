import { useState } from 'react';
import { fetchPromptRecommendation } from '../api/deepseek';

export default function PromptRecommendation() {
  const [idea, setIdea] = useState('');
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setPrompt('');
    setError('');
    try {
      const result = await fetchPromptRecommendation(idea);
      setPrompt(result);
    } catch (err) {
      console.error('API Request Failed:', err);
      setError('生成失败，请稍后重试或检查网络连接。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          项目分析 — 推荐 Prompt
        </h1>

        <label htmlFor="project-idea" className="sr-only">项目创意</label>
        <textarea
          id="project-idea"
          rows={4}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="在此输入你的项目创意…"
          aria-describedby={error ? 'error-message' : undefined}
          className="block w-1/2 mx-auto mb-6 border border-gray-300 rounded-lg p-3 text-2xl
                     focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none"
          style={{ fontFamily: 'Microsoft YaHei', fontSize: '16px', lineHeight: '1.5' }}
        />

        <button
          onClick={handleGenerate}
          disabled={!idea.trim() || loading}
          className="block mx-auto mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-700
                     text-white rounded-full shadow-md transition duration-150 ease-in-out
                     disabled:opacity-50 disabled:cursor-not-allowed"
          aria-live="polite"
          aria-busy={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成中…
            </>
          ) : (
            '生成推荐 Prompt'
          )}
        </button>

        {error && (
          <div id="error-message" role="alert" className="text-center text-red-600 mb-4 w-1/2 mx-auto">
            {error}
          </div>
        )}

        {prompt && !error && (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 w-1/2 mx-auto animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              推荐 Prompt
            </h2>
            <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">{prompt}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
