import React, { useEffect, useRef } from 'react'
import { useSceneStore } from '../store/useSceneStore'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  retryKey: number
}

// High-speed 3D-projected HTML5 2D Canvas fallback so the Golden Core/Brain/Portrait NEVER disappears or shows an error card!
function FallbackGoldenCoreCanvas({ onRetryWebGL }: { onRetryWebGL: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { flowState } = useSceneStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const onResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // Generate 1,400 golden 3D sphere/circuit nodes
    const count = 1400
    const pts: { x: number; y: number; z: number; size: number; alpha: number }[] = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const r = i % 9 === 0 ? 0.32 : 1.85 + (i % 3) * 0.08
      pts.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
        size: i % 9 === 0 ? 2.2 : 1.3,
        alpha: i % 9 === 0 ? 0.95 : 0.45 + (i % 5) * 0.1,
      })
    }

    const startTime = performance.now()

    const render = (now: number) => {
      const t = (now - startTime) * 0.001
      ctx.clearRect(0, 0, width, height)

      const isDesktop = width >= 1024
      let centerX = width * 0.5
      let centerY = height * 0.5
      let scale = Math.min(width, height) * 0.19

      if (flowState === 'home' && isDesktop) {
        centerX = width * 0.72
      } else if (flowState === 'case-study' && isDesktop) {
        centerX = width * 0.86
        centerY = height * 0.34
        scale = Math.min(width, height) * 0.22
      } else if (flowState === 'about' && isDesktop) {
        centerX = width * 0.73
      }

      // Soft ambient golden core glow
      const grad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, scale * 1.35)
      grad.addColorStop(0, 'rgba(247, 217, 160, 0.28)')
      grad.addColorStop(0.25, 'rgba(234, 183, 103, 0.12)')
      grad.addColorStop(1, 'rgba(7, 11, 19, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(centerX, centerY, scale * 1.35, 0, Math.PI * 2)
      ctx.fill()

      const rotY = t * 0.22
      const rotX = Math.sin(t * 0.3) * 0.15
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      for (let i = 0; i < count; i++) {
        const p = pts[i]
        // Rotate Y then X
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.z * cosY + p.x * sinY
        const y1 = p.y * cosX - z1 * sinX
        const z2 = z1 * cosX + p.y * sinX

        const perspective = 4.2 / (4.2 - z2)
        const sx = centerX + x1 * scale * perspective * 0.52
        const sy = centerY + y1 * scale * perspective * 0.52

        ctx.fillStyle = `rgba(234, 183, 103, ${p.alpha * Math.max(0.25, (z2 + 2.2) / 4.0)})`
        ctx.fillRect(sx, sy, p.size * perspective, p.size * perspective)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [flowState])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <button
        type="button"
        onClick={onRetryWebGL}
        className="fixed bottom-4 left-4 z-50 pointer-events-auto px-3 py-1 rounded-full bg-obsidian/80 border border-gold/30 font-mono text-[10px] text-gold hover:border-gold transition-colors"
      >
        ↻ Restore WebGL 3D
      </button>
    </div>
  )
}

export class CanvasErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, retryKey: 0 }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true }
  }

  handleRetry = () => {
    this.setState((prev) => ({ hasError: false, retryKey: prev.retryKey + 1 }))
  }

  render() {
    if (this.state.hasError) {
      return <FallbackGoldenCoreCanvas onRetryWebGL={this.handleRetry} />
    }
    return <React.Fragment key={this.state.retryKey}>{this.props.children}</React.Fragment>
  }
}

export class PostprocessingErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    console.warn('[Postprocessing Bloom Error]: Falling back to clean un-bloomed 3D render', error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export default CanvasErrorBoundary
