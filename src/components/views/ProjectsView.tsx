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
  id: 'disaster-nlp' | 'face-attendance' | 'agrodetect' | 'core-morph'
  indexLabel: string
  domainLabel: string
  title: string
  description: string
  featured?: boolean
  categories: FilterCategory[]
  tags: string[]
  githubUrl: string
  stats: {
    icon: 'db' | 'target' | 'zap'
    value: string
    label: string
  }[]
}

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
    githubUrl: 'https://github.com/',
    stats: [
      { icon: 'db', value: '81K+', label: 'Tweets Processed' },
      { icon: 'target', value: '20', label: 'Disaster Topics' },
      { icon: 'zap', value: 'Real-time', label: 'Urgency Detection' },
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
    githubUrl: 'https://github.com/',
    stats: [
      { icon: 'zap', value: '<85ms', label: 'Frame Match' },
      { icon: 'target', value: '128-D', label: 'Face Embeddings' },
      { icon: 'db', value: 'SQLite', label: 'Auto Audit Ledger' },
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
    githubUrl: 'https://github.com/',
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
    githubUrl: 'https://github.com/',
    stats: [
      { icon: 'db', value: '26.4K', label: 'Wire Segments' },
      { icon: 'target', value: '24×24', label: 'Spatial Buckets' },
      { icon: 'zap', value: '60 FPS', label: 'WebGL Pipeline' },
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

// Animated SVG & HUD Visual Header for each project card
function ProjectVisualBanner({ id, isActive }: { id: CoverflowProject['id']; isActive: boolean }) {
  if (id === 'disaster-nlp') {
    return (
      <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl border border-gold/25 bg-[#050912]">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.28) 0%, rgba(234, 183, 103, 0.18) 38%, rgba(7, 11, 19, 0.96) 75%)',
          }}
        />
        {/* Animated Hurricane / Topic Cluster Swirl SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
          <g transform="translate(200,100)">
            <circle r="72" fill="none" stroke="rgba(234,183,103,0.22)" strokeWidth="1" strokeDasharray="4 6" />
            <circle r="48" fill="none" stroke="rgba(125,211,252,0.35)" strokeWidth="1.5" strokeDasharray="8 4" />
            <circle r="22" fill="rgba(224,242,254,0.15)" stroke="rgba(234,183,103,0.75)" strokeWidth="1.5" />
            {/* Glowing Cluster Nodes */}
            {[
              [-65, -25], [-38, 30], [52, -32], [68, 22], [-18, -52], [28, 48], [-85, 12], [82, -14],
            ].map(([cx, cy], idx) => (
              <g key={idx}>
                <line x1="0" y1="0" x2={cx} y2={cy} stroke="rgba(234,183,103,0.3)" strokeWidth="0.8" />
                <circle cx={cx} cy={cy} r="3.5" fill="#EAB767" />
                <circle cx={cx} cy={cy} r="7" fill="rgba(234,183,103,0.25)" />
              </g>
            ))}
          </g>
        </svg>
        {isActive && (
          <div className="absolute bottom-2.5 right-3 font-mono text-[9px] px-2 py-0.5 rounded bg-space/80 border border-gold/30 text-gold">
            UMAP + HDBSCAN CLUSTER STREAM
          </div>
        )}
      </div>
    )
  }

  if (id === 'face-attendance') {
    return (
      <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl border border-gold/25 bg-[#060d18]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.22) 0%, rgba(17, 24, 39, 0.92) 72%)',
          }}
        />
        {/* Biometric Face Mesh & Bounding Box */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
          {/* Corner Brackets */}
          <path d="M130,35 L110,35 L110,55" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M270,35 L290,35 L290,55" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M130,165 L110,165 L110,145" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M270,165 L290,165 L290,145" fill="none" stroke="#EAB767" strokeWidth="2" />
          {/* Wireframe Face Landmarks */}
          <ellipse cx="200" cy="100" rx="46" ry="58" fill="none" stroke="rgba(125,211,252,0.45)" strokeWidth="1.2" />
          <polygon
            points="175,82 190,78 200,98 182,92"
            fill="none"
            stroke="rgba(234,183,103,0.65)"
            strokeWidth="1"
          />
          <polygon
            points="225,82 210,78 200,98 218,92"
            fill="none"
            stroke="rgba(234,183,103,0.65)"
            strokeWidth="1"
          />
          <polygon
            points="180,125 200,118 220,125 200,136"
            fill="none"
            stroke="rgba(125,211,252,0.65)"
            strokeWidth="1.2"
          />
          {[
            [175, 82], [225, 82], [200, 102], [180, 125], [220, 125], [200, 62], [162, 102], [238, 102],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.8" fill="#EAB767" />
          ))}
        </svg>
        <div className="absolute bottom-2.5 left-3 font-mono text-[9px] px-2 py-0.5 rounded bg-space/80 border border-gold/30 text-gold">
          128-D ENCODING MATCH: 99.2%
        </div>
      </div>
    )
  }

  if (id === 'agrodetect') {
    return (
      <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl border border-gold/25 bg-[#07120c]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 52% 48%, rgba(74, 222, 128, 0.25) 0%, rgba(234, 183, 103, 0.16) 45%, rgba(7, 11, 19, 0.95) 78%)',
          }}
        />
        {/* Leaf Pathology & CNN Detection Bounding Box */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
          <path d="M135,40 L118,40 L118,58" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M265,40 L282,40 L282,58" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M135,160 L118,160 L118,142" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M265,160 L282,160 L282,142" fill="none" stroke="#EAB767" strokeWidth="2" />
          {/* Stylized Leaf Contour */}
          <path
            d="M145,135 Q155,55 245,55 Q235,135 145,135 Z"
            fill="rgba(74,222,128,0.18)"
            stroke="#4ADE80"
            strokeWidth="1.6"
          />
          <line x1="145" y1="135" x2="240" y2="58" stroke="rgba(234,183,103,0.65)" strokeWidth="1.4" />
          {/* Detected Lesion Hotspots */}
          <circle cx="195" cy="92" r="8" fill="rgba(234,183,103,0.45)" stroke="#EAB767" strokeWidth="1.5" />
          <circle cx="215" cy="82" r="5" fill="rgba(234,183,103,0.45)" stroke="#EAB767" strokeWidth="1.2" />
          <circle cx="182" cy="108" r="6" fill="rgba(234,183,103,0.45)" stroke="#EAB767" strokeWidth="1.2" />
        </svg>
        <div className="absolute bottom-2.5 left-3 font-mono text-[9px] px-2 py-0.5 rounded bg-space/80 border border-gold/30 text-gold">
          CNN CONFIDENCE: 94.6% (EARLY BLIGHT)
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl border border-gold/25 bg-[#080b14]">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(234, 183, 103, 0.32) 0%, rgba(7, 11, 19, 0.95) 72%)',
        }}
      />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
        <circle cx="200" cy="100" r="56" fill="none" stroke="#EAB767" strokeWidth="1.2" strokeDasharray="5 4" />
        <circle cx="200" cy="100" r="34" fill="none" stroke="#C5A46D" strokeWidth="1" />
        <circle cx="200" cy="100" r="14" fill="rgba(234,183,103,0.35)" stroke="#F7D9A0" strokeWidth="1.5" />
      </svg>
      <div className="absolute bottom-2.5 left-3 font-mono text-[9px] px-2 py-0.5 rounded bg-space/80 border border-gold/30 text-gold">
        GLSL CURL-FLOW SHADER
      </div>
    </div>
  )
}

// Inline Live Mode Simulator inside the active card
function InlineLiveSimulator({ id }: { id: CoverflowProject['id'] }) {
  const { setManualProgress, toggleInspect3D } = useSceneStore()
  const [sampleIdx, setSampleIdx] = useState(0)

  if (id === 'disaster-nlp') {
    const tweets = [
      {
        raw: 'URGENT: Flood water rising over bridge in Sector 4, 12 people stranded on roof!',
        topic: 'Topic #04: Flood Rescue',
        umap: '[-2.41, 1.88]',
        tier: 'CRITICAL (96.4%)',
      },
      {
        raw: 'Substation transformer down near City Hospital, backup diesel needed within 2 hrs.',
        topic: 'Topic #07: Grid & Medical Failure',
        umap: '[1.92, -0.74]',
        tier: 'CRITICAL (94.1%)',
      },
      {
        raw: 'Weather advisory: heavy rain expected to clear by tomorrow afternoon.',
        topic: 'Topic #12: Weather Bulletin',
        umap: '[4.15, 3.10]',
        tier: 'LOW (91.8%)',
      },
    ]
    const active = tweets[sampleIdx]
    return (
      <div className="h-44 sm:h-48 w-full rounded-xl border border-gold/50 bg-[#070b13]/95 p-3.5 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-gold/20 pb-2">
          <span className="text-[10px] text-gold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            LIVE BERTOPIC + UMAP INFERENCE
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setSampleIdx(i)
                }}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  sampleIdx === i ? 'bg-gold text-space font-semibold' : 'bg-obsidian text-mist border border-gold/20'
                }`}
              >
                Feed #{i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[11px] text-pure bg-obsidian/90 p-2 rounded border border-gold/15 line-clamp-2">
          "{active.raw}"
        </div>
        <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
          <div className="bg-obsidian/70 p-1.5 rounded border border-gold/20">
            <span className="text-mist block text-[9px]">BERTopic</span>
            <span className="text-pure truncate block">{active.topic}</span>
          </div>
          <div className="bg-obsidian/70 p-1.5 rounded border border-gold/20">
            <span className="text-mist block text-[9px]">UMAP Vector</span>
            <span className="text-gold">{active.umap}</span>
          </div>
          <div className="bg-obsidian/70 p-1.5 rounded border border-gold/20">
            <span className="text-mist block text-[9px]">Urgency Triage</span>
            <span className="text-gold font-semibold">{active.tier}</span>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'face-attendance') {
    const scans = [
      { id: 'LPU-CSE-01', user: 'Gorrela Sai Maneesh', dist: '0.312', status: 'LOGGED TO SQLITE' },
      { id: 'LPU-CSE-02', user: 'Verified Faculty #04', dist: '0.348', status: 'LOGGED TO SQLITE' },
    ]
    const active = scans[sampleIdx % scans.length]
    return (
      <div className="h-44 sm:h-48 w-full rounded-xl border border-gold/50 bg-[#070b13]/95 p-3.5 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-gold/20 pb-2">
          <span className="text-[10px] text-gold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            OPENCV + FLASK + SQLITE LIVE STREAM
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSampleIdx((p) => p + 1)
            }}
            className="px-2.5 py-0.5 rounded bg-gold text-space text-[10px] font-semibold"
          >
            Trigger Scan
          </button>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between text-mist">
            <span>Matched Identity:</span>
            <span className="text-pure font-medium">{active.user}</span>
          </div>
          <div className="flex justify-between text-mist">
            <span>128-D Euclidean Distance:</span>
            <span className="text-gold">{active.dist} (Threshold ≤ 0.45)</span>
          </div>
          <div className="flex justify-between text-mist">
            <span>SQLite Transaction:</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {active.status}
            </span>
          </div>
        </div>
        <div className="text-[10px] text-gold-champagne bg-obsidian/80 px-2.5 py-1.5 rounded border border-gold/20">
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
      <div className="h-44 sm:h-48 w-full rounded-xl border border-gold/50 bg-[#070b13]/95 p-3.5 flex flex-col justify-between font-mono text-xs">
        <div className="flex items-center justify-between border-b border-gold/20 pb-2">
          <span className="text-[10px] text-gold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-gold" />
            KERAS CNN + FASTAPI LIVE INFERENCE
          </span>
          <div className="flex gap-1">
            {['Early', 'Late', 'Healthy'].map((lbl, i) => (
              <button
                key={lbl}
                onClick={(e) => {
                  e.stopPropagation()
                  setSampleIdx(i)
                }}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  sampleIdx % 3 === i ? 'bg-gold text-space font-semibold' : 'bg-obsidian text-mist border border-gold/20'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-obsidian/80 p-2 rounded border border-gold/20">
            <span className="text-mist text-[9px] block">Predicted Pathology</span>
            <span className="text-pure font-medium">{active.label}</span>
          </div>
          <div className="bg-obsidian/80 p-2 rounded border border-gold/20">
            <span className="text-mist text-[9px] block">Softmax Confidence</span>
            <span className="text-gold font-semibold">
              {active.conf} ({active.latency})
            </span>
          </div>
        </div>
        <div className="text-[10px] text-gold-champagne bg-obsidian/80 px-2.5 py-1.5 rounded border border-gold/20">
          FastAPI 200 OK → Action: {active.status}
        </div>
      </div>
    )
  }

  return (
    <div className="h-44 sm:h-48 w-full rounded-xl border border-gold/50 bg-[#070b13]/95 p-4 flex flex-col items-center justify-center text-center gap-3">
      <Sparkles className="w-6 h-6 text-gold animate-pulse" />
      <p className="text-xs text-mist max-w-xs">
        Unblur the background WebGL canvas and morph the 26,400 neural core segments in real time.
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setManualProgress(1)
          toggleInspect3D()
        }}
        className="btn-gold !text-xs !py-1.5 !px-4"
      >
        Inspect Fullscreen 3D Hologram
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

  // Keep activeIndex in bounds when switching category tabs
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

  // Keyboard accessibility (Left/Right arrows)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleNext, handlePrev])

  // Compute circular signed offset (-1 = left card, 0 = active center card, +1 = right card)
  const getSignedOffset = (index: number) => {
    if (count <= 1) return 0
    let diff = index - activeIndex
    if (diff > count / 2) diff -= count
    if (diff < -count / 2) diff += count
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
  const xStride = isMobile ? 260 : 380

  return (
    <div
      className="min-h-screen w-full max-w-[1320px] mx-auto px-4 sm:px-8 pt-24 pb-24 flex flex-col justify-between pointer-events-auto select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="AI, Machine Learning and Computer Vision Projects"
    >
      {/* 1. HEADER & FILTER PILLS */}
      <div className="text-center space-y-3">
        <div className="mono-label text-gold">02 // PROJECTS</div>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-pure">
          AI, Machine Learning & Computer Vision Projects
        </h1>
        <p className="text-mist text-xs sm:text-sm max-w-xl mx-auto">
          Real-world AI/ML systems built for impact — swipe, drag, or use arrow keys to explore my work.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2" role="tablist">
          {FILTER_TABS.map((tab) => {
            const active = activeCategory === tab
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  active
                    ? 'bg-gold/20 text-gold border border-gold shadow-gold-glow'
                    : 'bg-obsidian/60 text-mist border border-gold/20 hover:border-gold/45 hover:text-pure'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. 3D COVERFLOW STAGE */}
      <div
        className="relative w-full h-[520px] sm:h-[545px] flex items-center justify-center my-2 overflow-visible"
        style={{ perspective: '1400px' }}
      >
        {/* Left Navigation Arrow */}
        {count > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-1 sm:left-4 z-40 w-11 h-11 rounded-full glass-panel border border-gold/45 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-105 active:scale-95 transition-all shadow-gold-glow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* 3D Cards Track */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence initial={false}>
            {filteredProjects.map((project, idx) => {
              const offset = getSignedOffset(idx)
              const absOffset = Math.abs(offset)
              const isActive = offset === 0
              const isLive = liveModeId === project.id

              // Hide cards further than 2 positions away
              if (absOffset > 2) return null

              const translateX = offset * xStride
              const translateZ = isActive ? 0 : -190 * absOffset
              const rotateY = isActive ? 0 : offset < 0 ? 28 : -28
              const scale = isActive ? 1 : absOffset === 1 ? 0.84 : 0.7
              const opacity = isActive ? 1 : absOffset === 1 ? 0.62 : 0.25
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
                    z: translateZ,
                    rotateY,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 28,
                    mass: 0.9,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    filter: isActive ? ' blur(0px)' : 'blur(1.5px) brightness(0.75)',
                  }}
                  className={`absolute w-[min(88vw,470px)] rounded-2xl p-5 sm:p-6 transition-colors ${
                    isActive
                      ? 'bg-[#0e1525]/90 backdrop-blur-xl border-2 border-gold shadow-[0_0_50px_rgba(234,183,103,0.28)] cursor-grab active:cursor-grabbing'
                      : 'glass-panel border border-gold/25 cursor-pointer hover:border-gold/50'
                  }`}
                >
                  {/* Top Badges inside Card Visual */}
                  <div className="relative mb-4">
                    {project.featured && (
                      <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gradient-to-r from-[#F7D9A0] to-[#EAB767] text-space font-mono text-[10px] font-semibold uppercase tracking-wider shadow-md">
                        <Star className="w-3 h-3 fill-space" />
                        <span>FEATURED</span>
                      </div>
                    )}

                    {/* Live Mode Toggle Pill (Top-Right of Visual) */}
                    {isActive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setLiveModeId(isLive ? null : project.id)
                        }}
                        className={`absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-wider border transition-all ${
                          isLive
                            ? 'bg-gold text-space border-gold font-semibold shadow-gold-glow'
                            : 'bg-space/85 text-gold border-gold/45 hover:bg-gold/15'
                        }`}
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{isLive ? 'Exit Live Mode' : 'Live Mode'}</span>
                      </button>
                    )}

                    {/* Either show Visual Artwork OR Interactive Live Simulator */}
                    {isActive && isLive ? (
                      <InlineLiveSimulator id={project.id} />
                    ) : (
                      <ProjectVisualBanner id={project.id} isActive={isActive} />
                    )}
                  </div>

                  {/* Domain & Title */}
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] tracking-[2px] uppercase text-gold">
                      {project.indexLabel} // {project.domainLabel}
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-semibold text-pure leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-mist leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 my-3.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-obsidian/90 border border-gold/25 text-pure"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Key Metrics Row (Shown on Center Active Card) */}
                  {isActive && (
                    <div className="grid grid-cols-3 gap-2 py-3 mb-4 border-y border-gold/20">
                      {project.stats.map((st, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                            {st.icon === 'db' && <Database className="w-3.5 h-3.5" />}
                            {st.icon === 'target' && <Target className="w-3.5 h-3.5" />}
                            {st.icon === 'zap' && <Zap className="w-3.5 h-3.5" />}
                          </div>
                          <div className="min-w-0">
                            <div className="font-display text-xs sm:text-sm font-semibold text-pure truncate">
                              {st.value}
                            </div>
                            <div className="font-mono text-[9px] text-mist truncate">{st.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (project.id === 'core-morph') {
                          setManualProgress(1)
                          toggleInspect3D()
                        } else {
                          setActiveCaseStudy(project.id)
                        }
                      }}
                      className="btn-gold !py-2 !px-4 !text-xs flex items-center gap-1.5"
                    >
                      <span>{project.id === 'core-morph' ? 'Inspect 3D Core' : 'View Case Study'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-ghost-gold !py-2 !px-4 !text-xs flex items-center gap-1.5"
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
            className="absolute right-1 sm:right-4 z-40 w-11 h-11 rounded-full glass-panel border border-gold/45 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-105 active:scale-95 transition-all shadow-gold-glow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 3. PAGINATION DOTS & TECH STACK DOCK */}
      <div className="space-y-4">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Select project slide">
          {filteredProjects.map((proj, idx) => {
            const active = idx === activeIndex
            return (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to ${proj.title}`}
                aria-selected={active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active ? 'w-7 bg-gold shadow-gold-glow' : 'w-2 bg-gold/25 hover:bg-gold/50'
                }`}
              />
            )
          })}
        </div>

        {/* Bottom Tech Stack Bar */}
        <div className="glass-panel rounded-2xl px-6 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4 border border-gold/25">
          <div className="flex items-center gap-3 pr-4 lg:border-r border-gold/20">
            <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display text-xs font-semibold text-pure">Tech Stack</div>
              <div className="font-mono text-[10px] text-mist">Used Across Projects</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            {TECH_STACK_DOCK.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-1 group cursor-default"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-semibold text-pure border border-gold/25 group-hover:border-gold transition-colors"
                  style={{ backgroundColor: `${tech.color}28` }}
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
