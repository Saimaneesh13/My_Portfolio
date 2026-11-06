import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { NeuralCore } from './NeuralCore';
import { COLORS } from '../../lib/constants';

export interface CoreSceneProps {
  className?: string;
}

export const CoreScene: React.FC<CoreSceneProps> = ({ className = '' }) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Subtle Ambient & Key Point Lights for Neural Mesh illumination */}
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color={COLORS.gold} />
          <pointLight position={[-5, -5, -3]} intensity={0.8} color={COLORS.cyan} />

          {/* Camera Controller with Section Presets & Mouse Parallax */}
          <CameraRig />

          {/* Core Procedural Neural Morph Mesh */}
          <NeuralCore />

          {/* Preload Three.js WebGL assets */}
          <Preload all />

          {/* 
            TODO (Advanced Phase): 
            Integrate EffectComposer with Selective Bloom, Chromatic Aberration, 
            and Vignette from @react-three/postprocessing.
          */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CoreScene;
