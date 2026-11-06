import { create } from 'zustand';
import { SectionId, CAMERA_PRESETS } from '../lib/constants';
import { Project, PORTFOLIO_DATA } from '../lib/portfolio-data';

export type FlowState = 'idle' | 'transitioning' | 'inspecting' | 'simulating';

export interface SceneStore {
  // Core Scene Flow
  flowState: FlowState;
  uProgress: number;
  activeSection: SectionId;
  inspectMode: boolean;

  // Interactivity & Telemetry
  audioReactivity: number;
  audioListening: boolean;
  selectedProject: Project | null;
  activeSimulator: 'disaster' | 'face' | 'agro' | null;
  commandPaletteOpen: boolean;
  greetModalOpen: boolean;
  fps: number;

  // Actions
  setFlowState: (state: FlowState) => void;
  setUProgress: (progress: number) => void;
  setActiveSection: (section: SectionId) => void;
  setInspectMode: (inspect: boolean) => void;
  toggleInspectMode: () => void;
  setAudioReactivity: (reactivity: number) => void;
  setAudioListening: (listening: boolean) => void;
  setSelectedProject: (project: Project | null) => void;
  setActiveSimulator: (sim: 'disaster' | 'face' | 'agro' | null) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setGreetModalOpen: (open: boolean) => void;
  setFps: (fps: number) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  flowState: 'idle',
  uProgress: 0.0,
  activeSection: 'home',
  inspectMode: false,

  audioReactivity: 0.0,
  audioListening: false,
  selectedProject: PORTFOLIO_DATA.projects[0],
  activeSimulator: null,
  commandPaletteOpen: false,
  greetModalOpen: false,
  fps: 60,

  setFlowState: (flowState) => set({ flowState }),

  setUProgress: (uProgress) => set({ uProgress }),

  setActiveSection: (activeSection) => {
    const targetProgress = CAMERA_PRESETS[activeSection]?.uProgressTarget ?? 0;
    set({
      activeSection,
      flowState: 'transitioning',
      uProgress: targetProgress,
    });
    // Return to idle after transition delay
    setTimeout(() => {
      set({ flowState: 'idle' });
    }, 600);
  },

  setInspectMode: (inspectMode) =>
    set({
      inspectMode,
      flowState: inspectMode ? 'inspecting' : 'idle',
    }),

  toggleInspectMode: () =>
    set((state) => ({
      inspectMode: !state.inspectMode,
      flowState: !state.inspectMode ? 'inspecting' : 'idle',
    })),

  setAudioReactivity: (audioReactivity) => set({ audioReactivity }),

  setAudioListening: (audioListening) => set({ audioListening }),

  setSelectedProject: (selectedProject) => set({ selectedProject }),

  setActiveSimulator: (activeSimulator) =>
    set({
      activeSimulator,
      flowState: activeSimulator ? 'simulating' : 'idle',
    }),

  setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),

  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  setGreetModalOpen: (greetModalOpen) => set({ greetModalOpen }),

  setFps: (fps) => set({ fps }),
}));

export default useSceneStore;
