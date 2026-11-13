uniform float uProgress;
uniform float uCvProgress;
uniform float uBrainProgress;
uniform float uTime;

attribute vec3 aTarget;
attribute vec3 aCvTarget;
attribute vec3 aBrainTarget;
attribute float aDelay;
attribute float aStrength;
attribute float aBrainStrength;
attribute float aSize;

varying float vStrength;
varying float vBrainStrength;
varying vec3 vColor;
varying float vEase;
varying float vCvEase;
varying float vBrainEase;

vec3 getFlowDisplacement(vec3 pos, float factor) {
  float wave = sin(pos.y * 3.0 + uTime * 2.0) * cos(pos.x * 2.5);
  return vec3(-sin(pos.z * 2.0 + uTime * 1.4), wave, cos(pos.y * 2.0 + uTime * 1.2)) * factor;
}

void main() {
  vStrength = aStrength;
  vBrainStrength = aBrainStrength;
  vColor = color;

  float localProgress = clamp((uProgress - aDelay * 0.5) / 0.65, 0.0, 1.0);
  float ease = smoothstep(0.0, 1.0, localProgress);
  vEase = ease;

  float localCv = clamp((uCvProgress - aDelay * 0.45) / 0.65, 0.0, 1.0);
  float cvEase = smoothstep(0.0, 1.0, localCv);
  vCvEase = cvEase;

  float localBrain = clamp((uBrainProgress - aDelay * 0.45) / 0.65, 0.0, 1.0);
  float brainEase = smoothstep(0.0, 1.0, localBrain);
  vBrainEase = brainEase;

  float activeMorph = max(max(ease, cvEase), brainEase);
  float arc = max(max(sin(ease * 3.14159265), sin(cvEase * 3.14159265)), sin(brainEase * 3.14159265));
  vec3 midFlow = getFlowDisplacement(position, arc * 0.72);

  vec3 hologramBreath = vec3(
    sin(uTime * 1.5 + aTarget.y * 2.2) * 0.008,
    cos(uTime * 1.2 + aTarget.x * 2.2) * 0.008,
    sin(uTime * 1.8 + aTarget.x * 3.0) * 0.015
  ) * activeMorph;

  vec3 basePos = mix(position, aTarget, ease);
  basePos = mix(basePos, aCvTarget, cvEase);
  vec3 blendedPosition = mix(basePos, aBrainTarget, brainEase) + midFlow + hologramBreath;

  vec4 viewPosition = modelViewMatrix * vec4(blendedPosition, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  float isPortraitOnly = step(0.0, -aStrength);
  float sphereScale = mix(1.0, activeMorph, isPortraitOnly);

  // Fine, crisp point size (0.55x) in Brain mode so the 90-degree circuit lines look razor-sharp, not blurry blobs!
  float brainSizeMult = 0.45 + clamp(aBrainStrength, 0.2, 1.8) * 0.45;
  float targetSize = mix(aSize * 1.2, aSize * brainSizeMult, brainEase);
  float pSize = mix(aSize, targetSize, activeMorph) * sphereScale;
  gl_PointSize = clamp(pSize * (17.0 / -viewPosition.z), 0.0, 14.0);
}
