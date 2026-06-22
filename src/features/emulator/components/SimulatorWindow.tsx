"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { EmulatorToolbar } from "@/src/features/emulator/components/EmulatorToolbar";
import {
  simulatorViewportClass,
  simulatorWindowSizeClass,
} from "@/src/features/emulator/components/deviceDimensions";
import { compareExperienceState } from "@/src/types/experience";
import type { ExperienceState } from "@/src/types/experience";
import { useExperienceStore } from "@/src/store/experienceStore";
import { cn } from "@/src/lib/cn";

interface SimulatorWindowProps {
  readonly children: ReactNode;
  readonly className?: string;
}

function SimulatorBootScreen() {
  return (
    <m.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <m.div
        className="h-8 w-8 rounded-full border-2 border-white/20 border-t-white/80"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
    </m.div>
  );
}

function SimulatorInstallingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1c1c1e] px-6 text-center">
      <m.div
        className="mb-4 h-10 w-10 rounded-xl bg-ios/20"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <p className="text-sm font-medium text-white/80">Installing PortfolioApp</p>
      <p className="mt-1 font-mono text-[11px] text-white/40">Debug-iphonesimulator</p>
    </div>
  );
}

function SimulatorOpeningScreen() {
  return <div className="absolute inset-0 bg-black" aria-hidden />;
}

function renderInternalScreen(state: ExperienceState): ReactNode {
  if (state === "OPENING_SIMULATOR") {
    return <SimulatorOpeningScreen />;
  }

  if (state === "BOOTING_SIMULATOR") {
    return <SimulatorBootScreen />;
  }

  if (state === "INSTALLING_IPA") {
    return <SimulatorInstallingScreen />;
  }

  return null;
}

export function SimulatorWindow({ children, className }: SimulatorWindowProps) {
  const state = useExperienceStore((store) => store.state);
  const showApp = compareExperienceState(state, "LAUNCHING_APPLICATION");
  const internalScreen = renderInternalScreen(state);

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col items-end justify-start overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "flex h-full max-h-full min-h-0 flex-col gap-1.5 sm:gap-2",
          simulatorWindowSizeClass
        )}
      >
        <EmulatorToolbar
          deviceName="iPhone 15"
          osVersion="iOS 17.2"
          className="shrink-0"
        />

        <div className="flex min-h-0 flex-1 items-stretch overflow-hidden rounded-xl border border-white/10 bg-[#1c1c1e] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <div className={simulatorViewportClass}>
            {internalScreen}
            {showApp && (
              <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use SimulatorWindow */
export const IOSSimulatorFrame = SimulatorWindow;
