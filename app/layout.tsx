import type { Metadata } from "next";
import { Bebas_Neue, Fira_Code, Karla } from "next/font/google";
import { AppProviders } from "@/src/providers/AppProviders";
import { getSiteUrl } from "@/src/lib/seo";
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

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = getSiteUrl();
const title = "Lucas Mansilla | Senior React Native Developer";
const description =
  "Portfolio inmersivo de Lucas Mansilla — 5+ años construyendo apps móviles de alto impacto en React Native, TypeScript y fintech.";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "React Native",
    "TypeScript",
    "Senior Mobile Developer",
    "Fintech",
    "Expo",
    "Argentina",
    "Lucas Mansilla",
  ],
  authors: [{ name: "Lucas Mansilla" }],
  creator: "Lucas Mansilla",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Lucas Mansilla Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${bebasNeue.variable} ${karla.variable} ${firaCode.variable} h-full`}
    >
      <body className="min-h-full w-full overflow-x-hidden bg-bg text-text antialiased font-karla">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
