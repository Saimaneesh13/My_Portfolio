import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Layers,
  Trophy,
  Award,
  Maximize2,
  Minimize2,
  GraduationCap,
  BarChart2,
  Briefcase,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { useSceneStore } from '../../store/useSceneStore'
import {
  CERTIFICATES,
  INTERNSHIP_DATA,
  PROFILE_DATA,
} from '../../lib/portfolio-data'

type AboutLeftTab = 'overview' | 'internship' | 'certificates'

const TAB_ORDER: AboutLeftTab[] = ['overview', 'internship', 'certificates']

const VERTICAL_NAV_ITEMS: {
  id: AboutLeftTab
  num: string
  shortLabel: string
  fullTitle: string
  icon: typeof GraduationCap
}[] = [
    {
      id: 'overview',
      num: '01',
      shortLabel: 'Overview',
      fullTitle: '01 // Overview & Education',
      icon: GraduationCap,
    },
    {
      id: 'internship',
      num: '02',
      shortLabel: 'Internship',
      fullTitle: '02 // ML Internship (EduExpose)',
      icon: Briefcase,
    },
    {
      id: 'certificates',
      num: '03',
      shortLabel: 'Vault (9)',
      fullTitle: '03 // Certifications Vault (9)',
      icon: ShieldCheck,
    },
  ]

const TECH_PILLS = [
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: 'C++', icon: '⚙️' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'TensorFlow', icon: '🔶' },
  { name: 'Keras', icon: '🅺' },
  { name: 'Scikit-learn', icon: '🔬' },
  { name: 'OpenCV', icon: '👁️' },
  { name: 'BERTopic', icon: '📊' },
  { name: 'spaCy & FAISS', icon: '🧠' },
  { name: 'FastAPI & Flask', icon: '⚡' },
  { name: 'Streamlit & Plotly', icon: '👑' },
]

// Directional vertical fade-up / fade-down variants
const verticalFadeVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 32 : -32,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -32 : 32,
    filter: 'blur(4px)',
  }),
}

export default function AboutView() {
  const { isCvPaperOpen, setCvPaperOpen } = useSceneStore()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [[leftTab, direction], setTabState] = useState<[AboutLeftTab, number]>(['overview', 1])
  const [certFilter, setCertFilter] = useState<string>('All')
  const wheelCooldownRef = useRef<number>(0)

  const switchTab = (nextTab: AboutLeftTab) => {
    if (nextTab === leftTab) return
    const currIdx = TAB_ORDER.indexOf(leftTab)
    const nextIdx = TAB_ORDER.indexOf(nextTab)
    const dir = nextIdx > currIdx ? 1 : -1
    setTabState([nextTab, dir])
  }

  // Optional smooth mouse-wheel switching on the left column (unless scrolling inside the certificates list)
  const handleLeftWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.cert-scroll-box')) return
    const now = Date.now()
    if (now - wheelCooldownRef.current < 480) return
    const currIdx = TAB_ORDER.indexOf(leftTab)
    if (e.deltaY > 25 && currIdx < TAB_ORDER.length - 1) {
      wheelCooldownRef.current = now
      switchTab(TAB_ORDER[currIdx + 1])
    } else if (e.deltaY < -25 && currIdx > 0) {
      wheelCooldownRef.current = now
      switchTab(TAB_ORDER[currIdx - 1])
    }
  }

  const filteredCerts =
    certFilter === 'All'
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === certFilter)

  return (
    <div className="h-screen max-w-[1380px] mx-auto px-4 sm:px-8 pt-20 pb-10 flex items-center overflow-hidden pointer-events-none select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ============================================================
            LEFT COLUMN: FAR-LEFT VERTICAL RAIL + FADE UP/DOWN CONTENT
           ============================================================ */}
        <div
          onWheel={handleLeftWheel}
          className="lg:col-span-6 flex items-stretch gap-4 sm:gap-5 pointer-events-auto"
        >
          {/* 1. VERTICAL SIDE RAIL FOR 01 / 02 / 03 BUTTONS */}
          <div className="flex flex-col items-center justify-center gap-3 py-2 shrink-0">
            <div className="w-[1px] h-6 bg-gradient-to-b from-transparent to-gold/35" />

            {VERTICAL_NAV_ITEMS.map((item) => {
              const active = leftTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => switchTab(item.id)}
                  title={item.fullTitle}
                  className={`relative group w-14 py-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 ${active
                    ? 'bg-gold/20 border-gold text-gold shadow-[0_0_25px_rgba(234,183,103,0.3)] scale-105'
                    : 'bg-obsidian/75 border-gold/20 text-mist hover:text-pure hover:border-gold/50'
                    }`}
                >
                  {/* Active Left Gold Bar Indicator */}
                  {active && (
                    <motion.span
                      layoutId="about-vertical-active-pill"
                      className="absolute -left-[2px] top-3 bottom-3 w-1 rounded-r-full bg-gold shadow-[0_0_10px_#EAB767]"
                    />
                  )}

                  <span className="font-mono text-xs font-bold leading-none">
                    {item.num}
                  </span>
                  <item.icon className="w-3.5 h-3.5 opacity-90" />
                  <span className="font-mono text-[8.5px] uppercase tracking-wider leading-none mt-0.5">
                    {item.shortLabel}
                  </span>
                </button>
              )
            })}

            <div className="w-[1px] h-6 bg-gradient-to-t from-transparent to-gold/35" />
          </div>

          {/* 2. MAIN LEFT CONTENT AREA (Static Header + Fade Up/Down Dynamic Viewport) */}
          <div className="flex-1 min-w-0 flex flex-col justify-between space-y-4">
            {/* Top Identity Header */}
            <div className="space-y-1">
              <div className="font-mono text-[10.5px] uppercase tracking-[2px] text-gold">
                05 // ABOUT, EXPERIENCE &amp; CREDENTIALS
              </div>
              <h1 className="font-display text-3xl sm:text-[42px] font-bold tracking-tight text-pure leading-[1.06]">
                {PROFILE_DATA.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="font-display text-base sm:text-lg font-semibold text-gold">
                  {PROFILE_DATA.role}
                </span>
                <span className="text-gold/50">•</span>
                <span className="font-sans text-xs font-medium text-pure/90">
                  {PROFILE_DATA.subRoles.join(' • ')}
                </span>
              </div>
              <p className="text-xs text-mist leading-relaxed pt-1 max-w-xl">
                {PROFILE_DATA.bio}
              </p>
            </div>

            {/* 4 Clickable Counter Metrics */}
            <div className="grid grid-cols-4 gap-2.5 py-1.5 border-y border-gold/15">
              {[
                { icon: Code2, val: '3', label: 'Flagship Projects', tab: 'overview' as const },
                { icon: Layers, val: '18+', label: 'Technologies', tab: 'overview' as const },
                { icon: Trophy, val: '1', label: 'Best Intern Award', tab: 'internship' as const },
                { icon: Award, val: '9', label: 'Certificates (2 Spec.)', tab: 'certificates' as const },
              ].map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => switchTab(item.tab)}
                  className="flex items-center gap-2 text-left group hover:bg-gold/5 p-1 rounded-lg transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-display text-base sm:text-lg font-bold text-pure leading-none group-hover:text-gold transition-colors">
                      {item.val}
                    </div>
                    <div className="font-sans text-[10px] text-mist mt-0.5">{item.label}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* FADE UP / FADE DOWN STAGE (335px Tall Clean Viewport) */}
            <div className="relative h-[335px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                {leftTab === 'overview' && (
                  <motion.div
                    key="tab-overview"
                    custom={direction}
                    variants={verticalFadeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full flex flex-col justify-between space-y-3"
                  >
                    {/* Technical Expertise Pills */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 font-display text-xs sm:text-sm font-semibold text-pure">
                        <span className="text-gold font-mono">&lt;/&gt;</span>
                        <span>Core Stack &amp; Frameworks</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {TECH_PILLS.map((t) => (
                          <div
                            key={t.name}
                            className="px-2.5 py-1 rounded-lg bg-[#111827]/90 border border-gold/20 flex items-center gap-1.5 text-[11px] font-medium text-pure"
                          >
                            <span>{t.icon}</span>
                            <span>{t.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Split: Education & Career Journey | Verified Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-1">
                      <div className="sm:col-span-6 space-y-2">
                        <div className="flex items-center gap-2 font-display text-xs sm:text-sm font-semibold text-pure">
                          <BarChart2 className="w-3.5 h-3.5 text-gold" />
                          <span>Education &amp; Career Journey</span>
                        </div>

                        <div className="relative pl-3.5 border-l border-gold/45 space-y-2.5">
                          {[
                            {
                              year: 'Apr 2021 – Mar 2023',
                              title: 'Narayana Junior College (PCM)',
                              sub: 'Intermediate • Bhimavaram, AP',
                            },
                            {
                              year: 'Aug 2023 – Present',
                              title: 'B.Tech CSE (AI & ML)',
                              sub: 'Lovely Professional University, Punjab',
                            },
                            {
                              year: 'Dec 2025 – Feb 2026',
                              title: 'ML Intern @ EduExpose',
                              sub: '★ Best Internship Performance Award',
                            },
                            {
                              year: 'Jan 2026 – May 2026',
                              title: '3 End-to-End AI/ML Systems',
                              sub: 'AgroDetect, Face CV & Disaster NLP',
                            },
                          ].map((step, i) => (
                            <div key={i} className="relative text-[11px]">
                              <span className="absolute -left-[18px] top-1 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#EAB767]" />
                              <div className="font-mono text-[9.5px] font-bold text-gold leading-none">
                                {step.year}
                              </div>
                              <div className="text-pure/95 font-medium leading-tight mt-0.5">
                                {step.title}
                              </div>
                              <div className="text-[10px] text-mist leading-tight">{step.sub}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="sm:col-span-6 sm:pl-5 sm:border-l border-gold/15 space-y-2.5">
                        <div className="flex items-center gap-2 font-display text-xs sm:text-sm font-semibold text-pure">
                          <Trophy className="w-3.5 h-3.5 text-gold" />
                          <span>Verified Highlights</span>
                        </div>

                        <div className="space-y-2.5 text-[11px]">
                          <div
                            onClick={() => switchTab('internship')}
                            className="flex items-start gap-2.5 cursor-pointer group"
                          >
                            <Award className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-pure group-hover:text-gold transition-colors">
                                Best Performance Award
                              </div>
                              <div className="text-[10px] text-mist">
                                3-Month ML Internship at EduExpose →
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={() => switchTab('certificates')}
                            className="flex items-start gap-2.5 cursor-pointer group"
                          >
                            <Layers className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-pure group-hover:text-gold transition-colors">
                                2 Coursera Specializations (8 Courses)
                              </div>
                              <div className="text-[10px] text-mist">
                                Computer Comms &amp; C++ Unreal – UCCS →
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={() => switchTab('certificates')}
                            className="flex items-start gap-2.5 cursor-pointer group"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-pure group-hover:text-gold transition-colors">
                                9 Verified Industry Certificates
                              </div>
                              <div className="text-[10px] text-mist">
                                Rice Univ, Infosys, LPU Java GUI &amp; Udemy GenAI →
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <GraduationCap className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-pure">
                                B.Tech CSE (AI &amp; ML) • LPU
                              </div>
                              <div className="text-[10px] text-mist">
                                Punjab, India (Aug 2023 – Present)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {leftTab === 'internship' && (
                  <motion.div
                    key="tab-internship"
                    custom={direction}
                    variants={verticalFadeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-panel rounded-2xl p-5 border border-gold/40 h-full flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gold" />
                          <h3 className="font-display text-base sm:text-lg font-bold text-pure">
                            {INTERNSHIP_DATA.role} — {INTERNSHIP_DATA.company}
                          </h3>
                        </div>
                        <span className="px-3 py-0.5 rounded-full bg-gold/15 border border-gold/40 font-mono text-[10px] text-gold">
                          {INTERNSHIP_DATA.period}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold/20 border border-gold/50 text-xs font-semibold text-gold">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>Recipient: {INTERNSHIP_DATA.award}</span>
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-xs text-pure/90 leading-relaxed pl-1">
                      {INTERNSHIP_DATA.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-gold font-mono font-bold mt-0.5">0{i + 1}.</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2.5 border-t border-gold/20 flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[9.5px] text-gold uppercase mr-1">
                        Applied ML Stack:
                      </span>
                      {INTERNSHIP_DATA.skillsUsed.map((sk) => (
                        <span
                          key={sk}
                          className="px-2.5 py-0.5 rounded bg-obsidian border border-gold/25 font-mono text-[9.5px] text-mist"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {leftTab === 'certificates' && (
                  <motion.div
                    key="tab-certificates"
                    custom={direction}
                    variants={verticalFadeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-panel rounded-2xl p-4 border border-gold/35 h-full flex flex-col justify-between space-y-2.5"
                  >
                    {/* Category Filter Pills */}
                    <div className="flex items-center justify-between gap-2 border-b border-gold/20 pb-2">
                      <div className="flex flex-wrap gap-1">
                        {['All', 'Specialization', 'AI & GenAI', 'Software & CS', 'Leadership'].map(
                          (cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setCertFilter(cat)}
                              className={`px-2.5 py-0.5 rounded-lg font-mono text-[9.5px] transition-all ${certFilter === cat
                                ? 'bg-gold text-space font-bold'
                                : 'bg-obsidian/80 text-mist hover:text-pure border border-gold/20'
                                }`}
                            >
                              {cat}
                            </button>
                          )
                        )}
                      </div>
                      <span className="font-mono text-[9.5px] text-gold shrink-0">
                        {filteredCerts.length} Verified
                      </span>
                    </div>

                    {/* Scrollable 9-Certificate Vault */}
                    <div className="cert-scroll-box overflow-y-auto space-y-2 pr-1 flex-1">
                      {filteredCerts.map((cert) => (
                        <div
                          key={cert.id}
                          className="p-2.5 rounded-xl bg-obsidian/85 border border-gold/25 hover:border-gold/60 transition-all flex flex-col justify-between gap-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded bg-gold/15 border border-gold/35 font-mono text-[8.5px] text-gold">
                                  {cert.badgeText}
                                </span>
                                <span className="font-mono text-[9px] text-mist">{cert.date}</span>
                              </div>
                              <h4 className="font-display text-xs font-bold text-pure mt-1 leading-snug">
                                {cert.title}
                              </h4>
                              <div className="text-[10px] text-mist">{cert.issuer}</div>
                            </div>

                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-gold/15 hover:bg-gold hover:text-space border border-gold/40 font-mono text-[9px] text-gold flex items-center gap-1 shrink-0 transition-colors"
                            >
                              <span>Verify</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>

                          {cert.subCourses && (
                            <div className="pl-2 border-l border-gold/30 text-[9.5px] text-mist/90 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5 mt-0.5">
                              {cert.subCourses.map((sc, idx) => (
                                <div key={idx} className="truncate">
                                  • {sc}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="font-mono text-[8.5px] text-mist/70">
                            Credential ID: {cert.credentialId}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: LOCKED 1:1 STAGE FOR 3D CV & WHITE CV SHEET
           ============================================================ */}
        <div className="lg:col-span-6 flex items-center justify-center relative h-[560px] pointer-events-auto">
          <div id="cv-stage-anchor" className="relative w-full max-w-[545px] h-[550px]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (!isCvPaperOpen) {
                  setCvPaperOpen(true)
                } else {
                  setIsFullscreen((prev) => !prev)
                }
              }}
              className="absolute -top-7 right-0 z-30 p-1.5 rounded-lg text-mist hover:text-gold transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {!isCvPaperOpen ? (
                <motion.div
                  key="cv-hologram-trigger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  onClick={() => setCvPaperOpen(true)}
                  className="absolute inset-0 cursor-pointer flex items-end justify-center pb-2 group"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-gold/85 group-hover:text-gold transition-opacity bg-space/85 px-4 py-1.5 rounded-full border border-gold/35 shadow-gold-glow">
                    [ Click 3D CV to Reveal Official Document ]
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="cv-white-sheet"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  onClick={() => {
                    if (!isFullscreen) setCvPaperOpen(false)
                  }}
                  className={`${isFullscreen
                    ? 'fixed inset-6 z-50 max-w-3xl mx-auto overflow-y-auto p-8'
                    : 'absolute inset-0 px-5 py-4 cursor-pointer'
                    } bg-white text-[#111827] rounded-[4px] shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(234,183,103,0.18)] flex flex-col justify-between overflow-hidden`}
                >
                  {/* Top Header */}
                  <div>
                    <h2 className="font-sans text-[17.5px] font-bold text-[#1e3a8a] leading-tight">
                      Gorrela Sai Maneesh
                    </h2>
                    <div className="flex items-start justify-between mt-0.5 text-[8.8px] leading-[1.3] text-gray-800">
                      <div>
                        <div>
                          <strong className="font-semibold">LinkedIn:</strong> linkedin.com/in/sai-maneesh
                        </div>
                        <div>
                          <strong className="font-semibold">GitHub:</strong> github.com/Saimaneesh13
                        </div>
                      </div>
                      <div className="text-right">
                        <div>
                          <strong className="font-semibold">Email:</strong> ssai68352@gmail.com
                        </div>
                        <div>
                          <strong className="font-semibold">Mobile:</strong> +91 6281433838
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 1. SKILLS */}
                  <div>
                    <div className="font-sans text-[9.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-0.5">
                      SKILLS
                    </div>
                    <div className="grid grid-cols-12 gap-y-0.5 text-[8.3px] leading-[1.24]">
                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Languages:</div>
                      <div className="col-span-8 text-gray-800">Python, Java, C++, SQL, HTML5, CSS3</div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Backend &amp; Frameworks:</div>
                      <div className="col-span-8 text-gray-800">Flask, FastAPI, REST APIs, Tkinter, JavaFX, Bootstrap 5</div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">AI &amp; Machine Learning:</div>
                      <div className="col-span-8 text-gray-800">
                        Scikit-learn, TensorFlow, Keras, OpenCV, NLP, BERTopic, LDA, UMAP, HDBSCAN, spaCy, FAISS
                      </div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Data &amp; Visualization:</div>
                      <div className="col-span-8 text-gray-800">Pandas, NumPy, Streamlit, Plotly, SQLite</div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Tools &amp; Platforms:</div>
                      <div className="col-span-8 text-gray-800">Git, GitHub, VS Code, Jupyter</div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Core CS:</div>
                      <div className="col-span-8 text-gray-800">
                        OOP, Data Structures, Computer Networking (TCP/IP), Data Preprocessing, Model Evaluation
                      </div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Soft Skills:</div>
                      <div className="col-span-8 text-gray-800">
                        Leadership, Problem-Solving, Communication, Project Management, Creativity, Team work
                      </div>
                    </div>
                  </div>

                  {/* 2. INTERNSHIP */}
                  <div>
                    <div className="font-sans text-[9.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-0.5">
                      INTERNSHIP
                    </div>
                    <div className="flex items-center justify-between text-[8.6px] font-bold text-gray-900">
                      <span>EduExpose | Machine Learning Intern</span>
                      <span className="text-[8.2px] font-semibold text-gray-800">Dec 2025 – Feb 2026</span>
                    </div>
                    <ul className="list-disc list-inside text-[8.1px] text-gray-800 leading-[1.24] space-y-0.5 mt-0.5">
                      <li>Completed a 3-month applied ML internship covering the full model lifecycle: development, evaluation, and optimization on real-world datasets.</li>
                      <li>Implemented and compared supervised and unsupervised algorithms for predictive modeling and pattern discovery tasks.</li>
                      <li>Practiced feature engineering, cross-validation, and hyperparameter tuning to improve model performance using Python and standard ML frameworks.</li>
                    </ul>
                  </div>

                  {/* 3. PROJECTS */}
                  <div>
                    <div className="font-sans text-[9.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-0.5">
                      PROJECTS
                    </div>
                    <div className="space-y-0.5 text-[8.2px] leading-[1.24] text-gray-900">
                      <div>
                        <div className="flex justify-between gap-2">
                          <span className="truncate">
                            <strong>• AI-Based Disaster Intelligence System:</strong> Unsupervised NLP &amp; Urgency | GitHub
                          </span>
                          <span className="font-semibold text-gray-800 shrink-0">Apr 2026 – May 2026</span>
                        </div>
                        <div className="text-[7.8px] text-gray-600 pl-2 truncate">
                          Stack: Python, BERTopic, LDA, spaCy, Sentence-Transformers, UMAP, HDBSCAN, FAISS, Streamlit, FastAPI, Plotly
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between gap-2">
                          <span className="truncate">
                            <strong>• Face Recognition Attendance System:</strong> Real-Time CV Automation | GitHub
                          </span>
                          <span className="font-semibold text-gray-800 shrink-0">Feb 2026 – Mar 2026</span>
                        </div>
                        <div className="text-[7.8px] text-gray-600 pl-2 truncate">
                          Stack: Python, Flask, OpenCV, face_recognition, NumPy, SQLite, Bootstrap 5
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between gap-2">
                          <span className="truncate">
                            <strong>• AgroDetect AI:</strong> CNN-Based Crop Disease Detection (90%+ Acc.) | GitHub
                          </span>
                          <span className="font-semibold text-gray-800 shrink-0">Jan 2026 – Feb 2026</span>
                        </div>
                        <div className="text-[7.8px] text-gray-600 pl-2 truncate">
                          Stack: Python, TensorFlow, Keras, Scikit-learn, OpenCV, FastAPI, Streamlit, Pandas, NumPy
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. ACHIEVEMENTS */}
                  <div>
                    <div className="font-sans text-[9.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-0.5">
                      ACHIEVEMENTS
                    </div>
                    <ul className="list-disc list-inside text-[8.1px] text-gray-800 leading-[1.24] space-y-0.5">
                      <li>Received the Best Award for outstanding, result-oriented performance during the ML internship at EduExpose.</li>
                      <li>Completed 2 Coursera Specializations (8 courses total) from the University of Colorado, Colorado Springs.</li>
                      <li>Designed, built, and publicly maintain 3 end-to-end AI/ML and computer-vision projects on GitHub.</li>
                    </ul>
                  </div>

                  {/* 5. CERTIFICATIONS */}
                  <div>
                    <div className="font-sans text-[9.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-0.5">
                      CERTIFICATIONS &amp; SPECIALIZATIONS (9 VERIFIED)
                    </div>
                    <div className="space-y-0.5 text-[8px] leading-[1.22] text-gray-800">
                      <div className="flex justify-between gap-2">
                        <span className="truncate">• Computer Communications (4-Course Specialization) – Univ. of Colorado (Coursera)</span>
                        <span className="font-semibold text-gray-900 shrink-0">Nov 2024</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="truncate">• C++ Programming for Unreal Game Development (4-Course Spec.) – Univ. of Colorado</span>
                        <span className="font-semibold text-gray-900 shrink-0">Aug 2026</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="truncate">• Interpersonal Communication for Engineering Leaders – Rice University (Coursera)</span>
                        <span className="font-semibold text-gray-900 shrink-0">Apr 2026</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="truncate">• Computational Theory &amp; Finite Automata – Infosys | Java Maestro GUI – LPU | 3 GenAI Certs – Udemy</span>
                        <span className="font-semibold text-gray-900 shrink-0">Aug 2025</span>
                      </div>
                    </div>
                  </div>

                  {/* 6. EDUCATION */}
                  <div>
                    <div className="font-sans text-[9.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-0.5">
                      EDUCATION
                    </div>
                    <div className="space-y-0.5 text-[8.2px] leading-[1.24] text-gray-800">
                      <div className="flex justify-between gap-2">
                        <span className="truncate">
                          <strong className="text-gray-900">Lovely Professional University</strong> (Punjab, India) – B.Tech in CSE (AI &amp; ML)
                        </span>
                        <span className="font-semibold text-gray-900 shrink-0">Aug 2023 – Present</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="truncate">
                          <strong className="text-gray-900">Narayana Junior College</strong> (Bhimavaram, AP) – Intermediate – PCM
                        </span>
                        <span className="font-semibold text-gray-900 shrink-0">Apr 2021 – Mar 2023</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}