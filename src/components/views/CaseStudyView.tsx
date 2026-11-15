import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Github,
  Play,
  Sparkles,
  Maximize2,
  X,
  ArrowUpRight,
  Terminal,
  ShieldAlert,
  Workflow,
  Trophy,
  RefreshCw,
} from 'lucide-react'
import { PROJECTS, type ProjectItem } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'
import DisasterNlpSim from '../simulators/DisasterNlpSim'
import AgroDetectSim from '../simulators/AgroDetectSim'
import FaceAttendanceSim from '../simulators/FaceAttendanceSim'

type CaseTab = 'architecture' | 'pipeline' | 'impact' | 'live'
const TAB_ORDER: CaseTab[] = ['architecture', 'pipeline', 'impact', 'live']

interface TransitionCustom {
  axis: 'x' | 'y'
  dir: 1 | -1
}

const SHORT_PROJECT_LABELS: Record<string, string> = {
  'disaster-nlp': 'Disaster Intelligence NLP',
  'face-attendance': 'Face Recognition CV',
  agrodetect: 'AgroDetect AI',
}

const stageMotionVariants = {
  enter: ({ axis, dir }: TransitionCustom) => ({
    opacity: 0,
    x: axis === 'x' ? dir * 80 : 0,
    y: axis === 'y' ? dir * 28 : 0,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: ({ axis, dir }: TransitionCustom) => ({
    opacity: 0,
    x: axis === 'x' ? dir * -80 : 0,
    y: axis === 'y' ? dir * -28 : 0,
    filter: 'blur(4px)',
  }),
}

const headerMotionVariants = {
  enter: ({ axis, dir }: TransitionCustom) => ({
    opacity: 0,
    x: axis === 'x' ? dir * 50 : 0,
    y: axis === 'y' ? dir * 8 : 0,
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: ({ axis, dir }: TransitionCustom) => ({
    opacity: 0,
    x: axis === 'x' ? dir * -50 : 0,
    y: axis === 'y' ? dir * -8 : 0,
  }),
}

const PIPELINE_DIAGRAMS: Record<
  string,
  { title: string; sub: string; color: string }[]
> = {
  'disaster-nlp': [
    { title: 'Data Stream', sub: '81K+ Crisis Tweets', color: '#38BDF8' },
    { title: 'Embeddings', sub: 'Sentence-BERT + spaCy', color: '#A855F7' },
    { title: 'Manifold & Index', sub: 'UMAP + HDBSCAN + FAISS', color: '#EAB767' },
    { title: 'Topic Discovery', sub: 'Hybrid BERTopic + LDA', color: '#F59E0B' },
    { title: 'Urgency & API', sub: 'FastAPI + Streamlit UI', color: '#10B981' },
  ],
  'face-attendance': [
    { title: 'Video Capture', sub: 'OpenCV RGB Stream', color: '#38BDF8' },
    { title: 'Face Detection', sub: 'HOG / CNN Landmarks', color: '#A855F7' },
    { title: '128-D Encoding', sub: 'face_recognition + NumPy', color: '#EAB767' },
    { title: 'SQLite Ledger', sub: 'ID, Dept, Time & Conf.', color: '#F59E0B' },
    { title: 'Live Portal', sub: 'Flask + Bootstrap 5 UI', color: '#10B981' },
  ],
  agrodetect: [
    { title: 'Leaf Input', sub: '224×224 RGB Foliage', color: '#38BDF8' },
    { title: 'Augmentation', sub: 'Scikit-learn & OpenCV', color: '#A855F7' },
    { title: 'Feature Maps', sub: 'Deep Conv2D + MaxPool', color: '#EAB767' },
    { title: 'Classification', sub: 'Keras Softmax (90%+)', color: '#F59E0B' },
    { title: 'Serving Stack', sub: 'FastAPI + Streamlit App', color: '#10B981' },
  ],
}

const EMBED_URLS: Record<string, string> = {
  'disaster-nlp': 'https://aegis-command.streamlit.app/?embed=true',
  'face-attendance': 'https://facerecognitionattendance-9rc8.onrender.com/',
  agrodetect: 'https://agrodetectai.streamlit.app/?embed=true',
}

function IsometricNodeIcon({ color, index }: { color: string; index: number }) {
  return (
    <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
      <svg viewBox="0 0 56 56" className="w-full h-full overflow-visible">
        <polygon
          points="28,38 48,28 28,18 8,28"
          fill="rgba(11,17,30,0.9)"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.65"
        />
        <polygon
          points="28,32 48,22 28,12 8,22"
          fill="rgba(234,183,103,0.14)"
          stroke="#EAB767"
          strokeWidth="1.5"
        />
        <circle cx="28" cy="22" r="3.5" fill={color} />
      </svg>
      <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded bg-obsidian border border-gold/40 font-mono text-[8px] text-gold font-bold leading-tight">
        0{index + 1}
      </span>
    </div>
  )
}

function AnimatedMetricsFooter({
  project,
  onExpandLive,
}: {
  project: ProjectItem
  onExpandLive: () => void
}) {
  return (
    <div className="glass-panel rounded-2xl px-4 py-2.5 border border-gold/25 bg-[#0b111e]/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
      <div className="flex flex-wrap items-center gap-5">
        {project.metrics.map((m, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <Database className="w-3 h-3" />
            </div>
            <div>
              <div className="font-display text-xs sm:text-sm font-bold text-pure leading-none">
                {m.value}
              </div>
              <div className="font-mono text-[9px] text-mist mt-0.5">{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onExpandLive}
          className="btn-gold !px-3.5 !py-1.5 rounded-xl font-display text-xs font-bold flex items-center gap-1.5 shadow-gold-glow"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Expand Live App</span>
        </button>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-xl bg-gold/15 hover:bg-gold hover:text-space border border-gold/45 font-mono text-xs font-semibold text-gold flex items-center gap-1.5 transition-colors"
        >
          <span>New Tab</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-xl bg-obsidian hover:border-gold border border-white/15 font-mono text-xs text-pure flex items-center gap-1.5 transition-colors"
        >
          <Github className="w-3 h-3 text-gold" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  )
}

export default function CaseStudyView() {
  const { activeCaseStudyId, setActiveCaseStudy } = useSceneStore()
  const [activeTab, setActiveTab] = useState<CaseTab>('architecture')
  const [transition, setTransition] = useState<TransitionCustom>({ axis: 'y', dir: 1 })
  const [liveSubMode, setLiveSubMode] = useState<'cloud' | 'simulator'>('cloud')
  const [isFullscreenLive, setIsFullscreenLive] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const wheelCooldownRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const touchStartXRef = useRef<number | null>(null)

  const currentProjectIndex = Math.max(
    0,
    PROJECTS.findIndex((p) => p.id === activeCaseStudyId)
  )
  const project: ProjectItem = PROJECTS[currentProjectIndex] || PROJECTS[0]

  const diagramNodes =
    PIPELINE_DIAGRAMS[project.id] || PIPELINE_DIAGRAMS['disaster-nlp']

  const embedUrl = EMBED_URLS[project.id] || project.liveUrl

  const stateRef = useRef({ currentProjectIndex, activeTab })
  useEffect(() => {
    stateRef.current = { currentProjectIndex, activeTab }
  }, [currentProjectIndex, activeTab])

  useEffect(() => {
    setIframeLoaded(false)
  }, [project.id, activeTab])

  const handleSelectTab = useCallback((nextTab: CaseTab) => {
    setActiveTab((curr) => {
      if (nextTab === curr) return curr
      const currIdx = TAB_ORDER.indexOf(curr)
      const nextIdx = TAB_ORDER.indexOf(nextTab)
      setTransition({ axis: 'y', dir: nextIdx > currIdx ? 1 : -1 })
      return nextTab
    })
  }, [])

  const handleSelectProject = useCallback(
    (targetProjectId: string, startAtTab: CaseTab = 'architecture') => {
      const nextProjIdx = PROJECTS.findIndex((p) => p.id === targetProjectId)
      if (nextProjIdx === -1) return
      const currProjIdx = stateRef.current.currentProjectIndex
      if (nextProjIdx === currProjIdx) return

      const dir: 1 | -1 = nextProjIdx > currProjIdx ? 1 : -1
      setTransition({ axis: 'x', dir })
      setActiveCaseStudy(targetProjectId)
      setActiveTab(startAtTab)
    },
    [setActiveCaseStudy]
  )

  const advanceSequence = useCallback(
    (delta: 1 | -1) => {
      const now = Date.now()
      if (now - wheelCooldownRef.current < 560) return

      const { currentProjectIndex: pIdx, activeTab: cTab } = stateRef.current
      const tIdx = TAB_ORDER.indexOf(cTab)
      const nextTabIdx = tIdx + delta

      if (nextTabIdx >= 0 && nextTabIdx < TAB_ORDER.length) {
        wheelCooldownRef.current = now
        setTransition({ axis: 'y', dir: delta })
        setActiveTab(TAB_ORDER[nextTabIdx])
      } else if (delta > 0) {
        const nextProjIdx = (pIdx + 1) % PROJECTS.length
        wheelCooldownRef.current = now
        setTransition({ axis: 'x', dir: 1 })
        setActiveCaseStudy(PROJECTS[nextProjIdx].id)
        setActiveTab('architecture')
      } else if (delta < 0) {
        const prevProjIdx = (pIdx - 1 + PROJECTS.length) % PROJECTS.length
        wheelCooldownRef.current = now
        setTransition({ axis: 'x', dir: -1 })
        setActiveCaseStudy(PROJECTS[prevProjIdx].id)
        setActiveTab('live')
      }
    },
    [setActiveCaseStudy]
  )

  useEffect(() => {
    const onGlobalWheel = (e: WheelEvent) => {
      if (isFullscreenLive) return

      const scrollBox = (e.target as HTMLElement | null)?.closest(
        '.cs-internal-scroll'
      ) as HTMLElement | null
      if (scrollBox && scrollBox.scrollHeight > scrollBox.clientHeight + 4) {
        const atTop = scrollBox.scrollTop <= 2
        const atBottom =
          Math.ceil(scrollBox.scrollTop + scrollBox.clientHeight) >= scrollBox.scrollHeight - 2
        if (e.deltaY < 0 && !atTop) return
        if (e.deltaY > 0 && !atBottom) return
      }

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 24) {
        const now = Date.now()
        if (now - wheelCooldownRef.current < 600) return
        wheelCooldownRef.current = now
        const dir: 1 | -1 = e.deltaX > 0 ? 1 : -1
        const nextProjIdx =
          (stateRef.current.currentProjectIndex + dir + PROJECTS.length) % PROJECTS.length
        setTransition({ axis: 'x', dir })
        setActiveCaseStudy(PROJECTS[nextProjIdx].id)
        setActiveTab('architecture')
        return
      }

      if (Math.abs(e.deltaY) < 18) return
      advanceSequence(e.deltaY > 0 ? 1 : -1)
    }

    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if (isFullscreenLive) {
        if (e.key === 'Escape') setIsFullscreenLive(false)
        return
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        advanceSequence(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        advanceSequence(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const nextProjIdx = (stateRef.current.currentProjectIndex + 1) % PROJECTS.length
        setTransition({ axis: 'x', dir: 1 })
        setActiveCaseStudy(PROJECTS[nextProjIdx].id)
        setActiveTab('architecture')
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const prevProjIdx =
          (stateRef.current.currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length
        setTransition({ axis: 'x', dir: -1 })
        setActiveCaseStudy(PROJECTS[prevProjIdx].id)
        setActiveTab('architecture')
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY
        touchStartXRef.current = e.touches[0].clientX
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (
        touchStartYRef.current === null ||
        touchStartXRef.current === null ||
        e.changedTouches.length === 0
      )
        return
      const dy = touchStartYRef.current - e.changedTouches[0].clientY
      const dx = touchStartXRef.current - e.changedTouches[0].clientX
      touchStartYRef.current = null
      touchStartXRef.current = null

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
        const dir: 1 | -1 = dx > 0 ? 1 : -1
        const nextProjIdx =
          (stateRef.current.currentProjectIndex + dir + PROJECTS.length) % PROJECTS.length
        setTransition({ axis: 'x', dir })
        setActiveCaseStudy(PROJECTS[nextProjIdx].id)
        setActiveTab('architecture')
      } else if (Math.abs(dy) > 40) {
        advanceSequence(dy > 0 ? 1 : -1)
      }
    }

    window.addEventListener('wheel', onGlobalWheel, { passive: true })
    window.addEventListener('keydown', onGlobalKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onGlobalWheel)
      window.removeEventListener('keydown', onGlobalKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isFullscreenLive, advanceSequence, setActiveCaseStudy])

  return (
    <div className="h-screen max-w-[1360px] mx-auto px-5 sm:px-10 pt-[88px] pb-5 flex flex-col overflow-hidden pointer-events-none select-none">
      {/* ============================================================
          1. TOP BAR: LEFT-ALIGNED PROJECT SWITCHER
         ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gold/15 pointer-events-auto shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 pr-2 border-r border-gold/20">
            <span className="w-2 h-2 rounded-full bg-gold shadow-gold-glow" />
            {/* <span className="font-mono text-[10px] uppercase tracking-[2px] text-gold font-semibold">
              03 // CASE STUDIES
            </span> */}
          </div>

          <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#070b13]/95 border border-gold/25 backdrop-blur-xl shadow-lg">
            {PROJECTS.map((p) => {
              const isSelected = p.id === project.id
              const shortTitle = SHORT_PROJECT_LABELS[p.id] || p.title
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectProject(p.id, 'architecture')}
                  className={`relative px-3 py-1 rounded-lg font-mono text-[10px] transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'text-[#070b13] font-bold'
                      : 'text-mist hover:text-pure'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="cs-project-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F7D9A0] via-[#EAB767] to-[#C5A46D] shadow-gold-glow"
                    />
                  )}
                  <span className="relative z-10 opacity-80">{p.index}</span>
                  <span className="relative z-10">{shortTitle}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#070b13]/90 border border-gold/25 backdrop-blur-md font-mono text-[10px] text-gold">
          <span>{project.period}</span>
        </div>
      </div>

      {/* ============================================================
          2. HERO TITLE ROW + 4-TAB BAR
         ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end py-2.5 pointer-events-auto shrink-0">
        <div className="lg:col-span-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={transition}>
            <motion.div
              key={project.id}
              custom={transition}
              variants={headerMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gold/15 border border-gold/35 font-mono text-[9px] text-gold font-semibold uppercase">
                  {project.category}
                </span>
                <span className="font-mono text-[11px] text-pure/85">{project.subtitle}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-[34px] font-bold text-pure tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-xs text-mist max-w-2xl leading-snug">
                {project.tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 flex lg:justify-end">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#0b111e]/95 border border-gold/30 shadow-lg">
            {[
              { id: 'architecture', label: 'Architecture' },
              { id: 'pipeline', label: 'Pipeline' },
              { id: 'impact', label: 'Impact' },
              { id: 'live', label: '▶ Live App' },
            ].map((t) => {
              const active = activeTab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTab(t.id as CaseTab)}
                  className={`relative px-2.5 sm:px-3 py-1 rounded-lg font-mono text-[10px] transition-colors ${
                    active ? 'text-[#070b13] font-bold' : 'text-mist hover:text-pure'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="cs-tab-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F7D9A0] via-[#EAB767] to-[#C5A46D] shadow-gold-glow"
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ============================================================
          3. CONTENT-HUGGING 2-AXIS STAGE (ZERO ARTIFICIAL STRETCHING)
         ============================================================ */}
      <div className="flex-1 min-h-0 pointer-events-auto relative flex flex-col justify-start pt-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={transition}>
          {/* ----------------------------------------------------------
              TAB 01: ARCHITECTURE FLOW + PROBLEM & SOLUTION + METRICS
             ---------------------------------------------------------- */}
          {activeTab === 'architecture' && (
            <motion.div
              key={`${project.id}-architecture`}
              custom={transition}
              variants={stageMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-auto flex flex-col gap-3"
            >
              {/* Top Card: Compact 5-Stage Isometric Pipeline Flow */}
              <div className="glass-panel rounded-2xl px-4 py-3.5 border border-gold/30 bg-[#0b111e]/90 shrink-0">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-wider text-gold">
                    <Workflow className="w-3.5 h-3.5" />
                    <span>END-TO-END SYSTEM ARCHITECTURE &amp; DATA FLOW</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectTab('live')}
                    className="font-mono text-[9.5px] text-gold hover:underline flex items-center gap-1"
                  >
                    <span>Test Live Pipeline</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-stretch">
                  {diagramNodes.map((node, i) => (
                    <div
                      key={i}
                      className="relative flex items-center gap-2.5 p-2.5 rounded-xl bg-space/85 border border-gold/25 hover:border-gold/60 transition-all group"
                    >
                      <IsometricNodeIcon color={node.color} index={i} />
                      <div className="min-w-0">
                        <div className="font-display text-xs font-bold text-pure truncate group-hover:text-gold transition-colors">
                          {node.title}
                        </div>
                        <div className="font-mono text-[9px] text-mist truncate mt-0.5">
                          {node.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle 2-Column Bento Split: Hugs Content Naturally (No flex-1!) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                <div className="md:col-span-5 glass-panel rounded-2xl p-4 sm:p-5 border border-gold/25 bg-[#0b111e]/90 flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-wider text-gold">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>01 // PROBLEM STATEMENT</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-pure/90 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-obsidian border border-gold/25 font-mono text-[9px] text-gold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-7 glass-panel rounded-2xl p-4 sm:p-5 border border-gold/25 bg-[#0b111e]/90 flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-wider text-gold">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>02 // CORE ENGINEERING ARCHITECTURE &amp; OBJECTIVES</span>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-[13px] text-pure/90 leading-snug">
                      {project.objectives.map((obj, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="px-1.5 py-0.5 rounded bg-gold/15 border border-gold/40 font-mono text-[8.5px] font-bold text-gold shrink-0 mt-0.5">
                            0{idx + 1}
                          </span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2.5 border-t border-gold/15 flex items-center justify-between font-mono text-[9.5px] text-mist">
                    <span>STATUS: LIVE PRODUCTION DEPLOYMENT</span>
                    <span className="text-gold">{project.metrics[0]?.value} • {project.metrics[0]?.label}</span>
                  </div>
                </div>
              </div>

              <AnimatedMetricsFooter
                project={project}
                onExpandLive={() => setIsFullscreenLive(true)}
              />
            </motion.div>
          )}

          {/* ----------------------------------------------------------
              TAB 02: TECHNICAL PIPELINE STEPS & COMPLETE TECH STACK
             ---------------------------------------------------------- */}
          {activeTab === 'pipeline' && (
            <motion.div
              key={`${project.id}-pipeline`}
              custom={transition}
              variants={stageMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-auto flex flex-col gap-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                <div className="md:col-span-7 glass-panel rounded-2xl p-4 sm:p-5 border border-gold/30 bg-[#0b111e]/90 flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-wider text-gold">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>ALGORITHMIC EXECUTION PIPELINE</span>
                  </div>

                  <div className="space-y-2">
                    {project.workflow.map((step, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-space/80 border border-gold/20 flex items-start gap-3"
                      >
                        <span className="px-2 py-0.5 rounded bg-gold/20 border border-gold/45 font-mono text-[9.5px] font-bold text-gold shrink-0">
                          STEP 0{i + 1}
                        </span>
                        <p className="text-xs text-pure/95 leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 glass-panel rounded-2xl p-4 sm:p-5 border border-gold/30 bg-[#0b111e]/90 flex flex-col justify-between gap-4">
                  <div className="space-y-2.5">
                    <div className="font-mono text-[9.5px] uppercase tracking-wider text-gold">
                      COMPLETE PRODUCTION TECH STACK ({project.tags.length} TECHNOLOGIES)
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-xl bg-obsidian border border-gold/35 font-mono text-[11px] text-pure font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/35 space-y-1">
                    <div className="font-mono text-[9.5px] text-gold uppercase font-semibold">
                      Production Deployment Status
                    </div>
                    <div className="text-[11.5px] text-pure/90 leading-snug">
                      Publicly deployed with live interactive web interface and open-source repository on GitHub.
                    </div>
                    <div className="font-mono text-[9.5px] text-gold truncate pt-0.5">
                      {project.liveUrl}
                    </div>
                  </div>
                </div>
              </div>

              <AnimatedMetricsFooter
                project={project}
                onExpandLive={() => setIsFullscreenLive(true)}
              />
            </motion.div>
          )}

          {/* ----------------------------------------------------------
              TAB 03: MEASURABLE IMPACT, FEATURES & OUTCOMES (NO EMPTY GAP!)
             ---------------------------------------------------------- */}
          {activeTab === 'impact' && (
            <motion.div
              key={`${project.id}-impact`}
              custom={transition}
              variants={stageMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-auto flex flex-col gap-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                {/* Left Card: Capabilities + 3 KPI Metric Boxes (Balances Height with Right Card) */}
                <div className="md:col-span-6 glass-panel rounded-2xl p-4 sm:p-5 border border-gold/30 bg-[#0b111e]/90 flex flex-col justify-between gap-3.5">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-wider text-gold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>KEY TECHNICAL CAPABILITIES DELIVERED</span>
                    </div>
                    <div className="space-y-2">
                      {project.features.map((feat, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-space/80 border border-gold/25 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-xs text-pure/95 leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3 Compact KPI Highlights so the card looks complete */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-gold/10 border border-gold/30 text-center"
                      >
                        <div className="font-display text-sm sm:text-base font-bold text-gold leading-none">
                          {m.value}
                        </div>
                        <div className="font-mono text-[9px] text-pure/80 mt-1 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Card: Outcomes + Live CTA */}
                <div className="md:col-span-6 glass-panel rounded-2xl p-4 sm:p-5 border border-gold/30 bg-[#0b111e]/90 flex flex-col justify-between gap-3.5">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-wider text-gold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>MEASURABLE ENGINEERING OUTCOMES</span>
                    </div>
                    <div className="space-y-2">
                      {project.outcomes.map((out, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-space/80 border border-gold/25 flex items-start gap-2.5"
                        >
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 font-mono text-[9.5px] text-emerald-400 font-bold shrink-0">
                            IMPACT 0{i + 1}
                          </span>
                          <span className="text-xs text-pure/95 leading-snug">
                            {out}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-obsidian/90 border border-gold/25 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-display text-xs font-bold text-pure">
                        Ready to test the live deployment?
                      </div>
                      <div className="text-[10.5px] text-mist">
                        Scroll down once more or click to open the live cloud stream.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectTab('live')}
                      className="btn-gold !px-3.5 !py-1.5 rounded-xl font-display text-xs font-bold shrink-0"
                    >
                      Open Live App →
                    </button>
                  </div>
                </div>
              </div>

              <AnimatedMetricsFooter
                project={project}
                onExpandLive={() => setIsFullscreenLive(true)}
              />
            </motion.div>
          )}

          {/* ----------------------------------------------------------
              TAB 04: EMBEDDED LIVE CLOUD APP + INTERACTIVE SIMULATOR
             ---------------------------------------------------------- */}
          {activeTab === 'live' && (
            <motion.div
              key={`${project.id}-live`}
              custom={transition}
              variants={stageMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full glass-panel rounded-2xl border-2 border-gold/60 bg-[#0b111e]/95 flex flex-col overflow-hidden shadow-gold-glow"
            >
              <div className="px-4 py-2 bg-[#070b13] border-b border-gold/25 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[10px] text-gold uppercase font-semibold">
                    LIVE WORKSPACE // {project.title}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLiveSubMode('cloud')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[9.5px] transition-all ${
                      liveSubMode === 'cloud'
                        ? 'bg-gold text-space font-bold'
                        : 'bg-obsidian text-mist hover:text-pure border border-gold/25'
                    }`}
                  >
                    🌐 Live Cloud Deployment
                  </button>
                  <button
                    type="button"
                    onClick={() => setLiveSubMode('simulator')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[9.5px] transition-all ${
                      liveSubMode === 'simulator'
                        ? 'bg-gold text-space font-bold'
                        : 'bg-obsidian text-mist hover:text-pure border border-gold/25'
                    }`}
                  >
                    ⚡ Instant Pipeline Simulator
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFullscreenLive(true)}
                    className="px-2.5 py-1 rounded-lg bg-gold/15 hover:bg-gold hover:text-space border border-gold/40 font-mono text-[9.5px] text-gold flex items-center gap-1 transition-colors"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Fullscreen</span>
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-obsidian hover:border-gold border border-white/15 font-mono text-[9.5px] text-pure flex items-center gap-1 transition-colors"
                  >
                    <span>New Tab</span>
                    <ExternalLink className="w-2.5 h-2.5 text-gold" />
                  </a>
                </div>
              </div>

              <div className="cs-internal-scroll flex-1 min-h-0 relative bg-[#090d16] overflow-y-auto">
                {liveSubMode === 'cloud' ? (
                  <div className="w-full h-full relative">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070b13]/85">
                        <RefreshCw className="w-5 h-5 text-gold animate-spin mb-1.5" />
                        <span className="font-mono text-[10px] text-gold uppercase">
                          Connecting to {project.liveUrl}...
                        </span>
                      </div>
                    )}
                    <iframe
                      src={embedUrl}
                      title={`${project.title} Live Cloud Stream`}
                      onLoad={() => setIframeLoaded(true)}
                      className="w-full h-full border-0"
                      allow="camera; microphone; clipboard-read; clipboard-write"
                    />
                  </div>
                ) : (
                  <div className="p-4 sm:p-6 max-w-3xl mx-auto">
                    {project.id === 'disaster-nlp' && <DisasterNlpSim />}
                    {project.id === 'agrodetect' && <AgroDetectSim />}
                    {project.id === 'face-attendance' && <FaceAttendanceSim />}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================
          4. FULLSCREEN LIVE APP MODAL
         ============================================================ */}
      <AnimatePresence>
        {isFullscreenLive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreenLive(false)}
            className="fixed inset-0 z-[100] bg-space/85 backdrop-blur-md pt-20 pb-6 px-4 sm:px-10 flex items-center justify-center pointer-events-auto cursor-pointer"
            title="Click anywhere outside to minimize"
          >
            <motion.div
              initial={{ scale: 0.93, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl h-full bg-[#0b111e] border-2 border-gold rounded-2xl shadow-[0_25px_90px_rgba(0,0,0,0.95),0_0_45px_rgba(234,183,103,0.22)] flex flex-col overflow-hidden cursor-default"
            >
              <div className="px-5 py-3 bg-[#070b13] border-b border-gold/30 flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-display text-sm sm:text-base font-bold text-pure truncate">
                      {project.title} — Live Production Deployment
                    </h3>
                    <div className="font-mono text-[10px] text-gold truncate">
                      {project.liveUrl}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden md:inline-block font-mono text-[10px] text-mist mr-1">
                    Click outside or press ESC to minimize
                  </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-gold/15 hover:bg-gold hover:text-space border border-gold/45 font-mono text-xs text-gold font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsFullscreenLive(false)}
                    className="px-3 py-1.5 rounded-xl bg-obsidian border border-white/15 hover:border-gold font-mono text-xs text-mist hover:text-pure flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-gold" />
                    <span>Minimize</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full bg-[#090d16] relative">
                <iframe
                  src={embedUrl}
                  title={`${project.title} Fullscreen Live App`}
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