import { create } from 'zustand'

export type FlowState = 'greet' | 'morph' | 'about' | 'home' | 'projects' | 'case-study' | 'expertise' | 'contact'

export interface SceneStore {
  flowState: FlowState
  targetProgress: number        // 0 = Golden Core Sphere, 1 = 3D Portrait
  targetCvProgress: number      // 0 = Normal, 1 = 3D Golden CV Hologram
  targetBrainProgress: number   // 0 = Normal, 1 = 3D Golden Brain + Pedestal Hologram
  isCvPaperOpen: boolean
  manualProgress: number | null
  activeCaseStudyId: string
  isCanvasDimmed: boolean
  customImageSrc: string | null
  setFlowState: (state: FlowState) => void
  setTargetProgress: (val: number) => void
  setTargetCvProgress: (val: number) => void
  setTargetBrainProgress: (val: number) => void
  setCvPaperOpen: (open: boolean) => void
  setManualProgress: (val: number | null) => void
  setActiveCaseStudy: (id: string) => void
  toggleInspect3D: () => void
  setCustomImage: (src: string) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  flowState: 'greet',
  targetProgress: 0,
  targetCvProgress: 0,
  targetBrainProgress: 0,
  isCvPaperOpen: false,
  manualProgress: null,
  activeCaseStudyId: 'disaster-nlp',
  isCanvasDimmed: false,
  customImageSrc: null,

  setFlowState: (flowState) =>
    set(() => {
      const isPortraitView = flowState === 'morph' || flowState === 'home'
      const isAboutView = flowState === 'about'
      const isExpertiseView = flowState === 'expertise'
      // Keep 'home', 'case-study', 'about', and 'expertise' unblurred so the 3D Core/Brain/CV are sharp!
      const shouldDim = ['projects', 'contact'].includes(flowState)
      return {
        flowState,
        targetProgress: isPortraitView ? 1 : 0,
        targetCvProgress: isAboutView ? 1 : 0,
        targetBrainProgress: isExpertiseView ? 1 : 0,
        isCvPaperOpen: false,
        manualProgress: null,
        isCanvasDimmed: shouldDim,
      }
    }),

  setTargetProgress: (targetProgress) =>
    set({ targetProgress, targetCvProgress: 0, targetBrainProgress: 0 }),
  setTargetCvProgress: (targetCvProgress) =>
    set({ targetCvProgress, targetBrainProgress: 0 }),
  setTargetBrainProgress: (targetBrainProgress) =>
    set({ targetBrainProgress, targetProgress: 0, targetCvProgress: 0 }),
  setCvPaperOpen: (isCvPaperOpen) => set({ isCvPaperOpen }),
  setManualProgress: (manualProgress) =>
    set({ manualProgress, targetCvProgress: 0, targetBrainProgress: 0, isCanvasDimmed: false }),
  setActiveCaseStudy: (activeCaseStudyId) => {
    if (typeof window !== 'undefined') window.location.hash = '#case-study'
    set({
      activeCaseStudyId,
      flowState: 'case-study',
      targetProgress: 0,
      targetCvProgress: 0,
      targetBrainProgress: 0,
      manualProgress: null,
      isCanvasDimmed: false,
    })
  },
  toggleInspect3D: () => set((state) => ({ isCanvasDimmed: !state.isCanvasDimmed })),
  setCustomImage: (customImageSrc) =>
    set({
      customImageSrc,
      targetProgress: 1,
      targetCvProgress: 0,
      targetBrainProgress: 0,
      isCanvasDimmed: false,
    }),
}))

export default useSceneStore
