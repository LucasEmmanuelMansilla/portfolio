import type { PlatformInfo } from "@/src/types/platform";

export type ExperienceState =
  | "BOOTING"
  | "INITIALIZING_ENVIRONMENT"
  | "STARTING_METRO"
  | "OPENING_SIMULATOR"
  | "BOOTING_SIMULATOR"
  | "INSTALLING_IPA"
  | "LAUNCHING_APPLICATION"
  | "APPLICATION_READY";

export type ExperienceEvent =
  | "BOOT_COMPLETE"
  | "ENVIRONMENT_READY"
  | "METRO_STARTUP_COMPLETE"
  | "SIMULATOR_OPENED"
  | "SIMULATOR_BOOTED"
  | "IPA_INSTALLED"
  | "APP_LAUNCHED";

export interface ExperienceStateMeta {
  readonly state: ExperienceState;
  readonly durationMs: number;
}

export const DESKTOP_STATE_SEQUENCE: readonly ExperienceStateMeta[] = [
  { state: "BOOTING", durationMs: 1200 },
  { state: "INITIALIZING_ENVIRONMENT", durationMs: 800 },
  { state: "STARTING_METRO", durationMs: 0 },
  { state: "OPENING_SIMULATOR", durationMs: 600 },
  { state: "BOOTING_SIMULATOR", durationMs: 1800 },
  { state: "INSTALLING_IPA", durationMs: 0 },
  { state: "LAUNCHING_APPLICATION", durationMs: 0 },
  { state: "APPLICATION_READY", durationMs: 0 },
];

export const MOBILE_STATE_SEQUENCE: readonly ExperienceStateMeta[] = [
  { state: "LAUNCHING_APPLICATION", durationMs: 3200 },
  { state: "APPLICATION_READY", durationMs: 0 },
];

export const STATE_EVENT_MAP: Record<
  ExperienceState,
  ExperienceEvent | null
> = {
  BOOTING: "BOOT_COMPLETE",
  INITIALIZING_ENVIRONMENT: "ENVIRONMENT_READY",
  STARTING_METRO: "METRO_STARTUP_COMPLETE",
  OPENING_SIMULATOR: "SIMULATOR_OPENED",
  BOOTING_SIMULATOR: "SIMULATOR_BOOTED",
  INSTALLING_IPA: "IPA_INSTALLED",
  LAUNCHING_APPLICATION: "APP_LAUNCHED",
  APPLICATION_READY: null,
};

export interface ExperienceStore {
  readonly state: ExperienceState;
  readonly platform: PlatformInfo;
  readonly reducedMotion: boolean;
  readonly skipped: boolean;
  setPlatform: (platform: PlatformInfo) => void;
  setReducedMotion: (value: boolean) => void;
  start: () => void;
  adaptPlatform: (platform: PlatformInfo) => void;
  dispatch: (event: ExperienceEvent) => void;
  advanceTimed: () => void;
  skip: () => void;
  reset: () => void;
}

export function compareExperienceState(
  current: ExperienceState,
  target: ExperienceState
): boolean {
  const order: readonly ExperienceState[] = [
    "BOOTING",
    "INITIALIZING_ENVIRONMENT",
    "STARTING_METRO",
    "OPENING_SIMULATOR",
    "BOOTING_SIMULATOR",
    "INSTALLING_IPA",
    "LAUNCHING_APPLICATION",
    "APPLICATION_READY",
  ];

  return order.indexOf(current) >= order.indexOf(target);
}
