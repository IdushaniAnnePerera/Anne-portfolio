import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code,
  Terminal,
  Database,
  Cloud,
  Cpu,
  Globe,
  Server,
  Layout,
  Smartphone,
  Layers,
  Box
} from 'lucide-react';

export const profile = {
  name: "Anne Perera",
  role: "Computer Science Undergraduate | AI & Full-Stack Developer",
  summary: "BSc (Hons) Computer Science student at University of Kelaniya, Sri Lanka. Passionate about AI/ML research, full-stack development, and building production-grade systems across web, mobile, and data pipelines.",
  hero: {
    eyebrow: "AI/ML • Full-Stack • Research",
    headline: "Anne Perera",
    summary:
      "I build intelligent systems — from GNN-based research to production full-stack apps and ML pipelines.",
    primaryCta: {
      label: "View Projects",
      href: "#projects",
    },
    secondaryCta: {
      label: "Contact Me",
      href: "#contact",
    },
  },
  location: "Gampaha, Sri Lanka",
  email: "anneperera008@gmail.com",
  phone: "+94 776999545",
  social: {
    github: "https://github.com/IdushaniAnnePerera",
    linkedin: "https://www.linkedin.com/in/anne-perera-b62171359",
  },
  image: "/assets/anne.jpg",
  cv: "/assets/anne-cv.pdf"
};

export const skills = {
  "Languages": {
    icon: Code,
    items: ["Java", "Python", "C/C++/C#", "SQL", "PL/SQL", "TypeScript", "JavaScript", "HTML/CSS/PHP", "Prolog"]
  },
  "Frontend Development": {
    icon: Layout,
    items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Bootstrap"]
  },
  "Backend Development": {
    icon: Server,
    items: ["Spring Boot", "Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"]
  },
  "Database Technologies": {
    icon: Database,
    items: ["MySQL", "MongoDB", "SQL Server", "Oracle", "SQLite"]
  },
  "AI and Data Science": {
    icon: Cpu,
    items: ["PyTorch", "LangChain", "Natural Language Processing (NLP)", "Sentiment Analysis", "Machine Learning"]
  },
  "Cloud and DevOps": {
    icon: Cloud,
    items: ["AWS", "Docker", "Vercel"]
  }
};

export const experiences = [
  {
    id: "aws-events",
    role: "Head of Events and Logistics",
    company: "AWS Student Community Day — Sri Lanka",
    period: "2026",
    description: [
      "Led event planning and logistics for the AWS Student Community Day Sri Lanka 2026.",
      "Coordinated venue, speakers, and attendee management for a large-scale tech community event."
    ],
    images: [
      { src: '/assets/ocscd.jpg',  alt: 'OCSCD Event' },
      { src: '/assets/aws.jpg',    alt: 'AWS Community Day' },
      { src: '/assets/group.jpg',  alt: 'Team Photo' },
    ]
  },
  {
    id: "installation-ceremony",
    role: "Editor & Organizing Committee Member",
    company: "14th Installation Ceremony (23/24), University of Kelaniya",
    period: "2023 – 2024",
    description: [
      "Served as Editor on the Organizing Committee for the 14th Installation Ceremony of the University of Kelaniya.",
      "Managed editorial content and event communications."
    ],
    images: [
      { src: '/assets/editor.jpeg',   alt: 'Editor Role' },
      { src: '/assets/groupoc.jpeg',  alt: 'Organizing Committee' },
      { src: '/assets/editoroc.jpeg', alt: 'Editor OC' },
    ]
  },
  {
    id: "open-day",
    role: "Organizing Committee Member",
    company: "Open Day 2025 — Faculty of Science, University of Kelaniya",
    period: "2025",
    description: [
      "Organized and coordinated the Faculty of Science Open Day, showcasing research and student projects.",
      "Managed logistics and visitor experience for faculty-wide open event."
    ],
    images: [
      { src: '/assets/open.jpeg', alt: 'Open Day' },
      { src: '/assets/game.jpeg', alt: 'Game Activity' },
      { src: '/assets/ex.jpeg',   alt: 'Exhibition' },
      { src: '/assets/card.jpeg', alt: 'Event Card' },
    ]
  },
  {
    id: "rotaract",
    role: "Member",
    company: "Rotaract Club of University of Kelaniya",
    period: "2023 – Present",
    description: [
      "Active member of the Rotaract Club, participating in community service and leadership development initiatives."
    ]
  }
];

export const projects = [
  {
    id: "slr-gat",
    title: "SLR GAT (GNN) — Railway Delay Propagation",
    tech: ["Python", "PyTorch", "PyTorch Geometric", "GATv2", "GNNExplainer", "Open-Meteo"],
    description: "Ongoing research using Graph Attention Networks to model how monsoon weather reshapes train-delay propagation across Sri Lanka's railway network.",
    points: [
      "Developing a GATv2 framework with climate-conditioned edge weights to model and explain monsoon-driven train-delay cascades.",
      "Building a spatio-temporal event graph from timetable data and applying GNNExplainer to generate a season-aware cascade risk map.",
      "Targeting operational decision-support for railway network management."
    ],
    links: {
      github: "https://github.com/IdushaniAnnePerera"
    },
    image: "/assets/GAT.png"
  },
  {
    id: "super-resolution",
    title: "Super-Resolution & Inference Optimization",
    tech: ["Python", "PyTorch", "ONNX", "TensorRT"],
    description: "Image super-resolution pipeline using Real-ESRGAN with a PyTorch → ONNX → TensorRT (FP16) optimization chain, cutting inference latency 2×.",
    points: [
      "Built an image super-resolution pipeline using Real-ESRGAN (RRDBNet) to upscale low-resolution images 4×, with tiled inference for memory-safe processing.",
      "Optimized deployment via PyTorch → ONNX → TensorRT (FP16), reducing inference latency 2× while preserving output quality.",
      "Built a three-way benchmark harness measuring p50/p90/p99 latency and PSNR/SSIM/LPIPS across backends with numerical parity verification."
    ],
    links: {
      github: "https://github.com/IdushaniAnnePerera"
    },
    image: "/assets/super-res.png"
  },
  {
    id: "credit-ai",
    title: "CreditAI — Enterprise Risk Intelligence Platform",
    tech: ["Python", "FastAPI", "XGBoost", "Scikit-learn", "Docker"],
    description: "AI-driven credit risk system using ensemble ML models with fraud detection and NLP-based sentiment analysis for real-time lending decisions.",
    points: [
      "Built ensemble models (XGBoost, Random Forest, Gradient Boosting) with fraud detection and NLP sentiment analysis for real-time lending decisions.",
      "Built a modular FastAPI backend with Docker deployment, designed for scalable expansion with FinBERT and LSTM integration."
    ],
    links: {
      github: "https://github.com/IdushaniAnnePerera/CreditAI-Enterprise-Risk-Intelligence-Platform"
    },
    image: "/assets/credit ai.png"
  },
  {
    id: "citation-verifier",
    title: "Citation & Claim Verifier Chrome Extension",
    tech: ["JavaScript", "Manifest V3", "Node.js", "Vercel", "Claude API"],
    description: "Chrome extension that fact-checks highlighted claims via the Claude API with live web search, returning source-backed verdicts.",
    points: [
      "Built a Chrome extension that fact-checks highlighted claims, returning source-backed verdicts (Supported / Disputed / Unverifiable) via the Claude API with live web search.",
      "Designed a serverless Vercel backend keeping the API key server-side, with token auth and rate limiting to prevent abuse."
    ],
    links: {
      github: "https://github.com/IdushaniAnnePerera"
    },
    image: "/assets/citation-verifier.png"
  },
  {
    id: "agrilinker",
    title: "Agrilinker Web Application",
    tech: ["Java", "Spring Boot", "MongoDB", "WebSockets", "JWT"],
    description: "Full-stack farmer–buyer platform with role-based authentication, real-time messaging, and integrated AI services.",
    points: [
      "Built a full-stack farmer–buyer platform with role-based authentication and order management.",
      "Integrated real-time messaging and notifications using WebSockets and SSE.",
      "Developed AI services including a chatbot, crop advisor, complaint handling, and sentiment analysis."
    ],
    links: {
      github: "https://github.com/IdushaniAnnePerera"
    },
    image: "/assets/agri.jpg"
  },
  {
    id: "vital",
    title: "Vital — Health & Fitness Companion App",
    tech: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "SQLite"],
    description: "Cross-platform mobile app unifying five health domains with an offline-first SQLite store, Firebase backend, and Material 3 UI.",
    points: [
      "Built a cross-platform mobile app unifying step, workout, meal, medication, and sleep tracking with an offline-first SQLite store and animated Material 3 UI.",
      "Engineered a Firebase backend with Google Sign-In authentication and per-user Cloud Firestore sync, layering cross-device cloud backup over local storage."
    ],
    links: {
      github: "https://github.com/IdushaniAnnePerera"
    },
    image: "/assets/vital.png"
  },
  {
    id: "local-rag",
    title: "Local RAG Chatbot",
    tech: ["Python", "FastAPI", "React", "Tailwind CSS", "FAISS", "SQLite", "Ollama", "Sentence Transformers"],
    description: "Fully local Retrieval-Augmented Generation chatbot that answers questions exclusively from user-uploaded documents using semantic search.",
    points: [
      "Built a fully local RAG chatbot answering questions from user-uploaded PDF, TXT, and Markdown documents using semantic search and grounded responses.",
      "Implemented PyMuPDF document parsing, Sentence Transformers embeddings, FAISS vector retrieval, SQLite persistence, and a React + Tailwind interface with chat session history and source citations."
    ],
    links: {
      github: "https://github.com/IdushaniAnnePerera"
    },
    image: "/assets/local-rag.png"
  },
];

export const education = [
  {
    id: "bsc",
    degree: "BSc (Hons) in Computer Science",
    institution: "University of Kelaniya, Sri Lanka",
    period: "2023 – Present",
    current: true,
  },
  {
    id: "al",
    degree: "G.C.E. Advanced Level — Physical Science Stream",
    institution: "Visakha Vidyalaya, Colombo 05, Sri Lanka",
    period: "2012 – 2020",
    current: false,
  },
  {
    id: "ucsc",
    degree: "Certificate Course on Data Science with Python",
    institution: "University of Colombo School of Computing, Sri Lanka",
    period: "2023",
    current: false,
  },
];

export const awards = [
  {
    id: "scholarship",
    title: "All Island Rank 6 – Grade 5 Scholarship Examination",
    org: "Ministry of Education, Sri Lanka",
    year: "",
    description: "Secured 6th place at the All Island level and 3rd place in Gampaha District in the highly competitive National Grade 5 Scholarship Examination.",
  },
];
