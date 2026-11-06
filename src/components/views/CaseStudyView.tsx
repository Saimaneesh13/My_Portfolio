import { PROJECTS } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'
import DisasterNlpSim from '../simulators/DisasterNlpSim'
import AgroDetectSim from '../simulators/AgroDetectSim'
import FaceAttendanceSim from '../simulators/FaceAttendanceSim'

export default function CaseStudyView() {
  const { activeCaseStudyId, setActiveCaseStudy } = useSceneStore()
  const project = PROJECTS.find((p) => p.id === activeCaseStudyId) || PROJECTS[0]

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 pt-28 pb-24 space-y-8 pointer-events-auto">
      {/* Case Study Switcher */}
      <div className="flex flex-wrap gap-2">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveCaseStudy(p.id)}
            className={`px-4 py-2 rounded-xl font-mono text-xs border transition-all ${
              p.id === project.id
                ? 'border-gold bg-gold/15 text-gold'
                : 'border-gold/20 bg-obsidian/50 text-mist hover:text-pure'
            }`}
          >
            {p.index}. {p.title}
          </button>
        ))}
      </div>

      {/* Header & Problem Statement */}
      <div className="glass-panel rounded-2xl p-8 space-y-6">
        <div className="mono-label">{project.category} · {project.metrics}</div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-pure">{project.title}</h1>
        <p className="text-mist text-base leading-relaxed">{project.summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gold/20">
          <div>
            <div className="mono-label mb-2">Problem Statement</div>
            <p className="text-sm text-mist leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <div className="mono-label mb-2">Engineering Objectives</div>
            <ul className="space-y-1.5 text-sm text-mist list-disc list-inside">
              {project.objectives.map((obj) => (
                <li key={obj}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Architecture Pipeline */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="mono-label">Technical Architecture Pipeline</div>
        <div className="flex flex-wrap items-center gap-2">
          {project.architecture.map((step, idx) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-obsidian border border-gold/30 font-mono text-xs text-pure">
                {step}
              </span>
              {idx < project.architecture.length - 1 && <span className="text-gold font-mono">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Live Interactive Simulator */}
      {project.id === 'disaster-nlp' && <DisasterNlpSim />}
      {project.id === 'agrodetect' && <AgroDetectSim />}
      {project.id === 'face-attendance' && <FaceAttendanceSim />}

      {/* Implementation Workflow & Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="mono-label">Implementation Workflow</div>
          <ol className="space-y-2 text-sm text-mist list-decimal list-inside">
            {project.workflow.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ol>
        </div>
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="mono-label">Key Outcomes & Verification</div>
          <ul className="space-y-2 text-sm text-pure list-disc list-inside">
            {project.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
