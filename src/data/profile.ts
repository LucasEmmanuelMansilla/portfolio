import type { Highlight, Profile } from "@/src/types/portfolio";

export const profile: Profile = {
  name: "Lucas Mansilla",
  firstName: "Lucas",
  lastName: "Mansilla",
  title: "Senior React Native Developer",
  subtitle: "Full Stack Developer",
  summary:
    "5+ años construyendo aplicaciones móviles de alto tráfico en fintech, banca y billeteras digitales. Especializado en onboarding, biometría, tokenización y pagos.",
  location: "Argentina",
  phone: "+54 9 364 462-0191",
  available: true,
  avatarSlot: "",
  tags: [
    "React Native",
    "TypeScript",
    "Fintech",
    "Mobile Apps",
    "Zustand",
    "Node.js",
  ],
  linkedin: "https://www.linkedin.com/in/lucasemansilla/",
  email: "lucas_e_93@hotmail.com",
};

export const aboutParagraphs: readonly string[] = [
  "Soy un Full Stack Developer con más de 5 años de experiencia construyendo, optimizando y escalando aplicaciones móviles en TypeScript y React Native.",
  "Trabajé en proyectos de alto impacto en fintech, banca, logística y billeteras virtuales, participando en todo el ciclo: desarrollo de nuevas funcionalidades, estabilización de aplicaciones críticas, mejora de performance y despliegues a tiendas.",
  "Mi fortaleza está en resolver problemas técnicos complejos, mejorar la experiencia del usuario final y asegurar aplicaciones robustas en entornos con miles de usuarios activos.",
];

export const highlights: readonly Highlight[] = [
  {
    icon: "mobile",
    title: "Apps móviles de alto tráfico",
    text: "Fintech, banca, logística y billeteras virtuales con miles de usuarios activos.",
  },
  {
    icon: "shield",
    title: "Seguridad y pagos digitales",
    text: "Tokenización (Thales, Fiserv, Prisma), Apple Pay, Google Pay y autenticación biométrica.",
  },
  {
    icon: "rocket",
    title: "Ciclo completo de producto",
    text: "Desde el diseño funcional hasta el despliegue en tiendas con soporte en producción.",
  },
  {
    icon: "users",
    title: "Liderazgo técnico",
    text: "Mentoría de devs junior, code reviews, documentación y refinamiento de requerimientos.",
  },
];
