"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { Tag } from "@/src/components/ui/Tag";
import { jobs } from "@/src/data/experience";
import { cn } from "@/src/lib/cn";

export function ExperienceTimeline() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="relative pl-4">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

      <div className="space-y-3">
        {jobs.map((job, index) => {
          const isExpanded = expanded === index;

          return (
            <div key={`${job.company}-${index}`} className="relative">
              <div
                className={cn(
                  "absolute -left-4 top-5 w-2.5 h-2.5 rounded-full border-2 z-10",
                  job.current ? "bg-ios border-ios" : "bg-surface border-border"
                )}
              />

              <Card className="border-border/60 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : index)}
                  className="w-full text-left p-4"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-text">
                          {job.role}
                        </h3>
                        {job.current && <Badge variant="ios">Actual</Badge>}
                      </div>
                      <p className="text-xs font-medium mt-0.5 text-ios">
                        {job.company}
                        {job.client && (
                          <span className="text-muted font-normal">
                            {" "}
                            — {job.client}
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-muted mt-1">
                        {job.period} · {job.location}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-muted shrink-0 transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/50">
                    <ul className="mt-3 space-y-2">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet.slice(0, 30)}
                          className="flex items-start gap-2 text-xs text-muted leading-relaxed"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-ios" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/50">
                      {job.stack.map((tech) => (
                        <Tag key={tech} variant="ios">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
