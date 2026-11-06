/**
 * Portrait Sampler & Synthetic Fallback Generator
 * Samples luminance data from 2D portrait images into 3D point cloud arrays.
 * Includes procedural synthetic neural silhouette fallback if the image is missing.
 */

export interface SamplerResult {
  positions: Float32Array;
  brightness: Float32Array;
  count: number;
}

/**
 * Creates a synthetic procedural head/neural silhouette onto an offscreen canvas
 */
export function createSyntheticPortraitCanvas(width = 256, height = 256): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return canvas;

  // Background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height * 0.45;

  // Head oval glow
  const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 80);
  grad.addColorStop(0, '#FFFFFF');
  grad.addColorStop(0.6, '#B0B0B0');
  grad.addColorStop(1, '#000000');
  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.ellipse(cx, cy, 55, 75, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neck and shoulders
  ctx.fillStyle = '#666666';
  ctx.beginPath();
  ctx.ellipse(cx, height * 0.85, 70, 35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Synthetic neural nodes
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < 35; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 65;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * (r * 1.2), 3, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

/**
 * Samples pixel data from an HTMLCanvasElement into normalized 3D positions
 */
export function sampleCanvasToPoints(
  canvas: HTMLCanvasElement,
  targetCount = 1600,
  threshold = 40
): SamplerResult {
  const ctx = canvas.getContext('2d');
  const positions: number[] = [];
  const brightness: number[] = [];

  if (!ctx) {
    return {
      positions: new Float32Array(targetCount * 3),
      brightness: new Float32Array(targetCount),
      count: targetCount,
    };
  }

  const { width, height } = canvas;
  const imgData = ctx.getImageData(0, 0, width, height).data;

  const validPixels: { x: number; y: number; lum: number }[] = [];

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const idx = (y * width + x) * 4;
      const r = imgData[idx];
      const g = imgData[idx + 1];
      const b = imgData[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      if (lum > threshold) {
        validPixels.push({ x, y, lum });
      }
    }
  }

  // Subsample to targetCount
  const step = Math.max(1, Math.floor(validPixels.length / targetCount));
  for (let i = 0; i < validPixels.length && positions.length / 3 < targetCount; i += step) {
    const p = validPixels[i];
    // Map to normalized 3D coordinates [-1.5, 1.5]
    const nx = (p.x / width - 0.5) * 3.0;
    const ny = -(p.y / height - 0.5) * 3.0;
    const nz = (p.lum / 255 - 0.5) * 0.8;

    positions.push(nx, ny, nz);
    brightness.push(p.lum / 255);
  }

  // Pad if needed
  while (positions.length / 3 < targetCount) {
    positions.push(
      (Math.random() - 0.5) * 2.5,
      (Math.random() - 0.5) * 2.5,
      (Math.random() - 0.5) * 0.5
    );
    brightness.push(0.5);
  }

  return {
    positions: new Float32Array(positions),
    brightness: new Float32Array(brightness),
    count: targetCount,
  };
}

/**
 * Loads an image or falls back to synthetic portrait, then returns sampled points
 */
export async function samplePortraitAsync(
  imageUrl: string,
  targetCount = 1600
): Promise<SamplerResult> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      const fallbackCanvas = createSyntheticPortraitCanvas();
      resolve(sampleCanvasToPoints(fallbackCanvas, targetCount));
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, 256, 256);
        resolve(sampleCanvasToPoints(canvas, targetCount));
      } else {
        const fallbackCanvas = createSyntheticPortraitCanvas();
        resolve(sampleCanvasToPoints(fallbackCanvas, targetCount));
      }
    };

    img.onerror = () => {
      console.info(`Portrait at '${imageUrl}' not found. Using procedural synthetic fallback.`);
      const fallbackCanvas = createSyntheticPortraitCanvas();
      resolve(sampleCanvasToPoints(fallbackCanvas, targetCount));
    };

    img.src = imageUrl;
  });
}

// Backward-compatibility aliases
export const createDefaultPortraitCanvas = createSyntheticPortraitCanvas;
export const samplePortraitAndCore = samplePortraitAsync;
