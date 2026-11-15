import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  BrainCircuit,
  Camera,
  FileText,
  Server,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Cpu,
  Terminal,
  ShieldCheck,
  ExternalLink,
  GitBranch,
} from 'lucide-react'
import { useSceneStore } from '../../store/useSceneStore'

interface DomainSpec {
  id: string
  num: string
  shortLabel: string
  title: string
  subtitle: string
  icon: typeof BrainCircuit
  orbitPosition: string
  summary: string
  capabilities: string[]
  stack: string[]
  proofTitle: string
  proofMetric: string
  projectId: 'agrodetect' | 'disaster-nlp' | 'face-attendance'
  liveUrl: string
}

const CORE_CS_AND_TOOLS = [
  'OOP',
  'Data Structures',
  'TCP/IP Networking',
  'Finite Automata',
  'Git & GitHub',
  'VS Code',
  'Jupyter',
]

const ALL_STACK_MATRIX = [
  {
    group: 'Languages & Core CS',
    items: [
      { code: 'Py', name: 'Python', color: '#38BDF8' },
      { code: 'Jv', name: 'Java', color: '#FB923C' },
      { code: 'C++', name: 'C++', color: '#60A5FA' },
      { code: 'SQL', name: 'SQL / SQLite', color: '#34D399' },
      { code: 'CS', name: 'OOP, DSA & TCP/IP', color: '#A78BFA' },
    ],
  },
  {
    group: 'AI, ML, NLP & Vision',
    items: [
      { code: 'TF', name: 'TensorFlow & Keras', color: '#F97316' },
      { code: 'sk', name: 'Scikit-learn', color: '#FBBF24' },
      { code: 'CV', name: 'OpenCV & Face Enc.', color: '#818CF8' },
      { code: 'NLP', name: 'BERTopic, LDA & spaCy', color: '#10B981' },
      { code: 'Vec', name: 'UMAP, HDBSCAN & FAISS', color: '#EAB767' },
    ],
  },
  {
    group: 'Backend, Data & UI',
    items: [
      { code: 'API', name: 'FastAPI & Flask', color: '#2DD4BF' },
      { code: 'St', name: 'Streamlit & Plotly', color: '#FB7185' },
      { code: 'Data', name: 'Pandas & NumPy', color: '#38BDF8' },
      { code: 'GUI', name: 'JavaFX, Tkinter & BS5', color: '#F59E0B' },
    ],
  },
  {
    group: 'Soft Skills & Leadership',
    items: [
      { code: '★', name: 'Leadership', color: '#EAB767' },
      { code: '★', name: 'Problem-Solving', color: '#EAB767' },
      { code: '★', name: 'Communication', color: '#EAB767' },
      { code: '★', name: 'Project Mgmt & Teamwork', color: '#EAB767' },
    ],
  },
]

const DOMAINS: DomainSpec[] = [
  {
    id: 'ai-ml',
    num: '01',
    shortLabel: 'AI / ML',
    title: 'AI & Machine Learning',
    subtitle: 'Deep CNNs, Supervised & Unsupervised Lifecycle',
    icon: BrainCircuit,
    orbitPosition: 'top-1 left-1/2 -translate-x-1/2',
    summary:
      'End-to-end model development, feature engineering, cross-validation, and hyperparameter tuning on real-world datasets.',
    capabilities: [
      'Deep Convolutional Neural Networks (Conv2D, MaxPooling, BatchNormalization, Dropout) achieving 90%+ validation accuracy.',
      'Supervised & unsupervised algorithm comparison, overfitting prevention, and rigorous model evaluation.',
      'Backed by a 3-month applied ML Internship at EduExpose (Best Performance Award).',
    ],
    stack: [
      'TensorFlow',
      'Keras',
      'Scikit-learn',
      'Feature Engineering',
      'Cross-Validation',
      'Hyperparameter Tuning',
      'Model Evaluation',
    ],
    proofTitle: 'Applied in: AgroDetect AI (CNN)',
    proofMetric: '90%+ Validation Accuracy',
    projectId: 'agrodetect',
    liveUrl: 'https://agrodetectai.streamlit.app/',
  },
  {
    id: 'nlp',
    num: '02',
    shortLabel: 'NLP',
    title: 'NLP & Vector Intelligence',
    subtitle: 'Unsupervised Topic Modeling & Semantic Search',
    icon: FileText,
    orbitPosition: 'top-[17%] left-2 sm:left-4',
    summary:
      'Hybrid neural topic discovery, transformer embeddings, manifold dimensionality reduction, and density-based crisis clustering.',
    capabilities: [
      'Hybrid BERTopic + LDA topic discovery over 81,187+ unstructured disaster communications without manual labels.',
      'Dense semantic vector encoding with Sentence-Transformers, spaCy preprocessing, and FAISS similarity indexing.',
      'Noise-resilient manifold reduction and clustering using UMAP and HDBSCAN with real-time urgency triage.',
    ],
    stack: [
      'BERTopic',
      'LDA',
      'Sentence-Transformers',
      'spaCy',
      'UMAP',
      'HDBSCAN',
      'FAISS',
      'Generative AI',
    ],
    proofTitle: 'Applied in: Disaster Intelligence System',
    proofMetric: '81K+ Tweets · 20 Topics',
    projectId: 'disaster-nlp',
    liveUrl: 'https://aegis-command.streamlit.app/',
  },
  {
    id: 'cv',
    num: '03',
    shortLabel: 'Computer Vision',
    title: 'Computer Vision & Biometrics',
    subtitle: 'Real-Time Video Processing & 128-D Face Encoding',
    icon: Camera,
    orbitPosition: 'top-[17%] right-2 sm:right-4',
    summary:
      'Low-latency webcam stream processing, facial landmark localization, 128-D biometric verification, and foliar image pipelines.',
    capabilities: [
      'Real-time multi-face detection and 128-dimensional biometric encoding matching via OpenCV and face_recognition.',
      'Lighting-invariant image thresholding, RGB frame normalization, and automated confidence score logging.',
      'Plant-leaf pathology image augmentation and preprocessing pipelines for agricultural disease detection.',
    ],
    stack: [
      'OpenCV',
      'face_recognition',
      '128-D Biometric Encoding',
      'Image Augmentation',
      'Haar / HOG Landmarks',
      'NumPy',
    ],
    proofTitle: 'Applied in: Face Recognition Attendance',
    proofMetric: 'Real-Time 128-D Matching',
    projectId: 'face-attendance',
    liveUrl: 'https://facerecognitionattendance-9rc8.onrender.com/',
  },
  {
    id: 'programming',
    num: '04',
    shortLabel: 'Programming & CS',
    title: 'Programming & Core CS',
    subtitle: 'Algorithms, OOP, TCP/IP Networking & Automata',
    icon: Code2,
    orbitPosition: 'bottom-[21%] left-1 sm:left-3',
    summary:
      'Strong computer science fundamentals spanning Object-Oriented Programming, Data Structures, TCP/IP Networking, and Automata Theory.',
    capabilities: [
      '4-Course Coursera Specializations in Computer Communications (TCP/IP) and C++ Programming for Unreal (UCCS).',
      'Certified in Computational Theory & Finite Automata (Infosys Springboard) and Java GUI Development (LPU).',
      'Clean, modular, object-oriented architecture across Python, Java, C++, and relational SQL databases.',
    ],
    stack: [
      'Python',
      'Java',
      'C++',
      'SQL',
      'HTML5 & CSS3',
      'OOP & Data Structures',
      'TCP/IP Networking',
      'Finite Automata',
    ],
    proofTitle: '2 UCCS Coursera Specializations',
    proofMetric: '8 Courses + Infosys & LPU',
    projectId: 'face-attendance',
    liveUrl: 'https://coursera.org/verify/specialization/5R8NT46SNG9B',
  },
  {
    id: 'backend',
    num: '05',
    shortLabel: 'Backend & Data',
    title: 'Backend, Data & Analytics',
    subtitle: 'FastAPI, Flask, Streamlit, Plotly & SQLite',
    icon: Server,
    orbitPosition: 'bottom-[21%] right-1 sm:right-3',
    summary:
      'Production ML model serving behind FastAPI and Flask REST endpoints, persistent SQLite ledgers, and interactive Streamlit/Plotly dashboards.',
    capabilities: [
      'Asynchronous FastAPI and Flask microservices serving real-time CNN, OpenCV, and BERTopic inference.',
      'Interactive Streamlit + Plotly visual analytics dashboards backed by Pandas, NumPy, and SQLite.',
      'Cross-platform desktop GUI application development using JavaFX and Python Tkinter.',
    ],
    stack: [
      'FastAPI',
      'Flask',
      'REST APIs',
      'Pandas & NumPy',
      'Streamlit & Plotly',
      'SQLite',
      'JavaFX & Tkinter',
      'Git & GitHub',
    ],
    proofTitle: 'Applied in: 3 Live Cloud Deployments',
    proofMetric: 'FastAPI + Flask + Streamlit',
    projectId: 'agrodetect',
    liveUrl: 'https://agrodetectai.streamlit.app/',
  },
  {
    id: 'soft-skills',
    num: '06',
    shortLabel: 'Soft Skills & Lead',
    title: 'Soft Skills & Engineering Leadership',
    subtitle: 'Interpersonal Communication, Project Management & Teamwork',
    icon: Users,
    orbitPosition: 'bottom-1 left-1/2 -translate-x-1/2',
    summary:
      'Result-oriented engineering leadership, collaborative teamwork, and structured problem-solving certified by Rice University and recognized at EduExpose.',
    capabilities: [
      'Certified in Interpersonal Communication for Engineering Leaders by Rice University (Coursera, Apr 2026).',
      'Awarded the Best Internship Performance Award at EduExpose for sincere, dedicated, and result-oriented execution.',
      'End-to-end project management, creative problem-solving, and clear technical communication across multidisciplinary teams.',
    ],
    stack: [
      'Leadership',
      'Problem-Solving',
      'Communication',
      'Project Management',
      'Creativity',
      'Teamwork',
    ],
    proofTitle: 'Rice University Leadership Certified',
    proofMetric: 'Verify: coursera.org/verify/UJH6O27C31UN',
    projectId: 'disaster-nlp',
    liveUrl: 'https://coursera.org/verify/UJH6O27C31UN',
  },
]

const BOTTOM_PROOF_CARDS = [
  {
    num: '01',
    domainId: 'programming',
    icon: Code2,
    title: 'Programming & Core CS',
    subtitle: 'Languages, OOP, DSA & TCP/IP',
    telemetryLabel: 'SYSTEMS & ALGORITHMS',
    telemetryPct: '95%',
    summary:
      'Algorithmic problem-solving and systems foundations backed by 2 UCCS Specializations & Infosys Automata certification.',
    stack: ['Python', 'Java', 'C++', 'SQL', 'OOP & DSA', 'TCP/IP'],
    metric: '2 Specializations (8 Courses)',
    projectTarget: 'face-attendance' as const,
  },
  {
    num: '02',
    domainId: 'ai-ml',
    icon: BrainCircuit,
    title: 'AI, ML & Vision',
    subtitle: 'Deep CNNs & 128-D Biometrics',
    telemetryLabel: 'MODEL VALIDATION ACCURACY',
    telemetryPct: '92%+',
    summary:
      'Full-lifecycle model training, OpenCV face recognition, and CNN leaf diagnostics achieving 90%+ validation accuracy.',
    stack: ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'face_recognition'],
    metric: '90%+ CNN Accuracy · Best Intern Award',
    projectTarget: 'agrodetect' as const,
  },
  {
    num: '03',
    domainId: 'nlp',
    icon: FileText,
    title: 'NLP, Backend & Data',
    subtitle: 'BERTopic, FastAPI & Streamlit',
    telemetryLabel: 'UNSUPERVISED PIPELINE SCALE',
    telemetryPct: '81.1K',
    summary:
      'Hybrid topic modeling and FAISS vector search deployed behind FastAPI, Flask, SQLite, and Streamlit + Plotly dashboards.',
    stack: ['BERTopic', 'spaCy', 'UMAP', 'HDBSCAN', 'FAISS', 'FastAPI', 'Streamlit'],
    metric: '81,187+ Crisis Tweets Clustered',
    projectTarget: 'disaster-nlp' as const,
  },
  {
    num: '04',
    domainId: 'soft-skills',
    icon: Users,
    title: 'Soft Skills & Leadership',
    subtitle: 'Communication & Project Mgmt',
    telemetryLabel: 'ENGINEERING LEADERSHIP',
    telemetryPct: '100%',
    summary:
      'Engineering leadership, collaborative teamwork, and structured problem-solving certified by Rice University & EduExpose.',
    stack: [
      'Leadership',
      'Problem-Solving',
      'Communication',
      'Project Mgmt',
      'Creativity',
      'Teamwork',
    ],
    metric: 'Rice Univ. Leadership + Best Award',
    projectTarget: 'disaster-nlp' as const,
  },
]

export default function ExpertiseView() {
  const { setActiveCaseStudy } = useSceneStore()
  const [activeDomainId, setActiveDomainId] = useState<string>('ai-ml')
  const [rightPanelMode, setRightPanelMode] = useState<'inspector' | 'matrix'>('inspector')
  const [direction, setDirection] = useState<1 | -1>(1)
  const wheelCooldownRef = useRef<number>(0)

  const activeIndex = Math.max(
    0,
    DOMAINS.findIndex((d) => d.id === activeDomainId)
  )
  const activeDomain = DOMAINS[activeIndex] || DOMAINS[0]

  const selectDomain = useCallback(
    (id: string) => {
      const nextIdx = DOMAINS.findIndex((d) => d.id === id)
      if (nextIdx === -1) return
      if (id !== activeDomainId) {
        setDirection(nextIdx > activeIndex ? 1 : -1)
        setActiveDomainId(id)
      }
      setRightPanelMode('inspector')
    },
    [activeDomainId, activeIndex]
  )

  useEffect(() => {
    const stepDomain = (delta: 1 | -1) => {
      const now = Date.now()
      if (now - wheelCooldownRef.current < 480) return
      wheelCooldownRef.current = now
      setDirection(delta)
      setRightPanelMode('inspector')
      setActiveDomainId((curr) => {
        const idx = DOMAINS.findIndex((d) => d.id === curr)
        const next = (idx + delta + DOMAINS.length) % DOMAINS.length
        return DOMAINS[next].id
      })
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return
      stepDomain(e.deltaY > 0 ? 1 : -1)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        stepDomain(1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        stepDomain(-1)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="h-screen max-w-[1380px] mx-auto px-5 sm:px-10 pt-[76px] pb-5 flex flex-col justify-between overflow-hidden pointer-events-none select-none">
      {/* ============================================================
          TOP SECTION: LEFT TELEMETRY + 3D BRAIN WITH ORBIT RINGS + RIGHT PANEL
         ============================================================ */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* ----------------------------------------------------------
            1. LEFT COLUMN (3 Cols): HEADER, METRICS & CORE CS / TOOLS
           ---------------------------------------------------------- */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-3 pointer-events-auto pb-2">
          <div className="space-y-1">
            {/* <div className="font-mono text-[10px] uppercase tracking-[2px] text-gold">
              04 // TECHNICAL &amp; PROFESSIONAL
            </div> */}
            <h1 className="font-display text-3xl sm:text-[38px] font-bold text-pure tracking-tight leading-[1.06]">
              Technical <br />
              <span className="text-gold">Capabilities</span>
            </h1>
          </div>

          {/* 3 Compact Telemetry Counters */}
          <div className="space-y-2 pt-1">
            {[
              {
                icon: Cpu,
                val: '20+ Tech Stack',
                sub: 'Python, Java, C++, TF, Keras, OpenCV, FAISS',
              },
              {
                icon: Terminal,
                val: '3 Live Systems',
                sub: 'FastAPI, Flask & Streamlit Cloud Apps',
              },
              {
                icon: ShieldCheck,
                val: '12 Verified Certs',
                sub: 'Best ML Intern Award + 2 Specializations',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-2 rounded-xl bg-[#0b111e]/85 border border-gold/20 flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-xs font-bold text-pure leading-none">
                    {item.val}
                  </div>
                  <div className="font-sans text-[9.5px] text-mist truncate mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core CS & Dev Tools Strip (Compact so it never touches the bottom row) */}
          <div
            onClick={() => selectDomain('programming')}
            className="p-2.5 rounded-2xl bg-[#0b111e]/90 border border-gold/25 hover:border-gold/55 transition-all cursor-pointer space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-gold font-bold">
                <GitBranch className="w-3 h-3" />
                <span>Core CS &amp; Dev Workflow</span>
              </div>
              <span className="font-mono text-[8px] text-gold bg-gold/10 border border-gold/30 px-1.5 py-0.5 rounded">
                UCCS &amp; Infosys
              </span>
            </div>

            <div className="flex flex-wrap gap-1">
              {CORE_CS_AND_TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-md bg-space/90 border border-gold/25 font-mono text-[8.5px] text-pure/90"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------
            2. CENTER COLUMN (5 Cols): 3D BRAIN + GOLDEN ORBITAL HUD RINGS
           ---------------------------------------------------------- */}
        <div
          id="brain-stage-anchor"
          className="lg:col-span-5 relative h-[350px] sm:h-[385px] flex items-center justify-center pointer-events-auto"
        >
          {/* Decorative Golden Orbital Rings & Neural HUD Reticle Behind/Around the Brain */}
          <svg
            viewBox="0 0 500 380"
            className="absolute inset-0 w-full h-full pointer-events-none opacity-65"
            fill="none"
          >
            {/* Outer Tilted Orbital Ellipse Connecting the 6 Pills */}
            <ellipse
              cx="250"
              cy="190"
              rx="215"
              ry="142"
              stroke="#EAB767"
              strokeWidth="1"
              strokeDasharray="5 7"
              strokeOpacity="0.45"
            />
            {/* Inner Tilted Orbital Track */}
            <ellipse
              cx="250"
              cy="190"
              rx="172"
              ry="108"
              stroke="#EAB767"
              strokeWidth="1"
              strokeOpacity="0.22"
              transform="rotate(-8 250 190)"
            />
            {/* Base Pedestal Ring Under the Brainstem (Like image_0fead9.jpg!) */}
            <ellipse
              cx="250"
              cy="325"
              rx="115"
              ry="18"
              stroke="#EAB767"
              strokeWidth="1.2"
              strokeDasharray="3 5"
              strokeOpacity="0.5"
            />
            <ellipse
              cx="250"
              cy="325"
              rx="68"
              ry="10"
              stroke="#F7D9A0"
              strokeWidth="1"
              strokeOpacity="0.35"
            />
            {/* Glowing Orbital Waypoint Dots */}
            <circle cx="42" cy="145" r="3" fill="#EAB767" fillOpacity="0.8" />
            <circle cx="458" cy="145" r="3" fill="#EAB767" fillOpacity="0.8" />
            <circle cx="65" cy="260" r="2.5" fill="#F7D9A0" fillOpacity="0.7" />
            <circle cx="435" cy="260" r="2.5" fill="#F7D9A0" fillOpacity="0.7" />
          </svg>

          {/* 6 Interactive Orbital Domain Pills */}
          {DOMAINS.map((dom) => {
            const isSelected = dom.id === activeDomain.id
            const IconComp = dom.icon
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => selectDomain(dom.id)}
                className={`absolute ${dom.orbitPosition} z-20 px-3.5 py-1.5 rounded-full font-mono text-[10px] border backdrop-blur-md flex items-center gap-1.5 transition-all duration-300 ${isSelected
                  ? 'bg-gold text-[#070b13] border-gold font-bold shadow-[0_0_25px_rgba(234,183,103,0.65)] scale-105'
                  : 'bg-[#090d16]/90 text-pure/90 border-gold/35 hover:border-gold hover:text-gold shadow-lg'
                  }`}
              >
                <IconComp className="w-3.5 h-3.5 shrink-0" />
                <span>{dom.shortLabel}</span>
              </button>
            )
          })}
        </div>

        {/* ----------------------------------------------------------
            3. RIGHT COLUMN (4 Cols): DUAL-MODE INSPECTOR + FULL STACK MATRIX
           ---------------------------------------------------------- */}
        <div className="lg:col-span-4 h-[385px] pointer-events-auto">
          <div className="h-full glass-panel rounded-2xl p-4 sm:p-5 border border-gold/35 bg-[#0b111e]/90 shadow-[0_20px_60px_rgba(0,0,0,0.75)] flex flex-col justify-between overflow-hidden">
            {/* Top Bar with Mode Toggle: Deep Inspector vs. All Stack Matrix */}
            <div className="flex items-center justify-between border-b border-gold/20 pb-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-gold font-semibold">
                  {rightPanelMode === 'inspector'
                    ? `INSPECTOR // ${activeDomain.num} OF 06`
                    : 'COMPLETE TECH & SKILL MATRIX'}
                </span>
              </div>

              <div className="inline-flex rounded-lg bg-space/90 p-0.5 border border-gold/25">
                <button
                  type="button"
                  onClick={() => setRightPanelMode('inspector')}
                  className={`px-2 py-0.5 rounded-md font-mono text-[9px] transition-all ${rightPanelMode === 'inspector'
                    ? 'bg-gold text-space font-bold'
                    : 'text-mist hover:text-pure'
                    }`}
                >
                  Inspector
                </button>
                <button
                  type="button"
                  onClick={() => setRightPanelMode('matrix')}
                  className={`px-2 py-0.5 rounded-md font-mono text-[9px] transition-all ${rightPanelMode === 'matrix'
                    ? 'bg-gold text-space font-bold'
                    : 'text-mist hover:text-pure'
                    }`}
                >
                  All Stack (24)
                </button>
              </div>
            </div>

            {/* Body: Either Deep Domain Inspector OR Full At-a-Glance Tech Matrix */}
            <div className="flex-1 min-h-0 relative overflow-hidden py-2">
              <AnimatePresence mode="wait" custom={direction}>
                {rightPanelMode === 'inspector' ? (
                  <motion.div
                    key={`inspector-${activeDomain.id}`}
                    initial={{ opacity: 0, y: direction > 0 ? 22 : -22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: direction > 0 ? -22 : 22 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] text-gold uppercase">
                        {activeDomain.subtitle}
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-pure leading-tight">
                        {activeDomain.title}
                      </h2>
                    </div>

                    <ul className="space-y-2 text-[11.5px] text-pure/90 leading-snug">
                      {activeDomain.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-1.5 pt-1">
                      <div className="font-mono text-[9.5px] uppercase tracking-wider text-mist">
                        {activeDomain.id === 'soft-skills'
                          ? 'Core Interpersonal & Leadership Competencies:'
                          : 'Verified Domain Stack:'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDomain.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-space/90 border border-gold/30 font-mono text-[10px] text-gold font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="full-matrix"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.24 }}
                    className="h-full flex flex-col justify-between space-y-2 overflow-y-auto pr-1"
                  >
                    {ALL_STACK_MATRIX.map((grp) => (
                      <div
                        key={grp.group}
                        className="p-2 rounded-xl bg-space/75 border border-gold/20 space-y-1.5"
                      >
                        <div className="font-mono text-[9px] uppercase tracking-wider text-gold font-semibold">
                          {grp.group}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {grp.items.map((it) => (
                            <span
                              key={it.name}
                              className="px-2 py-0.5 rounded bg-[#0b111e] border border-white/10 font-mono text-[9.5px] text-pure flex items-center gap-1.5"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: it.color }}
                              />
                              <span>{it.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Proof Link */}
            <div className="pt-2.5 border-t border-gold/20 flex items-center justify-between gap-2 shrink-0">
              <div className="min-w-0">
                <div className="font-mono text-[9.5px] text-gold truncate font-semibold">
                  {activeDomain.proofTitle}
                </div>
                <div className="font-sans text-[10px] text-mist truncate">
                  {activeDomain.proofMetric}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(activeDomain.projectId)}
                  className="px-3 py-1.5 rounded-xl bg-gold/15 hover:bg-gold hover:text-space border border-gold/45 font-mono text-[10px] font-semibold text-gold flex items-center gap-1 transition-colors"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
                <a
                  href={activeDomain.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-xl bg-obsidian border border-gold/25 hover:border-gold text-gold transition-colors"
                  title="Verify Live Proof"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          BOTTOM SECTION: 4 PILLAR CARDS WITH ICON BADGES & TELEMETRY BARS
         ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-1 pointer-events-auto shrink-0">
        {BOTTOM_PROOF_CARDS.map((card) => {
          const isSelected = activeDomainId === card.domainId
          const CardIcon = card.icon
          return (
            <div
              key={card.domainId}
              onClick={() => selectDomain(card.domainId)}
              className={`glass-panel rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-300 ${isSelected
                ? 'border-2 border-gold bg-[#111a2e]/95 shadow-[0_12px_35px_rgba(234,183,103,0.2)]'
                : 'border border-gold/20 bg-[#0b111e]/85 hover:border-gold/50'
                }`}
            >
              <div className="space-y-2">
                {/* Card Header with Icon Badge + Inspect Button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${isSelected
                        ? 'bg-gold text-space border-gold shadow-gold-glow'
                        : 'bg-gold/10 text-gold border-gold/30'
                        }`}
                    >
                      <CardIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[9.5px] text-gold font-bold truncate">
                        {card.num} // {card.subtitle}
                      </div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-pure truncate">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveCaseStudy(card.projectTarget)
                    }}
                    className="font-mono text-[9.5px] text-mist hover:text-gold flex items-center gap-0.5 shrink-0"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-[11px] text-mist leading-relaxed line-clamp-2">
                  {card.summary}
                </p>

                {/* Visual Architecture Telemetry Bar (Gives Visual Punch Without Clutter) */}
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between font-mono text-[8.5px]">
                    <span className="text-mist uppercase">{card.telemetryLabel}</span>
                    <span className="text-gold font-bold">{card.telemetryPct}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-space/90 overflow-hidden border border-gold/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C5A46D] via-[#EAB767] to-[#F7D9A0]"
                      style={{ width: card.telemetryPct.includes('%') ? card.telemetryPct.replace('+', '') : '92%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2.5 mt-2 border-t border-gold/15">
                <div className="flex flex-wrap gap-1">
                  {card.stack.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-space/90 border border-gold/25 font-mono text-[9px] text-pure/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-gold pt-0.5">
                  <span className="truncate">★ {card.metric}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}