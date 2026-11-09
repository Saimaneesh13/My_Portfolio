import {
  Cpu,
  FileText,
  Camera,
  Code2,
  Layers,
  BarChart3,
  Rocket,
  Box,
  Server,
  Settings,
  BrainCircuit,
} from 'lucide-react'
import { useSceneStore } from '../../store/useSceneStore'

const RIGHT_TECH_GROUPS = [
  {
    category: 'Programming',
    icon: Code2,
    items: [
      { label: 'Py', bg: '#3776AB', title: 'Python' },
      { label: 'Jv', bg: '#E76F00', title: 'Java' },
      { label: 'SQL', bg: '#00758F', title: 'SQL' },
      { label: '5', bg: '#E34F26', title: 'HTML5' },
      { label: '3', bg: '#1572B6', title: 'CSS3' },
    ],
  },
  {
    category: 'AI / Machine Learning',
    icon: BrainCircuit,
    items: [
      { label: 'sk', bg: '#F7931E', title: 'scikit-learn' },
      { label: 'TF', bg: '#FF6F00', title: 'TensorFlow' },
      { label: 'K', bg: '#D00000', title: 'Keras' },
      { label: 'CV', bg: '#5C3EE8', title: 'OpenCV' },
      { label: 'Pt', bg: '#EE4C2C', title: 'PyTorch' },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: Server,
    items: [
      { label: 'Fl', bg: '#334155', title: 'Flask' },
      { label: '⚡', bg: '#009688', title: 'FastAPI' },
      { label: 'API', bg: '#475569', title: 'REST APIs' },
      { label: 'JvFX', bg: '#B45309', title: 'JavaFX' },
    ],
  },
  {
    category: 'Data & Visualization',
    icon: BarChart3,
    items: [
      { label: 'Pd', bg: '#150458', title: 'Pandas' },
      { label: 'Np', bg: '#013243', title: 'NumPy' },
      { label: 'Pl', bg: '#3F4F75', title: 'Plotly' },
      { label: 'St', bg: '#FF4B4B', title: 'Streamlit' },
      { label: 'DB', bg: '#0284C7', title: 'SQLite' },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: Settings,
    items: [
      { label: 'Git', bg: '#F05032', title: 'Git' },
      { label: 'GH', bg: '#24292E', title: 'GitHub' },
      { label: 'VS', bg: '#007ACC', title: 'VS Code' },
      { label: 'Jp', bg: '#F37626', title: 'Jupyter' },
      { label: '>_', bg: '#334155', title: 'Terminal' },
    ],
  },
]

const BOTTOM_CARDS = [
  {
    id: 'programming',
    title: 'Programming',
    icon: Code2,
    description: 'Core languages for algorithmic problem solving and application development.',
    tags: ['Python', 'Java', 'SQL'],
    projectTarget: 'face-attendance' as const,
  },
  {
    id: 'ai-ml',
    title: 'AI / ML',
    icon: BrainCircuit,
    description: 'End-to-end model training, deep learning and statistical evaluation pipelines.',
    tags: ['scikit-learn', 'TensorFlow', 'Keras'],
    projectTarget: 'agrodetect' as const,
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    icon: Camera,
    description: 'Image processing and real-time visual intelligence systems.',
    tags: ['OpenCV', 'face_recognition'],
    projectTarget: 'face-attendance' as const,
  },
  {
    id: 'nlp',
    title: 'NLP',
    icon: FileText,
    description: 'Unsupervised topic modeling, semantic vector analysis and text intelligence.',
    tags: ['BERTopic', 'LDA', 'UMAP', 'HDBSCAN'],
    projectTarget: 'disaster-nlp' as const,
  },
]

// Custom Golden Artwork Banner inside each of the 4 bottom cards (matching image_7c5e37.jpg)
function CardArtwork({ id }: { id: string }) {
  if (id === 'programming') {
    return (
      <div className="relative h-24 w-full rounded-xl bg-[#070b13]/90 border border-gold/25 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 60%, rgba(234,183,103,0.28) 0%, transparent 70%)',
          }}
        />
        <svg className="w-full h-full" viewBox="0 0 260 96">
          {/* Perspective grid & code screens */}
          <polygon
            points="35,18 95,12 88,72 28,78"
            fill="rgba(234,183,103,0.06)"
            stroke="rgba(234,183,103,0.35)"
            strokeWidth="1"
          />
          <polygon
            points="165,12 225,18 232,78 172,72"
            fill="rgba(234,183,103,0.06)"
            stroke="rgba(234,183,103,0.35)"
            strokeWidth="1"
          />
          <rect
            x="92"
            y="16"
            width="76"
            height="58"
            rx="6"
            fill="rgba(17,24,39,0.9)"
            stroke="#EAB767"
            strokeWidth="1.6"
          />
          <text
            x="130"
            y="53"
            textAnchor="middle"
            fill="#F7D9A0"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
            fontSize="24"
          >
            &lt;/&gt;
          </text>
        </svg>
      </div>
    )
  }

  if (id === 'ai-ml') {
    return (
      <div className="relative h-24 w-full rounded-xl bg-[#070b13]/90 border border-gold/25 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 55%, rgba(234,183,103,0.28) 0%, transparent 72%)',
          }}
        />
        <svg className="w-full h-full" viewBox="0 0 260 96">
          <path
            d="M10,74 Q45,65 75,36 T135,28 T195,52 T250,30"
            fill="none"
            stroke="#EAB767"
            strokeWidth="2"
          />
          <path
            d="M10,80 Q55,30 95,58 T165,22 T250,64"
            fill="none"
            stroke="rgba(247,217,160,0.65)"
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />
          {[
            [75, 36], [135, 28], [165, 22], [195, 52],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill="#F7D9A0" />
          ))}
        </svg>
      </div>
    )
  }

  if (id === 'cv') {
    return (
      <div className="relative h-24 w-full rounded-xl bg-[#070b13]/90 border border-gold/25 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(234,183,103,0.3) 0%, transparent 70%)',
          }}
        />
        <svg className="w-full h-full" viewBox="0 0 260 96">
          <path d="M72,26 L56,26 L56,42" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M188,26 L204,26 L204,42" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M72,74 L56,74 L56,58" fill="none" stroke="#EAB767" strokeWidth="2" />
          <path d="M188,74 L204,74 L204,58" fill="none" stroke="#EAB767" strokeWidth="2" />
          <circle cx="130" cy="50" r="28" fill="rgba(17,24,39,0.9)" stroke="#EAB767" strokeWidth="1.8" />
          <circle cx="130" cy="50" r="18" fill="none" stroke="rgba(247,217,160,0.55)" strokeWidth="1.2" strokeDasharray="4 3" />
          <circle cx="130" cy="50" r="8" fill="rgba(234,183,103,0.45)" stroke="#F7D9A0" strokeWidth="1.5" />
          <circle cx="133" cy="47" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative h-24 w-full rounded-xl bg-[#070b13]/90 border border-gold/25 overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(234,183,103,0.28) 0%, transparent 70%)',
        }}
      />
      <svg className="w-full h-full" viewBox="0 0 260 96">
        <g stroke="rgba(234,183,103,0.35)" strokeWidth="1">
          <line x1="48" y1="28" x2="96" y2="48" />
          <line x1="56" y1="68" x2="96" y2="48" />
          <line x1="212" y1="26" x2="164" y2="48" />
          <line x1="204" y1="70" x2="164" y2="48" />
        </g>
        {[
          [48, 28], [56, 68], [212, 26], [204, 70], [72, 22], [188, 74],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#EAB767" />
        ))}
        <rect
          x="94"
          y="30"
          width="72"
          height="36"
          rx="8"
          fill="rgba(17,24,39,0.92)"
          stroke="#EAB767"
          strokeWidth="1.6"
        />
        <text
          x="130"
          y="53"
          textAnchor="middle"
          fill="#F5F5F5"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="bold"
          fontSize="16"
          letterSpacing="1"
        >
          NLP
        </text>
      </svg>
    </div>
  )
}

export default function ExpertiseView() {
  const { setActiveCaseStudy } = useSceneStore()

  return (
    <div className="h-screen max-w-[1380px] mx-auto px-4 sm:px-8 pt-20 pb-6 flex flex-col justify-between overflow-hidden pointer-events-none select-none">
      {/* ============================================================
          TOP SECTION: LEFT METRICS + CENTER 3D BRAIN + RIGHT TECH STACK
         ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center flex-1 min-h-0">
        {/* LEFT COLUMN (3 Cols): Title & 4 Vertical Counters */}
        <div className="lg:col-span-3 space-y-4 pointer-events-auto">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[2px] text-gold">
              // EXPERTISE
            </div>
            <h1 className="font-display text-3xl sm:text-[40px] font-bold tracking-tight text-pure leading-[1.06] mt-1">
              Technical
              <span className="block text-gold">Capabilities</span>
            </h1>
            <p className="text-xs text-mist mt-2 leading-relaxed max-w-[260px]">
              Tools, frameworks and domains I work with to build intelligent, real-world solutions.
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {[
              { icon: Code2, bold: '6 Core', sub: 'Domains' },
              { icon: Layers, bold: '12+', sub: 'Technologies' },
              { icon: Rocket, bold: '3', sub: 'Deployments' },
              { icon: Box, bold: 'End-to-End', sub: 'Development' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-obsidian/90 border border-gold/30 flex items-center justify-center text-gold shrink-0 shadow-gold-glow">
                  <stat.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-display text-xs sm:text-sm font-bold text-pure leading-none">
                    {stat.bold}
                  </div>
                  <div className="font-sans text-[11px] text-mist mt-0.5">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN (6 Cols): 3D WebGL Brain Anchor + 6 Floating Domain Pills */}
        <div
          id="brain-stage-anchor"
          className="lg:col-span-6 relative h-[340px] sm:h-[370px] flex items-center justify-center pointer-events-auto"
        >
          {/* Top Center Pill: AI / ML — Positioned cleanly above the brain crown */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="px-4 py-1.5 rounded-full bg-[#0b101d]/90 border border-gold/55 shadow-gold-glow flex items-center gap-2 text-xs font-medium text-pure">
              <Cpu className="w-3.5 h-3.5 text-gold" />
              <span>AI / ML</span>
            </div>
          </div>

          {/* Upper Left Pill: NLP */}
          <div className="absolute top-14 left-4 sm:left-8 z-20">
            <div className="px-4 py-1.5 rounded-full bg-[#0b101d]/90 border border-gold/45 shadow-gold-glow flex items-center gap-2 text-xs font-medium text-pure">
              <FileText className="w-3.5 h-3.5 text-gold" />
              <span>NLP</span>
            </div>
          </div>

          {/* Upper Right Pill: Computer Vision */}
          <div className="absolute top-14 right-2 sm:right-6 z-20">
            <div className="px-4 py-1.5 rounded-full bg-[#0b101d]/90 border border-gold/45 shadow-gold-glow flex items-center gap-2 text-xs font-medium text-pure">
              <Camera className="w-3.5 h-3.5 text-gold" />
              <span>Computer Vision</span>
            </div>
          </div>

          {/* Lower Left Pill: Programming */}
          <div className="absolute bottom-16 left-2 sm:left-6 z-20">
            <div className="px-4 py-1.5 rounded-full bg-[#0b101d]/90 border border-gold/45 shadow-gold-glow flex items-center gap-2 text-xs font-medium text-pure">
              <span className="font-mono text-xs text-gold">&lt;/&gt;</span>
              <span>Programming</span>
            </div>
          </div>

          {/* Lower Right Pill: Backend */}
          <div className="absolute bottom-16 right-4 sm:right-8 z-20">
            <div className="px-4 py-1.5 rounded-full bg-[#0b101d]/90 border border-gold/45 shadow-gold-glow flex items-center gap-2 text-xs font-medium text-pure">
              <Layers className="w-3.5 h-3.5 text-gold" />
              <span>Backend</span>
            </div>
          </div>

          {/* Bottom Pedestal Pill: Data & Visualization */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20">
            <div className="px-5 py-1.5 rounded-full bg-[#0b101d]/95 border border-gold/60 shadow-[0_0_25px_rgba(234,183,103,0.35)] flex items-center gap-2 text-xs font-medium text-pure">
              <BarChart3 className="w-3.5 h-3.5 text-gold" />
              <span>Data & Visualization</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (3 Cols): Categorized Tech Stack Panel */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-4 border border-gold/45 shadow-[0_0_40px_rgba(234,183,103,0.14)] space-y-2.5 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-gold/20 pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold" />
              <span className="font-display text-sm font-semibold text-pure">Tech Stack</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>

          <div className="space-y-2">
            {RIGHT_TECH_GROUPS.map((grp) => (
              <div
                key={grp.category}
                className="p-2 rounded-xl bg-[#090d16]/85 border border-gold/15 flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <grp.icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-sans text-[10px] text-mist font-medium leading-none mb-1.5">
                    {grp.category}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {grp.items.map((it) => (
                      <span
                        key={it.title}
                        title={it.title}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-pure border border-white/15 shadow-sm"
                        style={{ backgroundColor: `${it.bg}CC` }}
                      >
                        {it.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          BOTTOM ROW: 4 GLOWING DOMAIN CARDS WITH HOLOGRAPHIC ARTWORK
         ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 pointer-events-auto">
        {BOTTOM_CARDS.map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveCaseStudy(card.projectTarget)}
            className="glass-panel glass-panel-hover rounded-2xl p-4 border border-gold/35 cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <card.icon className="w-4 h-4 text-gold" />
                <h2 className="font-display text-sm sm:text-base font-semibold text-pure group-hover:text-gold transition-colors">
                  {card.title}
                </h2>
              </div>
              <p className="text-[11px] text-mist leading-relaxed line-clamp-2">
                {card.description}
              </p>
            </div>

            <CardArtwork id={card.id} />

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-obsidian/90 border border-gold/25 font-mono text-[9.5px] text-pure"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
