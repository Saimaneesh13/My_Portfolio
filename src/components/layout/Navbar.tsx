import { motion } from 'framer-motion'
import { FileDown } from 'lucide-react'
import { PERSONAL_BRAND } from '../../lib/portfolio-data'
import { useSceneStore, type FlowState } from '../../store/useSceneStore'

const NAV_ITEMS: { label: string; state: FlowState }[] = [
  { label: 'Home', state: 'home' },
  { label: 'Projects', state: 'projects' },
  { label: 'Case Studies', state: 'case-study' },
  { label: 'Expertise', state: 'expertise' },
  { label: 'About', state: 'about' },
  { label: 'Contact', state: 'contact' },
]

export default function Navbar() {
  const { flowState, setFlowState } = useSceneStore()

  const navigate = (state: FlowState) => {
    window.location.hash = `#${state}`
    setFlowState(state)
  }

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[min(94vw,1180px)] z-30 pointer-events-auto">
      <nav className="glass-panel rounded-2xl px-5 py-3 flex items-center justify-between gap-4 shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
        <button
          onClick={() => navigate('home')}
          className="font-display text-xl font-semibold tracking-tight text-pure hover:text-gold transition-colors shrink-0"
        >
          {PERSONAL_BRAND.logo}
        </button>

        <div className="hidden md:flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
          {NAV_ITEMS.map((item) => {
            const active = flowState === item.state
            return (
              <button
                key={item.state}
                type="button"
                onClick={() => navigate(item.state)}
                className={`relative px-3.5 py-1.5 rounded-xl font-sans text-xs font-medium transition-colors whitespace-nowrap ${
                  active ? 'text-gold font-semibold' : 'text-mist hover:text-pure'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-gold/15 border border-gold/45 shadow-gold-glow"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/cv/resume.pdf"
            download="Gorrela_Sai_Maneesh_CV.pdf"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#F7D9A0] via-[#EAB767] to-[#C5A46D] text-[#070b13] font-display text-xs font-bold flex items-center gap-1.5 shadow-gold-glow hover:brightness-105 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
