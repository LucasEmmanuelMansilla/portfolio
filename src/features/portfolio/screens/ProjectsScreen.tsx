"use client";

import { SafeArea } from "@/src/components/layout/SafeArea";
import { Badge } from "@/src/components/ui/Badge";
import { Tag } from "@/src/components/ui/Tag";
import {
  NativeListRow,
  NativeListSection,
} from "@/src/features/portfolio/components/NativeList";
import { projects } from "@/src/data/projects";
import { useAppNavStore } from "@/src/store/appNavStore";

export function ProjectsScreen() {
  const openProject = useAppNavStore((state) => state.openProject);

  return (
    <SafeArea className="flex min-h-0 flex-1 flex-col" bottom={false}>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <div className="px-4 pb-2 pt-1">
          <p className="text-xs text-muted">
            {projects.length} proyectos en producción
          </p>
        </div>

        <NativeListSection className="px-4">
          {projects.map((project, index) => (
            <NativeListRow
              key={project.id}
              label={project.name}
              value={project.client}
              detail={project.description}
              onClick={() => openProject(project.id)}
              isLast={index === projects.length - 1}
            />
          ))}
        </NativeListSection>

        <NativeListSection title="Destacados" className="px-4 pt-5">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <div
                key={project.id}
                className="border-b border-border/40 px-4 py-3 last:border-b-0"
              >
                <div className="mb-2 flex items-center gap-2">
                  <p className="text-sm font-medium text-text">{project.name}</p>
                  <Badge variant="ios">Featured</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Tag key={tech} variant="ios">
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
        </NativeListSection>
      </div>
    </SafeArea>
  );
}
