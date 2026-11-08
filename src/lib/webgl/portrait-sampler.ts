import * as THREE from 'three'
import { CORE_COLOR, createCoreGeometry } from './core-geometry'

export interface MorphSystemData {
  lineGeo: THREE.BufferGeometry
  nodeGeo: THREE.BufferGeometry
  featureCount: number
  totalNodes: number
}

export function createDefaultPortraitCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const w = (canvas.width = 360)
  const h = (canvas.height = 440)
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, w, h)

  const cx = w * 0.5
  const cy = h * 0.43

  const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 175)
  bgGrad.addColorStop(0, 'rgba(65, 65, 65, 0.35)')
  bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, w, h)

  // Suit & Lapels
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(cx - 145, h)
  ctx.quadraticCurveTo(cx - 125, cy + 125, cx - 42, cy + 102)
  ctx.lineTo(cx + 42, cy + 102)
  ctx.quadraticCurveTo(cx + 125, cy + 125, cx + 145, h)
  ctx.closePath()
  const suitGrad = ctx.createLinearGradient(cx - 140, cy + 100, cx + 140, h)
  suitGrad.addColorStop(0, '#5a5a5a')
  suitGrad.addColorStop(0.5, '#8c8c8c')
  suitGrad.addColorStop(1, '#454545')
  ctx.fillStyle = suitGrad
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = '#d8d8d8'
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(cx - 42, cy + 100)
  ctx.lineTo(cx, cy + 185)
  ctx.lineTo(cx + 42, cy + 100)
  ctx.closePath()
  ctx.fillStyle = '#e8e8e8'
  ctx.fill()
  ctx.restore()

  // Neck
  ctx.save()
  ctx.fillStyle = '#8c8c8c'
  ctx.fillRect(cx - 28, cy + 68, 56, 44)
  ctx.restore()

  // Head contour
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(cx - 68, cy - 25)
  ctx.quadraticCurveTo(cx - 70, cy + 45, cx - 38, cy + 76)
  ctx.quadraticCurveTo(cx, cy + 98, cx + 38, cy + 76)
  ctx.quadraticCurveTo(cx + 70, cy + 45, cx + 68, cy - 25)
  ctx.quadraticCurveTo(cx + 66, cy - 92, cx, cy - 95)
  ctx.quadraticCurveTo(cx - 66, cy - 92, cx - 68, cy - 25)
  ctx.closePath()
  const faceGrad = ctx.createRadialGradient(cx - 10, cy - 10, 12, cx, cy, 90)
  faceGrad.addColorStop(0, '#fcfcfc')
  faceGrad.addColorStop(0.55, '#c6c6c6')
  faceGrad.addColorStop(1, '#3b3b3b')
  ctx.fillStyle = faceGrad
  ctx.fill()
  ctx.lineWidth = 2.5
  ctx.strokeStyle = '#efefef'
  ctx.stroke()
  ctx.restore()

  // Hair & Facial features
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(cx - 46, cy - 16)
  ctx.quadraticCurveTo(cx - 28, cy - 24, cx - 13, cy - 17)
  ctx.moveTo(cx + 13, cy - 17)
  ctx.quadraticCurveTo(cx + 28, cy - 24, cx + 46, cy - 16)
  ctx.moveTo(cx, cy - 15)
  ctx.lineTo(cx - 2, cy + 22)
  ctx.lineTo(cx + 8, cy + 26)
  ctx.moveTo(cx - 22, cy + 48)
  ctx.quadraticCurveTo(cx, cy + 55, cx + 22, cy + 48)
  ctx.stroke()

  return canvas
}

export function createCvHologramCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const w = (canvas.width = 500)
  const h = (canvas.height = 530)
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, w, h)

  // Flush outer border (0 to w, 0 to h) so 3D edge = HTML card edge 1:1
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 4
  ctx.strokeRect(2, 2, w - 4, h - 4)

  // Name & Contact block
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 21px sans-serif'
  ctx.fillText('Gorrela Sai Maneesh', 28, 44)

  ctx.font = '10px monospace'
  ctx.fillStyle = '#d4d4d4'
  ctx.fillText('LinkedIn: linkedin.com/in/sai-maneesh', 28, 62)
  ctx.fillText('GitHub: github.com/Saimaneesh13', 28, 76)
  ctx.fillText('Email: ssai68352@gmail.com', 295, 62)
  ctx.fillText('Mobile: +91 6281433838', 295, 76)

  const sections = [
    { y: 102, title: 'SKILLS', rows: 6 },
    { y: 196, title: 'INTERNSHIP', rows: 3 },
    { y: 266, title: 'PROJECTS', rows: 3 },
    { y: 336, title: 'ACHIEVEMENTS', rows: 3 },
    { y: 406, title: 'CERTIFICATIONS', rows: 3 },
    { y: 472, title: 'EDUCATION', rows: 2 },
  ]

  sections.forEach((sec) => {
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 11px sans-serif'
    ctx.fillText(sec.title, 28, sec.y)

    ctx.strokeStyle = 'rgba(255,255,255,0.7)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(28, sec.y + 5)
    ctx.lineTo(w - 28, sec.y + 5)
    ctx.stroke()

    ctx.fillStyle = 'rgba(255,255,255,0.82)'
    for (let r = 0; r < sec.rows; r++) {
      const ry = sec.y + 13 + r * 10
      ctx.fillRect(28, ry, 75 + ((r * 29) % 35), 3)
      ctx.fillRect(120, ry, 185 + ((r * 53) % 95), 3)
      if (sec.title !== 'SKILLS' && sec.title !== 'ACHIEVEMENTS') {
        ctx.fillRect(w - 86, ry, 54, 3)
      }
    }
  })

  return canvas
}

export function samplePortraitAndCore(
  imageSource: HTMLImageElement | HTMLCanvasElement,
  sampleStep = 2,
  threshold = 0.16
): MorphSystemData | null {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!

  const srcW = (imageSource as HTMLImageElement).naturalWidth || imageSource.width || 360
  const srcH = (imageSource as HTMLImageElement).naturalHeight || imageSource.height || 440

  const targetMaxDim = 175
  const maxDim = Math.max(srcW, srcH)
  const effectiveStep = Math.max(1, maxDim / targetMaxDim) * (sampleStep / 2)

  const width = (canvas.width = Math.max(64, Math.floor(srcW / effectiveStep)))
  const height = (canvas.height = Math.max(64, Math.floor(srcH / effectiveStep)))

  ctx.drawImage(imageSource, 0, 0, width, height)
  const imgData = ctx.getImageData(0, 0, width, height).data

  const aspect = width / height
  const scale = 4.75

  interface PortraitFeature {
    x: number
    y: number
    z: number
    gx: number
    gy: number
    strength: number
    gridX: number
    gridY: number
  }

  const portraitFeatures: PortraitFeature[] = []
  const pixelGrid = new Int32Array(width * height).fill(-1)

  const lumGrid = new Float32Array(width * height)
  let minLum = 1.0
  let maxLum = 0.0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const a = imgData[idx + 3] / 255
      const r = (imgData[idx] / 255) * a
      const g = (imgData[idx + 1] / 255) * a
      const b = (imgData[idx + 2] / 255) * a
      const lum = 0.299 * r + 0.587 * g + 0.114 * b
      lumGrid[y * width + x] = lum
      if (lum < minLum) minLum = lum
      if (lum > maxLum) maxLum = lum
    }
  }

  const lumRange = Math.max(0.05, maxLum - minLum)

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const rawLum = lumGrid[y * width + x]
      const normLum = (rawLum - minLum) / lumRange

      const gx = lumGrid[y * width + (x + 1)] - lumGrid[y * width + (x - 1)]
      const gy = lumGrid[(y + 1) * width + x] - lumGrid[(y - 1) * width + x]
      const edge = Math.min(1.0, Math.sqrt(gx * gx + gy * gy) * 2.6)

      const combinedStrength = Math.min(1.35, normLum * 0.78 + edge * 0.65)

      if (combinedStrength > threshold) {
        const px = (x / width - 0.5) * scale * aspect
        const py = (0.5 - y / height) * scale
        const pz = (normLum - 0.35) * 0.55 + edge * 0.18

        const featureIndex = portraitFeatures.length
        portraitFeatures.push({
          x: px,
          y: py,
          z: pz,
          gx,
          gy,
          strength: Math.max(0.25, combinedStrength),
          gridX: x,
          gridY: y,
        })
        pixelGrid[y * width + x] = featureIndex
      }
    }
  }

  if (portraitFeatures.length === 0) return null

  const BUCKET_RES = 24
  const buckets: number[][] = Array.from({ length: BUCKET_RES * BUCKET_RES }, () => [])

  portraitFeatures.forEach((feat, idx) => {
    const bx = Math.min(BUCKET_RES - 1, Math.max(0, Math.floor((feat.gridX / width) * BUCKET_RES)))
    const by = Math.min(BUCKET_RES - 1, Math.max(0, Math.floor((feat.gridY / height) * BUCKET_RES)))
    buckets[by * BUCKET_RES + bx].push(idx)
  })

  function findNearestFeature(u: number, v: number, hashSeed: number): PortraitFeature {
    const targetBx = Math.min(BUCKET_RES - 1, Math.max(0, Math.floor(u * BUCKET_RES)))
    const targetBy = Math.min(BUCKET_RES - 1, Math.max(0, Math.floor(v * BUCKET_RES)))

    for (let radius = 0; radius <= BUCKET_RES; radius++) {
      const candidates: number[] = []
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue
          const nx = targetBx + dx
          const ny = targetBy + dy
          if (nx >= 0 && nx < BUCKET_RES && ny >= 0 && ny < BUCKET_RES) {
            const cell = buckets[ny * BUCKET_RES + nx]
            if (cell.length > 0) {
              for (let k = 0; k < cell.length; k++) candidates.push(cell[k])
            }
          }
        }
      }
      if (candidates.length > 0) {
        const chosenIdx = candidates[Math.abs(hashSeed) % candidates.length]
        return portraitFeatures[chosenIdx]
      }
    }
    return portraitFeatures[Math.abs(hashSeed) % portraitFeatures.length]
  }

  const coreGeo = createCoreGeometry()

  const linePositions: number[] = []
  const lineColors: number[] = []
  const lineTargets: number[] = []
  const lineDelays: number[] = []
  const lineStrengths: number[] = []
  const lineSizes: number[] = []

  const coreRadius = 2.25

  ;[coreGeo.surface, coreGeo.circuitry, coreGeo.lattice].forEach((geo) => {
    const pos = geo.attributes.position.array as Float32Array
    const col = geo.attributes.color.array as Float32Array
    const segCount = pos.length / 6

    for (let s = 0; s < segCount; s++) {
      const i6 = s * 6
      const ax = pos[i6], ay = pos[i6 + 1], az = pos[i6 + 2]
      const bx = pos[i6 + 3], by = pos[i6 + 4], bz = pos[i6 + 5]

      const mx = (ax + bx) * 0.5
      const my = (ay + by) * 0.5

      const u = THREE.MathUtils.clamp((mx / coreRadius) * 0.5 + 0.5, 0, 1)
      const v = THREE.MathUtils.clamp(0.5 - (my / coreRadius) * 0.5, 0, 1)

      const feat = findNearestFeature(u, v, s * 31 + 17)

      let dx = (bx - ax) * 0.18
      let dy = (by - ay) * 0.18
      let dz = (bz - az) * 0.12
      const segLen = Math.hypot(dx, dy, dz)
      if (segLen > 0.11) {
        const clampScale = 0.11 / segLen
        dx *= clampScale
        dy *= clampScale
        dz *= clampScale
      }

      linePositions.push(ax, ay, az, bx, by, bz)
      lineColors.push(col[i6], col[i6 + 1], col[i6 + 2], col[i6 + 3], col[i6 + 4], col[i6 + 5])

      lineTargets.push(
        feat.x - dx * 0.5, feat.y - dy * 0.5, feat.z - dz * 0.5,
        feat.x + dx * 0.5, feat.y + dy * 0.5, feat.z + dz * 0.5
      )

      const delay = THREE.MathUtils.clamp((feat.y / scale + 0.5) * 0.42 + (s % 13) * 0.012, 0, 0.65)
      lineDelays.push(delay, delay)
      lineStrengths.push(feat.strength * 0.85, feat.strength * 0.85)
      lineSizes.push(1.0, 1.0)
    }
  })

  const gold = new THREE.Color(CORE_COLOR)
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  const featCount = portraitFeatures.length

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idxA = pixelGrid[y * width + x]
      if (idxA === -1) continue
      const featA = portraitFeatures[idxA]

      const idxRight = pixelGrid[y * width + (x + 1)]
      const idxDown = pixelGrid[(y + 1) * width + x]

      const connectNeighbor = (idxB: number, intensityBoost: number) => {
        const featB = portraitFeatures[idxB]
        const dist = Math.hypot(featB.x - featA.x, featB.y - featA.y)
        if (dist > 0.14) return

        const theta = (2 * Math.PI * idxA) / goldenRatio
        const phi = Math.acos(1 - (2 * (idxA + 0.5)) / featCount)
        const r = 2.04 + (idxA % 3) * 0.095

        const sx = r * Math.sin(phi) * Math.cos(theta)
        const sy = r * Math.cos(phi)
        const sz = r * Math.sin(phi) * Math.sin(theta)

        linePositions.push(
          sx, sy, sz,
          sx + (featB.x - featA.x) * 0.25,
          sy + (featB.y - featA.y) * 0.25,
          sz
        )

        const colIntensity = (0.38 + (featA.strength + featB.strength) * 0.35) * intensityBoost
        lineColors.push(
          gold.r * colIntensity, gold.g * colIntensity, gold.b * colIntensity,
          gold.r * colIntensity, gold.g * colIntensity, gold.b * colIntensity
        )

        lineTargets.push(featA.x, featA.y, featA.z, featB.x, featB.y, featB.z)

        const delay = THREE.MathUtils.clamp((featA.y / scale + 0.5) * 0.42 + (idxA % 11) * 0.014, 0, 0.65)
        lineDelays.push(delay, delay)
        // Negative sign tells the shader this wire belongs ONLY to the portrait, keeping the sphere 100% pure circuitry
        lineStrengths.push(-featA.strength, -featB.strength)
        lineSizes.push(1.0, 1.0)
      }

      if (idxRight !== -1 && (x + y) % 2 === 0) {
        connectNeighbor(idxRight, 0.95)
      }
      if (idxDown !== -1 && featA.strength > 0.48 && (x * 3 + y) % 3 === 0) {
        connectNeighbor(idxDown, 0.85)
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
  lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3))
  lineGeo.setAttribute('aTarget', new THREE.Float32BufferAttribute(lineTargets, 3))
  lineGeo.setAttribute('aDelay', new THREE.Float32BufferAttribute(lineDelays, 1))
  lineGeo.setAttribute('aStrength', new THREE.Float32BufferAttribute(lineStrengths, 1))
  lineGeo.setAttribute('aSize', new THREE.Float32BufferAttribute(lineSizes, 1))

  const nodePositions: number[] = []
  const nodeSizes: number[] = []
  const nodeStrengths: number[] = []
  const nodeTargets: number[] = []
  const nodeDelays: number[] = []
  const nodeColors: number[] = []

  const rawNodePos = coreGeo.nodes.attributes.position.array as Float32Array
  const rawNodeSize = coreGeo.nodes.attributes.aSize.array as Float32Array
  const rawNodeStrength = coreGeo.nodes.attributes.aStrength.array as Float32Array
  const coreNodeCount = rawNodePos.length / 3

  for (let i = 0; i < coreNodeCount; i++) {
    const nx = rawNodePos[i * 3]
    const ny = rawNodePos[i * 3 + 1]
    const nz = rawNodePos[i * 3 + 2]

    const u = THREE.MathUtils.clamp((nx / coreRadius) * 0.5 + 0.5, 0, 1)
    const v = THREE.MathUtils.clamp(0.5 - (ny / coreRadius) * 0.5, 0, 1)
    const feat = findNearestFeature(u, v, i * 47 + 13)

    nodePositions.push(nx, ny, nz)
    nodeSizes.push(rawNodeSize[i])
    nodeStrengths.push(rawNodeStrength[i] * (0.55 + feat.strength * 0.6))
    nodeTargets.push(feat.x, feat.y, feat.z)
    nodeDelays.push(THREE.MathUtils.clamp((feat.y / scale + 0.5) * 0.42 + (i % 17) * 0.01, 0, 0.65))
    nodeColors.push(gold.r, gold.g, gold.b)
  }

  for (let i = 0; i < featCount; i++) {
    const feat = portraitFeatures[i]
    const theta = (2 * Math.PI * i) / goldenRatio
    const phi = Math.acos(1 - (2 * (i + 0.5)) / featCount)
    const r = 2.04 + (i % 3) * 0.095

    const sx = r * Math.sin(phi) * Math.cos(theta)
    const sy = r * Math.cos(phi)
    const sz = r * Math.sin(phi) * Math.sin(theta)

    nodePositions.push(sx, sy, sz)
    nodeSizes.push(0.65 + feat.strength * 1.35)
    // Negative sign tells the shader this Fibonacci node belongs ONLY to the portrait, keeping the sphere free of dot clutter
    nodeStrengths.push(-feat.strength)
    nodeTargets.push(feat.x, feat.y, feat.z)
    nodeDelays.push(THREE.MathUtils.clamp((feat.y / scale + 0.5) * 0.42 + (i % 19) * 0.01, 0, 0.65))
    nodeColors.push(gold.r, gold.g, gold.b)
  }

  const nodeGeo = new THREE.BufferGeometry()
  nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3))
  nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3))
  nodeGeo.setAttribute('aSize', new THREE.Float32BufferAttribute(nodeSizes, 1))
  nodeGeo.setAttribute('aStrength', new THREE.Float32BufferAttribute(nodeStrengths, 1))
  nodeGeo.setAttribute('aTarget', new THREE.Float32BufferAttribute(nodeTargets, 3))
  nodeGeo.setAttribute('aDelay', new THREE.Float32BufferAttribute(nodeDelays, 1))

  // Sample the high-res CV Hologram Canvas so the 3D CV looks like a real glowing document hologram
  const cvCanvas = createCvHologramCanvas()
  const cvW = 190
  const cvH = 200
  const tmpCanvas = document.createElement('canvas')
  tmpCanvas.width = cvW
  tmpCanvas.height = cvH
  const tmpCtx = tmpCanvas.getContext('2d')!
  tmpCtx.drawImage(cvCanvas, 0, 0, cvW, cvH)
  const cvImg = tmpCtx.getImageData(0, 0, cvW, cvH).data

  const cvPoints: { x: number; y: number; z: number }[] = []

  for (let y = 0; y < cvH; y++) {
    for (let x = 0; x < cvW; x++) {
      const lum = cvImg[(y * cvW + x) * 4] / 255
      if (lum > 0.15) {
        // Normalized 1.0 x 1.0 unit coordinates (-0.5 to +0.5)
        cvPoints.push({
          x: x / cvW - 0.5,
          y: 0.5 - y / cvH,
          z: (lum - 0.5) * 0.02,
        })
      }
    }
  }

  const cvCount = Math.max(1, cvPoints.length)
  const lineSegTotal = linePositions.length / 6
  const lineCvTargets = new Float32Array(linePositions.length)

  for (let s = 0; s < lineSegTotal; s++) {
    const pt = cvPoints[(s * 7) % cvCount]
    const i6 = s * 6
    lineCvTargets[i6] = pt.x - 0.0035
    lineCvTargets[i6 + 1] = pt.y
    lineCvTargets[i6 + 2] = pt.z
    lineCvTargets[i6 + 3] = pt.x + 0.0035
    lineCvTargets[i6 + 4] = pt.y
    lineCvTargets[i6 + 5] = pt.z
  }
  lineGeo.setAttribute('aCvTarget', new THREE.BufferAttribute(lineCvTargets, 3))

  const totalNodeCount = nodePositions.length / 3
  const nodeCvTargets = new Float32Array(nodePositions.length)
  for (let i = 0; i < totalNodeCount; i++) {
    const pt = cvPoints[i % cvCount]
    nodeCvTargets[i * 3] = pt.x
    nodeCvTargets[i * 3 + 1] = pt.y
    nodeCvTargets[i * 3 + 2] = pt.z
  }
  nodeGeo.setAttribute('aCvTarget', new THREE.BufferAttribute(nodeCvTargets, 3))

  return {
    lineGeo,
    nodeGeo,
    featureCount: featCount,
    totalNodes: nodePositions.length / 3,
  }
}
