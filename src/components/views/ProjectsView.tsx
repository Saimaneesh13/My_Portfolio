import React, { useState } from 'react';
import { ExternalLink, Github, Play, ArrowRight, Layers, X } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../../lib/portfolio-data';
import { useSceneStore } from '../../store/useSceneStore';
import { GlassCard } from '../ui/GlassCard';
import { GoldButton } from '../ui/GoldButton';
import { MonoBadge } from '../ui/MonoBadge';
import { DisasterNlpSim } from '../simulators/DisasterNlpSim';
import { FaceAttendanceSim } from '../simulators/FaceAttendanceSim';
import { AgroDetectSim } from '../simulators/AgroDetectSim';

export const ProjectsView: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const activeSimulator = useSceneStore((state) => state.activeSimulator);
  const setActiveSimulator = useSceneStore((state) => state.setActiveSimulator);
  const setSelectedProject = useSceneStore((state) => state.setSelectedProject);
  const setActiveSection = useSceneStore((state) => state.setActiveSection);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const categories = ['All', 'NLP & LLMs', 'Computer Vision', 'Deep Learning & Systems'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleOpenSimulator = (proj: Project) => {
    setSelectedProject(proj);
    setActiveSimulator(proj.simulatorId);
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] py-12 px-4 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MonoBadge variant="gold">SEC-03 // PRODUCTION REPO</MonoBadge>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text">
            Featured AI & ML Engineering Systems
          </h2>
          <p className="font-mono text-xs text-text-muted mt-1">
            Production-grade pipelines engineered for semantic analysis, edge biometrics, and computer vision.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-bg-secondary/80 border border-white/10 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-bg font-bold shadow-sm'
                  : 'text-text-muted hover:text-text hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Modal Drawer if active */}
      {activeSimulator && (
        <div className="mb-8 p-4 rounded-2xl bg-bg-secondary/95 border-2 border-gold/40 shadow-gold-glow-lg relative animate-in fade-in duration-300">
          <button
            onClick={() => setActiveSimulator(null)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-text transition-colors z-10"
            title="Close Simulator"
          >
            <X className="w-5 h-5" />
          </button>
          {activeSimulator === 'disaster' && <DisasterNlpSim />}
          {activeSimulator === 'face' && <FaceAttendanceSim />}
          {activeSimulator === 'agro' && <AgroDetectSim />}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const hasImgError = imgErrors[project.id];

          return (
            <GlassCard
              key={project.id}
              className="flex flex-col justify-between p-5 group"
              hoverEffect
            >
              <div>
                {/* Visual Banner Container */}
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-bg/90 border border-white/10 mb-4 flex items-center justify-center">
                  {!hasImgError ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <Layers className="w-8 h-8 text-gold/60 mb-2 animate-pulse" />
                      <span className="font-mono text-xs text-gold font-bold">
                        {project.title}
                      </span>
                      <span className="font-mono text-[9px] text-text-subtle mt-0.5">
                        Placeholder: {project.image}
                      </span>
                    </div>
                  )}

                  {/* Simulator badge */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded bg-bg/85 border border-gold/30 text-gold font-mono text-[10px] backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="font-display font-bold text-lg text-text group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-gold/80 mt-1 mb-2.5">
                  {project.subtitle}
                </p>

                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Metrics ribbon */}
                <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-white/5 border border-white/5 font-mono text-[11px] mb-4">
                  {project.metrics.map((m: { label: string; value: string }, i: number) => (
                    <div key={i} className="text-center">
                      <div className="text-[9px] text-text-subtle uppercase">{m.label}</div>
                      <div className="text-gold font-bold">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/5 text-text-muted border border-white/5 font-mono text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <GoldButton
                  size="sm"
                  variant="primary"
                  icon={<Play className="w-3.5 h-3.5" />}
                  onClick={() => handleOpenSimulator(project)}
                >
                  Run Sim
                </GoldButton>

                <div className="flex items-center gap-1.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-text-muted hover:text-gold hover:bg-white/10 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveSection('casestudy');
                    }}
                    className="p-2 rounded-lg bg-white/5 text-text-muted hover:text-gold hover:bg-white/10 transition-colors"
                    title="Read Deep Dive Case Study"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Case study teaser banner */}
      <div className="mt-8 p-4 rounded-xl bg-bg-secondary/60 border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-text-muted">
          <Layers className="w-4 h-4 text-gold" />
          <span>Interested in architecture diagrams, mathematical equations, and latency benchmarks?</span>
        </div>
        <GoldButton
          variant="outline"
          size="sm"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          iconPosition="right"
          onClick={() => setActiveSection('casestudy')}
        >
          View Case Studies
        </GoldButton>
      </div>
    </section>
  );
};

export default ProjectsView;
