import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import {
  CORE_COLOR,
  SPACE_COLOR,
  createDustGeometry,
  createOrbitGeometry,
  morphFragmentShader,
  morphLineFragmentShader,
  morphVertexShader,
} from '../../lib/webgl/core-geometry'
import {
  createProceduralPortraitCanvas,
  samplePortraitAndCore,
  type MorphSystemData,
} from '../../lib/webgl/portrait-sampler'
import { useSceneStore } from '../../store/useSceneStore'
import { PostprocessingErrorBoundary } from '../common/ErrorBoundary'

const DEFAULT_PORTRAIT_URL = '/images/maneesh.jpg'
const DEFAULT_BRAIN_URL = '/images/brain.png'

function CoreParticles() {
  const { size } = useThree()
  const {
    flowState,
    targetProgress,
    targetCvProgress,
    targetBrainProgress,
    isCvPaperOpen,
    manualProgress,
    customImageSrc,
  } = useSceneStore()

  const rootGroup = useRef<THREE.Group>(null)
  const morphGroup = useRef<THREE.Group>(null)
  const orbitGroup = useRef<THREE.Group>(null)
  const kernelGroup = useRef<THREE.Group>(null)
  const bloomRef = useRef<any>(null)
  const smoothViewOffsetRef = useRef(0)

  const outerOrbitMat = useRef<THREE.LineBasicMaterial>(null)
  const innerOrbitMat = useRef<THREE.LineBasicMaterial>(null)
  const icoInnerMat = useRef<THREE.MeshBasicMaterial>(null)
  const icoOuterMat = useRef<THREE.MeshBasicMaterial>(null)

  // Synchronous initialization so the canvas is NEVER black!
  const [morphData, setMorphData] = useState<MorphSystemData | null>(() =>
    samplePortraitAndCore(createProceduralPortraitCanvas(), 2, 0.16)
  )

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

  const outerOrbitGeo = useMemo(() => createOrbitGeometry(false), [])
  const innerOrbitGeo = useMemo(() => createOrbitGeometry(true), [])
  const dustGeo = useMemo(() => createDustGeometry(), [])

  // Load both /images/maneesh.jpg and /images/brain.png
  useEffect(() => {
    let activeGeo: MorphSystemData | null = null
    let isCancelled = false

    const loadImageElement = (url: string): Promise<HTMLImageElement | null> =>
      new Promise((resolve) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => resolve(img)
        img.onerror = () => resolve(null)
        img.src = url
      })

    Promise.all([
      loadImageElement(customImageSrc || DEFAULT_PORTRAIT_URL),
      loadImageElement(DEFAULT_BRAIN_URL),
    ]).then(([portraitImg, brainImg]) => {
      if (isCancelled) return
      const pSource = portraitImg || createProceduralPortraitCanvas()
      const sampled = samplePortraitAndCore(pSource, 2, 0.16, brainImg)
      if (sampled) {
        activeGeo = sampled
        setMorphData(sampled)
      }
    })

    return () => {
      isCancelled = true
      if (activeGeo) {
        activeGeo.lineGeo.dispose()
        activeGeo.nodeGeo.dispose()
      }
    }
  }, [customImageSrc])

  // Interactive Drag Rotation State
  const dragRef = useRef({ active: false, prevX: 0, prevY: 0, rotY: 0, rotX: 0 })

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input, textarea, .glass-panel')) return
      dragRef.current.active = true
      dragRef.current.prevX = e.clientX
      dragRef.current.prevY = e.clientY
    }
    const onMove = (e: MouseEvent) => {
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

    window.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const elapsed = state.clock.elapsedTime
    uniforms.uTime.value = elapsed

    const desiredProgress = manualProgress !== null ? manualProgress : targetProgress
    uniforms.uProgress.value = THREE.MathUtils.damp(uniforms.uProgress.value, desiredProgress, 3.2, dt)
    uniforms.uCvProgress.value = THREE.MathUtils.damp(uniforms.uCvProgress.value, targetCvProgress, 3.4, dt)
    uniforms.uBrainProgress.value = THREE.MathUtils.damp(
      uniforms.uBrainProgress.value,
      targetBrainProgress,
      3.4,
      dt
    )

    const p = uniforms.uProgress.value
    const brainPresence = uniforms.uBrainProgress.value
    const activeMorph = Math.max(Math.max(p, uniforms.uCvProgress.value), brainPresence)
    const spherePresence = Math.max(0.0, 1.0 - activeMorph * 1.12)

    // Cross-fade opacity when switching between 3D Golden CV and White CV on About page
    const targetFade = flowState === 'about' && isCvPaperOpen ? 0.0 : 1.0
    uniforms.uFade.value = THREE.MathUtils.damp(uniforms.uFade.value, targetFade, 6.0, dt)
    if (morphGroup.current) {
      morphGroup.current.visible = uniforms.uFade.value > 0.02
    }

    // Dynamic Bloom: rich fiery glow on Sphere & Brain circuitry, crisp on Portrait
    if (bloomRef.current) {
      const targetBloom =
        flowState === 'expertise'
          ? 1.18
          : THREE.MathUtils.lerp(1.25, 0.76, p)
      bloomRef.current.intensity = THREE.MathUtils.damp(bloomRef.current.intensity, targetBloom, 4.0, dt)
    }

    const isDesktop = size.width >= 1024

    // Smooth camera frustum shift on Home page
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

    // Per-page 3D World Position & Scale
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
        const visibleHeight = 2 * Math.tan(fovRad / 2) * cam.position.z
        const visibleWidth = visibleHeight * (size.width / size.height)

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        targetX = (centerX / size.width - 0.5) * visibleWidth
        targetY = (0.5 - centerY / size.height) * visibleHeight
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
        targetScaleX = targetScaleY = targetScaleZ = isDesktop ? 0.88 : 0.72
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
      // Subtle interactive mouse parallax on the Brain hologram while keeping its circuit lines front-facing
      const brainParallaxY = state.pointer.x * 0.1 * brainPresence
      const brainParallaxX = -state.pointer.y * 0.06 * brainPresence

      const baseRotY = elapsed * 0.16 * spherePresence + brainParallaxY + dragRef.current.rotY
      const baseRotX = Math.sin(elapsed * 0.25) * 0.1 * spherePresence + brainParallaxX + dragRef.current.rotX
      morphGroup.current.rotation.y = THREE.MathUtils.damp(morphGroup.current.rotation.y, baseRotY, 5.0, dt)
      morphGroup.current.rotation.x = THREE.MathUtils.damp(morphGroup.current.rotation.x, baseRotX, 5.0, dt)
    }

    if (orbitGroup.current) {
      orbitGroup.current.rotation.y = -elapsed * 0.05
      orbitGroup.current.rotation.z = elapsed * 0.02
    }

    // Keep the blazing golden central kernel visible inside BOTH the Sphere AND the center of brain.png!
    const kernelVisibility = Math.max(spherePresence, brainPresence * 0.92)
    if (outerOrbitMat.current) outerOrbitMat.current.opacity = 0.55 * spherePresence
    if (innerOrbitMat.current) innerOrbitMat.current.opacity = 0.8 * kernelVisibility
    if (icoInnerMat.current) icoInnerMat.current.opacity = 0.95 * kernelVisibility
    if (icoOuterMat.current) icoOuterMat.current.opacity = 0.7 * kernelVisibility

    if (kernelGroup.current) {
      kernelGroup.current.rotation.z = elapsed * 0.18
      kernelGroup.current.rotation.y = -elapsed * 0.11
      // Align kernel with the glowing sun in the middle of brain.png (slightly above center: y = 0.08)
      kernelGroup.current.position.x = THREE.MathUtils.damp(kernelGroup.current.position.x, 0, 4.0, dt)
      kernelGroup.current.position.y = THREE.MathUtils.damp(
        kernelGroup.current.position.y,
        0.08 * brainPresence,
        4.0,
        dt
      )
      const kernelPulse = 1 + Math.sin(elapsed * 1.4) * 0.04
      const kernelScale = THREE.MathUtils.lerp(1.0, 0.58, brainPresence) * Math.max(0.001, kernelVisibility)
      kernelGroup.current.scale.setScalar(kernelPulse * kernelScale)
    }
  })

  return (
    <>
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
              toneMapped={false}
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
              toneMapped={false}
            />
          </mesh>
        </group>

        <points geometry={dustGeo}>
          <pointsMaterial
            color="#8893a7"
            size={0.015}
            transparent
            opacity={0.35}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      </group>

      <PostprocessingErrorBoundary>
        <EffectComposer multisampling={0}>
          <Bloom
            ref={bloomRef}
            intensity={1.25}
            luminanceThreshold={0.52}
            luminanceSmoothing={0.65}
            mipmapBlur
            radius={0.68}
          />
        </EffectComposer>
      </PostprocessingErrorBoundary>
    </>
  )
}

export default function CoreScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        stencil: false,
        depth: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ scene, gl }) => {
        scene.background = new THREE.Color(SPACE_COLOR)
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          console.warn('[WebGL]: WebGL context lost prevented')
        })
      }}
    >
      <CoreParticles />
    </Canvas>
  )
}
