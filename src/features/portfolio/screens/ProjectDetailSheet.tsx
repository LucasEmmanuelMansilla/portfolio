"use client";

import { Sheet } from "@/src/components/ui/Sheet";
import { Tag } from "@/src/components/ui/Tag";
import { getProjectById } from "@/src/data/projects";
import { useAppNavStore } from "@/src/store/appNavStore";

export function ProjectDetailSheet() {
  const openProjectId = useAppNavStore((state) => state.openProjectId);
  const closeProject = useAppNavStore((state) => state.closeProject);
  const project = openProjectId ? getProjectById(openProjectId) : undefined;

  return (
    <Sheet open={Boolean(project)} onClose={closeProject} title={project?.name}>
      {project && (
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6 pt-2">
          <h2 className="text-xl font-semibold text-text">{project.name}</h2>
          <p className="text-sm text-muted mt-1">{project.client}</p>

          <div className="mt-5 space-y-4">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-muted mb-1">
                Rol
              </h3>
              <p className="text-sm text-text">{project.role}</p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-muted mb-1">
                Descripción
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {project.description}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-muted mb-1">
                Impacto
              </h3>
              <p className="text-sm leading-relaxed text-ios">{project.impact}</p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-muted mb-2">
                Tecnologías
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Tag key={tech} variant="ios">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  );
}
