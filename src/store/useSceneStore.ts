import { create } from 'zustand'

export type FlowState = 'greet' | 'morph' | 'about' | 'home' | 'projects' | 'case-study' | 'expertise' | 'contact'

export interface SceneStore {
  flowState: FlowState
  targetProgress: number
  manualProgress: number | null
  activeCaseStudyId: string
  isCanvasDimmed: boolean
  customImageSrc: string | null
  setFlowState: (state: FlowState) => void
  setTargetProgress: (val: number) => void
  setManualProgress: (val: number | null) => void
  setActiveCaseStudy: (id: string) => void
  toggleInspect3D: () => void
  setCustomImage: (src: string | null) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  flowState: 'greet',
  targetProgress: 0.0,
  manualProgress: null,
  activeCaseStudyId: 'disaster-nlp',
  isCanvasDimmed: false,
  customImageSrc: null,

  setFlowState: (flowState) =>
    set((state) => {
      let targetProgress = state.targetProgress
      if (flowState === 'about' || flowState === 'morph') {
        targetProgress = 1.0
      } else if (flowState === 'greet' || flowState === 'home') {
        targetProgress = 0.0
      }
      return { flowState, targetProgress }
    }),

  setTargetProgress: (targetProgress) => set({ targetProgress }),

  setManualProgress: (manualProgress) => set({ manualProgress }),

  setActiveCaseStudy: (activeCaseStudyId) => set({ activeCaseStudyId }),

  toggleInspect3D: () => set((state) => ({ isCanvasDimmed: !state.isCanvasDimmed })),

  setCustomImage: (customImageSrc) => set({ customImageSrc }),
}))

export default useSceneStore
