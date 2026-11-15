import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
  Layers,
  Database,
  Cpu,
  Zap,
  ArrowUpRight,
  Maximize2,
  X,
  MousePointerClick,
  RefreshCw,
} from 'lucide-react'
import { PROJECTS, type ProjectItem } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'

const CATEGORIES = ['All Projects', 'NLP', 'Computer Vision', 'Deep Learning', 'Full-Stack']

const PROJECT_VISUALS: Record<
  string,
  {
    posterImage: string
    categoryLabel: string
    shortDesc: string
    displayTags: string[]
    embedUrl: string
  }
> = {
  'disaster-nlp': {
    posterImage:
      'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=900&q=80',
    categoryLabel: '01 // NLP • UNSUPERVISED LEARNING',
    shortDesc:
      'Unsupervised topic discovery and real-time urgency classification from social media data during disasters.',
    displayTags: [
      'BERTopic',
      'Sentence-BERT',
      'UMAP',
      'HDBSCAN',
      'LDA',
      'FAISS',
      'FastAPI',
      'Streamlit',
    ],
    // ?embed=true unlocks Streamlit Cloud iframe embedding & hides top chrome!
    embedUrl: 'https://aegis-command.streamlit.app/?embed=true',
  },
  'face-attendance': {
    posterImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    categoryLabel: '02 // COMPUTER VISION • BIOMETRICS',
    shortDesc:
      'Real-time biometric attendance using face recognition with Flask backend, Bootstrap 5 dashboard, and SQLite database.',
    displayTags: ['OpenCV', 'Flask', 'face_recognition', 'SQLite', 'Python', 'Bootstrap 5'],
    embedUrl: 'https://facerecognitionattendance-9rc8.onrender.com/',
  },
  agrodetect: {
    posterImage:
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=80',
    categoryLabel: '03 // DEEP LEARNING • SMART AGRICULTURE',
    shortDesc:
      'CNN-based plant leaf disease detection with >90% validation accuracy using TensorFlow, Keras, FastAPI, and Streamlit.',
    displayTags: ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'FastAPI', 'Streamlit'],
    // ?embed=true unlocks Streamlit Cloud iframe embedding & hides top chrome!
    embedUrl: 'https://agrodetectai.streamlit.app/?embed=true',
  },
}

const FOOTER_TECH_BADGES = [
  { code: 'Py', name: 'Python', bg: 'bg-[#2563EB]/25 text-[#60A5FA] border-[#3B82F6]/40' },
  { code: 'TF', name: 'TensorFlow', bg: 'bg-[#EA580C]/25 text-[#FB923C] border-[#F97316]/40' },
  { code: 'CV', name: 'OpenCV', bg: 'bg-[#4F46E5]/25 text-[#818CF8] border-[#6366F1]/40' },
  { code: 'NLP', name: 'BERTopic & spaCy', bg: 'bg-[#059669]/25 text-[#34D399] border-[#10B981]/40' },
  { code: 'sk', name: 'scikit-learn', bg: 'bg-[#D97706]/25 text-[#FBBF24] border-[#F59E0B]/40' },
  { code: 'FA', name: 'FastAPI & Flask', bg: 'bg-[#0D9488]/25 text-[#2DD4BF] border-[#14B8A6]/40' },
  { code: 'SQL', name: 'SQLite', bg: 'bg-[#0284C7]/25 text-[#38BDF8] border-[#0EA5E9]/40' },
  { code: 'St', name: 'Streamlit', bg: 'bg-[#E11D48]/25 text-[#FB7185] border-[#F43F5E]/40' },
]

function ProjectLiveViewport({
  item,
  isCenter,
  isInteractive,
  onToggleInteractive,
  onOpenFullscreenModal,
}: {
  item: ProjectItem
  isCenter: boolean
  isInteractive: boolean
  onToggleInteractive: () => void
  onOpenFullscreenModal: () => void
}) {
  const vis = PROJECT_VISUALS[item.id] || PROJECT_VISUALS['disaster-nlp']
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Reset loaded state if project changes
  useEffect(() => {
    if (!isCenter) setIframeLoaded(false)
  }, [isCenter])

  return (
    <div className="relative h-36 w-full rounded-xl overflow-hidden border border-gold/35 bg-[#070b13] group/banner">
      {/* 1. Background Poster Image (Visible on side cards or while live app wakes up) */}
      <img
        src={vis.posterImage}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${isCenter && iframeLoaded ? 'opacity-15 blur-sm' : 'opacity-85 brightness-90'
          }`}
      />

      {/* 2. LIVE EMBEDDED IFRAME FOR THE ACTIVE CENTER CARD */}
      {isCenter && (
        <div className="absolute inset-0 overflow-hidden bg-[#070b13]/40">
          {/* Loading Spinner Badge while Streamlit/Render container spins up */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070b13]/75 backdrop-blur-xs">
              <RefreshCw className="w-5 h-5 text-gold animate-spin mb-1.5" />
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-gold">
                Connecting Live App Stream...
              </span>
            </div>
          )}

          {/* Scaled Desktop Iframe so the full dashboard fits inside the 450x176px card banner! */}
          <div
            className="w-[1180px] h-[460px] origin-top-left"
            style={{
              transform: 'scale(0.385)',
              pointerEvents: isInteractive ? 'auto' : 'none',
            }}
          >
            <iframe
              src={vis.embedUrl}
              title={`${item.title} Live Preview`}
              onLoad={() => setIframeLoaded(true)}
              className="w-full h-full border-0 bg-[#0b101b]"
              allow="camera; microphone; clipboard-read; clipboard-write"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Subtle Bottom Gradient when not actively interacting */}
      {!isInteractive && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1322]/90 via-transparent to-black/30 pointer-events-none" />
      )}

      {/* Top-Left Status Badge */}
      <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 pointer-events-none">
        <span className="px-2.5 py-0.5 rounded-full bg-[#090d16]/90 border border-gold/45 font-mono text-[9px] font-bold tracking-wider uppercase text-gold shadow-md flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{isCenter && iframeLoaded ? 'LIVE STREAM' : '★ FEATURED'}</span>
        </span>
      </div>

      {/* Top-Right Controls: Toggle Inline Interaction + Expand Fullscreen Modal + Open Tab */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
        {isCenter && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleInteractive()
            }}
            className={`px-2.5 py-1 rounded-full border backdrop-blur-md font-mono text-[9px] font-semibold flex items-center gap-1 transition-all shadow-lg ${isInteractive
              ? 'bg-gold text-space border-gold shadow-gold-glow'
              : 'bg-[#090d16]/85 hover:bg-gold hover:text-space border-gold/45 text-pure'
              }`}
            title="Interact with the live app directly inside this card"
          >
            <MousePointerClick className="w-3 h-3" />
            <span>{isInteractive ? 'LOCK CARD' : 'INTERACT HERE'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpenFullscreenModal()
          }}
          className="px-2.5 py-1 rounded-full bg-[#090d16]/85 hover:bg-gold hover:text-space border border-gold/45 backdrop-blur-md font-mono text-[9px] font-semibold text-pure flex items-center gap-1 transition-all shadow-lg"
          title="Expand Live App Fullscreen inside Portfolio"
        >
          <Maximize2 className="w-2.5 h-2.5 text-gold group-hover:text-space" />
          <span>EXPAND</span>
        </button>

        <a
          href={item.liveUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-6 h-6 rounded-full bg-[#090d16]/85 hover:bg-gold hover:text-space border border-gold/45 backdrop-blur-md flex items-center justify-center text-pure transition-all shadow-lg"
          title={`Open ${item.liveUrl} in new tab`}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Center HUD Targeting Reticle Overlay (Hidden when user clicks "INTERACT HERE") */}
      {!isInteractive && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-36 h-20 opacity-65">
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold/80" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold/80" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold/80" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold/80" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectsView() {
  const { setActiveCaseStudy } = useSceneStore()
  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  const [activeIndex, setActiveIndex] = useState(0)
  const [interactiveCardId, setInteractiveCardId] = useState<string | null>(null)
  const [fullscreenProject, setFullscreenProject] = useState<ProjectItem | null>(null)
  const [dragStartX, setDragStartX] = useState<number | null>(null)

  const filteredItems =
    selectedCategory === 'All Projects' || selectedCategory === 'Full-Stack'
      ? PROJECTS
      : PROJECTS.filter((item) => item.category === selectedCategory)

  const safeIndex = activeIndex % Math.max(1, filteredItems.length)

  const handlePrev = useCallback(() => {
    setInteractiveCardId(null)
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }, [filteredItems.length])

  const handleNext = useCallback(() => {
    setInteractiveCardId(null)
    setActiveIndex((prev) => (prev + 1) % filteredItems.length)
  }, [filteredItems.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (fullscreenProject) {
        if (e.key === 'Escape') setFullscreenProject(null)
        return
      }
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlePrev, handleNext, fullscreenProject])

  const metricIcons = [Database, Cpu, Zap]

  return (
    <div className="h-screen max-w-[1380px] mx-auto px-4 sm:px-8 pt-[74px] pb-4 flex flex-col justify-between overflow-hidden pointer-events-none select-none">
      {/* ============================================================
          1. COMPACT HEADER & CATEGORY FILTER PILLS
         ============================================================ */}
      <div className="text-center space-y-1.5 pointer-events-auto shrink-0">
        <div className="font-mono text-[10px] uppercase tracking-[2px] text-gold">
          ___
        </div>
        <h1 className="font-display text-2xl sm:text-[34px] font-bold text-pure tracking-tight leading-tight">
          AI, Machine Learning &amp; Computer Vision Projects
        </h1>
        <p className="text-[11.5px] text-mist max-w-xl mx-auto">
          Live deployed AI/ML systems running in real time — interact directly inside the card or expand fullscreen.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat)
                setActiveIndex(0)
                setInteractiveCardId(null)
              }}
              className={`px-3.5 py-1 rounded-full font-sans text-[11px] font-medium border transition-all ${selectedCategory === cat
                ? 'bg-gradient-to-r from-[#EAB767]/30 to-[#C5A46D]/20 border-gold text-pure shadow-gold-glow'
                : 'bg-obsidian/70 border-gold/20 text-mist hover:text-pure hover:border-gold/45'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          2. 3D COVERFLOW CAROUSEL (COMPACTED SO FOOTER NEVER CLIPS)
         ============================================================ */}
      <div
        className="relative flex-1 flex items-center justify-center min-h-0 my-1 pointer-events-auto"
        onMouseDown={(e) => {
          if (interactiveCardId) return
          setDragStartX(e.clientX)
        }}
        onMouseUp={(e) => {
          if (dragStartX !== null) {
            const delta = e.clientX - dragStartX
            if (delta > 50) handlePrev()
            else if (delta < -50) handleNext()
            setDragStartX(null)
          }
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 sm:left-16 z-40 w-9 h-9 rounded-full bg-[#0b1322]/90 border border-gold/40 flex items-center justify-center text-pure hover:bg-gold hover:text-space transition-all shadow-gold-glow"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 sm:right-16 z-40 w-9 h-9 rounded-full bg-[#0b1322]/90 border border-gold/40 flex items-center justify-center text-pure hover:bg-gold hover:text-space transition-all shadow-gold-glow"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="relative w-full max-w-[485px] h-[395px] flex items-center justify-center">
          {filteredItems.map((item, idx) => {
            let offset = idx - safeIndex
            const total = filteredItems.length
            if (total > 2) {
              if (offset > total / 2) offset -= total
              if (offset < -total / 2) offset += total
            }

            const isCenter = offset === 0
            const vis = PROJECT_VISUALS[item.id] || PROJECT_VISUALS['disaster-nlp']
            const isCardInteractive = isCenter && interactiveCardId === item.id

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: offset * 330,
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : 0.52,
                  zIndex: isCenter ? 30 : 15,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                onClick={() => {
                  if (!isCenter) {
                    setInteractiveCardId(null)
                    setActiveIndex(idx)
                  }
                }}
                className={`absolute w-full rounded-2xl p-4 flex flex-col justify-between transition-colors ${isCenter
                  ? 'bg-gradient-to-b from-[#162238]/95 to-[#0c1424]/95 backdrop-blur-xl border-2 border-gold shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(234,183,103,0.22)]'
                  : 'bg-[#0e1726]/85 border border-gold/25 cursor-pointer hover:border-gold/50'
                  }`}
                style={{ height: '392px' }}
              >
                {/* Top Live Embedded App Viewport */}
                <ProjectLiveViewport
                  item={item}
                  isCenter={isCenter}
                  isInteractive={isCardInteractive}
                  onToggleInteractive={() =>
                    setInteractiveCardId((prev) => (prev === item.id ? null : item.id))
                  }
                  onOpenFullscreenModal={() => setFullscreenProject(item)}
                />

                {/* Middle Content */}
                <div className="space-y-1 pt-1.5">
                  <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-gold/90">
                    {vis.categoryLabel}
                  </div>

                  <h2 className="font-display text-base sm:text-lg font-bold text-pure leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-[11px] text-mist leading-snug line-clamp-2">
                    {vis.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {vis.displayTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#090f1c]/90 border border-gold/25 font-mono text-[9px] text-pure/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Metrics & Buttons Row */}
                <div className="space-y-2 pt-1.5 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-2">
                    {item.metrics.map((m, mIdx) => {
                      const IconComp = metricIcons[mIdx % metricIcons.length]
                      return (
                        <div key={mIdx} className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shrink-0">
                            <IconComp className="w-3 h-3" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-display text-[11px] font-bold text-pure leading-none truncate">
                              {m.value}
                            </div>
                            <div className="font-sans text-[9px] text-mist truncate mt-0.5">
                              {m.label}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCaseStudy(item.id)
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#F7D9A0] via-[#EAB767] to-[#C5A46D] text-[#070b13] font-display text-xs font-bold flex items-center gap-1 shadow-gold-glow hover:brightness-105 transition-all"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setFullscreenProject(item)
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gold/15 hover:bg-gold hover:text-space border border-gold/45 font-mono text-[10.5px] font-semibold text-gold flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Run Live App</span>
                    </button>

                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-xl bg-[#090f1c]/90 hover:border-gold border border-white/15 font-mono text-[10.5px] text-pure flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3 h-3 text-mist" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ============================================================
          3. UNCLIPPED SINGLE-LINE TECH STACK FOOTER
         ============================================================ */}
      <div className="space-y-2 pointer-events-auto shrink-0 pb-1">
        <div className="flex items-center justify-center gap-2">
          {filteredItems.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              onClick={() => {
                setInteractiveCardId(null)
                setActiveIndex(idx)
              }}
              className={`h-1.5 rounded-full transition-all ${idx === safeIndex ? 'w-6 bg-gold shadow-gold-glow' : 'w-1.5 bg-gold/30 hover:bg-gold/60'
                }`}
            />
          ))}
        </div>

        {/* Single-row compact Tech Stack bar that never clips at the bottom */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl px-4 py-2 border border-gold/25 flex flex-wrap items-center justify-center gap-2 shadow-lg">
          <div className="flex items-center gap-2 pr-2 border-r border-gold/20">
            <div className="w-6 h-6 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="leading-none">
              <div className="font-display text-[11px] font-bold text-pure">Tech Stack</div>
              <div className="font-sans text-[9px] text-mist mt-0.5">Used Across Projects</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {FOOTER_TECH_BADGES.map((b) => (
              <div
                key={b.name}
                className="px-2 py-1 rounded-lg bg-[#090f1c]/90 border border-white/10 flex items-center gap-1.5"
              >
                <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold border ${b.bg}`}>
                  {b.code}
                </span>
                <span className="text-pure/90 font-medium text-[10.5px] whitespace-nowrap">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          4. EXPANDED LIVE APP MODAL (NO NAVBAR OVERLAP + CLICK OUTSIDE TO MINIMIZE)
         ============================================================ */}
      <AnimatePresence>
        {fullscreenProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenProject(null)}
            className="fixed inset-0 z-[100] bg-space/85 backdrop-blur-md pt-20 pb-6 px-4 sm:px-10 flex items-center justify-center pointer-events-auto cursor-pointer"
            title="Click anywhere outside the window to minimize"
          >
            <motion.div
              initial={{ scale: 0.93, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl h-full bg-[#0b111e] border-2 border-gold rounded-2xl shadow-[0_25px_90px_rgba(0,0,0,0.95),0_0_45px_rgba(234,183,103,0.22)] flex flex-col overflow-hidden cursor-default"
            >
              {/* Modal Top Bar — Clearly Separated Below Navbar */}
              <div className="px-5 py-3 bg-[#070b13] border-b border-gold/30 flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-display text-sm sm:text-base font-bold text-pure truncate">
                      {fullscreenProject.title} — Live Production Deployment
                    </h3>
                    <div className="font-mono text-[10px] text-gold truncate">
                      {fullscreenProject.liveUrl}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden md:inline-block font-mono text-[10px] text-mist mr-1">
                    Click outside or press ESC to minimize
                  </span>

                  <a
                    href={fullscreenProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-gold/15 hover:bg-gold hover:text-space border border-gold/45 font-mono text-xs text-gold font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setFullscreenProject(null)}
                    className="px-3 py-1.5 rounded-xl bg-obsidian border border-white/15 hover:border-gold font-mono text-xs text-mist hover:text-pure flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-gold" />
                    <span>Minimize</span>
                  </button>
                </div>
              </div>

              {/* Fullscreen Live Iframe */}
              <div className="flex-1 w-full bg-[#090d16] relative">
                <iframe
                  src={
                    (PROJECT_VISUALS[fullscreenProject.id] || PROJECT_VISUALS['disaster-nlp'])
                      .embedUrl
                  }
                  title={`${fullscreenProject.title} Fullscreen Live App`}
                  className="w-full h-full border-0"
                  allow="camera; microphone; clipboard-read; clipboard-write"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
