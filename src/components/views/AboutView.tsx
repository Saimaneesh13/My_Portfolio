import { PERSONAL_BRAND, TIMELINE } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'

export default function AboutView() {
  const { setFlowState, toggleInspect3D } = useSceneStore()

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 pt-28 pb-24 space-y-8 pointer-events-auto">
      <div className="glass-panel rounded-2xl p-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="mono-label">05 // About & Identity</span>
          <button onClick={toggleInspect3D} className="font-mono text-xs text-gold hover:underline">
            Inspect 3D Portrait Hologram ↗
          </button>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-pure">{PERSONAL_BRAND.name}</h2>
        <p className="text-mist text-sm sm:text-base leading-relaxed">{PERSONAL_BRAND.bio}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button onClick={() => setFlowState('projects')} className="btn-gold">
            View Projects
          </button>
          <button onClick={() => setFlowState('expertise')} className="btn-ghost-gold">
            Explore Technical Stack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TIMELINE.map((item) => (
          <div key={item.year} className="glass-panel rounded-xl p-5 space-y-2">
            <div className="mono-label text-gold">{item.year}</div>
            <h3 className="font-display text-base font-medium text-pure">{item.title}</h3>
            <div className="font-mono text-xs text-gold-champagne">{item.organization}</div>
            <p className="text-xs text-mist leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
