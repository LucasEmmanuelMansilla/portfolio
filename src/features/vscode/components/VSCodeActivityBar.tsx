"use client";

import {
  Files,
  Search,
  GitBranch,
  Play,
  Blocks,
} from "lucide-react";
import { cn } from "@/src/lib/cn";

interface ActivityItem {
  readonly id: string;
  readonly label: string;
  readonly icon: typeof Files;
  readonly active?: boolean;
}

const activities: readonly ActivityItem[] = [
  { id: "explorer", label: "Explorer", icon: Files, active: true },
  { id: "search", label: "Search", icon: Search },
  { id: "git", label: "Source Control", icon: GitBranch },
  { id: "run", label: "Run and Debug", icon: Play },
  { id: "extensions", label: "Extensions", icon: Blocks },
];

export function VSCodeActivityBar() {
  return (
    <aside
      aria-label="Activity Bar"
      className="flex w-12 shrink-0 flex-col items-center border-r border-[#2b2b2b] bg-[#333333] py-2"
    >
      {activities.map(({ id, label, icon: Icon, active }) => (
        <button
          key={id}
          type="button"
          tabIndex={active ? 0 : -1}
          aria-label={label}
          aria-current={active ? "page" : undefined}
          className={cn(
            "relative mb-1 flex h-12 w-12 items-center justify-center text-[#858585] transition-colors",
            active && "text-white",
            !active && "cursor-default opacity-70"
          )}
        >
          {active && (
            <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-white" />
          )}
          <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
        </button>
      ))}
    </aside>
  );
}
