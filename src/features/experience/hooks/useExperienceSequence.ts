"use client";

import { useLayoutEffect } from "react";
import { useReducedMotionSafe } from "@/src/hooks/useReducedMotionSafe";
import { usePlatform } from "@/src/hooks/usePlatform";
import { useExperienceStore } from "@/src/store/experienceStore";

export function useExperienceSequence(): void {
  const platform = usePlatform();
  const reducedMotion = useReducedMotionSafe();
  const setReducedMotion = useExperienceStore((state) => state.setReducedMotion);
  const adaptPlatform = useExperienceStore((state) => state.adaptPlatform);

  useLayoutEffect(() => {
    setReducedMotion(reducedMotion);
    adaptPlatform(platform);
  }, [platform, reducedMotion, setReducedMotion, adaptPlatform]);
}
