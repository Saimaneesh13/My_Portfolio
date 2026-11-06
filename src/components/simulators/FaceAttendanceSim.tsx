import { useState } from 'react'

export default function FaceAttendanceSim() {
  const [logs, setLogs] = useState([
    { id: 'LPU-CSE-001', name: 'Gorrela Sai Maneesh', dist: '0.312', time: '09:00:14 IST', status: 'VERIFIED' },
  ])

  const triggerScan = () => {
    const now = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST'
    const dist = (0.28 + Math.random() * 0.09).toFixed(3)
    setLogs((prev) => [
      { id: `LPU-CSE-00${prev.length + 1}`, name: 'Gorrela Sai Maneesh', dist, time: now, status: 'VERIFIED' },
      ...prev.slice(0, 3),
    ])
  }

  return (
    <div className="glass-panel rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="mono-label">OpenCV 128-D Biometric Matcher & SQLite Logger</span>
        <button onClick={triggerScan} className="btn-gold !px-3 !py-1 !text-xs">
          Simulate Frame Capture
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-gold/20 text-mist">
              <th className="py-2">SQLite Row ID</th>
              <th className="py-2">Matched Identity</th>
              <th className="py-2">L2 Distance</th>
              <th className="py-2">Timestamp</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((row, i) => (
              <tr key={i} className="border-b border-gold/10 text-pure">
                <td className="py-2 text-gold">{row.id}</td>
                <td className="py-2">{row.name}</td>
                <td className="py-2">{row.dist} (≤ 0.45)</td>
                <td className="py-2 text-mist">{row.time}</td>
                <td className="py-2 text-gold">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
