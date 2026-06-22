"use client";

import Image from "next/image";
import { Card } from "@/src/components/ui/Card";
import { Tag } from "@/src/components/ui/Tag";
import {
  featuredTechnologies,
  languages,
  skillGroups,
} from "@/src/data/techStack";

export function TechSections() {
  return (
    <div className="space-y-5">
      <div>
        <div className="grid grid-cols-3 gap-3">
          {featuredTechnologies.map((tech) => (
            <Card
              key={tech.id}
              className="p-3 flex flex-col items-center text-center border-border/60"
            >
              <div className="w-10 h-10 relative mb-2">
                <Image
                  src={`/logos/${tech.logoFile}`}
                  alt={tech.name}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="text-[10px] font-medium text-text leading-tight">
                {tech.name}
              </span>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {skillGroups.map((group) => (
          <Card key={group.category} className="p-4 border-border/60">
            <h4 className="text-[10px] uppercase tracking-widest mb-2 text-ios">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item} variant="ios">
                  {item}
                </Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 border-border/60 space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest text-ios">
          Idiomas
        </h4>
        {languages.map((lang) => (
          <div key={lang.lang}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-text font-medium">{lang.lang}</span>
              <span className="text-muted">{lang.level}</span>
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-ios"
                style={{ width: `${lang.pct}%` }}
              />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
