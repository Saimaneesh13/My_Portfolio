import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Terminal,
  Layers,
  Sparkles,
  FileDown,
  Eye,
  Mail,
  Cpu,
  X,
} from 'lucide-react';
import { useSceneStore } from '../../store/useSceneStore';
import { BRAND, SECTIONS, SECTION_METAS, SectionId } from '../../lib/constants';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Simulators';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const isOpen = useSceneStore((state) => state.commandPaletteOpen);
  const setOpen = useSceneStore((state) => state.setCommandPaletteOpen);
  const setActiveSection = useSceneStore((state) => state.setActiveSection);
  const toggleInspectMode = useSceneStore((state) => state.toggleInspectMode);
  const setGreetModalOpen = useSceneStore((state) => state.setGreetModalOpen);
  const setActiveSimulator = useSceneStore((state) => state.setActiveSimulator);

  const [query, setQuery] = useState('');

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!isOpen);
      } else if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  const commands = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = SECTIONS.map((sec) => ({
      id: `nav-${sec}`,
      title: `Navigate to ${SECTION_METAS[sec].label} (${SECTION_METAS[sec].badge})`,
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-gold" />,
      action: () => {
        setActiveSection(sec as SectionId);
        setOpen(false);
      },
    }));

    const actionItems: CommandItem[] = [
      {
        id: 'act-inspect',
        title: 'Toggle 3D Neural Core Inspect Mode',
        category: 'Actions',
        icon: <Eye className="w-4 h-4 text-neon-cyan" />,
        action: () => {
          toggleInspectMode();
          setOpen(false);
        },
      },
      {
        id: 'act-greet',
        title: 'Trigger Audio Voice Greeting & Neural Wave',
        category: 'Actions',
        icon: <Sparkles className="w-4 h-4 text-gold-light" />,
        action: () => {
          setGreetModalOpen(true);
          setOpen(false);
        },
      },
      {
        id: 'act-cv',
        title: 'Download Curriculum Vitae (PDF)',
        category: 'Actions',
        icon: <FileDown className="w-4 h-4 text-emerald-400" />,
        action: () => {
          window.open(BRAND.cvPath, '_blank');
          setOpen(false);
        },
      },
      {
        id: 'act-email',
        title: `Copy Contact Email (${BRAND.email})`,
        category: 'Actions',
        icon: <Mail className="w-4 h-4 text-blue-400" />,
        action: () => {
          navigator.clipboard.writeText(BRAND.email);
          alert(`Copied ${BRAND.email} to clipboard!`);
          setOpen(false);
        },
      },
    ];

    const simItems: CommandItem[] = [
      {
        id: 'sim-disaster',
        title: 'Launch Simulator: AI Disaster NLP Triage',
        category: 'Simulators',
        icon: <Cpu className="w-4 h-4 text-gold" />,
        action: () => {
          setActiveSection('projects');
          setActiveSimulator('disaster');
          setOpen(false);
        },
      },
      {
        id: 'sim-face',
        title: 'Launch Simulator: Face Biometrics Verification',
        category: 'Simulators',
        icon: <Cpu className="w-4 h-4 text-neon-cyan" />,
        action: () => {
          setActiveSection('projects');
          setActiveSimulator('face');
          setOpen(false);
        },
      },
      {
        id: 'sim-agro',
        title: 'Launch Simulator: AgroDetect CNN Plant Diagnosis',
        category: 'Simulators',
        icon: <Cpu className="w-4 h-4 text-emerald-400" />,
        action: () => {
          setActiveSection('projects');
          setActiveSimulator('agro');
          setOpen(false);
        },
      },
    ];

    return [...navItems, ...actionItems, ...simItems];
  }, [setActiveSection, setOpen, toggleInspectMode, setGreetModalOpen, setActiveSimulator]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Terminal"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-bg/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-bg-secondary/95 border border-gold/30 shadow-gold-glow-lg overflow-hidden flex flex-col backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-bg/40">
          <Terminal className="w-4 h-4 text-gold" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent text-sm font-mono text-text placeholder-text-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-text-muted hover:text-text rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gold border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5 font-mono">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-text-muted">
              No matching neural commands found for &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs hover:bg-gold/10 hover:border-gold/30 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-md bg-white/5 group-hover:bg-gold/20 transition-colors">
                    {cmd.icon}
                  </span>
                  <span className="text-text group-hover:text-gold transition-colors">
                    {cmd.title}
                  </span>
                </div>
                <span className="text-[10px] text-text-subtle uppercase px-1.5 py-0.5 rounded bg-white/5">
                  {cmd.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-bg/60 text-[10px] font-mono text-text-subtle">
          <span className="flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-gold/60" />
            <span>Search sections, simulators, and actions</span>
          </span>
          <span>SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
