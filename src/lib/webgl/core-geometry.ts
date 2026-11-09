import * as THREE from 'three'

export const CORE_COLOR = '#eab767'
export const SPACE_COLOR = '#070b13'

export function seededRandom(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

export function spherePoint(radius: number, longitude: number, latitude: number) {
  return new THREE.Vector3(
    radius * Math.cos(latitude) * Math.cos(longitude),
    radius * Math.sin(latitude),
    radius * Math.cos(latitude) * Math.sin(longitude)
  )
}

function lineBuilder() {
  const vertices: number[] = []
  const colors: number[] = []
  const gold = new THREE.Color(CORE_COLOR)

  function segment(a: THREE.Vector3, b: THREE.Vector3, intensity = 1) {
    vertices.push(a.x, a.y, a.z, b.x, b.y, b.z)
    for (let i = 0; i < 2; i++) {
      colors.push(gold.r * intensity, gold.g * intensity, gold.b * intensity)
    }
  }

  function geometry() {
    const result = new THREE.BufferGeometry()
    result.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    result.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return result
  }

  return { segment, geometry }
}

export function createCoreGeometry() {
  const random = seededRandom(731)
  const surface = lineBuilder()
  const circuitry = lineBuilder()
  const lattice = lineBuilder()
  const points: number[] = []
  const sizes: number[] = []
  const strengths: number[] = []

  function node(point: THREE.Vector3, size = 1, strength = 1) {
    points.push(point.x, point.y, point.z)
    sizes.push(size)
    strengths.push(strength)
  }

  for (let layer = 0; layer < 3; layer++) {
    const radius = 2.04 + layer * 0.095
    for (let band = -10; band <= 10; band++) {
      const latitude = (band / 11) * (Math.PI / 2)
      const offset = random() * 0.3
      for (let section = 0; section < 140; section++) {
        if (random() < 0.35) continue
        const angle = (section / 140) * Math.PI * 2 + offset
        const a = spherePoint(radius, angle, latitude)
        const b = spherePoint(radius, angle + 0.031, latitude)
        surface.segment(a, b, 0.26 + random() * 0.5)
        if (random() > 0.83) node(a, 0.7 + random(), 0.6)
      }
    }
    for (let meridian = 0; meridian < 25; meridian++) {
      const longitude = (meridian / 25) * Math.PI * 2
      for (let step = 0; step < 80; step++) {
        if (random() > 0.7) continue
        const latitude = -Math.PI / 2 + (step / 80) * Math.PI
        surface.segment(
          spherePoint(radius, longitude, latitude),
          spherePoint(radius, longitude, latitude + 0.025),
          0.2 + random() * 0.32
        )
      }
    }
  }

  for (let path = 0; path < 310; path++) {
    const radius = 1.94 + random() * 0.31
    let longitude = random() * Math.PI * 2
    let latitude = (random() - 0.5) * 2.65
    let previous = spherePoint(radius, longitude, latitude)
    const intensity = 0.35 + random() * 1.5

    for (let turn = 0; turn < 3 + Math.floor(random() * 5); turn++) {
      const horizontal = turn % 2 === 0
      const length = (0.035 + random() * 0.15) * (random() > 0.5 ? 1 : -1)
      for (let step = 0; step < 4; step++) {
        if (horizontal) longitude += length / 4
        else latitude += length / 4
        const next = spherePoint(radius, longitude, latitude)
        circuitry.segment(previous, next, intensity)
        previous = next
      }
      if (random() > 0.55) node(previous, 1 + random() * 1.6, intensity)
    }
    if (path % 5 === 0) {
      const protrusion = previous.clone().multiplyScalar(1.045)
      circuitry.segment(previous, protrusion, intensity * 0.65)
      node(protrusion, 2.5, 1.3)
    }
  }

  const interior = Array.from({ length: 180 }, () => {
    const point = spherePoint(0.5 + random() * 1.22, random() * Math.PI * 2, Math.asin(random() * 2 - 1))
    node(point, 0.5 + random(), 0.65)
    return point
  })

  interior.forEach((point, index) => {
    for (let j = index + 1; j < interior.length; j++) {
      const distance = point.distanceTo(interior[j])
      if (distance < 0.53 && distance > 0.22) {
        lattice.segment(point, interior[j], 0.18 + random() * 0.33)
      }
    }
  })

  const nodes = new THREE.BufferGeometry()
  nodes.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
  nodes.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1))
  nodes.setAttribute('aStrength', new THREE.Float32BufferAttribute(strengths, 1))

  return {
    surface: surface.geometry(),
    circuitry: circuitry.geometry(),
    lattice: lattice.geometry(),
    nodes,
  }
}

export function createOrbitGeometry(inner = false) {
  const random = seededRandom(inner ? 314 : 719)
  const builder = lineBuilder()
  const radii = inner ? [0.25, 0.34, 0.44, 0.55, 0.68, 0.81] : [2.37, 2.46, 2.28, 2.13, 1.82, 2.33]
  const rotations = [
    new THREE.Euler(0.5, 0.3, 0.1),
    new THREE.Euler(1.2, -0.3, 0.65),
    new THREE.Euler(-0.7, 1.1, 0.3),
    new THREE.Euler(0.3, -1.2, 0.9),
    new THREE.Euler(1.1, 0.6, -0.4),
    new THREE.Euler(-0.4, 0.8, 1.3),
  ]

  radii.forEach((radius, index) => {
    const rotation = rotations[index]
    const point = (r: number, angle: number) =>
      new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0).applyEuler(rotation)
    const steps = inner ? 150 : 280
    for (let i = 0; i < steps; i++) {
      if (i % (inner ? 45 : 65) < (inner ? 7 : 12)) continue
      const angle = (i / steps) * Math.PI * 2
      builder.segment(point(radius, angle), point(radius, angle + (Math.PI * 2) / steps), inner ? 1.6 : 0.65)
      if (i % 3 === 0) {
        const length = i % 9 === 0 ? 0.055 : 0.022
        builder.segment(point(radius + 0.018, angle), point(radius + length, angle), 0.8 + random() * 0.9)
      }
      if (!inner && i % 20 === 0) {
        const width = 0.045 + random() * 0.07
        builder.segment(point(radius - 0.05, angle), point(radius - 0.05, angle + width), 0.65)
        builder.segment(point(radius - 0.055, angle), point(radius - 0.11, angle), 1)
      }
    }
  })
  return builder.geometry()
}

export function createDustGeometry() {
  const random = seededRandom(38)
  const positions: number[] = []
  for (let i = 0; i < 160; i++) {
    positions.push((random() - 0.5) * 25, (random() - 0.5) * 14, (random() - 0.5) * 13 - 3)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return geometry
}

export function generateCvDocumentSegments(): { a: THREE.Vector3; b: THREE.Vector3; strength: number }[] {
  const segs: { a: THREE.Vector3; b: THREE.Vector3; strength: number }[] = []
  const W = 3.25
  const H = 4.35
  const hw = W / 2
  const hh = H / 2

  const addLine = (x1: number, y1: number, x2: number, y2: number, z = 0, strength = 1.15, subdivs = 8) => {
    for (let i = 0; i < subdivs; i++) {
      const t1 = i / subdivs
      const t2 = (i + 1) / subdivs
      segs.push({
        a: new THREE.Vector3(THREE.MathUtils.lerp(x1, x2, t1), THREE.MathUtils.lerp(y1, y2, t1), z),
        b: new THREE.Vector3(THREE.MathUtils.lerp(x1, x2, t2), THREE.MathUtils.lerp(y1, y2, t2), z),
        strength,
      })
    }
  }

  // 1. Outer CV Sheet Frame & Double Luxury Border
  addLine(-hw, hh, hw, hh, 0.04, 1.4, 24)
  addLine(hw, hh, hw, -hh, 0.04, 1.4, 28)
  addLine(hw, -hh, -hw, -hh, 0.04, 1.4, 24)
  addLine(-hw, -hh, -hw, hh, 0.04, 1.4, 28)

  const pad = 0.08
  addLine(-hw + pad, hh - pad, hw - pad, hh - pad, 0.02, 0.9, 18)
  addLine(hw - pad, hh - pad, hw - pad, -hh + pad, 0.02, 0.9, 22)
  addLine(hw - pad, -hh + pad, -hw + pad, -hh + pad, 0.02, 0.9, 18)
  addLine(-hw + pad, -hh + pad, -hw + pad, hh - pad, 0.02, 0.9, 22)

  // 2. Top Header: Name Block ("Gorrela Sai Maneesh") + Contact Metadata Lines
  addLine(-1.38, 1.85, -0.05, 1.85, 0.06, 1.45, 16)
  addLine(-1.38, 1.79, -0.05, 1.79, 0.06, 1.45, 16)
  // Left contact links (LinkedIn / GitHub)
  addLine(-1.38, 1.64, -0.25, 1.64, 0.03, 0.95, 10)
  addLine(-1.38, 1.51, -0.35, 1.51, 0.03, 0.95, 10)
  // Right contact links (Email / Phone)
  addLine(0.32, 1.64, 1.38, 1.64, 0.03, 0.95, 10)
  addLine(0.32, 1.51, 1.15, 1.51, 0.03, 0.95, 8)

  // 3. Six CV Sections matching image_de1a7e.jpg (Skills, Internship, Projects, Achievements, Certifications, Education)
  const sectionY = [1.28, 0.42, -0.18, -0.74, -1.26, -1.72]

  sectionY.forEach((sy, idx) => {
    // Section Icon Box
    addLine(-1.38, sy + 0.07, -1.26, sy + 0.07, 0.05, 1.35, 2)
    addLine(-1.26, sy + 0.07, -1.26, sy - 0.05, 0.05, 1.35, 2)
    addLine(-1.26, sy - 0.05, -1.38, sy - 0.05, 0.05, 1.35, 2)
    addLine(-1.38, sy - 0.05, -1.38, sy + 0.07, 0.05, 1.35, 2)

    // Section Title Bar + Full-Width Divider Rule
    addLine(-1.18, sy + 0.01, -0.45, sy + 0.01, 0.05, 1.35, 10)
    addLine(-1.38, sy - 0.1, 1.38, sy - 0.1, 0.02, 0.85, 20)

    if (idx === 0) {
      // SKILLS 2-Column Table Rows
      for (let r = 0; r < 6; r++) {
        const ry = sy - 0.21 - r * 0.1
        addLine(-1.36, ry, -0.68, ry, 0.03, 0.95, 6)
        addLine(-0.48, ry, 1.28 - (r % 3) * 0.18, ry, 0.02, 0.75, 14)
      }
    } else {
      // Bullet Rows + Right-Aligned Dates
      const rowCount = idx === 5 ? 2 : 3
      for (let r = 0; r < rowCount; r++) {
        const ry = sy - 0.22 - r * 0.11
        addLine(-1.32, ry, 0.88 - (r % 2) * 0.25, ry, 0.03, 0.85, 16)
        if (r === 0 && (idx === 1 || idx === 3 || idx === 4 || idx === 5)) {
          addLine(1.02, ry, 1.36, ry, 0.04, 1.1, 4)
        }
      }
    }
  })

  return segs
}

export function generateBrainSegments(): { a: THREE.Vector3; b: THREE.Vector3; strength: number }[] {
  const random = seededRandom(909)
  const segs: { a: THREE.Vector3; b: THREE.Vector3; strength: number }[] = []

  // Helper to evaluate a 3D side-profile brain surface point (facing left like image_7c5e37.jpg)
  function brainSurfacePoint(u: number, v: number, hemisphereSign: number): THREE.Vector3 {
    // u: 0..2PI (around sagittal profile), v: 0..PI (medial to lateral)
    const sinV = Math.sin(v)
    const cosV = Math.cos(v)

    // Base ellipsoid dimensions for human cerebrum
    let x = -Math.cos(u) * 1.48 * sinV
    let y = Math.sin(u) * 1.12 * sinV + 0.34
    let z = cosV * 0.88 * hemisphereSign

    // Flatten inferior base of brain and carve Sylvian fissure / temporal lobe contour
    if (y < 0.25) {
      const lowerFactor = (0.25 - y)
      y -= lowerFactor * 0.28
      // Temporal lobe bulge forward-down
      if (x > -0.45 && x < 0.55) {
        y -= Math.exp(-Math.pow((x - 0.05) / 0.42, 2)) * 0.28 * sinV
      }
      // Frontal orbital indentation
      if (x < -0.45) {
        y += Math.min(0.32, (-0.45 - x) * 0.45)
      }
    }

    // Arch the dorsal crown (parietal / frontal dome)
    if (y >= 0.25) {
      y += Math.sin(u) * 0.16 * sinV
    }

    // Gyri & Sulci cortical folds (high-frequency organic ridges)
    const fold =
      Math.sin(x * 7.5 + y * 5.2) * Math.cos(y * 7.0 - z * 6.0) * 0.055 +
      Math.sin(u * 9.0 + v * 6.0) * 0.03

    x += fold * 0.8
    y += fold * 0.8
    z += fold * 0.45 * hemisphereSign

    // Keep longitudinal fissure gap slightly separated between left/right hemispheres
    z += hemisphereSign * 0.04

    return new THREE.Vector3(x, y, z)
  }

  // 1. Cerebrum Cortical Mesh & Neural Pathways (Left & Right Hemispheres)
  ;[-1, 1].forEach((hemi) => {
    const uSteps = 44
    const vSteps = 18
    for (let iv = 1; iv <= vSteps; iv++) {
      const v = (iv / vSteps) * (Math.PI * 0.48)
      for (let iu = 0; iu < uSteps; iu++) {
        const u1 = (iu / uSteps) * Math.PI * 2
        const u2 = ((iu + 1) / uSteps) * Math.PI * 2
        const p1 = brainSurfacePoint(u1, v, hemi)
        const p2 = brainSurfacePoint(u2, v, hemi)
        segs.push({ a: p1, b: p2, strength: 1.05 + random() * 0.4 })

        // Cross-connections to form the glowing triangulated neural network on the cortex
        if (iv < vSteps && (iu + iv) % 2 === 0) {
          const vNext = ((iv + 1) / vSteps) * (Math.PI * 0.48)
          const p3 = brainSurfacePoint(u1 + 0.06, vNext, hemi)
          segs.push({ a: p1, b: p3, strength: 0.9 + random() * 0.45 })
        }
      }
    }
  })

  // 2. Cerebellum (Tucked under posterior occipital lobe: x in [0.45..1.25], y in [-0.62..-0.05])
  for (let ring = 0; ring < 14; ring++) {
    const t = ring / 13
    const phi = t * Math.PI
    const r = Math.sin(phi)
    for (let s = 0; s < 24; s++) {
      const a1 = (s / 24) * Math.PI * 2
      const a2 = ((s + 1) / 24) * Math.PI * 2
      const p1 = new THREE.Vector3(
        0.78 + Math.cos(a1) * 0.44 * r,
        -0.36 + Math.cos(phi) * 0.28,
        Math.sin(a1) * 0.52 * r
      )
      const p2 = new THREE.Vector3(
        0.78 + Math.cos(a2) * 0.44 * r,
        -0.36 + Math.cos(phi) * 0.28,
        Math.sin(a2) * 0.52 * r
      )
      segs.push({ a: p1, b: p2, strength: 1.0 })
    }
  }

  // 3. Brainstem & Spinal Cord Tract (Descending from center-back down toward pedestal)
  for (let h = 0; h < 22; h++) {
    const t1 = h / 22
    const t2 = (h + 1) / 22
    const y1 = -0.25 - t1 * 0.92
    const y2 = -0.25 - t2 * 0.92
    const shiftX1 = 0.18 + t1 * 0.16
    const shiftX2 = 0.18 + t2 * 0.16
    const rad1 = 0.22 * (1 - t1 * 0.42)
    const rad2 = 0.22 * (1 - t2 * 0.42)

    for (let c = 0; c < 12; c++) {
      const ang = (c / 12) * Math.PI * 2
      const p1 = new THREE.Vector3(shiftX1 + Math.cos(ang) * rad1, y1, Math.sin(ang) * rad1)
      const p2 = new THREE.Vector3(shiftX2 + Math.cos(ang) * rad2, y2, Math.sin(ang) * rad2)
      segs.push({ a: p1, b: p2, strength: 1.15 })
    }
  }

  // 4. Glowing Golden Hologram Pedestal Base (Concentric emitter rings at y = -1.35 to -1.55)
  const pedestalRadii = [0.65, 0.98, 1.28, 1.56, 1.82]
  pedestalRadii.forEach((pr, rIdx) => {
    const py = -1.38 - rIdx * 0.035
    const steps = 64
    for (let s = 0; s < steps; s++) {
      if (rIdx % 2 === 1 && s % 8 === 0) continue
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      // Tilt pedestal slightly in Y/Z so the concentric rings are visible in perspective
      const p1 = new THREE.Vector3(Math.cos(a1) * pr, py + Math.sin(a1) * pr * 0.18, Math.sin(a1) * pr)
      const p2 = new THREE.Vector3(Math.cos(a2) * pr, py + Math.sin(a2) * pr * 0.18, Math.sin(a2) * pr)
      segs.push({ a: p1, b: p2, strength: rIdx === 2 ? 1.5 : 1.15 })
    }
  })

  // 5. Sweeping Orbital Synaptic Rings around the Brain (matching image_7c5e37.jpg)
  const orbitConfigs = [
    { rx: 2.35, ry: 0.75, tiltZ: -0.24, tiltX: 0.35 },
    { rx: 2.25, ry: 0.85, tiltZ: 0.32, tiltX: -0.28 },
  ]
  orbitConfigs.forEach((cfg) => {
    const euler = new THREE.Euler(cfg.tiltX, 0, cfg.tiltZ)
    const steps = 72
    for (let s = 0; s < steps; s++) {
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      const p1 = new THREE.Vector3(Math.cos(a1) * cfg.rx, Math.sin(a1) * cfg.ry, 0).applyEuler(euler)
      const p2 = new THREE.Vector3(Math.cos(a2) * cfg.rx, Math.sin(a2) * cfg.ry, 0).applyEuler(euler)
      segs.push({ a: p1, b: p2, strength: 0.85 })
    }
  })

  return segs
}

export const morphVertexShader = `
  uniform float uProgress;
  uniform float uCvProgress;
  uniform float uBrainProgress;
  uniform float uTime;

  attribute vec3 aTarget;
  attribute vec3 aCvTarget;
  attribute vec3 aBrainTarget;
  attribute float aDelay;
  attribute float aStrength;
  attribute float aSize;

  varying float vStrength;
  varying vec3 vColor;
  varying float vEase;
  varying float vCvEase;
  varying float vBrainEase;

  vec3 getFlowDisplacement(vec3 pos, float factor) {
    float wave = sin(pos.y * 3.0 + uTime * 2.0) * cos(pos.x * 2.5);
    return vec3(-sin(pos.z * 2.0 + uTime * 1.4), wave, cos(pos.y * 2.0 + uTime * 1.2)) * factor;
  }

  void main() {
    vStrength = aStrength;
    vColor = color;

    float localProgress = clamp((uProgress - aDelay * 0.5) / 0.65, 0.0, 1.0);
    float ease = smoothstep(0.0, 1.0, localProgress);
    vEase = ease;

    float localCv = clamp((uCvProgress - aDelay * 0.45) / 0.65, 0.0, 1.0);
    float cvEase = smoothstep(0.0, 1.0, localCv);
    vCvEase = cvEase;

    float localBrain = clamp((uBrainProgress - aDelay * 0.45) / 0.65, 0.0, 1.0);
    float brainEase = smoothstep(0.0, 1.0, localBrain);
    vBrainEase = brainEase;

    float arc = max(max(sin(ease * 3.14159265), sin(cvEase * 3.14159265)), sin(brainEase * 3.14159265));
    vec3 midFlow = getFlowDisplacement(position, arc * 0.68);

    float activeMorph = max(max(ease, cvEase), brainEase);
    vec3 portraitBreath = vec3(
      sin(uTime * 1.5 + aTarget.y * 2.2) * 0.012,
      cos(uTime * 1.2 + aTarget.x * 2.2) * 0.012,
      sin(uTime * 1.8 + aTarget.x * 3.0) * 0.025
    ) * activeMorph;

    vec3 basePos = mix(position, aTarget, ease);
    basePos = mix(basePos, aCvTarget, cvEase);
    vec3 blendedPosition = mix(basePos, aBrainTarget, brainEase) + midFlow + portraitBreath;

    vec4 viewPosition = modelViewMatrix * vec4(blendedPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float isPortraitOnly = step(0.0, -aStrength);
    float sphereScale = mix(1.0, activeMorph, isPortraitOnly);

    float pSize = mix(aSize, aSize * 1.15, activeMorph) * sphereScale;
    gl_PointSize = clamp(pSize * (16.0 / -viewPosition.z), 0.0, 14.0);
  }
`

export const morphFragmentShader = `
  uniform vec3 uColor;
  uniform float uFade;
  varying float vStrength;
  varying float vEase;
  varying float vCvEase;
  varying float vBrainEase;

  void main() {
    float isPortraitOnly = step(0.0, -vStrength);
    float activeMorph = max(max(vEase, vCvEase), vBrainEase);
    float visibility = mix(1.0, activeMorph, isPortraitOnly) * uFade;
    if (visibility < 0.01) discard;

    float s = abs(vStrength);
    float dist = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.04, 0.22, dist);
    float glow = pow(max(0.0, 1.0 - dist * 2.0), 2.8);
    float alpha = (core * 0.85 + glow * 0.55) * visibility;

    if (alpha < 0.01) discard;

    vec3 finalColor = uColor * (0.9 + core * 1.45) * clamp(s, 0.3, 1.55);
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export const morphLineFragmentShader = `
  uniform vec3 uColor;
  uniform float uFade;
  varying vec3 vColor;
  varying float vStrength;
  varying float vEase;
  varying float vCvEase;
  varying float vBrainEase;

  void main() {
    float isPortraitOnly = step(0.0, -vStrength);
    float activeMorph = max(max(vEase, vCvEase), vBrainEase);
    float s = abs(vStrength);

    float sphereAlpha = 0.96 * (1.0 - isPortraitOnly);
    float morphedAlpha = mix(0.42, 0.62, max(vCvEase, vBrainEase)) * clamp(s, 0.3, 1.35);
    float lineAlpha = mix(sphereAlpha, morphedAlpha, activeMorph) * uFade;

    if (lineAlpha < 0.01) discard;

    vec3 sphereCol = vColor * 1.15;
    vec3 morphedCol = mix(vColor, uColor * (0.65 + s * 0.68), 0.75);
    vec3 lineCol = mix(sphereCol, morphedCol, activeMorph);

    gl_FragColor = vec4(lineCol, lineAlpha);
  }
`
