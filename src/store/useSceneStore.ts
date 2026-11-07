import { create } from 'zustand'

export type FlowState = 'greet' | 'morph' | 'about' | 'home' | 'projects' | 'case-study' | 'expertise' | 'contact'

export interface SceneStore {
  flowState: FlowState
  targetProgress: number        // 0 = Golden Core Sphere, 1 = 3D Portrait
  manualProgress: number | null // Non-null when user drags the bottom-right slider
  activeCaseStudyId: string     // 'disaster-nlp' | 'face-attendance' | 'agrodetect'
  isCanvasDimmed: boolean       // Blurs/dims background when reading dense text views
  customImageSrc: string | null // Stores URL.createObjectURL when user uploads a photo
  setFlowState: (state: FlowState) => void
  setTargetProgress: (val: number) => void
  setManualProgress: (val: number | null) => void
  setActiveCaseStudy: (id: string) => void
  toggleInspect3D: () => void
  setCustomImage: (src: string) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  flowState: 'greet',
  targetProgress: 0,
  manualProgress: null,
  activeCaseStudyId: 'disaster-nlp',
  isCanvasDimmed: false,
  customImageSrc: null,

  setFlowState: (flowState) =>
    set(() => {
      // Morph to Portrait (1) on morph, home, and about; Morph to Core Sphere (0) on case-study & other views
      const isPortraitView = flowState === 'morph' || flowState === 'home' || flowState === 'about'
      // Turn OFF blur on 'case-study' and 'home' so the 3D Core/Portrait is completely sharp
      const shouldDim = ['about', 'projects', 'expertise', 'contact'].includes(flowState)
      return {
        flowState,
        targetProgress: isPortraitView ? 1 : 0,
        manualProgress: null,
        isCanvasDimmed: shouldDim,
      }
    }),

  setTargetProgress: (targetProgress) => set({ targetProgress }),
  setManualProgress: (manualProgress) => set({ manualProgress, isCanvasDimmed: false }),
  setActiveCaseStudy: (activeCaseStudyId) => {
    if (typeof window !== 'undefined') window.location.hash = '#case-study'
    set({
      activeCaseStudyId,
      flowState: 'case-study',
      targetProgress: 0,      // Morphs back to the Golden Core sphere
      manualProgress: null,
      isCanvasDimmed: false,  // Blur turned OFF by default on Case Studies
    })
  },
  toggleInspect3D: () => set((state) => ({ isCanvasDimmed: !state.isCanvasDimmed })),
  setCustomImage: (customImageSrc) => set({ customImageSrc, targetProgress: 1, isCanvasDimmed: false }),
}))

export default useSceneStore
