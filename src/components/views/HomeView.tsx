import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import { useSceneStore } from '../../store/useSceneStore'
import { PROFILE_DATA } from '../../lib/portfolio-data'

function TechStackLogo({ id }: { id: string }) {
  switch (id) {
    case 'python':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.9 2C7.8 2 8.2 3.8 8.2 3.8V6h3.8v.6H6.5S4 6.3 4 10.2c0 3.9 2.2 3.8 2.2 3.8h1.3v-1.9s-.1-2.2 2.2-2.2h3.8s2.1 0 2.1-2V4.1S16.1 2 11.9 2z"
            fill="#CBD5E1"
          />
          <path
            d="M12.1 22c4.1 0 3.7-1.8 3.7-1.8V18h-3.8v-.6h5.5S20 17.7 20 13.8c0-3.9-2.2-3.8-2.2-3.8h-1.3v1.9s.1 2.2-2.2 2.2H10.5s-2.1 0-2.1 2v3.8S7.9 22 12.1 22z"
            fill="#94A3B8"
          />
        </svg>
      )
    case 'tensorflow':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L4 6.5v3.2l5.2-3v13.8L12 22V2zm0 0l8 4.5v3.2l-5.2-3v4.1l3.6 2.1v3.1l-3.6-2.1V22L12 20.5V2z"
            fill="#F97316"
          />
        </svg>
      )
    case 'opencv':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="6.5" r="3.5" stroke="#E2E8F0" strokeWidth="2.2" />
          <circle cx="7" cy="15.5" r="3.5" stroke="#94A3B8" strokeWidth="2.2" />
          <circle cx="17" cy="15.5" r="3.5" stroke="#CBD5E1" strokeWidth="2.2" />
        </svg>
      )
    case 'bertopic':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2.2" fill="#38BDF8" />
          <circle cx="6" cy="7" r="1.6" fill="#EAB767" />
          <circle cx="18" cy="7" r="1.6" fill="#E2E8F0" />
          <circle cx="6" cy="17" r="1.6" fill="#E2E8F0" />
          <circle cx="18" cy="17" r="1.6" fill="#EAB767" />
          <path
            d="M7.5 8L10.5 10.8M16.5 8L13.5 10.8M7.5 16L10.5 13.2M16.5 16L13.5 13.2"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />
        </svg>
      )
    case 'fastapi':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#E2E8F0" />
          <path d="M13 6L8.5 13h3.5l-1 5 4.5-7H12l1-5z" fill="#090D16" />
        </svg>
      )
    case 'streamlit':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M3 8l5.5 3.5L12 5l3.5 6.5L21 8l-3 10H6L3 8z" fill="#F43F5E" />
        </svg>
      )
    default:
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5"
            stroke="#CBD5E1"
            strokeWidth="2"
            fill="none"
          />
          <path d="M12 12L20 7.5M12 12L4 7.5M12 12V21" stroke="#94A3B8" strokeWidth="1.6" />
        </svg>
      )
  }
}

const BOTTOM_TECH_STACK = [
  { id: 'python', name: 'Python' },
  { id: 'tensorflow', name: 'TensorFlow & Keras' },
  { id: 'opencv', name: 'OpenCV & Vision' },
  { id: 'bertopic', name: 'BERTopic & NLP' },
  { id: 'fastapi', name: 'FastAPI & Flask' },
  { id: 'streamlit', name: 'Streamlit & Plotly' },
  { id: 'cpp', name: 'C++, Java & SQL' },
  { id: 'bertopic', name: 'UMAP · HDBSCAN · FAISS' },
]

export default function HomeView() {
  const { setFlowState, toggleCorePortrait, targetProgress } = useSceneStore()
  const [mousePos, setMousePos] = useState({ x: 35, y: 50, rx: 0, ry: 0 })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        toggleCorePortrait()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleCorePortrait])

  const handleStageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = ((e.clientX - rect.left) / rect.width) * 100
    const yPct = ((e.clientY - rect.top) / rect.height) * 100
    const rx = -((e.clientY - rect.top) / rect.height - 0.5) * 9
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 11
    setMousePos({ x: xPct, y: yPct, rx, ry })
  }

  return (
    <div className="h-screen max-w-[1380px] mx-auto px-6 sm:px-10 pt-20 pb-6 flex flex-col justify-between overflow-hidden pointer-events-none select-none">
      <div className="h-1" />

      {/* ============================================================
          MAIN HERO STAGE: FRAMELESS 3D TILT NAME (LETS 3D MORPH SHINE)
         ============================================================ */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 space-y-5 pointer-events-auto"
        >
          {/* 1. Minimal Status Eyebrow + Highlighted 3D Morph Trigger */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b111e]/70 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-[2.5px] text-pure/80 font-semibold">
                AI / ML ENGINEER
              </span>
            </div>

            <button
              type="button"
              onClick={() => toggleCorePortrait()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/35 hover:border-gold font-mono text-[9.5px] text-gold transition-all shadow-[0_0_20px_rgba(234,183,103,0.15)]"
              title="Click or press Space to morph the 3D scene"
            >
              <Sparkles className="w-3 h-3 text-gold" />
              <span>
                {targetProgress > 0.5 ? 'MORPH: PORTRAIT → CORE' : 'MORPH: CORE → PORTRAIT'}
              </span>
            </button>
          </div>

          {/* 2. FRAMELESS 3D PERSPECTIVE NAME (NO BOX STEALING FOCUS FROM 3D MORPH) */}
          <div
            onMouseMove={handleStageMove}
            onMouseLeave={() => setMousePos({ x: 35, y: 50, rx: 0, ry: 0 })}
            style={{ perspective: '1100px' }}
            className="relative py-1 max-w-2xl"
          >
            {/* Subtle Borderless Ambient Glow that Blends into the Dark Space */}
            <div
              className=" -inset-6 pointer-events-none transition-opacity duration-500 rounded-full blur-2xl opacity-60"
              style={{
                position: 'absolute',
                background: `radial-gradient(280px circle at ${mousePos.x}% ${mousePos.y}%, rgba(234,183,103,0.12), transparent 75%)`,
              }}
            />

            <motion.div
              animate={{
                rotateX: mousePos.rx,
                rotateY: mousePos.ry,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative space-y-2.5"
            >
              {/* Split-Tone Typography Floating Directly in Space */}
              <h1
                style={{ transform: 'translateZ(20px)' }}
                className="font-display text-6xl sm:text-[82px] font-extrabold tracking-tight leading-[1.02] drop-shadow-[0_14px_30px_rgba(0,0,0,0.85)]"
              >
                <span className="text-pure">Sai </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#EAB767] to-[#C59B57]">
                  Maneesh
                </span>
              </h1>

              {/* Sleek Subtitle with Subtle Gold Underline Accent */}
              <p
                style={{ transform: 'translateZ(10px)' }}
                className="font-display text-base sm:text-[21px] font-medium text-pure/85 tracking-tight max-w-xl"
              >
                Architecting Intelligent Systems in{' '}
                <span className="text-gold font-semibold">ML</span>,{' '}
                <span className="text-gold font-semibold">Computer Vision</span> &amp;{' '}
                <span className="text-gold font-semibold">NLP</span>.
              </p>

              {/* Minimalist Gold Accent Line */}
              <div className="w-16 h-[2px] bg-gradient-to-r from-gold via-gold/50 to-transparent rounded-full pt-0.5" />
            </motion.div>
          </div>

          {/* 3. Single Crisp One-Sentence Bio */}
          <p className="text-xs sm:text-[14.5px] text-mist leading-relaxed max-w-lg">
            Designing and deploying production-grade{' '}
            <span className="text-pure/95 font-medium">Deep Learning</span>,{' '}
            <span className="text-pure/95 font-medium">Biometric Vision</span>, and{' '}
            <span className="text-pure/95 font-medium">Unsupervised NLP</span> systems from
            research to live cloud inference.
          </p>

          {/* 4. Low-Profile Social Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0b111e]/60 border border-white/10 hover:border-gold/50 font-mono text-[11px] text-mist hover:text-pure flex items-center gap-2 transition-all"
            >
              <Github className="w-3.5 h-3.5 text-gold" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 opacity-50" />
            </a>

            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0b111e]/60 border border-white/10 hover:border-gold/50 font-mono text-[11px] text-mist hover:text-pure flex items-center gap-2 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-gold" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 opacity-50" />
            </a>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="px-3.5 py-1.5 rounded-xl bg-[#0b111e]/60 border border-white/10 hover:border-gold/50 font-mono text-[11px] text-mist hover:text-pure flex items-center gap-2 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>Email</span>
              <ArrowUpRight className="w-3 h-3 opacity-50" />
            </a>
          </div>
        </motion.div>

        {/* Right 5 Columns: Completely Open for the 3D Portrait / Neural Core */}
        <div className="lg:col-span-5 hidden lg:block" />
      </div>

      {/* ============================================================
          BOTTOM BAR: CONTINUOUS HORIZONTAL MOVING TECH STACK MARQUEE
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full pt-4 border-t border-white/10 pointer-events-auto"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left Fixed Label: TECH STACK —— */}
          <div className="flex items-center gap-3 pr-3 shrink-0 z-10 bg-space">
            <span className="font-mono text-[11px] uppercase tracking-[3px] text-mist font-semibold">
              TECH STACK
            </span>
            <span className="w-7 h-[2px] bg-gold rounded-full" />
          </div>

          {/* Center: Infinite Horizontal Scrolling Track with Soft Edge Fade */}
          <div
            className="relative flex-1 overflow-hidden py-1"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
            }}
          >
            <div className="animate-tech-marquee flex items-center">
              {[...BOTTOM_TECH_STACK, ...BOTTOM_TECH_STACK].map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-center shrink-0">
                  <span className="inline-block h-4 w-[1px] bg-white/15 mx-6" />
                  <button
                    type="button"
                    onClick={() => setFlowState('expertise')}
                    className="flex items-center gap-2.5 py-1 text-pure/90 hover:text-gold transition-colors whitespace-nowrap group"
                  >
                    <TechStackLogo id={item.id} />
                    <span className="font-sans text-xs sm:text-[13px] font-medium tracking-wide">
                      {item.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Fixed Action: + More */}
          <div className="flex items-center pl-3 border-l border-white/15 shrink-0 z-10 bg-space">
            <button
              type="button"
              onClick={() => setFlowState('expertise')}
              className="font-sans text-xs sm:text-[13px] font-semibold text-gold hover:underline py-1 whitespace-nowrap"
            >
              + More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}