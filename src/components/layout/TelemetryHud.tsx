import React from 'react';
import { Activity, Cpu, Radio, Eye } from 'lucide-react';
import { useSceneStore } from '../../store/useSceneStore';
import { GRAPHICS_CONFIG, SECTION_METAS } from '../../lib/constants';

export const TelemetryHud: React.FC = () => {
  const flowState = useSceneStore((state) => state.flowState);
  const uProgress = useSceneStore((state) => state.uProgress);
  const activeSection = useSceneStore((state) => state.activeSection);
  const inspectMode = useSceneStore((state) => state.inspectMode);
  const toggleInspectMode = useSceneStore((state) => state.toggleInspectMode);
  const audioReactivity = useSceneStore((state) => state.audioReactivity);
  const audioListening = useSceneStore((state) => state.audioListening);

  const activeMeta = SECTION_METAS[activeSection];

  return (
    <aside
      aria-label="System Telemetry HUD"
      className="fixed bottom-4 left-4 right-4 z-30 pointer-events-none flex flex-col md:flex-row items-end md:items-center justify-between gap-3 text-[11px] font-mono text-text-muted select-none"
    >
      {/* Left HUD: System Status & Morph Progress */}
      <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-bg-secondary/80 border border-gold/20 backdrop-blur-md shadow-card-glass">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="text-text font-bold uppercase tracking-wider">
            {activeMeta.badge.split(' // ')[0]}
          </span>
        </div>

        <span className="text-white/20">|</span>

        {/* State chip */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-text-muted">STATE:</span>
          <span
            className={`font-semibold uppercase ${
              flowState === 'inspecting'
                ? 'text-neon-cyan'
                : flowState === 'simulating'
                ? 'text-emerald-400'
                : 'text-gold'
            }`}
          >
            {flowState}
          </span>
        </div>

        <span className="text-white/20 hidden sm:inline">|</span>

        {/* Morph Progress Bar */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] text-text-muted">MORPH:</span>
          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-300"
              style={{ width: `${Math.round(uProgress * 100)}%` }}
            />
          </div>
          <span className="text-text text-[10px]">{Math.round(uProgress * 100)}%</span>
        </div>
      </div>

      {/* Right HUD: GPU Nodes, Audio Energy & Quick Inspect */}
      <div className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-secondary/80 border border-white/10 backdrop-blur-md shadow-card-glass">
        {/* Audio Reactivity Meter */}
        {audioListening && (
          <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
            <Radio className="w-3 h-3 text-gold animate-pulse" />
            <div className="w-10 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-75"
                style={{ width: `${Math.min(100, Math.round(audioReactivity * 300))}%` }}
              />
            </div>
          </div>
        )}

        {/* Geometry Stats */}
        <div className="hidden lg:flex items-center gap-1.5 text-text-subtle">
          <Cpu className="w-3.5 h-3.5 text-gold/60" />
          <span>{GRAPHICS_CONFIG.NODE_COUNT} NODES</span>
        </div>

        {/* Inspect Mode Pill Toggle */}
        <button
          onClick={toggleInspectMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider transition-all border ${
            inspectMode
              ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50 shadow-sm'
              : 'bg-white/5 text-text-muted hover:text-text border-white/10 hover:border-gold/30'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>{inspectMode ? 'INSPECT ON' : 'INSPECT'}</span>
        </button>
      </div>
    </aside>
  );
};

export default TelemetryHud;
