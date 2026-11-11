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
          <div className="flex h-full w-full items-center justify-center p-8 text-center">
            <div className="max-w-md rounded-xl border border-gold/30 bg-space-light/80 p-6 backdrop-blur">
              <div className="font-mono text-xs uppercase tracking-widest text-gold">WebGL Notice</div>
              <p className="mt-2 text-sm text-mist">
                3D WebGL rendering encountered an issue or hardware acceleration is disabled. The interactive 2D portfolio remains fully operational.
              </p>
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
