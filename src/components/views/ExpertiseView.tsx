import { Brain, Cpu, Code2, Eye, Server, BarChart3, ArrowUpRight } from 'lucide-react'
import { EXPERTISE_CATEGORIES } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'

const TECH_STACK_LOGOS = [
  { name: 'Python', color: '#3776AB', badge: 'Py' },
  { name: 'TensorFlow', color: '#FF6F00', badge: 'TF' },
  { name: 'PyTorch', color: '#EE4C2C', badge: 'Pt' },
  { name: 'OpenCV', color: '#5C3EE8', badge: 'CV' },
  { name: 'FastAPI', color: '#009688', badge: 'FA' },
  { name: 'Streamlit', color: '#FF4B4B', badge: 'St' },
]

export default function ExpertiseView() {
  const { setActiveCaseStudy } = useSceneStore()

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 pt-24 pb-24 space-y-8 pointer-events-auto select-none">
      <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Background glow atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none" />

        {/* Left Column: Metrics & Title */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <div className="mono-label text-gold">// EXPERTISE</div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-pure mt-1">
              Technical Capabilities
            </h1>
            <p className="text-xs text-mist mt-1 leading-relaxed">
              Tools, frameworks and domains I work with.
            </p>
          </div>

          <div className="space-y-4 pt-2 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                🎓
              </div>
              <div>
                <div className="text-pure font-bold text-sm">6 Core</div>
                <div className="text-[10px] text-mist">Domains</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                🗂️
              </div>
              <div>
                <div className="text-pure font-bold text-sm">12+ Tech</div>
                <div className="text-[10px] text-mist">Frameworks</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                📦
              </div>
              <div>
                <div className="text-pure font-bold text-sm">3 Deploys</div>
                <div className="text-[10px] text-mist">Production Systems</div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-gold/20">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                ⚙️
              </div>
              <div>
                <div className="text-pure font-bold text-sm">End-to-End</div>
                <div className="text-[10px] text-mist">Dev & ML Engineering</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Glowing Neural Brain Graphic & Floating Domain Pills */}
        <div className="lg:col-span-6 relative h-[380px] flex items-center justify-center">
          {/* Orbital rings SVG background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 400 400">
            <ellipse cx="200" cy="200" rx="170" ry="60" fill="none" stroke="rgba(234,183,103,0.25)" strokeWidth="1" transform="rotate(-15 200 200)" />
            <ellipse cx="200" cy="200" rx="160" ry="70" fill="none" stroke="rgba(234,183,103,0.2)" strokeWidth="1" transform="rotate(35 200 200)" />
            <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(234,183,103,0.15)" strokeWidth="0.8" strokeDasharray="3 5" />
          </svg>

          {/* Glowing Central Brain Icon */}
          <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-tr from-gold/30 via-gold/15 to-transparent border border-gold/50 flex items-center justify-center shadow-[0_0_60px_rgba(234,183,103,0.35)] animate-pulse">
            <Brain className="w-16 h-16 text-gold" />
          </div>

          {/* Floating Domain Pills positioned around the brain */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="glass-panel px-4 py-2 rounded-full border border-gold/40 flex items-center gap-2 text-xs font-mono text-pure shadow-gold-glow">
              <Cpu className="w-3.5 h-3.5 text-gold" />
              <span>AI / ML</span>
            </div>
          </div>

          <div className="absolute top-20 left-4 z-20">
            <div className="glass-panel px-3.5 py-1.5 rounded-full border border-gold/30 flex items-center gap-2 text-xs font-mono text-pure">
              <MessageSquareIcon className="w-3.5 h-3.5 text-gold" />
              <span>NLP</span>
            </div>
          </div>

          <div className="absolute top-20 right-4 z-20">
            <div className="glass-panel px-3.5 py-1.5 rounded-full border border-gold/30 flex items-center gap-2 text-xs font-mono text-pure">
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span>Computer Vision</span>
            </div>
          </div>

          <div className="absolute bottom-20 left-2 z-20">
            <div className="glass-panel px-3.5 py-1.5 rounded-full border border-gold/30 flex items-center gap-2 text-xs font-mono text-pure">
              <Code2 className="w-3.5 h-3.5 text-gold" />
              <span>Programming</span>
            </div>
          </div>

          <div className="absolute bottom-20 right-2 z-20">
            <div className="glass-panel px-3.5 py-1.5 rounded-full border border-gold/30 flex items-center gap-2 text-xs font-mono text-pure">
              <Server className="w-3.5 h-3.5 text-gold" />
              <span>Backend</span>
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
            <div className="glass-panel px-4 py-2 rounded-full border border-gold/40 flex items-center gap-2 text-xs font-mono text-pure shadow-gold-glow">
              <BarChart3 className="w-3.5 h-3.5 text-gold" />
              <span>Data & Visualization</span>
            </div>
          </div>
        </div>

        {/* Right Column: Tech Stack Vertical Panel */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-5 border border-gold/30 space-y-4">
          <div className="flex items-center justify-between border-b border-gold/20 pb-3">
            <span className="font-display text-sm font-semibold text-pure">Tech Stack</span>
            <span className="font-mono text-[9px] text-gold">ACTIVE</span>
          </div>

          <div className="space-y-3">
            {TECH_STACK_LOGOS.map((t) => (
              <div key={t.name} className="flex items-center justify-between p-2 rounded-xl bg-obsidian/70 border border-gold/15">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold text-pure border border-gold/30"
                    style={{ backgroundColor: `${t.color}35` }}
                  >
                    {t.badge}
                  </div>
                  <span className="font-display text-xs text-pure">{t.name}</span>
                </div>
                <span className="font-mono text-[9px] text-mist">Verified</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Domain Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXPERTISE_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <h3 className="font-display text-lg font-medium text-gold">{cat.title}</h3>
              <p className="text-xs text-mist leading-relaxed">{cat.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-obsidian/90 border border-gold/25 text-pure"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveCaseStudy(cat.linkedProjectId)}
              className="text-left font-mono text-[11px] text-gold-champagne hover:text-gold pt-3 border-t border-gold/15 flex items-center justify-between"
            >
              <span>Verified in: {cat.linkedProjectName}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  )
}
