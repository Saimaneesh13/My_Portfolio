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
  const random = seededRandom(777)
  const segs: { a: THREE.Vector3; b: THREE.Vector3; strength: number }[] = []

  // Smooth Catmull-Rom spline helper for organic cortical gyri (folds)
  function addSmoothCurve(pts2D: [number, number][], zProfile: number, strength: number, subdivs = 28) {
    const vecs = pts2D.map(([x, y]) => {
      // Dome Z depth: thicker in the middle of the lobe, tapering toward the silhouette rim
      const radial = Math.hypot(x * 0.68, (y - 0.25) * 0.85)
      const domeZ = Math.sqrt(Math.max(0.04, 1.0 - Math.min(0.96, radial * radial))) * 0.62
      return new THREE.Vector3(x, y, domeZ * zProfile)
    })
    const curve = new THREE.CatmullRomCurve3(vecs)
    const sampled = curve.getPoints(subdivs)
    for (let i = 0; i < sampled.length - 1; i++) {
      segs.push({ a: sampled[i], b: sampled[i + 1], strength })
    }
    return sampled
  }

  // 1. Both Left & Right Hemispheres (-1 and +1) so the brain has true 3D volume when rotating!
  ;[-1, 1].forEach((hemi) => {
    // Outer Cortical Silhouette Rim (Softened strength so it doesn't look like a thick neon sticker)
    const outerContour: [number, number][] = [
      [-1.36, -0.04],
      [-1.42, 0.24],
      [-1.26, 0.58],
      [-0.92, 0.88],
      [-0.42, 1.06],
      [0.14, 1.08],
      [0.68, 0.94],
      [1.10, 0.66],
      [1.32, 0.30],
      [1.26, -0.04],
      [0.92, -0.16],
      [0.46, -0.20],
      [0.14, -0.42],
      [-0.32, -0.44],
      [-0.56, -0.26],
      [-0.42, -0.08],
      [-0.88, -0.10],
      [-1.22, -0.14],
      [-1.36, -0.04],
    ]
    addSmoothCurve(outerContour, hemi * 0.25, 0.85, 90)
    addSmoothCurve(outerContour, hemi * 0.65, 0.75, 80)

    // Deep Anatomical Sulci & Winding Gyri Folds (Creates the unmistakable wrinkled brain texture)
    const gyriPaths: [number, number][][] = [
      // Sylvian Fissure (Lateral Sulcus separating Temporal Lobe)
      [[-0.46, -0.08], [-0.12, 0.04], [0.26, 0.16], [0.62, 0.32]],
      // Central Sulcus (Rolandic Fissure from crown down to Sylvian)
      [[-0.04, 1.06], [-0.12, 0.76], [-0.22, 0.44], [-0.28, 0.12]],
      // Precentral Gyrus (Motor Strip)
      [[-0.28, 1.02], [-0.34, 0.72], [-0.42, 0.42], [-0.46, 0.14]],
      // Postcentral Gyrus (Sensory Strip)
      [[0.20, 1.04], [0.12, 0.74], [0.02, 0.44], [-0.05, 0.16]],
      // Superior Frontal Gyrus (Winding upper frontal folds)
      [[-1.22, 0.52], [-0.95, 0.68], [-0.72, 0.82], [-0.48, 0.90], [-0.34, 0.82]],
      [[-1.34, 0.28], [-1.04, 0.44], [-0.76, 0.54], [-0.52, 0.66], [-0.38, 0.54]],
      // Middle & Inferior Frontal Gyri (Broca's convolution loops)
      [[-1.32, 0.04], [-1.06, 0.18], [-0.82, 0.12], [-0.62, 0.28], [-0.44, 0.22]],
      [[-1.18, -0.10], [-0.92, -0.02], [-0.68, 0.04], [-0.48, -0.04]],
      // Superior & Inferior Parietal Lobules
      [[0.22, 0.88], [0.48, 0.82], [0.72, 0.78], [0.92, 0.62]],
      [[0.14, 0.56], [0.38, 0.62], [0.62, 0.52], [0.88, 0.46], [1.12, 0.38]],
      // Occipital Gyri (Posterior visual cortex folds)
      [[0.72, 0.32], [0.96, 0.26], [1.18, 0.18], [1.28, 0.04]],
      [[0.64, 0.12], [0.92, 0.06], [1.18, -0.02]],
      // Superior, Middle & Inferior Temporal Gyri
      [[-0.48, -0.22], [-0.14, -0.14], [0.22, -0.02], [0.56, 0.12]],
      [[-0.36, -0.36], [0.02, -0.28], [0.36, -0.16], [0.68, -0.06]],
    ]

    const sampledRibbons: THREE.Vector3[][] = []
    gyriPaths.forEach((path) => {
      // Layer 2 Z-depths per gyrus so each fold has 3D rounded relief
      sampledRibbons.push(addSmoothCurve(path, hemi * 0.95, 1.15, 26))
      sampledRibbons.push(addSmoothCurve(path, hemi * 0.55, 0.85, 22))
    })

    // Connect adjacent cortical ribbons with short, local micro-axons (Matches reference constellation!)
    for (let r = 0; r < sampledRibbons.length; r++) {
      const ribA = sampledRibbons[r]
      for (let i = 0; i < ribA.length; i += 2) {
        const ptA = ribA[i]
        for (let r2 = r + 1; r2 < sampledRibbons.length; r2++) {
          const ribB = sampledRibbons[r2]
          for (let j = 0; j < ribB.length; j += 2) {
            const ptB = ribB[j]
            const d = ptA.distanceTo(ptB)
            if (d > 0.08 && d < 0.24 && random() > 0.35) {
              segs.push({ a: ptA, b: ptB, strength: 0.75 + (1.0 - d / 0.24) * 0.65 })
            }
          }
        }
      }
    }
  })

  // 2. Cerebellum (Folia Horizontal Ridges tucked under posterior lobe)
  ;[-1, 1].forEach((hemi) => {
    for (let row = 0; row < 9; row++) {
      const v = row / 8
      const cy = -0.20 - v * 0.48
      const width = Math.sin(v * Math.PI) * 0.42 + 0.12
      const cxCenter = 0.82 - Math.abs(v - 0.5) * 0.14
      const foliaPts: [number, number][] = [
        [cxCenter - width, cy + 0.03],
        [cxCenter, cy - 0.02],
        [cxCenter + width, cy + 0.02],
      ]
      addSmoothCurve(foliaPts, hemi * 0.55 * Math.sin(v * Math.PI + 0.2), 0.95, 14)
    }
  })

  // 3. Brainstem & Neural Fiber Tract (Curving organically into the lower cortex)
  for (let f = 0; f < 18; f++) {
    const angle = (f / 18) * Math.PI * 2
    const tractPts: THREE.Vector3[] = []
    for (let s = 0; s <= 14; s++) {
      const t = s / 14
      const y = -0.22 - t * 0.82
      const cx = 0.06 + t * 0.22 - Math.sin(t * Math.PI) * 0.05
      const r = 0.19 * (1.0 - t * 0.48)
      tractPts.push(new THREE.Vector3(cx + Math.cos(angle) * r, y, Math.sin(angle) * r * 0.85))
    }
    for (let i = 0; i < tractPts.length - 1; i++) {
      segs.push({ a: tractPts[i], b: tractPts[i + 1], strength: 0.9 })
    }
  }

  // 4. Holographic Golden Pedestal Base (Concentric Emitter Rings below the brainstem)
  const pedestalRadii = [0.55, 0.88, 1.18, 1.48, 1.76]
  pedestalRadii.forEach((pr, idx) => {
    const py = -1.24 - idx * 0.03
    const steps = 64
    for (let s = 0; s < steps; s++) {
      if (idx % 2 === 1 && s % 7 === 0) continue
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      const p1 = new THREE.Vector3(Math.cos(a1) * pr, py + Math.sin(a1) * pr * 0.15, Math.sin(a1) * pr)
      const p2 = new THREE.Vector3(Math.cos(a2) * pr, py + Math.sin(a2) * pr * 0.15, Math.sin(a2) * pr)
      segs.push({ a: p1, b: p2, strength: idx === 2 ? 1.25 : 0.85 })
    }
  })

  // 5. Sweeping Orbital Rings around the Brain
  const orbitConfigs = [
    { rx: 2.28, ry: 0.68, tiltZ: -0.22, tiltX: 0.32 },
    { rx: 2.16, ry: 0.76, tiltZ: 0.28, tiltX: -0.26 },
  ]
  orbitConfigs.forEach((cfg) => {
    const euler = new THREE.Euler(cfg.tiltX, 0, cfg.tiltZ)
    const steps = 72
    for (let s = 0; s < steps; s++) {
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      const p1 = new THREE.Vector3(Math.cos(a1) * cfg.rx, 0.15 + Math.sin(a1) * cfg.ry, 0).applyEuler(euler)
      const p2 = new THREE.Vector3(Math.cos(a2) * cfg.rx, 0.15 + Math.sin(a2) * cfg.ry, 0).applyEuler(euler)
      segs.push({ a: p1, b: p2, strength: 0.75 })
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
  varying float vPulse;

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

    // Traveling neural firing pulse wave across the brain cortex
    float wavePhase = sin(uTime * 2.8 - aBrainTarget.x * 2.6 + aBrainTarget.y * 2.2 + aDelay * 10.0);
    vPulse = pow(max(0.0, wavePhase), 4.0) * brainEase;

    // Live 3D breathing & floating oscillation in Brain mode
    vec3 brainFloat = vec3(
      sin(uTime * 1.6 + aBrainTarget.y * 2.5) * 0.016,
      sin(uTime * 1.8) * 0.045 + cos(uTime * 2.2 + aBrainTarget.x * 2.0) * 0.015,
      cos(uTime * 1.4 + aBrainTarget.x * 2.5) * 0.016
    ) * brainEase;

    vec3 portraitBreath = vec3(
      sin(uTime * 1.5 + aTarget.y * 2.2) * 0.012,
      cos(uTime * 1.2 + aTarget.x * 2.2) * 0.012,
      sin(uTime * 1.8 + aTarget.x * 3.0) * 0.025
    ) * max(ease, cvEase);

    vec3 basePos = mix(position, aTarget, ease);
    basePos = mix(basePos, aCvTarget, cvEase);
    vec3 blendedPosition = mix(basePos, aBrainTarget, brainEase) + midFlow + portraitBreath + brainFloat;

    vec4 viewPosition = modelViewMatrix * vec4(blendedPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float isPortraitOnly = step(0.0, -aStrength);
    float activeMorph = max(max(ease, cvEase), brainEase);
    // Keep extra Fibonacci portrait points hidden during Brain mode so only crisp synaptic nodes show!
    float sphereScale = mix(1.0, max(ease, cvEase), isPortraitOnly);

    float pSize = mix(aSize, aSize * (1.1 + vPulse * 0.55), activeMorph) * sphereScale;
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
  varying float vPulse;

  void main() {
    float isPortraitOnly = step(0.0, -vStrength);
    float visibility = mix(1.0, max(vEase, vCvEase), isPortraitOnly) * uFade;
    if (visibility < 0.01) discard;

    float s = abs(vStrength);
    float dist = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.04, 0.22, dist);
    float glow = pow(max(0.0, 1.0 - dist * 2.0), 2.8);

    // Lower point alpha slightly in brain mode so synaptic nodes sparkle without overburning
    float brainAtten = mix(1.0, 0.55 + vPulse * 0.45, vBrainEase);
    float alpha = (core * 0.85 + glow * 0.55) * visibility * brainAtten;

    if (alpha < 0.01) discard;

    vec3 champagne = vec3(1.0, 0.95, 0.82);
    vec3 baseCol = mix(uColor, champagne, vPulse * 0.7);
    vec3 finalColor = baseCol * (0.9 + core * 1.45) * clamp(s, 0.3, 1.55);
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
  varying float vPulse;

  void main() {
    float isPortraitOnly = step(0.0, -vStrength);
    float activeMorph = max(max(vEase, vCvEase), vBrainEase);
    float s = abs(vStrength);

    float sphereAlpha = 0.96 * (1.0 - isPortraitOnly);
    // CRITICAL: Keep brain wire alpha at 0.065 (since ~8 segments stack per gyrus) so internal folds stay crystal-clear!
    float portraitOrCvAlpha = mix(0.42, 0.58, vCvEase) * clamp(s, 0.3, 1.35);
    float brainAlpha = (0.062 + vPulse * 0.08) * clamp(s, 0.4, 1.3) * (1.0 - isPortraitOnly * 0.85);
    float morphedAlpha = mix(portraitOrCvAlpha, brainAlpha, vBrainEase);

    float lineAlpha = mix(sphereAlpha, morphedAlpha, activeMorph) * uFade;
    if (lineAlpha < 0.005) discard;

    vec3 champagne = vec3(1.0, 0.96, 0.84);
    vec3 sphereCol = vColor * 1.15;
    vec3 morphedCol = mix(vColor, uColor * (0.65 + s * 0.55), 0.75);
    morphedCol = mix(morphedCol, champagne, vPulse * 0.65);
    vec3 lineCol = mix(sphereCol, morphedCol, activeMorph);

    gl_FragColor = vec4(lineCol, lineAlpha);
  }
`
