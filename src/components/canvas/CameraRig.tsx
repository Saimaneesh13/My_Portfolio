import React from 'react'

/**
 * CameraRig - Camera orientation and drag-to-rotate handling are integrated directly
 * within CoreScene.tsx. This component is preserved as an extension point.
 */
export interface CameraRigProps {
  children?: React.ReactNode
}

export const CameraRig: React.FC<CameraRigProps> = ({ children }) => {
  return <>{children}</>
}

export default CameraRig
