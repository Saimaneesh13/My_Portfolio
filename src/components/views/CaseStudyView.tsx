import React, { useState } from 'react';
import { Layers, Cpu, Database, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../lib/portfolio-data';
import { useSceneStore } from '../../store/useSceneStore';
import { GlassCard } from '../ui/GlassCard';
import { GoldButton } from '../ui/GoldButton';
import { MonoBadge } from '../ui/MonoBadge';

export const CaseStudyView: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const selectedProject = useSceneStore((state) => state.selectedProject) || projects[0];
  const setSelectedProject = useSceneStore((state) => state.setSelectedProject);
  const setActiveSimulator = useSceneStore((state) => state.setActiveSimulator);
  const setActiveSection = useSceneStore((state) => state.setActiveSection);

  const [activeTab, setActiveTab] = useState<'pipeline' | 'math' | 'benchmarks'>('pipeline');

  return (
    <section className="min-h-[calc(100vh-6rem)] py-12 px-4 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <MonoBadge variant="gold">SEC-04 // ARCH DIAGRAMS</MonoBadge>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text">
          System Architecture & Case Studies
        </h2>
        <p className="font-mono text-xs text-text-muted">
          Deep technical breakdown, vector pipelines, mathematical representations, and throughput profiles.
        </p>
      </div>

      {/* Project selector pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {projects.map((proj) => {
          const isSelected = selectedProject.id === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`p-4 rounded-xl border text-left transition-all font-mono ${
                isSelected
                  ? 'bg-bg-secondary/90 border-gold shadow-gold-glow text-text'
                  : 'bg-bg-secondary/40 border-white/10 text-text-muted hover:border-gold/30 hover:bg-white/5'
              }`}
            >
              <div className="text-[10px] text-gold uppercase tracking-wider mb-1">
                {proj.category}
              </div>
              <div className="font-bold text-sm truncate">{proj.title}</div>
            </button>
          );
        })}
      </div>

      {/* Main Case Study Panel */}
      <GlassCard variant="gold-border" className="p-6 lg:p-8">
        {/* Selected Project Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-gold uppercase tracking-widest">
                SYSTEM SPECIFICATION
              </span>
              <MonoBadge variant="cyan">{selectedProject.simulatorId.toUpperCase()} ENGINE</MonoBadge>
            </div>
            <h3 className="font-display font-bold text-2xl text-text">
              {selectedProject.title}
            </h3>
            <p className="font-mono text-xs text-text-muted mt-1">
              {selectedProject.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <GoldButton
              size="sm"
              variant="primary"
              icon={<Play className="w-3.5 h-3.5" />}
              onClick={() => {
                setActiveSimulator(selectedProject.simulatorId);
                setActiveSection('projects');
              }}
            >
              Launch Simulator
            </GoldButton>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'pipeline'
                ? 'bg-gold text-bg font-bold'
                : 'text-text-muted hover:text-text hover:bg-white/5'
            }`}
          >
            Dataflow Pipeline
          </button>
          <button
            onClick={() => setActiveTab('math')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'math'
                ? 'bg-gold text-bg font-bold'
                : 'text-text-muted hover:text-text hover:bg-white/5'
            }`}
          >
            Mathematical Formulation
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'benchmarks'
                ? 'bg-gold text-bg font-bold'
                : 'text-text-muted hover:text-text hover:bg-white/5'
            }`}
          >
            Latency & Metrics
          </button>
        </div>

        {/* Tab 1: Pipeline Breakdown */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 font-mono text-xs">
                <div className="flex items-center gap-2 text-gold font-bold mb-2">
                  <Database className="w-4 h-4" />
                  <span>Phase 1: Ingestion & Prep</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  Raw multimodal inputs (unstructured tweets, RTSP camera frames, or RGB botanical photos)
                  are normalized, stripped of artifacts, and standardized for model feeding.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 font-mono text-xs">
                <div className="flex items-center gap-2 text-gold font-bold mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>Phase 2: Dense Feature Vector</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  Deep network layers or transformer encoders generate dense embedding representations
                  capturing semantic relationships or spatial convolutional activations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 font-mono text-xs">
                <div className="flex items-center gap-2 text-gold font-bold mb-2">
                  <Layers className="w-4 h-4" />
                  <span>Phase 3: Classification & Action</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  High-throughput downstream evaluation: UMAP-HDBSCAN clustering, dlib Euclidean distance
                  thresholding with SQLite logging, or FastAPI Grad-CAM predictions.
                </p>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="p-4 rounded-xl bg-bg/80 border border-white/10 font-mono text-xs space-y-2">
              <div className="text-gold font-semibold uppercase text-[11px]">
                Engineering Highlights & Safety Bounds:
              </div>
              <ul className="space-y-1.5 text-text-muted">
                {selectedProject.highlights.map((highlight: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Mathematical Formulation */}
        {activeTab === 'math' && (
          <div className="space-y-4 font-mono text-xs animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-bg/90 border border-white/10 space-y-3">
              <div className="text-gold font-bold text-sm">
                Mathematical Model Representation
              </div>
              <div className="text-text-muted text-xs leading-relaxed space-y-2">
                {selectedProject.id === 'disaster-nlp' && (
                  <div>
                    <p>Cosine similarity optimization over Sentence-BERT embedding space E(s) in ℝ³⁸⁴:</p>
                    <code className="text-gold block p-2.5 my-2 bg-black/40 rounded border border-white/5">
                      cos(u, v) = (u · v) / (||u||₂ ||v||₂)
                    </code>
                    <p>
                      Followed by fuzzy simplicial set topological projection via UMAP to ℝ⁵ and mutual
                      reachability distance clustering under HDBSCAN.
                    </p>
                  </div>
                )}
                {selectedProject.id === 'face-attendance' && (
                  <div>
                    <p>Triplet loss minimization generating 128-dimensional biometric embeddings f(x) in ℝ¹²⁸:</p>
                    <code className="text-gold block p-2.5 my-2 bg-black/40 rounded border border-white/5">
                      L = max(||f(x_a) - f(x_p)||² - ||f(x_a) - f(x_n)||² + α, 0)
                    </code>
                    <p>Decision boundary evaluated with optimal Euclidean margin threshold τ = 0.60.</p>
                  </div>
                )}
                {selectedProject.id === 'agrodetect-cnn' && (
                  <div>
                    <p>Categorical cross-entropy loss with spatial Grad-CAM activation mapping:</p>
                    <code className="text-gold block p-2.5 my-2 bg-black/40 rounded border border-white/5">
                      L_CE = - Σ y_c log(p_c) | α_k^c = (1/Z) Σ_i Σ_j (∂y^c / ∂A_ij^k)
                    </code>
                    <p>Regularized via batch normalization and dropout (p = 0.3).</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Benchmarks */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-4 animate-in fade-in duration-200 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {selectedProject.metrics.map((m: { label: string; value: string }, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[10px] text-text-subtle uppercase">{m.label}</div>
                  <div className="text-2xl font-bold text-gold mt-1">{m.value}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Production Tested</div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-bg/80 border border-white/10 text-text-muted text-[11px] leading-relaxed">
              All benchmarks were evaluated on standard hardware profiles (NVIDIA RTX GPU / local edge Intel i7)
              with consistent seed randomization and batch latency normalization.
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="text-text-subtle">MODULE STATUS: PRODUCTION READY</span>
          <button
            onClick={() => setActiveSection('expertise')}
            className="text-gold hover:underline flex items-center gap-1.5"
          >
            <span>Review Full Skill Vector Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </GlassCard>
    </section>
  );
};

export default CaseStudyView;
