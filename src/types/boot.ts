import type { BootPhase } from "@/src/types/platform";

export interface PhaseDuration {
  readonly phase: BootPhase;
  readonly durationMs: number;
}

export interface BootConfig {
  readonly phases: readonly PhaseDuration[];
  readonly mobilePhases: readonly PhaseDuration[];
  readonly reducedMotionPhases: readonly PhaseDuration[];
}
