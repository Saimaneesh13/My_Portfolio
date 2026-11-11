import React, { Component, type ReactNode } from 'react'
import { useSceneStore } from '../../store/useSceneStore'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  dismissed: boolean
}

export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    dismissed: false,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, dismissed: false }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[WebGL Canvas Error]:', error, info)
  }

  handleEnter2D = () => {
    this.setState({ dismissed: true })
    useSceneStore.getState().setFlowState('home')
    window.location.hash = '#home'
  }

  render() {
    if (this.state.hasError && !this.state.dismissed) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full items-center justify-center p-6 text-center pointer-events-auto z-40">
            <div className="max-w-xl rounded-2xl border border-gold/35 bg-[#0a101d]/95 p-7 backdrop-blur-xl shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian/80 border border-gold/30">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-gold">Chrome WebGL Notice</span>
              </div>

              <h3 className="mt-4 font-display text-lg font-medium text-pure">
                Hardware Acceleration is Turned Off in Chrome
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-mist">
                Chrome failed to create a 3D WebGL context (<code className="text-red-400 text-xs font-mono">Error creating WebGL context</code>) because Chrome's graphics acceleration is currently disabled.
              </p>

              <div className="mt-4 rounded-xl bg-space/80 border border-gold/15 p-4 text-left text-xs space-y-2">
                <div className="font-mono font-medium text-gold uppercase tracking-wider text-[10px]">How to Enable 3D Graphics:</div>
                <ol className="list-decimal list-inside space-y-1 text-pure/85">
                  <li>Open a new tab and paste: <span className="font-mono text-gold-champagne bg-obsidian px-1.5 py-0.5 rounded select-all">chrome://settings/system</span></li>
                  <li>Toggle ON: <strong className="text-pure">"Use graphics acceleration when available"</strong></li>
                  <li>Click <strong className="text-gold">Relaunch</strong> on that page</li>
                </ol>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => this.setState({ hasError: false, error: null })}
                  className="btn-ghost-gold text-xs"
                >
                  Retry 3D Canvas
                </button>
                <button
                  type="button"
                  onClick={this.handleEnter2D}
                  className="btn-gold text-xs"
                >
                  Continue to Portfolio (2D Mode)
                </button>
              </div>
            </div>
          </div>
        )
      )
    }

    if (this.state.dismissed) return null

    return this.props.children
  }
}

export class PostprocessingErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
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
