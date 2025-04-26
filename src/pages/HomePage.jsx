import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const floatingIdeas = [
  { avatar: '👩\u200d💻', text: '我想做一个 AI 面试陪练官' },
  { avatar: '🧑\u200d🎨', text: '如果音乐可以自我作曲，会怎么样？' },
  { avatar: '👩\u200d🏫', text: '农村儿童如何获得 AI 教育资源？' },
  { avatar: '👨\u200d🔬', text: '我能不能训练一个情绪分析植物？' },
];

const floatingIcons = ['💡', '📚', '🎨', '🌿', '📱', '🧠'];

const reportCards = [
  { title: 'AI 教育助手', type: '商业计划书' },
  { title: '智慧养老平台', type: '项目评估报告' },
  { title: '社区健康系统', type: '产品思维分析' },
];

const ideaStream = [
  '我想做一个会写童话的智能宠物',
  '我想发明会解梦的 AI 算法',
  '我想创建一个声音博物馆',
  '我想开发一个情绪播种机',
  '我想做一个自动给朋友点赞的 AI 小助理',
];

export default function HomePage() {
  const navigate = useNavigate();
  const [currentIdea, setCurrentIdea] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdea((prev) => (prev + 1) % floatingIdeas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % ideaStream.length);
    }, 2500);
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="w-screen h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

      {/* 漂浮图标层 */}
      {floatingIcons.map((icon, idx) => (
        <div
          key={idx}
          className="absolute text-4xl animate-float"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        >
          {icon}
        </div>
      ))}

      {/* 灵感输入模拟框 */}
      <div className="absolute top-10 right-10 w-72 bg-white rounded-xl shadow-lg p-4 border border-gray-300 overflow-hidden h-20 flex items-center">
        <div className="text-gray-600 text-sm whitespace-nowrap animate-slide-up">
          {ideaStream[scrollIndex]}
        </div>
      </div>

      {/* 中间主框 */}
      <div className="container mx-auto max-w-2xl bg-white p-8 rounded-3xl shadow-2xl text-center z-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Lightcore BP Builder
        </h1>
        <p className="text-gray-600 mb-6">
          AI 助手 · 3步生成完整商业计划书
        </p>

        <div className="flex items-center justify-center space-x-4 mb-6">
          <span className="text-3xl">{floatingIdeas[currentIdea].avatar}</span>
          <span className="text-gray-700 font-semibold">{floatingIdeas[currentIdea].text}</span>
        </div>

        <button
          onClick={() => navigate('/prompt')}
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition text-lg"
        >
          🚀 立即开始
        </button>
      </div>

      {/* 滚动报告区 */}
      <div className="absolute bottom-8 w-full overflow-x-auto flex space-x-4 px-8 z-10">
        {reportCards.map((card, idx) => (
          <div
            key={idx}
            className="min-w-[220px] bg-white p-4 rounded-xl shadow-md flex-shrink-0 hover:scale-105 transition"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-500 text-sm">{card.type}</p>
          </div>
        ))}
      </div>

      {/* 动画样式 */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite alternate;
        }
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
