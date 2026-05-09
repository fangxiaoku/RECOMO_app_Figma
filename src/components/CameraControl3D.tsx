import { useState, useEffect } from 'react';

interface CameraControl3DProps {
  onPositionChange?: (position: { x: number; y: number; z: number }) => void;
  onRotationChange?: (rotation: { pan: number; tilt: number; roll: number }) => void;
}

export function CameraControl3D({ onPositionChange, onRotationChange }: CameraControl3DProps) {
  const [activeControl, setActiveControl] = useState<string | null>(null);

  // Camera position (translation)
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  // Camera rotation
  const [rotation, setRotation] = useState({ pan: 0, tilt: 0, roll: 0 });

  const handleDrag = (type: string, deltaX: number, deltaY: number) => {
    switch (type) {
      case 'y-axis':
        // Vertical movement
        setPosition(prev => {
          const newPos = { ...prev, y: Math.max(-100, Math.min(100, prev.y + deltaY * 0.5)) };
          onPositionChange?.(newPos);
          return newPos;
        });
        break;
      case 'x-axis':
        // Horizontal movement
        setPosition(prev => {
          const newPos = { ...prev, x: Math.max(-100, Math.min(100, prev.x + deltaX * 0.5)) };
          onPositionChange?.(newPos);
          return newPos;
        });
        break;
      case 'z-axis':
        // Forward/backward movement
        setPosition(prev => {
          const newPos = { ...prev, z: Math.max(-100, Math.min(100, prev.z - deltaY * 0.5)) };
          onPositionChange?.(newPos);
          return newPos;
        });
        break;
      case 'pan':
        // Pan rotation (left/right)
        setRotation(prev => {
          const newRot = { ...prev, pan: Math.max(-180, Math.min(180, prev.pan + deltaX * 0.3)) };
          onRotationChange?.(newRot);
          return newRot;
        });
        break;
      case 'tilt':
        // Tilt rotation (up/down)
        setRotation(prev => {
          const newRot = { ...prev, tilt: Math.max(-90, Math.min(90, prev.tilt + deltaY * 0.3)) };
          onRotationChange?.(newRot);
          return newRot;
        });
        break;
      case 'roll':
        // Roll rotation
        setRotation(prev => {
          const newRot = { ...prev, roll: Math.max(-180, Math.min(180, prev.roll + deltaX * 0.3)) };
          onRotationChange?.(newRot);
          return newRot;
        });
        break;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeControl) {
        handleDrag(activeControl, e.movementX, e.movementY);
      }
    };

    const handleMouseUp = () => {
      setActiveControl(null);
    };

    if (activeControl) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeControl]);

  const handleTouchStart = (type: string) => {
    setActiveControl(type);
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0, z: 0 });
    onPositionChange?.({ x: 0, y: 0, z: 0 });
  };

  const resetRotation = () => {
    setRotation({ pan: 0, tilt: 0, roll: 0 });
    onRotationChange?.({ pan: 0, tilt: 0, roll: 0 });
  };

  return (
    <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden select-none">
      <div className="absolute inset-0">
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-blue-500 rounded-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-sm text-gray-400 mb-1">相机控制</div>
            <div className="text-xs text-gray-500">拖动控制点</div>
          </div>
        </div>

        {/* Y-Axis Control (Vertical - Green) */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <button
            onMouseDown={() => handleTouchStart('y-axis')}
            className={`relative ${activeControl === 'y-axis' ? 'scale-110' : ''} transition-transform`}
          >
            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-green-300 shadow-lg" />
            <svg className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-6 h-20 text-green-500" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="50%" y1="0" x2="50%" y2="100%" />
              <polygon points="12,0 6,8 18,8" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Y-Axis Control Bottom (Green) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onMouseDown={() => handleTouchStart('y-axis')}
            className={`relative ${activeControl === 'y-axis' ? 'scale-110' : ''} transition-transform`}
          >
            <svg className="absolute -top-20 left-1/2 -translate-x-1/2 w-6 h-20 text-green-500" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="50%" y1="0" x2="50%" y2="100%" />
              <polygon points="12,20 6,12 18,12" fill="currentColor" transform="translate(0,0)" />
            </svg>
            <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-green-300 shadow-lg" />
          </button>
        </div>

        {/* X-Axis Control Left (Pink) */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <button
            onMouseDown={() => handleTouchStart('x-axis')}
            className={`relative ${activeControl === 'x-axis' ? 'scale-110' : ''} transition-transform`}
          >
            <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-pink-300 shadow-lg" />
            <svg className="absolute left-10 top-1/2 -translate-y-1/2 w-20 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="0" y1="50%" x2="100%" y2="50%" />
              <polygon points="0,12 8,6 8,18" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* X-Axis Control Right (Pink) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <button
            onMouseDown={() => handleTouchStart('x-axis')}
            className={`relative ${activeControl === 'x-axis' ? 'scale-110' : ''} transition-transform`}
          >
            <svg className="absolute right-10 top-1/2 -translate-y-1/2 w-20 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="0" y1="50%" x2="100%" y2="50%" />
              <polygon points="20,12 12,6 12,18" fill="currentColor" />
            </svg>
            <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-pink-300 shadow-lg" />
          </button>
        </div>

        {/* Z-Axis Control Top Right (Yellow) */}
        <div className="absolute top-4 right-16">
          <button
            onMouseDown={() => handleTouchStart('z-axis')}
            className={`relative ${activeControl === 'z-axis' ? 'scale-110' : ''} transition-transform`}
          >
            <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-yellow-300 shadow-lg" />
            <svg className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-16 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="50%" y1="0" x2="50%" y2="100%" />
            </svg>
          </button>
        </div>

        {/* Z-Axis Control Bottom Right (Yellow) */}
        <div className="absolute bottom-16 right-16">
          <button
            onMouseDown={() => handleTouchStart('z-axis')}
            className={`relative ${activeControl === 'z-axis' ? 'scale-110' : ''} transition-transform`}
          >
            <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-yellow-300 shadow-lg" />
          </button>
        </div>

        {/* Pan Rotation Control (Curved Pink Arrow at Bottom) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <button
            onMouseDown={() => handleTouchStart('pan')}
            className={`${activeControl === 'pan' ? 'scale-110' : ''} transition-transform`}
          >
            <svg width="200" height="80" className="text-pink-500" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M 20,60 Q 100,20 180,60" />
              <circle cx="20" cy="60" r="6" fill="currentColor" />
              <circle cx="180" cy="60" r="6" fill="currentColor" />
              <polygon points="175,55 185,60 175,65" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Tilt Rotation Control (Vertical Green on Left) */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <button
            onMouseDown={() => handleTouchStart('tilt')}
            className={`${activeControl === 'tilt' ? 'scale-110' : ''} transition-transform`}
          >
            <svg width="80" height="200" className="text-green-500" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M 60,20 Q 20,100 60,180" />
              <circle cx="60" cy="20" r="6" fill="currentColor" />
              <circle cx="60" cy="180" r="6" fill="currentColor" />
              <polygon points="55,175 60,185 65,175" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Roll Rotation Control (Horizontal Pink at Top Right) */}
        <div className="absolute top-12 right-8">
          <button
            onMouseDown={() => handleTouchStart('roll')}
            className={`${activeControl === 'roll' ? 'scale-110' : ''} transition-transform`}
          >
            <svg width="100" height="60" className="text-pink-500" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="10" y1="30" x2="90" y2="30" />
              <circle cx="10" cy="30" r="6" fill="currentColor" />
              <circle cx="90" cy="30" r="6" fill="currentColor" />
              <polygon points="85,25 95,30 85,35" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Rotation Indicator (Bottom Right Blue) */}
        <div className="absolute bottom-8 right-8">
          <button className="relative">
            <svg width="80" height="60" className="text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M 10,30 L 40,10 L 70,30 L 40,50 Z" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="70" cy="10" r="6" fill="currentColor" />
              <circle cx="70" cy="50" r="6" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Position/Rotation Display */}
      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded px-3 py-2 text-xs text-white space-y-1">
        <div className="font-semibold mb-1 text-gray-300">位置</div>
        <div>X: {position.x.toFixed(1)}</div>
        <div>Y: {position.y.toFixed(1)}</div>
        <div>Z: {position.z.toFixed(1)}</div>
        <div className="font-semibold mt-2 mb-1 text-gray-300">旋转</div>
        <div>Pan: {rotation.pan.toFixed(1)}°</div>
        <div>Tilt: {rotation.tilt.toFixed(1)}°</div>
        <div>Roll: {rotation.roll.toFixed(1)}°</div>
      </div>

      {/* Reset Buttons */}
      <div className="absolute bottom-2 left-2 flex gap-2">
        <button
          onClick={resetPosition}
          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
        >
          归位
        </button>
        <button
          onClick={resetRotation}
          className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded"
        >
          复位旋转
        </button>
      </div>

      {/* Active Control Indicator */}
      {activeControl && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
          控制中: {activeControl}
        </div>
      )}
    </div>
  );
}
