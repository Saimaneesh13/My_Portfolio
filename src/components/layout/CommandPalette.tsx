import { useEffect, useState } from 'react'
import { useSceneStore } from '../../store/useSceneStore'
import { PROJECTS } from '../../lib/portfolio-data'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { setFlowState, setActiveCaseStudy, toggleInspect3D } = useSceneStore()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  if (!open) return null

  const runAction = (fn: () => void) => {
    fn()
    setOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-space/80 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md glass-panel rounded-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gold/20">
          <span className="mono-label">Quick Navigation (⌘K)</span>
          <span className="font-mono text-[10px] text-mist">ESC to close</span>
        </div>
        <div className="space-y-1.5">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => runAction(() => setActiveCaseStudy(p.id))}
              className="w-full text-left px-3 py-2 rounded-lg text-xs text-pure hover:bg-gold/15 flex items-center justify-between"
            >
              <span>Case Study: {p.title}</span>
              <span className="font-mono text-[10px] text-gold">{p.index} ↗</span>
            </button>
          ))}
          <button
            onClick={() => runAction(() => toggleInspect3D())}
            className="w-full text-left px-3 py-2 rounded-lg text-xs text-gold hover:bg-gold/15"
          >
            Toggle Unblurred 3D Core / Portrait Inspection
          </button>
          <button
            onClick={() => runAction(() => setFlowState('contact'))}
            className="w-full text-left px-3 py-2 rounded-lg text-xs text-mist hover:bg-gold/15"
          >
            Jump to Contact & Availability
          </button>
        </div>
      </div>
    </div>
  )
}
