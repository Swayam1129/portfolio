// Everything about you lives here. Edit this file to change the site.
// The chat on the site answers ONLY from this file, so keep it accurate:
// anything written here, the chat will repeat to recruiters.
// Commit counts exclude merge commits. "Lines" are lines still in each project's final code
// (git blame, whitespace ignored), checked against the repositories in October 2026.

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
  linesMine: number;
  linesTotal: number;
  rank?: string;
  period: string;
};

export type Shot = { src: string; alt: string; caption: string; frame: "browser" | "phone" | "plain" };

export type Testimonial = { quote: string; name: string; role: string };

export type CaseStudy = {
  slug: string;
  title: string;
  oneLiner: string;
  tags: string[];
  context: string;
  period: string;
  team: string;
  role: string;
  /** Big numbers shown in the story, all measured from the repository. */
  stats: { value: string; label: string }[];
  problem: string;
  solution: string[];
  result: string[];
  decisions: { choice: string; why: string }[];
  hardPart: { title: string; body: string };
  evidence: string;
  commits: Commit[];
  stack: string[];
  visual: "galaga" | "cree-architecture" | "federation" | "eventease" | "accessu";
  /** Real screenshots. When present they're shown instead of the diagram in the scroll story. */
  shots?: Shot[];
  links: { label: string; href: string }[];
  note?: string;
};

export const profile = {
  name: "Swayam Sagar",
  role: "Computing Science, University of Alberta",
  headline: "From a blank repo to production.",
  intro:
    "I'm a Computing Science student at the University of Alberta. I've taken a client's language platform live, built most of an Android app's organizer side and backend, and written a C++ game engine. I'm looking for a Summer 2027 software or ML internship.",
  manifesto:
    "I like owning the parts that make a project real: the deploy pipeline, the backend that has to work when nobody is watching, the bug that only shows up on another team's server. Across five team projects I've written over 39,000 lines that are still in the final code.",
  // Shown in the middle of the launch sequence, after the headline flies past.
  arrival: ["Five team projects. 39,000 of my lines in the final code.", "Here's what I built."],
  manifestoHighlights: ["deploy pipeline", "backend", "another team's server", "39,000 lines"],
  location: "Edmonton, Alberta",
  seeking: "Software engineering and AI/ML internships, Summer 2027",
  email: "swayam2@ualberta.ca",
  site: "https://swayamsagar.vercel.app",
  github: "https://github.com/Swayam1129",
  githubUser: "Swayam1129",
  linkedin: "https://www.linkedin.com/in/swayam-sagar-948323256",
  resume: "", // put resume.pdf in /public, then set this to "/resume.pdf"

  tools: ["Docker", "GitHub Actions", "PostgreSQL", "SvelteKit", "TypeScript", "Firebase", "Java", "Android", "Kotlin", "Django", "Python", "C++", "PyTorch", "Caddy", "Playwright", "Heroku"],

  // Add 2-3 real quotes from a TA, teammate or the ALTLab client. The section appears once this has entries.
  testimonials: [] as Testimonial[],

  ledger: [
    { project: "EventEase", slug: "eventease", kind: "Android app", team: 6, mine: 58, total: 269, linesMine: 21135, linesTotal: 54876, rank: "2nd", period: "2025" },
    { project: "Social Distribution", slug: "social-distribution", kind: "Federated web app", team: 5, mine: 91, total: 335, linesMine: 6851, linesTotal: 26324, rank: "2nd", period: "2026" },
    { project: "Plains Cree Reader", slug: "plains-cree-reader", kind: "Client project", team: 7, mine: 66, total: 238, linesMine: 3631, linesTotal: 24929, rank: "1st", period: "2026" },
    { project: "AccessU", slug: "accessu", kind: "Hackathon", team: 3, mine: 6, total: 17, linesMine: 3278, linesTotal: 5870, rank: "1st", period: "2026" },
    { project: "MigraineMinder", kind: "Hackathon", team: 4, mine: 3, total: 58, linesMine: 4125, linesTotal: 13681, period: "2025" },
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
      slug: "eventease",
      title: "EventEase",
      oneLiner: "Built most of the organizer app, the backend that runs its lottery, and nearly half its tests.",
      tags: ["Android", "Backend", "Testing"],
      context: "Android event app, software engineering course",
      period: "Sep – Dec 2025",
      team: "6 developers",
      role: "Organizer app, Cloud Functions backend, notifications, device login and 45% of the test suite",
      stats: [
        { value: "21,135", label: "lines I wrote in the final app, 38% of it" },
        { value: "211", label: "of the team's 465 automated tests" },
        { value: "95%", label: "of the Cloud Functions backend" },
      ],
      problem:
        "Popular events fill up. Organizers needed to create events, run a fair lottery from the waitlist, invite people with a deadline and tell everyone else, while entrants needed to sign up without friction and hear back without refreshing the app.",
      solution: [
        "Built most of the organizer side: creating and editing events with capacity, sample size, deadlines and posters, an events dashboard, entrants grouped by status, waitlist management, and a map of where entrants signed up from.",
        "Wrote the Firebase Cloud Functions backend: push notifications through Firebase Cloud Messaging in batches with retries and dead-token cleanup, the scheduled lottery that draws entrants at random, and 'sorry' notices for everyone not chosen.",
        "Built the invitation flow around it: response deadlines that expire on time, replacement draws when someone declines, and the app's notification channels and device tokens.",
        "Built onboarding and sign-in: device-based login instead of passwords, profile setup, and a staged flow that explains and requests location and notification permissions.",
        "Wrote 211 of the team's 465 tests: unit, integration, edge-case, user-story and full end-to-end workflow tests.",
      ],
      result: [
        "Organizers run an event from creation to final guest list without leaving the app, and entrants are told at every step automatically.",
        "The lottery can never invite more people than an event has room for.",
        "21,135 of the 54,876 lines in the final codebase are mine, and so are 211 of its 465 tests.",
      ],
      decisions: [
        {
          choice: "Send notifications from Cloud Functions, not the app",
          why: "A server-side trigger fires whenever a notification is written, so messages go out even when the organizer's or entrant's app is closed.",
        },
        {
          choice: "Device-based login instead of passwords",
          why: "Entrants stay signed in on their phone without managing another password, which matters for a sign-up-and-forget app.",
        },
      ],
      hardPart: {
        title: "Never invite more people than there are spots",
        body: "The lottery runs on a schedule, and entrants can decline or be replaced, so drawing the full sample size each time could over-invite. Each run counts who is already selected, draws only the open spots with a fair shuffle, and checks the total again before writing.",
      },
      evidence: "21,135 lines (38% of the app) and 211 of 465 tests",
      commits: [
        { date: "2025-10-26", message: "Add Base Android Project" },
        { date: "2025-11-06", message: "created organizer , create, oragnizer_event, organizer_account functionality" },
        { date: "2025-11-21", message: "Added Notification Functionality , testing left" },
        { date: "2025-11-26", message: "added test for workflow" },
      ],
      stack: ["Java", "Android", "Firebase Cloud Functions", "Node.js", "Firestore", "Firebase Cloud Messaging", "Google Maps", "JUnit"],
      visual: "eventease",
      links: [{ label: "Source code", href: "https://github.com/RISCVI-301/CMPUT301F25riscvi" }],
    },
    {
      slug: "plains-cree-reader",
      title: "Plains Cree Reader",
      oneLiner: "Took a client's reading platform from laptops to a live, tested production site, and wired it to their corpus API.",
      tags: ["DevOps", "Backend", "Client work"],
      context: "Client project for ALTLab (Alberta Language Technology Lab)",
      period: "Sep 2026 – present",
      team: "7 developers",
      role: "Deployment and CI/CD owner, Korp API integration, Scrum Master for sprints 2 and 3",
      stats: [
        { value: "66", label: "of the team's 238 commits, the most of anyone" },
        { value: "8", label: "automated checks on every pull request" },
        { value: "1 click", label: "to release to production" },
      ],
      problem:
        "ALTLab's Plains Cree texts lived in Korp, a corpus-search tool built for linguists. Learners had no simple way to read a story, tap a word and see what it means, and our team's app only ran on our own laptops.",
      solution: [
        "Researched ALTLab's Korp corpus API, documented how it behaves, and wrote the app's server-side client for searching, loading texts and listing collections, with unit tests.",
        "Packaged the SvelteKit app in a multi-stage Docker image and wrote a Compose stack with PostgreSQL and Caddy for automatic HTTPS, on two self-hosted Cybera servers for staging and production.",
        "Built CI on a self-hosted GitHub Actions runner: 8 automated checks on every pull request, including lint, type-checking, unit tests and the team's 250+ Playwright end-to-end tests on Chromium and WebKit.",
        "Added CD: staging deploys itself when CI passes on main and is smoke-tested right after; production deploys with one click.",
        "Built reader and search features, wrote user-story end-to-end tests, drew the UML class and sequence diagrams, and kept the traceability matrix for all 54 user stories.",
      ],
      result: [
        "The team went from laptops only to live staging and production sites over HTTPS.",
        "Every change is tested automatically before it can merge, and a release is one click.",
        "Most commits on the team: 66 of 238.",
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
      evidence: "66 of 238 commits, the most on the team",
      commits: [
        { date: "2026-10-18", message: "ci: add CD (auto-deploy staging after CI, manual deploy to production)" },
        { date: "2026-10-18", message: "build: add multi-stage Dockerfile for the app" },
        { date: "2026-10-18", message: "feat: search several collections at once" },
        { date: "2026-10-12", message: "fix: find dictionary entries spelled with ý (e.g. ayamihêwiýiniwak) when the text uses y" },
      ],
      stack: ["SvelteKit", "TypeScript", "PostgreSQL", "Docker", "Caddy", "GitHub Actions", "Playwright"],
      visual: "cree-architecture",
      links: [],
      note: "The code belongs to the course organization, so the repository isn't public.",
    },
    {
      slug: "social-distribution",
      title: "Social Distribution",
      oneLiner: "Built the follow system, API and federation that let our servers share a social network with other teams'.",
      tags: ["Full-stack", "REST APIs", "Distributed systems"],
      context: "Federated social network, web applications course",
      period: "Jan – Apr 2026",
      team: "5 developers, each running their own server",
      role: "Authors API, follow system, frontend pages, API design, auth, deployment and federation",
      stats: [
        { value: "6,851", label: "lines I wrote in the final code" },
        { value: "2,750", label: "lines of automated tests" },
        { value: "91", label: "commits, second-most on the team" },
      ],
      problem:
        "Each of us ran a separate server, and servers built by other teams had to exchange authors, posts, follows and likes with ours. There was no shared database to fall back on.",
      solution: [
        "Built the Authors API and the whole follow system: request, accept and deny flows, followers and following endpoints, and Feed and Friends filters on the stream.",
        "Built the frontend for it: the Manage Connections page, the follow-request panel, profile tabs, and live updates that refresh when a remote server accepts a follow.",
        "Standardized the REST API after TA review so every author, post, comment and like has one fully qualified ID that works across servers, with consistent field names.",
        "Added token authentication and an admin approval step for new sign-ups, stopped double-clicks from creating duplicate posts, and deployed my node on Heroku with PostgreSQL.",
        "Built federation: cross-server follows and unfollows, remote post and image sync with background commands, and peer checks so only trusted servers' posts appear.",
      ],
      result: [
        "Our five nodes and partner teams' nodes exchange follows and posts, and both sides agree on who follows whom.",
        "2,750 lines of tests cover the API, auth and follow flows.",
        "6,851 lines in the final code are mine, 26% of it.",
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
      evidence: "6,851 lines (26%), 2,750 lines of tests, 91 commits",
      commits: [
        { date: "2026-03-07", message: "feat(follow): add web UI for follow/unfollow and approve/deny" },
        { date: "2026-03-21", message: "feat(api-auth): add token authentication endpoint and DRF token auth defaults with basic token obtain tests" },
        { date: "2026-03-24", message: "vfeat(web): poll follow_status and reload when remote accepts" },
        { date: "2026-03-30", message: "fix(federation): try trailing-slash inbox fallback for remote follow delivery" },
      ],
      stack: ["Python", "Django", "Django REST Framework", "PostgreSQL", "JavaScript", "Heroku"],
      visual: "federation",
      shots: [
        { src: "/work/sd-stream.webp", alt: "Social Distribution stream with posts from followed authors and a follow request waiting for approval", caption: "The stream, with a follow request waiting", frame: "browser" },
        { src: "/work/sd-connections.webp", alt: "Manage Connections page listing follow requests, following, sent requests and followers", caption: "Manage Connections, which I built", frame: "browser" },
        { src: "/work/sd-profile.webp", alt: "An author profile page with posts and follower counts", caption: "An author profile", frame: "browser" },
      ],
      links: [{ label: "Source code", href: "https://github.com/Swayam1129/w26-socialdistribution-turquoise" }],
      note: "Screenshots are from the app running locally with demo accounts.",
    },
    {
      slug: "accessu",
      title: "AccessU",
      oneLiner: "Wrote most of a voice-first navigation app that guides blind and low-vision students across campus.",
      tags: ["Android", "Accessibility", "Hackathon"],
      context: "Hackathon project",
      period: "Feb 2026",
      team: "3 developers",
      role: "Indoor and outdoor navigation, camera QR routing and transit",
      stats: [
        { value: "56%", label: "of the final code, the most on the team" },
        { value: "3,278", label: "lines of Kotlin and route data" },
        { value: "4 days", label: "from first commit to demo" },
      ],
      problem:
        "Campus maps and signs assume you can see them. Blind and low-vision students often need someone to help them find the right entrance, follow a corridor or catch the right bus.",
      solution: [
        "Built indoor navigation: buildings modelled as graphs of QR checkpoints, a shortest-path router, and spoken step-by-step directions that reroute when you scan a wrong-path code.",
        "Built camera navigation that scans the QR checkpoints and verifies you're on the right path.",
        "Built outdoor campus routing with Google Directions, geocoding and place search, plus a campus graph of buildings.",
        "Built the transit layer: Edmonton Transit's GTFS schedule, live arrivals, an on-bus monitor that announces stops, and weather alerts.",
      ],
      result: [
        "A working, hands-free demo that routes from one campus building to another, indoors and out.",
        "I wrote 56% of the final code, more than anyone else on the team.",
      ],
      decisions: [
        {
          choice: "QR checkpoints for indoor positioning",
          why: "GPS doesn't work well inside buildings, and printed QR codes are cheap, precise and easy for a phone camera to find.",
        },
        {
          choice: "Shortest path over a building graph",
          why: "Treating each checkpoint as a node makes rerouting instant: scan any code and the app recomputes the route from there.",
        },
      ],
      hardPart: {
        title: "Getting lost has to be recoverable",
        body: "A wrong turn is normal, so the app can't assume people follow the route perfectly. Every QR code is a node in the building graph; scanning one the route didn't expect simply becomes the new starting point, and the app speaks the corrected directions.",
      },
      evidence: "3,278 of 5,870 lines, 56% of the app",
      commits: [
        { date: "2026-02-20", message: "feat: transit + weather – GTFS, ETS Realtime, OnBusMonitor, WeatherService" },
        { date: "2026-02-20", message: "app folder" },
        { date: "2026-02-24", message: "Added ReadMe" },
      ],
      stack: ["Kotlin", "Android", "Jetpack Compose", "CameraX", "Google Maps SDK", "GTFS"],
      visual: "accessu",
      links: [{ label: "Source code", href: "https://github.com/Swayam1129/routecause_AccessU" }],
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
      stats: [
        { value: "40", label: "enemies per wave, on Bézier flight paths" },
        { value: "6", label: "game states in the state machine" },
        { value: "0", label: "bullets that tunnel through targets" },
      ],
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
        "Own deployment, CI/CD and the corpus API integration for a Plains Cree reading platform; Scrum Master for sprints 2 and 3 in a team of seven.",
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
    Languages: ["Python", "Java", "TypeScript", "JavaScript", "Kotlin", "C++", "C", "SQL", "Bash"],
    "Web and backend": ["SvelteKit", "Next.js", "React", "Django REST Framework", "Node.js", "REST APIs", "PostgreSQL", "Firebase"],
    "Infrastructure and testing": ["Docker", "GitHub Actions", "Caddy", "Linux servers", "Heroku", "Playwright", "JUnit"],
    "Machine learning": ["PyTorch", "scikit-learn", "LangChain", "FAISS", "OpenAI API"],
  } as Record<string, string[]>,

  // Smaller projects. Editable in /admin once the database is seeded.
  projects: [
    {
      slug: "migraineminder",
      title: "MigraineMinder",
      summary:
        "Spots early signs of a migraine from a Muse 2 EEG headband and dims the lights through an Arduino. I wrote the machine learning side, about 4,100 lines: five model families for EEG signals (1D CNN, LSTM, CNN-LSTM, Transformer and a CNN-LSTM-Transformer hybrid), a classifier and generative data augmentation for the small dataset.",
      details: [],
      stack: ["Python", "PyTorch", "scikit-learn", "Muse 2 EEG"],
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
      summary: "Renders Mandelbrot and Julia set fractals in C at deep zoom levels, written out as images. The pictures in the gallery above are its output.",
      details: [],
      stack: ["C"],
      period: "Oct 2024",
      repo: "https://github.com/Swayam1129/MandelBrot-and-Julia-Set",
    },
  ] as Project[],

  // Real images for the horizontal gallery. Add your own screenshots here.
  gallery: [
    { src: "/work/galaga-poster.webp", alt: "Galaga running on my C++ engine", caption: "Galaga on my C++ engine" },
    { src: "/work/sd-stream.webp", alt: "Social Distribution stream", caption: "Social Distribution, the stream" },
    { src: "/work/fractal-13.webp", alt: "Deep zoom into the Mandelbrot set", caption: "Mandelbrot, deep zoom" },
    { src: "/work/sd-connections.webp", alt: "Social Distribution connections page", caption: "Manage Connections" },
    { src: "/work/fractal-16.webp", alt: "A Julia set fractal", caption: "Julia set" },
    { src: "/work/fractal-12.webp", alt: "Mandelbrot set at a 3,000,000x zoom", caption: "Mandelbrot at 3,000,000x" },
  ],

  suggestedQuestions: [
    "What did Swayam build for EventEase?",
    "How did he deploy the ALTLab platform?",
    "Is he available for a summer internship?",
  ],
};

export type Profile = typeof profile;
