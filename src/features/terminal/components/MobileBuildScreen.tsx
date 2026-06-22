"use client";

import { useMemo } from "react";
import { m } from "framer-motion";
import { MetroLogOutput } from "@/src/features/terminal/components/MetroLogOutput";
import { getMobileBuildSegments } from "@/src/features/terminal/data/metroLogs";
import { useMobileBuildLogPlayback } from "@/src/features/terminal/hooks/useMobileBuildLogPlayback";

export function MobileBuildScreen() {
  const segments = useMemo(() => getMobileBuildSegments(), []);
  const { visibleCount } = useMobileBuildLogPlayback(segments, true);

  return (
    <div className="flex h-full min-h-dvh w-full flex-col bg-black">
      <div className="shrink-0 border-b border-white/10 px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2.5 py-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="text-sm font-medium text-white/90">Metro Bundler</span>
          <span className="ml-auto font-mono text-[11px] text-white/35">:8081</span>
        </div>
      </div>

      <MetroLogOutput segments={segments} visibleCount={visibleCount} />

      <div className="shrink-0 border-t border-white/10 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
        <p className="mb-2.5 font-mono text-[11px] text-white/45">
          Building JavaScript bundle...
        </p>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <m.div
            className="h-full rounded-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
