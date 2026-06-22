"use client";

import { useEffect, useRef } from "react";
import { TypingLine } from "@/src/features/terminal/components/TypingLine";
import { useTypewriterLogs } from "@/src/features/terminal/hooks/useTypewriterLogs";
import type { MetroLogLine } from "@/src/features/terminal/data/metroLogs";

interface MetroLogProps {
  readonly logs: readonly MetroLogLine[];
  readonly active?: boolean;
}

export function MetroLog({ logs, active = true }: MetroLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayed = useTypewriterLogs(logs, active);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [displayed]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 font-mono"
      aria-live="polite"
      aria-label="Metro Bundler output"
    >
      {displayed.map((log, index) => (
        <TypingLine key={`${index}-${log.text.slice(0, 8)}`} log={log} />
      ))}
    </div>
  );
}
