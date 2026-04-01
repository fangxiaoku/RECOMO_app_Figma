import { useAppContext } from '../context/AppContext';
import { Target, Crosshair, CheckCircle2 } from 'lucide-react';

const LiveView = () => {
  const { isTracking } = useAppContext();

  return (
    <div className="relative w-full h-full bg-gray-950 flex items-center justify-center overflow-hidden">

      {/* Mock Camera Feed Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black opacity-50"></div>

      {/* Grid Overlay for camera feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0yMCAyMGgyMHYyMEgyMHptMjAgMGgtMjBWMGgyMHoiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4xIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>

      {/* Target Bounding Box (simulated when locked) */}
      {isTracking && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-green-500 rounded bg-green-500/10 flex items-center justify-center pointer-events-none">
           <Crosshair className="text-green-500 opacity-50" size={32} />
           <div className="absolute -top-6 left-0 text-green-500 text-xs font-mono bg-black/50 px-1 rounded">Subject_1</div>
        </div>
      )}

      {/* Center Crosshair (always visible) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
        <div className="w-8 h-px bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-px h-8 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* OSD (On-Screen Display) Overlay based on PRD UI mockup */}
      <div className="absolute top-4 left-4 p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-gray-800/50 text-white font-mono text-sm shadow-xl min-w-[280px]">
        <div className="flex items-center space-x-2 border-b border-gray-700/50 pb-2 mb-2">
          <Target className="text-blue-400" size={18} />
          <span className="font-bold text-gray-200">Motion Tracking</span>
          <span className="bg-blue-900/40 text-blue-300 text-xs px-1.5 py-0.5 rounded ml-auto">Follow</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
             <span className="text-gray-400">目标状态:</span>
             {isTracking ? (
                <span className="flex items-center text-green-400"><CheckCircle2 size={14} className="mr-1" />已锁定</span>
             ) : (
                <span className="text-yellow-500">等待标定</span>
             )}
          </div>
          <div className="flex justify-between items-center">
             <span className="text-gray-400">跟踪精度:</span>
             <span className="text-gray-200">高</span>
          </div>
          <div className="pt-1">
            <span className="text-gray-400 block mb-0.5">目标坐标:</span>
            <div className="grid grid-cols-3 gap-1 text-center bg-gray-900/50 p-1 rounded">
               <span className="text-blue-300">X: 1.23</span>
               <span className="text-green-300">Y: 0.89</span>
               <span className="text-purple-300">Z: 2.10</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-1.5">
          <span className="text-gray-400 block mb-0.5">当前位置 (6DOF):</span>
          <div className="grid grid-cols-3 gap-1 text-xs">
             <span className="text-gray-300">X: 0.567m</span>
             <span className="text-gray-300">Y: 0.789m</span>
             <span className="text-gray-300">Z: 1.345m</span>
             <span className="text-gray-300">Pan: 50°</span>
             <span className="text-gray-300">Tilt: -20°</span>
             <span className="text-gray-300">Roll: 0°</span>
          </div>
        </div>
      </div>

      {/* Optional safe area markers or other camera UI could go here */}

    </div>
  );
};

export default LiveView;
