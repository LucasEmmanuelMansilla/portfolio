"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { BundleBar } from "@/src/features/terminal/components/BundleBar";
import type { MetroSegment } from "@/src/features/terminal/data/metroLogs";
import { cn } from "@/src/lib/cn";

interface MetroBundlerOutputProps {
  readonly segments: readonly MetroSegment[];
}

const toneClass: Record<NonNullable<MetroSegment["tone"]>, string> = {
  dim: "text-[#3a9a9a]",
  normal: "text-[#4ec9c9]",
  bright: "text-[#bdf0f0] font-semibold",
};

export function MetroBundlerOutput({ segments }: MetroBundlerOutputProps) {
  const [visible, setVisible] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let accumulated = 0;

    segments.forEach((segment, index) => {
      accumulated += segment.delayMs;
      timers.push(setTimeout(() => setVisible(index + 1), accumulated));
    });

    return () => timers.forEach(clearTimeout);
  }, [segments]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [visible]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-3 bg-black font-mono"
      aria-live="polite"
      aria-label="Metro Bundler output"
    >
      {segments.slice(0, visible).map((segment, index) => {
        const key = `${index}-${segment.kind}`;

        if (segment.kind === "blank") {
          return <div key={key} className="h-3" />;
        }

        if (segment.kind === "box") {
          return (
            <m.div
              key={key}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="my-1 max-w-[640px] border border-[#3a9a9a] px-4 py-3"
            >
              {segment.boxLines?.map((line, lineIndex) => (
                <div
                  key={`${key}-${lineIndex}`}
                  className={cn(
                    "text-[13px] leading-relaxed min-h-[1.2em]",
                    line.bold
                      ? "text-[#bdf0f0] font-semibold"
                      : line.link
                        ? "text-[#56b6ff] underline underline-offset-2"
                        : "text-[#4ec9c9]"
                  )}
                >
                  {line.text}
                </div>
              ))}
            </m.div>
          );
        }

        if (segment.kind === "bundle") {
          return <BundleBar key={key} target={segment.text ?? "[ios, dev]"} />;
        }

        return (
          <div
            key={key}
            className={cn(
              "text-[13px] leading-relaxed whitespace-pre-wrap break-all",
              toneClass[segment.tone ?? "normal"]
            )}
          >
            {segment.text}
          </div>
        );
      })}
      {visible < segments.length && (
        <span className="inline-block w-2 h-4 bg-[#16c60c] animate-pulse align-middle" />
      )}
    </div>
  );
}
