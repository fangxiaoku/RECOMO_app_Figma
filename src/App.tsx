import AppLayout from './layouts/AppLayout';
import TopBar from './components/TopBar';
import LiveView from './components/LiveView';
import ParameterPanel from './components/ParameterPanel';
import TimelinePanel from './components/TimelinePanel';
import { useAppContext } from './context/AppContext';
import { Target, MonitorPlay, Video, FolderOpen, Settings as SettingsIcon } from 'lucide-react';

function App() {
  const { isTracking } = useAppContext();

  return (
    <AppLayout
      topBar={<TopBar />}
      sidebarLeft={
        <div className="flex flex-col space-y-6 items-center w-full">
          <button className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-white transition w-full" disabled={isTracking}>
            <MonitorPlay size={24} />
            <span className="text-[10px]">Editor</span>
          </button>

          <button className="flex flex-col items-center justify-center space-y-1 text-blue-400 bg-blue-900/20 w-16 h-16 rounded-2xl transition border border-blue-500/30">
            <Target size={24} />
            <span className="text-[10px] font-bold">Tracking</span>
          </button>

          <button className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-white transition w-full" disabled={isTracking}>
            <Video size={24} />
            <span className="text-[10px]">Playback</span>
          </button>

          <button className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-white transition w-full" disabled={isTracking}>
            <FolderOpen size={24} />
            <span className="text-[10px]">Files</span>
          </button>

          <button className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-white transition w-full mt-auto mb-2" disabled={isTracking}>
            <SettingsIcon size={24} />
            <span className="text-[10px]">Settings</span>
          </button>
        </div>
      }
      mainContent={<LiveView />}
      sidebarRight={<ParameterPanel />}
      bottomBar={<TimelinePanel />}
    />
  );
}

export default App;
