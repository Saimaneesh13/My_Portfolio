import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '../../store/useSceneStore';
import { GRAPHICS_CONFIG, COLORS } from '../../lib/constants';
import {
  generateFibonacciSphere,
  generateTorusKnotPoints,
  generateRandomAttributes,
  generateNeuralConnections,
} from '../../lib/webgl/core-geometry';
import { samplePortraitAsync, SamplerResult } from '../../lib/webgl/portrait-sampler';

import morphVert from '../../lib/webgl/shaders/morph.vert.glsl';
import morphNodeFrag from '../../lib/webgl/shaders/morph-node.frag.glsl';
import morphLineFrag from '../../lib/webgl/shaders/morph-line.frag.glsl';

export const NeuralCore: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Store state
  const uProgress = useSceneStore((state) => state.uProgress);
  const inspectMode = useSceneStore((state) => state.inspectMode);
  const audioReactivity = useSceneStore((state) => state.audioReactivity);

  // Node count
  const count = GRAPHICS_CONFIG.NODE_COUNT;

  // Initial geometries
  const basePositions = useMemo(() => generateFibonacciSphere(count, 1.6), [count]);
  const defaultTargetPositions = useMemo(() => generateTorusKnotPoints(count, 1.7, 0.4), [count]);
  const randomAttributes = useMemo(() => generateRandomAttributes(count), [count]);
  const linePositions = useMemo(
    () => generateNeuralConnections(basePositions, GRAPHICS_CONFIG.CONNECTION_MAX_DISTANCE, GRAPHICS_CONFIG.MAX_LINES),
    [basePositions]
  );

  // Shader Uniforms for Points
  const pointsUniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uAudioReactivity: { value: 0 },
      uNoiseStrength: { value: 0.12 },
      uInspectIntensity: { value: 0 },
      uColorGold: { value: new THREE.Color(COLORS.gold) },
      uColorCyan: { value: new THREE.Color(COLORS.cyan) },
    }),
    []
  );

  // Shader Uniforms for Lines
  const linesUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorGold: { value: new THREE.Color(COLORS.gold) },
      uAlphaMultiplier: { value: 0.35 },
    }),
    []
  );

  // Buffer Geometry reference
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  // Async portrait morph buffer loading
  useEffect(() => {
    let isMounted = true;
    samplePortraitAsync('/images/maneesh.jpg', count).then((result: SamplerResult) => {
      if (!isMounted || !geometryRef.current) return;
      // Overwrite target position attribute with portrait samples
      const attr = geometryRef.current.getAttribute('aTargetPosition') as THREE.BufferAttribute;
      if (attr && result.positions.length >= count * 3) {
        attr.copyArray(result.positions.subarray(0, count * 3));
        attr.needsUpdate = true;
      }
    });

    return () => {
      isMounted = false;
    };
  }, [count]);

  // Animation Loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Rotate core slowly
    if (groupRef.current) {
      const rotationSpeed = inspectMode ? 0.05 : 0.18;
      groupRef.current.rotation.y += delta * rotationSpeed;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.08;
    }

    // Update point uniforms
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = time;
      mat.uniforms.uProgress.value = THREE.MathUtils.lerp(
        mat.uniforms.uProgress.value,
        uProgress,
        delta * 3.0
      );
      mat.uniforms.uAudioReactivity.value = THREE.MathUtils.lerp(
        mat.uniforms.uAudioReactivity.value,
        audioReactivity,
        delta * 6.0
      );
      mat.uniforms.uInspectIntensity.value = THREE.MathUtils.lerp(
        mat.uniforms.uInspectIntensity.value,
        inspectMode ? 1.0 : 0.0,
        delta * 4.0
      );
    }

    // Update line uniforms
    if (linesRef.current) {
      const lineMat = linesRef.current.material as THREE.ShaderMaterial;
      lineMat.uniforms.uTime.value = time;
      lineMat.uniforms.uAlphaMultiplier.value = inspectMode ? 0.6 : 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Neural Nodes Point Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={basePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aTargetPosition"
            count={count}
            array={defaultTargetPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aRandom"
            count={count}
            array={randomAttributes}
            itemSize={4}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={morphVert}
          fragmentShader={morphNodeFrag}
          uniforms={pointsUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Synaptic Connection Lines */}
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <shaderMaterial
            vertexShader={`
              varying vec3 vPosition;
              void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={morphLineFrag}
            uniforms={linesUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}

      {/* Inner Energy Core Glow Halo (TODO: Replace with customized PostProcessing Bloom or Volumetric Fog) */}
      <mesh scale={0.7}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={COLORS.gold}
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
};

export default NeuralCore;
