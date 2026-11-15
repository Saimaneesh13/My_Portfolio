import { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSceneStore, type FlowState } from './store/useSceneStore'
import CoreScene from './components/canvas/CoreScene'
import { CanvasErrorBoundary } from './components/common/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import GreetOverlay from './components/layout/GreetOverlay'
import CommandPalette from './components/layout/CommandPalette'
import HomeView from './components/views/HomeView'
import AboutView from './components/views/AboutView'
import ProjectsView from './components/views/ProjectsView'
import CaseStudyView from './components/views/CaseStudyView'
import ExpertiseView from './components/views/ExpertiseView'
import ContactView from './components/views/ContactView'

const VALID_HASHES: FlowState[] = ['greet', 'about', 'home', 'projects', 'case-study', 'expertise', 'contact']

const FLOW_ORDER: FlowState[] = [
  'home',
  'projects',
  'case-study',
  'expertise',
  'about',
  'contact',
]

// Spatial 3D page transition variants (Directional X-glide + Depth Scale + Blur)
const pageTransitionVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 56 : -56,
    y: 10,
    scale: 0.975,
    filter: 'blur(8px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -56 : 56,
    y: -10,
    scale: 0.975,
    filter: 'blur(8px)',
  }),
}

export default function App() {
  const { flowState, isCanvasDimmed, setFlowState } = useSceneStore()
  const prevIndexRef = useRef<number>(0)

  const currentIndex = Math.max(0, FLOW_ORDER.indexOf(flowState))
  const direction = currentIndex >= prevIndexRef.current ? 1 : -1

  useEffect(() => {
    prevIndexRef.current = currentIndex
  }, [currentIndex])

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
        className={`fixed inset-0 z-0 transition-all duration-1000 ${isCanvasDimmed ? 'blur-[3px] brightness-[0.42]' : 'blur-0 brightness-100'
          }`}
      >
        <CanvasErrorBoundary>
          <CoreScene />
        </CanvasErrorBoundary>
      </div>

      {/* 2. Top Navigation */}
      {flowState !== 'greet' && flowState !== 'morph' && <Navbar />}
      <CommandPalette />

      {/* 3. Greeting Intro Card */}
      {flowState === 'greet' && <GreetOverlay />}

      {/* 4. Smooth Directional Page-to-Page Transition Stage */}
      <main className="relative z-10 w-full h-full pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={flowState}
            custom={direction}
            variants={pageTransitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.46,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full h-full"
          >
            {flowState === 'home' && <HomeView />}
            {flowState === 'projects' && <ProjectsView />}
            {flowState === 'case-study' && <CaseStudyView />}
            {flowState === 'expertise' && <ExpertiseView />}
            {flowState === 'about' && <AboutView />}
            {flowState === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
