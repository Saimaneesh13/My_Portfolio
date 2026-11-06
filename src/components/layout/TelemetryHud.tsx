import { Eye, Sparkles } from 'lucide-react'
import { useSceneStore } from '../../store/useSceneStore'

export default function TelemetryHud() {
  const { flowState, targetProgress, manualProgress, isCanvasDimmed, setManualProgress, toggleInspect3D } =
    useSceneStore()

  const currentVal = manualProgress !== null ? manualProgress : targetProgress

  return (
    <>
      <div className="fixed top-6 left-6 z-20 pointer-events-none hidden xl:block">
        <div className="font-mono text-[10px] tracking-[2px] text-gold/70 uppercase">
          SYS // NEURAL_CORE_GLSL · STATE: {flowState.toUpperCase()}
        </div>
      </div>

      {flowState !== 'greet' && (
        <div className="fixed bottom-5 right-5 z-30 pointer-events-auto glass-panel rounded-xl px-4 py-2.5 flex items-center gap-3">
          <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Core ↔ Portrait</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={currentVal}
            onChange={(e) => setManualProgress(parseFloat(e.target.value))}
            className="w-24 accent-gold cursor-pointer"
          />
          <button
            onClick={toggleInspect3D}
            className="px-2.5 py-1 rounded border border-gold/30 text-[10px] font-mono uppercase text-gold hover:bg-gold/10 flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            {isCanvasDimmed ? 'Inspect 3D' : 'Focus UI'}
          </button>
        </div>
      )}
    </>
  )
}
