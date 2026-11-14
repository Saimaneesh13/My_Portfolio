import { useState } from 'react'
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Copy,
  Check,
  Send,
  ExternalLink,
  Award,
} from 'lucide-react'
import { PROFILE_DATA } from '../../lib/portfolio-data'

export default function ContactView() {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const copyToClipboard = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2200)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
    e.currentTarget.reset()
  }

  return (
    <div className="min-h-screen max-w-[1180px] mx-auto px-6 pt-24 pb-20 flex items-center justify-center pointer-events-none select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pointer-events-auto">
        {/* ============================================================
            LEFT COLUMN (5 Cols): DIRECT CONTACT CHANNELS & CREDENTIALS
           ============================================================ */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/35 font-mono text-[10px] text-gold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>AVAILABLE FOR AI/ML ROLES &amp; INTERNSHIPS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-pure tracking-tight">
              Let’s build something meaningful.
            </h1>
            <p className="text-xs sm:text-sm text-mist leading-relaxed">
              Reach out directly for AI/ML engineering roles, Computer Vision &amp; NLP projects, or software development collaborations.
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Email Card */}
            <div className="glass-panel rounded-2xl p-4 border border-gold/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/35 flex items-center justify-center text-gold shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-gold uppercase">Direct Email</div>
                  <a
                    href={`mailto:${PROFILE_DATA.email}`}
                    className="font-mono text-xs sm:text-sm text-pure hover:text-gold truncate block"
                  >
                    {PROFILE_DATA.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(PROFILE_DATA.email, 'email')}
                className="px-3 py-1.5 rounded-lg bg-obsidian border border-gold/30 hover:border-gold font-mono text-[10px] text-gold flex items-center gap-1.5 shrink-0"
              >
                {copiedField === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Card */}
            <div className="glass-panel rounded-2xl p-4 border border-gold/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/35 flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-gold uppercase">Mobile / WhatsApp</div>
                  <a
                    href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, '')}`}
                    className="font-mono text-xs sm:text-sm text-pure hover:text-gold"
                  >
                    {PROFILE_DATA.phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(PROFILE_DATA.phone, 'phone')}
                className="px-3 py-1.5 rounded-lg bg-obsidian border border-gold/30 hover:border-gold font-mono text-[10px] text-gold flex items-center gap-1.5 shrink-0"
              >
                {copiedField === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* LinkedIn & GitHub Split Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass-panel glass-panel-hover rounded-2xl p-3.5 border border-gold/25 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Linkedin className="w-4 h-4 text-gold shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[9.5px] text-gold uppercase">LinkedIn</div>
                    <div className="font-sans text-xs font-medium text-pure truncate">
                      /in/sai-maneesh
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-mist group-hover:text-gold shrink-0" />
              </a>

              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="glass-panel glass-panel-hover rounded-2xl p-3.5 border border-gold/25 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Github className="w-4 h-4 text-gold shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[9.5px] text-gold uppercase">GitHub</div>
                    <div className="font-sans text-xs font-medium text-pure truncate">
                      @Saimaneesh13
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-mist group-hover:text-gold shrink-0" />
              </a>
            </div>

            {/* University & Location Footer Card */}
            <div className="glass-panel rounded-2xl p-3.5 border border-gold/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <span className="text-pure font-medium">Lovely Professional University</span>
                  <span className="text-mist block text-[10.5px]">
                    B.Tech CSE (AI &amp; ML) • Punjab, India
                  </span>
                </div>
              </div>
              <Award className="w-4 h-4 text-gold shrink-0" />
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN (7 Cols): DIRECT MESSAGE TRANSMITTER
           ============================================================ */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-gold/35 shadow-[0_0_50px_rgba(234,183,103,0.12)] flex flex-col justify-between">
          <div className="mb-4">
            <div className="mono-label text-gold">// 06 // PROFESSIONAL CONNECTIONS</div>
            <h2 className="font-display text-2xl font-bold text-pure mt-1">
              Send a Direct Message
            </h2>
            <p className="text-xs text-mist mt-0.5">
              Messages are routed directly to {PROFILE_DATA.email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] text-gold uppercase mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Recruiter / Collaborator Name"
                  className="w-full bg-obsidian/90 border border-gold/25 focus:border-gold rounded-xl px-4 py-3 text-xs sm:text-sm text-pure outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-gold uppercase mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-obsidian/90 border border-gold/25 focus:border-gold rounded-xl px-4 py-3 text-xs sm:text-sm text-pure outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] text-gold uppercase mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="AI/ML Engineer Opportunity / Project Collaboration"
                className="w-full bg-obsidian/90 border border-gold/25 focus:border-gold rounded-xl px-4 py-3 text-xs sm:text-sm text-pure outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-gold uppercase mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Hi Sai Maneesh, we reviewed your AI-Based Disaster Intelligence System and AgroDetect AI projects..."
                className="w-full bg-obsidian/90 border border-gold/25 focus:border-gold rounded-xl px-4 py-3 text-xs sm:text-sm text-pure outline-none resize-none transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="btn-gold !px-6 !py-3 rounded-xl font-display text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-gold-glow"
              >
                <span>{submitted ? 'Message Transmitted ✓' : 'Transmit Message'}</span>
                <Send className="w-4 h-4" />
              </button>

              <a
                href="/cv/Gorrela_Sai_Maneesh_CV.pdf"
                download
                className="font-mono text-xs text-gold hover:underline"
              >
                Download Official CV (PDF) ↗
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}