"use client";

import { useEffect } from "react";
import { useReducedMotionSafe } from "@/src/hooks/useReducedMotionSafe";
import { usePlatform } from "@/src/hooks/usePlatform";
import { useExperienceStore } from "@/src/store/experienceStore";

/** @deprecated Use useExperienceSequence */
export function useBootSequence(): void {
  const platform = usePlatform();
  const reducedMotion = useReducedMotionSafe();
  const setPlatform = useExperienceStore((state) => state.setPlatform);
  const setReducedMotion = useExperienceStore((state) => state.setReducedMotion);
  const start = useExperienceStore((state) => state.start);

  useEffect(() => {
    setPlatform(platform);
  }, [platform, setPlatform]);

  useEffect(() => {
    setPlatform(platform);
    setReducedMotion(reducedMotion);
    start();
  }, [platform, reducedMotion, setPlatform, setReducedMotion, start]);
}
