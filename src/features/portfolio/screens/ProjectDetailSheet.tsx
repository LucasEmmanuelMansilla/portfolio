"use client";

import { Sheet } from "@/src/components/ui/Sheet";
import {
  NativeListRow,
  NativeListSection,
} from "@/src/features/portfolio/components/NativeList";
import { getProjectById } from "@/src/data/projects";
import { useAppNavStore } from "@/src/store/appNavStore";

export function ProjectDetailSheet() {
  const openProjectId = useAppNavStore((state) => state.openProjectId);
  const closeProject = useAppNavStore((state) => state.closeProject);
  const project = openProjectId ? getProjectById(openProjectId) : undefined;

  return (
    <Sheet open={Boolean(project)} onClose={closeProject} title={project?.name}>
      {project && (
        <div className="pb-6 pt-1">
          <h2 className="px-5 text-[18px] font-bold text-ios-label">{project.name}</h2>
          <p className="mt-1 px-5 text-[13px] text-ios-label-secondary">
            {project.client}
            {project.sector === "fintech" && (
              <span className="ml-2 font-medium text-ios">· Fintech</span>
            )}
          </p>

          <NativeListSection title="Detalle" className="mt-4">
            <NativeListRow
              label="Rol"
              value={project.role}
              showChevron={false}
            />
            <NativeListRow
              label="Descripción"
              detail={project.description}
              showChevron={false}
            />
            <NativeListRow
              label="Impacto"
              detail={project.impact}
              showChevron={false}
              isLast
            />
          </NativeListSection>

          <NativeListSection title="Tecnologías" className="mt-6">
            {project.technologies.map((tech, index) => (
              <NativeListRow
                key={tech}
                label={tech}
                showChevron={false}
                isLast={index === project.technologies.length - 1}
              />
            ))}
          </NativeListSection>
        </div>
      )}
    </Sheet>
  );
}
