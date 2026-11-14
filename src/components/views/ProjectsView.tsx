import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
  Sparkles,
  Layers,
} from 'lucide-react'
import { PROJECTS, type ProjectItem } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'
import DisasterNlpSim from '../simulators/DisasterNlpSim'
import AgroDetectSim from '../simulators/AgroDetectSim'
import FaceAttendanceSim from '../simulators/FaceAttendanceSim'

interface CarouselItem extends ProjectItem {
  isExperiment?: boolean
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  ...PROJECTS,
  {
    id: 'golden-core-webgl',
    index: '04',
    title: 'Golden Core 3D WebGL Engine',
    subtitle: 'Tear-Free Spatial Morph & GLSL Shader System',
    period: '2026',
    category: 'Experiments',
    featured: false,
    isExperiment: true,
    tagline:
      'Custom Three.js & GLSL particle/wireframe architecture morphing 26,400+ segments between a 3D Neural Sphere, Portrait, CV Hologram, and Circuit Brain.',
    problem: '',
    objectives: [],
    workflow: [],
    features: [],
    outcomes: [],
    tags: ['Three.js', 'WebGL', 'GLSL Shaders', 'React Three Fiber', 'Spatial Hashing', 'UnrealBloom'],
    metrics: [
      { value: '26.4K', label: 'Morph Segments' },
      { value: '24×24', label: 'Spatial Buckets' },
      { value: '60 FPS', label: 'GLSL Pipeline' },
    ],
    githubUrl: 'https://github.com/Saimaneesh13',
  },
]

const CATEGORIES = ['All Projects', 'NLP', 'Computer Vision', 'Deep Learning', 'Experiments']

function ProjectBannerArtwork({ id }: { id: string }) {
  if (id === 'disaster-nlp') {
    return (
      <div className="relative h-40 w-full rounded-xl bg-gradient-to-br from-[#0e1726] via-[#090d16] to-[#1a1410] border border-gold/25 overflow-hidden flex flex-col justify-between p-4">
        <div className="flex justify-between items-center z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-gold/20 border border-gold/45 font-mono text-[9.5px] text-gold font-semibold">
            ★ FEATURED NLP SYSTEM
          </span>
          <span className="font-mono text-[10px] text-pure/80 bg-space/70 px-2.5 py-0.5 rounded-md border border-gold/20">
            Apr 2026 – May 2026
          </span>
        </div>

        <svg className="w-full h-20 my-auto" viewBox="0 0 320 75" fill="none">
          <circle cx="45" cy="38" r="22" stroke="#EAB767" strokeDasharray="3 3" strokeOpacity="0.6" />
          <circle cx="38" cy="32" r="3.5" fill="#EAB767" />
          <circle cx="52" cy="44" r="4" fill="#F7D9A0" />
          <circle cx="48" cy="28" r="2.5" fill="#38BDF8" />
          <path d="M72 38 H112" stroke="#EAB767" strokeWidth="1.5" />
          <rect x="112" y="14" width="96" height="48" rx="8" fill="#0b101b" stroke="#EAB767" strokeWidth="1.4" />
          <text x="160" y="33" textAnchor="middle" fill="#EAB767" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">
            BERTopic + LDA
          </text>
          <text x="160" y="47" textAnchor="middle" fill="#A7B0C0" fontFamily="JetBrains Mono" fontSize="7.5">
            UMAP · HDBSCAN · FAISS
          </text>
          <path d="M208 38 H244" stroke="#EAB767" strokeWidth="1.5" />
          <rect x="244" y="20" width="58" height="36" rx="6" fill="rgba(234,183,103,0.16)" stroke="#EAB767" />
          <text x="273" y="41" textAnchor="middle" fill="#F7D9A0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="bold">
            URGENCY
          </text>
        </svg>

        <div className="font-mono text-[9.5px] text-mist flex justify-between">
          <span>Sentence-Transformers + spaCy</span>
          <span className="text-gold">FastAPI + Streamlit + Plotly</span>
        </div>
      </div>
    )
  }

  if (id === 'face-attendance') {
    return (
      <div className="relative h-40 w-full rounded-xl bg-gradient-to-br from-[#0d1624] via-[#090d16] to-[#121c2d] border border-gold/25 overflow-hidden flex flex-col justify-between p-4">
        <div className="flex justify-between items-center z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-gold/20 border border-gold/45 font-mono text-[9.5px] text-gold font-semibold">
            ★ REAL-TIME COMPUTER VISION
          </span>
          <span className="font-mono text-[10px] text-pure/80 bg-space/70 px-2.5 py-0.5 rounded-md border border-gold/20">
            Feb 2026 – Mar 2026
          </span>
        </div>

        <svg className="w-full h-20 my-auto" viewBox="0 0 320 75" fill="none">
          <path d="M118,16 L104,16 L104,30" stroke="#EAB767" strokeWidth="2" />
          <path d="M202,16 L216,16 L216,30" stroke="#EAB767" strokeWidth="2" />
          <path d="M118,62 L104,62 L104,48" stroke="#EAB767" strokeWidth="2" />
          <path d="M202,62 L216,62 L216,48" stroke="#EAB767" strokeWidth="2" />
          <circle cx="160" cy="39" r="22" stroke="#EAB767" strokeWidth="1.4" strokeDasharray="4 3" />
          <circle cx="151" cy="33" r="2.8" fill="#F7D9A0" />
          <circle cx="169" cy="33" r="2.8" fill="#F7D9A0" />
          <path d="M150 46 Q160 53 170 46" stroke="#EAB767" strokeWidth="1.6" />
        </svg>

        <div className="font-mono text-[9.5px] text-mist flex justify-between">
          <span>OpenCV + face_recognition (128-D)</span>
          <span className="text-gold">Flask + SQLite + Bootstrap 5</span>
        </div>
      </div>
    )
  }

  if (id === 'agrodetect') {
    return (
      <div className="relative h-40 w-full rounded-xl bg-gradient-to-br from-[#0d1917] via-[#090d16] to-[#17150e] border border-gold/25 overflow-hidden flex flex-col justify-between p-4">
        <div className="flex justify-between items-center z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-gold/20 border border-gold/45 font-mono text-[9.5px] text-gold font-semibold">
            ★ 90%+ ACCURACY DEEP LEARNING
          </span>
          <span className="font-mono text-[10px] text-pure/80 bg-space/70 px-2.5 py-0.5 rounded-md border border-gold/20">
            Jan 2026 – Feb 2026
          </span>
        </div>

        <svg className="w-full h-20 my-auto" viewBox="0 0 320 75" fill="none">
          <rect x="36" y="16" width="26" height="44" rx="4" fill="#0b101b" stroke="#EAB767" />
          <rect x="82" y="22" width="26" height="32" rx="4" fill="#0b101b" stroke="#EAB767" />
          <path d="M62 38 H82 M108 38 H138" stroke="#EAB767" strokeWidth="1.5" />
          <rect x="138" y="14" width="144" height="48" rx="8" fill="#0b101b" stroke="#EAB767" strokeWidth="1.5" />
          <text x="210" y="34" textAnchor="middle" fill="#EAB767" fontFamily="JetBrains Mono" fontSize="9.5" fontWeight="bold">
            TensorFlow / Keras CNN
          </text>
          <text x="210" y="48" textAnchor="middle" fill="#F5F5F5" fontFamily="JetBrains Mono" fontSize="8">
            90%+ Leaf Disease Accuracy
          </text>
        </svg>

        <div className="font-mono text-[9.5px] text-mist flex justify-between">
          <span>Scikit-learn + Pandas Augmentation</span>
          <span className="text-gold">FastAPI + Streamlit UI</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-40 w-full rounded-xl bg-gradient-to-br from-[#19140c] via-[#090d16] to-[#0f172a] border border-gold/25 overflow-hidden flex flex-col justify-between p-4">
      <div className="flex justify-between items-center z-10">
        <span className="px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/40 font-mono text-[9.5px] text-gold">
          CREATIVE WEBGL EXPERIMENT
        </span>
        <span className="font-mono text-[10px] text-gold">GLSL Shaders</span>
      </div>
      <div className="my-auto text-center font-display text-lg font-bold text-gold tracking-wide">
        26,400+ Spatial Morph Segments
      </div>
      <div className="font-mono text-[9.5px] text-mist flex justify-between">
        <span>Core ↔ Portrait ↔ CV ↔ Brain</span>
        <span className="text-gold">Three.js + Postprocessing</span>
      </div>
    </div>
  )
}

export default function ProjectsView() {
  const { setActiveCaseStudy, toggleInspect3D } = useSceneStore()
  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  const [activeIndex, setActiveIndex] = useState(0)
  const [liveSimId, setLiveSimId] = useState<string | null>(null)
  const [dragStartX, setDragStartX] = useState<number | null>(null)

  const filteredItems =
    selectedCategory === 'All Projects'
      ? CAROUSEL_ITEMS
      : CAROUSEL_ITEMS.filter((item) => item.category === selectedCategory)

  const safeIndex = activeIndex % Math.max(1, filteredItems.length)

  const handlePrev = useCallback(() => {
    setLiveSimId(null)
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }, [filteredItems.length])

  const handleNext = useCallback(() => {
    setLiveSimId(null)
    setActiveIndex((prev) => (prev + 1) % filteredItems.length)
  }, [filteredItems.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlePrev, handleNext])

  return (
    <div className="h-screen max-w-[1380px] mx-auto px-4 sm:px-8 pt-20 pb-8 flex flex-col justify-between overflow-hidden pointer-events-none select-none">
      {/* 1. Header & Category Filter Pills */}
      <div className="text-center space-y-2.5 pointer-events-auto">
        <div className="mono-label text-gold">// 02 // PROJECTS ARCHIVE</div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-pure tracking-tight">
          AI, Machine Learning &amp; Computer Vision Projects
        </h1>
        <p className="text-xs text-mist max-w-xl mx-auto">
          End-to-end production AI/ML systems built with verifiable architectures — swipe or use arrow keys to explore.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat)
                setActiveIndex(0)
                setLiveSimId(null)
              }}
              className={`px-3.5 py-1 rounded-full font-mono text-[11px] border transition-all ${selectedCategory === cat
                ? 'bg-gold/20 border-gold text-gold shadow-gold-glow font-semibold'
                : 'bg-obsidian/70 border-gold/20 text-mist hover:text-pure hover:border-gold/45'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 3D Coverflow Carousel Stage */}
      <div
        className="relative flex-1 flex items-center justify-center my-2 pointer-events-auto"
        onMouseDown={(e) => setDragStartX(e.clientX)}
        onMouseUp={(e) => {
          if (dragStartX !== null) {
            const delta = e.clientX - dragStartX
            if (delta > 50) handlePrev()
            else if (delta < -50) handleNext()
            setDragStartX(null)
          }
        }}
      >
        {/* Left / Right Carousel Arrow Buttons */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-40 w-10 h-10 rounded-full glass-panel border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-space transition-all shadow-gold-glow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-40 w-10 h-10 rounded-full glass-panel border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-space transition-all shadow-gold-glow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-[540px] h-[430px] flex items-center justify-center">
          {filteredItems.map((item, idx) => {
            let offset = idx - safeIndex
            const total = filteredItems.length
            if (offset > total / 2) offset -= total
            if (offset < -total / 2) offset += total

            const isCenter = offset === 0
            const isVisible = Math.abs(offset) <= 1

            if (!isVisible) return null

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: offset * 340,
                  scale: isCenter ? 1 : 0.84,
                  opacity: isCenter ? 1 : 0.42,
                  rotateY: offset * -18,
                  zIndex: isCenter ? 30 : 10,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                onClick={() => {
                  if (!isCenter) {
                    setLiveSimId(null)
                    setActiveIndex(idx)
                  }
                }}
                className={`absolute w-full rounded-2xl p-5 flex flex-col justify-between transition-colors ${isCenter
                  ? 'bg-[#0b111e]/95 backdrop-blur-xl border-2 border-gold shadow-[0_20px_65px_rgba(0,0,0,0.85),0_0_40px_rgba(234,183,103,0.2)]'
                  : 'bg-[#090d16]/85 border border-gold/25 cursor-pointer hover:border-gold/50'
                  }`}
                style={{ minHeight: '420px' }}
              >
                {liveSimId === item.id && isCenter ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gold/25 pb-2">
                      <span className="font-mono text-[10px] text-gold uppercase">
                        ▶ Live Interactive Simulator // {item.title}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setLiveSimId(null)
                        }}
                        className="font-mono text-xs text-gold hover:underline"
                      >
                        ✕ Close Demo
                      </button>
                    </div>
                    {item.id === 'disaster-nlp' && <DisasterNlpSim />}
                    {item.id === 'agrodetect' && <AgroDetectSim />}
                    {item.id === 'face-attendance' && <FaceAttendanceSim />}
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <ProjectBannerArtwork id={item.id} />

                      <div className="flex items-center justify-between pt-1">
                        <div className="font-mono text-[10px] text-gold uppercase tracking-wider">
                          {item.index} // {item.category} · {item.subtitle}
                        </div>
                      </div>

                      <h2 className="font-display text-xl sm:text-2xl font-bold text-pure leading-tight">
                        {item.title}
                      </h2>

                      <p className="text-xs text-mist leading-relaxed">
                        {item.tagline}
                      </p>

                      {/* Complete CV Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-obsidian/90 border border-gold/25 font-mono text-[9.5px] text-pure"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics & Action Buttons */}
                    <div className="space-y-3 pt-3 mt-2 border-t border-gold/15">
                      <div className="grid grid-cols-3 gap-2">
                        {item.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="px-2.5 py-1.5 rounded-lg bg-space/80 border border-gold/15"
                          >
                            <div className="font-display text-xs font-bold text-gold">
                              {m.value}
                            </div>
                            <div className="font-mono text-[9px] text-mist">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        {item.isExperiment ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleInspect3D()
                            }}
                            className="btn-gold !py-2 !px-4 !text-xs flex-1 flex items-center justify-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Inspect 3D Core Live</span>
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveCaseStudy(item.id)
                              }}
                              className="btn-gold !py-2 !px-4 !text-xs flex-1 flex items-center justify-center gap-1.5"
                            >
                              <span>View Case Study</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setLiveSimId(item.id)
                              }}
                              className="px-3 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/45 font-mono text-[10.5px] text-gold flex items-center gap-1 transition-colors"
                            >
                              <Play className="w-3 h-3 fill-gold" />
                              <span>Live Mode</span>
                            </button>
                          </>
                        )}

                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-2 rounded-xl bg-obsidian hover:border-gold border border-gold/25 font-mono text-[10.5px] text-pure flex items-center gap-1.5 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5 text-gold" />
                          <span>GitHub</span>
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* 3. Pagination Dots & Complete CV Tech Stack Footer */}
      <div className="space-y-3 pointer-events-auto">
        <div className="flex items-center justify-center gap-2">
          {filteredItems.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              onClick={() => {
                setLiveSimId(null)
                setActiveIndex(idx)
              }}
              className={`h-2 rounded-full transition-all ${idx === safeIndex ? 'w-7 bg-gold shadow-gold-glow' : 'w-2 bg-gold/30 hover:bg-gold/60'
                }`}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto glass-panel rounded-2xl px-5 py-2.5 border border-gold/25 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-gold" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-pure">
              Production Stack Across Flagship Projects:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              'Python',
              'TensorFlow',
              'Keras',
              'Scikit-learn',
              'OpenCV',
              'face_recognition',
              'BERTopic',
              'LDA',
              'spaCy',
              'UMAP',
              'HDBSCAN',
              'FAISS',
              'FastAPI',
              'Flask',
              'Streamlit',
              'Plotly',
              'SQLite',
            ].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-obsidian/90 border border-gold/20 font-mono text-[9.5px] text-mist"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}