"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useReducedMotionSafe } from "@/src/hooks/useReducedMotionSafe";
import { getScreenVariants, springSnappy } from "@/src/lib/motion";

interface ScreenTransitionProps {
  readonly screenKey: string;
  readonly children: ReactNode;
  readonly animate?: boolean;
}

export function ScreenTransition({
  screenKey,
  children,
  animate = true,
}: ScreenTransitionProps) {
  const reducedMotion = useReducedMotionSafe();

  if (!animate || reducedMotion) {
    return (
      <div key={screenKey} className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    );
  }

  const variants = getScreenVariants();

  return (
    <m.div
      key={screenKey}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={springSnappy}
      className="flex min-h-0 flex-1 flex-col"
    >
      {children}
    </m.div>
  );
}
