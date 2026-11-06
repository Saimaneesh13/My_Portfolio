import React, { useState } from 'react';
import { Send, Cpu, CheckCircle2, RefreshCw } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GoldButton } from '../ui/GoldButton';
import { MonoBadge } from '../ui/MonoBadge';

export interface TopicResult {
  cluster: string;
  urgency: number;
  keywords: string[];
  embeddingVector: number[];
  umapCoords: [number, number];
}

const PRESET_TWEETS = [
  'Flash flood surging through Main St! 3 families trapped on roof, urgent evacuation required!',
  'Power transformer exploded downtown. Traffic grids offline, emergency responders arriving.',
  'Community kitchen providing hot meals and drinking water at Sector 4 stadium.',
];

export const DisasterNlpSim: React.FC = () => {
  const [inputText, setInputText] = useState(PRESET_TWEETS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<TopicResult | null>(null);

  const handleClassify = () => {
    setIsProcessing(true);

    // Simulated BERT + UMAP + HDBSCAN Inference Pipeline
    // TODO: Connect this to actual live FastAPI microservice running BERTopic
    setTimeout(() => {
      const isUrgent =
        inputText.toLowerCase().includes('trap') ||
        inputText.toLowerCase().includes('flood') ||
        inputText.toLowerCase().includes('urgent');

      setResult({
        cluster: isUrgent ? 'Topic #1: Evacuation & Rescue Needs' : 'Topic #4: General Relief & Infrastructure',
        urgency: isUrgent ? 97.4 : 45.2,
        keywords: isUrgent
          ? ['flood', 'trapped', 'evacuation', 'urgent', 'roof']
          : ['power', 'grid', 'relief', 'community', 'water'],
        embeddingVector: Array.from({ length: 8 }).map(() => Number((Math.random() * 2 - 1).toFixed(3))),
        umapCoords: [Number((Math.random() * 4 - 2).toFixed(2)), Number((Math.random() * 4 - 2).toFixed(2))],
      });
      setIsProcessing(false);
    }, 700);
  };

  return (
    <GlassCard variant="gold-border" className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-gold animate-pulse" />
          <h3 className="font-display font-bold text-base text-text">
            AI Disaster Intelligence // Simulator
          </h3>
        </div>
        <MonoBadge variant="gold">BERTopic + UMAP + HDBSCAN</MonoBadge>
      </div>

      <p className="text-xs text-text-muted mb-4 font-mono">
        Test high-velocity emergency triage. Input raw text to compute dense Sentence-BERT vectors,
        UMAP dimensionality reduction, and HDBSCAN topic extraction.
      </p>

      {/* Preset selection */}
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESET_TWEETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setInputText(preset)}
            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 hover:bg-gold/10 hover:border-gold/30 border border-white/5 text-text-muted transition-colors text-left"
          >
            Preset #{idx + 1}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="flex flex-col gap-3 mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={3}
          placeholder="Enter crisis tweet or situational distress message..."
          className="w-full rounded-xl bg-bg/80 border border-white/10 p-3 font-mono text-xs text-text focus:outline-none focus:border-gold/50 transition-colors"
        />
        <div className="flex justify-end">
          <GoldButton
            size="sm"
            onClick={handleClassify}
            isLoading={isProcessing}
            icon={isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          >
            Compute Semantic Vectors
          </GoldButton>
        </div>
      </div>

      {/* Results HUD */}
      {result && (
        <div className="mt-4 p-4 rounded-xl bg-bg/90 border border-gold/20 font-mono text-xs space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Detected Cluster:</span>
            <span className="text-gold font-bold">{result.cluster}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-muted">Triage Priority Confidence:</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full ${result.urgency > 70 ? 'bg-red-500' : 'bg-emerald-400'}`}
                  style={{ width: `${result.urgency}%` }}
                />
              </div>
              <span className={result.urgency > 70 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                {result.urgency}%
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-text-muted text-[11px]">Keywords:</span>
            {result.keywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-gold/10 text-gold text-[10px]">
                #{kw}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] text-text-subtle flex items-center justify-between">
            <span>UMAP Coordinates: [{result.umapCoords.join(', ')}]</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              HDBSCAN Converged
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default DisasterNlpSim;
