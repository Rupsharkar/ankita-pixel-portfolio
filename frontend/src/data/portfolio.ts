export const profile = {
  name: "ANKITA SARKAR",
  handle: "ANKITA.EXE",
  tagline: "MCA · SRM IST",
  mission: "READY FOR HCL GUVI",
  location: "KOLKATA → CHENNAI",
  email: "as2332@srmist.edu.in",
  github: "https://github.com/Rupsarkar",
  linkedin: "https://www.linkedin.com/in/ankita-sarkar-6ba055262",
  resumeUrl:
    "https://customer-assets-7cd3h4nn.emergentagent.net/job_pixel-portfolio-mca/artifacts/zaefvdcp_ANKITA_SARKAR_RESUMEE.pdf",
};

export const heroLines = [
  { text: "ANKITA SARKAR", color: "text-neon-cyan", glow: "drop-shadow-[0_0_16px_rgba(6,182,212,0.75)]" },
  { text: "MCA · SRM IST '27", color: "text-neon-pink", glow: "drop-shadow-[0_0_16px_rgba(236,72,153,0.75)]" },
  { text: "READY FOR HCL GUVI", color: "text-pixel-yellow", glow: "drop-shadow-[0_0_16px_rgba(234,179,8,0.75)]" },
];

export const hudStats = [
  { label: "HP", value: "100/100" },
  { label: "LEVEL", value: "MCA · SRM IST" },
  { label: "CLASS", value: "DSA ALCHEMIST" },
  { label: "GUILD", value: "HAVELOC" },
  { label: "TARGET", value: "HCL GUVI" },
];

export const marqueeItems = [
  "HCL GUVI READY",
  "MCA · SRM IST · CLASS OF 2027",
  "SGPA 9.67",
  "C++ · PYTHON · JAVA · SQL",
  "OPEN TO WORK",
  "DIRECTOR'S AWARD 2025",
  "GESTURES. ML. IOT. NO CONTINUES NEEDED",
];

export const characterClasses = [
  {
    id: "alchemist",
    name: "DSA ALCHEMIST",
    color: "#06b6d4",
    weapon: "C++ · Data Structures",
    special: "O(LOG N) TRANSMUTATION",
    lore: "Transmutes messy problems into elegant algorithms. C++ is the weapon of choice, backed by deep OOP and DBMS fundamentals. Complexity analysis is the party trick; clean, readable code is the signature.",
  },
  {
    id: "mage",
    name: "ML MAGE",
    color: "#a855f7",
    weapon: "Python · Audio ML",
    special: "SCREAM-DETECTION SHIELD",
    lore: "Trains machines to hear danger. Built an ML scream-detection and emergency alert system using audio classification — safety-first engineering where every millisecond of response time matters.",
  },
  {
    id: "wizard",
    name: "BACKEND WIZARD",
    color: "#eab308",
    weapon: "Java · SQL · DBMS",
    special: "ZERO-N+1 INCANTATION",
    lore: "Summons normalized schemas and queries that never N+1. Strong foundation across Java, Python, SQL and DBMS — plus basic system design for when the raid boss is scale itself.",
  },
];

export const aboutSpecs = [
  { label: "DEGREE", value: "MCA — SRM IST, CHENNAI (2025–27 · SGPA 9.67)" },
  { label: "BCA", value: "IEM KOLKATA (2022–25 · CGPA 9.76)" },
  { label: "QUEST", value: "HR INTERN @ SYNTALIX.AI (MAR–JUL 2024)" },
  { label: "BASE", value: "KOLKATA → CHENNAI" },
  { label: "GUILD", value: "HAVELOC — APPLICATION ACTIVE" },
  { label: "TARGET", value: "HCL GUVI — ENTRY-LEVEL IT ROLES" },
  { label: "AWARDS", value: "DIRECTOR'S AWARD 2025 · DEBATE CHAMPION" },
  { label: "LANGUAGES", value: "EN / BN / HI" },
];

export const missionBrief =
  "MISSION BRIEF: HCL GUVI builds learning and hiring infrastructure for millions of developers. This candidate pairs a 9.67 SGPA with hands-on builds in gesture control, ML safety systems and IoT — plus the communication and teamwork stats of a proven coordinator. Ready to level up inside a technology-driven team.";

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
      { name: "Data Structures & Algorithms", xp: 90 },
      { name: "OOP", xp: 85 },
      { name: "DBMS & SQL", xp: 88 },
      { name: "Networks & System Design", xp: 74 },
    ],
  },
  {
    title: "LANGUAGES",
    color: "#06b6d4",
    skills: [
      { name: "C++", xp: 88 },
      { name: "Python", xp: 86 },
      { name: "Java", xp: 82 },
      { name: "SQL", xp: 85 },
    ],
  },
  {
    title: "BUILD & BEYOND",
    color: "#ec4899",
    skills: [
      { name: "Git & GitHub", xp: 84 },
      { name: "Machine Learning", xp: 74 },
      { name: "IoT & Sensors", xp: 72 },
      { name: "Communication & Teamwork", xp: 92 },
    ],
  },
];

export const combos = [
  "COMBO: C++ + DSA + OOP",
  "COMBO: PYTHON + ML + SQL",
  "BUFF ACTIVE: NPTEL PYTHON CERTIFIED",
  "PASSIVE: DIRECTOR'S AWARD 2025",
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
    title: "GESTURE LOGIC LAB",
    difficulty: "BOSS LEVEL",
    color: "#ef4444",
    tagline: "A digital logic lab you control with your bare hands.",
    description:
      "Interactive digital logic laboratory driven by hand gestures — simulate and operate logic gates in the air for a visual, intuitive way to learn digital electronics. Real-time gesture tracking drives gate switching and output states without touching a keyboard.",
    stack: ["Python", "Computer Vision", "Gesture Control", "Digital Electronics"],
    xp: "+4500 XP",
    demo: "#",
    repo: "https://github.com/Rupsarkar",
  },
  {
    level: 2,
    title: "SCREAM ALERT AI",
    difficulty: "INSANE",
    color: "#a855f7",
    tagline: "ML that hears danger and calls for help.",
    description:
      "Python-based machine learning model for scream detection with automated emergency alerts, built on audio classification. Designed for safety-first scenarios where every second of response time matters.",
    stack: ["Python", "Machine Learning", "Audio Classification", "Automation"],
    xp: "+5000 XP",
    demo: "#",
    repo: "https://github.com/Rupsarkar",
  },
  {
    level: 3,
    title: "SMART WEATHER STATION",
    difficulty: "HARD",
    color: "#06b6d4",
    tagline: "IoT sensors streaming the sky in real time.",
    description:
      "IoT-based real-time weather monitoring system using environmental sensors for live data collection and display — temperature, humidity and atmospheric readings piped straight to a live dashboard.",
    stack: ["IoT", "Sensors", "Embedded Systems", "Realtime Data"],
    xp: "+3200 XP",
    demo: "#",
    repo: "https://github.com/Rupsarkar",
  },
];

export const highScores = [
  { rank: "1ST", name: "YOU — READING THIS", score: "999999" },
  { rank: "2ND", name: "ANKITA SARKAR", score: "009867" },
  { rank: "3RD", name: "AVERAGE PORTFOLIO", score: "000000" },
];
