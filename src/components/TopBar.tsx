import { useAppContext } from '../context/AppContext';
import { Battery, Mic, Settings2 } from 'lucide-react';

const TopBar = () => {
  const { userMode, setUserMode } = useAppContext();

  return (
    <div className="flex items-center justify-between w-full h-full text-gray-200">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold tracking-wider text-white">RECOMO Pro</h1>
        <span className="text-xs font-mono text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded-full mt-1">v0.8_Beta</span>
      </div>

      <div className="flex items-center space-x-6">
        {/* Status Indicators */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-gray-400 hover:text-white transition cursor-default" title="麦克风已连接">
            <Mic size={18} className="text-green-400" />
          </div>
          <div className="flex items-center space-x-1.5 text-gray-400 hover:text-white transition cursor-default" title="电池剩余 80%">
            <Battery size={18} className="text-green-400" />
            <span className="text-xs font-medium">80%</span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-[var(--color-dark-border)]"></div>

        {/* Novice/Professional Toggle */}
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-medium ${userMode === 'novice' ? 'text-blue-400' : 'text-gray-500'}`}>新手</span>
          <button
            onClick={() => setUserMode(userMode === 'novice' ? 'professional' : 'novice')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-pressed={userMode === 'professional'}
            aria-label="Toggle user mode"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userMode === 'professional' ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
          <span className={`text-xs font-medium flex items-center space-x-1 ${userMode === 'professional' ? 'text-blue-400' : 'text-gray-500'}`}>
            <span>专业</span>
            {userMode === 'professional' && <Settings2 size={12} className="ml-0.5" />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
