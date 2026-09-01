export const profile = {
  name: "AARAV MEHTA",
  handle: "AARAV.EXE",
  tagline: "MCA · FULL-STACK DEVELOPER",
  mission: "READY FOR HCL GUVI",
  location: "CHENNAI, IN",
  email: "aarav.codes@gmail.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  resumeUrl: "#",
};

export const heroLines = [
  { text: "AARAV MEHTA", color: "text-neon-cyan", glow: "drop-shadow-[0_0_16px_rgba(6,182,212,0.75)]" },
  { text: "MCA · FULL-STACK", color: "text-neon-pink", glow: "drop-shadow-[0_0_16px_rgba(236,72,153,0.75)]" },
  { text: "READY FOR HCL GUVI", color: "text-pixel-yellow", glow: "drop-shadow-[0_0_16px_rgba(234,179,8,0.75)]" },
];

export const hudStats = [
  { label: "HP", value: "100/100" },
  { label: "LEVEL", value: "MCA FINAL YEAR" },
  { label: "CLASS", value: "FULLSTACK KNIGHT" },
  { label: "GUILD", value: "HAVELOC" },
  { label: "TARGET", value: "HCL GUVI" },
];

export const marqueeItems = [
  "HCL GUVI READY",
  "MCA CLASS OF 2026",
  "FULL-STACK DEVELOPER",
  "OPEN TO WORK",
  "HAVELOC PROFILE ACTIVE",
  "SHIPS CODE. FIXES BUGS. NO CONTINUES NEEDED",
];

export const characterClasses = [
  {
    id: "knight",
    name: "FULLSTACK KNIGHT",
    color: "#06b6d4",
    weapon: "React 19 + FastAPI",
    special: "SHIPPED-TO-PROD SLASH",
    lore: "Front-line builder. Ships responsive React interfaces wired to production FastAPI backends. Believes a feature isn't done until it's deployed, measured, and delighting users.",
  },
  {
    id: "wizard",
    name: "BACKEND WIZARD",
    color: "#a855f7",
    weapon: "Python · Node · SQL",
    special: "ZERO-N+1 INCANTATION",
    lore: "Summons clean APIs, normalized schemas, and queries that never N+1. Comfortable across Python, Node, SQL and MongoDB — the backend is where the real magic happens.",
  },
  {
    id: "alchemist",
    name: "ALGO ALCHEMIST",
    color: "#eab308",
    weapon: "DSA · System Design",
    special: "O(LOG N) TRANSMUTATION",
    lore: "Transmutes messy problems into elegant algorithms. 500+ DSA problems solved, from arrays to graphs. Complexity analysis is the party trick; readable code is the signature.",
  },
];

export const aboutSpecs = [
  { label: "DEGREE", value: "MCA — MASTER OF COMPUTER APPLICATIONS" },
  { label: "BASE", value: "CHENNAI, INDIA" },
  { label: "GUILD", value: "HAVELOC — APPLICATION ACTIVE" },
  { label: "TARGET", value: "HCL GUVI — SOFTWARE ROLES" },
  { label: "STATUS", value: "OPEN TO WORK · IMMEDIATE" },
  { label: "LANGUAGES", value: "EN / TA / HI" },
];

export const missionBrief =
  "MISSION BRIEF: HCL GUVI builds learning and hiring infrastructure for millions of developers. This candidate ships full-stack features fast, learns faster, and treats every sprint like a boss fight — no continues required.";

export interface Skill {
  name: string;
  xp: number;
}

export interface SkillTree {
  title: string;
  color: string;
  skills: Skill[];
}

export const skillTrees: SkillTree[] = [
  {
    title: "CORE CS",
    color: "#10b981",
    skills: [
      { name: "Data Structures & Algorithms", xp: 86 },
      { name: "DBMS / SQL", xp: 90 },
      { name: "Operating Systems", xp: 78 },
      { name: "Computer Networks", xp: 74 },
    ],
  },
  {
    title: "FRONTEND",
    color: "#06b6d4",
    skills: [
      { name: "React / Next.js", xp: 88 },
      { name: "TypeScript", xp: 80 },
      { name: "Tailwind CSS", xp: 92 },
      { name: "Framer Motion", xp: 76 },
    ],
  },
  {
    title: "BACKEND & TOOLS",
    color: "#ec4899",
    skills: [
      { name: "Python / FastAPI", xp: 92 },
      { name: "Node.js / Express", xp: 84 },
      { name: "MongoDB / PostgreSQL", xp: 85 },
      { name: "Docker / Git / CI-CD", xp: 78 },
    ],
  },
];

export const combos = [
  "TRIPLE STACK COMBO: REACT + FASTAPI + MONGODB",
  "FULL COMBO: DOCKER + GIT + CI/CD PIPELINE",
  "COUNTER MOVE: DSA UNDER INTERVIEW PRESSURE",
  "BUFF ACTIVE: GUVI CERTIFICATION PATHS",
];

export interface Quest {
  level: number;
  title: string;
  difficulty: "BOSS LEVEL" | "HARD" | "INSANE";
  color: string;
  tagline: string;
  description: string;
  stack: string[];
  xp: string;
  demo: string;
  repo: string;
}

export const quests: Quest[] = [
  {
    level: 1,
    title: "ZENFLOW LMS",
    difficulty: "BOSS LEVEL",
    color: "#ef4444",
    tagline: "A GUVI-style learning platform with courses, quizzes and progress tracking.",
    description:
      "Full-stack learning management system: course builder, video lessons, timed quizzes with auto-grading, streak-based gamification, and an admin analytics dashboard. Role-based auth for students and mentors, with cohort progress heatmaps.",
    stack: ["React", "FastAPI", "MongoDB", "JWT", "Tailwind"],
    xp: "+4500 XP",
    demo: "#",
    repo: "https://github.com/your-username",
  },
  {
    level: 2,
    title: "PIXELPAY DASHBOARD",
    difficulty: "HARD",
    color: "#eab308",
    tagline: "Realtime payments analytics dashboard for a fintech case study.",
    description:
      "Transaction streaming pipeline with live-updating charts, fraud-flag heuristics, refund workflows, and CSV export. Built idempotent webhook handlers and reconciliation jobs that survive retries and out-of-order events.",
    stack: ["React", "Node.js", "PostgreSQL", "Recharts", "Docker"],
    xp: "+3200 XP",
    demo: "#",
    repo: "https://github.com/your-username",
  },
  {
    level: 3,
    title: "RETROSIGHT AI",
    difficulty: "INSANE",
    color: "#a855f7",
    tagline: "ML sentiment engine that reads 10k product reviews in seconds.",
    description:
      "End-to-end NLP service: scrapes reviews, runs a fine-tuned sentiment classifier, clusters complaints by theme, and serves a explainable summary API. Containerized with Docker and deployed behind a FastAPI gateway with request caching.",
    stack: ["Python", "scikit-learn", "FastAPI", "Docker", "Redis"],
    xp: "+5000 XP",
    demo: "#",
    repo: "https://github.com/your-username",
  },
  {
    level: 4,
    title: "QUESTBOARD",
    difficulty: "HARD",
    color: "#06b6d4",
    tagline: "Multiplayer realtime kanban — drag, drop, and watch everyone move.",
    description:
      "Realtime collaboration board with WebSocket sync, presence indicators, optimistic drag-and-drop, conflict-free card ordering, and room-based permissions. Sub-100ms update latency across concurrent sessions.",
    stack: ["React", "WebSockets", "Redis", "MongoDB", "TypeScript"],
    xp: "+3800 XP",
    demo: "#",
    repo: "https://github.com/your-username",
  },
];

export const highScores = [
  { rank: "1ST", name: "YOU — READING THIS", score: "999999" },
  { rank: "2ND", name: "THIS CANDIDATE", score: "000002" },
  { rank: "3RD", name: "AVERAGE PORTFOLIO", score: "000000" },
];
