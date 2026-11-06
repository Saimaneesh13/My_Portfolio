import React from 'react'

/**
 * NeuralCore - The primary WebGL particle mesh, custom morph shaders, and orbital rings
 * are implemented inside CoreScene.tsx (NeuralCoreMesh). This component is preserved as an extension point.
 */
export interface NeuralCoreProps {
  children?: React.ReactNode
}

export const NeuralCore: React.FC<NeuralCoreProps> = ({ children }) => {
  return <>{children}</>
}

export default NeuralCore
