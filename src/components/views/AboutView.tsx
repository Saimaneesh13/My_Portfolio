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
    <div className="min-h-screen max-w-[1340px] mx-auto px-4 sm:px-8 pt-24 pb-20 flex items-center pointer-events-none select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* ============================================================
            LEFT COLUMN: 05 // ABOUT ME, STATS, TECH, JOURNEY, HIGHLIGHTS
           ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 pointer-events-auto">
          {/* Header & Bio */}
          <div className="space-y-2">
            <div className="mono-label text-gold">// 05 // ABOUT ME</div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-pure">
              Gorrela Sai Maneesh
            </h1>
            <div className="font-display text-lg sm:text-xl font-semibold text-gold">
              AI / ML Engineer
            </div>
            <div className="font-mono text-xs text-pure/90 tracking-wide">
              Software Developer <span className="text-gold mx-1">•</span> Computer Vision{' '}
              <span className="text-gold mx-1">•</span> NLP
            </div>
            <p className="text-xs sm:text-sm text-mist leading-relaxed pt-1 max-w-xl">
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
                className="glass-panel rounded-xl px-3.5 py-2.5 flex items-center gap-3 border border-gold/25"
              >
                <item.icon className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <div className="font-display text-base font-bold text-pure leading-none">
                    {item.val}
                  </div>
                  <div className="font-mono text-[10px] text-mist mt-1">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Expertise Pills Card */}
          <div className="glass-panel rounded-2xl p-4 border border-gold/25 space-y-3">
            <div className="flex items-center gap-2 font-display text-sm font-semibold text-pure">
              <span className="text-gold font-mono">&lt;/&gt;</span>
              <span>Technical Expertise</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_PILLS.map((t) => (
                <div
                  key={t.name}
                  className="px-3 py-1.5 rounded-lg bg-obsidian/90 border border-gold/20 flex items-center gap-2 text-xs font-medium text-pure"
                >
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </div>
              ))}
              <div className="px-3 py-1.5 rounded-lg bg-obsidian/90 border border-gold/20 text-xs font-mono text-gold">
                •••
              </div>
            </div>
          </div>

          {/* Bottom Split: My Journey Timeline + Key Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* My Journey */}
            <div className="glass-panel rounded-2xl p-4 border border-gold/25 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm font-semibold text-pure">
                <span className="text-gold">📊</span>
                <span>My Journey</span>
              </div>

              <div className="relative pl-4 border-l-2 border-gold/40 space-y-3">
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
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gold shadow-gold-glow" />
                    <div className="font-mono text-[10px] font-semibold text-gold">
                      {step.year}
                    </div>
                    <div className="text-pure font-medium leading-snug">{step.title}</div>
                    <div className="text-[11px] text-mist">{step.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="glass-panel rounded-2xl p-4 border border-gold/25 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm font-semibold text-pure">
                <Trophy className="w-4 h-4 text-gold" />
                <span>Key Highlights</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure">Best Performance Award</div>
                    <div className="text-[11px] text-mist">During ML Internship at EduExpose</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure">2 Coursera Specializations</div>
                    <div className="text-[11px] text-mist">(8 courses) – University of Colorado</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Code2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-pure">3 End-to-End Projects</div>
                    <div className="text-[11px] text-mist">NLP, Computer Vision and CNN</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
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
            RIGHT COLUMN: 3D GOLDEN CV HOLOGRAM -> CLICK FOR WHITE CV
           ============================================================ */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[540px] pointer-events-auto">
          {!isCvPaperOpen ? (
            /* STAGE 1: Interactive Hotspot over the 3D Golden CV Hologram */
            <div
              onClick={() => setCvPaperOpen(true)}
              className="w-full h-full min-h-[520px] rounded-2xl border border-dashed border-gold/35 hover:border-gold/80 bg-space/10 hover:bg-gold/5 transition-all cursor-pointer flex flex-col items-center justify-end p-6 group relative"
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-obsidian/80 border border-gold/30 font-mono text-[10px] text-gold">
                3D GOLDEN CV HOLOGRAM ACTIVE
              </div>

              <div className="glass-panel px-6 py-3.5 rounded-2xl border border-gold shadow-gold-glow flex items-center gap-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                <div className="text-left">
                  <div className="font-display text-xs font-semibold text-pure">
                    Click 3D CV Core to Open White CV Format
                  </div>
                  <div className="font-mono text-[10px] text-gold">
                    Interactive Hologram → Standard Document View
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STAGE 2: White Paper Curriculum Vitae Format (Matches image_de1a7e.jpg) */
            <div
              className={`${
                isFullscreen
                  ? 'fixed inset-4 z-50 max-w-4xl mx-auto'
                  : 'w-full max-h-[600px]'
              } glass-panel rounded-2xl p-3 sm:p-4 border-2 border-gold shadow-[0_0_55px_rgba(234,183,103,0.28)] flex flex-col animate-fadeIn`}
            >
              {/* Top Dark Frame Bar */}
              <div className="flex items-center justify-between pb-3 mb-2 px-1 border-b border-gold/25">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold" />
                  <span className="font-display text-sm font-semibold text-pure">
                    Curriculum Vitae
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCvPaperOpen(false)}
                    className="px-2.5 py-1 rounded-lg bg-obsidian border border-gold/35 font-mono text-[10px] text-gold hover:bg-gold/15 flex items-center gap-1"
                    title="Morph back into 3D Golden CV Hologram"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>3D Core CV</span>
                  </button>

                  <button
                    onClick={() => setIsFullscreen((prev) => !prev)}
                    className="px-2.5 py-1 rounded-lg bg-obsidian border border-gold/25 font-mono text-[10px] text-pure hover:border-gold flex items-center gap-1"
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
                    className="p-1.5 rounded-lg bg-gold text-space hover:brightness-110"
                    title="Download CV PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Crisp White Paper Sheet */}
              <div className="bg-[#FAF8F5] text-[#111827] rounded-xl p-5 sm:p-6 overflow-y-auto space-y-3.5 shadow-inner relative">
                {/* Gold Corner Ribbon Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                  <div className="w-24 h-6 bg-gradient-to-r from-[#EAB767] to-[#C5A46D] rotate-45 translate-x-4 -translate-y-1 shadow" />
                </div>

                {/* CV Header */}
                <div className="border-b border-gray-300 pb-3">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0f172a]">
                    Gorrela Sai Maneesh
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2 text-[11px] text-gray-700 font-medium">
                    <a
                      href="https://linkedin.com/in/sai-maneesh"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 hover:text-amber-700"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>linkedin.com/in/sai-maneesh</span>
                    </a>
                    <a
                      href="mailto:ssai68352@gmail.com"
                      className="flex items-center gap-1.5 hover:text-amber-700"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>ssai68352@gmail.com</span>
                    </a>
                    <a
                      href="https://github.com/Saimaneesh13"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 hover:text-amber-700"
                    >
                      <Github className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>github.com/Saimaneesh13</span>
                    </a>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>+91 6281433838</span>
                    </div>
                  </div>
                </div>

                {/* SKILLS */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-1">
                    <Code2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>SKILLS</span>
                  </div>
                  <div className="grid grid-cols-12 gap-y-1 text-[10.5px] leading-snug">
                    <div className="col-span-4 font-semibold text-gray-800">Languages:</div>
                    <div className="col-span-8 text-gray-700">Python, Java, SQL, HTML5, CSS3</div>

                    <div className="col-span-4 font-semibold text-gray-800">Backend & Frameworks:</div>
                    <div className="col-span-8 text-gray-700">Flask, FastAPI, REST APIs, Tkinter, JavaFX</div>

                    <div className="col-span-4 font-semibold text-gray-800">AI & Machine Learning:</div>
                    <div className="col-span-8 text-gray-700">
                      Scikit-learn, TensorFlow, Keras, OpenCV, NLP, BERTopic, LDA, UMAP, HDBSCAN
                    </div>

                    <div className="col-span-4 font-semibold text-gray-800">Data & Visualization:</div>
                    <div className="col-span-8 text-gray-700">
                      Pandas, NumPy, Streamlit, Plotly, SQLite
                    </div>

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

                {/* INTERNSHIP */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                    <span>INTERNSHIP</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-900">
                    <span>• EduExpose | Machine Learning Intern</span>
                    <span className="font-mono text-[10px] text-gray-700">Dec 2025 – Feb 2026</span>
                  </div>
                  <ul className="list-disc list-inside text-[10.5px] text-gray-700 space-y-0.5 pl-1">
                    <li>Completed a 3-month applied Machine Learning internship covering the full model lifecycle.</li>
                    <li>Implemented and compared supervised and unsupervised algorithms for predictive modeling.</li>
                    <li>Practiced feature engineering, cross-validation, and hyperparameter tuning to improve performance.</li>
                  </ul>
                </div>

                {/* PROJECTS */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-1">
                    <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>PROJECTS</span>
                  </div>
                  <ul className="text-[10.5px] text-gray-700 space-y-0.5">
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

                {/* ACHIEVEMENTS */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                    <span>ACHIEVEMENTS</span>
                  </div>
                  <ul className="list-disc list-inside text-[10.5px] text-gray-700 space-y-0.5 pl-1">
                    <li>Received the Best Award for outstanding, result-oriented performance during the ML Internship.</li>
                    <li>Completed 2 Coursera Specializations (8 courses total) from the University of Colorado.</li>
                    <li>Designed, built, and publicly maintain 3 end-to-end AI/ML and computer-vision projects on GitHub.</li>
                  </ul>
                </div>

                {/* CERTIFICATIONS */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>CERTIFICATIONS</span>
                  </div>
                  <div className="space-y-0.5 text-[10.5px] text-gray-700">
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

                {/* EDUCATION */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-300 pb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                    <span>EDUCATION</span>
                  </div>
                  <div className="space-y-0.5 text-[10.5px] text-gray-700">
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
