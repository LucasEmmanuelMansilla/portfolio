"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { scaleInVariants, springGentle } from "@/src/lib/motion";

const BUILD_STEPS = [
  "Bundling JavaScript...",
  "Compiling Hermes bytecode...",
  "Optimizing modules...",
  "Launching app...",
] as const;

const STEP_DURATION_MS = 750;

export function AppBuildScreen() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= BUILD_STEPS.length - 1) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setStepIndex((value) => value + 1);
    }, STEP_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [stepIndex]);

  return (
    <div className="flex h-full min-h-dvh w-full flex-col items-center justify-center bg-ios-surface px-8">
      <m.div
        variants={scaleInVariants}
        initial="initial"
        animate="animate"
        transition={springGentle}
        className="w-full max-w-xs text-center"
      >
        <m.div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[22px] border border-ios/30 bg-ios/20"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-bebas text-3xl tracking-wider text-ios">LM</span>
        </m.div>

        <p className="text-lg font-semibold text-ios">Portfolio</p>
        <p className="mt-1 font-karla text-sm text-muted">Lucas Mansilla</p>

        <div className="mt-8 h-10">
          <AnimatePresence mode="wait">
            <m.p
              key={BUILD_STEPS[stepIndex]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[11px] text-muted"
            >
              {BUILD_STEPS[stepIndex]}
            </m.p>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-4 h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-white/10">
          <m.div
            className="h-full rounded-full bg-ios"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
      </m.div>
    </div>
  );
}
