"use client";

import { FastForward } from "lucide-react";
import { useExperienceStore } from "@/src/store/experienceStore";

export function SkipBootButton() {
  const state = useExperienceStore((store) => store.state);
  const skip = useExperienceStore((store) => store.skip);

  if (state === "APPLICATION_READY") return null;

  return (
    <button
      type="button"
      onClick={skip}
      className="fixed top-4 right-4 z-[200] flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 text-xs font-medium hover:bg-black/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
      aria-label="Saltar animación de inicio"
    >
      <FastForward className="w-3.5 h-3.5" />
      Skip
    </button>
  );
}
