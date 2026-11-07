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

export const morphVertexShader = `
  uniform float uProgress;
  uniform float uTime;

  attribute vec3 aTarget;
  attribute float aDelay;
  attribute float aStrength;
  attribute float aSize;

  varying float vStrength;
  varying vec3 vColor;
  varying float vEase;

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

    float arc = sin(ease * 3.14159265);
    vec3 midFlow = getFlowDisplacement(position, arc * 0.72);

    vec3 portraitBreath = vec3(
      sin(uTime * 1.5 + aTarget.y * 2.2) * 0.012,
      cos(uTime * 1.2 + aTarget.x * 2.2) * 0.012,
      sin(uTime * 1.8 + aTarget.x * 3.0) * 0.025
    ) * ease;

    vec3 blendedPosition = mix(position, aTarget, ease) + midFlow + portraitBreath;

    vec4 viewPosition = modelViewMatrix * vec4(blendedPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float pSize = mix(aSize, aSize * 1.25, ease);
    gl_PointSize = clamp(pSize * (22.0 / -viewPosition.z), 1.0, 18.0);
  }
`

export const morphFragmentShader = `
  uniform vec3 uColor;
  varying float vStrength;
  varying float vEase;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.04, 0.22, dist);
    float glow = pow(max(0.0, 1.0 - dist * 2.0), 2.8);
    float alpha = (core * 0.82 + glow * 0.58) * mix(0.75, 0.95, vEase);

    if (alpha < 0.02) discard;

    vec3 finalColor = uColor * (0.85 + core * 1.35) * clamp(vStrength, 0.25, 1.45);
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export const morphLineFragmentShader = `
  uniform vec3 uColor;
  varying vec3 vColor;
  varying float vStrength;
  varying float vEase;

  void main() {
    float lineAlpha = mix(0.32, 0.44, vEase) * clamp(vStrength, 0.3, 1.25);
    vec3 lineCol = mix(vColor, uColor * (0.55 + vStrength * 0.65), vEase * 0.65);
    gl_FragColor = vec4(lineCol, lineAlpha);
  }
`
