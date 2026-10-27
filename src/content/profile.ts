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

export type Testimonial = { quote: string; name: string; role: string };

export type CaseStudy = {
  slug: string;
  title: string;
  /** Problem to result in one line, for the project index. */
  oneLiner: string;
  tags: string[];
  context: string;
  period: string;
  team: string;
  role: string;
  problem: string;
  solution: string[];
  result: string[];
  decisions: { choice: string; why: string }[];
  hardPart: { title: string; body: string };
  evidence: string;
  commits: Commit[];
  stack: string[];
  visual: "galaga" | "cree-architecture" | "federation" | "eventease";
  links: { label: string; href: string }[];
  note?: string;
};

export const profile = {
  name: "Swayam Sagar",
  role: "Computing Science, University of Alberta",
  headline: "From a blank repo to production.",
  intro:
    "I'm a Computing Science student at the University of Alberta. I've taken a client's language platform live, built the notification backend for an Android app, and written a C++ game engine. I'm looking for a Summer 2027 software or ML internship.",
  manifesto:
    "I like owning the parts that make a project real: the deploy pipeline, the backend that has to work when nobody is watching, the bug that only shows up on another team's server. On four of my five team projects I was the first or second biggest contributor.",
  manifestoHighlights: ["deploy pipeline", "backend", "another team's server"],
  location: "Edmonton, Alberta",
  seeking: "Software engineering and AI/ML internships, Summer 2027",
  email: "swayam2@ualberta.ca",
  site: "https://swayamsagar.vercel.app",
  github: "https://github.com/Swayam1129",
  githubUser: "Swayam1129",
  linkedin: "https://www.linkedin.com/in/swayam-sagar-948323256",
  resume: "", // put resume.pdf in /public, then set this to "/resume.pdf"

  // Tools used in shipped projects, shown in the scrolling strip.
  tools: ["Docker", "GitHub Actions", "PostgreSQL", "SvelteKit", "TypeScript", "Firebase", "Java", "Android", "Django", "Python", "C++", "PyTorch", "Caddy", "Playwright", "Heroku", "Kotlin"],

  // Add 2-3 real quotes from a TA, teammate or the ALTLab client. The section appears once this has entries.
  testimonials: [] as Testimonial[],

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
      oneLiner: "Took a client's reading platform from laptops to a live, tested production site.",
      tags: ["DevOps", "CI/CD", "Full-stack"],
      context: "Client project for ALTLab (Alberta Language Technology Lab)",
      period: "Sep 2026 – present",
      team: "7 developers",
      role: "Deployment and CI/CD owner; Scrum Master for sprints 2 and 3",
      problem:
        "ALTLab's Plains Cree texts lived in Korp, a corpus-search tool built for linguists. Learners had no simple way to read a story, tap a word and see what it means, and our team's app only ran on our own laptops.",
      solution: [
        "Packaged the SvelteKit app in a multi-stage Docker image and wrote a Compose stack with PostgreSQL and Caddy for automatic HTTPS, on two self-hosted Cybera servers for staging and production.",
        "Built CI on a self-hosted GitHub Actions runner: 8 automated checks on every pull request, including lint, type-checking, unit tests and the team's 250+ Playwright end-to-end tests on Chromium and WebKit.",
        "Added CD: staging deploys itself when CI passes on main and is smoke-tested right after; production deploys with one click.",
        "Built reader features: searching several collections at once, keyboard navigation between words, and clear errors when the corpus service is down.",
      ],
      result: [
        "The team went from laptops only to live staging and production sites over HTTPS.",
        "Every change is tested automatically before it can merge, and a release is one click.",
        "Top committer on the team: 66 of 238 commits.",
      ],
      decisions: [
        {
          choice: "A self-hosted CI runner instead of GitHub's",
          why: "GitHub-hosted runners and GitHub Pages were blocked for the repository by billing, so I installed a runner on our staging server and served the docs site from our own Caddy.",
        },
        {
          choice: "IPv6-only servers with free DuckDNS domains",
          why: "Our cloud project had no public IPv4 address. AAAA-only domains plus Caddy's automatic Let's Encrypt certificates still gave us real HTTPS at no cost.",
        },
      ],
      hardPart: {
        title: "Words that wouldn't match",
        body: "Some dictionary entries are spelled with ý, like ayamihêwiýiniwak, while the same word in the texts uses a plain y, so tapping it found nothing. I changed the lookup so a y in the text also finds entries spelled with ý. The same week I fixed the search page crashing whenever two texts' results shared a sentence number.",
      },
      evidence: "66 of the team's 238 commits, the most of anyone",
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
      oneLiner: "Built the backend that picks event entrants fairly and tells them automatically.",
      tags: ["Backend", "Android", "Firebase"],
      context: "Android event app, software engineering course",
      period: "Sep – Dec 2025",
      team: "6 developers",
      role: "Notification backend, entrant lottery and the organizer side of the app",
      problem:
        "Popular events fill up. Organizers needed a fair way to pick entrants from a waitlist, invite them with a deadline, and tell everyone else, without anyone having to refresh the app.",
      solution: [
        "Wrote the Firebase Cloud Functions backend: a Firestore-triggered function that sends push notifications through Firebase Cloud Messaging in batches, retries temporary failures and removes dead device tokens.",
        "Built a scheduled lottery that draws entrants at random from the waitlist, capped at the spots still open, invites them with a response deadline, and sends 'sorry' notices to everyone not chosen.",
        "Built the organizer screens: creating events with capacity, sample size and deadlines, viewing entrants by status, and managing the waitlist.",
        "Moved sign-in from passwords to device-based login, and wrote integration tests for notifications, Firebase and the user stories.",
      ],
      result: [
        "Entrants hear about selection, deadlines and rejections automatically, even with the app closed.",
        "The lottery can never invite more people than an event has room for.",
        "I wrote about 95% of the Cloud Functions code and made 58 of 269 commits, second-most on the team.",
      ],
      decisions: [
        {
          choice: "Send notifications from Cloud Functions, not the app",
          why: "A server-side trigger fires whenever a notification is written, so messages go out even when the organizer's or entrant's app is closed.",
        },
        {
          choice: "Device-based login instead of passwords",
          why: "Entrants stay signed in on their phone without managing another password.",
        },
      ],
      hardPart: {
        title: "Never invite more people than there are spots",
        body: "The lottery runs on a schedule, and entrants can decline or be replaced, so drawing the full sample size each time could over-invite. Each run counts who is already selected, draws only the open spots with a fair shuffle, and checks the total again before writing.",
      },
      evidence: "58 of 269 commits, second-most; about 95% of the Cloud Functions",
      commits: [
        { date: "2025-11-06", message: "created organizer , create, oragnizer_event, organizer_account functionality" },
        { date: "2025-11-21", message: "Added Notification Functionality , testing left" },
        { date: "2025-11-26", message: "added test for workflow" },
      ],
      stack: ["Java", "Android", "Firebase Cloud Functions", "Node.js", "Firestore", "Firebase Cloud Messaging"],
      visual: "eventease",
      links: [{ label: "Source code", href: "https://github.com/RISCVI-301/CMPUT301F25riscvi" }],
    },
    {
      slug: "social-distribution",
      title: "Social Distribution",
      oneLiner: "Made our server share follows and posts with other teams' servers, reliably.",
      tags: ["Backend", "REST APIs", "Distributed systems"],
      context: "Federated social network, web applications course",
      period: "Jan – Apr 2026",
      team: "5 developers, each running their own server",
      role: "Full-stack: authors API, follow system, API design, auth, deployment and federation",
      problem:
        "Each of us ran a separate server, and servers built by other teams had to exchange authors, posts, follows and likes with ours. There was no shared database to fall back on.",
      solution: [
        "Built the Authors API and the whole follow system: request, accept and deny flows, followers and following endpoints, the screens for them, and Feed and Friends filters.",
        "Standardized the REST API after TA review so every author, post, comment and like has one fully qualified ID that works across servers, with consistent field names.",
        "Added token authentication, stopped double-clicks from creating duplicate posts, and deployed my node on Heroku with PostgreSQL.",
        "Built federation: cross-server follows and unfollows, remote post and image sync, and peer checks so only trusted servers' posts appear.",
      ],
      result: [
        "Our five nodes and partner teams' nodes exchange follows and posts, and both sides agree on who follows whom.",
        "130+ automated tests cover the API, auth and follow flows.",
        "91 of 335 commits, second-most on the team.",
      ],
      decisions: [
        {
          choice: "Full URLs as IDs instead of local database IDs",
          why: "An author or post needs the same identity on every server, so a URL that points back to its home node works everywhere.",
        },
        {
          choice: "Accept every message shape partners sent",
          why: "Rejecting other teams' variations would have broken the network, so our inbox normalizes them instead.",
        },
      ],
      hardPart: {
        title: "Other teams' servers didn't talk like ours",
        body: "Partner nodes sent the same message in different shapes: an actor as a plain string instead of an object, inbox URLs with or without a trailing slash, follow acceptances in different formats. Follows got stuck as pending on one side. I made our inbox accept each variant, added a trailing-slash fallback when delivering, and wrote reconciliation so both servers end up agreeing.",
      },
      evidence: "91 of 335 commits, second-most, and 130+ automated tests",
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
      title: "Game engine and Galaga",
      oneLiner: "Wrote a 2D game engine in C++, then a complete Galaga on top of it.",
      tags: ["C++", "Game engine", "Solo"],
      context: "Game programming course",
      period: "Sep – Oct 2026",
      team: "Solo",
      role: "Engine systems and the whole game",
      problem:
        "Build a reusable 2D engine in modern C++ on SFML, then prove it works by writing a full Galaga that only talks to the engine's interfaces.",
      solution: [
        "Game loop with object lifecycles, input mapped to messages, update and late-update passes, collision detection and layered rendering.",
        "A publish/subscribe notification system on weak pointers that never keeps a destroyed object alive and stays safe when listeners change mid-delivery.",
        "Chained cubic Bézier curves for flight paths: three enemy types fly in, join a swaying formation and dive, in waves of 40.",
        "The game flow as a six-state machine: title, stage intro, waves, play, respawn and game over.",
      ],
      result: [
        "A complete, playable Galaga running entirely on the engine, shown in the clip.",
        "Fast bullets hit exactly where they should, every time.",
      ],
      decisions: [
        {
          choice: "Weak pointers in the notification system",
          why: "Subscribing should never keep an object alive, so a destroyed enemy simply stops receiving messages instead of leaking.",
        },
        {
          choice: "Swept line tests for bullets",
          why: "Overlap checks miss hits when something moves farther than its own size in one frame.",
        },
      ],
      hardPart: {
        title: "Bullets flying through enemies",
        body: "A bullet moves far enough in one frame to jump right over a small enemy, so an overlap check misses the hit. I treat each bullet's movement in a frame as a line segment, test it against enemy shapes and take the earliest contact point. Bullets now stop exactly where they hit and explode there.",
      },
      evidence: "Everything in the clip runs on the engine",
      commits: [
        { date: "2026-10-15", message: "Bullets: stop at exact hit point and explode; die with their shooter" },
        { date: "2026-10-15", message: "Enemies fly Bezier paths: 3 enemy types, 5 waves, formation, attacks" },
        { date: "2026-10-15", message: "Engine: narrow-phase shape collisions with directed-line hit points" },
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
        "Voice-first campus navigation for blind and low-vision students. I built the transit layer: Edmonton Transit's GTFS schedule, live arrival data, an on-bus monitor that announces stops, and weather alerts, plus QR routes for indoor navigation.",
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
        "Spots early signs of a migraine from a Muse 2 EEG headband and dims the lights through an Arduino. I built the machine learning pipeline: the EEG classifier, generative data augmentation for the small dataset, and the prediction script.",
      details: [],
      stack: ["Python", "PyTorch", "scikit-learn", "Muse 2 EEG", "Arduino"],
      period: "Nov 2025",
      context: "Hackathon, team of 4",
      repo: "https://github.com/sleepsonrockss/MigraineMinder",
    },
    {
      slug: "rag-pipeline",
      title: "RAG over research papers",
      summary:
        "Question answering grounded in the Transformer and BERT papers with OpenAI embeddings, FAISS and LangChain. I tested chunk sizes: 500-token chunks beat 200 (too fragmented) and 1,000 (too diluted), and the pipeline declines questions the papers don't cover.",
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
    "How did he deploy the ALTLab platform?",
    "Is he available for a summer internship?",
  ],
};

export type Profile = typeof profile;
