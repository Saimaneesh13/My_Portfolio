uniform vec3 uColor;
uniform float uFade;
varying float vStrength;
varying float vBrainStrength;
varying float vEase;
varying float vCvEase;
varying float vBrainEase;

void main() {
  float isPortraitOnly = step(0.0, -vStrength);
  float activeMorph = max(max(vEase, vCvEase), vBrainEase);
  float visibility = mix(1.0, activeMorph, isPortraitOnly) * uFade;
  if (visibility < 0.02) discard;

  // Blend between Portrait strength and Brain.png pixel strength!
  float s = mix(abs(vStrength), vBrainStrength, vBrainEase);

  float dist = length(gl_PointCoord - 0.5);
  float core = 1.0 - smoothstep(0.04, 0.22, dist);
  float glow = pow(max(0.0, 1.0 - dist * 2.0), 2.8);
  float alpha = (core * 0.88 + glow * 0.58) * visibility * clamp(s, 0.25, 1.5);

  if (alpha < 0.02) discard;

  // Hot champagne-white highlights on the brightest brain circuit junctions & central core
  vec3 champagne = vec3(1.0, 0.96, 0.84);
  float hotSpot = smoothstep(1.05, 1.65, s) * vBrainEase;
  vec3 baseCol = mix(uColor, champagne, hotSpot * 0.65);

  vec3 finalColor = baseCol * (0.9 + core * 1.45) * clamp(s, 0.3, 1.75);
  gl_FragColor = vec4(finalColor, alpha);
}
