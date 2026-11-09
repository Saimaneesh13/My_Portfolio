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
  const random = seededRandom(404)
  const segs: { a: THREE.Vector3; b: THREE.Vector3; strength: number }[] = []

  // =========================================================================
  // 1. ANATOMICAL SIDE-PROFILE SILHOUETTE POLYGONS (Facing Left like Reference)
  // =========================================================================
  // Outer Cerebrum + Temporal Lobe Contour (x: -1.45 front to +1.35 back, y: -0.45 to +1.15)
  const cerebrumOutline: [number, number][] = [
    [-1.38, -0.08], // Frontal pole (anterior)
    [-1.44, 0.18],
    [-1.34, 0.48],  // Superior frontal curve
    [-1.08, 0.78],
    [-0.68, 1.00],  // Precentral / frontal crown
    [-0.18, 1.10],  // Parietal dome peak
    [0.35, 1.04],   // Superior parietal lobule
    [0.82, 0.86],
    [1.18, 0.56],   // Occipital slope
    [1.34, 0.22],   // Occipital pole (posterior)
    [1.24, -0.06],  // Tentorial notch (above cerebellum)
    [0.88, -0.16],
    [0.48, -0.22],  // Inferior temporal base
    [0.12, -0.42],  // Temporal lobe inferior bulge
    [-0.32, -0.44], // Temporal pole bottom
    [-0.58, -0.28], // Temporal pole tip (Sylvian notch)
    [-0.42, -0.10], // Deep Sylvian fissure inflection
    [-0.82, -0.12], // Orbital frontal base
    [-1.18, -0.16],
  ]

  // Sylvian Fissure (Lateral Sulcus) & Major Cortical Sulci Lines
  const corticalSulci: [number, number][][] = [
    // Sylvian fissure (separates temporal lobe from frontal/parietal)
    [[-0.48, -0.12], [-0.15, 0.02], [0.22, 0.16], [0.55, 0.28]],
    // Central sulcus (Rolandic fissure)
    [[-0.08, 1.08], [-0.16, 0.74], [-0.26, 0.42], [-0.32, 0.15]],
    // Superior & inferior frontal sulci
    [[-1.32, 0.28], [-0.95, 0.36], [-0.58, 0.46]],
    [[-1.02, 0.72], [-0.65, 0.68], [-0.35, 0.58]],
    // Parieto-occipital & intraparietal sulci
    [[0.32, 0.98], [0.45, 0.65], [0.78, 0.48], [1.15, 0.32]],
    // Superior temporal sulcus
    [[-0.38, -0.28], [0.05, -0.22], [0.42, -0.06], [0.76, 0.08]],
  ]

  // Cerebellum Contour (Tucked under the occipital lobe on the bottom-right)
  const cerebellumOutline: [number, number][] = [
    [0.48, -0.24],
    [0.88, -0.18],
    [1.18, -0.24],
    [1.26, -0.44],
    [1.10, -0.66],
    [0.78, -0.72],
    [0.46, -0.58],
    [0.38, -0.38],
  ]

  // Point-in-polygon helper (2D ray-casting)
  function insidePolygon(x: number, y: number, poly: [number, number][]): boolean {
    let inside = false
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1]
      const xj = poly[j][0], yj = poly[j][1]
      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-6) + xi
      if (intersect) inside = !inside
    }
    return inside
  }

  // Distance to nearest polygon edge (used to compute 3D hemisphere Z-thickness!)
  function distToPolygonEdge(x: number, y: number, poly: [number, number][]): number {
    let minDist = 999
    for (let i = 0; i < poly.length; i++) {
      const [x1, y1] = poly[i]
      const [x2, y2] = poly[(i + 1) % poly.length]
      const dx = x2 - x1
      const dy = y2 - y1
      const lenSq = dx * dx + dy * dy
      const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (lenSq || 1)))
      const px = x1 + t * dx
      const py = y1 + t * dy
      const d = Math.hypot(x - px, y - py)
      if (d < minDist) minDist = d
    }
    return minDist
  }

  // =========================================================================
  // 2. GENERATE 3D SYNAPTIC NODES ON LEFT & RIGHT HEMISPHERES
  // =========================================================================
  const nodes: THREE.Vector3[] = []

  // A. Add dense nodes along the exact Cerebrum Perimeter so the silhouette is 100% unmistakable
  for (let i = 0; i < cerebrumOutline.length; i++) {
    const [x1, y1] = cerebrumOutline[i]
    const [x2, y2] = cerebrumOutline[(i + 1) % cerebrumOutline.length]
    const steps = 6
    for (let s = 0; s < steps; s++) {
      const t = s / steps
      const nx = THREE.MathUtils.lerp(x1, x2, t)
      const ny = THREE.MathUtils.lerp(y1, y2, t)
      const pA = new THREE.Vector3(nx, ny, 0.08 * (random() - 0.5))
      const tNext = (s + 1) / steps
      const pB = new THREE.Vector3(
        THREE.MathUtils.lerp(x1, x2, tNext),
        THREE.MathUtils.lerp(y1, y2, tNext),
        0.08 * (random() - 0.5)
      )
      segs.push({ a: pA, b: pB, strength: 1.45 })
      nodes.push(pA)
    }
  }

  // B. Add glowing Sulci & Fissure fold curves on both hemispheres
  corticalSulci.forEach((curve) => {
    ;[-1, 1].forEach((hemi) => {
      for (let i = 0; i < curve.length - 1; i++) {
        const [x1, y1] = curve[i]
        const [x2, y2] = curve[i + 1]
        const sub = 5
        for (let s = 0; s < sub; s++) {
          const t1 = s / sub
          const t2 = (s + 1) / sub
          const ax = THREE.MathUtils.lerp(x1, x2, t1)
          const ay = THREE.MathUtils.lerp(y1, y2, t1)
          const bx = THREE.MathUtils.lerp(x1, x2, t2)
          const by = THREE.MathUtils.lerp(y1, y2, t2)
          const az = hemi * (0.28 + Math.min(0.45, distToPolygonEdge(ax, ay, cerebrumOutline) * 0.9))
          const bz = hemi * (0.28 + Math.min(0.45, distToPolygonEdge(bx, by, cerebrumOutline) * 0.9))
          const pA = new THREE.Vector3(ax, ay, az)
          const pB = new THREE.Vector3(bx, by, bz)
          segs.push({ a: pA, b: pB, strength: 1.35 })
          if (s % 2 === 0) nodes.push(pA)
        }
      }
    })
  })

  // C. Populate Volumetric Cortical Surface Nodes inside the Cerebrum Silhouette
  let attempts = 0
  while (nodes.length < 520 && attempts < 3500) {
    attempts++
    const rx = (random() - 0.48) * 2.95
    const ry = (random() - 0.32) * 1.65
    if (insidePolygon(rx, ry, cerebrumOutline)) {
      const edgeDist = distToPolygonEdge(rx, ry, cerebrumOutline)
      // Smooth 3D dome profile from edge (z=0) to lateral hemisphere peak (z=±0.68)
      const zMag = Math.sqrt(Math.max(0.02, Math.min(1.0, edgeDist * 1.85))) * 0.66
      const hemi = random() > 0.5 ? 1 : -1
      const rz = hemi * zMag * (0.65 + random() * 0.35)
      nodes.push(new THREE.Vector3(rx, ry, rz))
    }
  }

  // D. Connect Cortical Nodes into a Triangulated Neural Network (like image_7c5e37.jpg)
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    let connections = 0
    for (let j = i + 1; j < nodes.length; j++) {
      if (connections >= 5) break
      const b = nodes[j]
      // Keep connections within the same hemisphere or near the outer rim
      if (a.z * b.z < -0.05) continue
      const d = a.distanceTo(b)
      if (d > 0.11 && d < 0.31) {
        segs.push({ a, b, strength: 0.95 + (1.0 - d / 0.31) * 0.55 })
        connections++
      }
    }
  }

  // =========================================================================
  // 3. CEREBELLUM (Horizontal Folia Striations + Fine Lattice)
  // =========================================================================
  for (let i = 0; i < cerebellumOutline.length; i++) {
    const [x1, y1] = cerebellumOutline[i]
    const [x2, y2] = cerebellumOutline[(i + 1) % cerebellumOutline.length]
    const sub = 4
    for (let s = 0; s < sub; s++) {
      const t1 = s / sub
      const t2 = (s + 1) / sub
      segs.push({
        a: new THREE.Vector3(THREE.MathUtils.lerp(x1, x2, t1), THREE.MathUtils.lerp(y1, y2, t1), 0),
        b: new THREE.Vector3(THREE.MathUtils.lerp(x1, x2, t2), THREE.MathUtils.lerp(y1, y2, t2), 0),
        strength: 1.3,
      })
    }
  }

  // Characteristic horizontal parallel ridges (folia) of the cerebellum
  for (let row = 0; row < 8; row++) {
    const cy = -0.24 - row * 0.06
    for (let xStep = 0; xStep < 14; xStep++) {
      const cx1 = 0.40 + (xStep / 14) * 0.86
      const cx2 = 0.40 + ((xStep + 1) / 14) * 0.86
      if (insidePolygon(cx1, cy, cerebellumOutline) && insidePolygon(cx2, cy, cerebellumOutline)) {
        ;[-1, 1].forEach((hemi) => {
          const z = hemi * 0.26 * Math.sin(((xStep + 0.5) / 14) * Math.PI)
          segs.push({
            a: new THREE.Vector3(cx1, cy, z),
            b: new THREE.Vector3(cx2, cy, z),
            strength: 1.15,
          })
        })
      }
    }
  }

  // =========================================================================
  // 4. BRAINSTEM & SPINAL FIBER TRACT (Tapered stalk descending into pedestal)
  // =========================================================================
  for (let f = 0; f < 16; f++) {
    const angle = (f / 16) * Math.PI * 2
    for (let s = 0; s < 12; s++) {
      const t1 = s / 12
      const t2 = (s + 1) / 12
      // Curves slightly backward as it descends from pons (y=-0.32) to medulla (y=-1.08)
      const y1 = -0.32 - t1 * 0.76
      const y2 = -0.32 - t2 * 0.76
      const cx1 = 0.08 + t1 * 0.22 + Math.sin(t1 * Math.PI) * 0.04
      const cx2 = 0.08 + t2 * 0.22 + Math.sin(t2 * Math.PI) * 0.04
      const r1 = 0.18 * (1.0 - t1 * 0.52)
      const r2 = 0.18 * (1.0 - t2 * 0.52)

      const p1 = new THREE.Vector3(cx1 + Math.cos(angle) * r1, y1, Math.sin(angle) * r1)
      const p2 = new THREE.Vector3(cx2 + Math.cos(angle) * r2, y2, Math.sin(angle) * r2)
      segs.push({ a: p1, b: p2, strength: 1.25 })
    }
  }

  // =========================================================================
  // 5. HOLOGRAPHIC PEDESTAL BASE & SWEEPING ORBIT RINGS (Matches Reference)
  // =========================================================================
  const pedestalRadii = [0.55, 0.85, 1.15, 1.42, 1.68]
  pedestalRadii.forEach((pr, idx) => {
    const py = -1.24 - idx * 0.03
    const steps = 64
    for (let s = 0; s < steps; s++) {
      if (idx % 2 === 1 && s % 6 === 0) continue
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      const p1 = new THREE.Vector3(Math.cos(a1) * pr, py + Math.sin(a1) * pr * 0.16, Math.sin(a1) * pr)
      const p2 = new THREE.Vector3(Math.cos(a2) * pr, py + Math.sin(a2) * pr * 0.16, Math.sin(a2) * pr)
      segs.push({ a: p1, b: p2, strength: idx === 2 ? 1.5 : 1.1 })
    }
  })

  const orbitConfigs = [
    { rx: 2.25, ry: 0.68, tiltZ: -0.22, tiltX: 0.32 },
    { rx: 2.15, ry: 0.78, tiltZ: 0.28, tiltX: -0.26 },
  ]
  orbitConfigs.forEach((cfg) => {
    const euler = new THREE.Euler(cfg.tiltX, 0, cfg.tiltZ)
    const steps = 72
    for (let s = 0; s < steps; s++) {
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      const p1 = new THREE.Vector3(Math.cos(a1) * cfg.rx, 0.15 + Math.sin(a1) * cfg.ry, 0).applyEuler(euler)
      const p2 = new THREE.Vector3(Math.cos(a2) * cfg.rx, 0.15 + Math.sin(a2) * cfg.ry, 0).applyEuler(euler)
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
