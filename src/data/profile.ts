import type { Highlight, Profile } from "@/src/types/portfolio";

export const profile: Profile = {
  name: "Lucas Mansilla",
  firstName: "Lucas",
  lastName: "Mansilla",
  title: "Senior React Native Developer",
  subtitle: "Especialista en Fintech & Banca",
  summary:
    "5+ años en apps bancarias y billeteras digitales. Tokenización, Apple/Google Pay, biometría y onboarding KYC en producción.",
  location: "Argentina",
  phone: "+54 9 364 462-0191",
  available: true,
  avatarSlot: "/images/1743385238765.jpg",
  tags: [
    "Fintech",
    "Banca",
    "React Native",
    "Pagos digitales",
    "TypeScript",
    "Biometría",
  ],
  linkedin: "https://www.linkedin.com/in/lucasemansilla/",
  email: "lucas_e_93@hotmail.com",
};

export const aboutParagraphs: readonly string[] = [
  "Desarrollador mobile con más de 5 años construyendo aplicaciones bancarias, billeteras digitales y plataformas fintech en React Native y TypeScript.",
  "Especializado en tokenización de tarjetas (Thales, Fiserv, Prisma), Apple Pay, Google Pay, autenticación biométrica y flujos de onboarding con KYC.",
  "Experiencia end-to-end en apps de alto tráfico: desde la integración de APIs de pagos hasta el despliegue en tiendas y soporte en producción.",
];

export const highlights: readonly Highlight[] = [
  {
    icon: "shield",
    title: "Banca & pagos digitales",
    text: "Tokenización, Apple Pay, Google Pay y biometría en apps bancarias con miles de usuarios activos.",
  },
  {
    icon: "mobile",
    title: "Billeteras digitales",
    text: "Onboarding KYC, pagos, push notifications y lanzamiento multi-país en Centroamérica.",
  },
  {
    icon: "rocket",
    title: "Ciclo completo de producto",
    text: "Desde integración de APIs de pagos hasta despliegue en tiendas con soporte en producción.",
  },
  {
    icon: "users",
    title: "Liderazgo técnico",
    text: "Mentoría de devs junior, code reviews, documentación y refinamiento de requerimientos.",
  },
];
