export interface ProjectItem {
  id: string
  index: string
  title: string
  subtitle: string
  period: string
  category: 'NLP' | 'Computer Vision' | 'Deep Learning' | 'Full-Stack'
  featured?: boolean
  tagline: string
  problem: string
  objectives: string[]
  workflow: string[]
  features: string[]
  outcomes: string[]
  tags: string[]
  metrics: { value: string; label: string }[]
  githubUrl: string
  liveUrl: string
}

export interface CertificateItem {
  id: string
  title: string
  issuer: string
  date: string
  category: 'Specialization' | 'Internship & Training' | 'AI & GenAI' | 'Software & CS' | 'Leadership'
  badgeText: string
  subCourses?: string[]
  credentialId: string
  verifyUrl: string
}

export const PROFILE_DATA = {
  name: 'Gorrela Sai Maneesh',
  role: 'AI / ML Engineer',
  subRoles: ['Software Developer', 'Computer Vision', 'NLP'],
  email: 'ssai68352@gmail.com',
  phone: '+91 6281433838',
  linkedin: 'https://linkedin.com/in/sai-maneesh',
  linkedinLabel: 'linkedin.com/in/sai-maneesh',
  github: 'https://github.com/Saimaneesh13',
  githubLabel: 'github.com/Saimaneesh13',
  location: 'Punjab, India',
  bio: 'I build intelligent systems that transform complex real-world problems into meaningful solutions, with a focus on Machine Learning, Computer Vision, and Natural Language Processing.',
}

export const PERSONAL_BRAND = {
  logo: 'M.',
  name: PROFILE_DATA.name,
  role: 'AI / ML ENGINEER · SOFTWARE DEVELOPER',
  headline: 'Intelligence. Engineered with precision.',
  subheadline: 'Building intelligent systems that turn complex problems into meaningful solutions.',
  bio: PROFILE_DATA.bio,
  email: PROFILE_DATA.email,
  github: PROFILE_DATA.github,
  linkedin: PROFILE_DATA.linkedin,
  phone: PROFILE_DATA.phone,
  availability: 'Available for AI/ML Engineering Roles & High-Impact Internships',
  proofBadges: [
    'BERTopic & Unsupervised NLP',
    '90%+ CNN Accuracy (AgroDetect)',
    'Best Internship Performance Award (EduExpose)',
  ],
}

export const INTERNSHIP_DATA = {
  company: 'EduExpose',
  accreditation: 'AICTE Certified · ISO 9001:2015 Company',
  role: 'Machine Learning Intern',
  period: 'Dec 15, 2025 – Feb 15, 2026',
  issuedDate: 'Feb 28, 2026',
  award: 'Best Internship & Training Performance Award',
  quote:
    '"Found sincere, hardworking, dedicated and result oriented... strong commitment to learning with a commendable understanding of the Machine Learning program."',
  bullets: [
    'Completed an intensive applied Machine Learning internship and training program (Dec 15, 2025 – Feb 15, 2026) covering the full model lifecycle: development, evaluation, and optimization on real-world datasets.',
    'Implemented and compared supervised and unsupervised algorithms for predictive modeling and pattern discovery tasks.',
    'Practiced feature engineering, cross-validation, and hyperparameter tuning to improve model performance using Python and standard ML frameworks.',
  ],
  certificates: [
    {
      title: 'Certificate of Internship',
      badge: '★ Best Award',
      date: 'Feb 28, 2026',
      fileUrl: '/certificates/Internship_certificate.pdf',
    },
    {
      title: 'Certificate of Training',
      badge: '★ Best Award',
      date: 'Feb 28, 2026',
      fileUrl: '/certificates/Training_certificate.pdf',
    },
    {
      title: 'Certificate of Participation',
      badge: '★ Best Award',
      date: 'Feb 28, 2026',
      fileUrl: '/certificates/Participation_certificate.pdf',
    },
  ],
  skillsUsed: [
    'Python',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'Supervised & Unsupervised ML',
    'Feature Engineering',
    'Cross-Validation',
    'Hyperparameter Tuning',
  ],
}

export const EDUCATION_DATA = [
  {
    institution: 'Lovely Professional University',
    degree: 'Bachelor of Technology – Computer Science and Engineering (AI & ML)',
    location: 'Punjab, India',
    period: 'Aug 2023 – Present',
    highlight: 'Specialization in Artificial Intelligence & Machine Learning (Expected Graduation: 2027)',
  },
  {
    institution: 'Narayana Junior College',
    degree: 'Intermediate – PCM (Physics, Chemistry, Mathematics)',
    location: 'Bhimavaram, Andhra Pradesh',
    period: 'Apr 2021 – Mar 2023',
    highlight: 'Strong foundation in Mathematics, Physics, and Analytical Problem Solving',
  },
]

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'eduexpose-ml-internship',
    title: 'Certificate of Internship — Machine Learning (Best Award)',
    issuer: 'EduExpose (AICTE Certified · ISO 9001:2015)',
    date: 'Feb 2026',
    category: 'Internship & Training',
    badgeText: '★ Best Award · Internship',
    subCourses: [
      'Program Period: Dec 15, 2025 – Feb 15, 2026',
      'Recognized as Sincere, Hardworking, Dedicated & Result-Oriented',
    ],
    credentialId: 'AICTE / ISO 9001:2015 Verified (Issued Feb 28, 2026)',
    verifyUrl: '/certificates/Internship_certificate.pdf',
  },
  {
    id: 'eduexpose-ml-training',
    title: 'Certificate of Training — Machine Learning (Best Award)',
    issuer: 'EduExpose (AICTE Certified · ISO 9001:2015)',
    date: 'Feb 2026',
    category: 'Internship & Training',
    badgeText: '★ Best Award · Training',
    subCourses: [
      'Program Period: Dec 15, 2025 – Feb 15, 2026',
      'Commendable Understanding of Applied Machine Learning',
    ],
    credentialId: 'AICTE / ISO 9001:2015 Verified (Issued Feb 28, 2026)',
    verifyUrl: '/certificates/Training_certificate.pdf',
  },
  {
    id: 'eduexpose-ml-participation',
    title: 'Certificate of Participation — Machine Learning (Best Award)',
    issuer: 'EduExpose (AICTE Certified · ISO 9001:2015)',
    date: 'Feb 2026',
    category: 'Internship & Training',
    badgeText: '★ Best Award · Participation',
    subCourses: [
      'Program Period: Dec 15, 2025 – Feb 15, 2026',
      'Recognized as Sincere, Hardworking, Dedicated & Result-Oriented',
    ],
    credentialId: 'AICTE / ISO 9001:2015 Verified (Issued Feb 28, 2026)',
    verifyUrl: '/certificates/Participation_certificate.pdf',
  },
  {
    id: 'uccs-cpp-unreal',
    title: 'C++ Programming for Unreal Game Development',
    issuer: 'University of Colorado, Colorado Springs (Coursera)',
    date: 'Aug 2026',
    category: 'Specialization',
    badgeText: '4-Course Specialization',
    subCourses: [
      'Introduction to C++ Programming and Unreal',
      'More C++ Programming and Unreal',
      'C++ Class Development',
      'Intermediate Object-Oriented Programming for Unreal Games',
    ],
    credentialId: '6CKH9NBP3Y44',
    verifyUrl: 'https://coursera.org/verify/specialization/6CKH9NBP3Y44',
  },
  {
    id: 'uccs-comp-comm',
    title: 'Computer Communications Specialization',
    issuer: 'University of Colorado, Colorado Springs (Coursera)',
    date: 'Nov 2024',
    category: 'Specialization',
    badgeText: '4-Course Specialization',
    subCourses: [
      'Fundamentals of Network Communication',
      'Peer-to-Peer Protocols and Local Area Networks',
      'Packet Switching Networks and Algorithms',
      'TCP/IP and Advanced Topics',
    ],
    credentialId: '5R8NT46SNG9B',
    verifyUrl: 'https://coursera.org/verify/specialization/5R8NT46SNG9B',
  },
  {
    id: 'rice-leadership',
    title: 'Interpersonal Communication for Engineering Leaders',
    issuer: 'Rice University (Coursera)',
    date: 'Apr 2026',
    category: 'Leadership',
    badgeText: 'Engineering Leadership',
    credentialId: 'UJH6O27C31UN',
    verifyUrl: 'https://coursera.org/verify/UJH6O27C31UN',
  },
  {
    id: 'infosys-automata',
    title: 'Computational Theory: Language Principle & Finite Automata Theory',
    issuer: 'Infosys Springboard',
    date: 'Aug 2025',
    category: 'Software & CS',
    badgeText: 'Core CS Theory',
    credentialId: '1-7330e47a-95d0-4a8d-9c72-15ef019a783d',
    verifyUrl: 'https://verify.onwingspan.com',
  },
  {
    id: 'lpu-java-maestro',
    title: 'Java Maestro: Hands-On Training on Developing GUI Applications',
    issuer: 'Lovely Professional University (CPE)',
    date: 'Aug 2025',
    category: 'Software & CS',
    badgeText: 'JavaFX / GUI Training',
    credentialId: 'Cert No. 409887',
    verifyUrl: 'https://www.lpu.in',
  },
  {
    id: 'udemy-master-genai',
    title: 'Master Generative AI & Generative AI Tools (ChatGPT & more)',
    issuer: 'Udemy (14 Hours Intensive)',
    date: 'Aug 2025',
    category: 'AI & GenAI',
    badgeText: 'Generative AI',
    credentialId: 'UC-10bcfe4c-c8bf-486d-8cf2-a54f6d8d292a',
    verifyUrl: 'https://ude.my/UC-10bcfe4c-c8bf-486d-8cf2-a54f6d8d292a',
  },
  {
    id: 'udemy-nocode-genai',
    title: 'Build Generative AI Apps and Solutions with No-Code Tools',
    issuer: 'Udemy (5.5 Hours)',
    date: 'Aug 2025',
    category: 'AI & GenAI',
    badgeText: 'GenAI Apps',
    credentialId: 'UC-cb359704-b772-4602-b7c9-ae2f554b81d5',
    verifyUrl: 'https://ude.my/UC-cb359704-b772-4602-b7c9-ae2f554b81d5',
  },
  {
    id: 'udemy-chatgpt-essentials',
    title: 'ChatGPT Made Easy: AI Essentials for Beginners',
    issuer: 'Udemy',
    date: 'Aug 2025',
    category: 'AI & GenAI',
    badgeText: 'AI Essentials',
    credentialId: 'UC-770a75f9-d468-4079-81e9-f81c18afb742',
    verifyUrl: 'https://ude.my/UC-770a75f9-d468-4079-81e9-f81c18afb742',
  },
  {
    id: 'cu-network-fundamentals',
    title: 'Fundamentals of Network Communication',
    issuer: 'University of Colorado System (Coursera)',
    date: 'Sep 2024',
    category: 'Software & CS',
    badgeText: 'TCP/IP & Networks',
    credentialId: 'AD15N8E9TIPG',
    verifyUrl: 'https://coursera.org/verify/AD15N8E9TIPG',
  },
]

export const PROJECTS: ProjectItem[] = [
  {
    id: 'disaster-nlp',
    index: '01',
    title: 'AI-Based Disaster Intelligence System',
    subtitle: 'Unsupervised NLP Topic Discovery & Urgency Classification',
    period: 'Apr 2026 – May 2026',
    category: 'NLP',
    featured: true,
    tagline:
      'Hybrid BERTopic + LDA crisis intelligence pipeline with Sentence-Transformers, UMAP, HDBSCAN, FAISS, FastAPI, and Streamlit.',
    problem:
      'Emergency response centers are flooded with unstructured crisis messages during disasters. Traditional keyword filters fail to discover emerging hazard categories or prioritize life-critical dispatches without pre-labeled training data.',
    objectives: [
      'Discover latent disaster topics automatically from unstructured crisis feeds using a hybrid BERTopic + LDA pipeline.',
      'Combine Sentence-Transformer semantic embeddings with UMAP dimensionality reduction, HDBSCAN density clustering, and FAISS vector search.',
      'Expose real-time urgency classification via a FastAPI service and an interactive Streamlit + Plotly analytics dashboard.',
    ],
    workflow: [
      'Ingest and preprocess unstructured crisis text streams using Python, spaCy, and Pandas.',
      'Generate dense semantic vectors via Sentence-Transformers and index with FAISS for rapid similarity lookup.',
      'Reduce manifold dimensionality with UMAP and group noise-resilient clusters via HDBSCAN.',
      'Extract interpretable disaster topics using hybrid BERTopic + LDA modeling and score report severity via the urgency engine.',
    ],
    features: [
      'Hybrid BERTopic + LDA Unsupervised Topic Discovery with UMAP & HDBSCAN.',
      'Real-Time Urgency Intelligence Engine classifying reports into Critical, High, and Informational tiers.',
      'Interactive Streamlit + Plotly visual analytics dashboard backed by a programmatic FastAPI inference service.',
    ],
    outcomes: [
      'Processed 81,187+ unstructured disaster tweets into 20 coherent crisis topics without manual labels.',
      'Enabled faster triage of high-impact emergency events with automated 3-tier severity prioritization.',
    ],
    tags: [
      'Python',
      'BERTopic',
      'LDA',
      'spaCy',
      'Sentence-Transformers',
      'UMAP',
      'HDBSCAN',
      'FAISS',
      'Streamlit',
      'FastAPI',
      'Plotly',
      'Pandas',
    ],
    metrics: [
      { value: '81K+', label: 'Tweets Processed' },
      { value: '20', label: 'Disaster Topics' },
      { value: 'Real-time', label: 'Urgency Triage' },
    ],
    githubUrl: 'https://github.com/Saimaneesh13',
    liveUrl: 'https://aegis-command.streamlit.app/',
  },
  {
    id: 'face-attendance',
    index: '02',
    title: 'Face Recognition Attendance System',
    subtitle: 'Real-Time Computer Vision Attendance Automation',
    period: 'Feb 2026 – Mar 2026',
    category: 'Computer Vision',
    featured: true,
    tagline:
      'Real-time webcam face detection and 128-D biometric encoding matcher built with Flask, OpenCV, face_recognition, SQLite, and Bootstrap 5.',
    problem:
      'Manual attendance logging is slow and vulnerable to proxy check-ins. Institutions need a reliable, automated biometric camera pipeline with persistent audit logs and live monitoring.',
    objectives: [
      'Detect and match faces in real time from live webcam feeds using OpenCV and the face_recognition library.',
      'Implement student registration with persisted 128-D face-encoding storage and automated SQLite logging.',
      'Build a responsive Bootstrap 5 + Flask live dashboard for attendance monitoring and history review.',
    ],
    workflow: [
      'Capture live RGB video frames via OpenCV and optimize image-processing thresholds for lighting invariance.',
      'Extract 128-D facial biometric encodings using the face_recognition library and NumPy vector operations.',
      'Match live encodings against registered student profiles using Euclidean distance thresholds.',
      'Log verified attendance records (name, ID, department, date, time, confidence score) into SQLite and stream to the Flask + Bootstrap 5 portal.',
    ],
    features: [
      'Student registration workflow with persisted 128-D biometric face-encoding storage.',
      'Automated SQLite attendance ledger capturing Name, ID, Department, Date, Time, and Confidence Score.',
      'Bootstrap 5 live administrative dashboard for real-time monitoring and historical audit review.',
    ],
    outcomes: [
      'Eliminated manual roll-call overhead with real-time webcam identification and sub-100ms matching latency.',
      'Improved attendance reliability through optimized image-processing and strict identification thresholds.',
    ],
    tags: [
      'Python',
      'Flask',
      'OpenCV',
      'face_recognition',
      'NumPy',
      'SQLite',
      'Bootstrap 5',
    ],
    metrics: [
      { value: '128-D', label: 'Face Encoding' },
      { value: 'SQLite', label: 'Automated Ledger' },
      { value: 'Live', label: 'Bootstrap 5 Portal' },
    ],
    githubUrl: 'https://github.com/Saimaneesh13',
    liveUrl: 'https://facerecognitionattendance-9rc8.onrender.com/',
  },
  {
    id: 'agrodetect',
    index: '03',
    title: 'AgroDetect AI',
    subtitle: 'CNN-Based Crop Disease Detection System',
    period: 'Jan 2026 – Feb 2026',
    category: 'Deep Learning',
    featured: true,
    tagline:
      'Deep TensorFlow/Keras Convolutional Neural Network achieving 90%+ foliar disease classification accuracy, served via FastAPI and Streamlit.',
    problem:
      'Crop diseases cause severe agricultural yield loss when diagnosed late. Farmers and agronomists need rapid, high-accuracy leaf pathology classification accessible via web and API endpoints.',
    objectives: [
      'Develop and train a multi-class Convolutional Neural Network (CNN) using TensorFlow and Keras achieving 90%+ accuracy.',
      'Apply data preprocessing, augmentation, and feature-engineering pipelines with Scikit-learn and Pandas to prevent overfitting.',
      'Expose model inference through a FastAPI backend paired with an interactive Streamlit interface for rapid testing.',
    ],
    workflow: [
      'Curate plant-leaf image datasets and apply OpenCV, Pandas, and Scikit-learn preprocessing & augmentation pipelines.',
      'Train deep Conv2D, MaxPooling, BatchNormalization, and Dropout layers in TensorFlow/Keras.',
      'Validate generalization performance across foliar disease classes to exceed 90%+ classification accuracy.',
      'Serve the serialized Keras model behind an asynchronous FastAPI REST endpoint with a Streamlit frontend.',
    ],
    features: [
      'Custom TensorFlow/Keras CNN architecture with 90%+ validation accuracy on plant-leaf imagery.',
      'Overfitting-resistant Scikit-learn + Pandas data augmentation and preprocessing pipeline.',
      'Dual deployment architecture: FastAPI programmatic backend + Streamlit interactive diagnostic UI.',
    ],
    outcomes: [
      'Achieved 90%+ classification accuracy across healthy and diseased crop foliage categories.',
      'Delivered instant, end-to-end pathology diagnosis from raw leaf upload to JSON confidence telemetry.',
    ],
    tags: [
      'Python',
      'TensorFlow',
      'Keras',
      'Scikit-learn',
      'OpenCV',
      'FastAPI',
      'Streamlit',
      'Pandas',
      'NumPy',
    ],
    metrics: [
      { value: '90%+', label: 'CNN Accuracy' },
      { value: 'FastAPI', label: 'Inference Backend' },
      { value: 'Streamlit', label: 'Diagnostic UI' },
    ],
    githubUrl: 'https://github.com/Saimaneesh13',
    liveUrl: 'https://agrodetectai.streamlit.app/',
  },
]