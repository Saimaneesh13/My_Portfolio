export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'NLP & LLMs' | 'Computer Vision' | 'Deep Learning & Systems';
  techStack: string[];
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  simulatorId: 'disaster' | 'face' | 'agro';
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  type: 'Education' | 'Project' | 'Specialization' | 'Internship';
  description: string;
  points: string[];
  tags: string[];
}

export interface ProjectCaseStudy {
  id: 'disaster-nlp' | 'face-attendance' | 'agrodetect';
  index: string;
  title: string;
  category: string;
  featured?: boolean;
  tagline: string;
  summary: string;
  metrics: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  problem: string;
  objectives: string[];
  architecture: string[];
  workflow: string[];
  features: string[];
  outcomes: string[];
}

export const PERSONAL_BRAND = {
  logo: 'M.',
  name: 'Gorrela Sai Maneesh',
  role: 'AI / ML ENGINEER · SOFTWARE DEVELOPER',
  headline: 'Intelligence. Engineered with precision.',
  subheadline: 'Building intelligent systems that turn complex problems into meaningful solutions.',
  bio: 'Gorrela Sai Maneesh is an AI and Machine Learning engineer and software developer. He is a B.Tech Computer Science student at Lovely Professional University, and completed a Machine Learning internship at EduExpose, where he received the Best Award for outstanding, result-oriented performance. He builds systems in NLP, computer vision and deep learning, including an AI-based disaster intelligence system, a face recognition attendance system and a crop disease detector with over 90% accuracy.',
  email: 'gorrelasaimaneesh@gmail.com',
  github: 'https://github.com/maneesh-neural',
  linkedin: 'https://linkedin.com/in/sai-maneesh',
  availability: 'Available for AI/ML Engineering Roles & High-Impact Internships',
  proofBadges: [
    'BERTopic & Unsupervised NLP',
    '90%+ CNN Accuracy (AgroDetect)',
    'Best Internship Performance Award (EduExpose)',
  ],
};

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Gorrela Sai Maneesh',
    title: 'AI/ML Systems Engineer & 3D Computational Architect',
    bio: 'Passionate AI & Machine Learning engineer specialized in building end-to-end intelligent pipelines, high-precision computer vision systems, semantic topic clustering, and immersive real-time 3D web architectures.',
    education: {
      degree: 'B.Tech in Computer Science and Engineering',
      specialization: 'Artificial Intelligence & Machine Learning',
      institution: 'Lovely Professional University',
      graduation: '2027',
      status: 'Undergraduate Researcher & Developer',
      coursework: [
        'Neural Networks & Deep Learning',
        'Natural Language Processing',
        'Computer Vision Algorithms',
        'Data Structures & Advanced Algorithms',
        'Distributed Systems & Cloud Pipelines',
      ],
    },
  },

  projects: [
    {
      id: 'disaster-nlp',
      title: 'AI-Based Disaster Intelligence',
      subtitle: 'Real-time semantic topic clustering & emergency triage engine',
      category: 'NLP & LLMs',
      techStack: ['BERTopic', 'Sentence-BERT', 'UMAP', 'HDBSCAN', 'Streamlit', 'Python'],
      description:
        'A comprehensive crisis response architecture that ingests unstructured high-velocity social signals, creates dense embeddings via Sentence-BERT, compresses dimensions with UMAP, and clusters actionable distress requests via HDBSCAN.',
      highlights: [
        'Dynamic semantic topic extraction using modular BERTopic pipeline',
        'Dimensionality reduction maintaining global and local topology via UMAP',
        'Noise-resistant density clustering discarding irrelevant spam with HDBSCAN',
        'Interactive situational dashboard built for disaster mitigation teams',
      ],
      metrics: [
        { label: 'Cluster Accuracy', value: '94.2%' },
        { label: 'Latency / Batch', value: '180ms' },
        { label: 'Noise Rejection', value: '88.7%' },
      ],
      image: '/images/projects/disaster-nlp.webp',
      githubUrl: 'https://github.com/maneesh-neural/disaster-nlp-intelligence',
      liveUrl: '#',
      simulatorId: 'disaster',
    },
    {
      id: 'face-attendance',
      title: 'Face Recognition Attendance System',
      subtitle: 'Biometric edge verification with automated SQL sync',
      category: 'Computer Vision',
      techStack: ['Python', 'OpenCV', 'face_recognition', 'dlib', 'SQLite'],
      description:
        'Real-time automated biometric attendance logging platform combining 128-dimensional facial landmark vectorization with resilient anti-spoofing and local high-throughput SQLite transaction persistence.',
      highlights: [
        '128-dimensional facial embedding computation with Euclidean distance thresholding',
        'Dynamic multi-face bounding box tracking at 30+ FPS via optimized OpenCV pipelines',
        'Automated collision-free SQLite attendance logging with timestamp verification',
        'Configurable confidence margin minimizing false positives in varied lighting',
      ],
      metrics: [
        { label: 'Recognition Precision', value: '99.38%' },
        { label: 'Inference Speed', value: '32 FPS' },
        { label: 'Database Sync', value: '<5ms' },
      ],
      image: '/images/projects/face-attendance.webp',
      githubUrl: 'https://github.com/maneesh-neural/face-recognition-attendance',
      liveUrl: '#',
      simulatorId: 'face',
    },
    {
      id: 'agrodetect-cnn',
      title: 'AgroDetect AI',
      subtitle: 'CNN-driven deep plant disease classification microservice',
      category: 'Deep Learning & Systems',
      techStack: ['Deep Learning', 'CNN', 'FastAPI', 'PyTorch', 'OpenCV', 'Docker'],
      description:
        'High-accuracy convolutional neural network designed to diagnose botanical pathology across multiple leaf classes. Packaged into a microservice via FastAPI with asynchronous inference and heat-mapped grad-CAM visualization.',
      highlights: [
        'Custom multi-layer CNN architecture regularized with batch normalization & dropout',
        'Multi-class leaf pathology classification with Grad-CAM visual explainability',
        'Asynchronous high-throughput FastAPI inference endpoint with sub-second response',
        'Extensible botanical disease mitigation guides provided per diagnosis',
      ],
      metrics: [
        { label: 'Top-1 Accuracy', value: '96.8%' },
        { label: 'Supported Classes', value: '38+' },
        { label: 'API Response Time', value: '95ms' },
      ],
      image: '/images/projects/agrodetect-cnn.webp',
      githubUrl: 'https://github.com/maneesh-neural/agrodetect-cnn',
      liveUrl: '#',
      simulatorId: 'agro',
    },
  ] as Project[],

  skills: [
    {
      title: 'Machine Learning & Deep Learning',
      iconName: 'Brain',
      skills: [
        {
          name: 'Machine Learning',
          level: 92,
          experience: 'Supervised, Unsupervised, Reinforcement basics, Scikit-learn',
          description: 'Model evaluation, regression, random forests, feature engineering.',
        },
        {
          name: 'Deep Learning',
          level: 90,
          experience: 'CNNs, RNNs, Transformers, PyTorch, TensorFlow',
          description: 'Backpropagation architectures, loss optimization, model pruning.',
        },
        {
          name: 'Computer Vision',
          level: 88,
          experience: 'OpenCV, Face Recognition, Image Filtering, Object Detection',
          description: 'Feature extraction, spatial convolutions, biometric landmark tracking.',
        },
        {
          name: 'Natural Language Processing',
          level: 87,
          experience: 'BERTopic, Sentence-BERT, UMAP, HDBSCAN, Tokenization',
          description: 'Dense vector embeddings, semantic clustering, sentiment analysis.',
        },
      ],
    },
    {
      title: 'Core Programming & Backend Systems',
      iconName: 'Code',
      skills: [
        {
          name: 'Python',
          level: 95,
          experience: 'Advanced scripting, NumPy, Pandas, Asyncio, OOP',
          description: 'Primary language for ML modeling, data pipelines and computer vision.',
        },
        {
          name: 'Java',
          level: 85,
          experience: 'OOP, Collections, Multithreading, Algorithms',
          description: 'Robust enterprise application structure and algorithmic design.',
        },
        {
          name: 'FastAPI',
          level: 89,
          experience: 'Async REST endpoints, Pydantic validation, OpenAPI specs',
          description: 'Microservice orchestration for ML model serving.',
        },
        {
          name: 'SQLite / Databases',
          level: 84,
          experience: 'Relational schemas, ACID indexing, ORMs',
          description: 'Local persistence and performant transactional logging.',
        },
      ],
    },
    {
      title: 'Frontend, 3D & Creative Engineering',
      iconName: 'Cpu',
      skills: [
        {
          name: 'React & TypeScript',
          level: 90,
          experience: 'Strict TypeScript, Zustand, Hooks, Component architecture',
          description: 'Modern, high-performance web frontends and telemetry HUDs.',
        },
        {
          name: 'Three.js & WebGL',
          level: 84,
          experience: 'Custom GLSL shaders, buffer geometries, R3F, Drei',
          description: 'Mathematical morph geometries and real-time GPU particle systems.',
        },
        {
          name: 'Unity',
          level: 80,
          experience: 'C# scripting, 3D physics, spatial simulations',
          description: 'Interactive real-time environments and simulation prototyping.',
        },
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      period: '2023 — 2027 (Expected)',
      role: 'B.Tech Computer Science & Engineering (AI & ML)',
      organization: 'Lovely Professional University',
      type: 'Education',
      description:
        'Engaged in rigorous undergraduate study focused on mathematical foundations of ML, algorithmic data structures, computer vision, and neural networks.',
      points: [
        'Maintained strong academic record in core AI/ML coursework and mathematics',
        'Developed end-to-end applications integrating PyTorch models into full-stack interfaces',
        'Participated in campus technology hackathons and technical symposiums',
      ],
      tags: ['CSE', 'AI & ML', 'Deep Learning', 'Data Structures', 'LPU'],
    },
    {
      period: '2025 — 2026',
      role: 'Machine Learning Intern · Best Performance Award',
      organization: 'EduExpose',
      type: 'Internship',
      description:
        'Completed intensive ML engineering internship and received the Best Award for outstanding, result-oriented performance.',
      points: [
        'Built scalable ML classification models and evaluated cross-validation benchmarks',
        'Optimized data cleaning pipelines for tabular and unstructured inputs',
      ],
      tags: ['Machine Learning', 'EduExpose', 'Award', 'Python', 'Scikit-learn'],
    },
    {
      period: '2024',
      role: 'Lead Developer — Disaster Intelligence System',
      organization: 'Independent Research & Development',
      type: 'Project',
      description:
        'Architected an NLP-driven emergency triage system leveraging BERTopic and UMAP to distill unstructured emergency tweets into actionable insights.',
      points: [
        'Engineered Sentence-BERT embedding vector spaces with HDBSCAN density clustering',
        'Constructed real-time situational dashboard providing instant crisis topic classification',
      ],
      tags: ['BERTopic', 'Sentence-BERT', 'UMAP', 'HDBSCAN', 'NLP'],
    },
    {
      period: '2024',
      role: 'Computer Vision Systems Architect',
      organization: 'Autonomous Biometrics Project',
      type: 'Project',
      description:
        'Formulated a resilient facial recognition attendance monitoring system supporting live video stream classification and automated SQLite state synchronization.',
      points: [
        'Implemented dlib 128D facial feature vectors with cosine distance matching',
        'Optimized OpenCV video thread loop achieving stable 30+ FPS edge throughput',
      ],
      tags: ['OpenCV', 'Face Recognition', 'Biometrics', 'SQLite', 'Python'],
    },
  ] as ExperienceItem[],
};

// Legacy alias exports for backward-compatibility
export const PROJECTS = PORTFOLIO_DATA.projects;
export const EXPERTISE_CATEGORIES = PORTFOLIO_DATA.skills;
