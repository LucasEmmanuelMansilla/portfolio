"use client";

import { Building2, Wallet } from "lucide-react";
import { SafeArea } from "@/src/components/layout/SafeArea";
import {
  NativeListRow,
  NativeListSection,
} from "@/src/features/portfolio/components/NativeList";
import {
  getFintechProjects,
  getOtherProjects,
} from "@/src/data/projects";
import { useAppNavStore } from "@/src/store/appNavStore";

const PROJECT_ICONS = {
  banco: Building2,
  "pako-wallet": Wallet,
} as const;

export function ProjectsScreen() {
  const openProject = useAppNavStore((state) => state.openProject);
  const fintechProjects = getFintechProjects();
  const otherProjects = getOtherProjects();

  return (
    <SafeArea className="flex min-h-0 flex-1 flex-col" bottom={false}>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <NativeListSection
          title="Banca & Fintech"
          footer="Tokenización, pagos digitales, biometría y billeteras multi-país."
          className="pt-2"
        >
          {fintechProjects.map((project, index) => {
            const Icon =
              PROJECT_ICONS[project.id as keyof typeof PROJECT_ICONS] ??
              Building2;

            return (
              <NativeListRow
                key={project.id}
                label={project.name}
                value={project.client}
                detail={project.description}
                icon={<Icon className="h-4 w-4" />}
                onClick={() => openProject(project.id)}
                isLast={index === fintechProjects.length - 1}
              />
            );
          })}
        </NativeListSection>

        <NativeListSection title="Otros proyectos" className="pt-6 pb-2">
          {otherProjects.map((project, index) => (
            <NativeListRow
              key={project.id}
              label={project.name}
              value={project.client}
              onClick={() => openProject(project.id)}
              isLast={index === otherProjects.length - 1}
            />
          ))}
        </NativeListSection>
      </div>
    </SafeArea>
  );
}
