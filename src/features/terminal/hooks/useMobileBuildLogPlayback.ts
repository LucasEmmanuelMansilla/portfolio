"use client";

import { useEffect, useState } from "react";
import type { MetroSegment } from "@/src/features/terminal/data/metroLogs";

interface MobileBuildLogPlayback {
  readonly visibleCount: number;
  readonly isComplete: boolean;
}

export function useMobileBuildLogPlayback(
  segments: readonly MetroSegment[],
  active: boolean
): MobileBuildLogPlayback {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      setVisibleCount(0);
    });

    return () => cancelAnimationFrame(frame);
  }, [active, segments]);

  useEffect(() => {
    if (!active || visibleCount >= segments.length) {
      return undefined;
    }

    const nextSegment = segments[visibleCount];
    const timer = window.setTimeout(() => {
      setVisibleCount((value) => value + 1);
    }, nextSegment.delayMs);

    return () => window.clearTimeout(timer);
  }, [active, segments, visibleCount]);

  return {
    visibleCount,
    isComplete: visibleCount >= segments.length,
  };
}
