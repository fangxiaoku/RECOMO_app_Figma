import React, { type ReactNode } from 'react';

interface AppLayoutProps {
  topBar: ReactNode;
  sidebarLeft: ReactNode;
  mainContent: ReactNode;
  sidebarRight?: ReactNode;
  bottomBar: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  topBar,
  sidebarLeft,
  mainContent,
  sidebarRight,
  bottomBar,
}) => {
  return (
    // Outer container forcing a 16:10 aspect ratio layout for 11" tablet feel
    // Use h-screen to fill screen, but limit max-width to simulate tablet if on larger screen
    // Or scale to fit perfectly if running on actual tablet
    <div className="flex h-screen w-screen bg-black items-center justify-center overflow-hidden">

      {/*
        Tablet Screen Container (16:10 aspect ratio constraint).
        On a real tablet, it will just fill the screen (w-full h-full).
        On desktop, it restricts to aspect-video (close to 16:10) for preview purposes.
      */}
      <div className="relative flex flex-col w-full h-full max-w-[100vw] max-h-[100vh] lg:aspect-[16/10] lg:max-w-none lg:max-h-none lg:h-full overflow-hidden bg-[var(--color-dark-bg)] text-white shadow-2xl">

        {/* Top Navigation Bar */}
        <header className="flex-none h-14 bg-[var(--color-dark-panel)] border-b border-[var(--color-dark-border)] flex items-center px-4 justify-between z-10">
          {topBar}
        </header>

        {/* Main Workspace Area */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* Left Sidebar (Tools / Modes) */}
          <aside className="w-20 md:w-24 bg-[var(--color-dark-panel)] border-r border-[var(--color-dark-border)] flex flex-col items-center py-4 gap-6 z-10">
            {sidebarLeft}
          </aside>

          {/* Central Live View / Main Content Area */}
          <main className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
             {mainContent}
          </main>

          {/* Optional Right Sidebar (Parameters) */}
          {sidebarRight && (
            <aside className="w-64 md:w-80 bg-[var(--color-dark-panel)] border-l border-[var(--color-dark-border)] flex flex-col z-10 overflow-y-auto">
              {sidebarRight}
            </aside>
          )}
        </div>

        {/* Bottom Bar (Timeline / Controls) */}
        <footer className="flex-none h-24 bg-[var(--color-dark-panel)] border-t border-[var(--color-dark-border)] flex items-center px-4 z-10">
          {bottomBar}
        </footer>

      </div>
    </div>
  );
};

export default AppLayout;
