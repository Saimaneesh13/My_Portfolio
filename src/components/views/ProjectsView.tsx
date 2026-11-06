import { ArrowUpRight, Github } from 'lucide-react'
import { PROJECTS, CREATIVE_EXPERIMENT } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'

export default function ProjectsView() {
  const { setActiveCaseStudy, setManualProgress, toggleInspect3D } = useSceneStore()

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 pt-28 pb-24 space-y-10 pointer-events-auto">
      <div>
        <div className="mono-label">02 // Engineered Systems</div>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-pure mt-2">
          AI, Machine Learning & Computer Vision Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="mono-label">{project.index}</span>
                <span className="font-mono text-[11px] text-gold">{project.metrics}</span>
              </div>
              <h3 className="font-display text-xl font-medium text-pure">{project.title}</h3>
              <p className="text-sm text-mist leading-relaxed">{project.summary}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2.5 py-1 rounded bg-obsidian/80 border border-gold/20 text-gold-champagne"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gold/20">
              <button
                onClick={() => setActiveCaseStudy(project.id)}
                className="btn-gold !px-4 !py-2 !text-xs flex items-center gap-1.5"
              >
                <span>View Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost-gold !px-3 !py-2 !text-xs flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Creative Experiments Section */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="mono-label">{CREATIVE_EXPERIMENT.category}</div>
          <h3 className="font-display text-xl font-medium text-pure">{CREATIVE_EXPERIMENT.title}</h3>
          <p className="text-xs sm:text-sm text-mist leading-relaxed">{CREATIVE_EXPERIMENT.description}</p>
        </div>
        <button
          onClick={() => {
            setManualProgress(1)
            toggleInspect3D()
          }}
          className="btn-ghost-gold shrink-0"
        >
          Launch Interactive 3D Morph ↗
        </button>
      </div>
    </div>
  )
}
