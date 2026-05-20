/**
 * Tecnologías destacadas — edita este archivo para agregar o quitar items.
 *
 * Para reemplazar un logo manualmente:
 * 1. Coloca tu SVG en `public/logos/` con el mismo nombre que `logoFile`
 * 2. Mantén viewBox y tamaño razonable (recomendado: 24x24 o 48x48)
 *
 * Si `logoFile` apunta a un archivo que no existe, se muestra el fallback con iniciales.
 */
export interface FeaturedTechItem {
  id: string;
  name: string;
  /** Nombre del archivo en public/logos/ (ej: "react.svg") */
  logoFile: string;
  category?: string;
}

export const featuredTechnologies: FeaturedTechItem[] = [
  { id: "react-native", name: "React Native", logoFile: "react-native.svg", category: "Mobile" },
  { id: "typescript", name: "TypeScript", logoFile: "typescript.svg", category: "Lenguaje" },
  { id: "react", name: "React", logoFile: "react.svg", category: "Frontend" },
  { id: "nextjs", name: "Next.js", logoFile: "nextjs.svg", category: "Frontend" },
  { id: "nodejs", name: "Node.js", logoFile: "nodejs.svg", category: "Backend" },
  { id: "redux", name: "Redux Toolkit", logoFile: "redux.svg", category: "Estado" },
  { id: "zustand", name: "Zustand", logoFile: "zustand.svg", category: "Estado" },
  { id: "tanstack-query", name: "TanStack Query", logoFile: "tanstack-query.svg", category: "Data" },
  { id: "firebase", name: "Firebase", logoFile: "firebase.svg", category: "Backend" },
  { id: "mongodb", name: "MongoDB", logoFile: "mongodb.svg", category: "Base de datos" },
  { id: "postgresql", name: "PostgreSQL", logoFile: "postgresql.svg", category: "Base de datos" },
  { id: "git", name: "Git", logoFile: "git.svg", category: "Herramientas" },
];
