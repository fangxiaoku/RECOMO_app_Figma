import { useAppContext } from '../context/AppContext';
import { Play, Square, FastForward, RotateCcw, Sparkles } from 'lucide-react';

const TimelinePanel = () => {
  const { isTracking, setIsTracking } = useAppContext();

  return (
    <div className="flex flex-col w-full h-full text-gray-300 relative justify-center">

      {/* Top Section: Action Buttons and Status */}
      <div className="flex items-center justify-between w-full mb-2">

        {/* Playback Controls (Simulated) */}
        <div className="flex items-center space-x-2">
           <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition" disabled={isTracking}>
             <RotateCcw size={16} className="text-gray-400" />
           </button>
           <button className="p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 transition" disabled={isTracking}>
             <Play size={18} className="text-gray-200" fill="currentColor" />
           </button>
            <button className="p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 transition" disabled={isTracking}>
             <Square size={18} className="text-gray-400" fill="currentColor" />
           </button>
           <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition" disabled={isTracking}>
             <FastForward size={16} className="text-gray-400" />
           </button>
        </div>

        {/* Global Action Buttons */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-20">
            <button className="px-5 py-2 rounded-full font-bold bg-gray-800 border border-gray-700 hover:bg-gray-700 transition shadow-lg text-sm disabled:opacity-50" disabled={!isTracking}>
             重新标定
           </button>

           <button
             className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition shadow-xl border-4 ${
                isTracking
                  ? 'bg-red-600 border-red-900/50 hover:bg-red-500 hover:border-red-900 animate-pulse'
                  : 'bg-red-600 border-gray-800 hover:bg-red-500 hover:border-gray-700'
             }`}
             onClick={() => setIsTracking(!isTracking)}
             title={isTracking ? '停止跟踪' : '开始跟踪'}
           >
             {isTracking ? <Square size={24} fill="currentColor" className="text-white" /> : <div className="w-5 h-5 bg-white rounded-full"></div>}
           </button>

           <button className="px-5 py-2 rounded-full font-bold bg-blue-600/20 border border-blue-500/50 text-blue-400 hover:bg-blue-600/30 transition shadow-lg text-sm disabled:opacity-50">
             手动抓拍
           </button>
        </div>

        {/* Status Area */}
        <div className="flex items-center space-x-4">
           {isTracking && (
             <div className="flex items-center space-x-1.5 text-red-500 animate-pulse">
               <div className="w-2 h-2 rounded-full bg-red-500"></div>
               <span className="text-xs font-mono font-bold">REC 00:08.5</span>
             </div>
           )}
           <div className="flex items-center space-x-1.5 text-green-400 bg-green-900/20 px-2 py-1 rounded">
             <Sparkles size={14} />
             <span className="text-[10px] font-bold">AI 平滑就绪</span>
           </div>
        </div>

      </div>

      {/* Timeline Scrub Area */}
      <div className="relative w-full h-8 mt-1 group">
         {/* Timeline Track Background */}
         <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-gray-900 border-y border-gray-800 rounded overflow-hidden">
            {/* Recorded Track (Blue) */}
            <div className="absolute top-0 left-0 h-full w-[45%] bg-gradient-to-r from-blue-900 to-blue-600"></div>
            {/* Tracking Activity Indicator (Red, when tracking) */}
            {isTracking && (
               <div className="absolute top-0 left-[45%] h-full w-[15%] bg-gradient-to-r from-red-600/50 to-transparent animate-pulse"></div>
            )}
         </div>

         {/* Time Markers */}
         <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-gray-600 font-mono px-1 pointer-events-none">
            <span>00:00</span>
            <span>00:10</span>
            <span>00:20</span>
            <span>00:30</span>
            <span>00:40</span>
            <span>00:50</span>
            <span>01:00</span>
         </div>

         {/* Playhead */}
         <div className="absolute top-0 left-[45%] h-full w-px bg-white z-10 pointer-events-none">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-md shadow-white/20"></div>
         </div>

         {/* Keyframe Markers (Mocked) */}
         <div className="absolute top-1/2 left-[10%] w-1.5 h-1.5 -translate-y-1/2 bg-blue-300 rounded-full rotate-45 z-10 pointer-events-none"></div>
         <div className="absolute top-1/2 left-[25%] w-1.5 h-1.5 -translate-y-1/2 bg-blue-300 rounded-full rotate-45 z-10 pointer-events-none"></div>
      </div>

    </div>
  );
};

export default TimelinePanel;
