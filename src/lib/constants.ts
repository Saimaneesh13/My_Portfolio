export const BRAND = {
  name: 'Gorrela Sai Maneesh',
  shortName: 'Maneesh',
  title: 'AI/ML Systems Engineer & 3D Computational Architect',
  university: 'Lovely Professional University',
  degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
  graduationYear: '2027',
  email: 'gorrelasaimaneesh@gmail.com',
  github: 'https://github.com/maneesh-neural',
  linkedin: 'https://linkedin.com/in/sai-maneesh',
  cvPath: '/cv/Gorrela_Sai_Maneesh_CV.pdf',
} as const;

export const COLORS = {
  gold: '#EAB767',
  goldLight: '#F5D397',
  goldDark: '#B88737',
  bg: '#070B13',
  bgSecondary: '#0D1421',
  text: '#F5F2EB',
  textMuted: '#8993A5',
  cyan: '#00F0FF',
  blue: '#3B82F6',
} as const;

export const SECTIONS = [
  'home',
  'about',
  'projects',
  'casestudy',
  'expertise',
  'contact',
] as const;

export type SectionId = (typeof SECTIONS)[number];

export interface SectionMeta {
  id: SectionId;
  label: string;
  badge: string;
  description: string;
}

export const SECTION_METAS: Record<SectionId, SectionMeta> = {
  home: {
    id: 'home',
    label: 'Core',
    badge: 'SEC-01 // NEURAL CORE',
    description: '3D Neural Mesh Foundation & Hero Interface',
  },
  about: {
    id: 'about',
    label: 'Bio',
    badge: 'SEC-02 // BIOMETRIC SPEC',
    description: 'Engineering profile, academic credentials & philosophy',
  },
  projects: {
    id: 'projects',
    label: 'Systems',
    badge: 'SEC-03 // PRODUCTION REPO',
    description: 'Flagship AI, NLP, and Computer Vision deployments',
  },
  casestudy: {
    id: 'casestudy',
    label: 'Deep Dive',
    badge: 'SEC-04 // ARCH DIAGRAMS',
    description: 'Deep mathematical & structural system breakdowns',
  },
  expertise: {
    id: 'expertise',
    label: 'Matrix',
    badge: 'SEC-05 // SKILL VECTOR',
    description: 'Multidimensional engineering capabilities & proficiencies',
  },
  contact: {
    id: 'contact',
    label: 'Uplink',
    badge: 'SEC-06 // SECURE CHANNEL',
    description: 'Direct communications, credentials & resume transmission',
  },
};

export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  uProgressTarget: number;
}

export const CAMERA_PRESETS: Record<SectionId, CameraPreset> = {
  home: {
    position: [0, 0, 5.2],
    target: [0, 0, 0],
    fov: 45,
    uProgressTarget: 0.0,
  },
  about: {
    position: [-2.2, 0.4, 4.0],
    target: [0.8, 0, 0],
    fov: 42,
    uProgressTarget: 0.2,
  },
  projects: {
    position: [2.5, -0.6, 4.2],
    target: [-0.6, 0.1, 0],
    fov: 40,
    uProgressTarget: 0.45,
  },
  casestudy: {
    position: [0, 2.2, 4.8],
    target: [0, 0.2, 0],
    fov: 44,
    uProgressTarget: 0.65,
  },
  expertise: {
    position: [-1.8, -1.2, 3.8],
    target: [0.4, 0, 0],
    fov: 38,
    uProgressTarget: 0.85,
  },
  contact: {
    position: [0, 0, 3.5],
    target: [0, -0.1, 0],
    fov: 35,
    uProgressTarget: 1.0,
  },
};

export const GRAPHICS_CONFIG = {
  NODE_COUNT: 1600,
  CONNECTION_MAX_DISTANCE: 1.15,
  MAX_LINES: 3200,
  FALLBACK_PORTRAIT_SAMPLE_COUNT: 1200,
  LERP_SPEED: 0.05,
} as const;

