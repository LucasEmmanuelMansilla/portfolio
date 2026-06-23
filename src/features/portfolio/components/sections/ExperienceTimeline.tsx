"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { jobs } from "@/src/data/experience";
import { NativeListRow } from "@/src/features/portfolio/components/NativeList";
import { cn } from "@/src/lib/cn";

export function ExperienceTimeline() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div>
      {jobs.map((job, index) => {
        const isExpanded = expanded === index;
        const isFintech =
          job.client?.includes("BanCo") ||
          job.client?.includes("Pako Wallet");

        return (
          <div key={`${job.company}-${index}`}>
            <NativeListRow
              label={job.role}
              value={job.client ?? job.company}
              detail={`${job.period} · ${job.location}`}
              onClick={() => setExpanded(isExpanded ? null : index)}
              showChevron={false}
              isLast={!isExpanded && index === jobs.length - 1}
            />
            {isExpanded && (
              <div
                className={cn(
                  "border-b border-ios-separator px-4 pb-4",
                  index === jobs.length - 1 && "border-b-0"
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] text-ios-label-secondary">
                    {job.company}
                    {job.current && (
                      <span className="ml-2 font-medium text-ios">Actual</span>
                    )}
                    {isFintech && (
                      <span className="ml-2 font-medium text-ios">
                        Fintech
                      </span>
                    )}
                  </p>
                  <ChevronDown className="h-4 w-4 rotate-180 text-ios-label-tertiary" />
                </div>
                <ul className="space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet.slice(0, 40)}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ios-label-secondary"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ios"
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-ios-cell px-2 py-0.5 text-[11px] text-ios-label-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
