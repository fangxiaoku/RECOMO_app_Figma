import { useAppContext } from '../context/AppContext';
import { Settings, Activity, Zap, Layers } from 'lucide-react';

const ParameterPanel = () => {
  const { userMode, isTracking } = useAppContext();

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-dark-panel)] text-gray-200">
      <div className="p-4 border-b border-[var(--color-dark-border)] flex items-center justify-between sticky top-0 bg-[var(--color-dark-panel)] z-10">
        <h2 className="text-sm font-bold tracking-wider flex items-center space-x-2">
          <Settings size={16} className="text-gray-400" />
          <span>参数设置</span>
        </h2>
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${userMode === 'novice' ? 'bg-blue-900/50 text-blue-400' : 'bg-purple-900/50 text-purple-400'}`}>
          {userMode === 'novice' ? 'NOVICE' : 'PRO'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* Core Settings (Always visible) */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-gray-400">运行速度倍率</label>
              <span className="text-xs font-mono text-blue-400">1.0x</span>
            </div>
            <input
              type="range"
              min="0.1" max="2.0" step="0.1" defaultValue="1.0"
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              disabled={isTracking}
            />
            <div className="flex justify-between text-[10px] text-gray-600 px-1">
              <span>慢</span>
              <span>快</span>
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-xs font-medium text-gray-400 block mb-1.5">运动曲线</label>
             <div className="grid grid-cols-2 gap-2">
               <button className="bg-blue-600 text-white text-xs py-1.5 rounded" disabled={isTracking}>Ease In-Out</button>
               <button className={`bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-1.5 rounded transition ${userMode === 'novice' && 'opacity-50 cursor-not-allowed'}`} disabled={userMode === 'novice' || isTracking}>Linear</button>
               {userMode === 'professional' && (
                 <>
                  <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-1.5 rounded transition" disabled={isTracking}>Ease In</button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-1.5 rounded transition" disabled={isTracking}>Ease Out</button>
                 </>
               )}
             </div>
             {userMode === 'novice' && <p className="text-[10px] text-gray-500 italic mt-1">新手模式默认锁定最佳曲线</p>}
          </div>
        </div>

        {/* Professional Settings */}
        {userMode === 'professional' && (
          <>
            <div className="h-px bg-[var(--color-dark-border)] my-4"></div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-300 flex items-center space-x-1.5 uppercase tracking-wider mb-3">
                <Activity size={14} className="text-purple-400" />
                <span>高级跟踪参数</span>
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-gray-400">跟拍加速度</label>
                  <span className="text-xs font-mono text-gray-300">2.5 m/s²</span>
                </div>
                <input
                  type="range"
                  min="0.5" max="5.0" step="0.1" defaultValue="2.5"
                  className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  disabled={isTracking}
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-gray-400">识别灵敏度</label>
                  <span className="text-xs font-mono text-gray-300">高</span>
                </div>
                <div className="flex bg-gray-800 rounded p-0.5">
                   <button className="flex-1 text-xs py-1 rounded text-gray-400 hover:text-white transition" disabled={isTracking}>低</button>
                   <button className="flex-1 text-xs py-1 rounded text-gray-400 hover:text-white transition" disabled={isTracking}>中</button>
                   <button className="flex-1 text-xs py-1 rounded bg-gray-600 text-white shadow-sm" disabled={isTracking}>高</button>
                </div>
              </div>

               <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-gray-400">中心偏移阈值</label>
                  <span className="text-xs font-mono text-gray-300">5%</span>
                </div>
                <input
                  type="range"
                  min="0" max="10" step="1" defaultValue="5"
                  className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  disabled={isTracking}
                />
              </div>
            </div>

            <div className="h-px bg-[var(--color-dark-border)] my-4"></div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-300 flex items-center space-x-1.5 uppercase tracking-wider mb-2">
                <Zap size={14} className="text-yellow-400" />
                <span>场景预设 (专业)</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                 <button className="flex items-center justify-center space-x-1 border border-gray-700 hover:border-gray-500 bg-gray-800/50 py-2 rounded transition" disabled={isTracking}>
                   <Layers size={14} className="text-gray-400" />
                   <span className="text-[10px] text-gray-300">攀岩</span>
                 </button>
                 <button className="flex items-center justify-center space-x-1 border border-gray-700 hover:border-gray-500 bg-gray-800/50 py-2 rounded transition" disabled={isTracking}>
                   <Layers size={14} className="text-gray-400" />
                   <span className="text-[10px] text-gray-300">口播切机</span>
                 </button>
                 <button className="flex items-center justify-center space-x-1 border border-gray-700 hover:border-gray-500 bg-gray-800/50 py-2 rounded transition" disabled={isTracking}>
                   <Layers size={14} className="text-gray-400" />
                   <span className="text-[10px] text-gray-300">穿搭跟随</span>
                 </button>
                  <button className="flex items-center justify-center space-x-1 border border-gray-700 hover:border-gray-500 bg-gray-800/50 py-2 rounded transition" disabled={isTracking}>
                   <Layers size={14} className="text-gray-400" />
                   <span className="text-[10px] text-gray-300">教学演示</span>
                 </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParameterPanel;
