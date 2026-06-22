import type { Profile } from "@/src/types/portfolio";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucasmansilla.dev";

export function getSiteUrl(): string {
  return SITE_URL;
}

export function buildPersonJsonLd(profile: Profile): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    email: profile.email,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR",
      addressLocality: profile.location,
    },
    sameAs: [profile.linkedin],
    knowsAbout: [
      "React Native",
      "TypeScript",
      "Mobile Development",
      "Fintech",
      "Expo",
    ],
  };
}
