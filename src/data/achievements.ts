import type { Highlight } from "@/src/types/portfolio";
import { highlights } from "@/src/data/profile";
import { stats } from "@/src/data/stats";

export interface Achievement {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
}

export const achievements: readonly Achievement[] = [
  ...stats.map((stat) => ({
    id: `stat-${stat.label}`,
    title: `${stat.prefix ?? ""}${stat.value}${stat.suffix} ${stat.label}`,
    subtitle: stat.sublabel,
    description: stat.description,
  })),
  ...highlights.map((item: Highlight) => ({
    id: `highlight-${item.title}`,
    title: item.title,
    subtitle: "Fortaleza clave",
    description: item.text,
  })),
];

export const resumeAssetPath = "/LUCAS MANSILLA - React Native Developer.pdf";
