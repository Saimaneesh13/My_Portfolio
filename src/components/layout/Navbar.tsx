import React, { useState, useEffect } from 'react';
import {
  Brain,
  Search,
  Mic,
  MicOff,
  Maximize2,
  FileDown,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useSceneStore } from '../../store/useSceneStore';
import { BRAND, SECTIONS, SECTION_METAS, SectionId } from '../../lib/constants';
import { neuralAudio } from '../../lib/voice';
import { MonoBadge } from '../ui/MonoBadge';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useSceneStore((state) => state.activeSection);
  const setActiveSection = useSceneStore((state) => state.setActiveSection);
  const inspectMode = useSceneStore((state) => state.inspectMode);
  const toggleInspectMode = useSceneStore((state) => state.toggleInspectMode);
  const audioListening = useSceneStore((state) => state.audioListening);
  const setAudioListening = useSceneStore((state) => state.setAudioListening);
  const setAudioReactivity = useSceneStore((state) => state.setAudioReactivity);
  const toggleCommandPalette = useSceneStore((state) => state.toggleCommandPalette);
  const setGreetModalOpen = useSceneStore((state) => state.setGreetModalOpen);

  // Audio animation frame loop
  useEffect(() => {
    let animId: number;
    const updateAudio = () => {
      if (audioListening) {
        const { volume } = neuralAudio.getReactivity();
        setAudioReactivity(volume);
      }
      animId = requestAnimationFrame(updateAudio);
    };
    animId = requestAnimationFrame(updateAudio);
    return () => cancelAnimationFrame(animId);
  }, [audioListening, setAudioReactivity]);

  const handleAudioToggle = async () => {
    if (audioListening) {
      neuralAudio.stopListening();
      setAudioListening(false);
      setAudioReactivity(0);
    } else {
      const ok = await neuralAudio.initializeMicrophone();
      if (ok) {
        setAudioListening(true);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 lg:px-8 py-3.5 transition-all">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-2.5 rounded-2xl bg-bg-secondary/75 border border-gold/20 backdrop-blur-xl shadow-card-glass">
        {/* Brand identity */}
        <div
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-3 cursor-pointer group px-2"
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-bg shadow-gold-glow group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5 text-bg" />
            <div className="absolute inset-0 rounded-lg ring-1 ring-white/30" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wide text-text group-hover:text-gold transition-colors">
              {BRAND.name}
            </span>
            <span className="font-mono text-[10px] text-gold/80 tracking-widest uppercase">
              AI/ML Architect
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-bg/50 p-1 rounded-xl border border-white/5">
          {SECTIONS.map((secKey) => {
            const meta = SECTION_METAS[secKey];
            const isActive = activeSection === secKey;
            return (
              <button
                key={secKey}
                onClick={() => setActiveSection(secKey as SectionId)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 select-none ${
                  isActive
                    ? 'text-bg font-bold bg-gradient-to-r from-gold-dark via-gold to-gold-light shadow-sm'
                    : 'text-text-muted hover:text-text hover:bg-white/5'
                }`}
              >
                {meta.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Greet Modal Trigger */}
          <button
            onClick={() => setGreetModalOpen(true)}
            title="Audio AI Greeting"
            className="p-2 rounded-lg text-text-muted hover:text-gold hover:bg-white/5 transition-colors border border-transparent hover:border-gold/20"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Voice Reactivity */}
          <button
            onClick={handleAudioToggle}
            title={audioListening ? 'Mute Neural Audio' : 'Enable Neural Voice Reactivity'}
            className={`p-2 rounded-lg transition-colors border ${
              audioListening
                ? 'bg-gold/20 text-gold border-gold/50 shadow-gold-glow'
                : 'text-text-muted hover:text-gold hover:bg-white/5 border-transparent'
            }`}
          >
            {audioListening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* 3D Inspect Mode Toggle */}
          <button
            onClick={toggleInspectMode}
            title="Toggle 3D Inspection Mode"
            className={`p-2 rounded-lg transition-colors border ${
              inspectMode
                ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50'
                : 'text-text-muted hover:text-text hover:bg-white/5 border-transparent'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={toggleCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-bg/80 border border-white/10 text-text-muted hover:text-text hover:border-gold/30 transition-all text-xs font-mono"
          >
            <Search className="w-3.5 h-3.5 text-gold" />
            <span className="hidden xl:inline text-[11px]">Command</span>
            <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gold">⌘K</kbd>
          </button>

          {/* Resume Download */}
          <a
            href={BRAND.cvPath}
            download="Gorrela_Sai_Maneesh_CV.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/40 text-gold hover:bg-gold hover:text-bg font-mono text-xs transition-all font-semibold"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleCommandPalette}
            className="p-2 rounded-lg bg-white/5 text-text-muted hover:text-gold"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-text hover:text-gold"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-xl bg-bg-secondary/95 border border-gold/30 backdrop-blur-2xl flex flex-col gap-3 shadow-card-glass animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-mono text-xs text-gold">NAVIGATION</span>
            <MonoBadge variant="gold">SYSTEM ONLINE</MonoBadge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SECTIONS.map((secKey) => (
              <button
                key={secKey}
                onClick={() => {
                  setActiveSection(secKey as SectionId);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-left text-xs font-mono uppercase tracking-wider transition-all ${
                  activeSection === secKey
                    ? 'bg-gold text-bg font-bold'
                    : 'bg-white/5 text-text-muted hover:text-text'
                }`}
              >
                {SECTION_METAS[secKey].label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              onClick={handleAudioToggle}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-2 border ${
                audioListening ? 'bg-gold/20 text-gold border-gold/40' : 'bg-white/5 text-text-muted border-white/10'
              }`}
            >
              {audioListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              <span>{audioListening ? 'Audio Active' : 'Enable Audio'}</span>
            </button>
            <a
              href={BRAND.cvPath}
              download
              className="py-2 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 bg-gold text-bg font-bold"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
