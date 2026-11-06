/**
 * Neural Core - Morph Vertex Shader
 * Interpolates between primary neural lattice (position) and morphed topology (aTargetPosition).
 * Applies continuous harmonic oscillations and audio-reactive micro-turbulence.
 */

uniform float uProgress;          // Morph progress: 0.0 (sphere core) -> 1.0 (morphed biometric profile)
uniform float uTime;              // Continuous animation time in seconds
uniform float uAudioReactivity;   // Audio intensity factor from microphone / voice module
uniform float uNoiseStrength;     // Magnitude of procedural displacement

attribute vec3 aTargetPosition;   // Destination geometry coordinates
attribute vec4 aRandom;           // Per-particle attributes: [phase, speed, sizeScale, randomId]

varying vec3 vPosition;
varying float vNoise;
varying float vAlpha;
varying vec2 vUv;

// Simple 3D procedural noise hash
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

void main() {
  vUv = uv;

  // Non-linear ease-in-out morph transition
  float t = smoothstep(0.0, 1.0, uProgress);

  // Linear position blend between resting state and target morph state
  vec3 mixedPos = mix(position, aTargetPosition, t);

  // Compute undulating orbital noise
  float phase = aRandom.x;
  float speed = aRandom.y;
  float wave = sin(uTime * speed + phase) * cos(uTime * 0.5 + mixedPos.y * 2.0);

  // Audio reactivity pulse
  float audioPulse = uAudioReactivity * 0.4 * sin(uTime * 8.0 + aRandom.w * 6.28);

  // Total displacement offset
  vec3 displacement = normalize(mixedPos + vec3(0.001)) * (wave * uNoiseStrength + audioPulse);
  vec3 finalPosition = mixedPos + displacement;

  vPosition = finalPosition;
  vNoise = wave;
  vAlpha = 0.6 + 0.4 * sin(uTime * 2.0 + phase);

  vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);

  // Point size attenuation with distance and particle scale
  float basePointSize = 32.0 * aRandom.z;
  gl_PointSize = (basePointSize / -mvPosition.z) * (1.0 + audioPulse * 1.5);

  gl_Position = projectionMatrix * mvPosition;
}

