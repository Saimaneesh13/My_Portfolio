import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import {
  CORE_COLOR,
  SPACE_COLOR,
  createOrbitGeometry,
  createDustGeometry,
  morphVertexShader,
  morphFragmentShader,
  morphLineFragmentShader,
} from '../../lib/webgl/core-geometry'
import {
  createDefaultPortraitCanvas,
  samplePortraitAndCore,
  type MorphSystemData,
} from '../../lib/webgl/portrait-sampler'
import { useSceneStore } from '../../store/useSceneStore'

function NeuralCoreMesh() {
  const { flowState, targetProgress, targetCvProgress, isCvPaperOpen, manualProgress, customImageSrc } = useSceneStore()
  const { size } = useThree()

  const rootGroup = useRef<THREE.Group>(null)
  const morphGroup = useRef<THREE.Group>(null)
  const orbitGroup = useRef<THREE.Group>(null)
  const kernelGroup = useRef<THREE.Group>(null)

  const outerOrbitMat = useRef<THREE.LineBasicMaterial>(null)
  const innerOrbitMat = useRef<THREE.LineBasicMaterial>(null)
  const icoInnerMat = useRef<THREE.MeshBasicMaterial>(null)
  const icoOuterMat = useRef<THREE.MeshBasicMaterial>(null)
  const bloomRef = useRef<any>(null)
  // Smoothly interpolated frustum offset so switching from Home -> Projects -> Case Studies never snaps!
  const smoothViewOffsetRef = useRef(0)

  const [morphData, setMorphData] = useState<MorphSystemData | null>(null)

  const outerOrbitGeo = useMemo(() => createOrbitGeometry(false), [])
  const innerOrbitGeo = useMemo(() => createOrbitGeometry(true), [])
  const dustGeo = useMemo(() => createDustGeometry(), [])

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uCvProgress: { value: 0 },
      uFade: { value: 1.0 },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(CORE_COLOR) },
    }),
    []
  )

  // Load portrait (custom upload -> /images/maneesh.jpg -> synthetic fallback)
  useEffect(() => {
    const src = customImageSrc || '/images/maneesh.jpg'
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const sampled = samplePortraitAndCore(img, 2, 0.16)
        if (sampled) {
          setMorphData(sampled)
          return
        }
      } catch {
        // Fallback if local file:// CORS blocks pixel read
      }
      setMorphData(samplePortraitAndCore(createDefaultPortraitCanvas(), 2, 0.16))
    }
    img.onerror = () => {
      setMorphData(samplePortraitAndCore(createDefaultPortraitCanvas(), 2, 0.16))
    }
    img.src = src
  }, [customImageSrc])

  // Drag rotation state
  const dragRef = useRef({ active: false, prevX: 0, prevY: 0, rotX: 0, rotY: 0 })

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button, input, a, .glass-panel')) return
      dragRef.current.active = true
      dragRef.current.prevX = e.clientX
      dragRef.current.prevY = e.clientY
    }
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return
      dragRef.current.rotY += (e.clientX - dragRef.current.prevX) * 0.006
      dragRef.current.rotX = THREE.MathUtils.clamp(
        dragRef.current.rotX + (e.clientY - dragRef.current.prevY) * 0.006,
        -0.65,
        0.65
      )
      dragRef.current.prevX = e.clientX
      dragRef.current.prevY = e.clientY
    }
    const onUp = () => {
      dragRef.current.active = false
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const elapsed = state.clock.elapsedTime
    uniforms.uTime.value = elapsed

    // 1. Smoothly damp uProgress (0 = Golden Core Sphere, 1 = 3D Portrait) & uCvProgress (1 = 3D Golden CV Hologram)
    const desiredProgress = manualProgress !== null ? manualProgress : targetProgress
    uniforms.uProgress.value = THREE.MathUtils.damp(uniforms.uProgress.value, desiredProgress, 3.2, dt)
    uniforms.uCvProgress.value = THREE.MathUtils.damp(uniforms.uCvProgress.value, targetCvProgress, 3.4, dt)

    // Pure opacity cross-fade when switching between 3D Golden CV and White CV
    const targetFade = flowState === 'about' && isCvPaperOpen ? 0.0 : 1.0
    uniforms.uFade.value = THREE.MathUtils.damp(uniforms.uFade.value, targetFade, 4.5, dt)

    const activeMorph = Math.max(uniforms.uProgress.value, uniforms.uCvProgress.value)
    const spherePresence = Math.max(0.0, 1.0 - activeMorph * 1.12)

    // 2. Smoothly transition Bloom intensity: rich glow on Sphere, crisp detail on Portrait/CV
    if (bloomRef.current) {
      const targetBloom = THREE.MathUtils.lerp(1.25, 0.72, activeMorph)
      bloomRef.current.intensity = THREE.MathUtils.damp(bloomRef.current.intensity, targetBloom, 4.0, dt)
    }

    const isDesktop = size.width >= 1024

    // 3. Smoothly interpolate camera frustum offset (eliminates the sudden snap when leaving Home or About!)
    // Shift camera frustum -23.5% on About page so the 3D CV aligns dead-center with the right 6-column grid
    const targetViewOffsetX =
      flowState === 'home' && isDesktop
        ? -size.width * 0.21
        : flowState === 'about' && isDesktop
        ? -size.width * 0.235
        : 0
    smoothViewOffsetRef.current = THREE.MathUtils.damp(
      smoothViewOffsetRef.current,
      targetViewOffsetX,
      3.8,
      dt
    )

    if (Math.abs(smoothViewOffsetRef.current) > 0.5) {
      state.camera.setViewOffset(
        size.width,
        size.height,
        smoothViewOffsetRef.current,
        0,
        size.width,
        size.height
      )
    } else {
      state.camera.clearViewOffset()
    }

    // 4. Per-Page Smooth 3D Core Choreography (Position & Scale)
    let targetX = 0
    let targetY = 0
    let targetZ = 0
    let targetScale = 1.0

    if (flowState === 'home' && isDesktop) {
      targetX = 0
      targetY = 0.04
      targetScale = 0.96
    } else if (flowState === 'projects') {
      targetX = 0
      targetY = 0.05
      targetZ = -1.2
      targetScale = 0.72
    } else if (flowState === 'case-study' && isDesktop) {
      // Positioned on the upper-right horizon like a rising planet, tucked cleanly behind the card edge
      targetX = 3.85
      targetY = 0.95
      targetZ = -1.4
      targetScale = 0.92
    } else if (flowState === 'expertise' && isDesktop) {
      targetX = 0
      targetY = 0.05
      targetZ = -0.8
      targetScale = 0.78
    } else if (flowState === 'about' && isDesktop) {
      targetX = 0
      targetY = -0.05
      targetScale = 1.0 // Stays 1.0 so it cross-fades in place without shrinking!
    } else if (flowState === 'contact') {
      targetX = 0
      targetY = 0
      targetZ = -1.5
      targetScale = 0.62
    }

    if (rootGroup.current) {
      rootGroup.current.position.x = THREE.MathUtils.damp(rootGroup.current.position.x, targetX, 3.6, dt)
      rootGroup.current.position.y = THREE.MathUtils.damp(rootGroup.current.position.y, targetY, 3.6, dt)
      rootGroup.current.position.z = THREE.MathUtils.damp(rootGroup.current.position.z, targetZ, 3.6, dt)
      const nextScale = THREE.MathUtils.damp(rootGroup.current.scale.x, targetScale, 3.6, dt)
      rootGroup.current.scale.setScalar(nextScale)
    }

    if (!dragRef.current.active) {
      dragRef.current.rotY *= Math.pow(0.95, dt * 60)
      dragRef.current.rotX *= Math.pow(0.95, dt * 60)
    }

    if (morphGroup.current) {
      const baseRotY = elapsed * 0.16 * spherePresence + dragRef.current.rotY
      const baseRotX = Math.sin(elapsed * 0.25) * 0.1 * spherePresence + dragRef.current.rotX
      morphGroup.current.rotation.y = THREE.MathUtils.damp(morphGroup.current.rotation.y, baseRotY, 6.0, dt)
      morphGroup.current.rotation.x = THREE.MathUtils.damp(morphGroup.current.rotation.x, baseRotX, 6.0, dt)
    }

    if (orbitGroup.current) {
      orbitGroup.current.rotation.y = -elapsed * 0.05
      orbitGroup.current.rotation.z = elapsed * 0.02
    }
    if (outerOrbitMat.current) outerOrbitMat.current.opacity = 0.55 * spherePresence
    if (innerOrbitMat.current) innerOrbitMat.current.opacity = 0.8 * spherePresence
    if (icoInnerMat.current) icoInnerMat.current.opacity = 0.9 * spherePresence
    if (icoOuterMat.current) icoOuterMat.current.opacity = 0.65 * spherePresence

    if (kernelGroup.current) {
      kernelGroup.current.rotation.z = elapsed * 0.18
      kernelGroup.current.rotation.y = -elapsed * 0.11
      const kernelPulse = 1 + Math.sin(elapsed * 1.4) * 0.04
      kernelGroup.current.scale.setScalar(kernelPulse * Math.max(0.001, spherePresence))
    }
  })

  return (
    <>
      <color attach="background" args={[SPACE_COLOR]} />
      <points geometry={dustGeo}>
        <pointsMaterial color="#8893a7" size={0.015} transparent opacity={0.35} depthWrite={false} sizeAttenuation />
      </points>

      <group ref={rootGroup}>
        <group ref={morphGroup}>
          {morphData && (
            <>
              <points geometry={morphData.nodeGeo}>
                <shaderMaterial
                  vertexShader={morphVertexShader}
                  fragmentShader={morphFragmentShader}
                  uniforms={uniforms}
                  vertexColors
                  transparent
                  depthWrite={false}
                  toneMapped={false}
                  blending={THREE.AdditiveBlending}
                />
              </points>
              <lineSegments geometry={morphData.lineGeo}>
                <shaderMaterial
                  vertexShader={morphVertexShader}
                  fragmentShader={morphLineFragmentShader}
                  uniforms={uniforms}
                  vertexColors
                  transparent
                  depthWrite={false}
                  toneMapped={false}
                  blending={THREE.AdditiveBlending}
                />
              </lineSegments>
            </>
          )}
        </group>

        <group ref={orbitGroup}>
          <lineSegments geometry={outerOrbitGeo}>
            <lineBasicMaterial
              ref={outerOrbitMat}
              color={CORE_COLOR}
              transparent
              opacity={0.55}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        </group>

        <group ref={kernelGroup}>
          <lineSegments geometry={innerOrbitGeo}>
            <lineBasicMaterial
              ref={innerOrbitMat}
              color={CORE_COLOR}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
          <mesh>
            <icosahedronGeometry args={[0.19, 2]} />
            <meshBasicMaterial
              ref={icoInnerMat}
              color={new THREE.Color(CORE_COLOR).multiplyScalar(1.8)}
              wireframe
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[0.5, 0.1, 0.7]}>
            <icosahedronGeometry args={[0.29, 1]} />
            <meshBasicMaterial
              ref={icoOuterMat}
              color={CORE_COLOR}
              wireframe
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>

      <EffectComposer multisampling={0}>
        <Bloom
          ref={bloomRef}
          intensity={1.35}
          luminanceThreshold={0.52}
          luminanceSmoothing={0.65}
          mipmapBlur
          radius={0.68}
        />
      </EffectComposer>
    </>
  )
}

export default function CoreScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7.6], fov: 44, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <NeuralCoreMesh />
    </Canvas>
  )
}
