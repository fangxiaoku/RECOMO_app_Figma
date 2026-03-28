import React from 'react';
import { Plus, LayoutGrid, Package, Home, Mic2, Film, Map as MapIcon, Search, Play, Edit3, Trash2, ArrowLeft, Clock, MapPin } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: '全部', icon: LayoutGrid, count: 6 },
  { id: 'product', name: '产品', icon: Package, count: 2 },
  { id: 'life', name: '生活', icon: Home, count: 1 },
  { id: 'interview', name: '访谈', icon: Mic2, count: 1 },
  { id: 'movie', name: '电影', icon: Film, count: 1 },
  { id: 'tour', name: '导览', icon: MapIcon, count: 1 },
];

const TRAJECTORIES = [
  { id: 1, title: 'Welcome to T8 Space', duration: '30s', points: 10, bg: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
  { id: 2, title: 'Grab a Coffee', duration: '22s', points: 5, bg: 'bg-gradient-to-br from-orange-400 to-pink-500' },
  { id: 3, title: 'Product Showcase 360', duration: '15s', points: 8, bg: 'bg-gradient-to-br from-emerald-400 to-teal-500' },
  { id: 4, title: 'Interview Two-Shot', duration: '18s', points: 6, bg: 'bg-gradient-to-br from-red-500 to-orange-500' },
  { id: 5, title: 'Farewell Scene', duration: '25s', points: 12, bg: 'bg-gradient-to-br from-purple-500 to-violet-600' },
  { id: 6, title: 'Studio Tour', duration: '45s', points: 15, bg: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
];

export function TrajectoryLibrary({ onBack }: { onBack?: () => void }) {
  const [activeCategory, setActiveCategory] = React.useState('all');

  return (
    <div className="flex h-full w-full bg-[#111111] text-gray-200 font-sans">

      {/* Sidebar */}
      <div className="w-64 bg-[#161616] border-r border-[#222] flex flex-col p-4 shrink-0 relative">
        <div className="flex items-center space-x-3 mb-6">
          <button onClick={onBack} className="p-1.5 hover:bg-white/10 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <span className="text-xl font-semibold text-white">轨迹库</span>
        </div>

        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl py-3 flex items-center justify-center space-x-2 font-medium transition shadow-lg shadow-indigo-500/20 mb-8">
          <Plus className="w-5 h-5" />
          <span>新建轨迹</span>
        </button>

        <div className="text-xs text-gray-500 font-medium mb-3 pl-2">分类</div>

        <div className="flex-1 overflow-y-auto space-y-1">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <category.icon className={`w-5 h-5 ${activeCategory === category.id ? 'text-indigo-400' : 'text-gray-500'}`} />
                <span className="text-sm">{category.name}</span>
              </div>
              <span className={`text-xs ${activeCategory === category.id ? 'text-indigo-400' : 'text-gray-600'}`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Storage Info */}
        <div className="mt-auto pt-4 border-t border-[#222]">
          <div className="flex justify-between text-xs text-gray-500 mb-2 px-1">
            <span>存储</span>
            <span>5.1MB / 500MB</span>
          </div>
          <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[1%]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">

        {/* Top Header */}
        <div className="h-16 border-b border-[#222] flex items-center justify-between px-6 bg-[#0A0A0A]">
          <div className="relative w-96">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索轨迹..."
              className="w-full bg-[#161616] border border-[#222] rounded-full py-1.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{TRAJECTORIES.length} 条轨迹</span>
            <div className="flex items-center bg-[#161616] rounded-lg border border-[#222] p-1">
               <button className="p-1.5 rounded-md bg-[#2A2A2A] text-gray-300">
                 <LayoutGrid className="w-4 h-4" />
               </button>
               <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-300 transition">
                 <div className="w-4 h-4 flex flex-col justify-between">
                   <div className="w-full h-[3px] bg-current rounded-full" />
                   <div className="w-full h-[3px] bg-current rounded-full" />
                   <div className="w-full h-[3px] bg-current rounded-full" />
                 </div>
               </button>
            </div>
          </div>
        </div>

        {/* Grid Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TRAJECTORIES.map((item) => (
              <div key={item.id} className="bg-[#161616] border border-[#222] rounded-2xl overflow-hidden group hover:border-[#333] transition-colors">

                {/* Gradient Thumbnail */}
                <div className={`w-full aspect-[4/3] ${item.bg} relative`}>
                   {/* Hover Play Overlay */}
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                   </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-200 mb-2 truncate">{item.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.points} 点</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-1.5 flex items-center justify-center space-x-1 text-sm font-medium transition">
                      <Play className="w-3.5 h-3.5" />
                      <span>运行</span>
                    </button>
                    <button className="flex-1 bg-[#222] hover:bg-[#2A2A2A] text-gray-300 rounded-lg py-1.5 flex items-center justify-center space-x-1 text-sm transition">
                      <span>编辑</span>
                    </button>
                    <button className="w-9 h-[32px] bg-[#222] hover:bg-red-500/10 hover:text-red-400 text-gray-400 rounded-lg flex items-center justify-center transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}