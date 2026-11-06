import { useState } from 'react'
import { PERSONAL_BRAND } from '../../lib/portfolio-data'

export default function ContactView() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 pt-28 pb-24 flex items-center pointer-events-auto">
      <div className="w-full glass-panel rounded-2xl p-8 space-y-6">
        <div className="mono-label">06 // Professional Connections</div>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-pure">
          Let's build something meaningful.
        </h2>
        <p className="text-sm text-gold-champagne font-mono">{PERSONAL_BRAND.availability}</p>

        {sent ? (
          <div className="p-5 rounded-xl bg-gold/15 border border-gold text-sm text-pure">
            Message logged by Neural Core. Gorrela Sai Maneesh will respond shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-obsidian/80 border border-gold/25 text-sm text-pure focus:outline-none focus:border-gold"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-obsidian/80 border border-gold/25 text-sm text-pure focus:outline-none focus:border-gold"
              />
            </div>
            <input
              type="text"
              required
              placeholder="Subject (e.g., AI/ML Engineer Opportunity)"
              className="w-full px-4 py-3 rounded-lg bg-obsidian/80 border border-gold/25 text-sm text-pure focus:outline-none focus:border-gold"
            />
            <textarea
              rows={4}
              required
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-obsidian/80 border border-gold/25 text-sm text-pure focus:outline-none focus:border-gold"
            />
            <button type="submit" className="btn-gold w-full sm:w-auto">
              Transmit Message ↗
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
