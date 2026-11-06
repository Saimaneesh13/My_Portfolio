import { useEffect, useState } from 'react'
import { useSceneStore } from '../../store/useSceneStore'

const GREETING_LINES = [
  'Hello. I am Neural Core.',
  'I guide you through the portfolio of Gorrela Sai Maneesh.',
  'Press Enter portfolio when you are ready.',
]

export default function GreetOverlay() {
  const { setFlowState, setTargetProgress } = useSceneStore()
  const [text, setText] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function runTypewriter() {
      for (const line of GREETING_LINES) {
        for (let i = 1; i <= line.length; i++) {
          if (cancelled) return
          setText(line.slice(0, i))
          await new Promise((r) => setTimeout(r, 28))
        }
        await new Promise((r) => setTimeout(r, 800))
      }
      if (!cancelled) setReady(true)
    }
    runTypewriter()
    return () => {
      cancelled = true
    }
  }, [])

  const triggerEnter = () => {
    setFlowState('morph')
    setTargetProgress(1)
    setTimeout(() => {
      window.location.hash = '#about'
      setFlowState('about')
    }, 3000)
  }

  return (
    <div className="fixed bottom-9 left-1/2 -translate-x-1/2 w-[min(92vw,460px)] p-6 glass-panel rounded-2xl z-30 pointer-events-auto">
      <div className="mono-label">Neural Core</div>
      <p className="min-h-[52px] my-4 text-base leading-relaxed text-pure">
        {text}
        <span className="text-gold animate-pulse ml-0.5">|</span>
      </p>
      <div className="flex items-center justify-between gap-3">
        <button onClick={triggerEnter} className="btn-ghost-gold" type="button">
          Skip
        </button>
        <button onClick={triggerEnter} disabled={!ready} className="btn-gold" type="button">
          Enter portfolio
        </button>
      </div>
    </div>
  )
}
