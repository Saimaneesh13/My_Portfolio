import React, { useState } from 'react';
import { Volume2, Sparkles, X, Terminal, Play } from 'lucide-react';
import { useSceneStore } from '../../store/useSceneStore';
import { BRAND } from '../../lib/constants';
import { neuralAudio } from '../../lib/voice';
import { GoldButton } from '../ui/GoldButton';

export const GreetOverlay: React.FC = () => {
  const isOpen = useSceneStore((state) => state.greetModalOpen);
  const setOpen = useSceneStore((state) => state.setGreetModalOpen);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const greetingScript = `Hello and welcome. You are interfacing with ${BRAND.name}'s neural engineering portfolio. Specializing in Deep Learning, Real-Time Computer Vision, NLP Pipelines, and interactive 3D Web Architectures. Feel free to explore the system.`;

  const handlePlayVoice = () => {
    setIsPlaying(true);
    const spoken = neuralAudio.speak(greetingScript, () => {
      setIsPlaying(false);
    });

    if (!spoken) {
      setTimeout(() => setIsPlaying(false), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Neural Synthesizer Greeting"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-bg-secondary/95 border border-gold/40 shadow-gold-glow-lg p-6 flex flex-col gap-4 backdrop-blur-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">
              Neural Synthesizer Uplink
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded text-text-muted hover:text-text hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal display */}
        <div className="p-4 rounded-xl bg-bg/80 border border-white/5 font-mono text-xs text-text leading-relaxed flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gold/80 text-[11px]">
            <Terminal className="w-3.5 h-3.5" />
            <span>TRANSMISSION BUFFER // 44.1kHz</span>
          </div>
          <p className="text-text-muted italic">&ldquo;{greetingScript}&rdquo;</p>
        </div>

        {/* Audio Waveform visualization mockup */}
        <div className="h-12 flex items-center justify-center gap-1 bg-white/5 rounded-xl px-4 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-gradient-to-t from-gold-dark to-gold transition-all duration-150 ${
                isPlaying ? 'animate-pulse' : 'h-2'
              }`}
              style={{
                height: isPlaying ? `${Math.max(8, Math.sin(i * 0.5) * 36 + 12)}px` : '4px',
                animationDelay: `${i * 60}ms`,
              }}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <GoldButton
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Dismiss
          </GoldButton>
          <GoldButton
            variant="primary"
            size="sm"
            icon={isPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <Play className="w-4 h-4" />}
            onClick={handlePlayVoice}
            disabled={isPlaying}
          >
            {isPlaying ? 'Synthesizing...' : 'Play Audio Greeting'}
          </GoldButton>
        </div>
      </div>
    </div>
  );
};

export default GreetOverlay;
