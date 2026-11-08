import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Github,
  Star,
  Database,
  Target,
  Zap,
  Play,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
} from 'lucide-react'
import { useSceneStore } from '../../store/useSceneStore'

type FilterCategory = 'All Projects' | 'NLP' | 'Computer Vision' | 'Deep Learning' | 'Full-Stack' | 'Experiments'

interface CoverflowProject {
  id: 'disaster-nlp' | 'face-attendance' | 'agrodetect' | 'core-morph' | 'rag-engine'
  indexLabel: string
  domainLabel: string
  title: string
  description: string
  featured?: boolean
  categories: FilterCategory[]
  tags: string[]
  githubUrl: string
  imageUrl: string
  stats: {
    icon: 'db' | 'target' | 'zap'
    value: string
    label: string
  }[]
}

// 5 Projects (Odd count guarantees symmetric [-2, -1, 0, +1, +2] Coverflow wings on both sides!)
const CAROUSEL_PROJECTS: CoverflowProject[] = [
  {
    id: 'disaster-nlp',
    indexLabel: '01',
    domainLabel: 'NLP • UNSUPERVISED LEARNING',
    title: 'AI-Based Disaster Intelligence System',
    description:
      'Unsupervised topic discovery and real-time urgency classification from social media data during disasters.',
    featured: true,
    categories: ['All Projects', 'NLP', 'Deep Learning'],
    tags: ['BERTopic', 'Sentence-BERT', 'UMAP', 'HDBSCAN', 'LDA'],
    githubUrl: 'https://github.com/Saimaneesh13',
    imageUrl:
      'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=900&q=80',
    stats: [
      { icon: 'db', value: '81K+', label: 'Tweets Processed' },
      { icon: 'target', value: '20', label: 'Disaster Topics' },
      { icon: 'zap', value: 'Real-time', label: 'Urgency Detection' },
    ],
  },
  {
    id: 'agrodetect',
    indexLabel: '03',
    domainLabel: 'DEEP LEARNING',
    title: 'AgroDetect AI',
    description:
      'Crop leaf disease detection with >90% validation accuracy using a CNN model and FastAPI.',
    featured: false,
    categories: ['All Projects', 'Deep Learning', 'Computer Vision', 'Full-Stack'],
    tags: ['CNN', 'TensorFlow', 'Keras', 'FastAPI'],
    githubUrl: 'https://github.com/Saimaneesh13',
    imageUrl:
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=80',
    stats: [
      { icon: 'target', value: '90%+', label: 'Validation Accuracy' },
      { icon: 'zap', value: '38ms', label: 'FastAPI Latency' },
      { icon: 'db', value: '224×224', label: 'RGB Tensor Input' },
    ],
  },
  {
    id: 'core-morph',
    indexLabel: '04',
    domainLabel: 'WEBGL • GLSL SHADERS',
    title: 'Golden Core Morph Engine',
    description:
      'Custom GLSL curl-noise vertex shader and 24×24 spatial bucket mapper transitioning 26,000+ wire segments into a 3D hologram.',
    featured: false,
    categories: ['All Projects', 'Experiments'],
    tags: ['Three.js', 'GLSL', 'Spatial Hashing', 'UnrealBloom'],
    githubUrl: 'https://github.com/Saimaneesh13',
    imageUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    stats: [
      { icon: 'db', value: '26.4K', label: 'Wire Segments' },
      { icon: 'target', value: '24×24', label: 'Spatial Buckets' },
      { icon: 'zap', value: '60 FPS', label: 'WebGL Pipeline' },
    ],
  },
  {
    id: 'rag-engine',
    indexLabel: '05',
    domainLabel: 'NLP • DATA PIPELINES',
    title: 'EduExpose ML Research Suite',
    description:
      'Award-winning machine learning evaluation pipeline and feature engineering workflow developed during EduExpose internship.',
    featured: false,
    categories: ['All Projects', 'NLP', 'Full-Stack'],
    tags: ['Scikit-learn', 'Pandas', 'NumPy', 'Plotly', 'Streamlit'],
    githubUrl: 'https://github.com/Saimaneesh13',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    stats: [
      { icon: 'target', value: 'Best Award', label: 'EduExpose Internship' },
      { icon: 'db', value: 'End-to-End', label: 'Feature Pipeline' },
      { icon: 'zap', value: 'Interactive', label: 'Streamlit Telemetry' },
    ],
  },
  {
    id: 'face-attendance',
    indexLabel: '02',
    domainLabel: 'COMPUTER VISION',
    title: 'Face Recognition Attendance System',
    description:
      'Real-time biometric attendance using face recognition with a Flask backend and SQLite database.',
    featured: false,
    categories: ['All Projects', 'Computer Vision', 'Full-Stack'],
    tags: ['OpenCV', 'Flask', 'SQLite', 'Python'],
    githubUrl: 'https://github.com/Saimaneesh13',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    stats: [
      { icon: 'zap', value: '<85ms', label: 'Frame Match' },
      { icon: 'target', value: '128-D', label: 'Face Embeddings' },
      { icon: 'db', value: 'SQLite', label: 'Auto Audit Ledger' },
    ],
  },
]

const FILTER_TABS: FilterCategory[] = [
  'All Projects',
  'NLP',
  'Computer Vision',
  'Deep Learning',
  'Full-Stack',
  'Experiments',
]

const TECH_STACK_DOCK = [
  { name: 'Python', color: '#3776AB', badge: 'Py' },
  { name: 'TensorFlow', color: '#FF6F00', badge: 'TF' },
  { name: 'OpenCV', color: '#5C3EE8', badge: 'CV' },
  { name: 'PyTorch', color: '#EE4C2C', badge: 'Pt' },
  { name: 'scikit-learn', color: '#F7931E', badge: 'SK' },
  { name: 'FastAPI', color: '#009688', badge: 'FA' },
  { name: 'SQLite', color: '#003B57', badge: 'SQL' },
  { name: 'Streamlit', color: '#FF4B4B', badge: 'St' },
]

// Photographic Cover + HUD Reticle Overlay matching reference design
function ProjectVisualBanner({ project, isActive }: { project: CoverflowProject; isActive: boolean }) {
  return (
    <div className="relative h-36 sm:h-40 w-full overflow-hidden rounded-xl border border-gold/30 bg-[#050912]">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105"
      />
      {/* Dark luxury gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,11,19,0.2) 0%, rgba(7,11,19,0.15) 55%, rgba(7,11,19,0.88) 100%)',
        }}
      />

      {/* Golden HUD Corner Target Brackets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 180">
        <path d="M125,30 L105,30 L105,50" fill="none" stroke="rgba(234,183,103,0.75)" strokeWidth="1.8" />
        <path d="M275,30 L295,30 L295,50" fill="none" stroke="rgba(234,183,103,0.75)" strokeWidth="1.8" />
        <path d="M125,150 L105,150 L105,130" fill="none" stroke="rgba(234,183,103,0.75)" strokeWidth="1.8" />
        <path d="M275,150 L295,150 L295,130" fill="none" stroke="rgba(234,183,103,0.75)" strokeWidth="1.8" />
        {project.id === 'disaster-nlp' && (
          <g transform="translate(200,90)">
            <circle r="38" fill="none" stroke="rgba(234,183,103,0.45)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="-28" cy="-14" r="3" fill="#EAB767" />
            <circle cx="32" cy="18" r="3" fill="#EAB767" />
            <circle cx="18" cy="-26" r="3" fill="#EAB767" />
            <circle cx="-22" cy="24" r="3" fill="#EAB767" />
          </g>
        )}
        {project.id === 'face-attendance' && (
          <g>
            <circle cx="182" cy="78" r="2.5" fill="#7DD3FC" />
            <circle cx="218" cy="78" r="2.5" fill="#7DD3FC" />
            <circle cx="200" cy="96" r="2.5" fill="#EAB767" />
            <circle cx="186" cy="114" r="2.5" fill="#7DD3FC" />
            <circle cx="214" cy="114" r="2.5" fill="#7DD3FC" />
          </g>
        )}
      </svg>

      {/* Top-Right Quick Launch Icon */}
      {isActive && (
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-space/75 border border-gold/45 flex items-center justify-center text-gold">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  )
}

// Inline Live Simulator inside the active card
function InlineLiveSimulator({ id }: { id: CoverflowProject['id'] }) {
  const { setManualProgress, toggleInspect3D } = useSceneStore()
  const [sampleIdx, setSampleIdx] = useState(0)

  if (id === 'disaster-nlp' || id === 'rag-engine') {
    const tweets = [
      {
        raw: 'URGENT: Flood water rising over bridge in Sector 4, 12 residents stranded on roof!',
        topic: 'Topic #04: Flood Rescue',
        umap: '[-2.41, 1.88]',
        tier: 'CRITICAL (96.4%)',
      },
      {
        raw: 'Substation transformer down near City Hospital, backup diesel needed within 2 hrs.',
        topic: 'Topic #07: Grid & Medical',
        umap: '[1.92, -0.74]',
        tier: 'CRITICAL (94.1%)',
      },
      {
        raw: 'Weather advisory: heavy rain expected to clear by tomorrow afternoon.',
        topic: 'Topic #12: Weather Advisory',
        umap: '[4.15, 3.10]',
        tier: 'LOW (91.8%)',
      },
    ]
    const active = tweets[sampleIdx % tweets.length]
    return (
      <div className="h-36 sm:h-40 w-full rounded-xl border border-gold/60 bg-[#070b13]/95 p-3 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-gold/20 pb-1.5">
          <span className="text-[10px] text-gold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            LIVE BERTOPIC + UMAP STREAM
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSampleIdx(i)
                }}
                className={`px-2 py-0.5 rounded text-[9px] ${
                  sampleIdx === i ? 'bg-gold text-space font-semibold' : 'bg-obsidian text-mist border border-gold/20'
                }`}
              >
                #{i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-pure bg-obsidian/90 px-2.5 py-1.5 rounded border border-gold/15 truncate">
          "{active.raw}"
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-[9px]">
          <div className="bg-obsidian/70 p-1.5 rounded border border-gold/20 truncate">
            <span className="text-mist block">Topic</span>
            <span className="text-pure">{active.topic}</span>
          </div>
          <div className="bg-obsidian/70 p-1.5 rounded border border-gold/20">
            <span className="text-mist block">UMAP</span>
            <span className="text-gold">{active.umap}</span>
          </div>
          <div className="bg-obsidian/70 p-1.5 rounded border border-gold/20">
            <span className="text-mist block">Urgency</span>
            <span className="text-gold font-semibold">{active.tier}</span>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'face-attendance') {
    const scans = [
      { id: 'LPU-CSE-01', user: 'Gorrela Sai Maneesh', dist: '0.312', status: 'VERIFIED & LOGGED' },
      { id: 'LPU-CSE-02', user: 'Verified Faculty #04', dist: '0.348', status: 'VERIFIED & LOGGED' },
    ]
    const active = scans[sampleIdx % scans.length]
    return (
      <div className="h-36 sm:h-40 w-full rounded-xl border border-gold/60 bg-[#070b13]/95 p-3 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-gold/20 pb-1.5">
          <span className="text-[10px] text-gold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            OPENCV + SQLITE LIVE MATCHER
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSampleIdx((p) => p + 1)
            }}
            className="px-2 py-0.5 rounded bg-gold text-space text-[9px] font-semibold"
          >
            Scan Next Frame
          </button>
        </div>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between text-mist">
            <span>Identity:</span>
            <span className="text-pure font-medium">{active.user}</span>
          </div>
          <div className="flex justify-between text-mist">
            <span>128-D L2 Distance:</span>
            <span className="text-gold">{active.dist} (≤ 0.45)</span>
          </div>
          <div className="flex justify-between text-mist">
            <span>SQLite Status:</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {active.status}
            </span>
          </div>
        </div>
        <div className="text-[9px] text-gold-champagne bg-obsidian/80 px-2 py-1 rounded border border-gold/20 truncate">
          INSERT INTO attendance VALUES ('{active.id}', '{active.user}', CURRENT_TIMESTAMP);
        </div>
      </div>
    )
  }

  if (id === 'agrodetect') {
    const leaves = [
      { label: 'Early Blight', conf: '94.6%', latency: '38ms', status: 'Fungicide Protocol A' },
      { label: 'Late Blight', conf: '92.8%', latency: '41ms', status: 'Isolate Canopy Plot' },
      { label: 'Healthy Leaf', conf: '98.2%', latency: '34ms', status: 'Optimal Foliage' },
    ]
    const active = leaves[sampleIdx % leaves.length]
    return (
      <div className="h-36 sm:h-40 w-full rounded-xl border border-gold/60 bg-[#070b13]/95 p-3 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-gold/20 pb-1.5">
          <span className="text-[10px] text-gold flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-gold" />
            KERAS CNN + FASTAPI LIVE
          </span>
          <div className="flex gap-1">
            {['Early', 'Late', 'Healthy'].map((lbl, i) => (
              <button
                key={lbl}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSampleIdx(i)
                }}
                className={`px-2 py-0.5 rounded text-[9px] ${
                  sampleIdx % 3 === i ? 'bg-gold text-space font-semibold' : 'bg-obsidian text-mist border border-gold/20'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="bg-obsidian/80 p-1.5 rounded border border-gold/20">
            <span className="text-mist text-[9px] block">Diagnosis</span>
            <span className="text-pure font-medium">{active.label}</span>
          </div>
          <div className="bg-obsidian/80 p-1.5 rounded border border-gold/20">
            <span className="text-mist text-[9px] block">Confidence</span>
            <span className="text-gold font-semibold">
              {active.conf} ({active.latency})
            </span>
          </div>
        </div>
        <div className="text-[9px] text-gold-champagne bg-obsidian/80 px-2 py-1 rounded border border-gold/20 truncate">
          FastAPI 200 OK → {active.status}
        </div>
      </div>
    )
  }

  return (
    <div className="h-36 sm:h-40 w-full rounded-xl border border-gold/60 bg-[#070b13]/95 p-3 flex flex-col items-center justify-center text-center gap-2">
      <Sparkles className="w-5 h-5 text-gold animate-pulse" />
      <p className="text-[11px] text-mist max-w-xs">
        Unblur the WebGL canvas to inspect the 26,400 neural core segments in fullscreen.
      </p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setManualProgress(1)
          toggleInspect3D()
        }}
        className="btn-gold !text-[11px] !py-1 !px-3"
      >
        Inspect Fullscreen 3D
      </button>
    </div>
  )
}

export default function ProjectsView() {
  const { setActiveCaseStudy, setManualProgress, toggleInspect3D } = useSceneStore()
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All Projects')
  const [activeIndex, setActiveIndex] = useState(0)
  const [liveModeId, setLiveModeId] = useState<CoverflowProject['id'] | null>(null)
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const filteredProjects = CAROUSEL_PROJECTS.filter((p) =>
    p.categories.includes(activeCategory)
  )

  useEffect(() => {
    setActiveIndex(0)
    setLiveModeId(null)
  }, [activeCategory])

  const count = filteredProjects.length

  const handleNext = useCallback(() => {
    if (count <= 1) return
    setActiveIndex((prev) => (prev + 1) % count)
  }, [count])

  const handlePrev = useCallback(() => {
    if (count <= 1) return
    setActiveIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleNext, handlePrev])

  // Symmetric signed circular offset
  const getSignedOffset = (index: number) => {
    if (count <= 1) return 0
    let diff = index - activeIndex
    const half = Math.floor(count / 2)
    if (diff > half) diff -= count
    if (diff < -half) diff += count
    return diff
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 45
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNext()
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrev()
    }
  }

  const isMobile = viewportWidth < 768
  const xStride = isMobile ? 240 : 340

  return (
    <div
      className="h-screen w-full max-w-[1340px] mx-auto px-4 sm:px-8 pt-20 pb-4 flex flex-col justify-between overflow-hidden pointer-events-auto select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="AI, Machine Learning and Computer Vision Projects"
    >
      {/* 1. COMPACT HEADER & FILTER PILLS */}
      <div className="text-center space-y-1.5 z-20">
        <div className="mono-label text-gold !text-[10px]">02 // PROJECTS</div>
        <h1 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-pure">
          AI, Machine Learning & Computer Vision Projects
        </h1>
        <p className="text-mist text-xs max-w-xl mx-auto">
          Real-world AI/ML systems built for impact — swipe to explore my work.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1" role="tablist">
          {FILTER_TABS.map((tab) => {
            const active = activeCategory === tab
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(tab)}
                className={`px-3.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                  active
                    ? 'bg-gold/20 text-gold border border-gold shadow-gold-glow'
                    : 'bg-obsidian/70 text-mist border border-gold/20 hover:border-gold/45 hover:text-pure'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. 3D COVERFLOW STAGE (No CSS filter on 3D children so preserve-3d works flawlessly) */}
      <div className="relative w-full h-[405px] sm:h-[425px] flex items-center justify-center">
        {/* Left Navigation Arrow */}
        {count > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-1 sm:left-4 z-40 w-10 h-10 rounded-full glass-panel border border-gold/50 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-105 active:scale-95 transition-all shadow-gold-glow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {filteredProjects.map((project, idx) => {
              const offset = getSignedOffset(idx)
              const absOffset = Math.abs(offset)
              const isActive = offset === 0
              const isLive = liveModeId === project.id

              if (absOffset > 2) return null

              const translateX = offset * xStride
              const rotateY = isActive ? 0 : offset < 0 ? 22 : -22
              const scale = isActive ? 1 : absOffset === 1 ? 0.84 : 0.72
              const opacity = isActive ? 1 : absOffset === 1 ? 0.72 : 0.35
              const zIndex = 30 - absOffset * 10

              return (
                <motion.article
                  key={project.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${count}: ${project.title}`}
                  aria-hidden={!isActive}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={handleDragEnd}
                  onClick={() => {
                    if (!isActive) setActiveIndex(idx)
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: translateX,
                    rotateY,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 28,
                    mass: 0.9,
                  }}
                  style={{
                    transformPerspective: 1200,
                  }}
                  className={`group absolute w-[min(88vw,450px)] rounded-2xl p-4 sm:p-5 transition-colors ${
                    isActive
                      ? 'bg-[#0c1322]/95 backdrop-blur-xl border-2 border-gold shadow-[0_0_55px_rgba(234,183,103,0.32)] cursor-grab active:cursor-grabbing'
                      : 'bg-[#090e1a]/90 border border-gold/30 cursor-pointer hover:border-gold/55 shadow-2xl'
                  }`}
                >
                  {/* Visual Header */}
                  <div className="relative mb-3">
                    {project.featured && (
                      <div className="absolute top-2.5 left-2.5 z-20 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-[#F7D9A0] to-[#EAB767] text-space font-mono text-[9px] font-semibold uppercase tracking-wider shadow">
                        <Star className="w-2.5 h-2.5 fill-space" />
                        <span>FEATURED</span>
                      </div>
                    )}

                    {isActive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setLiveModeId(isLive ? null : project.id)
                        }}
                        className={`absolute top-2.5 right-11 z-20 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono text-[9px] uppercase tracking-wider border transition-all ${
                          isLive
                            ? 'bg-gold text-space border-gold font-semibold shadow-gold-glow'
                            : 'bg-space/85 text-gold border-gold/45 hover:bg-gold/15'
                        }`}
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{isLive ? 'Exit Live' : 'Live Mode'}</span>
                      </button>
                    )}

                    {isActive && isLive ? (
                      <InlineLiveSimulator id={project.id} />
                    ) : (
                      <ProjectVisualBanner project={project} isActive={isActive} />
                    )}
                  </div>

                  {/* Domain & Title */}
                  <div className="space-y-1">
                    <div className="font-mono text-[9px] tracking-[2px] uppercase text-gold">
                      {project.indexLabel} // {project.domainLabel}
                    </div>
                    <h2 className="font-display text-lg sm:text-xl font-semibold text-pure leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-xs text-mist leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 my-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-2 py-0.5 rounded bg-obsidian/90 border border-gold/25 text-pure"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Key Metrics Row (Active Card) */}
                  {isActive && (
                    <div className="grid grid-cols-3 gap-2 py-2.5 mb-3 border-y border-gold/20">
                      {project.stats.map((st, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-md bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                            {st.icon === 'db' && <Database className="w-3 h-3" />}
                            {st.icon === 'target' && <Target className="w-3 h-3" />}
                            {st.icon === 'zap' && <Zap className="w-3 h-3" />}
                          </div>
                          <div className="min-w-0">
                            <div className="font-display text-xs font-semibold text-pure truncate">
                              {st.value}
                            </div>
                            <div className="font-mono text-[8px] text-mist truncate">{st.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (project.id === 'core-morph') {
                          setManualProgress(1)
                          toggleInspect3D()
                        } else if (project.id === 'rag-engine') {
                          setActiveCaseStudy('disaster-nlp')
                        } else {
                          setActiveCaseStudy(project.id)
                        }
                      }}
                      className="btn-gold !py-1.5 !px-3.5 !text-xs flex items-center gap-1.5"
                    >
                      <span>{project.id === 'core-morph' ? 'Inspect 3D Core' : 'View Case Study'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-ghost-gold !py-1.5 !px-3.5 !text-xs flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Right Navigation Arrow */}
        {count > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next project"
            className="absolute right-1 sm:right-4 z-40 w-10 h-10 rounded-full glass-panel border border-gold/50 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-105 active:scale-95 transition-all shadow-gold-glow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 3. PAGINATION DOTS & TECH STACK DOCK (Visible at the bottom of the screen) */}
      <div className="space-y-2.5 z-20 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-center gap-2" role="tablist">
          {filteredProjects.map((proj, idx) => {
            const active = idx === activeIndex
            return (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to ${proj.title}`}
                aria-selected={active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active ? 'w-6 bg-gold shadow-gold-glow' : 'w-2 bg-gold/25 hover:bg-gold/50'
                }`}
              />
            )
          })}
        </div>

        <div className="glass-panel rounded-2xl px-5 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 border border-gold/25">
          <div className="flex items-center gap-2.5 pr-4 md:border-r border-gold/20">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display text-xs font-semibold text-pure">Tech Stack</div>
              <div className="font-mono text-[9px] text-mist">Used Across Projects</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {TECH_STACK_DOCK.map((tech) => (
              <div key={tech.name} className="flex items-center gap-1.5 group cursor-default">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center font-mono text-[9px] font-semibold text-pure border border-gold/25 group-hover:border-gold transition-colors"
                  style={{ backgroundColor: `${tech.color}30` }}
                >
                  {tech.badge}
                </div>
                <span className="font-mono text-[10px] text-mist group-hover:text-pure transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
