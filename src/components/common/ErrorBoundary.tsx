import React, { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[WebGL Canvas Error]:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full items-center justify-center p-8 text-center pointer-events-auto">
            <div className="max-w-xl rounded-xl border border-gold/30 bg-space-light/95 p-6 backdrop-blur shadow-2xl">
              <div className="font-mono text-xs uppercase tracking-widest text-gold">WebGL Notice</div>
              <p className="mt-2 text-sm text-mist">
                3D WebGL rendering encountered an issue or hardware acceleration is disabled. The interactive 2D portfolio remains fully operational.
              </p>
              {this.state.error && (
                <div className="mt-3 text-left">
                  <div className="font-mono text-xs font-semibold text-red-400">
                    {this.state.error.name}: {this.state.error.message}
                  </div>
                  <pre className="mt-2 max-h-48 overflow-auto rounded bg-space p-2 font-mono text-[10px] leading-tight text-mist/80 select-text">
                    {this.state.error.stack || 'No stack trace available'}
                  </pre>
                </div>
              )}
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="btn-ghost-gold mt-4 text-xs"
              >
                Retry 3D Canvas
              </button>
            </div>
          </div>
        )
      )
    }

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
