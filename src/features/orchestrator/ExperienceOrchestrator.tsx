"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, m } from "framer-motion";
import { useExperienceSequence } from "@/src/features/experience/hooks/useExperienceSequence";
import { BootScreen } from "@/src/features/boot/components/BootScreen";
import { SplashScreen } from "@/src/features/portfolio/components/SplashScreen";
import { PortfolioApp } from "@/src/features/portfolio/components/PortfolioApp";
import { SkipBootButton } from "@/src/features/orchestrator/SkipBootButton";
import { DevWorkstationLayout } from "@/src/features/workstation/components/DevWorkstationLayout";
import { usePlatform } from "@/src/hooks/usePlatform";
import { useExperienceStore } from "@/src/store/experienceStore";
import { compareExperienceState } from "@/src/types/experience";
import type { ExperienceState } from "@/src/types/experience";
import { fadeVariants } from "@/src/lib/motion";

const EmulatorScene = dynamic(
  () =>
    import("@/src/features/emulator/components/EmulatorScene").then(
      (mod) => mod.EmulatorScene
    ),
  { ssr: false }
);

function renderSimulatorContent(state: ExperienceState) {
  if (state === "LAUNCHING_APPLICATION") {
    return <SplashScreen />;
  }

  if (compareExperienceState(state, "APPLICATION_READY")) {
    return <PortfolioApp />;
  }

  return null;
}

function MobileExperience() {
  const state = useExperienceStore((store) => store.state);

  if (state === "LAUNCHING_APPLICATION") {
    return (
      <div className="fixed inset-0 z-40">
        <SplashScreen />
      </div>
    );
  }

  if (compareExperienceState(state, "APPLICATION_READY")) {
    return <PortfolioApp fullscreen />;
  }

  return null;
}

export function ExperienceOrchestrator() {
  useExperienceSequence();
  const state = useExperienceStore((store) => store.state);
  const { isMobile } = usePlatform();

  if (isMobile) {
    return (
      <>
        <SkipBootButton />
        <MobileExperience />
      </>
    );
  }

  const showWorkstation = compareExperienceState(
    state,
    "INITIALIZING_ENVIRONMENT"
  );

  return (
    <>
      <SkipBootButton />

      <AnimatePresence>
        {state === "BOOTING" && (
          <m.div
            key="boot"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50"
          >
            <BootScreen />
          </m.div>
        )}
      </AnimatePresence>

      {showWorkstation && (
        <DevWorkstationLayout
          simulatorContent={
            <EmulatorScene>{renderSimulatorContent(state)}</EmulatorScene>
          }
        />
      )}
    </>
  );
}
