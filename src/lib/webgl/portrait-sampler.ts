import * as THREE from 'three'
import { CORE_COLOR, createCoreGeometry } from './core-geometry'

export interface MorphSystemData {
  lineGeo: THREE.BufferGeometry
  nodeGeo: THREE.BufferGeometry
  featureCount: number
  totalNodes: number
}

export function createProceduralPortraitCanvas(): HTMLCanvasElement {
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

  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, 100, 0, Math.PI * 2)
  ctx.fillStyle = '#b8b8b8'
  ctx.fill()
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()

  return canvas
}

export const createDefaultPortraitCanvas = createProceduralPortraitCanvas

export function createCvHologramCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const w = (canvas.width = 500)
  const h = (canvas.height = 530)
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 4
  ctx.strokeRect(2, 2, w - 4, h - 4)

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
  threshold = 0.16,
  brainImageSource?: HTMLImageElement | HTMLCanvasElement | null
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

  interface SampledFeature {
    x: number
    y: number
    z: number
    strength: number
    gridX: number
    gridY: number
  }

  const portraitFeatures: SampledFeature[] = []
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

  function findNearestFeature(u: number, v: number, hashSeed: number): SampledFeature {
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
            for (let k = 0; k < cell.length; k++) candidates.push(cell[k])
          }
        }
      }
      if (candidates.length > 0) {
        return portraitFeatures[candidates[Math.abs(hashSeed) % candidates.length]]
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

  // =========================================================================
  // 2. CV HOLOGRAM TARGETS (Normalized 1.0 x 1.0 unit box for DOM alignment)
  // =========================================================================
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
    lineCvTargets[i6] = pt.x - 0.008
    lineCvTargets[i6 + 1] = pt.y
    lineCvTargets[i6 + 2] = pt.z
    lineCvTargets[i6 + 3] = pt.x + 0.008
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

  // =========================================================================
  // 3. HIGH-CONTRAST BRAIN.PNG SPATIAL CIRCUITRY MAPPER
  // =========================================================================
  const bSrc = brainImageSource || imageSource
  const bCanvas = document.createElement('canvas')
  const bCtx = bCanvas.getContext('2d', { willReadFrequently: true })!

  const bSrcW = (bSrc as HTMLImageElement).naturalWidth || bSrc.width || 500
  const bSrcH = (bSrc as HTMLImageElement).naturalHeight || bSrc.height || 380

  // Sample at 235px max dimension so the 90-degree circuit lines and central core are crystal clear
  const bTargetMaxDim = 235
  const bMaxDim = Math.max(bSrcW, bSrcH)
  const bStep = Math.max(1, bMaxDim / bTargetMaxDim) * (sampleStep / 2)

  const bW = (bCanvas.width = Math.max(64, Math.floor(bSrcW / bStep)))
  const bH = (bCanvas.height = Math.max(64, Math.floor(bSrcH / bStep)))

  bCtx.drawImage(bSrc, 0, 0, bW, bH)
  const bImgData = bCtx.getImageData(0, 0, bW, bH).data

  const bAspect = bW / bH
  const bScale = 3.65

  const brainFeatures: SampledFeature[] = []
  const bPixelGrid = new Int32Array(bW * bH).fill(-1)
  const bLumGrid = new Float32Array(bW * bH)
  let bMinLum = 1.0
  let bMaxLum = 0.0

  for (let y = 0; y < bH; y++) {
    for (let x = 0; x < bW; x++) {
      const idx = (y * bW + x) * 4
      const a = bImgData[idx + 3] / 255
      const r = (bImgData[idx] / 255) * a
      const g = (bImgData[idx + 1] / 255) * a
      const b = (bImgData[idx + 2] / 255) * a
      // Weight warm red/gold channels strongly so golden circuit traces pop against dark areas
      const lum = 0.42 * r + 0.48 * g + 0.10 * b
      bLumGrid[y * bW + x] = lum
      if (lum < bMinLum) bMinLum = lum
      if (lum > bMaxLum) bMaxLum = lum
    }
  }

  const bLumRange = Math.max(0.05, bMaxLum - bMinLum)
  // Higher threshold (0.22) + gamma contrast curve (1.45) strips away the dusty background haze
  // so ONLY the bright golden circuit lines, cortical rim, and central core are sampled!
  const bThreshold = 0.22

  for (let y = 1; y < bH - 1; y++) {
    for (let x = 1; x < bW - 1; x++) {
      const rawLum = bLumGrid[y * bW + x]
      const linearLum = Math.max(0, (rawLum - bMinLum) / bLumRange)
      // Gamma 1.45 crushes dim background noise and boosts bright circuit paths
      const normLum = Math.pow(linearLum, 1.45)

      const gx = bLumGrid[y * bW + (x + 1)] - bLumGrid[y * bW + (x - 1)]
      const gy = bLumGrid[(y + 1) * width + x] - bLumGrid[(y - 1) * width + x]
      const edge = Math.min(1.0, Math.sqrt(gx * gx + gy * gy) * 3.4)

      const combinedStrength = Math.min(1.75, normLum * 0.95 + edge * 0.85)

      if (combinedStrength > bThreshold) {
        const px = (x / bW - 0.5) * bScale * bAspect
        const py = (0.5 - y / bH) * bScale
        const pz = (normLum - 0.35) * 0.32 + edge * 0.14

        const fIdx = brainFeatures.length
        brainFeatures.push({
          x: px,
          y: py,
          z: pz,
          strength: Math.max(0.28, combinedStrength),
          gridX: x,
          gridY: y,
        })
        bPixelGrid[y * bW + x] = fIdx
      }
    }
  }

  if (brainFeatures.length === 0) {
    brainFeatures.push({ x: 0, y: 0, z: 0, strength: 1.0, gridX: 0, gridY: 0 })
  }

  const B_BUCKET_RES = 24
  const bBuckets: number[][] = Array.from({ length: B_BUCKET_RES * B_BUCKET_RES }, () => [])

  brainFeatures.forEach((feat, idx) => {
    const bx = Math.min(B_BUCKET_RES - 1, Math.max(0, Math.floor((feat.gridX / bW) * B_BUCKET_RES)))
    const by = Math.min(B_BUCKET_RES - 1, Math.max(0, Math.floor((feat.gridY / bH) * B_BUCKET_RES)))
    bBuckets[by * B_BUCKET_RES + bx].push(idx)
  })

  function findNearestBrainFeature(u: number, v: number, hashSeed: number): SampledFeature {
    const targetBx = Math.min(B_BUCKET_RES - 1, Math.max(0, Math.floor(u * B_BUCKET_RES)))
    const targetBy = Math.min(B_BUCKET_RES - 1, Math.max(0, Math.floor(v * B_BUCKET_RES)))

    for (let radius = 0; radius <= B_BUCKET_RES; radius++) {
      const candidates: number[] = []
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue
          const nx = targetBx + dx
          const ny = targetBy + dy
          if (nx >= 0 && nx < B_BUCKET_RES && ny >= 0 && ny < B_BUCKET_RES) {
            const cell = bBuckets[ny * B_BUCKET_RES + nx]
            for (let k = 0; k < cell.length; k++) candidates.push(cell[k])
          }
        }
      }
      if (candidates.length > 0) {
        return brainFeatures[candidates[Math.abs(hashSeed) % candidates.length]]
      }
    }
    return brainFeatures[Math.abs(hashSeed) % brainFeatures.length]
  }

  // Extract connected horizontal & vertical 90-degree circuit segments directly from brain.png
  const brainNeighborSegs: {
    ax: number
    ay: number
    az: number
    bx: number
    by: number
    bz: number
    sA: number
    sB: number
  }[] = []

  for (let y = 1; y < bH - 1; y++) {
    for (let x = 1; x < bW - 1; x++) {
      const idxA = bPixelGrid[y * bW + x]
      if (idxA === -1) continue
      const fA = brainFeatures[idxA]

      const idxR = bPixelGrid[y * bW + (x + 1)]
      const idxD = bPixelGrid[(y + 1) * bW + x]

      if (idxR !== -1) {
        const fB = brainFeatures[idxR]
        if (Math.hypot(fB.x - fA.x, fB.y - fA.y) <= 0.14) {
          brainNeighborSegs.push({
            ax: fA.x, ay: fA.y, az: fA.z,
            bx: fB.x, by: fB.y, bz: fB.z,
            sA: fA.strength, sB: fB.strength,
          })
        }
      }
      if (idxD !== -1) {
        const fB = brainFeatures[idxD]
        if (Math.hypot(fB.x - fA.x, fB.y - fA.y) <= 0.14) {
          brainNeighborSegs.push({
            ax: fA.x, ay: fA.y, az: fA.z,
            bx: fB.x, by: fB.y, bz: fB.z,
            sA: fA.strength, sB: fB.strength,
          })
        }
      }
    }
  }

  const lineBrainTargets = new Float32Array(linePositions.length)
  const lineBrainStrengths = new Float32Array(lineSegTotal * 2)
  const bNeighborCount = brainNeighborSegs.length

  for (let s = 0; s < lineSegTotal; s++) {
    const i6 = s * 6
    const i2 = s * 2
    if (bNeighborCount > 0 && s >= lineSegTotal - bNeighborCount * 2) {
      // Map directly to the connected 90-degree circuit lines of brain.png!
      const nSeg = brainNeighborSegs[s % bNeighborCount]
      lineBrainTargets[i6] = nSeg.ax
      lineBrainTargets[i6 + 1] = nSeg.ay
      lineBrainTargets[i6 + 2] = nSeg.az
      lineBrainTargets[i6 + 3] = nSeg.bx
      lineBrainTargets[i6 + 4] = nSeg.by
      lineBrainTargets[i6 + 5] = nSeg.bz
      lineBrainStrengths[i2] = nSeg.sA * 1.15
      lineBrainStrengths[i2 + 1] = nSeg.sB * 1.15
    } else {
      const ax = linePositions[i6], ay = linePositions[i6 + 1]
      const bx = linePositions[i6 + 3], by = linePositions[i6 + 4]
      const mx = (ax + bx) * 0.5
      const my = (ay + by) * 0.5
      const u = THREE.MathUtils.clamp((mx / coreRadius) * 0.5 + 0.5, 0, 1)
      const v = THREE.MathUtils.clamp(0.5 - (my / coreRadius) * 0.5, 0, 1)
      const feat = findNearestBrainFeature(u, v, s * 31 + 17)

      // Snap sphere segments strictly Horizontal or Vertical (90-degree PCB orientation)
      const isHoriz = Math.abs(bx - ax) >= Math.abs(by - ay)
      const segHalf = 0.032
      const dx = isHoriz ? segHalf : 0.0
      const dy = isHoriz ? 0.0 : segHalf

      lineBrainTargets[i6] = feat.x - dx
      lineBrainTargets[i6 + 1] = feat.y - dy
      lineBrainTargets[i6 + 2] = feat.z
      lineBrainTargets[i6 + 3] = feat.x + dx
      lineBrainTargets[i6 + 4] = feat.y + dy
      lineBrainTargets[i6 + 5] = feat.z
      lineBrainStrengths[i2] = feat.strength
      lineBrainStrengths[i2 + 1] = feat.strength
    }
  }
  lineGeo.setAttribute('aBrainTarget', new THREE.BufferAttribute(lineBrainTargets, 3))
  lineGeo.setAttribute('aBrainStrength', new THREE.BufferAttribute(lineBrainStrengths, 1))

  const nodeBrainTargets = new Float32Array(nodePositions.length)
  const nodeBrainStrengths = new Float32Array(totalNodeCount)
  const bFeatCount = brainFeatures.length

  for (let i = 0; i < totalNodeCount; i++) {
    const feat =
      i < coreNodeCount
        ? findNearestBrainFeature(
            THREE.MathUtils.clamp((nodePositions[i * 3] / coreRadius) * 0.5 + 0.5, 0, 1),
            THREE.MathUtils.clamp(0.5 - (nodePositions[i * 3 + 1] / coreRadius) * 0.5, 0, 1),
            i * 47 + 13
          )
        : brainFeatures[(i - coreNodeCount) % bFeatCount]

    nodeBrainTargets[i * 3] = feat.x
    nodeBrainTargets[i * 3 + 1] = feat.y
    nodeBrainTargets[i * 3 + 2] = feat.z
    nodeBrainStrengths[i] = feat.strength
  }
  nodeGeo.setAttribute('aBrainTarget', new THREE.BufferAttribute(nodeBrainTargets, 3))
  nodeGeo.setAttribute('aBrainStrength', new THREE.BufferAttribute(nodeBrainStrengths, 1))

  return {
    lineGeo,
    nodeGeo,
    featureCount: featCount,
    totalNodes: totalNodeCount,
  }
}
