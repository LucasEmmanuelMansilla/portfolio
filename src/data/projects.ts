import type { Project } from "@/src/types/portfolio";

export const projects: readonly Project[] = [
  {
    id: "banco",
    name: "BanCo",
    client: "Banco de Corrientes",
    description:
      "App bancaria con tokenización de tarjetas, Apple Pay, Google Pay y autenticación biométrica nativa en dispositivos iOS y Android.",
    role: "React Native Developer",
    impact:
      "Casi 100% de adopción biométrica. Pagos digitales nativos habilitados con Thales, Fiserv y Prisma.",
    technologies: [
      "React Native",
      "TypeScript",
      "Thales",
      "Fiserv",
      "Prisma",
      "Apple Pay",
      "Google Pay",
    ],
    featured: true,
    sector: "fintech",
  },
  {
    id: "pako-wallet",
    name: "Pako Wallet",
    client: "Mobile Computing",
    description:
      "Billetera digital multi-país con onboarding KYC, pagos digitales, push notifications y estabilización completa para lanzamiento en tiendas.",
    role: "React Native Developer",
    impact:
      "~10.000 descargas en 3 meses en Centroamérica tras estabilizar performance, navegación y estado global.",
    technologies: [
      "React Native",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Jumio",
      "Firebase",
      "OneSignal",
    ],
    featured: true,
    sector: "fintech",
  },
  {
    id: "juntos-plus",
    name: "Juntos+",
    client: "Coca-Cola FEMSA",
    description:
      "App B2B de pedidos y promociones para distribuidores. Integración de agente IA conversacional, carrusel de promociones y venta fraccionada por unidad y por caja.",
    role: "Mobile Developer",
    impact:
      "Agente IA en producción respondiendo consultas de clientes. Nuevas funcionalidades de venta alineadas al roadmap comercial.",
    technologies: [
      "React Native",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Segment",
      "OneSignal",
      "Jumio",
      "Firebase",
    ],
    featured: true,
    sector: "enterprise",
  },
  {
    id: "ypf-ruta",
    name: "YPF Ruta",
    client: "NTT Data",
    description:
      "App logística para transportistas con onboarding optimizado, geolocalización, mapas, rutas y visualización de consumos de combustible.",
    role: "React Native Developer",
    impact:
      "+30% de conversión en onboarding para más de 10.000 transportistas activos.",
    technologies: [
      "React Native",
      "TypeScript",
      "Google Maps SDK",
      "Redux",
      "REST APIs",
    ],
    sector: "other",
  },
  {
    id: "playmatch",
    name: "PlayMatch",
    client: "DVS 360",
    description:
      "Plataforma móvil de reservas deportivas con emparejamiento inteligente, pagos integrados y geolocalización.",
    role: "React Native Developer",
    impact:
      "~90% menos partidos desbalanceados y ~80% menos cancelaciones administrativas.",
    technologies: [
      "React Native",
      "JavaScript",
      "Firebase",
      "Google Maps",
      "Redux",
    ],
    sector: "other",
  },
  {
    id: "masconet",
    name: "MascoNet",
    client: "ITR",
    description:
      "App de impacto social para búsqueda y devolución de mascotas perdidas con feed, geolocalización y notificaciones.",
    role: "React Native Developer",
    impact:
      "~50% de incremento en la tasa de mascotas recuperadas en áreas implementadas.",
    technologies: ["React Native", "Redux", "Node.js", "REST APIs"],
    sector: "other",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getFintechProjects(): readonly Project[] {
  return projects.filter((project) => project.sector === "fintech");
}

export function getOtherProjects(): readonly Project[] {
  return projects.filter((project) => project.sector !== "fintech");
}
