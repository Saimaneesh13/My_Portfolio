import React, { useState } from 'react';
import { Cpu, Code, Brain, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../../lib/portfolio-data';
import { GlassCard } from '../ui/GlassCard';
import { MonoBadge } from '../ui/MonoBadge';

export const ExpertiseView: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const icons: Record<string, React.ReactNode> = {
    Brain: <Brain className="w-5 h-5 text-gold" />,
    Code: <Code className="w-5 h-5 text-neon-cyan" />,
    Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] py-12 px-4 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <MonoBadge variant="gold">SEC-05 // SKILL VECTOR</MonoBadge>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text">
          Technical Expertise & Capability Vector
        </h2>
        <p className="font-mono text-xs text-text-muted">
          Multidimensional matrix spanning core machine learning, computer vision, systems architecture, and 3D web engineering.
        </p>
      </div>

      {/* Category selector pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {skills.map((cat: SkillCategory, idx: number) => {
          const isSelected = selectedCategory === idx;
          return (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(idx)}
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all text-left font-mono ${
                isSelected
                  ? 'bg-bg-secondary/90 border-gold shadow-gold-glow text-text'
                  : 'bg-bg-secondary/40 border-white/10 text-text-muted hover:border-gold/30 hover:bg-white/5'
              }`}
            >
              <div className="p-2 rounded-lg bg-white/5">
                {icons[cat.iconName] || <Brain className="w-5 h-5 text-gold" />}
              </div>
              <div>
                <div className="text-[10px] text-text-subtle uppercase">Domain #{idx + 1}</div>
                <div className="font-bold text-xs sm:text-sm text-text">{cat.title}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Skills Detail Grid for Selected Domain */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills[selectedCategory].skills.map((skill) => (
          <GlassCard
            key={skill.name}
            className="p-5 flex flex-col justify-between"
            hoverEffect
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display font-bold text-base text-text flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  {skill.name}
                </h4>
                <span className="font-mono text-xs font-bold text-gold">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="font-mono text-xs text-gold/80 mb-2">
                {skill.experience}
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                {skill.description}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Global Tech Stack Pills Summary */}
      <div className="mt-8 p-4 rounded-xl bg-bg-secondary/60 border border-white/10 font-mono text-xs">
        <div className="text-text-subtle text-[11px] mb-2 uppercase tracking-wider">
          All Systems Technologies & Tools:
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            'Python',
            'Java',
            'Machine Learning',
            'Deep Learning',
            'Computer Vision',
            'NLP',
            'BERTopic',
            'Sentence-BERT',
            'UMAP',
            'HDBSCAN',
            'OpenCV',
            'FastAPI',
            'React',
            'TypeScript',
            'Three.js',
            'Unity',
            'SQLite',
            'Docker',
            'PyTorch',
          ].map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-text-muted hover:text-gold hover:border-gold/40 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseView;
