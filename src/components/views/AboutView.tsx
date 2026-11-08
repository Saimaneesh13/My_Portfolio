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
} from 'lucide-react'
import { useSceneStore } from '../../store/useSceneStore'

const TECH_PILLS = [
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'TensorFlow', icon: '🔶' },
  { name: 'Keras', icon: '🅺' },
  { name: 'OpenCV', icon: '👁️' },
  { name: 'BERTopic', icon: '📊' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Streamlit', icon: '👑' },
]

export default function AboutView() {
  const { isCvPaperOpen, setCvPaperOpen } = useSceneStore()
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="h-screen max-w-[1340px] mx-auto px-6 sm:px-10 pt-20 pb-10 flex items-center overflow-hidden pointer-events-none select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* ============================================================
            LEFT COLUMN: BORDERLESS LUXURY LAYOUT (MATCHES 1ST IMAGE)
           ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5 pointer-events-auto">
          {/* 1. Header & Bio */}
          <div className="space-y-1.5">
            <div className="font-mono text-[11px] uppercase tracking-[2px] text-gold">
              05 // ABOUT ME
            </div>
            <h1 className="font-display text-4xl sm:text-[46px] font-bold tracking-tight text-pure leading-[1.08]">
              Gorrela Sai Maneesh
            </h1>
            <div className="font-display text-lg sm:text-xl font-semibold text-gold pt-0.5">
              AI / ML Engineer
            </div>
            <div className="font-sans text-xs sm:text-sm font-medium text-pure/95 tracking-wide">
              Software Developer <span className="text-gold mx-1.5">•</span> Computer Vision{' '}
              <span className="text-gold mx-1.5">•</span> NLP
            </div>
            <p className="text-xs sm:text-[13.5px] text-mist leading-relaxed pt-1.5 max-w-xl">
              I build intelligent systems that transform complex real-world problems into meaningful
              solutions, with a focus on Machine Learning, Computer Vision, and Natural Language
              Processing.
            </p>
          </div>

          {/* 2. Borderless 4 Metric Counters Row */}
          <div className="grid grid-cols-4 gap-4 py-1">
            {[
              { icon: Code2, val: '3', label: 'Projects' },
              { icon: Layers, val: '12+', label: 'Technologies' },
              { icon: Trophy, val: '1', label: 'Major Award' },
              { icon: Award, val: '3', label: 'Certifications' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <item.icon className="w-5 h-5 text-gold shrink-0 stroke-[1.75]" />
                <div>
                  <div className="font-display text-lg font-bold text-pure leading-none">
                    {item.val}
                  </div>
                  <div className="font-sans text-[11px] text-mist mt-1">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Borderless Technical Expertise Section */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 font-display text-sm sm:text-base font-semibold text-pure">
              <span className="text-gold font-mono text-sm">&lt;/&gt;</span>
              <span>Technical Expertise</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_PILLS.map((t) => (
                <div
                  key={t.name}
                  className="px-3.5 py-1.5 rounded-lg bg-[#111827]/85 border border-gold/20 flex items-center gap-2 text-xs font-medium text-pure shadow-sm"
                >
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Borderless Bottom Split: My Journey | Thin Divider | Key Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-1">
            {/* My Journey (Left 6 cols) */}
            <div className="sm:col-span-6 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm sm:text-base font-semibold text-pure">
                <BarChart2 className="w-4 h-4 text-gold" />
                <span>My Journey</span>
              </div>

              <div className="relative pl-4 border-l border-gold/45 space-y-3">
                {[
                  {
                    year: '2023',
                    title: 'Started B.Tech (CSE – AI & ML)',
                    sub: 'Lovely Professional University',
                  },
                  {
                    year: 'Dec 2025 – Feb 2026',
                    title: 'ML Internship at EduExpose',
                    sub: '(Best Performance Award)',
                  },
                  {
                    year: '2026',
                    title: 'Built & Deployed AI/ML Systems',
                    sub: '(Disaster, Face, AgroDetect)',
                  },
                  {
                    year: '2027',
                    title: 'Expected B.Tech Graduation',
                    sub: '(CSE – AI & ML)',
                  },
                ].map((step, i) => (
                  <div key={i} className="relative text-xs">
                    <span className="absolute -left-[20.5px] top-1 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#EAB767]" />
                    <div className="font-sans text-xs font-bold text-gold leading-none">
                      {step.year}
                    </div>
                    <div className="text-pure/95 font-medium leading-snug mt-0.5">{step.title}</div>
                    <div className="text-[11px] text-mist leading-snug">{step.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights (Right 6 cols with thin left border divider) */}
            <div className="sm:col-span-6 sm:pl-6 sm:border-l border-gold/15 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm sm:text-base font-semibold text-pure">
                <Trophy className="w-4 h-4 text-gold" />
                <span>Key Highlights</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure">Best Performance Award</div>
                    <div className="text-[11px] text-mist">During ML Internship at EduExpose</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure">2 Coursera Specializations</div>
                    <div className="text-[11px] text-mist">(8 courses) – University of Colorado</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Code2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure">3 End-to-End Projects</div>
                    <div className="text-[11px] text-mist">NLP, Computer Vision and CNN</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure">B.Tech – CSE (AI & ML)</div>
                    <div className="text-[11px] text-mist">Lovely Professional University</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: LOCKED PIXEL ANCHOR FOR BOTH 3D & WHITE CV
           ============================================================ */}
        <div className="lg:col-span-6 flex items-center justify-center relative h-[555px] pointer-events-auto">
          {/* CoreScene reads this exact DOM element's pixel rect to lock the 3D CV position & size 1:1 */}
          <div id="cv-stage-anchor" className="relative w-full max-w-[545px] h-[545px]">
            {/* Subtle Top-Right Expand Icon */}
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

            {/* Simultaneous Cross-Fade (no mode="wait" delay) */}
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
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-gold/80 group-hover:text-gold transition-opacity bg-space/80 px-3.5 py-1 rounded-full border border-gold/30">
                    [ Click 3D CV to Reveal Document ]
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
                  className={`${
                    isFullscreen
                      ? 'fixed inset-6 z-50 max-w-3xl mx-auto overflow-y-auto p-8'
                      : 'absolute inset-0 px-6 py-4 cursor-pointer'
                  } bg-white text-[#111827] rounded-[4px] shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(234,183,103,0.18)] flex flex-col justify-between overflow-hidden`}
                >
                {/* Top Header */}
                <div>
                  <h2 className="font-sans text-[19px] font-bold text-[#1e3a8a] leading-tight">
                    Gorrela Sai Maneesh
                  </h2>
                  <div className="flex items-start justify-between mt-1 text-[9.5px] leading-[1.35] text-gray-800">
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

                {/* SKILLS */}
                <div>
                  <div className="font-sans text-[10.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-1">
                    SKILLS
                  </div>
                  <div className="grid grid-cols-12 gap-y-0.5 text-[9px] leading-[1.3]">
                    <div className="col-span-4 font-bold text-[#1e3a8a]">Languages:</div>
                    <div className="col-span-8 text-gray-800">Python, Java, SQL, HTML5, CSS3</div>

                    <div className="col-span-4 font-bold text-[#1e3a8a]">Backend & Frameworks:</div>
                    <div className="col-span-8 text-gray-800">Flask, FastAPI, REST APIs, Tkinter, JavaFX</div>

                    <div className="col-span-4 font-bold text-[#1e3a8a]">AI & Machine Learning:</div>
                    <div className="col-span-8 text-gray-800">
                      Scikit-learn, TensorFlow, Keras, OpenCV, NLP, BERTopic, LDA, UMAP, HDBSCAN
                    </div>

                    <div className="col-span-4 font-bold text-[#1e3a8a]">Data & Visualization:</div>
                    <div className="col-span-8 text-gray-800">Pandas, NumPy, Streamlit, Plotly, SQLite</div>

                    <div className="col-span-4 font-bold text-[#1e3a8a]">Tools & Platforms:</div>
                    <div className="col-span-8 text-gray-800">Git, GitHub, VS Code, Jupyter</div>

                    <div className="col-span-4 font-bold text-[#1e3a8a]">Core CS:</div>
                    <div className="col-span-8 text-gray-800">
                      OOP, Data Structures, Computer Networking (TCP/IP), Data Preprocessing
                    </div>

                    <div className="col-span-4 font-bold text-[#1e3a8a]">Soft Skills:</div>
                    <div className="col-span-8 text-gray-800">
                      Leadership, Problem-Solving, Communication, Project Management
                    </div>
                  </div>
                </div>

                {/* INTERNSHIP */}
                <div>
                  <div className="font-sans text-[10.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-1">
                    INTERNSHIP
                  </div>
                  <div className="flex items-center justify-between text-[9.5px] font-bold text-gray-900">
                    <span>EduExpose | Machine Learning Intern</span>
                    <span className="text-[9px] font-semibold text-gray-800">Dec 2025 – Feb 2026</span>
                  </div>
                  <ul className="list-disc list-inside text-[8.8px] text-gray-800 leading-[1.3] space-y-0.5 mt-0.5">
                    <li>Completed a 3-month applied ML internship covering the full model lifecycle on real data.</li>
                    <li>Implemented and compared supervised and unsupervised algorithms for predictive modeling.</li>
                    <li>Practiced feature engineering, cross-validation, and hyperparameter tuning to improve performance.</li>
                  </ul>
                </div>

                {/* PROJECTS */}
                <div>
                  <div className="font-sans text-[10.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-1">
                    PROJECTS
                  </div>
                  <div className="space-y-0.5 text-[9px] leading-[1.3] text-gray-900">
                    <div className="flex justify-between">
                      <span>
                        <strong>• AI-Based Disaster Intelligence System</strong> | GitHub
                      </span>
                      <span className="font-medium text-gray-800">Apr 2026 – May 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        <strong>• Face Recognition Attendance System</strong> | GitHub
                      </span>
                      <span className="font-medium text-gray-800">Feb 2026 – Mar 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        <strong>• AgroDetect AI: Crop Disease Detection System</strong> | GitHub
                      </span>
                      <span className="font-medium text-gray-800">Jan 2026 – Feb 2026</span>
                    </div>
                  </div>
                </div>

                {/* ACHIEVEMENTS */}
                <div>
                  <div className="font-sans text-[10.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-1">
                    ACHIEVEMENTS
                  </div>
                  <ul className="list-disc list-inside text-[8.8px] text-gray-800 leading-[1.3] space-y-0.5">
                    <li>Received the Best Award during the ML Internship at EduExpose.</li>
                    <li>Completed 2 Coursera Specializations (8 courses) from University of Colorado.</li>
                    <li>Designed, built, and maintain 3 end-to-end AI/ML and computer-vision projects on GitHub.</li>
                  </ul>
                </div>

                {/* CERTIFICATIONS */}
                <div>
                  <div className="font-sans text-[10.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-1">
                    CERTIFICATIONS
                  </div>
                  <div className="space-y-0.5 text-[8.8px] leading-[1.3] text-gray-800">
                    <div className="flex justify-between">
                      <span>• Computer Communications – University of Colorado (Coursera)</span>
                      <span className="font-semibold text-gray-900">Nov 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Interpersonal Communication for Engineering Leaders – Rice University</span>
                      <span className="font-semibold text-gray-900">Apr 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Computational Theory: Language Principle & Finite Automata – Infosys</span>
                      <span className="font-semibold text-gray-900">Aug 2025</span>
                    </div>
                  </div>
                </div>

                {/* EDUCATION */}
                <div>
                  <div className="font-sans text-[10.5px] font-bold uppercase tracking-wide text-[#1e3a8a] border-b border-gray-300 pb-0.5 mb-1">
                    EDUCATION
                  </div>
                  <div className="space-y-0.5 text-[8.8px] leading-[1.3] text-gray-800">
                    <div className="flex justify-between">
                      <span>
                        <strong className="text-gray-900">Lovely Professional University</strong> – B.Tech in CSE (AI & ML)
                      </span>
                      <span className="font-semibold text-gray-900">Aug 2023 – Present</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        <strong className="text-gray-900">• Narayana Junior College</strong> – Intermediate – PCM
                      </span>
                      <span className="font-semibold text-gray-900">Apr 2021 – Mar 2023</span>
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
