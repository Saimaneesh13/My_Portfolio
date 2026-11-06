import React from 'react';
import { useSceneStore } from './store/useSceneStore';
import { CoreScene } from './components/canvas/CoreScene';
import { Navbar } from './components/layout/Navbar';
import { TelemetryHud } from './components/layout/TelemetryHud';
import { CommandPalette } from './components/layout/CommandPalette';
import { GreetOverlay } from './components/layout/GreetOverlay';

import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ProjectsView } from './components/views/ProjectsView';
import { CaseStudyView } from './components/views/CaseStudyView';
import { ExpertiseView } from './components/views/ExpertiseView';
import { ContactView } from './components/views/ContactView';
import { BRAND } from './lib/constants';

export const App: React.FC = () => {
  const activeSection = useSceneStore((state) => state.activeSection);

  const renderActiveView = () => {
    switch (activeSection) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'projects':
        return <ProjectsView />;
      case 'casestudy':
        return <CaseStudyView />;
      case 'expertise':
        return <ExpertiseView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-gold/30 selection:text-gold-light overflow-x-hidden">
      {/* 1. Persistent 3D WebGL Neural Scene Canvas (R3F) */}
      <CoreScene />

      {/* 2. Cybernetic subtle grid texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-cyber-grid opacity-25" />

      {/* 3. Global Futuristic Navbar Header */}
      <Navbar />

      {/* 4. Active Portfolio View Container */}
      <main className="relative z-20 pt-20 pb-24 px-4 min-h-[calc(100vh-5rem)] flex flex-col justify-between">
        <div className="w-full">{renderActiveView()}</div>

        {/* Subtle footer */}
        <footer className="mt-12 py-4 border-t border-white/5 text-center font-mono text-[11px] text-text-subtle">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.name} // Neural Portfolio Architecture // Built with React, Three.js & Strict TypeScript
          </p>
        </footer>
      </main>

      {/* 5. Telemetry Status HUD */}
      <TelemetryHud />

      {/* 6. Command Palette Overlay (⌘K) */}
      <CommandPalette />

      {/* 7. Neural Synthesizer Greet Overlay */}
      <GreetOverlay />
    </div>
  );
};

export default App;
