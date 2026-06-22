"use client";

import { m } from "framer-motion";
import { MetroLog } from "@/src/features/terminal/components/MetroLog";
import { metroLogsMobile } from "@/src/features/terminal/data/metroLogs";

export function MobileMetro() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg px-6">
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl"
      >
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-text">Metro Bundler</span>
        </div>
        <div className="h-48">
          <MetroLog logs={metroLogsMobile} />
        </div>
      </m.div>
    </div>
  );
}
