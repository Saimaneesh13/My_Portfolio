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
  const segs: { a: THREE.Vector3; b: THREE.Vector3; strength: number }[] = []

  // =========================================================================
  // 1. EXACT ANATOMICAL SAGITTAL SILHOUETTE & 3D HEMISPHERE DEPTH FUNCTION
  // =========================================================================
  // Evaluates whether a 2D (x, y) side-profile point is inside the human cerebrum,
  // and returns its exact 3D lateral Z-thickness (NO hollow center hole!).
  function getCerebrumThickness(x: number, y: number): number {
    // Normalize into brain center coordinates (facing Left: Front = -X, Back = +X, Crown = +Y)
    // Main upper cerebral dome (ellipsoid centered at x: -0.04, y: 0.34, rx: 1.38, ry: 0.82)
    const dxDome = (x + 0.04) / 1.38
    const dyDome = (y - 0.34) / 0.82
    // Asymmetric anteroposterior shaping: fuller parietal/occipital crown, noble frontal slope
    const crownShape = x < 0 ? 1.0 - Math.pow(-x / 1.45, 2.2) * 0.12 : 1.0 + Math.sin((x / 1.35) * Math.PI) * 0.06
    const dDome = Math.hypot(dxDome, dyDome / crownShape)

    // Temporal lobe lower-middle projection (centered at x: 0.02, y: -0.14, rx: 0.68, ry: 0.34, tilted forward-down)
    const tx = (x - 0.02) * Math.cos(0.18) + (y + 0.14) * Math.sin(0.18)
    const ty = -(x - 0.02) * Math.sin(0.18) + (y + 0.14) * Math.cos(0.18)
    const dTemporal = Math.hypot(tx / 0.68, ty / 0.33)

    // Frontal orbital base (x: -0.82, y: 0.08, rx: 0.56, ry: 0.28)
    const dFrontalBase = Math.hypot((x + 0.78) / 0.58, (y - 0.08) / 0.28)

    // Occipital posterior lobe (x: 0.72, y: 0.16, rx: 0.58, ry: 0.38)
    const dOccipital = Math.hypot((x - 0.72) / 0.58, (y - 0.16) / 0.38)

    // Smooth union (minimum distance) of the 4 anatomical cerebral regions
    const smin = (a: number, b: number, k = 0.18) => {
      const h = Math.max(k - Math.abs(a - b), 0.0) / k
      return Math.min(a, b) - h * h * k * 0.25
    }

    let d = smin(dDome, dTemporal, 0.22)
    d = smin(d, dFrontalBase, 0.2)
    d = smin(d, dOccipital, 0.2)

    // Carve the Inferior Frontal / Sylvian Notch at (x: -0.62, y: -0.16) so Temporal Pole is distinct
    const notchDist = Math.hypot((x + 0.66) / 0.26, (y + 0.22) / 0.20)
    if (notchDist < 1.0) {
      d += Math.pow(1.0 - notchDist, 1.6) * 0.35
    }

    // Carve flat inferior orbital floor & tentorial notch above cerebellum
    if (y < -0.06 && x < -0.52) d += (-0.06 - y) * 1.6
    if (y < -0.12 && x > 0.52) d += (-0.12 - y) * 1.4

    if (d >= 1.0) return 0.0

    // Solid 3D hemisphere dome thickness (0 at outer silhouette rim -> 0.76 at lateral prominence)
    const baseZ = Math.pow(1.0 - d * d, 0.58) * 0.76

    // Sculpt the deep Sylvian Fissure crease & Central Sulcus groove into the 3D surface
    const sylvianY = -0.12 + (x + 0.48) * 0.36
    const sylvianCrease =
      x > -0.52 && x < 0.48 ? Math.exp(-Math.pow((y - sylvianY) / 0.09, 2)) * 0.16 : 0.0

    // Organic 3D Gyri & Sulci cortical convolutions
    const gyri =
      Math.sin(x * 9.5 + y * 6.5) * Math.cos(y * 8.5 - x * 5.2) * 0.045 +
      Math.sin(x * 15.0 - y * 12.0) * 0.022

    return Math.max(0.04, baseZ - sylvianCrease + gyri)
  }

  // Helper to project a 2D (x,y) point onto the 3D outer cortical surface of hemisphere `hemi` (-1 or +1)
  function projectToCortex(x: number, y: number, hemi: number, zRatio = 1.0): THREE.Vector3 {
    const zMax = getCerebrumThickness(x, y)
    return new THREE.Vector3(x, y, hemi * (0.03 + zMax * zRatio))
  }

  // Helper to draw a smooth 3D Catmull-Rom cortical ribbon
  function addCorticalSpline(pts: [number, number][], hemi: number, zRatio: number, strength: number, subdivs = 32) {
    const vecs = pts.map(([x, y]) => projectToCortex(x, y, hemi, zRatio))
    const curve = new THREE.CatmullRomCurve3(vecs)
    const sampled = curve.getPoints(subdivs)
    for (let i = 0; i < sampled.length - 1; i++) {
      segs.push({ a: sampled[i], b: sampled[i + 1], strength })
    }
  }

  // =========================================================================
  // 2. CONTINUOUS SOLID 3D CORTEX SHELL + WINDING GYRI SULCI FOLDS
  // =========================================================================
  ;[-1, 1].forEach((hemi) => {
    // A. Volumetric Cortical Contour Slices (from outer silhouette zRatio=0.15 up to lateral dome zRatio=1.0)
    // This completely fills the interior of the brain so there is ZERO dark hole in the center!
    const xSteps = 56
    const ySteps = 40
    for (let iy = 0; iy < ySteps; iy++) {
      const y = -0.48 + (iy / ySteps) * 1.68
      for (let ix = 0; ix < xSteps; ix++) {
        const x1 = -1.46 + (ix / xSteps) * 2.92
        const x2 = -1.46 + ((ix + 1) / xSteps) * 2.92
        const z1 = getCerebrumThickness(x1, y)
        const z2 = getCerebrumThickness(x2, y)

        if (z1 > 0.02 && z2 > 0.02) {
          // Rim brightening when near the outer silhouette edge (z1 < 0.28)
          const isRim = z1 < 0.28 ? 1.35 : 0.72
          const pA = new THREE.Vector3(x1, y, hemi * (0.03 + z1))
          const pB = new THREE.Vector3(x2, y, hemi * (0.03 + z2))

          // Wavy gyri displacement along the surface
          const waveA = Math.sin(x1 * 10.0 + y * 8.0) * 0.018
          const waveB = Math.sin(x2 * 10.0 + y * 8.0) * 0.018
          pA.y += waveA
          pB.y += waveB

          if ((ix + iy) % 2 === 0 || z1 < 0.26) {
            segs.push({ a: pA, b: pB, strength: isRim })
          }
        }
      }
    }

    // B. Prominent Anatomical Sulci & Gyri Folds (Bright golden cortical grooves matching image_7c5e37.jpg)
    const sulciCurves: [number, number][][] = [
      // Outer Sagittal Silhouette Crown & Temporal Rim (Gives crisp glowing brain border)
      [
        [-1.36, 0.02], [-1.38, 0.28], [-1.22, 0.62], [-0.88, 0.92], [-0.38, 1.10],
        [0.18, 1.12], [0.72, 0.96], [1.14, 0.66], [1.30, 0.28], [1.18, -0.04],
        [0.78, -0.14], [0.46, -0.18], [0.16, -0.42], [-0.28, -0.44], [-0.52, -0.26],
        [-0.44, -0.08], [-0.88, -0.08], [-1.22, -0.06], [-1.36, 0.02],
      ],
      // Deep Sylvian Fissure (Lateral Sulcus)
      [[-0.48, -0.10], [-0.22, -0.02], [0.08, 0.10], [0.38, 0.22], [0.64, 0.36]],
      // Central Sulcus (Rolandic fissure)
      [[-0.04, 1.10], [-0.10, 0.82], [-0.18, 0.52], [-0.24, 0.22], [-0.28, 0.02]],
      // Precentral & Postcentral Gyri
      [[-0.28, 1.06], [-0.34, 0.78], [-0.40, 0.48], [-0.44, 0.16]],
      [[0.22, 1.08], [0.14, 0.78], [0.06, 0.48], [-0.02, 0.18]],
      // Superior, Middle & Inferior Frontal Gyri (Winding frontal lobe folds)
      [[-1.20, 0.58], [-0.94, 0.74], [-0.66, 0.86], [-0.42, 0.82]],
      [[-1.32, 0.32], [-1.04, 0.48], [-0.74, 0.58], [-0.48, 0.52]],
      [[-1.30, 0.08], [-1.02, 0.20], [-0.76, 0.16], [-0.52, 0.26]],
      // Parietal & Occipital Gyri
      [[0.26, 0.90], [0.54, 0.84], [0.82, 0.74], [1.06, 0.52]],
      [[0.18, 0.58], [0.46, 0.62], [0.76, 0.50], [1.08, 0.36]],
      [[0.58, 0.24], [0.86, 0.20], [1.14, 0.10]],
      // Superior & Inferior Temporal Gyri
      [[-0.44, -0.22], [-0.12, -0.16], [0.22, -0.04], [0.54, 0.08]],
      [[-0.32, -0.36], [0.02, -0.30], [0.34, -0.18], [0.60, -0.08]],
    ]

    sulciCurves.forEach((curve, idx) => {
      const isOuter = idx === 0
      addCorticalSpline(curve, hemi, isOuter ? 0.35 : 0.96, isOuter ? 1.45 : 1.25, isOuter ? 96 : 32)
      if (!isOuter) {
        addCorticalSpline(curve, hemi, 0.55, 0.9, 24)
      }
    })
  })

  // =========================================================================
  // 3. DELAUNAY-STYLE TRIANGULATED NEURAL CONSTELLATION (Matches Reference!)
  // =========================================================================
  // Places ~65 Golden Ratio synaptic star hubs across the 3D cortex and connects
  // nearest neighbors into the crisp glowing triangular network seen in image_7c5e37.jpg
  const synapticHubs: THREE.Vector3[] = []
  ;[-1, 1].forEach((hemi) => {
    let count = 0
    let seed = 1
    while (count < 64 && seed < 600) {
      seed++
      // Halton / Golden-ratio low-discrepancy distribution so hubs are evenly spaced!
      const ux = ((seed * 0.6180339887) % 1.0) * 2.76 - 1.38
      const uy = ((seed * 0.3819660112) % 1.0) * 1.56 - 0.42
      const zThick = getCerebrumThickness(ux, uy)
      if (zThick > 0.12) {
        const hubPos = new THREE.Vector3(ux, uy, hemi * (0.05 + zThick * 1.02))
        // Ensure minimum spacing between star hubs
        if (synapticHubs.every((h) => h.distanceTo(hubPos) > 0.21)) {
          synapticHubs.push(hubPos)
          count++
        }
      }
    }
  })

  // Connect each Synaptic Hub to its 4 closest neighbors on the same hemisphere
  for (let i = 0; i < synapticHubs.length; i++) {
    const a = synapticHubs[i]
    const neighbors = synapticHubs
      .map((b, j) => ({ b, j, d: a.distanceTo(b) }))
      .filter((item) => item.j !== i && item.b.z * a.z > 0 && item.d < 0.52)
      .sort((p, q) => p.d - q.d)
      .slice(0, 4)

    neighbors.forEach(({ b, j }) => {
      if (i < j) {
        // Subdivide each synaptic axon into 4 segments so plenty of particles light it up brightly
        for (let s = 0; s < 4; s++) {
          const p1 = new THREE.Vector3().lerpVectors(a, b, s / 4)
          const p2 = new THREE.Vector3().lerpVectors(a, b, (s + 1) / 4)
          segs.push({ a: p1, b: p2, strength: 1.65 })
        }
      }
    })
  }

  // =========================================================================
  // 4. TUCKED STRIATED CEREBELLUM (Snugly Nested Under Occipital Lobe)
  // =========================================================================
  // Centered at (x: 0.64, y: -0.32) so it merges seamlessly with the tentorial notch and pons
  ;[-1, 1].forEach((hemi) => {
    const cbRows = 12
    const cbCols = 22
    for (let r = 0; r < cbRows; r++) {
      const v = r / (cbRows - 1)
      const angleV = (v - 0.5) * Math.PI * 0.88
      const rowY = -0.32 + Math.sin(angleV) * 0.22
      const radiusX = Math.cos(angleV) * 0.42
      const radiusZ = Math.cos(angleV) * 0.38

      for (let c = 0; c < cbCols; c++) {
        const u1 = (c / cbCols) * Math.PI
        const u2 = ((c + 1) / cbCols) * Math.PI
        const p1 = new THREE.Vector3(
          0.64 - Math.cos(u1) * radiusX,
          rowY + Math.sin(u1 * 3.0) * 0.01,
          hemi * (0.03 + Math.sin(u1) * radiusZ)
        )
        const p2 = new THREE.Vector3(
          0.64 - Math.cos(u2) * radiusX,
          rowY + Math.sin(u2 * 3.0) * 0.01,
          hemi * (0.03 + Math.sin(u2) * radiusZ)
        )
        segs.push({ a: p1, b: p2, strength: 1.15 })
      }
    }
  })

  // =========================================================================
  // 5. ANATOMICAL PONS & BRAINSTEM STALK (Merging into Pedestal)
  // =========================================================================
  const stemCols = 22
  const stemRows = 16
  for (let c = 0; c < stemCols; c++) {
    const ang = (c / stemCols) * Math.PI * 2
    for (let r = 0; r < stemRows; r++) {
      const t1 = r / stemRows
      const t2 = (r + 1) / stemRows
      const evalStem = (t: number) => {
        const y = -0.24 - t * 0.78
        const cx = 0.08 + t * 0.18
        const rad = (0.18 * (1.0 - t * 0.42)) * (1.0 + (Math.cos(ang) < 0 ? Math.sin(t * Math.PI) * 0.25 : 0))
        return new THREE.Vector3(cx + Math.cos(ang) * rad, y, Math.sin(ang) * rad * 0.85)
      }
      segs.push({ a: evalStem(t1), b: evalStem(t2), strength: 1.25 })
    }
  }

  // =========================================================================
  // 6. FIERY HOLOGRAPHIC PEDESTAL + RISING VERTICAL RAYS + ORBIT RINGS
  // =========================================================================
  const pedestalRadii = [0.35, 0.58, 0.85, 1.15, 1.45, 1.75]
  pedestalRadii.forEach((pr, idx) => {
    const py = -1.16 - idx * 0.025
    const steps = 80
    for (let s = 0; s < steps; s++) {
      if (idx > 2 && s % 7 === 0) continue
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      const p1 = new THREE.Vector3(Math.cos(a1) * pr, py + Math.sin(a1) * pr * 0.14, Math.sin(a1) * pr)
      const p2 = new THREE.Vector3(Math.cos(a2) * pr, py + Math.sin(a2) * pr * 0.14, Math.sin(a2) * pr)
      // Inner pedestal rings glow super bright like the energy emitter in image_7c5e37.jpg!
      segs.push({ a: p1, b: p2, strength: idx <= 2 ? 1.75 : 1.1 })
    }
  })

  // Vertical Holographic Emitter Rays rising from the pedestal into the brain base
  for (let ray = 0; ray < 28; ray++) {
    const ang = (ray / 28) * Math.PI * 2
    const rad = 0.35 + (ray % 4) * 0.26
    const rx = Math.cos(ang) * rad
    const rz = Math.sin(ang) * rad
    const pyBase = -1.18 + rz * 0.14
    segs.push({
      a: new THREE.Vector3(rx, pyBase, rz),
      b: new THREE.Vector3(rx * 0.85, pyBase + 0.32 + (ray % 3) * 0.12, rz * 0.85),
      strength: 0.95,
    })
  }

  // Sweeping Synaptic Orbit Rings around the Brain
  const orbitConfigs = [
    { rx: 2.32, ry: 0.68, tiltZ: -0.22, tiltX: 0.32 },
    { rx: 2.18, ry: 0.78, tiltZ: 0.28, tiltX: -0.26 },
  ]
  orbitConfigs.forEach((cfg) => {
    const euler = new THREE.Euler(cfg.tiltX, 0, cfg.tiltZ)
    const steps = 84
    for (let s = 0; s < steps; s++) {
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      const p1 = new THREE.Vector3(Math.cos(a1) * cfg.rx, 0.16 + Math.sin(a1) * cfg.ry, 0).applyEuler(euler)
      const p2 = new THREE.Vector3(Math.cos(a2) * cfg.rx, 0.16 + Math.sin(a2) * cfg.ry, 0).applyEuler(euler)
      segs.push({ a: p1, b: p2, strength: 1.05 })
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
  attribute float aBrainStrength;
  attribute float aSize;

  varying float vStrength;
  varying float vBrainStrength;
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
    vBrainStrength = aBrainStrength;
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

    float activeMorph = max(max(ease, cvEase), brainEase);
    float arc = max(max(sin(ease * 3.14159265), sin(cvEase * 3.14159265)), sin(brainEase * 3.14159265));
    vec3 midFlow = getFlowDisplacement(position, arc * 0.72);

    vec3 hologramBreath = vec3(
      sin(uTime * 1.5 + aTarget.y * 2.2) * 0.008,
      cos(uTime * 1.2 + aTarget.x * 2.2) * 0.008,
      sin(uTime * 1.8 + aTarget.x * 3.0) * 0.015
    ) * activeMorph;

    vec3 basePos = mix(position, aTarget, ease);
    basePos = mix(basePos, aCvTarget, cvEase);
    vec3 blendedPosition = mix(basePos, aBrainTarget, brainEase) + midFlow + hologramBreath;

    vec4 viewPosition = modelViewMatrix * vec4(blendedPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float isPortraitOnly = step(0.0, -aStrength);
    float sphereScale = mix(1.0, activeMorph, isPortraitOnly);

    // Fine, crisp point size (0.55x) in Brain mode so the 90-degree circuit lines look razor-sharp, not blurry blobs!
    float brainSizeMult = 0.45 + clamp(aBrainStrength, 0.2, 1.8) * 0.45;
    float targetSize = mix(aSize * 1.2, aSize * brainSizeMult, brainEase);
    float pSize = mix(aSize, targetSize, activeMorph) * sphereScale;
    gl_PointSize = clamp(pSize * (17.0 / -viewPosition.z), 0.0, 14.0);
  }
`

export const morphFragmentShader = `
  uniform vec3 uColor;
  uniform float uFade;
  varying float vStrength;
  varying float vBrainStrength;
  varying float vEase;
  varying float vCvEase;
  varying float vBrainEase;

  void main() {
    float isPortraitOnly = step(0.0, -vStrength);
    float activeMorph = max(max(vEase, vCvEase), vBrainEase);
    float visibility = mix(1.0, activeMorph, isPortraitOnly) * uFade;
    if (visibility < 0.02) discard;

    float s = mix(abs(vStrength), vBrainStrength, vBrainEase);

    float dist = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.04, 0.22, dist);
    float glow = pow(max(0.0, 1.0 - dist * 2.0), 2.8);
    float alpha = (core * 0.85 + glow * 0.55) * visibility * clamp(s, 0.25, 1.45);

    if (alpha < 0.02) discard;

    vec3 champagne = vec3(1.0, 0.96, 0.84);
    float hotSpot = smoothstep(1.1, 1.7, s) * vBrainEase;
    vec3 baseCol = mix(uColor, champagne, hotSpot * 0.65);

    vec3 finalColor = baseCol * (0.88 + core * 1.4) * clamp(s, 0.3, 1.65);
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export const morphLineFragmentShader = `
  uniform vec3 uColor;
  uniform float uFade;
  varying vec3 vColor;
  varying float vStrength;
  varying float vBrainStrength;
  varying float vEase;
  varying float vCvEase;
  varying float vBrainEase;

  void main() {
    float isPortraitOnly = step(0.0, -vStrength);
    float activeMorph = max(max(vEase, vCvEase), vBrainEase);
    float s = mix(abs(vStrength), vBrainStrength, vBrainEase);

    float sphereAlpha = 0.96 * (1.0 - isPortraitOnly);
    // Crisp circuit trace alpha in Brain mode
    float brainWireAlpha = pow(clamp(s / 1.35, 0.18, 1.25), 1.35) * 0.52;
    float morphedAlpha = mix(0.44 * clamp(s, 0.3, 1.3), brainWireAlpha, vBrainEase);
    float lineAlpha = mix(sphereAlpha, morphedAlpha, activeMorph) * uFade;

    if (lineAlpha < 0.01) discard;

    vec3 champagne = vec3(1.0, 0.95, 0.82);
    float hotWire = smoothstep(1.15, 1.7, s) * vBrainEase;

    vec3 sphereCol = vColor * 1.15;
    vec3 morphedCol = mix(vColor, uColor * (0.62 + s * 0.7), 0.75);
    morphedCol = mix(morphedCol, champagne, hotWire * 0.55);
    vec3 lineCol = mix(sphereCol, morphedCol, activeMorph);

    gl_FragColor = vec4(lineCol, lineAlpha);
  }
`
