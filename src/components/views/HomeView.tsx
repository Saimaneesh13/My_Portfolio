import { ArrowUpRight, Sparkles } from 'lucide-react'
import { PERSONAL_BRAND, PROJECTS } from '../../lib/portfolio-data'
import { useSceneStore } from '../../store/useSceneStore'

export default function HomeView() {
  const { targetProgress, manualProgress, setFlowState, setActiveCaseStudy, setManualProgress } = useSceneStore()
  const currentMorph = manualProgress !== null ? manualProgress : targetProgress
  const isPortrait = currentMorph > 0.5

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-6 sm:px-8 pb-32 pointer-events-none">
      {/* Subtle left-side radial backdrop for guaranteed text contrast */}
      <div
        className="fixed inset-y-0 left-0 w-full lg:w-[58%] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 25% 45%, rgba(7, 11, 19, 0.88) 0%, rgba(7, 11, 19, 0) 75%)',
        }}
      />

      {/* STAGE 1: Full-Viewport Split Hero (Unobstructed 3D on the Right) */}
      <section className="min-h-[90vh] pt-24 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 max-w-[540px] space-y-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian/60 border border-gold/25">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="mono-label !text-[10px]">{PERSONAL_BRAND.role}</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-[56px] font-semibold tracking-[-0.03em] leading-[1.06] text-pure">
                {PERSONAL_BRAND.name}
              </h1>
              <p className="font-display text-xl sm:text-[28px] font-normal tracking-[-0.01em] leading-[1.25] text-gold">
                {PERSONAL_BRAND.headline}
              </p>
            </div>

            <p className="text-mist text-sm sm:text-base max-w-[460px] leading-[1.75]">
              {PERSONAL_BRAND.subheadline}
            </p>

            {/* Clean Single-Row / Compact Proof Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {PERSONAL_BRAND.proofBadges.map((badge) => (
                <span
                  key={badge}
                  className="font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-md bg-obsidian/80 border border-gold/20 text-gold-champagne"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => setFlowState('projects')}
                className="btn-gold flex items-center gap-2"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setFlowState('contact')}
                className="btn-ghost-gold"
              >
                Get in Touch
              </button>

              <button
                onClick={() => setManualProgress(isPortrait ? 0 : 1)}
                className="px-3.5 py-2.5 rounded-lg border border-gold/20 bg-obsidian/40 hover:border-gold/50 font-mono text-[11px] text-gold flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isPortrait ? 'Morph to Core' : 'Morph to Portrait'}</span>
              </button>
            </div>
          </div>

          {/* Right 6 columns intentionally left open as a clean stage for the 3D Hologram */}
          <div className="hidden lg:block lg:col-span-6 h-[520px]" />
        </div>
      </section>

      {/* STAGE 2: Selected Work Section (Sits cleanly below the hero fold) */}
      <section className="pt-8 space-y-6 pointer-events-auto">
        <div className="flex items-end justify-between border-b border-gold/15 pb-4">
          <div>
            <div className="mono-label">01 // Featured Engineering</div>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-pure mt-1">
              Selected AI & ML Systems
            </h2>
          </div>
          <button
            onClick={() => setFlowState('projects')}
            className="font-mono text-xs text-gold hover:underline flex items-center gap-1"
          >
            <span>View All Archive</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveCaseStudy(project.id)}
              className="glass-panel glass-panel-hover rounded-2xl p-6 cursor-pointer flex flex-col justify-between min-h-[240px] group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="mono-label !text-[10px]">
                    {project.index} // {project.category}
                  </span>
                  {project.featured && (
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-gold/15 border border-gold/30 text-gold shrink-0">
                      FEATURED
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-medium text-pure group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-mist leading-relaxed">{project.tagline}</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gold/15">
                <span className="font-mono text-[10px] text-gold-champagne">
                  {project.tags.slice(0, 3).join(' · ')}
                </span>
                <ArrowUpRight className="w-4 h-4 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
