export type AppTab = "home" | "projects" | "about" | "chat";

export interface Profile {
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly location: string;
  readonly phone: string;
  readonly available: boolean;
  readonly avatarSlot: string;
  readonly tags: readonly string[];
  readonly linkedin: string;
  readonly email: string;
}

export interface Stat {
  readonly prefix?: string;
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly sublabel: string;
  readonly description: string;
}

export interface Highlight {
  readonly icon: string;
  readonly title: string;
  readonly text: string;
}

export interface Job {
  readonly role: string;
  readonly company: string;
  readonly client?: string;
  readonly period: string;
  readonly location: string;
  readonly current?: boolean;
  readonly bullets: readonly string[];
  readonly stack: readonly string[];
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly client: string;
  readonly description: string;
  readonly role: string;
  readonly impact: string;
  readonly technologies: readonly string[];
  readonly featured?: boolean;
  readonly sector?: "fintech" | "enterprise" | "other";
}

export interface SkillGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export interface FeaturedTech {
  readonly id: string;
  readonly name: string;
  readonly logoFile: string;
  readonly category?: string;
}

export interface ContactItem {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly external: boolean;
}

export interface Education {
  readonly type: string;
  readonly title: string;
  readonly institution: string;
  readonly period: string;
  readonly location: string;
  readonly detail: string;
}

export interface Certification {
  readonly title: string;
  readonly institution: string;
  readonly period: string;
}

export interface Language {
  readonly lang: string;
  readonly level: string;
  readonly pct: number;
}
