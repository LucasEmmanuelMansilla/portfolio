"use client";

import { MetroLogOutput } from "@/src/features/terminal/components/MetroLogOutput";
import { useMetroLogEngine } from "@/src/features/terminal/hooks/useMetroLogEngine";
import { cn } from "@/src/lib/cn";

interface MacTerminalProps {
  readonly className?: string;
}

export function MacTerminal({ className }: MacTerminalProps) {
  const { segments, visibleCount } = useMetroLogEngine();

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl",
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-[#2d2d2d] px-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 truncate font-mono text-[11px] text-white/50">
          portfolio-app — node — react-native start
        </span>
      </div>
      <div className="shrink-0 px-4 pt-3 font-mono text-[13px] text-white/50">
        <span className="text-[#4ec9b0]">lucas@macbook</span>
        <span className="text-white/30">:</span>
        <span className="text-[#56b6ff]">~/portfolio-app</span>
        <span className="text-white/30"> $ </span>
        <span className="text-white/70">npx react-native start</span>
      </div>
      <MetroLogOutput segments={segments} visibleCount={visibleCount} />
    </div>
  );
}
