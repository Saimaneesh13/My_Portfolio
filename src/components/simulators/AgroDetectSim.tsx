import React, { useState } from 'react';
import { Leaf, CheckCircle, AlertTriangle, RefreshCw, Zap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GoldButton } from '../ui/GoldButton';
import { MonoBadge } from '../ui/MonoBadge';

export interface DiseaseSample {
  crop: string;
  condition: string;
  scientificName: string;
  confidence: number;
  treatment: string;
  severity: 'Healthy' | 'Moderate' | 'Critical';
}

const SAMPLES: DiseaseSample[] = [
  {
    crop: 'Tomato',
    condition: 'Early Blight',
    scientificName: 'Alternaria solani',
    confidence: 98.4,
    treatment: 'Apply copper-based fungicides and prune affected lower canopy leaves immediately.',
    severity: 'Moderate',
  },
  {
    crop: 'Potato',
    condition: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    confidence: 96.2,
    treatment: 'Eliminate cull piles, improve air circulation, and deploy systemic bio-fungicides.',
    severity: 'Critical',
  },
  {
    crop: 'Apple',
    condition: 'Healthy Leaf Specimen',
    scientificName: 'Malus domestica',
    confidence: 99.7,
    treatment: 'No intervention required. Maintain scheduled irrigation and soil nutrient balance.',
    severity: 'Healthy',
  },
];

export const AgroDetectSim: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isInferencing, setIsInferencing] = useState(false);
  const [diagnosed, setDiagnosed] = useState<DiseaseSample | null>(SAMPLES[0]);

  const handleRunInference = (idx: number) => {
    setSelectedIdx(idx);
    setIsInferencing(true);

    // TODO: Connect this to actual live FastAPI PyTorch backend endpoint POST /v1/predict
    setTimeout(() => {
      setDiagnosed(SAMPLES[idx]);
      setIsInferencing(false);
    }, 650);
  };

  return (
    <GlassCard variant="gold-border" className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <h3 className="font-display font-bold text-base text-text">
            AgroDetect AI // CNN Botanical Diagnostic
          </h3>
        </div>
        <MonoBadge variant="cyan">FastAPI + PyTorch CNN</MonoBadge>
      </div>

      <p className="text-xs text-text-muted mb-4 font-mono">
        Multi-class botanical pathology classifier. Evaluates leaf specimens against trained deep
        convolutional kernels with simulated Grad-CAM spatial activation.
      </p>

      {/* Specimen selection tabs */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {SAMPLES.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => handleRunInference(idx)}
            className={`p-2.5 rounded-lg border font-mono text-xs text-left transition-all ${
              selectedIdx === idx
                ? 'bg-gold/15 border-gold text-gold font-bold shadow-sm'
                : 'bg-white/5 border-white/10 text-text-muted hover:text-text hover:bg-white/10'
            }`}
          >
            <div className="text-[10px] text-text-subtle uppercase">{sample.crop}</div>
            <div className="truncate">{sample.condition}</div>
          </button>
        ))}
      </div>

      {/* Simulated Scanner Box */}
      <div className="relative rounded-xl border border-white/10 bg-bg/80 p-4 mb-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <span className="text-text-muted flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-gold" />
            CNN Feature Map
          </span>
          <span className="text-[11px] text-text-subtle">LATENCY: 84ms</span>
        </div>

        {/* Scan line effect */}
        {isInferencing && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/15 to-transparent animate-pulse" />
        )}

        {diagnosed && !isInferencing ? (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Pathology:</span>
              <span className="text-text font-bold">
                {diagnosed.crop} — {diagnosed.condition}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-text-muted">Agent:</span>
              <span className="italic text-gold">{diagnosed.scientificName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted">Model Confidence:</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400"
                    style={{ width: `${diagnosed.confidence}%` }}
                  />
                </div>
                <span className="text-emerald-400 font-bold">{diagnosed.confidence}%</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-[11px]">
              <div className="text-gold font-semibold mb-1 flex items-center gap-1">
                {diagnosed.severity === 'Healthy' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                )}
                Mitigation Protocol:
              </div>
              <p className="text-text-muted">{diagnosed.treatment}</p>
            </div>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-text-muted font-mono text-xs">
            <RefreshCw className="w-5 h-5 text-gold animate-spin" />
            <span>Forward propagating through 18 convolutional layers...</span>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <GoldButton
          size="sm"
          variant="outline"
          onClick={() => handleRunInference(selectedIdx)}
          disabled={isInferencing}
        >
          Re-Analyze Specimen
        </GoldButton>
      </div>
    </GlassCard>
  );
};

export default AgroDetectSim;
