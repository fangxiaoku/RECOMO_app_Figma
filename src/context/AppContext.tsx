import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Define the available modes based on PRD
export type UserMode = 'novice' | 'professional';
export type AppMode = 'editor' | 'tracking' | 'playback' | 'files' | 'settings';

interface AppState {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  isTracking: boolean;
  setIsTracking: (isTracking: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userMode, setUserMode] = useState<UserMode>('novice');
  const [appMode, setAppMode] = useState<AppMode>('tracking'); // Default to tracking as per PRD focus
  const [isTracking, setIsTracking] = useState(false);

  return (
    <AppContext.Provider
      value={{
        userMode,
        setUserMode,
        appMode,
        setAppMode,
        isTracking,
        setIsTracking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
