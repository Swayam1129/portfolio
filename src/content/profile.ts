// Everything about you lives here. Edit this file to change the site.
// The AI chat answers ONLY from this file, so keep it accurate:
// anything written here, the chat will repeat to recruiters.

export type Project = {
  slug: string;
  title: string;
  summary: string;
  details: string[];
  stack: string[];
  period: string;
  context?: string;
  repo?: string;
  live?: string;
  featured?: boolean;
};

export type Role = {
  title: string;
  org: string;
  period: string;
  points: string[];
};

export const profile = {
  name: "Swayam Sagar",
  role: "Computing Science student, University of Alberta",
  intro:
    "I build software that ships and machine learning that holds up outside a notebook. Right now that means deploying a Plains Cree reading platform for a real client, and studying how language models fail and how to ground them in real data.",
  location: "Edmonton, Alberta",
  seeking: "Software engineering and AI/ML internships, Summer 2027",
  email: "swayam2@ualberta.ca",
  github: "https://github.com/Swayam1129",
  githubUser: "Swayam1129",
  linkedin: "https://www.linkedin.com/in/swayam-sagar-948323256",
  resume: "", // e.g. "/resume.pdf" after adding the file to /public

  education: {
    school: "University of Alberta",
    degree: "BSc Computing Science (co-op)",
    period: "Sep 2023 – Apr 2027",
    awards: ["International Admission Scholarship", "Regional Excellence Scholarship"],
    coursework: [
      "Machine Learning",
      "Reinforcement Learning",
      "Search and Planning in AI",
      "Algorithms",
      "Databases",
      "Software Engineering",
      "Web Applications and Architecture",
      "Game Programming",
    ],
  },

  experience: [
    {
      title: "Software Developer, client capstone project (CMPUT 401)",
      org: "University of Alberta, for ALTLab",
      period: "Sep 2026 – present",
      points: [
        "Built the deployment pipeline: multi-stage Docker build and a Compose stack (SvelteKit, PostgreSQL, Caddy with automatic HTTPS) on self-hosted Cybera servers.",
        "Set up CI/CD on a self-hosted GitHub Actions runner: lint, type-check, unit tests, Playwright end-to-end tests and Docker builds on every PR, auto-deploy to staging, one-click production releases.",
        "Shipped reader features including multi-collection search, keyboard navigation and dictionary matching for Cree spelling variants.",
        "Scrum Master for sprints 2 and 3 in a team of seven.",
      ],
    },
    {
      title: "CS Tutor",
      org: "University of Alberta",
      period: "2024 – present",
      points: ["Tutor students across seven CMPUT courses."],
    },
  ] satisfies Role[],

  skills: {
    "AI and ML": ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "LangChain", "FAISS", "RAG", "Reinforcement learning", "Computer vision"],
    Languages: ["Python", "TypeScript", "JavaScript", "C++", "C", "Java", "Kotlin", "SQL", "Bash"],
    "Web and backend": ["Next.js", "SvelteKit", "Django", "FastAPI", "Node.js", "PostgreSQL", "MongoDB", "REST APIs"],
    "Infrastructure": ["Docker", "GitHub Actions", "CI/CD", "Caddy", "Linux", "Playwright"],
  } as Record<string, string[]>,

  projects: [
    {
      slug: "plains-cree-reader",
      title: "Plains Cree Reader",
      summary:
        "A reading platform for ALTLab that lets Plains Cree learners and researchers browse texts, tap any word for its dictionary entry, and follow along with audio.",
      details: [
        "Owned deployment and CI/CD: Docker, Compose, Caddy HTTPS, self-hosted GitHub Actions runner.",
        "Integrates ALTLab's Korp corpus API, the itwêwina dictionary and a rule-based Cree language model.",
        "Playwright end-to-end tests mapped to user stories.",
      ],
      stack: ["SvelteKit", "TypeScript", "PostgreSQL", "Docker", "GitHub Actions", "Playwright"],
      period: "2026, in progress",
      context: "CMPUT 401 client project, team of 7",
      featured: true,
    },
    {
      slug: "rag-pipeline",
      title: "LLM-powered RAG pipeline",
      summary:
        "An ETL pipeline that grounds LLM answers in domain data with LangChain and FAISS, plus a BERT vs. GPT benchmark.",
      details: ["Reported a 40% reduction in hallucinations against the baseline."],
      stack: ["Python", "LangChain", "FAISS", "Hugging Face", "OpenAI API"],
      period: "2025",
      repo: "https://github.com/Swayam1129/rag-pipeline",
    },
    {
      slug: "migraineminder",
      title: "MigraineMinder",
      summary:
        "Real-time migraine detection from 256 Hz EEG data streamed off IoT hardware, with classifiers and live monitoring.",
      details: ["85% accuracy and 30% fewer false positives."],
      stack: ["Python", "scikit-learn", "Flask", "Arduino"],
      period: "2025",
      repo: "https://github.com/Swayam1129/migraineminder",
    },
    {
      slug: "galaga",
      title: "2D game engine and Galaga clone",
      summary:
        "An object-oriented C++ game engine on SFML, then a full Galaga built on top of it.",
      details: [
        "Two-phase collision detection with swept line checks so fast bullets never tunnel through targets.",
        "Weak-pointer publish/subscribe notification system and chained cubic Bézier flight paths.",
        "Game flow as a state machine; three enemy types with distinct dive attacks and scaling difficulty.",
      ],
      stack: ["C++", "SFML", "CMake"],
      period: "2026",
      context: "CMPUT 350",
      repo: "https://github.com/Swayam1129/project1",
    },
    {
      slug: "social-distribution",
      title: "Social Distribution",
      summary:
        "A federated social network: independent servers exchange authors, posts, comments and likes through an inbox-based REST API.",
      details: [
        "Django REST Framework API secured with HTTP Basic Auth between nodes.",
        "Fully qualified IDs for identity across servers; deployed on Heroku with PostgreSQL.",
      ],
      stack: ["Python", "Django", "PostgreSQL", "Heroku"],
      period: "2026",
      context: "CMPUT 404, team of 5",
      repo: "https://github.com/Swayam1129/w26-socialdistribution-turquoise",
    },
    {
      slug: "accessu",
      title: "AccessU",
      summary:
        "Voice-first campus navigation for blind and low-vision users, with on-device scene recognition and indoor pathfinding.",
      details: ["On-device computer vision with ML Kit and CameraX; BFS indoor routing."],
      stack: ["Kotlin", "ML Kit", "CameraX", "Google Maps SDK"],
      period: "2025",
      repo: "https://github.com/Swayam1129/routecause_AccessU",
    },
    {
      slug: "eventease",
      title: "EventEase",
      summary: "An Android app connecting event organizers with participants.",
      details: [],
      stack: ["Java", "Android"],
      period: "2025",
      context: "CMPUT 301, team project",
    },
  ] as Project[],

  // Short starter questions shown under the chat box
  suggestedQuestions: [
    "What has Swayam deployed to production?",
    "What ML work has he done?",
    "Is he available for a summer internship?",
  ],
};

export type Profile = typeof profile;
