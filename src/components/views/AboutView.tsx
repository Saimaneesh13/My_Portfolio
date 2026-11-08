import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Layers,
  Trophy,
  Award,
  FileText,
  Maximize2,
  Minimize2,
  Download,
  ExternalLink,
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
  const [viewMode, setViewMode] = useState<'original-pdf' | 'typeset'>('original-pdf')

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
            RIGHT COLUMN: 3D HOLOGRAM OR ORIGINAL CV CARD
           ============================================================ */}
        <div className="lg:col-span-6 flex items-center justify-center relative h-[545px] pointer-events-auto">
          <AnimatePresence mode="wait">
            {!isCvPaperOpen ? (
              /* STAGE 1: 3D Golden CV Hologram Hotspot */
              <motion.div
                key="hologram"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={() => setCvPaperOpen(true)}
                className="w-full max-w-[620px] h-[545px] flex flex-col items-center justify-end pb-4 cursor-pointer group"
              >
                <button
                  type="button"
                  className="glass-panel px-5 py-2.5 rounded-full border border-gold shadow-gold-glow flex items-center gap-2.5 group-hover:scale-105 transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                  <span className="font-display text-xs font-semibold text-pure">
                    Click 3D Golden CV to Open Original CV
                  </span>
                </button>
              </motion.div>
            ) : (
              /* STAGE 2: Original Uploaded Curriculum Vitae Document */
              <motion.div
                key="white-card"
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                className={`${
                  isFullscreen
                    ? 'fixed inset-4 z-50 max-w-5xl mx-auto h-[92vh]'
                    : 'w-full max-w-[620px] h-[545px]'
                } bg-[#0c1220]/95 backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 border-2 border-gold shadow-[0_0_55px_rgba(234,183,103,0.3)] flex flex-col justify-between`}
              >
                {/* Top Header Bar */}
                <div className="flex items-center justify-between pb-2 mb-1.5 px-1 border-b border-gold/20">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gold" />
                    <span className="font-display text-sm font-semibold text-pure">
                      Curriculum Vitae
                    </span>

                    {/* Mode Toggle: Original PDF Embed vs Typeset */}
                    <div className="flex items-center gap-1 bg-obsidian/90 p-0.5 rounded-lg border border-gold/25 ml-2">
                      <button
                        onClick={() => setViewMode('original-pdf')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          viewMode === 'original-pdf'
                            ? 'bg-gold text-space font-semibold'
                            : 'text-mist hover:text-pure'
                        }`}
                        title="Display your actual uploaded PDF document 1:1"
                      >
                        Original PDF
                      </button>
                      <button
                        onClick={() => setViewMode('typeset')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          viewMode === 'typeset'
                            ? 'bg-gold text-space font-semibold'
                            : 'text-mist hover:text-pure'
                        }`}
                        title="Display rendered text view"
                      >
                        Interactive
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCvPaperOpen(false)}
                      className="px-2.5 py-1 rounded-lg bg-obsidian border border-gold/30 font-mono text-[10px] text-gold hover:bg-gold/15 flex items-center gap-1 transition-colors"
                      title="Return to 3D Golden CV Hologram"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span className="hidden sm:inline">3D Core</span>
                    </button>

                    <button
                      onClick={() => setIsFullscreen((prev) => !prev)}
                      className="px-2.5 py-1 rounded-lg bg-obsidian border border-gold/25 font-mono text-[10px] text-pure hover:border-gold flex items-center gap-1 transition-colors"
                      title="Toggle Fullscreen"
                    >
                      {isFullscreen ? (
                        <>
                          <Minimize2 className="w-3 h-3 text-gold" />
                          <span className="hidden sm:inline">Exit</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-3 h-3 text-gold" />
                          <span className="hidden sm:inline">Fullscreen</span>
                        </>
                      )}
                    </button>

                    <a
                      href="/cv/Gorrela_Sai_Maneesh_CV.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-obsidian border border-gold/30 text-gold hover:bg-gold hover:text-space transition-colors"
                      title="Open Original PDF in New Tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="/cv/Gorrela_Sai_Maneesh_CV.pdf"
                      download="Gorrela_Sai_Maneesh_CV.pdf"
                      className="p-1.5 rounded-lg bg-gold text-space hover:brightness-110 transition-colors flex items-center gap-1 text-[11px] font-semibold px-2"
                      title="Download Original PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </a>
                  </div>
                </div>

                {/* Document Display Area */}
                {viewMode === 'original-pdf' ? (
                  /* 100% UNTOUCHED ORIGINAL UPLOADED PDF EMBED */
                  <div className="flex-1 w-full h-[475px] rounded-xl overflow-hidden bg-white border border-gray-300 relative shadow-inner">
                    <iframe
                      src="/cv/Gorrela_Sai_Maneesh_CV.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                      className="w-full h-full border-none"
                      title="Gorrela Sai Maneesh - Original Curriculum Vitae"
                    />
                  </div>
                ) : (
                  /* 100% EXACT TYPESET VERSION (With all projects, bullets, stacks, and credentials) */
                  <div className="bg-[#FAF8F5] text-[#111827] rounded-xl px-5 py-4 overflow-y-auto max-h-[475px] space-y-3.5 shadow-inner relative font-sans text-[11px] leading-relaxed">
                    {/* Gold Corner Ribbon Accent */}
                    <div className="absolute top-0 right-0 w-14 h-14 overflow-hidden pointer-events-none">
                      <div className="w-20 h-5 bg-gradient-to-r from-[#EAB767] to-[#C5A46D] rotate-45 translate-x-3 -translate-y-1 shadow" />
                    </div>

                    {/* CV Header */}
                    <div className="border-b-2 border-gray-900 pb-2">
                      <h2 className="font-serif text-2xl font-bold tracking-tight text-[#0f172a] leading-tight">
                        Gorrela Sai Maneesh
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 mt-1.5 text-[10.5px] text-gray-700 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Linkedin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                          <span className="font-semibold text-gray-900">LinkedIn:</span>
                          <a
                            href="https://linkedin.com/in/sai-maneesh"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 hover:underline"
                          >
                            linkedin.com/in/sai-maneesh
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 sm:justify-end">
                          <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                          <span className="font-semibold text-gray-900">Email:</span>
                          <a
                            href="mailto:ssai68352@gmail.com"
                            className="text-blue-700 hover:underline"
                          >
                            ssai68352@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5 text-gray-900 shrink-0" />
                          <span className="font-semibold text-gray-900">GitHub:</span>
                          <a
                            href="https://github.com/Saimaneesh13"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 hover:underline"
                          >
                            github.com/Saimaneesh13
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 sm:justify-end">
                          <Phone className="w-3.5 h-3.5 text-gray-900 shrink-0" />
                          <span className="font-semibold text-gray-900">Mobile:</span>
                          <a href="tel:+916281433838" className="text-gray-900 hover:underline">
                            +91 6281433838
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* 1. SKILLS */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-serif text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-400 pb-0.5">
                        <Code2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>SKILLS</span>
                      </div>
                      <div className="grid grid-cols-12 gap-y-1 text-[10.5px] leading-snug pt-0.5">
                        <div className="col-span-4 font-semibold text-gray-900">Languages:</div>
                        <div className="col-span-8 text-gray-800">Python, Java, SQL, HTML5, CSS3</div>

                        <div className="col-span-4 font-semibold text-gray-900">Backend & Frameworks:</div>
                        <div className="col-span-8 text-gray-800">Flask, FastAPI, REST APIs, Tkinter, JavaFX</div>

                        <div className="col-span-4 font-semibold text-gray-900">AI & Machine Learning:</div>
                        <div className="col-span-8 text-gray-800">
                          Scikit-learn, TensorFlow, Keras, OpenCV, NLP, BERTopic, LDA, UMAP, HDBSCAN
                        </div>

                        <div className="col-span-4 font-semibold text-gray-900">Data & Visualization:</div>
                        <div className="col-span-8 text-gray-800">Pandas, NumPy, Streamlit, Plotly, SQLite</div>

                        <div className="col-span-4 font-semibold text-gray-900">Tools & Platforms:</div>
                        <div className="col-span-8 text-gray-800">Git, GitHub, VS Code, Jupyter</div>

                        <div className="col-span-4 font-semibold text-gray-900">Core CS:</div>
                        <div className="col-span-8 text-gray-800">
                          OOP, Data Structures, Computer Networking (TCP/IP), Data Preprocessing, Model Evaluation
                        </div>

                        <div className="col-span-4 font-semibold text-gray-900">Soft Skills:</div>
                        <div className="col-span-8 text-gray-800">
                          Leadership, Problem-Solving, Communication, Project Management, Creativity, Team work
                        </div>
                      </div>
                    </div>

                    {/* 2. INTERNSHIP */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-serif text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-400 pb-0.5">
                        <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                        <span>INTERNSHIP</span>
                      </div>
                      <div className="flex items-baseline justify-between text-[11px] pt-0.5">
                        <div>
                          <strong className="text-gray-900">EduExpose</strong>
                          <span className="text-gray-700 italic ml-1">| Machine Learning Intern</span>
                        </div>
                        <span className="font-medium text-gray-800 text-[10.5px]">Dec 2025 – Feb 2026</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-gray-800">
                        <li>
                          Completed a 3-month applied Machine Learning internship covering the full model lifecycle: development, evaluation, and optimization on real-world datasets
                        </li>
                        <li>
                          Implemented and compared supervised and unsupervised algorithms for predictive modeling and pattern discovery tasks
                        </li>
                        <li>
                          Practiced feature engineering, cross-validation, and hyperparameter tuning to improve model performance using Python and standard ML frameworks
                        </li>
                      </ul>
                    </div>

                    {/* 3. PROJECTS */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 font-serif text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-400 pb-0.5">
                        <FolderGit2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>PROJECTS</span>
                      </div>

                      {/* Project 1 */}
                      <div className="space-y-0.5">
                        <div className="flex items-baseline justify-between text-[11px]">
                          <div>
                            <strong className="text-gray-900">AI-Based Disaster Intelligence System:</strong>{' '}
                            <span className="text-gray-800">Unsupervised NLP Topic Discovery & Urgency Classification</span>{' '}
                            <span className="text-gray-400">|</span>{' '}
                            <a
                              href="https://github.com/Saimaneesh13"
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-700 hover:underline font-medium"
                            >
                              GitHub
                            </a>
                          </div>
                          <span className="font-medium text-gray-800 text-[10.5px] shrink-0 ml-2">
                            Apr 2026 – May 2026
                          </span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-gray-800">
                          <li>
                            Built a hybrid BERTopic + LDA NLP pipeline for unsupervised topic discovery and clustering of unstructured disaster-related text, combining sentence-transformer embeddings with UMAP dimensionality reduction and HDBSCAN density-based clustering
                          </li>
                          <li>
                            Developed a real-time urgency intelligence engine to classify and prioritize disaster-related reports by severity, enabling faster triage of high-impact events
                          </li>
                          <li>
                            Designed an interactive Streamlit dashboard with Plotly visual analytics for live topic monitoring and data summarization, and exposed the pipeline through a FastAPI service for programmatic access
                          </li>
                        </ul>
                        <div className="text-[10px] text-gray-700 font-mono pl-4 pt-0.5">
                          <strong className="text-gray-900">Tech Stack:</strong> Python, BERTopic, spaCy, Sentence-Transformers, UMAP, HDBSCAN, FAISS, Streamlit, FastAPI, Plotly, Pandas
                        </div>
                      </div>

                      {/* Project 2 */}
                      <div className="space-y-0.5 pt-1">
                        <div className="flex items-baseline justify-between text-[11px]">
                          <div>
                            <strong className="text-gray-900">Face Recognition Attendance System:</strong>{' '}
                            <span className="text-gray-800">Real-Time Computer Vision Attendance Automation</span>{' '}
                            <span className="text-gray-400">|</span>{' '}
                            <a
                              href="https://github.com/Saimaneesh13"
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-700 hover:underline font-medium"
                            >
                              GitHub
                            </a>
                          </div>
                          <span className="font-medium text-gray-800 text-[10.5px] shrink-0 ml-2">
                            Feb 2026 – Mar 2026
                          </span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-gray-800">
                          <li>
                            Built a real-time face recognition attendance system with Flask and OpenCV, detecting and matching faces via live webcam feed using the face_recognition library
                          </li>
                          <li>
                            Implemented student registration with persisted face-encoding storage and automated attendance logging (name, ID, department, date, time, confidence score) to a SQLite database
                          </li>
                          <li>
                            Designed a Bootstrap-based live dashboard for attendance monitoring and history review, improving reliability through optimized image-processing and identification thresholds
                          </li>
                        </ul>
                        <div className="text-[10px] text-gray-700 font-mono pl-4 pt-0.5">
                          <strong className="text-gray-900">Tech Stack:</strong> Python, Flask, OpenCV, face_recognition, NumPy, SQLite, Bootstrap 5
                        </div>
                      </div>

                      {/* Project 3 */}
                      <div className="space-y-0.5 pt-1">
                        <div className="flex items-baseline justify-between text-[11px]">
                          <div>
                            <strong className="text-gray-900">AgroDetect AI:</strong>{' '}
                            <span className="text-gray-800">CNN-Based Crop Disease Detection System</span>{' '}
                            <span className="text-gray-400">|</span>{' '}
                            <a
                              href="https://github.com/Saimaneesh13"
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-700 hover:underline font-medium"
                            >
                              GitHub
                            </a>
                          </div>
                          <span className="font-medium text-gray-800 text-[10.5px] shrink-0 ml-2">
                            Jan 2026 – Feb 2026
                          </span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-gray-800">
                          <li>
                            Developed a crop disease detection model with a TensorFlow/Keras CNN, achieving 90%+ classification accuracy on plant-leaf image data
                          </li>
                          <li>
                            Applied data preprocessing, augmentation, and feature-engineering pipelines with Scikit-learn and Pandas to reduce overfitting and improve validation accuracy
                          </li>
                          <li>
                            Exposed model inference through a FastAPI backend with a Streamlit interface for rapid demo and testing
                          </li>
                        </ul>
                        <div className="text-[10px] text-gray-700 font-mono pl-4 pt-0.5">
                          <strong className="text-gray-900">Tech Stack:</strong> Python, TensorFlow, Keras, Scikit-learn, OpenCV, FastAPI, Streamlit, Pandas, NumPy
                        </div>
                      </div>
                    </div>

                    {/* 4. ACHIEVEMENTS */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-serif text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-400 pb-0.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-700" />
                        <span>ACHIEVEMENTS</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-gray-800">
                        <li>
                          Received the <strong className="text-gray-900">Best Award</strong> for outstanding, result-oriented performance during the Machine Learning internship at EduExpose
                        </li>
                        <li>
                          Completed <strong className="text-gray-900">2 Coursera Specializations</strong> (8 courses total) from the University of Colorado, Colorado Springs
                        </li>
                        <li>
                          Designed, built, and publicly maintain <strong className="text-gray-900">3 end-to-end AI/ML and computer-vision projects</strong> on GitHub spanning NLP, CNNs, and real-time inference
                        </li>
                      </ul>
                    </div>

                    {/* 5. CERTIFICATIONS */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-serif text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-400 pb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>CERTIFICATIONS</span>
                      </div>
                      <div className="space-y-1 text-[10.5px] text-gray-800">
                        <div className="flex justify-between items-baseline">
                          <span>• <strong className="text-gray-900">Computer Communications</strong> – 4-course Specialization, University of Colorado, Colorado Springs (Coursera)</span>
                          <span className="font-medium text-gray-800 text-[10.5px] shrink-0 ml-2">Nov 2024</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span>• <strong className="text-gray-900">Interpersonal Communication for Engineering Leaders</strong> – Rice University (Coursera)</span>
                          <span className="font-medium text-gray-800 text-[10.5px] shrink-0 ml-2">Apr 2026</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span>• <strong className="text-gray-900">Computational Theory: Language Principle & Finite Automata Theory</strong> – Infosys Springboard</span>
                          <span className="font-medium text-gray-800 text-[10.5px] shrink-0 ml-2">Aug 2025</span>
                        </div>
                      </div>
                    </div>

                    {/* 6. EDUCATION */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-serif text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-gray-400 pb-0.5">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                        <span>EDUCATION</span>
                      </div>
                      <div className="space-y-1.5 text-[10.5px]">
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <strong className="text-gray-900 text-[11px]">Lovely Professional University</strong>
                            <span className="text-gray-700 italic">Punjab, India</span>
                          </div>
                          <div className="flex justify-between items-baseline text-gray-800">
                            <span>Bachelor of Technology – Computer Science and Engineering</span>
                            <span className="font-medium text-gray-800 text-[10.5px]">Aug 2023 – Present</span>
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <strong className="text-gray-900 text-[11px]">Narayana Junior College</strong>
                            <span className="text-gray-700 italic">Bhimavaram, Andhra Pradesh</span>
                          </div>
                          <div className="flex justify-between items-baseline text-gray-800">
                            <span>Intermediate – PCM</span>
                            <span className="font-medium text-gray-800 text-[10.5px]">Apr 2021 – Mar 2023</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
