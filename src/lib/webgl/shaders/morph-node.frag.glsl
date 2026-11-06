/**
 * Neural Core - Point Node Fragment Shader
 * Renders anti-aliased luminous synaptic points with core glow and luxury gold aesthetics.
 */

uniform vec3 uColorGold;          // Base brand gold (#EAB767)
uniform vec3 uColorCyan;          // Secondary accent cyan (#00F0FF)
uniform float uInspectIntensity;  // Boost when user triggers inspect mode

varying vec3 vPosition;
varying float vNoise;
varying float vAlpha;

void main() {
  // Convert square point coord into centered circle space [-1, 1]
  vec2 coord = gl_PointCoord * 2.0 - 1.0;
  float dist = length(coord);

  // Soft circular alpha falloff
  if (dist > 1.0) {
    discard;
  }

  // Radial soft glow falloff
  float glow = 1.0 - smoothstep(0.0, 1.0, dist);
  float innerCore = 1.0 - smoothstep(0.0, 0.35, dist);

  // Blend gold base with secondary cyber luminescence based on noise/altitude
  vec3 baseColor = mix(uColorGold, uColorCyan, clamp(vNoise * 0.5 + 0.2, 0.0, 1.0));

  // Add bright center core highlight
  vec3 finalColor = mix(baseColor, vec3(1.0, 0.96, 0.88), innerCore * 0.8);
  finalColor += baseColor * uInspectIntensity * 0.5;

  float finalAlpha = glow * vAlpha * (0.85 + uInspectIntensity * 0.15);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
