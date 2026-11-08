import { useState } from 'react'
import {
  Code2,
  Layers,
  Trophy,
  Award,
  FileText,
  Maximize2,
  Minimize2,
  Download,
  Sparkles,
  Linkedin,
  Github,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  FolderGit2,
  CheckCircle2,
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
    <div className="h-screen max-w-[1360px] mx-auto px-4 sm:px-8 pt-20 pb-14 flex items-center overflow-hidden pointer-events-none select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* ============================================================
            LEFT COLUMN: 05 // ABOUT ME, STATS, TECH, JOURNEY, HIGHLIGHTS
           ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5 pointer-events-auto">
          {/* Header & Bio */}
          <div className="space-y-1.5">
            <div className="mono-label text-gold !text-[10px]">05 // ABOUT ME</div>
            <h1 className="font-display text-3xl sm:text-[44px] font-bold tracking-tight text-pure leading-none">
              Gorrela Sai Maneesh
            </h1>
            <div className="font-display text-base sm:text-lg font-semibold text-gold pt-0.5">
              AI / ML Engineer
            </div>
            <div className="font-mono text-[11px] text-pure/90 tracking-wide">
              Software Developer <span className="text-gold mx-1">•</span> Computer Vision{' '}
              <span className="text-gold mx-1">•</span> NLP
            </div>
            <p className="text-xs text-mist leading-relaxed pt-1 max-w-xl">
              I build intelligent systems that transform complex real-world problems into meaningful
              solutions, with a focus on Machine Learning, Computer Vision, and Natural Language
              Processing.
            </p>
          </div>

          {/* 4 Metric Counter Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { icon: Code2, val: '3', label: 'Projects' },
              { icon: Layers, val: '12+', label: 'Technologies' },
              { icon: Trophy, val: '1', label: 'Major Award' },
              { icon: Award, val: '3', label: 'Certifications' },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-panel rounded-xl px-3 py-2.5 flex items-center gap-2.5 border border-gold/25"
              >
                <item.icon className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <div className="font-display text-sm font-bold text-pure leading-none">
                    {item.val}
                  </div>
                  <div className="font-mono text-[9px] text-mist mt-1">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Expertise Pills Card */}
          <div className="glass-panel rounded-2xl p-3.5 border border-gold/25 space-y-2.5">
            <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
              <span className="text-gold font-mono">&lt;/&gt;</span>
              <span>Technical Expertise</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TECH_PILLS.map((t) => (
                <div
                  key={t.name}
                  className="px-2.5 py-1 rounded-lg bg-obsidian/90 border border-gold/20 flex items-center gap-1.5 text-[11px] font-medium text-pure"
                >
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </div>
              ))}
              <div className="px-2.5 py-1 rounded-lg bg-obsidian/90 border border-gold/20 text-[11px] font-mono text-gold">
                •••
              </div>
            </div>
          </div>

          {/* Bottom Split: My Journey Timeline + Key Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* My Journey */}
            <div className="glass-panel rounded-2xl p-3.5 border border-gold/25 space-y-2.5">
              <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
                <span className="text-gold">📊</span>
                <span>My Journey</span>
              </div>

              <div className="relative pl-3.5 border-l-2 border-gold/40 space-y-2.5">
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
                  <div key={i} className="relative text-[11px]">
                    <span className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-gold shadow-gold-glow" />
                    <div className="font-mono text-[9.5px] font-semibold text-gold">
                      {step.year}
                    </div>
                    <div className="text-pure font-medium leading-tight">{step.title}</div>
                    <div className="text-[10px] text-mist">{step.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="glass-panel rounded-2xl p-3.5 border border-gold/25 space-y-2.5">
              <div className="flex items-center gap-2 font-display text-xs font-semibold text-pure">
                <Trophy className="w-3.5 h-3.5 text-gold" />
                <span>Key Highlights</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-start gap-2">
                  <Award className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure leading-tight">Best Performance Award</div>
                    <div className="text-[10px] text-mist">During ML Internship at EduExpose</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Layers className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure leading-tight">2 Coursera Specializations</div>
                    <div className="text-[10px] text-mist">(8 courses) – University of Colorado</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Code2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure leading-tight">3 End-to-End Projects</div>
                    <div className="text-[10px] text-mist">NLP, Computer Vision and CNN</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure leading-tight">B.Tech – CSE (AI & ML)</div>
                    <div className="text-[10px] text-mist">Lovely Professional University</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: 3D GOLDEN CV HOLOGRAM OR WHITE SINGLE-PAGE CV
           ============================================================ */}
        <div className="lg:col-span-6 flex items-center justify-center relative h-[555px] pointer-events-auto">
          {!isCvPaperOpen ? (
            /* STAGE 1: Unobstructed 3D Golden CV Hologram with clean click trigger */
            <div
              onClick={() => setCvPaperOpen(true)}
              className="w-full h-full flex flex-col items-center justify-end pb-6 cursor-pointer group"
            >
              <button
                type="button"
                className="glass-panel px-5 py-2.5 rounded-full border border-gold shadow-gold-glow flex items-center gap-2.5 group-hover:scale-105 transition-transform"
              >
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                <span className="font-display text-xs font-semibold text-pure">
                  Click 3D Golden CV to Open White Format
                </span>
              </button>
            </div>
          ) : (
            /* STAGE 2: Single-Page White Curriculum Vitae (Fits all 6 sections without scrolling!) */
            <div
              className={`${
                isFullscreen
                  ? 'fixed inset-4 z-50 max-w-4xl mx-auto overflow-y-auto'
                  : 'w-full'
              } bg-[#0c1220]/95 backdrop-blur-xl rounded-2xl p-3.5 border-2 border-gold shadow-[0_0_55px_rgba(234,183,103,0.3)] flex flex-col animate-fadeIn`}
            >
              {/* Clean Top Header Bar matching image_de1a7e.jpg */}
              <div className="flex items-center justify-between pb-2.5 mb-2 px-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold" />
                  <span className="font-display text-sm font-semibold text-pure">
                    Curriculum Vitae
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCvPaperOpen(false)}
                    className="px-2.5 py-1 rounded-lg bg-obsidian border border-gold/30 font-mono text-[10px] text-gold hover:bg-gold/15 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>3D View</span>
                  </button>

                  <button
                    onClick={() => setIsFullscreen((prev) => !prev)}
                    className="px-3 py-1 rounded-lg bg-obsidian border border-gold/25 font-mono text-[10px] text-pure hover:border-gold flex items-center gap-1.5"
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="w-3 h-3 text-gold" />
                        <span>Exit</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3 h-3 text-gold" />
                        <span>Fullscreen</span>
                      </>
                    )}
                  </button>

                  <a
                    href="/cv/Gorrela_Sai_Maneesh_CV.pdf"
                    download
                    className="p-1.5 rounded-lg bg-obsidian border border-gold/30 text-gold hover:bg-gold hover:text-space transition-colors"
                    title="Download CV PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Crisp White Paper Sheet — All 6 Sections Visible at Once */}
              <div className="bg-[#FAF8F5] text-[#111827] rounded-xl px-5 py-3.5 space-y-2 shadow-inner relative overflow-hidden">
                {/* Gold Corner Ribbon Accent */}
                <div className="absolute top-0 right-0 w-14 h-14 overflow-hidden pointer-events-none">
                  <div className="w-20 h-5 bg-gradient-to-r from-[#EAB767] to-[#C5A46D] rotate-45 translate-x-3 -translate-y-1 shadow" />
                </div>

                {/* CV Header */}
                <div className="border-b border-gray-300 pb-2">
                  <h2 className="font-display text-lg font-bold text-[#0f172a] leading-tight">
                    Gorrela Sai Maneesh
                  </h2>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1 text-[9.5px] text-gray-700 font-medium">
                    <a
                      href="https://linkedin.com/in/sai-maneesh"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-amber-700 truncate"
                    >
                      <Linkedin className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>linkedin.com/in/sai-maneesh</span>
                    </a>
                    <a
                      href="mailto:ssai68352@gmail.com"
                      className="flex items-center gap-1 hover:text-amber-700 truncate"
                    >
                      <Mail className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>ssai68352@gmail.com</span>
                    </a>
                    <a
                      href="https://github.com/Saimaneesh13"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-amber-700 truncate"
                    >
                      <Github className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>github.com/Saimaneesh13</span>
                    </a>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>+91 6281433838</span>
                    </div>
                  </div>
                </div>

                {/* 1. SKILLS */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-0.5">
                    <Code2 className="w-3 h-3 text-amber-600" />
                    <span>SKILLS</span>
                  </div>
                  <div className="grid grid-cols-12 gap-y-0.5 text-[9px] leading-tight pt-0.5">
                    <div className="col-span-4 font-semibold text-gray-800">Languages:</div>
                    <div className="col-span-8 text-gray-700">Python, Java, SQL, HTML5, CSS3</div>

                    <div className="col-span-4 font-semibold text-gray-800">Backend & Frameworks:</div>
                    <div className="col-span-8 text-gray-700">Flask, FastAPI, REST APIs, Tkinter, JavaFX</div>

                    <div className="col-span-4 font-semibold text-gray-800">AI & Machine Learning:</div>
                    <div className="col-span-8 text-gray-700">
                      Scikit-learn, TensorFlow, Keras, OpenCV, NLP, BERTopic, LDA, UMAP, HDBSCAN
                    </div>

                    <div className="col-span-4 font-semibold text-gray-800">Data & Visualization:</div>
                    <div className="col-span-8 text-gray-700">Pandas, NumPy, Streamlit, Plotly, SQLite</div>

                    <div className="col-span-4 font-semibold text-gray-800">Tools & Platforms:</div>
                    <div className="col-span-8 text-gray-700">Git, GitHub, VS Code, Jupyter</div>

                    <div className="col-span-4 font-semibold text-gray-800">Core CS:</div>
                    <div className="col-span-8 text-gray-700">
                      OOP, Data Structures, Computer Networking (TCP/IP), Data Preprocessing, Model Evaluation
                    </div>

                    <div className="col-span-4 font-semibold text-gray-800">Soft Skills:</div>
                    <div className="col-span-8 text-gray-700">
                      Leadership, Problem-Solving, Communication, Project Management, Creativity, Team work
                    </div>
                  </div>
                </div>

                {/* 2. INTERNSHIP */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-0.5">
                    <Briefcase className="w-3 h-3 text-amber-600" />
                    <span>INTERNSHIP</span>
                  </div>
                  <div className="flex items-center justify-between text-[9.5px] font-bold text-gray-900 pt-0.5">
                    <span>• EduExpose | Machine Learning Intern</span>
                    <span className="font-mono text-[8.5px] text-gray-700">Dec 2025 – Feb 2026</span>
                  </div>
                  <ul className="list-disc list-inside text-[8.8px] text-gray-700 leading-tight space-y-0.5 pl-1">
                    <li>Completed a 3-month applied Machine Learning internship covering the full model lifecycle.</li>
                    <li>Implemented and compared supervised and unsupervised algorithms for predictive modeling.</li>
                    <li>Practiced feature engineering, cross-validation, and hyperparameter tuning to improve performance.</li>
                  </ul>
                </div>

                {/* 3. PROJECTS */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-0.5">
                    <FolderGit2 className="w-3 h-3 text-amber-600" />
                    <span>PROJECTS</span>
                  </div>
                  <ul className="text-[8.8px] text-gray-700 leading-tight space-y-0.5 pt-0.5">
                    <li>
                      <strong className="text-gray-900">• AI-Based Disaster Intelligence System:</strong>{' '}
                      Unsupervised NLP Topic Discovery & Urgency Classification
                    </li>
                    <li>
                      <strong className="text-gray-900">• Face Recognition Attendance System:</strong>{' '}
                      Real-Time Computer Vision Attendance Automation
                    </li>
                    <li>
                      <strong className="text-gray-900">• AgroDetect AI:</strong> CNN-Based Crop Disease Detection System
                    </li>
                  </ul>
                </div>

                {/* 4. ACHIEVEMENTS */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-0.5">
                    <Trophy className="w-3 h-3 text-amber-600" />
                    <span>ACHIEVEMENTS</span>
                  </div>
                  <ul className="list-disc list-inside text-[8.8px] text-gray-700 leading-tight space-y-0.5 pl-1 pt-0.5">
                    <li>Received the Best Award for outstanding, result-oriented performance during the ML Internship.</li>
                    <li>Completed 2 Coursera Specializations (8 courses total) from the University of Colorado.</li>
                    <li>Designed, built, and publicly maintain 3 end-to-end AI/ML and computer-vision projects on GitHub.</li>
                  </ul>
                </div>

                {/* 5. CERTIFICATIONS */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-0.5">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" />
                    <span>CERTIFICATIONS</span>
                  </div>
                  <div className="space-y-0.5 text-[8.8px] text-gray-700 leading-tight pt-0.5">
                    <div className="flex justify-between">
                      <span>• Computer Communications – University of Colorado, Colorado Springs (Coursera)</span>
                      <span className="font-semibold text-gray-900 shrink-0 ml-2">Nov 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Interpersonal Communication for Engineering Leaders – Rice University (Coursera)</span>
                      <span className="font-semibold text-gray-900 shrink-0 ml-2">Apr 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Computational Theory: Language Principle & Finite Automata Theory – Infosys</span>
                      <span className="font-semibold text-gray-900 shrink-0 ml-2">Aug 2025</span>
                    </div>
                  </div>
                </div>

                {/* 6. EDUCATION */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-0.5">
                    <GraduationCap className="w-3 h-3 text-amber-600" />
                    <span>EDUCATION</span>
                  </div>
                  <div className="space-y-0.5 text-[8.8px] text-gray-700 leading-tight pt-0.5">
                    <div className="flex justify-between">
                      <span>
                        <strong className="text-gray-900">• Lovely Professional University</strong> – B.Tech in Computer Science & Engineering (AI & ML)
                      </span>
                      <span className="font-semibold text-gray-900 shrink-0 ml-2">Aug 2023 – Present</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        <strong className="text-gray-900">• Narayana Junior College</strong> – Intermediate – PCM
                      </span>
                      <span className="font-semibold text-gray-900 shrink-0 ml-2">Apr 2021 – Mar 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
