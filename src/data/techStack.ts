import type {
  Certification,
  Education,
  FeaturedTech,
  Language,
  SkillGroup,
} from "@/src/types/portfolio";

export const skillGroups: readonly SkillGroup[] = [
  {
    category: "Core Mobile",
    items: [
      "React Native",
      "TypeScript",
      "JavaScript",
      "React Navigation",
      "Expo",
    ],
  },
  {
    category: "State & Data",
    items: ["Redux Toolkit", "Zustand", "TanStack Query", "Context API", "Redux"],
  },
  {
    category: "Web & Backend",
    items: ["React", "Next.js", "Node.js", "REST APIs", "Firebase", "GraphQL"],
  },
  {
    category: "Pagos & Seguridad",
    items: [
      "Apple Pay",
      "Google Pay",
      "Thales",
      "Fiserv",
      "Prisma",
      "Face ID / Touch ID",
      "Biometrics",
      "Jumio (KYC)",
    ],
  },
  {
    category: "Analytics & Push",
    items: ["Segment", "OneSignal", "Branch.io", "Firebase Analytics"],
  },
  {
    category: "Mapas & Geo",
    items: ["Google Maps SDK", "Geolocation API"],
  },
  {
    category: "Bases de datos",
    items: ["MongoDB", "PostgreSQL", "Firebase Firestore"],
  },
  {
    category: "Herramientas",
    items: ["Git", "GitHub", "GitLab", "Jira", "Confluence", "VS Code", "CI/CD"],
  },
  {
    category: "Metodologías",
    items: ["Scrum", "Agile", "Code Review", "CI/CD", "Mentoría"],
  },
];

export const featuredTechnologies: readonly FeaturedTech[] = [
  { id: "react-native", name: "React Native", logoFile: "react-native.svg", category: "Mobile" },
  { id: "typescript", name: "TypeScript", logoFile: "typescript.svg", category: "Lenguaje" },
  { id: "expo", name: "Expo", logoFile: "react-native.svg", category: "Mobile" },
  { id: "zustand", name: "Zustand", logoFile: "zustand.svg", category: "Estado" },
  { id: "tanstack-query", name: "TanStack Query", logoFile: "tanstack-query.svg", category: "Data" },
  { id: "firebase", name: "Firebase", logoFile: "firebase.svg", category: "Backend" },
  { id: "nodejs", name: "Node.js", logoFile: "nodejs.svg", category: "Backend" },
  { id: "nextjs", name: "Next.js", logoFile: "nextjs.svg", category: "Frontend" },
  { id: "git", name: "Git", logoFile: "git.svg", category: "Herramientas" },
];

export const languages: readonly Language[] = [
  { lang: "Español", level: "Nativo", pct: 100 },
  { lang: "Inglés", level: "Básico — lectura técnica", pct: 35 },
];

export const education: readonly Education[] = [
  {
    type: "degree",
    title: "Ingeniería en Sistemas",
    institution: "UNCAus — Universidad Nacional del Chaco Austral",
    period: "2021 – Actualidad",
    location: "Chaco, Argentina",
    detail: "Actualmente cursando 4.º año de la carrera.",
  },
];

export const certifications: readonly Certification[] = [
  {
    title: "Desarrollador Web Full Stack MERN / Mobile Apps",
    institution: "MindHub LA",
    period: "2021",
  },
  {
    title: "Node.js Esencial",
    institution: "LinkedIn Learning",
    period: "2021",
  },
];
