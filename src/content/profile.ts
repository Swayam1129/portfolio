// Everything about you lives here. Edit this file to change the site.
// The chat on the site answers ONLY from this file, so keep it accurate:
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

export type Commit = { date: string; message: string };

export type CaseStudy = {
  slug: string;
  title: string;
  context: string;
  period: string;
  role: string;
  /** One verifiable line of evidence, with the date it was checked. */
  evidence: string;
  problem: string;
  did: string[];
  hardPart: { title: string; body: string };
  commits: Commit[];
  stack: string[];
  visual: "galaga" | "cree-architecture" | "federation";
  links: { label: string; href: string }[];
  note?: string;
};

export const profile = {
  name: "Swayam Sagar",
  role: "Computing Science, University of Alberta",
  headline:
    "I build software end to end: a 2D game engine in C++, the federation layer of a distributed social network, and the deployment pipeline for a client's language-learning platform.",
  location: "Edmonton, Alberta",
  seeking: "Software engineering and AI/ML internships, Summer 2027",
  email: "swayam2@ualberta.ca",
  github: "https://github.com/Swayam1129",
  githubUser: "Swayam1129",
  linkedin: "https://www.linkedin.com/in/swayam-sagar-948323256",
  resume: "", // put resume.pdf in /public, then set this to "/resume.pdf"

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

  caseStudies: [
    {
      slug: "plains-cree-reader",
      title: "Plains Cree Reader",
      context: "Client project for ALTLab, CMPUT 401, team of 7",
      period: "Sep 2026 – present",
      role: "Deployment and CI/CD owner, Scrum Master for sprints 2 and 3",
      evidence: "66 of the team's 238 commits, the most of anyone (as of October 2026, excluding merges)",
      problem:
        "ALTLab's Plains Cree texts lived in Korp, a corpus-search tool built for linguists. Learners and speakers had no simple way to just read a story, tap a word they didn't know, and see what it means.",
      did: [
        "Took the app from a dev server to production: a multi-stage Docker build, and a Compose stack with SvelteKit, PostgreSQL and Caddy for automatic HTTPS, on self-hosted Cybera servers.",
        "Set up CI on a self-hosted GitHub Actions runner. Every pull request runs Prettier, ESLint, type-checking, unit tests, Playwright user-story tests and a Docker build.",
        "Added CD: staging deploys itself when CI passes on main, and production deploys with one manual click.",
        "Built reader features: searching several collections at once, keyboard navigation between words, loading states, and clear errors when the corpus service is down.",
      ],
      hardPart: {
        title: "Words that wouldn't match",
        body: "Some dictionary entries are spelled with ý, like ayamihêwiýiniwak, while the same word in the texts is written with a plain y. Tapping those words found nothing. I changed the lookup so a y in the text also finds entries spelled with ý. The same week I fixed the search page crashing whenever results from two different texts shared a sentence number.",
      },
      commits: [
        { date: "2026-10-18", message: "ci: add CD (auto-deploy staging after CI, manual deploy to production)" },
        { date: "2026-10-18", message: "build: add multi-stage Dockerfile for the app" },
        { date: "2026-10-13", message: "fix: search page crashed when results from different texts shared a sentence number" },
        { date: "2026-10-12", message: "fix: find dictionary entries spelled with ý (e.g. ayamihêwiýiniwak) when the text uses y" },
        { date: "2026-10-12", message: "feat: keyboard navigation in the reader (arrows move between words, panel follows, Esc or leaving closes it)" },
      ],
      stack: ["SvelteKit", "TypeScript", "PostgreSQL", "Docker", "Caddy", "GitHub Actions", "Playwright"],
      visual: "cree-architecture",
      links: [],
      note: "The code belongs to the course organization, so the repository isn't public.",
    },
    {
      slug: "social-distribution",
      title: "Social Distribution",
      context: "Federated social network, CMPUT 404, team of 5",
      period: "Jan – Apr 2026",
      role: "Worked mainly on federation between servers",
      evidence: "91 commits, second-most on the team, and 130+ automated tests",
      problem:
        "Each team member ran their own server, and servers built by other teams had to share authors, posts, follows and likes with ours, with no central database.",
      did: [
        "Built cross-server follows: sending follow requests to another node's inbox, handling accept and unfollow, and keeping follower counts consistent on both sides.",
        "Synced remote public posts and images into our feed while keeping posts in time order.",
        "Added peer checks so a node only shows public posts from servers it trusts, plus an admin switch to disable a remote node.",
        "Deployed nodes on Heroku with PostgreSQL and documented the API for partner teams.",
      ],
      hardPart: {
        title: "Other teams' servers didn't talk like ours",
        body: "Partner nodes sent the same message in different shapes: an actor as a plain string instead of an object, inbox URLs with or without a trailing slash, follow acceptances in different formats. Follows would get stuck as pending on one side. I made our inbox accept each variant, added a trailing-slash fallback when delivering, and wrote reconciliation so both servers end up agreeing on who follows whom.",
      },
      commits: [
        { date: "2026-04-07", message: "Fix remote unfollow parsing when actor is sent as string" },
        { date: "2026-03-30", message: "fix(federation): try trailing-slash inbox fallback for remote follow delivery" },
        { date: "2026-03-25", message: "fix(federation): skip duplicate outbound entry CREATE after successful deliver" },
        { date: "2026-03-23", message: "feat(fix): propagate unfollow across nodes to keep follower stats consistent" },
      ],
      stack: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Heroku"],
      visual: "federation",
      links: [{ label: "Source code", href: "https://github.com/Swayam1129/w26-socialdistribution-turquoise" }],
    },
    {
      slug: "galaga",
      title: "2D game engine and Galaga",
      context: "CMPUT 350, solo",
      period: "Sep – Oct 2026",
      role: "Wrote the engine and the game",
      evidence: "Everything shown here runs on the engine",
      problem:
        "Build a reusable 2D engine in modern C++ on top of SFML, then prove it by writing a complete Galaga against only the engine's interfaces.",
      did: [
        "Game loop with object lifecycles, input mapped to messages, update and late-update passes, collision detection and layered rendering.",
        "A publish/subscribe notification system built on weak pointers, so it never keeps a destroyed object alive and stays safe when listeners change during delivery.",
        "Chained cubic Bézier curves for flight paths; three enemy types fly in, join a swaying formation and dive.",
        "The game itself as a state machine: title, stage intro, waves, play, respawn and game over.",
      ],
      hardPart: {
        title: "Bullets flying through enemies",
        body: "A bullet moves far enough in one frame to jump right over a small enemy, so a simple overlap check misses the hit. I treat each bullet's movement in a frame as a line segment and test that against enemy shapes, taking the earliest contact point. Bullets now stop exactly where they hit and explode there.",
      },
      commits: [
        { date: "2026-10-15", message: "Bullets: stop at exact hit point and explode; die with their shooter" },
        { date: "2026-10-15", message: "Enemies fly Bezier paths: 3 enemy types, 5 waves, formation, attacks" },
        { date: "2026-10-15", message: "Engine: narrow-phase shape collisions with directed-line hit points" },
        { date: "2026-10-15", message: "Add NotificationManager and GameObject::ReceiveNotification" },
        { date: "2026-10-14", message: "Add Bezier class for chained cubic curves (point, slope, max t)" },
      ],
      stack: ["C++20", "SFML", "CMake"],
      visual: "galaga",
      links: [{ label: "Source code", href: "https://github.com/Swayam1129/project1" }],
    },
  ] as CaseStudy[],

  experience: [
    {
      title: "Software Developer, client capstone project (CMPUT 401)",
      org: "University of Alberta, for ALTLab",
      period: "Sep 2026 – present",
      points: [
        "Own deployment and CI/CD for a Plains Cree reading platform; Scrum Master for sprints 2 and 3 in a team of seven.",
      ],
    },
    {
      title: "CS Tutor",
      org: "University of Alberta",
      period: "2024 – present",
      points: ["Tutor students across seven CMPUT courses."],
    },
  ] as Role[],

  skills: {
    "Languages": ["Python", "TypeScript", "C++", "C", "Java", "Kotlin", "SQL", "Bash"],
    "Web and backend": ["SvelteKit", "Next.js", "Django", "REST APIs", "PostgreSQL", "Node.js"],
    "Infrastructure and testing": ["Docker", "GitHub Actions", "Caddy", "Linux servers", "Playwright", "Heroku"],
    "Machine learning": ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "LangChain", "FAISS"],
  } as Record<string, string[]>,

  // Smaller projects, listed below the case studies. Editable in /admin once the database is seeded.
  projects: [
    {
      slug: "rag-pipeline",
      title: "LLM-powered RAG pipeline",
      summary:
        "An ETL pipeline that grounds LLM answers in domain data with LangChain and FAISS, with a BERT vs. GPT comparison.",
      details: [],
      stack: ["Python", "LangChain", "FAISS", "Hugging Face", "OpenAI API"],
      period: "2025",
      repo: "https://github.com/Swayam1129/rag-pipeline",
    },
    {
      slug: "migraineminder",
      title: "MigraineMinder",
      summary:
        "Migraine detection from 256 Hz EEG data streamed off IoT hardware, with classifiers and live monitoring.",
      details: [],
      stack: ["Python", "scikit-learn", "Flask", "Arduino"],
      period: "2025",
      repo: "https://github.com/Swayam1129/migraineminder",
    },
    {
      slug: "accessu",
      title: "AccessU",
      summary:
        "Voice-first campus navigation for blind and low-vision users, with on-device scene recognition and indoor pathfinding.",
      details: [],
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
      period: "Sep – Dec 2025",
      context: "CMPUT 301, team project",
    },
  ] as Project[],

  suggestedQuestions: [
    "What did Swayam deploy for ALTLab?",
    "What was the hardest bug in his game engine?",
    "Is he available for a summer internship?",
  ],
};

export type Profile = typeof profile;
