import { useState } from 'react'
import { ArrowRight, Sparkles, Database, Layers, Diamond, Zap } from 'lucide-react'
import { PROJECTS } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'
import DisasterNlpSim from '../simulators/DisasterNlpSim'
import AgroDetectSim from '../simulators/AgroDetectSim'
import FaceAttendanceSim from '../simulators/FaceAttendanceSim'

type CaseTab = 'overview' | 'problem' | 'pipeline' | 'results' | 'impact'

// 3D Isometric Pipeline Artwork for each of the 5 stages (matching image_5b7dd4.jpg)
function IsometricStageGraphic({ step }: { step: number }) {
  if (step === 0) {
    // Stage 1: Cyan Data / Social Stream Platform
    return (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
        <polygon
          points="50,62 16,45 50,28 84,45"
          fill="rgba(14,116,144,0.28)"
          stroke="#38BDF8"
          strokeWidth="1.6"
        />
        <polygon
          points="50,70 16,53 50,36 84,53"
          fill="none"
          stroke="rgba(56,189,248,0.45)"
          strokeWidth="1.2"
        />
        {/* Stylized Bird / Feed Glyph */}
        <path
          d="M38,44 Q48,32 62,36 Q55,46 42,48 Z"
          fill="#38BDF8"
        />
        <circle cx="32" cy="36" r="2" fill="#EAB767" />
        <circle cx="68" cy="34" r="1.8" fill="#38BDF8" />
      </svg>
    )
  }

  if (step === 1) {
    // Stage 2: Purple Stacked Transformer Embedding Layers
    return (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
        <polygon
          points="50,74 16,57 50,40 84,57"
          fill="rgba(139,92,246,0.2)"
          stroke="#A855F7"
          strokeWidth="1.5"
        />
        <polygon
          points="50,62 16,45 50,28 84,45"
          fill="rgba(139,92,246,0.28)"
          stroke="#C084FC"
          strokeWidth="1.5"
        />
        <polygon
          points="50,50 16,33 50,16 84,33"
          fill="rgba(234,183,103,0.18)"
          stroke="#EAB767"
          strokeWidth="1.6"
        />
        <polygon
          points="50,42 32,33 50,24 68,33"
          fill="none"
          stroke="#F7D9A0"
          strokeWidth="1.2"
        />
      </svg>
    )
  }

  if (step === 2) {
    // Stage 3: UMAP + HDBSCAN Glowing Gold Density Cluster Platform
    return (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
        <polygon
          points="50,72 16,55 50,38 84,55"
          fill="rgba(17,24,39,0.85)"
          stroke="rgba(234,183,103,0.55)"
          strokeWidth="1.5"
        />
        <polygon
          points="50,64 16,47 50,30 84,47"
          fill="rgba(234,183,103,0.15)"
          stroke="#EAB767"
          strokeWidth="1.5"
        />
        {[
          [42, 34], [56, 30], [48, 42], [35, 44], [62, 42], [50, 24], [44, 28], [58, 36],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" fill="#EAB767" />
        ))}
      </svg>
    )
  }

  if (step === 3) {
    // Stage 4: BERTopic Connected Graph Constellation
    return (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
        <polygon
          points="50,70 16,53 50,36 84,53"
          fill="rgba(234,183,103,0.14)"
          stroke="#EAB767"
          strokeWidth="1.5"
        />
        <g stroke="#EAB767" strokeWidth="1.2">
          <line x1="34" y1="36" x2="52" y2="22" />
          <line x1="52" y1="22" x2="68" y2="38" />
          <line x1="34" y1="36" x2="50" y2="48" />
          <line x1="68" y1="38" x2="50" y2="48" />
          <line x1="52" y1="22" x2="50" y2="48" />
        </g>
        {[
          [34, 36], [52, 22], [68, 38], [50, 48],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" fill="#F7D9A0" />
        ))}
      </svg>
    )
  }

  // Stage 5: Urgency & Geo Intelligence Pin on Isometric Tile
  return (
    <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
      <polygon
        points="50,72 16,55 50,38 84,55"
        fill="rgba(139,92,246,0.18)"
        stroke="#A855F7"
        strokeWidth="1.4"
      />
      <polygon
        points="50,64 16,47 50,30 84,47"
        fill="rgba(234,183,103,0.2)"
        stroke="#EAB767"
        strokeWidth="1.6"
      />
      <path
        d="M50,16 C41,16 35,22 35,30 C35,41 50,52 50,52 C50,52 65,41 65,30 C65,22 59,16 50,16 Z"
        fill="rgba(234,183,103,0.3)"
        stroke="#EAB767"
        strokeWidth="2"
      />
      <circle cx="50" cy="29" r="4.5" fill="#F7D9A0" />
    </svg>
  )
}

export default function CaseStudyView() {
  const { activeCaseStudyId, setActiveCaseStudy } = useSceneStore()
  const [activeTab, setActiveTab] = useState<CaseTab>('overview')
  const [showSimulator, setShowSimulator] = useState(false)

  const project = PROJECTS.find((p) => p.id === activeCaseStudyId) || PROJECTS[0]

  const tabs: { id: CaseTab; label: string; num: string }[] = [
    { id: 'overview', label: 'Overview', num: '01' },
    { id: 'problem', label: 'Problem', num: '02' },
    { id: 'pipeline', label: 'Pipeline', num: '03' },
    { id: 'results', label: 'Results', num: '04' },
    { id: 'impact', label: 'Impact', num: '05' },
  ]

  const pipelineStages =
    project.id === 'disaster-nlp'
      ? [
          { title: 'Data', sub: '(81K+ Tweets)' },
          { title: 'Embedding', sub: '(Sentence-BERT)' },
          { title: 'Clustering', sub: '(UMAP + HDBSCAN)' },
          { title: 'Topic Discovery', sub: '(BERTopic)' },
          { title: 'Urgency & Geo', sub: 'Intelligence' },
        ]
      : project.id === 'agrodetect'
      ? [
          { title: 'Field Input', sub: '(224×224 Leaf)' },
          { title: 'Augmentation', sub: '(Tensor Norm)' },
          { title: 'Conv2D Blocks', sub: '(Feature Maps)' },
          { title: 'Dense + Softmax', sub: '(90%+ Accuracy)' },
          { title: 'FastAPI Service', sub: '(JSON Diagnosis)' },
        ]
      : [
          { title: 'Video Stream', sub: '(OpenCV RGB)' },
          { title: 'Face Alignment', sub: '(Bounding Box)' },
          { title: '128-D Encoding', sub: '(Biometric Vec)' },
          { title: 'L2 Matcher', sub: '(≤ 0.45 Dist)' },
          { title: 'Flask + SQLite', sub: '(Audit Ledger)' },
        ]

  return (
    <div className="min-h-screen max-w-[1220px] mx-auto px-6 pt-24 pb-24 flex flex-col justify-center space-y-6 pointer-events-auto select-none">
      {/* Header Row — Kept on the LEFT so the right side is 100% open for the rising 3D Golden Core */}
      <div className="space-y-3 max-w-2xl">
        <div className="mono-label text-gold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span>// CASE STUDY</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-pure">
          {project.title}
        </h1>
        <p className="text-mist text-sm sm:text-base">
          {project.tagline}
        </p>

        {/* Compact Project Switcher Pills docked cleanly under the subtitle */}
        <div className="flex flex-wrap gap-2 pt-1">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveCaseStudy(p.id)
                setShowSimulator(false)
              }}
              className={`px-3.5 py-1 rounded-full font-mono text-[11px] border transition-all ${
                p.id === project.id
                  ? 'border-gold bg-gold/20 text-gold shadow-gold-glow'
                  : 'border-gold/20 bg-obsidian/70 text-mist hover:text-pure hover:border-gold/45'
              }`}
            >
              {p.index} · {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Left Vertical Step Pills + Right Isometric Pipeline Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Vertical Step Navigator (Matches image_5b7dd4.jpg) */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col gap-2.5 overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab.id && !showSimulator
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setShowSimulator(false)
                }}
                className={`flex-1 lg:flex-none text-left px-4 py-3.5 rounded-xl font-display text-sm flex items-center gap-3.5 transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#3d2e18]/90 via-[#2a2012]/85 to-[#161926]/90 border border-gold text-pure shadow-[0_0_25px_rgba(234,183,103,0.28)] font-medium'
                    : 'bg-[#0b101b]/80 border border-gold/15 text-mist hover:text-pure hover:border-gold/40'
                }`}
              >
                <span className="font-mono text-xs text-gold font-semibold">{tab.num}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Right Showcase Stage + Bottom Telemetry Footer */}
        <div className="lg:col-span-10 flex flex-col justify-between space-y-5">
          {/* Glowing Border Glass Stage */}
          <div className="bg-[#090d16]/80 backdrop-blur-md border border-gold/45 shadow-[0_0_50px_rgba(234,183,103,0.12)] rounded-2xl p-6 sm:p-8 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
            {/* Subtle top-edge & bottom-edge gold specular highlight */}
            <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-75" />
            <div className="absolute inset-x-12 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-60" />

            {showSimulator ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                  <span className="mono-label text-gold">Live Interactive Model Simulation</span>
                  <button
                    onClick={() => setShowSimulator(false)}
                    className="font-mono text-xs text-gold hover:underline"
                  >
                    ← Back to Isometric Pipeline
                  </button>
                </div>
                {project.id === 'disaster-nlp' && <DisasterNlpSim />}
                {project.id === 'agrodetect' && <AgroDetectSim />}
                {project.id === 'face-attendance' && <FaceAttendanceSim />}
              </div>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center py-2">
                    {pipelineStages.map((stage, idx) => (
                      <div key={stage.title} className="relative flex flex-col items-center text-center group">
                        <IsometricStageGraphic step={idx} />
                        <div className="mt-2 font-display text-sm font-semibold text-pure group-hover:text-gold transition-colors">
                          {stage.title}
                        </div>
                        <div className="font-mono text-[11px] text-mist mt-0.5">
                          {stage.sub}
                        </div>

                        {/* Connecting Arrow between Isometric Tiles */}
                        {idx < 4 && (
                          <span className="hidden sm:block absolute -right-3 top-9 text-mist/70 font-mono text-base">
                            →
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'problem' && (
                  <div className="space-y-4">
                    <h2 className="font-display text-2xl font-medium text-pure">Problem Statement & Objectives</h2>
                    <p className="text-mist text-sm sm:text-base leading-relaxed">{project.problem}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      {project.objectives.map((obj, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-obsidian/75 border border-gold/25 text-xs text-pure leading-relaxed">
                          <span className="text-gold font-mono block mb-1">OBJECTIVE 0{i + 1}</span>
                          {obj}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'pipeline' && (
                  <div className="space-y-4">
                    <h2 className="font-display text-2xl font-medium text-pure">Implementation Workflow</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.workflow.map((w, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-obsidian/75 border border-gold/25 text-xs text-mist leading-relaxed">
                          <span className="text-gold font-mono font-semibold mr-2">STEP 0{i + 1} //</span>
                          <span className="text-pure">{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'results' && (
                  <div className="space-y-4">
                    <h2 className="font-display text-2xl font-medium text-pure">Engineered Capabilities & Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {project.features.map((feat, i) => (
                        <div key={i} className="p-4 rounded-xl bg-obsidian/75 border border-gold/25 text-xs text-pure leading-relaxed">
                          <span className="text-gold font-mono block mb-1.5">FEATURE 0{i + 1}</span>
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'impact' && (
                  <div className="space-y-4">
                    <h2 className="font-display text-2xl font-medium text-pure">Verified Outcomes & Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.outcomes.map((out, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gold/10 border border-gold/35 flex items-start gap-3 text-sm text-pure">
                          <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom Telemetry Metrics & "Try Live Simulation ->" Bar (Matches image_5b7dd4.jpg) */}
          <div className="flex flex-wrap items-center justify-between gap-6 px-2 pt-1">
            <div className="flex flex-wrap items-center gap-8 sm:gap-12">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-pure">
                    {project.id === 'disaster-nlp' ? '81,187' : project.id === 'agrodetect' ? '90%+' : '<85ms'}
                  </div>
                  <div className="font-mono text-[11px] text-mist">
                    {project.id === 'disaster-nlp' ? 'Tweets Processed' : project.id === 'agrodetect' ? 'Validation Accuracy' : 'Frame Match Latency'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-pure">
                    {project.id === 'disaster-nlp' ? '20' : project.id === 'agrodetect' ? '224×224' : '128-D'}
                  </div>
                  <div className="font-mono text-[11px] text-mist">
                    {project.id === 'disaster-nlp' ? 'Disaster Topics' : project.id === 'agrodetect' ? 'RGB Tensor Input' : 'Biometric Encoding'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Diamond className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-pure">
                    {project.id === 'disaster-nlp' ? '3' : project.id === 'agrodetect' ? 'FastAPI' : 'SQLite'}
                  </div>
                  <div className="font-mono text-[11px] text-mist">
                    {project.id === 'disaster-nlp' ? 'Urgency Levels' : project.id === 'agrodetect' ? 'Production Endpoint' : 'Automated Ledger'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-pure">Real-time</div>
                  <div className="font-mono text-[11px] text-mist">Insights</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSimulator((prev) => !prev)}
              className="btn-gold !px-6 !py-3 !rounded-xl flex items-center gap-2 font-display text-sm font-semibold shadow-gold-glow"
            >
              <span>{showSimulator ? 'Show Pipeline Diagram' : 'Try Live Simulation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
