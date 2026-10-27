// Everything about you lives here. Edit this file to change the site.
// The chat on the site answers ONLY from this file, so keep it accurate:
// anything written here, the chat will repeat to recruiters.
// Commit counts exclude merge commits and were checked against each repository in October 2026.

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

export type LedgerRow = {
  project: string;
  slug?: string;
  kind: string;
  team: number;
  mine: number;
  total: number;
  rank?: string;
  period: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  context: string;
  period: string;
  role: string;
  evidence: string;
  problem: string;
  did: string[];
  hardPart: { title: string; body: string };
  commits: Commit[];
  stack: string[];
  visual: "galaga" | "cree-architecture" | "federation" | "eventease";
  links: { label: string; href: string }[];
  note?: string;
};

export const profile = {
  name: "Swayam Sagar",
  role: "Computing Science, University of Alberta",
  headline:
    "I write the code teams ship: deployment pipelines, push-notification backends, REST APIs and a C++ game engine. On four of my five team projects I was the first or second biggest contributor.",
  location: "Edmonton, Alberta",
  seeking: "Software engineering and AI/ML internships, Summer 2027",
  email: "swayam2@ualberta.ca",
  site: "https://swayamsagar.vercel.app",
  github: "https://github.com/Swayam1129",
  githubUser: "Swayam1129",
  linkedin: "https://www.linkedin.com/in/swayam-sagar-948323256",
  resume: "", // put resume.pdf in /public, then set this to "/resume.pdf"

  // My commits on every team project, from each repository's history.
  ledger: [
    { project: "Plains Cree Reader", slug: "plains-cree-reader", kind: "Client project", team: 7, mine: 66, total: 238, rank: "1st", period: "2026" },
    { project: "Social Distribution", slug: "social-distribution", kind: "Course project", team: 5, mine: 91, total: 335, rank: "2nd", period: "2026" },
    { project: "EventEase", slug: "eventease", kind: "Course project", team: 6, mine: 58, total: 269, rank: "2nd", period: "2025" },
    { project: "AccessU", kind: "Hackathon", team: 3, mine: 6, total: 17, rank: "2nd", period: "2026" },
    { project: "MigraineMinder", kind: "Hackathon", team: 4, mine: 3, total: 58, period: "2025" },
  ] as LedgerRow[],

  education: {
    school: "University of Alberta",
    degree: "BSc Computing Science (co-op)",
    period: "Sep 2023 – Apr 2027",
    awards: ["International Admission Scholarship", "Regional Excellence Scholarship"],
    coursework: [
      "Algorithms",
      "Software Engineering",
      "Web Applications and Architecture",
      "Advanced Game Programming",
      "Machine Learning",
      "Reinforcement Learning",
      "Search and Planning in AI",
      "Information Retrieval",
      "File and Database Management",
    ],
  },

  caseStudies: [
    {
      slug: "plains-cree-reader",
      title: "Plains Cree Reader",
      context: "Client project for ALTLab, team of 7",
      period: "Sep 2026 – present",
      role: "Deployment and CI/CD owner, Scrum Master for sprints 2 and 3",
      evidence: "66 of the team's 238 commits, the most of anyone",
      problem:
        "ALTLab's Plains Cree texts lived in Korp, a corpus-search tool built for linguists. Learners and speakers had no simple way to just read a story, tap a word they didn't know, and see what it means.",
      did: [
        "Took the app from a dev server to production: a multi-stage Docker build, and a Compose stack with SvelteKit, PostgreSQL and Caddy for automatic HTTPS, on self-hosted Cybera servers.",
        "Set up CI on a self-hosted GitHub Actions runner: 8 automated checks on every pull request, including lint, type-checking, unit tests and the team's 250+ Playwright end-to-end tests on Chromium and WebKit.",
        "Added CD: staging deploys itself when CI passes on main, then a smoke test runs against it; production deploys with one manual click.",
        "Built reader features: searching several collections at once, keyboard navigation between words, loading states, and clear errors when the corpus service is down.",
        "Kept the requirements traceability matrix for all 54 user stories.",
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
      ],
      stack: ["SvelteKit", "TypeScript", "PostgreSQL", "Docker", "Caddy", "GitHub Actions", "Playwright"],
      visual: "cree-architecture",
      links: [],
      note: "The code belongs to the course organization, so the repository isn't public.",
    },
    {
      slug: "eventease",
      title: "EventEase",
      context: "Android event app, team of 6",
      period: "Sep – Dec 2025",
      role: "Built the notification backend, the entrant lottery and the organizer side of the app",
      evidence: "58 of 269 commits, second-most; wrote about 95% of the Cloud Functions",
      problem:
        "Popular events fill up, so organizers needed a fair way to pick entrants from a waitlist, invite them with a deadline, and tell everyone else, without anyone refreshing the app.",
      did: [
        "Wrote the Firebase Cloud Functions backend: a Firestore-triggered function that sends push notifications through Firebase Cloud Messaging in batches, retries temporary failures, and cleans up dead device tokens.",
        "Built the scheduled lottery that picks entrants at random from the waitlist, capped at the spots left, invites them with a response deadline, and sends 'sorry' notices to everyone not chosen before the event starts.",
        "Built the organizer side of the Android app: creating events with capacity, sample size and deadlines, viewing entrants by status, and managing the waitlist.",
        "Moved sign-in from passwords to device-based login and set up the base Android project and Firestore database.",
        "Wrote integration tests for notifications, Firebase and the user stories.",
      ],
      hardPart: {
        title: "Never invite more people than there are spots",
        body: "The lottery runs on a schedule, and entrants can decline or get replaced, so a naive draw of the full sample size could over-invite. I made each run count who is already selected, draw only the spots still open with a fair shuffle, and check the total again before writing, so the event never goes over its limit.",
      },
      commits: [
        { date: "2025-11-06", message: "created organizer , create, oragnizer_event, organizer_account functionality" },
        { date: "2025-11-21", message: "Added Notification Functionality , testing left" },
        { date: "2025-11-22", message: "Remove default test template files and WorkflowDemoActivity test/demo code" },
        { date: "2025-11-26", message: "added test for workflow" },
      ],
      stack: ["Java", "Android", "Firebase Cloud Functions", "Node.js", "Firestore", "Firebase Cloud Messaging"],
      visual: "eventease",
      links: [{ label: "Source code", href: "https://github.com/RISCVI-301/CMPUT301F25riscvi" }],
    },
    {
      slug: "social-distribution",
      title: "Social Distribution",
      context: "Federated social network, team of 5",
      period: "Jan – Apr 2026",
      role: "Full-stack developer: authors API, follow system, API design, auth, deployment and federation",
      evidence: "91 of 335 commits, second-most, and 130+ automated tests",
      problem:
        "Each team member ran their own server, and servers built by other teams had to share authors, posts, follows and likes with ours, with no central database.",
      did: [
        "Built the Authors API and the whole follow system: pending and accepted requests, followers, following and request endpoints, the follow, approve and deny screens, and Feed and Friends filters on the stream.",
        "Standardized the REST API after TA review: every author, post, comment and like got a fully qualified ID that works across servers, with consistent field names and no duplicate identity fields.",
        "Added token authentication, stopped double-clicks from creating duplicate posts, and deployed my node on Heroku with PostgreSQL.",
        "Built federation with other teams' servers: cross-node follows, unfollow propagation, remote post and image sync, and peer checks so only trusted servers' posts appear.",
        "Wrote 130+ automated tests covering the API, auth and follow flows.",
      ],
      hardPart: {
        title: "Other teams' servers didn't talk like ours",
        body: "Partner nodes sent the same message in different shapes: an actor as a plain string instead of an object, inbox URLs with or without a trailing slash, follow acceptances in different formats. Follows would get stuck as pending on one side. I made our inbox accept each variant, added a trailing-slash fallback when delivering, and wrote reconciliation so both servers end up agreeing on who follows whom.",
      },
      commits: [
        { date: "2026-03-07", message: "feat(follow): add PENDING/ACCEPTED status for follow requests" },
        { date: "2026-03-21", message: "feat(api-auth): add token authentication endpoint and DRF token auth defaults with basic token obtain tests" },
        { date: "2026-03-30", message: "fix(federation): try trailing-slash inbox fallback for remote follow delivery" },
        { date: "2026-04-07", message: "Fix remote unfollow parsing when actor is sent as string" },
      ],
      stack: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Heroku"],
      visual: "federation",
      links: [{ label: "Source code", href: "https://github.com/Swayam1129/w26-socialdistribution-turquoise" }],
    },
    {
      slug: "galaga",
      title: "2D game engine and Galaga",
      context: "Game programming course, solo",
      period: "Sep – Oct 2026",
      role: "Wrote the engine systems and the whole game",
      evidence: "Everything in this clip runs on the engine",
      problem:
        "Build a reusable 2D engine in modern C++ on top of SFML, then prove it by writing a complete Galaga against only the engine's interfaces.",
      did: [
        "Game loop with object lifecycles, input mapped to messages, update and late-update passes, collision detection and layered rendering.",
        "A publish/subscribe notification system built on weak pointers, so it never keeps a destroyed object alive and stays safe when listeners change during delivery.",
        "Chained cubic Bézier curves for flight paths; three enemy types fly in, join a swaying formation and dive, in waves of 40.",
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
        { date: "2026-10-14", message: "Add Bezier class for chained cubic curves (point, slope, max t)" },
      ],
      stack: ["C++20", "SFML", "CMake"],
      visual: "galaga",
      links: [{ label: "Source code", href: "https://github.com/Swayam1129/project1" }],
    },
  ] as CaseStudy[],

  experience: [
    {
      title: "Software Developer, client capstone project",
      org: "University of Alberta, for ALTLab",
      period: "Sep 2026 – present",
      points: [
        "Own deployment and CI/CD for a Plains Cree reading platform; Scrum Master for sprints 2 and 3 in a team of seven.",
      ],
    },
    {
      title: "Computing Science Tutor",
      org: "University of Alberta",
      period: "2024 – present",
      points: ["Tutor students one-on-one across seven Computing Science courses."],
    },
  ] as Role[],

  skills: {
    Languages: ["Python", "Java", "TypeScript", "JavaScript", "C++", "C", "Kotlin", "SQL", "Bash"],
    "Web and backend": ["SvelteKit", "Next.js", "React", "Django REST Framework", "Node.js", "REST APIs", "PostgreSQL", "Firebase"],
    "Infrastructure and testing": ["Docker", "GitHub Actions", "Caddy", "Linux servers", "Heroku", "Playwright", "JUnit"],
    "Machine learning": ["PyTorch", "scikit-learn", "LangChain", "FAISS", "OpenAI API"],
  } as Record<string, string[]>,

  // Hackathons and smaller projects. Editable in /admin once the database is seeded.
  projects: [
    {
      slug: "accessu",
      title: "AccessU",
      summary:
        "Voice-first campus navigation for blind and low-vision students, built in a 3-person hackathon team. I built the transit and weather layer: loading Edmonton Transit's GTFS schedule, live ETS arrival data, an on-bus monitor that announces stops, and weather alerts, plus QR routes for indoor navigation.",
      details: [],
      stack: ["Kotlin", "Android", "GTFS", "Google Maps SDK"],
      period: "Feb 2026",
      context: "Hackathon, team of 3",
      repo: "https://github.com/Swayam1129/routecause_AccessU",
    },
    {
      slug: "migraineminder",
      title: "MigraineMinder",
      summary:
        "Detects early signs of a migraine from a Muse 2 EEG headband and dims the lights through an Arduino. I built the machine learning pipeline: the EEG classifier, generative data augmentation for the small dataset, and the prediction script.",
      details: [],
      stack: ["Python", "PyTorch", "scikit-learn", "Muse 2 EEG", "Arduino"],
      period: "Nov 2025",
      context: "Hackathon, team of 4",
      repo: "https://github.com/sleepsonrockss/MigraineMinder",
    },
    {
      slug: "rag-pipeline",
      title: "RAG pipeline over research papers",
      summary:
        "Question answering grounded in the Transformer and BERT papers, using OpenAI embeddings, FAISS and LangChain. I ran an experiment on chunk size: 500-token chunks beat 200 (too fragmented) and 1,000 (too diluted), and the pipeline refuses to answer questions the papers don't cover.",
      details: [],
      stack: ["Python", "LangChain", "FAISS", "OpenAI API"],
      period: "May 2026",
      repo: "https://github.com/Swayam1129/rag-pipeline",
    },
    {
      slug: "mandelbrot",
      title: "Mandelbrot and Julia sets",
      summary: "Renders Mandelbrot and Julia set fractals in C, with zoom and iteration settings from the command line, written out as PPM images.",
      details: [],
      stack: ["C"],
      period: "Oct 2024",
      repo: "https://github.com/Swayam1129/MandelBrot-and-Julia-Set",
    },
  ] as Project[],

  suggestedQuestions: [
    "What did Swayam build for EventEase?",
    "How did he set up deployment for ALTLab?",
    "Is he available for a summer internship?",
  ],
};

export type Profile = typeof profile;
