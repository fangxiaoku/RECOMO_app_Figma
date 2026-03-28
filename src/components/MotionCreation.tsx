import { useState } from 'react';
import { ArrowLeft, Sparkles, Copy, MapPin, Smartphone, Bot, Send, Clapperboard, RefreshCw, Mountain } from 'lucide-react';

export function MotionCreation({ onBack }: { onBack: () => void }) {
  const [activeMethod, setActiveMethod] = useState('ai');
  const [inputValue, setInputValue] = useState('');

  const methods = [
    {
      id: 'ai',
      title: 'AI 对话',
      description: '用自然语言描述你想要的镜头运动',
      icon: Sparkles,
      activeColor: 'text-blue-500',
      activeBg: 'bg-blue-500/10'
    },
    {
      id: 'copy',
      title: '拍同款',
      description: '从模板库复刻经典运镜',
      icon: Copy,
      activeColor: 'text-gray-300',
      activeBg: 'bg-white/5'
    },
    {
      id: 'keyframe',
      title: '关键帧打点',
      description: '手动标记关键位置点',
      icon: MapPin,
      activeColor: 'text-gray-300',
      activeBg: 'bg-white/5'
    },
    {
      id: 'phone',
      title: '手机示教',
      description: '用手机作为取景器设定位置',
      icon: Smartphone,
      activeColor: 'text-gray-300',
      activeBg: 'bg-white/5'
    }
  ];

  const suggestions = [
    { text: '缓慢向左平移90°，然后上仰至天花板' },
    { text: '产品360°旋转展示，15秒' },
    { text: '跟踪人物从左走到右' }
  ];

  const vibeTags = [
    { icon: Clapperboard, label: 'Cinematic pan' },
    { icon: RefreshCw, label: '360° product' },
    { icon: Mountain, label: 'Epic reveal' }
  ];

  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] text-gray-200 font-sans overflow-hidden">

      {/* Sidebar (Left) */}
      <div className="w-[320px] bg-[#0A0A0A] border-r border-[#222] flex flex-col p-6 shrink-0 z-10">

        {/* Header */}
        <div className="flex items-center space-x-3 mb-10">
          <button onClick={onBack} className="p-1.5 hover:bg-white/10 rounded-full transition bg-[#161616]">
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <span className="text-xl font-semibold text-white tracking-wide">创建轨迹</span>
        </div>

        {/* Creation Methods */}
        <div className="space-y-4 flex-1">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setActiveMethod(method.id)}
              className={`w-full flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                activeMethod === method.id
                  ? `${method.activeBg} border border-blue-500/20`
                  : 'hover:bg-[#161616] border border-transparent'
              }`}
            >
              <div className={`mt-0.5 p-2 rounded-xl bg-[#161616] ${activeMethod === method.id ? method.activeColor : 'text-gray-500'}`}>
                <method.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className={`font-medium text-base mb-1 ${activeMethod === method.id ? method.activeColor : 'text-gray-300'}`}>
                  {method.title}
                </span>
                <span className="text-sm text-gray-500 leading-snug">
                  {method.description}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Try Saying Section */}
        <div className="mt-auto pt-6 border-t border-[#222]">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-400">试试说</span>
          </div>
          <div className="space-y-3">
            {suggestions.map((item, index) => (
              <p key={index} className="text-sm text-gray-500 hover:text-gray-300 cursor-pointer transition leading-relaxed">
                "{item.text}"
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Main Area (Right) */}
      <div className="flex-1 flex flex-col bg-[#0A0A0A] relative">

        {/* Chat / Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-20">

          {/* AI Welcome Message */}
          <div className="max-w-3xl flex items-start space-x-4">
            {/* AI Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>

            {/* Message Bubble */}
            <div className="bg-[#111111] border border-[#222] rounded-2xl rounded-tl-sm p-6 shadow-xl w-full max-w-2xl">
              <p className="text-gray-200 text-lg leading-relaxed mb-4">
                Tell me the vibe you're going for — I'll turn it into a cinematic motion.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                描述你想拍的效果，或上传参考视频，我来设计专属运镜。
              </p>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-3">
                {vibeTags.map((tag, i) => (
                  <button key={i} className="flex items-center space-x-2 bg-[#1A1A1A] hover:bg-[#252525] border border-[#333] rounded-full px-4 py-2 transition-colors">
                    <tag.icon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-sm text-blue-400">{tag.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Input Area */}
        <div className="p-6 md:px-12 lg:px-20 pb-12 w-full max-w-5xl mx-auto">
          <div className="relative flex items-center bg-[#111111] border border-[#222] rounded-full shadow-2xl overflow-hidden focus-within:border-[#333] focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="描述你想要的镜头运动..."
              className="w-full bg-transparent text-gray-200 placeholder-gray-600 py-4 pl-6 pr-14 outline-none text-base"
            />
            <button
              className={`absolute right-3 p-2.5 rounded-full transition-colors ${
                inputValue.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-[#222] text-gray-500'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
