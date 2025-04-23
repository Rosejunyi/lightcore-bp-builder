import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const nav = useNavigate();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-md bg-white p-8 rounded-3xl shadow-lg text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Lightcore BP Builder
        </h1>
        <p className="text-gray-600 mb-8">
          AI 助手 · 3 步生成完整商业计划书
        </p>
        <button
          onClick={() => nav('/prompt')}
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
        >
          🚀 开始创建
        </button>
      </div>
    </div>
  );
}
