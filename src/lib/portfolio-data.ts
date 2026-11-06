export interface ProjectCaseStudy {
  id: 'disaster-nlp' | 'face-attendance' | 'agrodetect'
  index: string
  title: string
  category: string
  featured?: boolean
  tagline: string
  summary: string
  metrics: string
  tags: string[]
  githubUrl: string
  liveUrl: string
  problem: string
  objectives: string[]
  architecture: string[]
  workflow: string[]
  features: string[]
  outcomes: string[]
}

export const PERSONAL_BRAND = {
  logo: 'M.',
  name: 'Gorrela Sai Maneesh',
  role: 'AI / ML ENGINEER · SOFTWARE DEVELOPER',
  headline: 'Intelligence. Engineered with precision.',
  subheadline: 'Building intelligent systems that turn complex problems into meaningful solutions.',
  bio: 'Gorrela Sai Maneesh is an AI and Machine Learning engineer and software developer. He is a B.Tech Computer Science student at Lovely Professional University, and completed a Machine Learning internship at EduExpose, where he received the Best Award for outstanding, result-oriented performance. He builds systems in NLP, computer vision and deep learning, including an AI-based disaster intelligence system, a face recognition attendance system and a crop disease detector with over 90% accuracy.',
  email: 'maneesh@ai-portfolio.dev',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  availability: 'Available for AI/ML Engineering Roles & High-Impact Internships',
  proofBadges: [
    'BERTopic & Unsupervised NLP',
    '90%+ CNN Accuracy (AgroDetect)',
    'Best Internship Performance Award (EduExpose)',
  ],
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'disaster-nlp',
    index: '01',
    title: 'AI-Based Disaster Intelligence System',
    category: 'Unsupervised NLP & Crisis Triage',
    featured: true,
    tagline: 'Unsupervised topic discovery and real-time urgency classification for crisis response.',
    summary: 'Extracts actionable intelligence from noisy, unlabeled emergency feeds using transformer embeddings, UMAP dimensionality reduction, HDBSCAN clustering, and BERTopic.',
    metrics: 'Zero-Shot Topic Discovery · Real-Time Urgency Triage',
    tags: ['Unsupervised NLP', 'BERTopic', 'LDA', 'UMAP', 'HDBSCAN', 'Python', 'Plotly'],
    githubUrl: 'https://github.com/',
    liveUrl: '#case-study',
    problem: 'During natural disasters, emergency response teams are overwhelmed by thousands of unstructured social media posts and distress messages. Manual triage is too slow, and supervised models fail when encountering unseen crisis types.',
    objectives: [
      'Discover evolving crisis themes automatically without pre-labeled training sets.',
      'Compress high-dimensional semantic embeddings while preserving local cluster structure.',
      'Classify distress reports into actionable urgency tiers (CRITICAL, HIGH, MODERATE).',
    ],
    architecture: [
      'Data Ingestion',
      'Text Preprocessing',
      'Sentence Embeddings',
      'UMAP Projection',
      'HDBSCAN Clustering',
      'BERTopic + Urgency Triage',
      'Interactive Visualization',
    ],
    workflow: [
      'Ingest raw crisis streams and strip URLs, noise tokens, and duplicate retweets.',
      'Generate dense semantic vectors using pre-trained transformer sentence embeddings.',
      'Reduce embedding dimensionality via UMAP and group dense regions with HDBSCAN.',
      'Extract coherent c-TF-IDF topic representations with BERTopic and score urgency.',
    ],
    features: [
      'Dynamic topic modeling comparing BERTopic against baseline LDA.',
      'Noise-aware density clustering via HDBSCAN that isolates outlier spam.',
      'Interactive 2D UMAP cluster maps and urgency heatmaps built with Plotly.',
    ],
    outcomes: [
      'Successfully separated critical rescue requests from general news chatter without labeled supervision.',
      'Demonstrated superior topic coherence scores on short crisis texts using BERTopic over LDA.',
    ],
  },
  {
    id: 'face-attendance',
    index: '02',
    title: 'Face Recognition Attendance System',
    category: 'Computer Vision & Full-Stack Automation',
    featured: false,
    tagline: 'Real-time biometric face verification pipeline backed by Flask and SQLite.',
    summary: 'Automates classroom and workplace attendance logging by detecting faces in live video streams, computing 128-D facial encodings, and writing verified timestamps to SQLite.',
    metrics: 'Sub-100ms Frame Matching · Automated SQLite Audit Logs',
    tags: ['OpenCV', 'Flask', 'SQLite', 'Python', 'Real-time Recognition'],
    githubUrl: 'https://github.com/',
    liveUrl: '#case-study',
    problem: 'Manual roll calls and RFID cards are slow and prone to proxy attendance. Organizations need a contactless, real-time biometric verification pipeline that runs reliably on standard hardware.',
    objectives: [
      'Detect and align multiple faces in real-time webcam streams using OpenCV.',
      'Match facial feature encodings against registered profiles with minimal latency.',
      'Persist deduplicated attendance records with timestamps in a relational SQLite database.',
    ],
    architecture: [
      'Video Capture (OpenCV)',
      'Face Detection & Alignment',
      '128-D Feature Encoding',
      'Euclidean Distance Matcher',
      'Flask Backend API',
      'SQLite Attendance Ledger',
    ],
    workflow: [
      'Capture frames via OpenCV video stream and convert to normalized RGB.',
      'Localize facial bounding boxes and extract 128-dimensional biometric embeddings.',
      'Compare live vectors against stored embeddings within a strict tolerance threshold.',
      'Trigger Flask endpoint to log verified user ID, confidence score, and timestamp into SQLite.',
    ],
    features: [
      'Real-time bounding box overlay with live identity and confidence telemetry.',
      'Automatic duplicate-entry prevention within configurable session windows.',
      'Flask dashboard for exporting daily attendance reports in CSV/SQLite formats.',
    ],
    outcomes: [
      'Achieved smooth real-time recognition on standard CPU webcams.',
      'Eliminated manual attendance overhead with 100% automated SQLite persistence.',
    ],
  },
  {
    id: 'agrodetect',
    index: '03',
    title: 'AgroDetect AI',
    category: 'Deep Learning & Smart Agriculture',
    featured: false,
    tagline: 'Convolutional Neural Network for plant pathology detection served via FastAPI.',
    summary: 'Diagnoses crop leaf diseases from field imagery with over 90% validation accuracy using a custom TensorFlow/Keras CNN architecture deployed behind an asynchronous FastAPI service.',
    metrics: '90%+ Validation Accuracy · FastAPI Low-Latency Inference',
    tags: ['CNN', 'TensorFlow', 'Keras', 'FastAPI', 'Python', 'NumPy'],
    githubUrl: 'https://github.com/',
    liveUrl: '#case-study',
    problem: 'Crop diseases cause severe agricultural yield loss when identified late. Farmers often lack immediate access to plant pathologists for accurate early-stage visual diagnosis.',
    objectives: [
      'Train a deep Convolutional Neural Network capable of distinguishing healthy and diseased foliage.',
      'Achieve over 90% classification accuracy across multiple plant pathology classes.',
      'Expose the trained Keras model via a production-grade FastAPI REST endpoint.',
    ],
    architecture: [
      'Leaf Image Input',
      'Resize & Tensor Normalization',
      'Conv2D + MaxPooling Blocks',
      'Dense + Dropout Regularization',
      'Softmax Probability Head',
      'FastAPI JSON Response',
    ],
    workflow: [
      'Apply image augmentation (rotations, flips, zoom) to prevent overfitting on leaf datasets.',
      'Pass normalized 224x224 RGB tensors through stacked Conv2D, BatchNorm, and MaxPooling layers.',
      'Compute class probabilities via Softmax and return top prediction with confidence.',
      'Serve predictions through FastAPI with automated Swagger OpenAPI documentation.',
    ],
    features: [
      'Custom TensorFlow/Keras CNN architecture tuned for foliar lesion textures.',
      ' High-throughput FastAPI inference endpoint with strict payload validation.',
      'Actionable pathology output pairing disease classification with confidence metrics.',
    ],
    outcomes: [
      'Surpassed 90%+ classification accuracy on held-out validation leaf imagery.',
      'Delivered sub-second REST API inference responses ready for mobile or web integration.',
    ],
  },
]

export const CREATIVE_EXPERIMENT = {
  title: 'Golden Core Morph Engine',
  category: 'Creative WebGL Experiment',
  description: 'Custom GLSL curl-noise vertex shader and 24×24 spatial bucket mapper that transitions 26,000+ procedural neural core wire segments into a tear-free 3D wireframe portrait.',
  tags: ['Three.js', 'GLSL Shaders', 'Spatial Hashing', 'UnrealBloom'],
}

export interface ExpertiseCategory {
  title: string
  description: string
  skills: string[]
  linkedProjectId: ProjectCaseStudy['id']
  linkedProjectName: string
}

export const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    title: 'Programming',
    description: 'Core languages for algorithmic problem solving, object-oriented systems, and relational querying.',
    skills: ['Python', 'Java', 'SQL'],
    linkedProjectId: 'face-attendance',
    linkedProjectName: 'Face Recognition Attendance',
  },
  {
    title: 'AI / ML',
    description: 'End-to-end model training, deep neural network design, and statistical evaluation pipelines.',
    skills: ['Scikit-learn', 'TensorFlow', 'Keras'],
    linkedProjectId: 'agrodetect',
    linkedProjectName: 'AgroDetect AI',
  },
  {
    title: 'NLP',
    description: 'Unsupervised topic modeling, semantic vector projection, and density-based clustering.',
    skills: ['BERTopic', 'LDA', 'UMAP', 'HDBSCAN'],
    linkedProjectId: 'disaster-nlp',
    linkedProjectName: 'Disaster Intelligence System',
  },
  {
    title: 'Computer Vision',
    description: 'Real-time video stream processing, spatial filtering, and biometric feature extraction.',
    skills: ['OpenCV'],
    linkedProjectId: 'face-attendance',
    linkedProjectName: 'Face Recognition Attendance',
  },
  {
    title: 'Backend',
    description: 'High-performance asynchronous REST APIs and model-serving microservices.',
    skills: ['Flask', 'FastAPI', 'REST APIs'],
    linkedProjectId: 'agrodetect',
    linkedProjectName: 'AgroDetect AI',
  },
  {
    title: 'Data & Visualization',
    description: 'Numerical computing, dataframe engineering, and interactive analytical dashboards.',
    skills: ['Pandas', 'NumPy', 'Plotly', 'Streamlit'],
    linkedProjectId: 'disaster-nlp',
    linkedProjectName: 'Disaster Intelligence System',
  },
]

export const TIMELINE = [
  {
    year: '2023',
    title: 'Started B.Tech in Computer Science & Engineering',
    organization: 'Lovely Professional University',
    detail: 'Focused on core computer science, data structures, algorithms, and artificial intelligence foundations.',
  },
  {
    year: '2025–26',
    title: 'Machine Learning Internship · Best Performance Award',
    organization: 'EduExpose',
    detail: 'Completed intensive ML engineering internship and received the Best Award for outstanding, result-oriented performance.',
  },
  {
    year: '2026',
    title: 'Engineered Production AI/ML Systems',
    organization: 'Research & Portfolio Projects',
    detail: 'Built the AI-Based Disaster Intelligence System (BERTopic/UMAP), AgroDetect AI (90%+ CNN), and Face Recognition Attendance System.',
  },
  {
    year: '2027',
    title: 'Expected B.Tech CSE Graduation',
    organization: 'Lovely Professional University',
    detail: 'Specializing in scalable Machine Learning, NLP, and Computer Vision architectures.',
  },
]
