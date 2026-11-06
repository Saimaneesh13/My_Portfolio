import React, { useState } from 'react';
import { Camera, UserCheck, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GoldButton } from '../ui/GoldButton';
import { MonoBadge } from '../ui/MonoBadge';

export interface AttendanceRecord {
  id: string;
  name: string;
  rollNumber: string;
  timestamp: string;
  confidence: string;
  status: 'PRESENT' | 'VERIFIED';
}

export const FaceAttendanceSim: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<AttendanceRecord[]>([
    {
      id: 'REC-0921',
      name: 'Gorrela Sai Maneesh',
      rollNumber: 'LPU-CSE-27-042',
      timestamp: '14:02:11',
      confidence: '99.4%',
      status: 'VERIFIED',
    },
    {
      id: 'REC-0920',
      name: 'Alex Rivera',
      rollNumber: 'LPU-CSE-27-108',
      timestamp: '13:58:44',
      confidence: '98.8%',
      status: 'VERIFIED',
    },
  ]);

  const handleSimulateCapture = () => {
    setIsScanning(true);

    // TODO: Connect this to actual OpenCV video capture stream and SQLite local DB via Python backend
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newRec: AttendanceRecord = {
        id: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
        name: 'Gorrela Sai Maneesh',
        rollNumber: 'LPU-CSE-27-042',
        timestamp: timeStr,
        confidence: `${(98.5 + Math.random() * 1.4).toFixed(1)}%`,
        status: 'VERIFIED',
      };
      setLogs((prev) => [newRec, ...prev.slice(0, 3)]);
      setIsScanning(false);
    }, 700);
  };

  return (
    <GlassCard variant="gold-border" className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-neon-cyan" />
          <h3 className="font-display font-bold text-base text-text">
            Face Attendance // Edge Biometrics Sim
          </h3>
        </div>
        <MonoBadge variant="cyan">OpenCV + 128D Embeddings + SQLite</MonoBadge>
      </div>

      <p className="text-xs text-text-muted mb-4 font-mono">
        Simulates live 30 FPS edge face verification. Maps 128-dimensional facial vectors and performs
        sub-millisecond SQLite ACID write transactions with zero duplicate logs.
      </p>

      {/* Simulated Camera Feed Container */}
      <div className="relative rounded-xl border border-white/15 bg-bg/90 aspect-video max-h-56 flex items-center justify-center overflow-hidden mb-4">
        {/* Subtle cyber grid backdrop */}
        <div className="absolute inset-0 bg-cyber-grid opacity-30" />

        {/* Biometric Target Bounding Box */}
        <div className="relative w-36 h-36 border-2 border-dashed border-gold/70 rounded-2xl flex flex-col items-center justify-center p-2">
          {/* Corner brackets */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gold" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gold" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gold" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gold" />

          {isScanning ? (
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 text-gold animate-spin" />
              <span className="text-[10px] font-mono text-gold animate-pulse">
                EXTRACTING 128D VECTOR
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-center">
              <UserCheck className="w-8 h-8 text-gold" />
              <span className="text-[10px] font-mono text-text font-bold">MATCH CONFIRMED</span>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                DISTANCE: 0.38
              </span>
            </div>
          )}
        </div>

        {/* Overlay Telemetry Badges */}
        <div className="absolute top-2 left-3 font-mono text-[10px] text-text-subtle flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>FPS: 31.8</span>
          <span>// CAM-01: ACTIVE</span>
        </div>
      </div>

      {/* Database sync transaction table */}
      <div className="rounded-xl bg-white/5 border border-white/5 p-3 mb-4 font-mono text-xs">
        <div className="flex items-center justify-between text-[11px] text-text-muted pb-2 border-b border-white/10 mb-2">
          <span className="flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-gold" />
            SQLite Transaction Log (`attendance.db`)
          </span>
          <span className="text-emerald-400 text-[10px]">SYNC OK</span>
        </div>
        <div className="space-y-1.5 max-h-28 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-1.5 rounded bg-bg/60 text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span className="text-gold font-bold">{log.name}</span>
                <span className="text-text-subtle text-[10px]">({log.rollNumber})</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-text-muted">{log.timestamp}</span>
                <span className="text-emerald-400 font-bold">{log.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <GoldButton
          size="sm"
          onClick={handleSimulateCapture}
          isLoading={isScanning}
          icon={<Camera className="w-3.5 h-3.5" />}
        >
          Capture Biometric Frame
        </GoldButton>
      </div>
    </GlassCard>
  );
};

export default FaceAttendanceSim;
