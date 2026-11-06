import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileDown, Send, CheckCircle2, Terminal } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { GlassCard } from '../ui/GlassCard';
import { GoldButton } from '../ui/GoldButton';
import { MonoBadge } from '../ui/MonoBadge';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated transmission buffer
    // TODO: Connect this to direct mail service or serverless email endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] py-12 px-4 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <MonoBadge variant="gold">SEC-06 // SECURE CHANNEL</MonoBadge>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text">
          Initialize Communication Uplink
        </h2>
        <p className="font-mono text-xs text-text-muted">
          Connect directly for AI engineering collaborations, research initiatives, or technical roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Direct Channels & CV */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <GlassCard variant="gold-border" className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <Terminal className="w-4 h-4" />
              <h3 className="font-display font-bold text-sm uppercase tracking-wider">
                Direct Identity Endpoints
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all text-text group"
              >
                <div className="p-2 rounded bg-gold/10 text-gold group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-text-subtle">ELECTRONIC TRANSMISSION</div>
                  <div className="font-semibold text-text group-hover:text-gold transition-colors">
                    {BRAND.email}
                  </div>
                </div>
              </a>

              <a
                href={BRAND.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all text-text group"
              >
                <div className="p-2 rounded bg-gold/10 text-gold group-hover:scale-110 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-text-subtle">CODE REPOSITORIES</div>
                  <div className="font-semibold text-text group-hover:text-gold transition-colors">
                    {BRAND.github.replace('https://', '')}
                  </div>
                </div>
              </a>

              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all text-text group"
              >
                <div className="p-2 rounded bg-gold/10 text-gold group-hover:scale-110 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-text-subtle">PROFESSIONAL NETWORK</div>
                  <div className="font-semibold text-text group-hover:text-gold transition-colors">
                    {BRAND.linkedin.replace('https://', '')}
                  </div>
                </div>
              </a>
            </div>

            {/* Resume button card */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-[11px] font-mono text-text-muted mb-2">
                Need an offline dossier?
              </div>
              <a
                href={BRAND.cvPath}
                download="Gorrela_Sai_Maneesh_CV.pdf"
                className="w-full"
              >
                <GoldButton
                  variant="primary"
                  size="md"
                  icon={<FileDown className="w-4 h-4" />}
                  className="w-full"
                >
                  Download Curriculum Vitae (PDF)
                </GoldButton>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Right column: Interactive transmission form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 sm:p-8">
            <h3 className="font-display font-bold text-lg text-text mb-1">
              Send Dispatch Message
            </h3>
            <p className="font-mono text-xs text-text-muted mb-6">
              Transmissions are routed directly with verified cryptographic integrity.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-center space-y-2 animate-in fade-in duration-300">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-text">Transmission Dispatched Successfully</div>
                <p className="text-text-muted">
                  Thank you for reaching out. I will review your message and reply promptly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-gold underline hover:text-gold-light"
                  >
                    Send another dispatch
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-text-muted text-[11px]">SENDER IDENTITY // NAME</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name / organization"
                      className="w-full rounded-lg bg-bg/80 border border-white/10 px-3.5 py-2.5 text-text focus:outline-none focus:border-gold/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-text-muted text-[11px]">RETURN ADDRESS // EMAIL</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full rounded-lg bg-bg/80 border border-white/10 px-3.5 py-2.5 text-text focus:outline-none focus:border-gold/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-muted text-[11px]">COMMUNICATION SUBJECT</label>
                  <input
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Engineering / Project Collaboration / Inquiry"
                    className="w-full rounded-lg bg-bg/80 border border-white/10 px-3.5 py-2.5 text-text focus:outline-none focus:border-gold/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-muted text-[11px]">PAYLOAD // MESSAGE BODY</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your project scope, requirements, or inquiry..."
                    className="w-full rounded-lg bg-bg/80 border border-white/10 px-3.5 py-2.5 text-text focus:outline-none focus:border-gold/50"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <GoldButton
                    size="md"
                    type="submit"
                    isLoading={isSubmitting}
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Transmit Dispatch
                  </GoldButton>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ContactView;
