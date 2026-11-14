import { useState } from 'react'
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

export default function AboutView() {
  const { isCvPaperOpen, setCvPaperOpen } = useSceneStore()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [leftTab, setLeftTab] = useState<AboutLeftTab>('overview')
  const [certFilter, setCertFilter] = useState<string>('All')

  const filteredCerts =
    certFilter === 'All'
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === certFilter)

  return (
    <div className="h-screen max-w-[1360px] mx-auto px-6 sm:px-10 pt-20 pb-10 flex items-center overflow-hidden pointer-events-none select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ============================================================
            LEFT COLUMN: OVERVIEW / INTERNSHIP SPOTLIGHT / 9-CERT VAULT
           ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 pointer-events-auto">
          {/* 1. Top Header & Bio */}
          <div className="space-y-1">
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-gold">
              05 // ABOUT, EXPERIENCE & CREDENTIALS
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

          {/* 2. 4 Key Metric Counters */}
          <div className="grid grid-cols-4 gap-3 py-1 border-y border-gold/15">
            {[
              { icon: Code2, val: '3', label: 'Flagship Projects', tab: 'overview' as const },
              { icon: Layers, val: '18+', label: 'Technologies', tab: 'overview' as const },
              { icon: Trophy, val: '1', label: 'Best Intern Award', tab: 'internship' as const },
              { icon: Award, val: '9', label: 'Certificates (2 Spec.)', tab: 'certificates' as const },
            ].map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLeftTab(item.tab)}
                className="flex items-center gap-2.5 text-left group hover:bg-gold/5 p-1.5 rounded-lg transition-colors"
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

          {/* 3. Sub-Navigation Switcher Pills (Unmixes Internship & Certificates!) */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'overview', label: '01 Overview & Education', icon: GraduationCap },
              { id: 'internship', label: '02 ML Internship (EduExpose)', icon: Briefcase },
              { id: 'certificates', label: '03 Certifications Vault (9)', icon: ShieldCheck },
            ].map((t) => {
              const active = leftTab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setLeftTab(t.id as AboutLeftTab)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-[10.5px] flex items-center gap-1.5 border transition-all ${active
                    ? 'bg-gold/20 border-gold text-gold shadow-gold-glow font-semibold'
                    : 'bg-obsidian/75 border-gold/20 text-mist hover:text-pure hover:border-gold/45'
                    }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>

          {/* 4. Dynamic Tab Body (Locked Height so layout never jumps) */}
          <div className="h-[295px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {leftTab === 'overview' && (
                <motion.div
                  key="tab-overview"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3.5 h-full flex flex-col justify-between"
                >
                  {/* Technical Expertise Pills */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
                      <span className="text-gold font-mono">&lt;/&gt;</span>
                      <span>Core Stack & Frameworks</span>
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

                  {/* Split: My Journey Timeline (with Narayana + LPU) | Key Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-1">
                    {/* My Journey */}
                    <div className="sm:col-span-6 space-y-2">
                      <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
                        <BarChart2 className="w-3.5 h-3.5 text-gold" />
                        <span>Education & Career Journey</span>
                      </div>

                      <div className="relative pl-3.5 border-l border-gold/45 space-y-2">
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

                    {/* Key Highlights */}
                    <div className="sm:col-span-6 sm:pl-5 sm:border-l border-gold/15 space-y-2">
                      <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
                        <Trophy className="w-3.5 h-3.5 text-gold" />
                        <span>Verified Highlights</span>
                      </div>

                      <div className="space-y-2 text-[11px]">
                        <div
                          onClick={() => setLeftTab('internship')}
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
                          onClick={() => setLeftTab('certificates')}
                          className="flex items-start gap-2.5 cursor-pointer group"
                        >
                          <Layers className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-pure group-hover:text-gold transition-colors">
                              2 Coursera Specializations (8 Courses)
                            </div>
                            <div className="text-[10px] text-mist">
                              Computer Comms & C++ Unreal – UCCS →
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => setLeftTab('certificates')}
                          className="flex items-start gap-2.5 cursor-pointer group"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-pure group-hover:text-gold transition-colors">
                              9 Verified Industry Certificates
                            </div>
                            <div className="text-[10px] text-mist">
                              Rice Univ, Infosys, LPU Java GUI & Udemy GenAI →
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <GraduationCap className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-pure">
                              B.Tech CSE (AI & ML) • LPU
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
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel rounded-2xl p-4 border border-gold/40 space-y-3 h-full flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gold" />
                        <h3 className="font-display text-base font-bold text-pure">
                          {INTERNSHIP_DATA.role} — {INTERNSHIP_DATA.company}
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/40 font-mono text-[10px] text-gold">
                        {INTERNSHIP_DATA.period}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold/20 border border-gold/50 text-xs font-semibold text-gold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Recipient: {INTERNSHIP_DATA.award}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-pure/90 leading-relaxed pl-1">
                    {INTERNSHIP_DATA.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gold font-mono mt-0.5">0{i + 1}.</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-gold/20 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[9.5px] text-gold uppercase mr-1">
                      Lifecycle Stack:
                    </span>
                    {INTERNSHIP_DATA.skillsUsed.map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded bg-obsidian border border-gold/25 font-mono text-[9.5px] text-mist"
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
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel rounded-2xl p-3.5 border border-gold/35 h-full flex flex-col justify-between space-y-2.5"
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
                  <div className="overflow-y-auto space-y-2 pr-1 flex-1">
                    {filteredCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-2.5 rounded-xl bg-obsidian/85 border border-gold/25 hover:border-gold/60 transition-all flex flex-col justify-between gap-1.5"
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
                          ID: {cert.credentialId}
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
            {/* Top-Right Expand / Toggle Button */}
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
                /* STAGE 1: Clickable Overlay directly over the 3D Golden CV Hologram */
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
                /* STAGE 2: Complete Single-Page White Curriculum Vitae Sheet */
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

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Backend & Frameworks:</div>
                      <div className="col-span-8 text-gray-800">Flask, FastAPI, REST APIs, Tkinter, JavaFX, Bootstrap 5</div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">AI & Machine Learning:</div>
                      <div className="col-span-8 text-gray-800">
                        Scikit-learn, TensorFlow, Keras, OpenCV, NLP, BERTopic, LDA, UMAP, HDBSCAN, spaCy, FAISS
                      </div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Data & Visualization:</div>
                      <div className="col-span-8 text-gray-800">Pandas, NumPy, Streamlit, Plotly, SQLite</div>

                      <div className="col-span-4 font-bold text-[#1e3a8a] whitespace-nowrap">Tools & Platforms:</div>
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
                            <strong>• AI-Based Disaster Intelligence System:</strong> Unsupervised NLP & Urgency | GitHub
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
                      CERTIFICATIONS & SPECIALIZATIONS (9 VERIFIED)
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
                        <span className="truncate">• Computational Theory & Finite Automata – Infosys | Java Maestro GUI – LPU | 3 GenAI Certs – Udemy</span>
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
                          <strong className="text-gray-900">Lovely Professional University</strong> (Punjab, India) – B.Tech in CSE (AI & ML)
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