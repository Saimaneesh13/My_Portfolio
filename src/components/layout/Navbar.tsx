import { useRef } from 'react'
import { Upload, FileText } from 'lucide-react'
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
  const { flowState, setFlowState, setCustomImage } = useSceneStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const navigate = (state: FlowState) => {
    window.location.hash = `#${state}`
    setFlowState(state)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setCustomImage(url)
  }

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[min(94vw,1180px)] z-30 pointer-events-auto">
      <nav className="glass-panel rounded-2xl px-5 py-3 flex items-center justify-between gap-4">
        <button
          onClick={() => navigate('home')}
          className="font-display text-xl font-semibold tracking-tight text-pure hover:text-gold transition-colors"
        >
          {PERSONAL_BRAND.logo}
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = flowState === item.state
            return (
              <button
                key={item.state}
                onClick={() => navigate(item.state)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'text-gold bg-gold/10 border border-gold/40 shadow-gold-glow'
                    : 'text-mist hover:text-pure'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-ghost-gold !px-3 !py-1.5 !text-xs flex items-center gap-1.5"
            title="Upload custom portrait photo for 3D morph"
          >
            <Upload className="w-3.5 h-3.5 text-gold" />
            <span>Photo</span>
          </button>

          <a
            href="/cv/Gorrela_Sai_Maneesh_CV.pdf"
            download
            className="btn-gold !px-3.5 !py-1.5 !text-xs flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
