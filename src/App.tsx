import { useState } from 'react';
import { CameraControl3D } from './components/CameraControl3D';
import { Settings, Battery, Wifi, Menu, Camera, Video, Image as ImageIcon } from 'lucide-react'; // Need to install lucide-react

export default function App() {
  const [mode, setMode] = useState<'photo' | 'video'>('video');

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white font-sans overflow-hidden">
      {/* Top Status Bar */}
      <header className="flex justify-between items-center px-4 py-2 bg-black/80 z-10 text-sm">
        <div className="flex items-center space-x-2">
          <Menu className="w-5 h-5 text-gray-300" />
          <span className="font-bold tracking-wider text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">RECOMO</span>
        </div>

        <div className="flex items-center space-x-4 text-gray-300">
          <span className="text-xs bg-red-600 px-2 py-0.5 rounded animate-pulse">REC 00:04:23</span>
          <div className="flex items-center space-x-1">
            <span className="text-xs">4K 60FPS</span>
          </div>
          <Wifi className="w-4 h-4" />
          <div className="flex items-center space-x-1">
            <span className="text-xs">85%</span>
            <Battery className="w-4 h-4" />
          </div>
          <Settings className="w-5 h-5" />
        </div>
      </header>

      {/* Main Viewfinder Area */}
      <main className="flex-1 relative flex flex-col md:flex-row items-center justify-center p-4 gap-6 bg-zinc-950">

        {/* Left Side: Live Feed Placeholder */}
        <div className="w-full md:w-1/2 aspect-video bg-zinc-900 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>

          {/* Viewfinder Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>

          {/* Rule of Thirds Grid */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="w-full h-1/3 border-b border-white/10 absolute top-0"></div>
             <div className="w-full h-1/3 border-b border-white/10 absolute top-1/3"></div>
             <div className="w-1/3 h-full border-r border-white/10 absolute left-0"></div>
             <div className="w-1/3 h-full border-r border-white/10 absolute left-1/3"></div>
          </div>

          {/* Lens Info */}
          <div className="absolute bottom-4 left-4 text-xs text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
            14mm f/2.8 ISO 100
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="w-full md:w-[400px] flex flex-col gap-4">

          {/* The provided CameraControl3D Component */}
          <div className="w-full bg-zinc-900 rounded-xl p-2 border border-zinc-800 shadow-xl">
            <div className="text-xs text-gray-400 font-semibold mb-2 ml-1">Gimbal & Camera Control</div>
            <CameraControl3D />
          </div>

          {/* Quick Settings Bar */}
          <div className="flex justify-around bg-zinc-900 rounded-xl p-3 border border-zinc-800">
            <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition">
              <span className="text-[10px] font-bold">WB</span>
              <span className="text-xs text-blue-400">AUTO</span>
            </button>
            <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition">
              <span className="text-[10px] font-bold">EV</span>
              <span className="text-xs">0.0</span>
            </button>
            <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition">
              <span className="text-[10px] font-bold">FOCUS</span>
              <span className="text-xs text-yellow-500">AF-C</span>
            </button>
             <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition">
              <span className="text-[10px] font-bold">PRO</span>
              <span className="text-xs text-gray-500">OFF</span>
            </button>
          </div>
        </div>

      </main>

      {/* Bottom Control Bar */}
      <footer className="h-24 bg-black/90 border-t border-zinc-900 flex items-center justify-between px-8">
        {/* Gallery / Media */}
        <button className="w-12 h-12 rounded-full border border-zinc-700 bg-zinc-800 overflow-hidden relative flex items-center justify-center hover:border-gray-500 transition">
           <ImageIcon className="w-5 h-5 text-gray-400" />
        </button>

        {/* Shutter / Record Button */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setMode('photo')}
            className={`text-sm font-medium transition ${mode === 'photo' ? 'text-white' : 'text-gray-600'}`}
          >
            PHOTO
          </button>

          <button className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center group">
            <div className={`transition-all duration-300 ${mode === 'video' ? 'w-6 h-6 bg-red-600 rounded-sm group-hover:bg-red-500' : 'w-12 h-12 bg-white rounded-full group-hover:bg-gray-200'}`}></div>
          </button>

          <button
            onClick={() => setMode('video')}
            className={`text-sm font-medium transition ${mode === 'video' ? 'text-white' : 'text-gray-600'}`}
          >
            VIDEO
          </button>
        </div>

        {/* Switch Camera / Modes */}
        <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition">
          <Camera className="w-5 h-5 text-white" />
        </button>
      </footer>
    </div>
  );
}