import { EXPERTISE_CATEGORIES } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'

export default function ExpertiseView() {
  const { setActiveCaseStudy } = useSceneStore()

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 pt-28 pb-24 space-y-8 pointer-events-auto">
      <div>
        <div className="mono-label">04 // Technical Capabilities</div>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-pure mt-2">
          Engineering Stack & Verified Domains
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXPERTISE_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <h3 className="font-display text-xl font-medium text-gold">{cat.title}</h3>
              <p className="text-xs text-mist leading-relaxed">{cat.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1 rounded-md bg-obsidian/90 border border-gold/25 text-pure"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveCaseStudy(cat.linkedProjectId)}
              className="text-left font-mono text-[11px] text-gold-champagne hover:text-gold pt-3 border-t border-gold/15"
            >
              Verified in: {cat.linkedProjectName} ↗
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
