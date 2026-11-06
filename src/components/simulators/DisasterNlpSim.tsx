import { useState } from 'react'

const SAMPLES = [
  {
    text: ' Flash flood water rising above 1st floor near NH-16 bridge, 14 elderly residents trapped on roof without power!',
    topic: 'Topic #04: Flood Rescue & Stranded Civilians',
    umap: '[-2.41, 1.88]',
    cluster: 'HDBSCAN Cluster #04 (Density Core)',
    urgency: 'CRITICAL',
    confidence: '96.4%',
  },
  {
    text: 'Transformer explosion near Sector 9 hospital, backup generator running low on diesel, ICU needs immediate fuel supply.',
    topic: 'Topic #07: Medical Infrastructure & Power Grid Failure',
    umap: '[1.92, -0.74]',
    cluster: 'HDBSCAN Cluster #07 (Density Core)',
    urgency: 'CRITICAL',
    confidence: '94.1%',
  },
  {
    text: ' Regional weather bulletin updated: heavy rainfall expected to subside by tomorrow evening across coastal districts.',
    topic: 'Topic #12: General Weather Advisory',
    umap: '[4.15, 3.10]',
    cluster: 'HDBSCAN Cluster #12 (Low-Priority Informational)',
    urgency: 'LOW',
    confidence: '91.8%',
  },
]

export default function DisasterNlpSim() {
  const [selected, setSelected] = useState(0)
  const item = SAMPLES[selected]

  return (
    <div className="glass-panel rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="mono-label">Live BERTopic + UMAP + HDBSCAN Triage Simulator</span>
        <span className="font-mono text-[11px] text-gold">Unsupervised NLP Pipeline</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {SAMPLES.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`p-3 rounded-lg text-left text-xs border transition-all ${
              selected === idx
                ? 'border-gold bg-gold/10 text-pure'
                : 'border-gold/20 bg-obsidian/40 text-mist hover:border-gold/40'
            }`}
          >
            "{s.text.slice(0, 72)}..."
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gold/20 font-mono text-xs">
        <div>
          <div className="text-[10px] text-mist">BERTopic Representation</div>
          <div className="text-pure mt-1">{item.topic}</div>
        </div>
        <div>
          <div className="text-[10px] text-mist">UMAP 2D Projection</div>
          <div className="text-gold mt-1">{item.umap}</div>
        </div>
        <div>
          <div className="text-[10px] text-mist">HDBSCAN Assignment</div>
          <div className="text-pure mt-1">{item.cluster}</div>
        </div>
        <div>
          <div className="text-[10px] text-mist">Urgency Classification</div>
          <div className={`mt-1 font-semibold ${item.urgency === 'CRITICAL' ? 'text-gold' : 'text-mist'}`}>
            {item.urgency} ({item.confidence})
          </div>
        </div>
      </div>
    </div>
  )
}
