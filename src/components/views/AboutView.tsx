import React, { useState } from 'react';
import { GraduationCap, BookOpen, User, CheckCircle2, Award, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../lib/portfolio-data';
import { BRAND } from '../../lib/constants';
import { GlassCard } from '../ui/GlassCard';
import { MonoBadge } from '../ui/MonoBadge';

export const AboutView: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [imgError, setImgError] = useState(false);

  return (
    <section className="min-h-[calc(100vh-6rem)] py-12 px-4 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <MonoBadge variant="gold">SEC-02 // BIOMETRIC SPEC</MonoBadge>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text">
          About & Academic Foundation
        </h2>
        <p className="font-mono text-xs text-text-muted">
          Undergraduate AI/ML researcher, deep learning practitioner & 3D systems architect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Portrait / Neural Avatar placeholder */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <GlassCard variant="gold-border" className="p-4 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-gold-glow mb-4 bg-bg flex items-center justify-center">
              {!imgError ? (
                <img
                  src="/images/maneesh.jpg"
                  alt={BRAND.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-2">
                    <User className="w-8 h-8 text-gold" />
                  </div>
                  <span className="font-mono text-xs text-gold font-semibold">
                    Procedural Biometric Matrix
                  </span>
                  <span className="font-mono text-[10px] text-text-subtle mt-1">
                    Image: /images/maneesh.jpg
                  </span>
                </div>
              )}

              {/* Status overlay */}
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-bg/80 backdrop-blur-sm border border-white/10 flex items-center justify-between text-[10px] font-mono text-gold">
                <span>RECONSTRUCTION: OK</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            <h3 className="font-display font-bold text-lg text-text">{BRAND.name}</h3>
            <p className="font-mono text-xs text-gold/80 mb-3">{profile.education.degree}</p>

            <div className="w-full pt-3 border-t border-white/10 flex flex-col gap-1.5 text-left font-mono text-xs text-text-muted">
              <div className="flex justify-between">
                <span>Institution:</span>
                <span className="text-text font-semibold">{BRAND.university}</span>
              </div>
              <div className="flex justify-between">
                <span>Specialization:</span>
                <span className="text-gold font-semibold">AI & Machine Learning</span>
              </div>
              <div className="flex justify-between">
                <span>Class of:</span>
                <span className="text-text font-semibold">{BRAND.graduationYear}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right column: Bio, Education & Coursework */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <Terminal className="w-4 h-4" />
              <h4 className="font-display font-bold text-sm uppercase tracking-wider">
                Engineering Philosophy & Core Focus
              </h4>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {profile.bio}
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              My engineering approach bridges statistical rigour and production reliability:
              transforming raw multimodal sensory data (video, audio, text) into dense latent
              embeddings, optimizing convolutional filters for edge inference, and designing
              hardware-accelerated WebGL visuals to make machine intelligence transparent.
            </p>
          </GlassCard>

          {/* Academic Credentials Card */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gold" />
                <h4 className="font-display font-bold text-base text-text">
                  Formal Academic Curriculum
                </h4>
              </div>
              <MonoBadge variant="muted">2023 — 2027</MonoBadge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-mono text-xs text-gold font-bold">
                  {profile.education.degree} ({profile.education.specialization})
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  {profile.education.institution} • Graduation {profile.education.graduation}
                </div>
              </div>

              {/* Coursework pill matrix */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-gold" />
                  <span>Key Coursework & Competencies:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {profile.education.coursework.map((course: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 font-mono text-xs text-text-muted"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-bg-secondary/60 border border-white/5 font-mono">
              <Award className="w-4 h-4 text-gold mb-2" />
              <div className="text-xs text-text-muted">Research Focus</div>
              <div className="text-sm font-bold text-text mt-1">NLP & Edge Vision</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-secondary/60 border border-white/5 font-mono">
              <GraduationCap className="w-4 h-4 text-gold mb-2" />
              <div className="text-xs text-text-muted">Academic Status</div>
              <div className="text-sm font-bold text-text mt-1">Pre-Final Year (2027)</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-secondary/60 border border-white/5 font-mono">
              <Terminal className="w-4 h-4 text-gold mb-2" />
              <div className="text-xs text-text-muted">System Deployments</div>
              <div className="text-sm font-bold text-text mt-1">3 Production Engines</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutView;
