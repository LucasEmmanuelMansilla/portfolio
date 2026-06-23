import type { Stat } from "@/src/types/portfolio";

export const stats: readonly Stat[] = [
  {
    prefix: "~",
    value: 100,
    suffix: "%",
    label: "Adopción biométrica",
    sublabel: "BanCo — Banco de Corrientes",
    description:
      "Face ID, Touch ID y huella digital con Apple Pay y Google Pay via Thales, Fiserv y Prisma.",
  },
  {
    prefix: "~",
    value: 10,
    suffix: "k",
    label: "Descargas en 3 meses",
    sublabel: "Pako Wallet — Billetera digital",
    description:
      "Lanzamiento en Centroamérica tras estabilizar performance, KYC y pagos digitales.",
  },
  {
    prefix: "+",
    value: 30,
    suffix: "%",
    label: "Conversión de onboarding",
    sublabel: "YPF Ruta — NTT Data",
    description:
      "Rediseño del flujo de registro para más de 10.000 transportistas en Argentina.",
  },
];
