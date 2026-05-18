import type { Metadata } from "next";
import { Bebas_Neue, Karla } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lucas Mansilla | React Native Developer",
  description:
    "Full Stack Developer con más de 5 años de experiencia construyendo apps móviles de alto impacto en TypeScript, React Native y fintech.",
  keywords: [
    "React Native",
    "TypeScript",
    "Full Stack Developer",
    "Mobile Developer",
    "Fintech",
    "Argentina",
  ],
  openGraph: {
    title: "Lucas Mansilla | React Native Developer",
    description:
      "Full Stack Developer especializado en apps móviles de alto tráfico: onboarding, biometría, tokenización y pagos digitales.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${karla.variable} h-full`}
    >
      <body className="min-h-full bg-[#060810] text-white antialiased font-karla">
        {children}
      </body>
    </html>
  );
}
