import React from 'react';
import { ArrowRight, Terminal, Sparkles, Eye, Download, Code2 } from 'lucide-react';
import { useSceneStore } from '../../store/useSceneStore';
import { BRAND } from '../../lib/constants';
import { GoldButton } from '../ui/GoldButton';
import { GlassCard } from '../ui/GlassCard';
import { MonoBadge } from '../ui/MonoBadge';

export const HomeView: React.FC = () => {
  const setActiveSection = useSceneStore((state) => state.setActiveSection);
  const toggleInspectMode = useSceneStore((state) => state.toggleInspectMode);
  const setGreetModalOpen = useSceneStore((state) => state.setGreetModalOpen);

  return (
    <section className="min-h-[calc(100vh-6rem)] flex flex-col justify-center py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Hero content */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <MonoBadge variant="gold">SYSTEM READY // CORE v2.4</MonoBadge>
            <MonoBadge variant="muted">CSE AI & ML // 2027</MonoBadge>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text leading-[1.1]">
              Engineering <br />
              <span className="gold-gradient-text">Neural Architectures</span>
              <br />& Real-Time Systems.
            </h1>
            <p className="font-mono text-xs sm:text-sm text-gold/90 tracking-wider uppercase">
              {BRAND.title}
            </p>
          </div>

          <p className="text-sm sm:text-base text-text-muted max-w-xl leading-relaxed">
            I specialize in end-to-end artificial intelligence engineering: building semantic NLP
            triage pipelines, sub-millisecond edge computer vision biometric systems, and deep
            convolutional neural networks integrated with interactive 3D WebGL interfaces.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <GoldButton
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => setActiveSection('projects')}
            >
              Explore Systems
            </GoldButton>

            <GoldButton
              variant="outline"
              size="lg"
              icon={<Eye className="w-4 h-4" />}
              onClick={toggleInspectMode}
            >
              Inspect 3D Core
            </GoldButton>

            <button
              onClick={() => setGreetModalOpen(true)}
              className="p-3.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold/40 text-text-muted hover:text-gold transition-all"
              title="Voice Greeting Synthesizer"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* Direct credentials and institution */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-text-subtle">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-gold" />
              <span>{BRAND.university}</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-gold" />
              <span>Full-Stack Deep Learning Pipelines</span>
            </div>
          </div>
        </div>

        {/* Right column: Futuristic Metric HUD Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <GlassCard variant="gold-border" className="p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                Flagship Pipeline Telemetry
              </span>
              <span className="text-[10px] font-mono text-emerald-400">BENCHMARKS VERIFIED</span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-text-muted uppercase">Inference Speed</div>
                <div className="text-xl font-bold text-gold mt-1">32+ FPS</div>
                <div className="text-[9px] text-text-subtle mt-0.5">OpenCV Face Vectorization</div>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-text-muted uppercase">Classification</div>
                <div className="text-xl font-bold text-gold mt-1">96.8%</div>
                <div className="text-[9px] text-text-subtle mt-0.5">AgroDetect CNN Top-1</div>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-text-muted uppercase">Topic Accuracy</div>
                <div className="text-xl font-bold text-gold mt-1">94.2%</div>
                <div className="text-[9px] text-text-subtle mt-0.5">Sentence-BERT + HDBSCAN</div>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-text-muted uppercase">Graphics Mesh</div>
                <div className="text-xl font-bold text-gold mt-1">1600 Pts</div>
                <div className="text-[9px] text-text-subtle mt-0.5">Real-time WebGL Morph</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setActiveSection('casestudy')}
                className="text-xs font-mono text-gold hover:underline flex items-center gap-1.5"
              >
                <span>Read Architectural Deep Dives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={BRAND.cvPath}
                download
                className="text-xs font-mono text-text-muted hover:text-text flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get CV</span>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default HomeView;
