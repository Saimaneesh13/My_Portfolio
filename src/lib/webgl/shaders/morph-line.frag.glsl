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
  // Crisp circuit trace alpha in Brain mode
  float brainWireAlpha = pow(clamp(s / 1.35, 0.18, 1.25), 1.35) * 0.52;
  float morphedAlpha = mix(0.44 * clamp(s, 0.3, 1.3), brainWireAlpha, vBrainEase);
  float lineAlpha = mix(sphereAlpha, morphedAlpha, activeMorph) * uFade;

  if (lineAlpha < 0.01) discard;

  vec3 champagne = vec3(1.0, 0.95, 0.82);
  float hotWire = smoothstep(1.15, 1.7, s) * vBrainEase;

  vec3 sphereCol = vColor * 1.15;
  vec3 morphedCol = mix(vColor, uColor * (0.62 + s * 0.7), 0.75);
  morphedCol = mix(morphedCol, champagne, hotWire * 0.55);
  vec3 lineCol = mix(sphereCol, morphedCol, activeMorph);

  gl_FragColor = vec4(lineCol, lineAlpha);
}
