"use client";

import { m } from "framer-motion";
import { cn } from "@/src/lib/cn";

interface InstallingAppScreenProps {
  readonly fullscreen?: boolean;
}

export function InstallingAppScreen({
  fullscreen = false,
}: InstallingAppScreenProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-ios-surface px-6 text-center",
        fullscreen ? "h-full min-h-dvh w-full" : "absolute inset-0"
      )}
    >
      <m.div
        className="mb-4 h-10 w-10 rounded-xl bg-ios/20"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <p className="text-sm font-medium text-ios-label">Instalando PortfolioApp</p>
      <p className="mt-1 font-mono text-[11px] text-ios-label-secondary">
        Debug-iphonesimulator
      </p>
    </div>
  );
}
