uniform vec3 uColor;
uniform float uFade;
varying vec3 vColor;
varying float vStrength;
varying float vBrainStrength;
varying float vEase;
varying float vCvEase;
varying float vBrainEase;

void main() {
  float isPortraitOnly = step(0.0, -vStrength);
  float activeMorph = max(max(vEase, vCvEase), vBrainEase);
  float s = mix(abs(vStrength), vBrainStrength, vBrainEase);

  float sphereAlpha = 0.96 * (1.0 - isPortraitOnly);
  // In Brain mode, make high-strength circuit lines (s > 0.9) pop sharply while dim background wires fade back
  float brainWireAlpha = pow(clamp(s / 1.35, 0.15, 1.25), 1.4) * 0.58;
  float morphedAlpha = mix(0.44 * clamp(s, 0.3, 1.3), brainWireAlpha, vBrainEase);
  float lineAlpha = mix(sphereAlpha, morphedAlpha, activeMorph) * uFade;

  if (lineAlpha < 0.01) discard;

  vec3 champagne = vec3(1.0, 0.95, 0.82);
  float hotWire = smoothstep(1.1, 1.65, s) * vBrainEase;

  vec3 sphereCol = vColor * 1.15;
  vec3 morphedCol = mix(vColor, uColor * (0.6 + s * 0.72), 0.72);
  morphedCol = mix(morphedCol, champagne, hotWire * 0.55);
  vec3 lineCol = mix(sphereCol, morphedCol, activeMorph);

  gl_FragColor = vec4(lineCol, lineAlpha);
}
