import { ArrowUpRight } from 'lucide-react'
import { PERSONAL_BRAND, PROJECTS } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'

export default function HomeView() {
  const { setFlowState, setActiveCaseStudy, setManualProgress } = useSceneStore()

  return (
    <div className="min-h-screen w-full max-w-6xl mx-auto px-6 pt-28 pb-24 flex flex-col justify-between pointer-events-none">
      {/* Split Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-12">
        <div className="lg:col-span-7 space-y-6 pointer-events-auto">
          <div className="mono-label">{PERSONAL_BRAND.role}</div>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08] text-pure">
            {PERSONAL_BRAND.name}
            <span className="block text-gold mt-2 text-2xl sm:text-4xl font-normal">
              {PERSONAL_BRAND.headline}
            </span>
          </h1>
          <p className="text-mist text-base sm:text-lg max-w-xl leading-relaxed">
            {PERSONAL_BRAND.subheadline}
          </p>

          {/* Engineering Proof Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {PERSONAL_BRAND.proofBadges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-obsidian/70 border border-gold/30 text-gold-champagne"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button onClick={() => setFlowState('projects')} className="btn-gold flex items-center gap-2">
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button onClick={() => setFlowState('contact')} className="btn-ghost-gold">
              Get in Touch
            </button>
            <button
              onClick={() => setManualProgress(1)}
              className="font-mono text-xs text-gold hover:underline ml-2"
            >
              Morph Core to Portrait →
            </button>
          </div>
        </div>
      </section>

      {/* Selected Projects Preview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 pointer-events-auto">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveCaseStudy(project.id)}
            className="glass-panel glass-panel-hover rounded-2xl p-5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="mono-label">{project.index} // {project.category}</span>
                {project.featured && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-gold/20 text-gold">FEATURED</span>
                )}
              </div>
              <h3 className="font-display text-lg font-medium text-pure mb-2">{project.title}</h3>
              <p className="text-xs text-mist leading-relaxed mb-4">{project.tagline}</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gold/15">
              <span className="font-mono text-[10px] text-gold-champagne">{project.tags.slice(0, 3).join(' · ')}</span>
              <ArrowUpRight className="w-4 h-4 text-gold" />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
