import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PROJECTS } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'
import DisasterNlpSim from '../simulators/DisasterNlpSim'
import AgroDetectSim from '../simulators/AgroDetectSim'
import FaceAttendanceSim from '../simulators/FaceAttendanceSim'

type CaseTab = 'overview' | 'problem' | 'pipeline' | 'results' | 'impact'

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

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 pt-24 pb-24 space-y-8 pointer-events-auto select-none">
      {/* Project Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/20 pb-4">
        <div>
          <div className="mono-label text-gold">// CASE STUDY</div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-pure mt-1">
            {project.title}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveCaseStudy(p.id)
                setShowSimulator(false)
              }}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs border transition-all ${
                p.id === project.id
                  ? 'border-gold bg-gold/20 text-gold shadow-gold-glow'
                  : 'border-gold/20 bg-obsidian/50 text-mist hover:text-pure'
              }`}
            >
              {p.index}. {p.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Left Vertical Tabs + Right Content Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Vertical Step Navigator */}
        <div className="lg:col-span-3 space-y-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.id && !showSimulator
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setShowSimulator(false)
                }}
                className={`w-full text-left px-5 py-3.5 rounded-xl font-mono text-xs flex items-center gap-4 transition-all ${
                  active
                    ? 'bg-gradient-to-r from-gold/30 to-gold/10 border border-gold text-gold shadow-gold-ambient font-semibold'
                    : 'glass-panel text-mist hover:text-pure hover:border-gold/40'
                }`}
              >
                <span className="text-[10px] opacity-70">{tab.num}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Right Dynamic Content Box — semi-transparent so the top-right Golden Core horizon shines through */}
        <div className="lg:col-span-9 bg-[#0b111e]/70 backdrop-blur-md border border-gold/25 rounded-2xl p-6 sm:p-8 relative overflow-hidden space-y-6">
          {/* Background Globe / Atmosphere Watermark */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

          {showSimulator ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                <span className="mono-label text-gold">Interactive Model Inference</span>
                <button
                  onClick={() => setShowSimulator(false)}
                  className="font-mono text-xs text-mist hover:text-gold"
                >
                  ← Back to Case Study
                </button>
              </div>
              {project.id === 'disaster-nlp' && <DisasterNlpSim />}
              {project.id === 'agrodetect' && <AgroDetectSim />}
              {project.id === 'face-attendance' && <FaceAttendanceSim />}
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="font-display text-2xl font-medium text-pure mb-2">Project Overview</h2>
                    <p className="text-mist text-sm sm:text-base leading-relaxed">{project.summary}</p>
                  </div>

                  {/* 5-Stage Pipeline Graphic Bar */}
                  <div className="space-y-3 pt-2">
                    <div className="mono-label">Architectural Data Flow</div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { title: 'Data', sub: '81K+ Tweets' },
                        { title: 'Embedding', sub: 'Sentence-BERT' },
                        { title: 'Clustering', sub: 'UMAP + HDBSCAN' },
                        { title: 'Topic Discovery', sub: 'BERTopic' },
                        { title: 'Intelligence', sub: 'Urgency & Geo' },
                      ].map((step, idx) => (
                        <div
                          key={step.title}
                          className="p-3 rounded-xl bg-obsidian/80 border border-gold/25 flex flex-col justify-between space-y-2 relative"
                        >
                          <div className="font-mono text-[9px] text-gold">0{idx + 1}</div>
                          <div>
                            <div className="font-display text-xs font-semibold text-pure">{step.title}</div>
                            <div className="font-mono text-[9px] text-mist">{step.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Telemetry Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gold/20">
                    {project.stats?.map((st, i) => (
                      <div key={i} className="space-y-1">
                        <div className="font-display text-lg font-bold text-pure">{st.value}</div>
                        <div className="font-mono text-[10px] text-mist">{st.label}</div>
                      </div>
                    )) || (
                      <>
                        <div className="space-y-1">
                          <div className="font-display text-lg font-bold text-pure">81,187</div>
                          <div className="font-mono text-[10px] text-mist">Tweets Processed</div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-display text-lg font-bold text-pure">20</div>
                          <div className="font-mono text-[10px] text-mist">Disaster Topics</div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-display text-lg font-bold text-pure">3 Tiers</div>
                          <div className="font-mono text-[10px] text-mist">Urgency Levels</div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-display text-lg font-bold text-pure">Real-time</div>
                          <div className="font-mono text-[10px] text-mist">Insights</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'problem' && (
                <div className="space-y-5 animate-fadeIn">
                  <h2 className="font-display text-2xl font-medium text-pure">The Challenge</h2>
                  <p className="text-mist text-sm sm:text-base leading-relaxed">{project.problem}</p>
                  <div className="mono-label pt-2">Core Objectives</div>
                  <ul className="space-y-2.5 text-sm text-mist">
                    {project.objectives.map((obj) => (
                      <li key={obj} className="flex items-start gap-2.5">
                        <span className="text-gold font-mono">✦</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'pipeline' && (
                <div className="space-y-5 animate-fadeIn">
                  <h2 className="font-display text-2xl font-medium text-pure">Technical Architecture</h2>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.architecture.map((step, idx) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="px-3.5 py-2 rounded-xl bg-obsidian border border-gold/30 font-mono text-xs text-pure">
                          {idx + 1}. {step}
                        </span>
                        {idx < project.architecture.length - 1 && <span className="text-gold font-mono">→</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mono-label pt-4">Workflow Execution Steps</div>
                  <ol className="space-y-2.5 text-sm text-mist list-decimal list-inside">
                    {project.workflow.map((w) => (
                      <li key={w} className="leading-relaxed">{w}</li>
                    ))}
                  </ol>
                </div>
              )}

              {activeTab === 'results' && (
                <div className="space-y-5 animate-fadeIn">
                  <h2 className="font-display text-2xl font-medium text-pure">Results & Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {project.features.map((feat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-obsidian/70 border border-gold/20 text-xs text-pure leading-relaxed">
                        <span className="text-gold font-mono mr-2">✓</span> {feat}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'impact' && (
                <div className="space-y-5 animate-fadeIn">
                  <h2 className="font-display text-2xl font-medium text-pure">Measurable Outcomes</h2>
                  <ul className="space-y-3 text-sm text-pure">
                    {project.outcomes.map((out) => (
                      <li key={out} className="p-4 rounded-xl bg-gold/10 border border-gold/30 flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Try Live Simulation Callout */}
              <div className="pt-6 border-t border-gold/20 flex items-center justify-between">
                <span className="font-mono text-xs text-mist">Ready to test model inference?</span>
                <button
                  onClick={() => setShowSimulator(true)}
                  className="btn-gold flex items-center gap-2"
                >
                  <span>Try Live Simulation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
