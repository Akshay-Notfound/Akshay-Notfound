export interface Project {
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  category: "GenAI" | "Data Engineering" | "Full Stack" | "Computer Vision";
  tech: string[];
  overview: string;
  features: string[];
  architecture?: string;
  githubUrl?: string;
  demoUrl?: string;
  metric?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  highlights: string[];
  technologies: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  featured: boolean;
  verifyUrl?: string;
  badge?: string;
}

export interface Achievement {
  title: string;
  event: string;
  organization: string;
  description: string;
  year: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: string[];
  glowColor: string;
}

export const siteConfig = {
  name: "Akshay Rathod",
  fullName: "Akshay Shivaji Rathod",
  heroName: "AKSHAY RATHOD",
  role: "Data & AI Engineer",
  status: "2026 Graduate · Open to opportunities",
  tagline: "Turning raw data into intelligent solutions through engineering, analytics, and AI.",
  bio: "I am a Data & AI Engineer with a background in Artificial Intelligence and Machine Learning. I build data pipelines, analytics dashboards, and GenAI-powered applications using Python, SQL, cloud platforms, and modern web technologies. My experience spans data analytics, data science, full-stack development, retrieval-augmented generation (RAG), and LLM-based agents. I enjoy transforming complex datasets into actionable insights and building practical software solutions.",
  location: "Thane, Maharashtra, India",
  email: "rathod4520@gmail.com",
  phone: "+91 8454842474",
  linkedin: "https://www.linkedin.com/in/akshay-rathod-aaab52206/",
  github: "https://github.com/Akshay-Notfound",
  resumeUrl: "/resume.pdf",

  education: {
    qualification: "B.Tech, Artificial Intelligence and Machine Learning",
    institution: "Dr. Babasaheb Ambedkar Technological University",
    duration: "Aug 2022 – May 2026",
    status: "Final Year Student",
    focus: "AI/ML Systems, Data Structures, Distributed Computing, Neural Networks",
  },

  skills: [
    {
      name: "GenAI & LLM Engineering",
      description: "Autonomous agents, context-augmented pipelines & neural inference",
      glowColor: "#8B5CF6",
      skills: [
        "RAG",
        "OpenAI API",
        "Anthropic Claude API",
        "Prompt Engineering",
        "Vector Search",
        "LLM Agents",
      ],
    },
    {
      name: "Data Engineering",
      description: "Scalable ETL workflows, warehousing & schema modeling",
      glowColor: "#3B82F6",
      skills: [
        "Python",
        "SQL",
        "ETL",
        "Data Modeling",
        "Data Cleaning",
        "Google BigQuery",
        "SQLite",
        "JDBC",
        "REST APIs",
      ],
    },
    {
      name: "Analytics & BI",
      description: "Quantitative EDA, dynamic visualization & predictive metrics",
      glowColor: "#22D3EE",
      skills: [
        "Power BI",
        "Tableau",
        "Pandas",
        "Plotly",
        "Seaborn",
        "Statistical EDA",
        "Predictive Analytics",
        "ROI Analysis",
      ],
    },
    {
      name: "Cloud & Big Data",
      description: "Distributed pipelines, containerized orchestration & cloud infra",
      glowColor: "#6366F1",
      skills: [
        "Google Cloud",
        "AWS",
        "Apache Spark",
        "Hadoop",
        "Kafka",
        "Git",
        "GitHub",
      ],
    },
    {
      name: "Software Engineering",
      description: "Full-stack development, modern web APIs & architecture",
      glowColor: "#10B981",
      skills: [
        "JavaScript",
        "Java Fundamentals",
        "MEAN/MERN",
        "FastAPI",
        "Next.js",
        "TypeScript",
        "Agile/Scrum",
        "DSA",
        "SDLC",
      ],
    },
  ] as SkillCategory[],

  featuredProjects: [
    {
      slug: "genai-rag-analytics-agent",
      title: "GenAI RAG Data Analytics Agent",
      tagline: "Natural-language query compiler to sandboxed Pandas execution via custom TF-IDF RAG",
      featured: true,
      category: "GenAI",
      tech: ["Python", "Pandas", "Scikit-learn", "OpenAI", "Anthropic", "Pytest"],
      metric: "98% Retrieval Accuracy",
      overview:
        "A custom-orchestrated RAG agent that retrieves relevant schema and context using TF-IDF and cosine similarity, then translates natural-language questions into executable, sandboxed Pandas expressions.",
      features: [
        "Context and schema retrieval via TF-IDF & Cosine Similarity vector space",
        "Natural-language analytical query compilation into valid Pandas syntax",
        "Pluggable LLM provider architecture supporting OpenAI GPT and Anthropic Claude",
        "Offline mock provider enabling reproducible deterministic benchmarking",
        "Automated Pytest validation suite for retrieval precision, prompting & execution",
      ],
      architecture:
        "User Query -> Semantic Schema Matcher (TF-IDF/Cosine) -> Prompt Orchestrator -> LLM Engine (GPT/Claude) -> Sandboxed AST Validator -> Pandas Execution Engine -> Formatted Insight",
      githubUrl: "https://github.com/Akshay-Notfound/genai-rag-analytics-agent",
      demoUrl: "",
    },
    {
      slug: "customer-churn-analysis",
      title: "Customer Churn Analysis",
      tagline: "End-to-end subscription intelligence pipeline & retention driver visualization",
      featured: true,
      category: "Data Engineering",
      tech: ["Python", "SQL", "SQLite", "Pandas", "Plotly", "Seaborn"],
      metric: "35% Churn Risk Identified",
      overview:
        "A data pipeline and analytical model that processes subscription datasets to identify customer cancellation trends and support retention strategy.",
      features: [
        "Automated subscription data ingestion and relational staging with SQLite & Python",
        "Feature engineering pipeline computing tenure days, usage density, and recency",
        "Quantitative churn driver analysis uncovering inflection points in user lifecycles",
        "Interactive Plotly & Seaborn exploratory dashboards for customer lifetime value (LTV)",
      ],
      architecture:
        "Raw Subscription Records -> SQLite Relational Staging -> Feature Engineering (Tenure/Recency) -> Statistical Modeling -> Interactive Plotly Analytics Studio",
      githubUrl: "https://github.com/Akshay-Notfound/customer-churn-analysis",
      demoUrl: "",
    },
    {
      slug: "datamind-analytics",
      title: "DataMind AI",
      tagline: "Full-stack automated data quality scoring and instant BI dashboard synthesizer",
      featured: true,
      category: "Full Stack",
      tech: ["Python", "Pandas", "FastAPI", "Next.js", "TypeScript"],
      metric: "10x Faster Ingestion",
      overview:
        "A full-stack automated data analysis platform that processes CSV and Excel files, calculates data quality scores, and provides statistics.",
      features: [
        "High-performance FastAPI backend coupled with modern Next.js TypeScript interface",
        "High-throughput multi-format CSV and Excel parser designed for enterprise datasets",
        "Automated data quality scoring assessing missingness, outliers, and schema drift",
        "Heuristic delimiter and encoding auto-detection for diverse legacy files",
        "Dynamic chart explorer and slice-and-dice data aggregation engine",
      ],
      architecture:
        "User File Upload -> Delimiter/Encoding Auto-detector -> Pandas Quality Scorer -> FastAPI REST Worker -> Next.js Reactive Analytics Canvas",
      githubUrl: "https://github.com/Akshay-Notfound/datamind-analytics",
      demoUrl: "",
    },
  ] as Project[],

  moreProjects: [
    {
      slug: "cybersaathi",
      title: "CyberSaathi AI",
      tagline: "AI-powered cyber-threat advisory and digital legal guidance platform",
      featured: false,
      category: "GenAI",
      tech: ["Python", "Generative AI", "FastAPI", "Vercel", "Tailwind CSS"],
      metric: "Live on Vercel",
      overview:
        "An AI-driven cybersecurity and digital legal advisor designed to help users navigate cyber threats, analyze fraud patterns, and provide actionable security guidance.",
      features: [
        "Real-time fraud incident triage using LLM prompt pipelines",
        "Automated regulatory compliance and legal filing helper",
        "Zero-latency deployment on Vercel with streaming response support",
      ],
      githubUrl: "https://github.com/Akshay-Notfound/CyberSaathi",
      demoUrl: "https://cyber-saathi-delta.vercel.app",
    },
    {
      slug: "smart-safety-tourist",
      title: "Smart Safety Tourist",
      tagline: "Geofencing, emergency dispatch & AI-assisted travel protection",
      featured: false,
      category: "Full Stack",
      tech: ["Dart", "Flutter", "Firebase", "Generative AI", "Google Maps"],
      metric: "Real-time Geofencing",
      overview:
        "A Flutter-based Smart Safety Tourist application integrating Google Maps, Firebase, and Generative AI for real-time safety alerts and geolocation.",
      features: [
        "Live SOS dispatch & dynamic perimeter geofencing with Google Maps API",
        "Cloud messaging push notifications powered by Firebase Realtime DB",
        "AI emergency assistant advising travelers on regional security protocols",
      ],
      githubUrl: "https://github.com/Akshay-Notfound/Smart-Safety-Tourist",
      demoUrl: "",
    },
    {
      slug: "virtual-eye-mouse",
      title: "Virtual Eye Mouse",
      tagline: "Assistive hands-free cursor navigation via computer vision & eyelid tracking",
      featured: false,
      category: "Computer Vision",
      tech: ["Python", "OpenCV", "Computer Vision", "Machine Learning"],
      metric: "60 FPS Tracking",
      overview:
        "A computer vision–based assistive system enabling mouse control using eye and eyelid movement detection, improving accessibility for physically challenged users.",
      features: [
        "Real-time facial landmark detection with sub-millimeter pupil localization",
        "Adaptive threshold blink detection translating blinks into left/right clicks",
        "Low-latency OpenCV pipeline running smoothly on commodity webcams",
      ],
      githubUrl: "https://github.com/Akshay-Notfound/Virtual-Eye-Mouse",
      demoUrl: "",
    },
  ] as Project[],

  experience: [
    {
      role: "Data Analyst and Data Scientist Intern",
      company: "ExcelR Edtech Pvt. Ltd.",
      location: "Mumbai, Maharashtra",
      period: "Feb 2026 – Present",
      current: true,
      highlights: [
        "Design and maintain analytical models and performance dashboards to track KPIs.",
        "Build data pipelines and apply data science methods to extract actionable insights.",
        "Evaluate strategy effectiveness and resource allocation.",
        "Translate statistical findings and technical data into clear narratives for non-technical stakeholders.",
      ],
      technologies: ["Python", "SQL", "Tableau", "Power BI", "Data Modeling", "ETL", "KPI Dashboards"],
    },
    {
      role: "Full Stack Developer",
      company: "Humming Byte Technologies Pvt. Ltd.",
      location: "Remote",
      period: "Apr 2024 – Oct 2024",
      current: false,
      highlights: [
        "Developed backend and frontend applications using the MEAN/MERN stack.",
        "Integrated REST APIs with databases.",
        "Used Python, Java, and SQL for data processing and backend development.",
        "Strengthened distributed systems and software engineering fundamentals.",
      ],
      technologies: ["MEAN / MERN", "Node.js", "Express", "React", "MongoDB", "Python", "Java", "REST APIs"],
    },
  ] as Experience[],

  certifications: [
    {
      title: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      featured: true,
      verifyUrl: "",
      badge: "Professional",
    },
    {
      title: "Google Cloud: Create Your First Gemini Enterprise Application",
      issuer: "Google Cloud",
      featured: false,
      verifyUrl: "",
      badge: "GenAI",
    },
    {
      title: "Google Cloud: Analyze Sentiment with Natural Language API",
      issuer: "Google Cloud",
      featured: false,
      verifyUrl: "",
      badge: "Cloud AI",
    },
    {
      title: "McKinsey.org Forward Program",
      issuer: "McKinsey & Company",
      featured: false,
      verifyUrl: "",
      badge: "Leadership",
    },
    {
      title: "HP LIFE: Agile Project Management",
      issuer: "HP LIFE Foundation",
      featured: false,
      verifyUrl: "",
      badge: "Agile",
    },
    {
      title: "Coding Seekho Institute: Full Stack Development",
      issuer: "Coding Seekho Institute",
      featured: false,
      verifyUrl: "",
      badge: "Full Stack",
    },
    {
      title: "Coding Seekho Institute: Python Programming",
      issuer: "Coding Seekho Institute",
      featured: false,
      verifyUrl: "",
      badge: "Python",
    },
    {
      title: "Coding Seekho Institute: Data Structures & Algorithms",
      issuer: "Coding Seekho Institute",
      featured: false,
      verifyUrl: "",
      badge: "DSA",
    },
  ] as Certification[],

  achievements: [
    {
      title: "1st Rank — 100 Days Hard Challenge",
      event: "CodeXpress 2.0",
      organization: "AITR Indore",
      description:
        "Secured 1st rank out of hundreds of participants by solving advanced algorithmic and data structure problems across 100 consecutive days.",
      year: "2025",
    },
    {
      title: "National Hackathon Finalist",
      event: "HackFusion 2.0",
      organization: "SGGS & IE&T, Nanded",
      description:
        "Engineered and presented a full-fledged intelligent technology solution under rigorous 36-hour sprint conditions.",
      year: "2025",
    },
    {
      title: "Top 20 Grand Finalist — Bid-2-Code",
      event: "Innov8 '25",
      organization: "JECRC University",
      description:
        "Selected as a Top 20 National Grand Finalist in an algorithmic strategy bidding and speed problem-solving contest.",
      year: "2025",
    },
  ] as Achievement[],
};
