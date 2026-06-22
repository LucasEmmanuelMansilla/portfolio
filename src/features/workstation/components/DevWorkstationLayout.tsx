"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { DesktopBackdrop } from "@/src/features/boot/components/DesktopBackdrop";
import { MacTerminal } from "@/src/features/terminal/components/MacTerminal";
import { compareExperienceState } from "@/src/types/experience";
import { useExperienceStore } from "@/src/store/experienceStore";
import { fadeVariants } from "@/src/lib/motion";

interface DevWorkstationLayoutProps {
  readonly simulatorContent: ReactNode;
}

export function DevWorkstationLayout({
  simulatorContent,
}: DevWorkstationLayoutProps) {
  const state = useExperienceStore((store) => store.state);
  const showTerminal = compareExperienceState(state, "STARTING_METRO");
  const showSimulator = compareExperienceState(state, "OPENING_SIMULATOR");

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      <DesktopBackdrop />

      <div className="absolute inset-0 z-10 flex pt-10 pb-10 pl-3 pr-3 sm:pt-12 sm:pb-12 sm:pl-4 sm:pr-4 lg:pt-14 lg:pb-14 lg:pl-6 lg:pr-8 xl:pr-10 [@media(max-height:800px)]:pt-8 [@media(max-height:800px)]:pb-8">
        <div className="mt-3 grid h-full min-h-0 w-full grid-cols-[2fr_3fr] gap-4 sm:mt-4 lg:mt-6">
          <div className="flex min-h-0 min-w-0 w-200 h-100 flex-col pt-1 sm:pt-2">
            {showTerminal && (
              <m.div
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                className="flex h-full min-h-0 flex-1"
              >
                <MacTerminal className="w-full" />
              </m.div>
            )}
          </div>

          <div className="flex min-h-0 min-w-0 flex-col items-end justify-start overflow-hidden pt-1 pr-1 sm:pt-2 sm:pr-2 lg:pr-4 xl:pr-8">
            {showSimulator && (
              <m.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="flex h-full min-h-0 w-full flex-1 justify-end overflow-hidden"
              >
                {simulatorContent}
              </m.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
