import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Layers,
  Trophy,
  Award,
  Maximize2,
  Minimize2,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  MapPin,
} from 'lucide-react'
import { useSceneStore } from '../../store/useSceneStore'
import {
  CERTIFICATES,
  EDUCATION_DATA,
  INTERNSHIP_DATA,
  PROFILE_DATA,
} from '../../lib/portfolio-data'

type AboutLeftTab = 'overview' | 'internship' | 'certificates'

const TAB_ORDER: AboutLeftTab[] = ['overview', 'internship', 'certificates']

const HORIZONTAL_NAV_ITEMS: {
  id: AboutLeftTab
  num: string
  label: string
  icon: typeof GraduationCap
}[] = [
    {
      id: 'overview',
      num: '01',
      label: 'Overview',
      icon: GraduationCap,
    },
    {
      id: 'internship',
      num: '02',
      label: 'Internship',
      icon: Briefcase,
    },
    {
      id: 'certificates',
      num: '03',
      label: 'Vault (12)',
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

// Smooth directional vertical fade-up / fade-down variants
const verticalFadeVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 36 : -36,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -36 : 36,
    filter: 'blur(4px)',
  }),
}

export default function AboutView() {
  const { isCvPaperOpen, setCvPaperOpen } = useSceneStore()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [[leftTab, direction], setTabState] = useState<[AboutLeftTab, number]>(['overview', 1])
  const [certFilter, setCertFilter] = useState<string>('All')
  const wheelCooldownRef = useRef<number>(0)
  const touchStartYRef = useRef<number | null>(null)

  const switchTab = useCallback((nextTab: AboutLeftTab) => {
    setTabState(([currTab, currDir]) => {
      if (nextTab === currTab) return [currTab, currDir]
      const currIdx = TAB_ORDER.indexOf(currTab)
      const nextIdx = TAB_ORDER.indexOf(nextTab)
      const dir = nextIdx > currIdx ? 1 : -1
      return [nextTab, dir]
    })
  }, [])

  const stepTabByDirection = useCallback((delta: 1 | -1) => {
    const now = Date.now()
    if (now - wheelCooldownRef.current < 520) return

    setTabState(([currTab, currDir]) => {
      const currIdx = TAB_ORDER.indexOf(currTab)
      const nextIdx = currIdx + delta
      if (nextIdx < 0 || nextIdx >= TAB_ORDER.length) return [currTab, currDir]
      wheelCooldownRef.current = now
      return [TAB_ORDER[nextIdx], delta]
    })
  }, [])

  // Global anywhere-on-screen Mouse Wheel, Touch Swipe & Up/Down Arrow Key listener
  useEffect(() => {
    const onGlobalWheel = (e: WheelEvent) => {
      if (isFullscreen) return

      const scrollBox = (e.target as HTMLElement | null)?.closest(
        '.cert-scroll-box'
      ) as HTMLElement | null
      if (scrollBox) {
        const atTop = scrollBox.scrollTop <= 2
        const atBottom =
          Math.ceil(scrollBox.scrollTop + scrollBox.clientHeight) >= scrollBox.scrollHeight - 2
        if (e.deltaY < 0 && !atTop) return
        if (e.deltaY > 0 && !atBottom) return
      }

      if (Math.abs(e.deltaY) < 18) return
      if (e.deltaY > 0) {
        stepTabByDirection(1)
      } else {
        stepTabByDirection(-1)
      }
    }

    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          e.preventDefault()
          setIsFullscreen(false)
        }
        return
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        stepTabByDirection(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        stepTabByDirection(-1)
      }
    }

    const onGlobalTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY
      }
    }

    const onGlobalTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || e.changedTouches.length === 0) return
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY
      touchStartYRef.current = null
      if (Math.abs(deltaY) > 40) {
        stepTabByDirection(deltaY > 0 ? 1 : -1)
      }
    }

    window.addEventListener('wheel', onGlobalWheel, { passive: true })
    window.addEventListener('keydown', onGlobalKeyDown)
    window.addEventListener('touchstart', onGlobalTouchStart, { passive: true })
    window.addEventListener('touchend', onGlobalTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onGlobalWheel)
      window.removeEventListener('keydown', onGlobalKeyDown)
      window.removeEventListener('touchstart', onGlobalTouchStart)
      window.removeEventListener('touchend', onGlobalTouchEnd)
    }
  }, [isFullscreen, stepTabByDirection])

  const filteredCerts =
    certFilter === 'All'
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === certFilter)

  return (
    <div className="h-screen max-w-[1360px] mx-auto px-6 sm:px-10 pt-20 pb-10 flex items-center overflow-hidden pointer-events-none select-none">
      {/* ============================================================
          FULLSCREEN BACKDROP OVERLAY (CLICK ANYWHERE OUTSIDE TO UNZOOM)
         ============================================================ */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-[55] bg-space/80 backdrop-blur-md pointer-events-auto cursor-zoom-out"
          title="Click anywhere outside to exit fullscreen"
        />
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* ============================================================
            LEFT COLUMN: FULL-WIDTH + CLEAN HORIZONTAL 01 / 02 / 03 BAR
           ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-between h-[580px] pointer-events-auto">
          {/* 1. Top Eyebrow Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-1.5 border-b border-gold/15 shrink-0">
            <div className="inline-flex items-center p-1 rounded-xl bg-obsidian/90 border border-gold/25 shadow-inner">
              {HORIZONTAL_NAV_ITEMS.map((item) => {
                const active = leftTab === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => switchTab(item.id)}
                    className={`relative px-3 py-1 rounded-lg font-mono text-[10.5px] flex items-center gap-1.5 transition-colors duration-200 ${active ? 'text-space font-bold' : 'text-mist hover:text-pure'
                      }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="about-horiz-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F7D9A0] via-[#EAB767] to-[#C5A46D] shadow-gold-glow"
                      />
                    )}
                    <span className="relative z-10 opacity-80">{item.num}</span>
                    <item.icon className="relative z-10 w-3 h-3" />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Full-Width Directional Fade Up / Fade Down Stage */}
          <div className="flex-1 min-h-0 relative overflow-hidden pt-1.5 pb-1">
            <AnimatePresence mode="wait" custom={direction}>
              {/* ========================================================
                  STAGE 01: OVERVIEW (PROPERLY SPACED — ZERO BOTTOM CLIPPING)
                 ======================================================== */}
              {leftTab === 'overview' && (
                <motion.div
                  key="tab-overview"
                  custom={direction}
                  variants={verticalFadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full flex flex-col justify-between pb-1"
                >
                  {/* Name & Bio */}
                  <div className="space-y-0.5">
                    <h1 className="font-display text-3xl sm:text-[40px] font-bold tracking-tight text-pure leading-[1.05]">
                      {PROFILE_DATA.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="font-display text-sm sm:text-base font-semibold text-gold">
                        {PROFILE_DATA.role}
                      </span>
                      <span className="text-gold/50">•</span>
                      <span className="font-sans text-xs sm:text-sm font-medium text-pure/90">
                        {PROFILE_DATA.subRoles.join(' • ')}
                      </span>
                    </div>
                    <p className="text-xs text-mist leading-relaxed pt-0.5 max-w-xl">
                      {PROFILE_DATA.bio}
                    </p>
                  </div>

                  {/* 4 Clickable Counter Metrics */}
                  <div className="grid grid-cols-4 gap-3 py-1.5 border-y border-gold/15">
                    {[
                      { icon: Code2, val: '3', label: 'Flagship Projects', tab: 'overview' as const },
                      { icon: Layers, val: '18+', label: 'Technologies', tab: 'overview' as const },
                      { icon: Trophy, val: '1', label: 'Best Intern Award', tab: 'internship' as const },
                      { icon: Award, val: '12', label: 'Verified Credentials', tab: 'certificates' as const },
                    ].map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => switchTab(item.tab)}
                        className="flex items-center gap-2 text-left group hover:bg-gold/5 p-1 rounded-lg transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-display text-sm sm:text-base font-bold text-pure leading-none group-hover:text-gold transition-colors">
                            {item.val}
                          </div>
                          <div className="font-sans text-[10px] text-mist mt-0.5">{item.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Core Stack & Frameworks */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
                      <span className="text-gold font-mono">&lt;/&gt;</span>
                      <span>Core Stack &amp; Frameworks</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {TECH_PILLS.map((t) => (
                        <div
                          key={t.name}
                          className="px-2.5 py-0.5 rounded-lg bg-[#111827]/90 border border-gold/20 flex items-center gap-1.5 text-[11px] font-medium text-pure"
                        >
                          <span>{t.icon}</span>
                          <span>{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Split: Education | Verified Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-0.5">
                    {/* Education */}
                    <div className="sm:col-span-6 space-y-2">
                      <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
                        <GraduationCap className="w-3.5 h-3.5 text-gold" />
                        <span>Education</span>
                      </div>

                      <div className="relative pl-4 border-l border-gold/45 space-y-2.5">
                        {EDUCATION_DATA.map((edu, i) => (
                          <div key={i} className="relative text-xs">
                            <span className="absolute -left-[20px] top-1 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#EAB767]" />
                            <div className="font-mono text-[9.5px] font-bold text-gold leading-none">
                              {edu.period}
                            </div>
                            <div className="text-pure font-semibold leading-snug mt-0.5">
                              {edu.institution}
                            </div>
                            <div className="text-[10.5px] text-pure/85 leading-snug">
                              {edu.degree}
                            </div>
                            <div className="text-[9.5px] text-mist flex items-center gap-1 mt-0.5">
                              <MapPin className="w-2.5 h-2.5 text-gold" />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verified Highlights */}
                    <div className="sm:col-span-6 sm:pl-5 sm:border-l border-gold/15 space-y-2">
                      <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
                        <Trophy className="w-3.5 h-3.5 text-gold" />
                        <span>Verified Highlights</span>
                      </div>

                      <div className="space-y-1.5 text-[11.5px]">
                        <div
                          onClick={() => switchTab('internship')}
                          className="flex items-start gap-2 cursor-pointer group"
                        >
                          <Award className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-pure group-hover:text-gold transition-colors leading-tight">
                              Best Performance Award
                            </div>
                            <div className="text-[10.5px] text-mist leading-tight mt-0.5">
                              3-Month ML Internship at EduExpose →
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => switchTab('certificates')}
                          className="flex items-start gap-2 cursor-pointer group"
                        >
                          <Layers className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-pure group-hover:text-gold transition-colors leading-tight">
                              2 Coursera Specializations (8 Courses)
                            </div>
                            <div className="text-[10.5px] text-mist leading-tight mt-0.5">
                              Computer Comms &amp; C++ Unreal – UCCS →
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => switchTab('certificates')}
                          className="flex items-start gap-2 cursor-pointer group"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-pure group-hover:text-gold transition-colors leading-tight">
                              12 Verified Credentials
                            </div>
                            <div className="text-[10.5px] text-mist leading-tight mt-0.5">
                              EduExpose, Rice Univ, Infosys, LPU &amp; Udemy →
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Code2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-pure leading-tight">
                              3 End-to-End AI/ML Systems
                            </div>
                            <div className="text-[10.5px] text-mist leading-tight mt-0.5">
                              Disaster NLP, Face CV &amp; AgroDetect (90%+ CNN)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================================
                  STAGE 02: FULL-HEIGHT ML INTERNSHIP SPOTLIGHT (EDUEXPOSE)
                 ======================================================== */}
              {leftTab === 'internship' && (
                <motion.div
                  key="tab-internship"
                  custom={direction}
                  variants={verticalFadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-pure">
                        {INTERNSHIP_DATA.role}
                      </h2>
                      <span className="px-3 py-0.5 rounded-full bg-gold/15 border border-gold/40 font-mono text-[10.5px] text-gold">
                        {INTERNSHIP_DATA.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-display text-base font-bold text-gold">
                        {INTERNSHIP_DATA.company}
                      </span>
                      <span className="text-gold/40">•</span>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                        ✓ {INTERNSHIP_DATA.accreditation}
                      </span>
                    </div>
                  </div>

                  {/* Best Award + Official Citation Quote */}
                  <div className="glass-panel rounded-2xl p-4 border border-gold/50 bg-gold/10 space-y-1.5 shadow-gold-glow">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-gold shrink-0" />
                        <span className="font-display text-xs sm:text-sm font-bold text-pure">
                          {INTERNSHIP_DATA.award}
                        </span>
                      </div>
                      <span className="font-mono text-[9.5px] text-gold">
                        Issued: {INTERNSHIP_DATA.issuedDate}
                      </span>
                    </div>
                    <p className="text-[11.5px] italic text-pure/90 leading-snug pl-6">
                      {INTERNSHIP_DATA.quote}
                    </p>
                  </div>

                  {/* Full Internship Lifecycle Bullets */}
                  <div className="glass-panel rounded-2xl p-4 border border-gold/30 space-y-2.5">
                    <div className="font-mono text-[9.5px] uppercase tracking-wider text-gold">
                      KEY ENGINEERING CONTRIBUTIONS &amp; MODEL LIFECYCLE
                    </div>
                    <ul className="space-y-2 text-xs text-pure/95 leading-snug">
                      {INTERNSHIP_DATA.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="px-1.5 py-0.5 rounded bg-gold/15 border border-gold/35 font-mono text-[9px] font-bold text-gold shrink-0 mt-0.5">
                            0{i + 1}
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3 Official EduExpose Certificates */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[9.5px] uppercase tracking-wider text-gold">
                      3 OFFICIAL EDUEXPOSE CERTIFICATES AWARDED (FEB 28, 2026)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {INTERNSHIP_DATA.certificates.map((c, idx) => (
                        <a
                          key={idx}
                          href={c.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="glass-panel p-3 rounded-xl border border-gold/35 hover:border-gold group flex flex-col justify-between transition-all"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono text-[8.5px] text-gold bg-gold/15 px-1.5 py-0.5 rounded border border-gold/30">
                              {c.badge}
                            </span>
                            <ExternalLink className="w-3 h-3 text-mist group-hover:text-gold" />
                          </div>
                          <div className="font-display text-xs font-bold text-pure group-hover:text-gold mt-1.5 leading-tight">
                            {c.title}
                          </div>
                          <div className="font-mono text-[8.5px] text-mist mt-0.5">
                            AICTE · ISO 9001:2015
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================================
                  STAGE 03: FULL-HEIGHT CERTIFICATIONS VAULT (12 VERIFIED)
                 ======================================================== */}
              {leftTab === 'certificates' && (
                <motion.div
                  key="tab-certificates"
                  custom={direction}
                  variants={verticalFadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full flex flex-col justify-between space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-pure">
                      Credentials Vault
                    </h2>
                    <div className="flex flex-wrap gap-1">
                      {[
                        'All',
                        'Internship & Training',
                        'Specialization',
                        'AI & GenAI',
                        'Software & CS',
                        'Leadership',
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCertFilter(cat)}
                          className={`px-2.5 py-0.5 rounded-lg font-mono text-[9.5px] transition-all ${certFilter === cat
                            ? 'bg-gold text-space font-bold shadow-gold-glow'
                            : 'bg-obsidian/85 text-mist hover:text-pure border border-gold/20'
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full-Width Scrollable Certificate Cards */}
                  <div className="cert-scroll-box flex-1 overflow-y-auto space-y-2.5 pr-1.5">
                    {filteredCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className="glass-panel p-3.5 rounded-2xl border border-gold/30 hover:border-gold transition-all flex flex-col justify-between gap-1.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-md bg-gold/15 border border-gold/40 font-mono text-[9px] text-gold font-semibold">
                                {cert.badgeText}
                              </span>
                              <span className="font-mono text-[10px] text-pure/80">
                                {cert.date}
                              </span>
                            </div>
                            <h3 className="font-display text-sm font-bold text-pure mt-1.5 leading-snug">
                              {cert.title}
                            </h3>
                            <div className="text-xs text-mist mt-0.5">{cert.issuer}</div>
                          </div>

                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-gold/15 hover:bg-gold hover:text-space border border-gold/45 font-mono text-[10px] text-gold font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                          >
                            <span>Verify</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {cert.subCourses && (
                          <div className="pl-3 border-l-2 border-gold/35 text-[10.5px] text-pure/85 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 mt-1">
                            {cert.subCourses.map((sc, idx) => (
                              <div key={idx} className="truncate">
                                • {sc}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="font-mono text-[9px] text-mist/75 pt-0.5">
                          Credential ID: <span className="text-pure/90">{cert.credentialId}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              title={isFullscreen ? 'Minimize CV' : 'Zoom CV'}
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
                    if (isFullscreen) {
                      setIsFullscreen(false)
                    } else {
                      setCvPaperOpen(false)
                    }
                  }}
                  className={`${isFullscreen
                    ? 'fixed top-20 bottom-6 left-4 right-4 z-[60] max-w-3xl mx-auto overflow-y-auto p-8 cursor-zoom-out'
                    : 'absolute inset-0 px-5 py-4 cursor-pointer overflow-hidden'
                    } bg-white text-[#111827] rounded-[4px] shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(234,183,103,0.18)] flex flex-col justify-between`}
                >
                  {/* Floating Minimize Button When Zoomed */}
                  {isFullscreen && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsFullscreen(false)
                      }}
                      className="sticky top-0 self-end -mt-4 -mr-4 mb-2 z-50 px-3 py-1.5 rounded-lg bg-[#0b111e] text-gold border border-gold/40 font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-lg hover:bg-gold hover:text-[#070b13] transition-colors"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>Minimize (ESC)</span>
                    </button>
                  )}

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
                      <span>EduExpose | Machine Learning Intern (AICTE · ISO 9001:2015)</span>
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
                            • <strong>AI-Based Disaster Intelligence System:</strong> Unsupervised NLP &amp; Urgency | GitHub
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
                            • <strong>Face Recognition Attendance System:</strong> Real-Time CV Automation | GitHub
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
                            • <strong>AgroDetect AI:</strong> CNN-Based Crop Disease Detection (90%+ Acc.) | GitHub
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
                      <li>Received the Best Award across Internship, Training &amp; Participation during the ML internship at EduExpose.</li>
                      <li>Completed 2 Coursera Specializations (8 courses total) from the University of Colorado, Colorado Springs.</li>
                      <li>Designed, built, and publicly maintain 3 end-to-end AI/ML and computer-vision projects on GitHub.</li>
                    </ul>
                  </div>

                  {/* 5. CERTIFICATIONS */}
                  <div>
                    <div className="font-sans text-[9.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-0.5">
                      CERTIFICATIONS &amp; SPECIALIZATIONS (12 VERIFIED)
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
                        <span className="truncate">• Automata Theory – Infosys | Java Maestro GUI – LPU | 3 GenAI – Udemy | 3 ML Certs – EduExpose</span>
                        <span className="font-semibold text-gray-900 shrink-0">2025 – 2026</span>
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