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
  // 1. 3D PARAMETRIC ANATOMICAL CORTEX MANIFOLD (Left & Right Hemispheres)
  // =========================================================================
  // Evaluates an exact 3D point on the human cerebral cortex with realistic lobes,
  // Sylvian fissure indentation, temporal lobe overhang, and 3D gyri/sulci folds.
  function evalCortexSurface(u: number, v: number, hemi: number): { pos: THREE.Vector3; sulciDepth: number } {
    // u: 0..PI (anterior frontal pole -> superior crown -> posterior occipital -> inferior base)
    // v: 0..PI/2 (0 = medial longitudinal fissure, PI/2 = lateral outer temple)
    const sinV = Math.sin(v)
    const cosV = Math.cos(v)

    // Base sagittal profile (theta around side profile: 0 = front(-X), PI/2 = top(+Y), PI = back(+X), 3PI/2 = bottom(-Y))
    const theta = u * Math.PI * 2
    const cT = Math.cos(theta)
    const sT = Math.sin(theta)

    // Base anatomical proportions (facing Left: Front is -X, Back is +X, Top is +Y)
    let x = -cT * 1.42 * (0.32 + 0.68 * sinV)
    let y = sT * 1.05 * (0.35 + 0.65 * sinV) + 0.26
    let z = cosV * 0.78 * hemi

    // A. Sculpt the Frontal Pole & Superior Parietal Dome (Top half: sT >= 0)
    if (sT >= 0) {
      // High rounded parietal crown slightly behind center
      y += Math.pow(sT, 1.4) * 0.18 * sinV
      if (cT < 0) {
        // Occipital lobe fullness at the back-right
        x += Math.pow(-cT, 1.6) * 0.12 * sinV
      } else {
        // Steep, noble frontal lobe forehead curve on the front-left
        y += Math.pow(cT, 2.0) * Math.sin(theta) * 0.14
      }
    } else {
      // B. Sculpt Inferior Base: Orbital Frontal flattening + Temporal Lobe Bulge + Tentorial Notch
      const down = -sT // 0..1 on the underside
      if (x < -0.25) {
        // Flatten the orbital frontal base (above the eyes)
        y = Math.max(-0.12, y + down * 0.52)
      } else if (x >= -0.25 && x < 0.58) {
        // Prominent Temporal Lobe projecting forward & downward (the signature human brain silhouette!)
        const tempT = (x - -0.25) / 0.83
        const tempBulge = Math.sin(tempT * Math.PI)
        y = -0.06 - tempBulge * 0.42 * (0.4 + 0.6 * sinV)
        // Push temporal pole slightly forward at its tip to form the Sylvian notch
        x -= tempBulge * 0.22 * sinV
        z += hemi * tempBulge * 0.14 * sinV
      } else {
        // Tentorial notch (curves upward above the cerebellum at the back-bottom)
        y = Math.max(-0.16, y + down * 0.48)
      }
    }

    // C. Deep Sylvian Fissure (Lateral Sulcus) Groove separating Frontal/Parietal from Temporal Lobe
    const sylvianLineY = -0.10 + (x + 0.45) * 0.34
    const distSylvian = Math.abs(y - sylvianLineY)
    const inSylvianX = x > -0.52 && x < 0.45 ? 1.0 : 0.0
    const sylvianGroove = inSylvianX * Math.exp(-Math.pow(distSylvian / 0.13, 2)) * sinV

    // D. Central Sulcus (Rolandic groove running down from crown)
    const centralLineX = -0.06 - (1.1 - y) * 0.24
    const distCentral = Math.abs(x - centralLineX)
    const inCentralY = y > 0.05 ? 1.0 : 0.0
    const centralGroove = inCentralY * Math.exp(-Math.pow(distCentral / 0.11, 2)) * sinV

    // E. Realistic 3D Gyri (ridges) & Sulci (grooves) multi-frequency anatomical wrinkling
    const g1 = Math.sin(x * 8.2 + y * 5.8 + z * 3.5) * Math.cos(y * 7.6 - x * 4.8)
    const g2 = Math.sin(x * 13.5 - y * 11.2 + z * 7.0) * 0.45
    const gyriWave = g1 + g2 // -1.45 .. +1.45

    // Sharp narrow sulci crevices vs broad rounded gyri crowns
    const gyriHeight = (1.0 - Math.pow(Math.abs(gyriWave) / 1.45, 0.65)) * 0.075 - sylvianGroove * 0.11 - centralGroove * 0.06

    // Displace along outward surface normal
    const norm = new THREE.Vector3(x, y - 0.2, z).normalize()
    x += norm.x * gyriHeight
    y += norm.y * gyriHeight
    z += norm.z * gyriHeight * 0.85

    // Keep a subtle 0.035 inter-hemispheric longitudinal fissure gap at the midline
    z += hemi * 0.035

    const sulciFactor = THREE.MathUtils.clamp((gyriHeight + 0.08) / 0.15, 0.2, 1.4)
    return { pos: new THREE.Vector3(x, y, z), sulciDepth: sulciFactor }
  }

  // =========================================================================
  // 2. BUILD DENSE VOLUMETRIC CORTICAL SURFACE MESH + GYRI CONTOURS
  // =========================================================================
  const U_RES = 84
  const V_RES = 24

  ;[-1, 1].forEach((hemi) => {
    const grid: { pos: THREE.Vector3; sulciDepth: number }[][] = []
    for (let iu = 0; iu <= U_RES; iu++) {
      const row: { pos: THREE.Vector3; sulciDepth: number }[] = []
      const u = iu / U_RES
      for (let iv = 0; iv <= V_RES; iv++) {
        const v = (iv / V_RES) * (Math.PI * 0.49)
        row.push(evalCortexSurface(u, v, hemi))
      }
      grid.push(row)
    }

    for (let iu = 0; iu < U_RES; iu++) {
      for (let iv = 0; iv < V_RES; iv++) {
        const p00 = grid[iu][iv]
        const p10 = grid[iu + 1][iv]
        const p01 = grid[iu][iv + 1]
        const p11 = grid[iu + 1][iv + 1]

        // Boost strength along outer silhouette (iv near V_RES) and gyri peaks for realistic 3D rim shading!
        const rimBoost = Math.pow(iv / V_RES, 1.6) * 0.45
        const sBase = p00.sulciDepth * 0.75 + rimBoost

        // Longitudinal cortical contour
        segs.push({ a: p00.pos, b: p10.pos, strength: sBase })

        // Cross-cortical contour
        if ((iu + iv) % 2 === 0 || iv > V_RES - 4) {
          segs.push({ a: p00.pos, b: p01.pos, strength: sBase * 0.9 })
        }

        // Triangulated neural network diagonal (creates the exact triangulated web from image_7c5e37.jpg)
        if ((iu * 3 + iv) % 3 === 0) {
          segs.push({ a: p00.pos, b: p11.pos, strength: sBase * 1.15 })
        }
      }
    }
  })

  // =========================================================================
  // 3. BRIGHT SYNAPTIC HUB CONSTELLATION ON CORTEX SURFACE (Matches Reference)
  // =========================================================================
  // In image_7c5e37.jpg, ~45 bright glowing hub stars sit on the brain surface with radiating axons
  const hubNodes: THREE.Vector3[] = []
  ;[-1, 1].forEach((hemi) => {
    for (let h = 0; h < 28; h++) {
      const u = (h * 0.6180339) % 1.0
      const v = (0.25 + ((h * 0.381966) % 0.72)) * (Math.PI * 0.48)
      const { pos } = evalCortexSurface(u, v, hemi)
      hubNodes.push(pos)
    }
  })

  for (let i = 0; i < hubNodes.length; i++) {
    const a = hubNodes[i]
    for (let j = i + 1; j < hubNodes.length; j++) {
      const b = hubNodes[j]
      if (a.z * b.z < 0) continue
      const dist = a.distanceTo(b)
      if (dist > 0.18 && dist < 0.52) {
        // Subdivide hub axon into 3 segments so it curves slightly with the cortex
        const mid = a.clone().add(b).multiplyScalar(0.5)
        mid.z *= 1.06
        segs.push({ a, b: mid, strength: 1.55 })
        segs.push({ a: mid, b, strength: 1.55 })
      }
    }
  }

  // =========================================================================
  // 4. VOLUMETRIC 3D CEREBELLUM (Tucked under Posterior Occipital Lobe)
  // =========================================================================
  // Finely striated horizontal folia ridges on a 3D bilobed ellipsoid at (x: 0.78, y: -0.38)
  const cbU = 28
  const cbV = 16
  ;[-1, 1].forEach((hemi) => {
    for (let iv = 0; iv < cbV; iv++) {
      const v1 = (iv / cbV) * Math.PI
      const v2 = ((iv + 1) / cbV) * Math.PI
      for (let iu = 0; iu < cbU; iu++) {
        const u1 = (iu / cbU) * Math.PI
        const u2 = ((iu + 1) / cbU) * Math.PI

        const folia1 = 1.0 + Math.sin(v1 * 18.0) * 0.04
        const p1 = new THREE.Vector3(
          0.74 + Math.cos(u1) * Math.sin(v1) * 0.46 * folia1,
          -0.38 + Math.cos(v1) * 0.26,
          hemi * (0.04 + Math.sin(u1) * Math.sin(v1) * 0.44 * folia1)
        )
        const p2 = new THREE.Vector3(
          0.74 + Math.cos(u2) * Math.sin(v1) * 0.46 * folia1,
          -0.38 + Math.cos(v1) * 0.26,
          hemi * (0.04 + Math.sin(u2) * Math.sin(v1) * 0.44 * folia1)
        )
        segs.push({ a: p1, b: p2, strength: 1.05 })

        if (iu % 2 === 0) {
          const p3 = new THREE.Vector3(
            0.74 + Math.cos(u1) * Math.sin(v2) * 0.46,
            -0.38 + Math.cos(v2) * 0.26,
            hemi * (0.04 + Math.sin(u1) * Math.sin(v2) * 0.44)
          )
          segs.push({ a: p1, b: p3, strength: 0.75 })
        }
      }
    }
  })

  // =========================================================================
  // 5. ANATOMICAL PONS & BRAINSTEM (Organic Tapered Fiber Bundle)
  // =========================================================================
  const stemCols = 24
  const stemRows = 18
  for (let c = 0; c < stemCols; c++) {
    const ang1 = (c / stemCols) * Math.PI * 2
    const ang2 = ((c + 1) / stemCols) * Math.PI * 2
    for (let r = 0; r < stemRows; r++) {
      const t1 = r / stemRows
      const t2 = (r + 1) / stemRows

      const evalStem = (t: number, ang: number) => {
        const y = -0.22 - t * 0.78
        // Anterior pons bulge at top (t < 0.45), tapering into medulla oblongata below
        const ponsBulge = Math.sin(t * Math.PI) * 0.06 * (Math.cos(ang) < 0 ? 1.4 : 0.5)
        const rx = (0.19 * (1.0 - t * 0.45) + ponsBulge) * Math.cos(ang)
        const rz = 0.17 * (1.0 - t * 0.45) * Math.sin(ang)
        const cx = 0.12 + t * 0.20
        return new THREE.Vector3(cx + rx, y, rz)
      }

      const s00 = evalStem(t1, ang1)
      const s10 = evalStem(t2, ang1)
      const s01 = evalStem(t1, ang2)
      segs.push({ a: s00, b: s10, strength: 1.05 })
      if (r % 2 === 0) segs.push({ a: s00, b: s01, strength: 0.75 })
    }
  }

  // =========================================================================
  // 6. HOLOGRAPHIC GOLDEN PEDESTAL & ORBITAL RINGS (Matches Reference)
  // =========================================================================
  const pedestalRadii = [0.55, 0.86, 1.16, 1.44, 1.72]
  pedestalRadii.forEach((pr, idx) => {
    const py = -1.22 - idx * 0.028
    const steps = 72
    for (let s = 0; s < steps; s++) {
      if (idx % 2 === 1 && s % 7 === 0) continue
      const a1 = (s / steps) * Math.PI * 2
      const a2 = ((s + 1) / steps) * Math.PI * 2
      const p1 = new THREE.Vector3(Math.cos(a1) * pr, py + Math.sin(a1) * pr * 0.14, Math.sin(a1) * pr)
      const p2 = new THREE.Vector3(Math.cos(a2) * pr, py + Math.sin(a2) * pr * 0.14, Math.sin(a2) * pr)
      segs.push({ a: p1, b: p2, strength: idx === 2 ? 1.35 : 0.9 })
    }
  })

  const orbitConfigs = [
    { rx: 2.28, ry: 0.66, tiltZ: -0.22, tiltX: 0.32 },
    { rx: 2.16, ry: 0.74, tiltZ: 0.28, tiltX: -0.26 },
  ]
  orbitConfigs.forEach((cfg) => {
    const euler = new THREE.Euler(cfg.tiltX, 0, cfg.tiltZ)
    const steps = 80
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
  varying float vPulse;
  varying float vBrainRim;

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

    // Traveling neural firing pulse wave across the 3D brain lobes
    float wavePhase = sin(uTime * 2.6 - aBrainTarget.x * 2.8 + aBrainTarget.y * 2.4 + aDelay * 8.0);
    vPulse = pow(max(0.0, wavePhase), 5.0) * brainEase;

    // 3D Fresnel-style rim & gyri depth shading so the brain looks volumetric, not flat!
    float radialRim = clamp(length(aBrainTarget.xy * vec2(0.72, 0.92)), 0.0, 1.25);
    vBrainRim = smoothstep(0.35, 1.15, radialRim);

    vec3 brainFloat = vec3(
      sin(uTime * 1.4 + aBrainTarget.y * 2.0) * 0.012,
      sin(uTime * 1.6) * 0.035,
      cos(uTime * 1.4 + aBrainTarget.x * 2.0) * 0.012
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
    float sphereScale = mix(1.0, max(ease, cvEase), isPortraitOnly);

    // Make key synaptic hub nodes glow larger like bright stars on the cortex (matching image_7c5e37.jpg)
    float hubBoost = mix(1.0, 1.35 + vPulse * 0.85, brainEase);
    float pSize = mix(aSize, aSize * hubBoost, activeMorph) * sphereScale;
    gl_PointSize = clamp(pSize * (16.5 / -viewPosition.z), 0.0, 15.0);
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
  varying float vBrainRim;

  void main() {
    float isPortraitOnly = step(0.0, -vStrength);
    float visibility = mix(1.0, max(vEase, vCvEase), isPortraitOnly) * uFade;
    if (visibility < 0.01) discard;

    float s = abs(vStrength);
    float dist = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.04, 0.22, dist);
    float glow = pow(max(0.0, 1.0 - dist * 2.0), 2.6);

    float brainNodeAlpha = mix(1.0, 0.78 + vPulse * 0.35, vBrainEase);
    float alpha = (core * 0.9 + glow * 0.6) * visibility * brainNodeAlpha;

    if (alpha < 0.01) discard;

    vec3 champagne = vec3(1.0, 0.96, 0.86);
    vec3 baseCol = mix(uColor, champagne, (vPulse * 0.75 + core * 0.35) * vBrainEase);
    vec3 finalColor = baseCol * (0.95 + core * 1.55) * clamp(s, 0.35, 1.65);
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
  varying float vBrainRim;

  void main() {
    float isPortraitOnly = step(0.0, -vStrength);
    float activeMorph = max(max(vEase, vCvEase), vBrainEase);
    float s = abs(vStrength);

    float sphereAlpha = 0.96 * (1.0 - isPortraitOnly);
    float portraitOrCvAlpha = mix(0.42, 0.58, vCvEase) * clamp(s, 0.3, 1.35);

    // Volumetric 3D Brain shading: soft inner sulci (0.14) + glowing golden cortical folds & rim (0.34)
    float brainShading = (0.13 + vBrainRim * 0.16 + vPulse * 0.18) * clamp(s, 0.45, 1.45);
    float brainAlpha = brainShading * (1.0 - isPortraitOnly * 0.9);
    float morphedAlpha = mix(portraitOrCvAlpha, brainAlpha, vBrainEase);

    float lineAlpha = mix(sphereAlpha, morphedAlpha, activeMorph) * uFade;
    if (lineAlpha < 0.005) discard;

    vec3 deepAmber = vec3(0.72, 0.46, 0.16);
    vec3 champagne = vec3(1.0, 0.95, 0.82);

    vec3 sphereCol = vColor * 1.15;
    vec3 portraitCol = mix(vColor, uColor * (0.65 + s * 0.55), 0.75);
    // Rich 3-tone golden cortex color (Deep Amber sulci -> Golden Gyri -> Champagne-White Synaptic Hubs)
    vec3 brainCol = mix(deepAmber, uColor * 1.25, clamp(vBrainRim * 0.7 + s * 0.35, 0.0, 1.0));
    brainCol = mix(brainCol, champagne, vPulse * 0.75);

    vec3 morphedCol = mix(portraitCol, brainCol, vBrainEase);
    vec3 lineCol = mix(sphereCol, morphedCol, activeMorph);

    gl_FragColor = vec4(lineCol, lineAlpha);
  }
`
