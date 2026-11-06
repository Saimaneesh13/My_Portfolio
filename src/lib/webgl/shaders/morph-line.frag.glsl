/**
 * Neural Core - Synaptic Connection Line Fragment Shader
 * Renders glowing dynamic synaptic connections with pulses traveling across the network.
 */

uniform vec3 uColorGold;
uniform float uTime;
uniform float uAlphaMultiplier;

varying vec3 vPosition;

void main() {
  // Shimmer pulse based on vertex position and continuous time
  float pulse = sin(uTime * 3.0 + vPosition.x * 4.0 + vPosition.y * 4.0);
  float normalizedPulse = clamp(pulse * 0.5 + 0.5, 0.2, 1.0);

  // Deep luxury gold with varying transparency
  vec3 lineColor = uColorGold * (0.8 + normalizedPulse * 0.4);
  float alpha = (0.22 + normalizedPulse * 0.28) * uAlphaMultiplier;

  gl_FragColor = vec4(lineColor, alpha);
}

