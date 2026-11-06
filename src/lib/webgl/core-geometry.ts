import * as THREE from 'three';

export const CORE_COLOR = '#eab767';
export const SPACE_COLOR = '#070b13';

export function seededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function spherePoint(radius: number, longitude: number, latitude: number) {
  return new THREE.Vector3(
    radius * Math.cos(latitude) * Math.cos(longitude),
    radius * Math.sin(latitude),
    radius * Math.cos(latitude) * Math.sin(longitude)
  );
}

/**
 * Procedural Geometry Helpers for 3D Neural Mesh and Morphing Systems
 */

/**
 * Generates points evenly distributed on a sphere surface using the golden spiral / Fibonacci lattice
 */
export function generateFibonacciSphere(count: number, radius = 1.5): Float32Array {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle in radians

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // radius at y

    const theta = phi * i; // golden angle increment

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Introduce subtle organic radial noise
    const jitter = 1 + (Math.sin(i * 0.3) * 0.08);

    positions[i * 3] = x * radius * jitter;
    positions[i * 3 + 1] = y * radius * jitter;
    positions[i * 3 + 2] = z * radius * jitter;
  }

  return positions;
}

/**
 * Generates points in a double-helix / toroid ring representing structured computation layers
 */
export function generateTorusKnotPoints(count: number, radius = 1.8, tube = 0.5): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const u = (i / count) * Math.PI * 4;
    const v = (i / count) * Math.PI * 6;

    const cu = Math.cos(u);
    const su = Math.sin(u);
    const cv = Math.cos(v);

    const x = (radius + tube * cv) * cu;
    const y = (radius + tube * cv) * su;
    const z = tube * Math.sin(v);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  return positions;
}

/**
 * Finds synaptic connection lines between nearby nodes in a point cloud
 */
export function generateNeuralConnections(
  positions: Float32Array,
  maxDistance = 0.85,
  maxLines = 2400
): Float32Array {
  const nodeCount = positions.length / 3;
  const lineCoords: number[] = [];
  let linesCreated = 0;

  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();

  // Optimized spatial thresholding
  for (let i = 0; i < nodeCount && linesCreated < maxLines; i++) {
    vA.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);

    for (let j = i + 1; j < nodeCount && linesCreated < maxLines; j++) {
      vB.set(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
      const dist = vA.distanceTo(vB);

      if (dist < maxDistance) {
        lineCoords.push(vA.x, vA.y, vA.z);
        lineCoords.push(vB.x, vB.y, vB.z);
        linesCreated++;
      }
    }
  }

  return new Float32Array(lineCoords);
}

/**
 * Computes random perturbation vectors for vertex shader turbulence
 */
export function generateRandomAttributes(count: number): Float32Array {
  const data = new Float32Array(count * 4); // [phase, speed, sizeScale, randomId]

  for (let i = 0; i < count; i++) {
    data[i * 4 + 0] = Math.random() * Math.PI * 2; // phase
    data[i * 4 + 1] = 0.5 + Math.random() * 1.5;   // speed
    data[i * 4 + 2] = 0.6 + Math.random() * 0.8;   // scale
    data[i * 4 + 3] = Math.random();               // random identifier
  }

  return data;
}
