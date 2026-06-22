"use client";

import { useEffect, useState } from "react";
import type { MetroLogLine } from "@/src/features/terminal/data/metroLogs";
import { TYPEWRITER_SPEED_MS } from "@/src/features/terminal/data/metroLogs";

export interface DisplayedLog extends MetroLogLine {
  readonly displayedText: string;
  readonly complete: boolean;
}

export function useTypewriterLogs(
  logs: readonly MetroLogLine[],
  active: boolean,
  speedMs: number = TYPEWRITER_SPEED_MS
): readonly DisplayedLog[] {
  const [displayed, setDisplayed] = useState<readonly DisplayedLog[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      setDisplayed([]);
      setLineIndex(0);
      setCharIndex(0);
      setRunId((value) => value + 1);
    });

    return () => cancelAnimationFrame(frame);
  }, [active, logs]);

  useEffect(() => {
    if (!active || lineIndex >= logs.length) {
      return undefined;
    }

    const currentLine = logs[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (charIndex < currentLine.text.length) {
      timeout = setTimeout(() => {
        setDisplayed((prev) => {
          const existing = prev[lineIndex];
          const nextText = currentLine.text.slice(0, charIndex + 1);

          if (existing) {
            return prev.map((item, index) =>
              index === lineIndex
                ? { ...item, displayedText: nextText }
                : item
            );
          }

          return [
            ...prev,
            {
              ...currentLine,
              displayedText: nextText,
              complete: false,
            },
          ];
        });
        setCharIndex((value) => value + 1);
      }, speedMs);
    } else {
      timeout = setTimeout(() => {
        setDisplayed((prev) =>
          prev.map((item, index) =>
            index === lineIndex ? { ...item, complete: true } : item
          )
        );
        setLineIndex((value) => value + 1);
        setCharIndex(0);
      }, currentLine.delayMs);
    }

    return () => clearTimeout(timeout);
  }, [active, logs, lineIndex, charIndex, speedMs, runId]);

  return displayed;
}
