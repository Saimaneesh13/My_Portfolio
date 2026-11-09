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
  const { flowState, targetProgress, targetCvProgress, targetBrainProgress, isCvPaperOpen, manualProgress, customImageSrc } = useSceneStore()
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
      uBrainProgress: { value: 0 },
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

    // 1. Smoothly damp uProgress (0 = Golden Core Sphere, 1 = 3D Portrait), uCvProgress (1 = 3D Golden CV Hologram), and uBrainProgress (1 = 3D Golden Brain + Pedestal)
    const desiredProgress = manualProgress !== null ? manualProgress : targetProgress
    uniforms.uProgress.value = THREE.MathUtils.damp(uniforms.uProgress.value, desiredProgress, 3.2, dt)
    uniforms.uCvProgress.value = THREE.MathUtils.damp(uniforms.uCvProgress.value, targetCvProgress, 3.4, dt)
    uniforms.uBrainProgress.value = THREE.MathUtils.damp(uniforms.uBrainProgress.value, targetBrainProgress, 3.4, dt)

    // Pure opacity cross-fade when switching between 3D Golden CV and White CV
    const targetFade = flowState === 'about' && isCvPaperOpen ? 0.0 : 1.0
    uniforms.uFade.value = THREE.MathUtils.damp(uniforms.uFade.value, targetFade, 6.0, dt)

    // Also hide the mesh visibility when fully faded so zero ghost lines ever render behind the White CV
    if (morphGroup.current) {
      morphGroup.current.visible = uniforms.uFade.value > 0.02
    }

    const p = uniforms.uProgress.value
    const activeMorph = Math.max(Math.max(p, uniforms.uCvProgress.value), uniforms.uBrainProgress.value)
    const spherePresence = Math.max(0.0, 1.0 - activeMorph * 1.12)

    if (bloomRef.current) {
      const targetBloom =
        flowState === 'expertise'
          ? 1.05
          : THREE.MathUtils.lerp(1.25, 0.75, p)
      bloomRef.current.intensity = THREE.MathUtils.damp(bloomRef.current.intensity, targetBloom, 4.0, dt)
    }

    const isDesktop = size.width >= 1024

    // 1. Only use frustum viewOffset on Home; on About we use exact DOM-rect projection!
    const targetViewOffsetX = flowState === 'home' && isDesktop ? -size.width * 0.21 : 0
    smoothViewOffsetRef.current = THREE.MathUtils.damp(
      smoothViewOffsetRef.current,
      targetViewOffsetX,
      4.2,
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

    // 2. Compute exact 3D World Position & Scale
    let targetX = 0
    let targetY = 0
    let targetZ = 0
    let targetScaleX = 1.0
    let targetScaleY = 1.0
    let targetScaleZ = 1.0

    if (flowState === 'about') {
      const anchorEl = document.getElementById('cv-stage-anchor')
      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect()
        const cam = state.camera as THREE.PerspectiveCamera
        const fovRad = THREE.MathUtils.degToRad(cam.fov)
        // Visible 3D height and width at Z = 0 plane
        const visibleHeight = 2 * Math.tan(fovRad / 2) * cam.position.z
        const visibleWidth = visibleHeight * (size.width / size.height)

        // Convert HTML element center (px) -> Normalized (-0.5 to +0.5) -> 3D World (X, Y)
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        targetX = (centerX / size.width - 0.5) * visibleWidth
        targetY = (0.5 - centerY / size.height) * visibleHeight

        // Convert HTML element pixel width & height -> 3D World Scale (1:1 pixel match!)
        targetScaleX = (rect.width / size.width) * visibleWidth
        targetScaleY = (rect.height / size.height) * visibleHeight
        targetScaleZ = 1.0
      }
    } else if (flowState === 'expertise') {
      const brainAnchor = document.getElementById('brain-stage-anchor')
      if (brainAnchor) {
        const rect = brainAnchor.getBoundingClientRect()
        const cam = state.camera as THREE.PerspectiveCamera
        const fovRad = THREE.MathUtils.degToRad(cam.fov)
        const visibleHeight = 2 * Math.tan(fovRad / 2) * cam.position.z
        const visibleWidth = visibleHeight * (size.width / size.height)

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        targetX = (centerX / size.width - 0.5) * visibleWidth
        targetY = (0.5 - centerY / size.height) * visibleHeight
        targetScaleX = targetScaleY = targetScaleZ = isDesktop ? 0.92 : 0.75
      }
    } else if (flowState === 'home' && isDesktop) {
      targetX = 0
      targetY = 0.04
      targetScaleX = targetScaleY = targetScaleZ = 0.96
    } else if (flowState === 'projects') {
      targetZ = -1.2
      targetScaleX = targetScaleY = targetScaleZ = 0.72
    } else if (flowState === 'case-study' && isDesktop) {
      targetX = 3.85
      targetY = 0.95
      targetZ = -1.4
      targetScaleX = targetScaleY = targetScaleZ = 0.92
    } else if (flowState === 'contact') {
      targetZ = -1.5
      targetScaleX = targetScaleY = targetScaleZ = 0.62
    }

    if (rootGroup.current) {
      rootGroup.current.position.x = THREE.MathUtils.damp(rootGroup.current.position.x, targetX, 4.5, dt)
      rootGroup.current.position.y = THREE.MathUtils.damp(rootGroup.current.position.y, targetY, 4.5, dt)
      rootGroup.current.position.z = THREE.MathUtils.damp(rootGroup.current.position.z, targetZ, 4.5, dt)

      rootGroup.current.scale.x = THREE.MathUtils.damp(rootGroup.current.scale.x, targetScaleX, 4.5, dt)
      rootGroup.current.scale.y = THREE.MathUtils.damp(rootGroup.current.scale.y, targetScaleY, 4.5, dt)
      rootGroup.current.scale.z = THREE.MathUtils.damp(rootGroup.current.scale.z, targetScaleZ, 4.5, dt)
    }

    if (!dragRef.current.active) {
      dragRef.current.rotY *= Math.pow(0.95, dt * 60)
      dragRef.current.rotX *= Math.pow(0.95, dt * 60)
    }

    if (morphGroup.current) {
      const brainPresence = uniforms.uBrainProgress.value
      // Keep the brain centered on its anatomical side-profile with gentle ±10° 3D breathing & mouse parallax
      const brainShowcaseY =
        (-0.14 + Math.sin(elapsed * 0.55) * 0.16 + state.pointer.x * 0.22) * brainPresence
      const brainShowcaseX =
        (0.06 + Math.cos(elapsed * 0.45) * 0.05 - state.pointer.y * 0.12) * brainPresence

      const baseRotY = elapsed * 0.16 * spherePresence + brainShowcaseY + dragRef.current.rotY
      const baseRotX = Math.sin(elapsed * 0.25) * 0.1 * spherePresence + brainShowcaseX + dragRef.current.rotX

      morphGroup.current.rotation.y = THREE.MathUtils.damp(morphGroup.current.rotation.y, baseRotY, 5.0, dt)
      morphGroup.current.rotation.x = THREE.MathUtils.damp(morphGroup.current.rotation.x, baseRotX, 5.0, dt)
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
