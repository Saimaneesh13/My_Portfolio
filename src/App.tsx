import { useEffect } from 'react'
import { useSceneStore, type FlowState } from './store/useSceneStore'
import CoreScene from './components/canvas/CoreScene'
import Navbar from './components/layout/Navbar'
import GreetOverlay from './components/layout/GreetOverlay'
import TelemetryHud from './components/layout/TelemetryHud'
import CommandPalette from './components/layout/CommandPalette'
import HomeView from './components/views/HomeView'
import AboutView from './components/views/AboutView'
import ProjectsView from './components/views/ProjectsView'
import CaseStudyView from './components/views/CaseStudyView'
import ExpertiseView from './components/views/ExpertiseView'
import ContactView from './components/views/ContactView'

const VALID_HASHES: FlowState[] = ['greet', 'about', 'home', 'projects', 'case-study', 'expertise', 'contact']

export default function App() {
  const { flowState, isCanvasDimmed, setFlowState } = useSceneStore()

  // Sync browser URL hash with Zustand store
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '') as FlowState
      if (VALID_HASHES.includes(rawHash)) {
        setFlowState(rawHash)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    if (window.location.hash) handleHashChange()
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [setFlowState])

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-space text-pure select-none">
      {/* 1. Persistent 3D WebGL Canvas */}
      <div
        className={`fixed inset-0 z-0 transition-all duration-1000 ${
          isCanvasDimmed ? 'blur-[3px] brightness-[0.42]' : 'blur-0 brightness-100'
        }`}
      >
        <CoreScene />
      </div>

      {/* 2. Top Navigation & Telemetry HUD */}
      {flowState !== 'greet' && flowState !== 'morph' && <Navbar />}
      <TelemetryHud />
      <CommandPalette />

      {/* 3. Greeting Intro Card */}
      {flowState === 'greet' && <GreetOverlay />}

      {/* 4. Active Portfolio View Layer */}
      <main className="relative z-10 pointer-events-none">
        {flowState === 'about' && <AboutView />}
        {flowState === 'home' && <HomeView />}
        {flowState === 'projects' && <ProjectsView />}
        {flowState === 'case-study' && <CaseStudyView />}
        {flowState === 'expertise' && <ExpertiseView />}
        {flowState === 'contact' && <ContactView />}
      </main>
    </div>
  )
}
