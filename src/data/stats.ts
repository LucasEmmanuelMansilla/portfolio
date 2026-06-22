import type { Stat } from "@/src/types/portfolio";

export const stats: readonly Stat[] = [
  {
    prefix: "+",
    value: 30,
    suffix: "%",
    label: "Conversión de onboarding",
    sublabel: "YPF Ruta — NTT Data",
    description:
      "Rediseño completo del flujo de registro para más de 10.000 transportistas en Argentina.",
  },
  {
    prefix: "~",
    value: 100,
    suffix: "%",
    label: "Adopción biométrica",
    sublabel: "BanCo — Flux IT",
    description:
      "Face ID, Touch ID y huella digital integrados con Apple Pay y Google Pay via Thales, Fiserv y Prisma.",
  },
  {
    prefix: "~",
    value: 10,
    suffix: "k",
    label: "Descargas en 3 meses",
    sublabel: "Pako Wallet — Mobile Computing",
    description:
      "Lanzamiento a producción en múltiples países de Centroamérica tras estabilizar la app desde cero.",
  },
];
