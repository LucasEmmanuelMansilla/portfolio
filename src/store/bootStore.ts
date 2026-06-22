import { create } from "zustand";
import { resolvePlatform } from "@/src/lib/platform";
import type { BootConfig, PhaseDuration } from "@/src/types/boot";
import type { BootPhase, PlatformInfo } from "@/src/types/platform";

const DEFAULT_CONFIG: BootConfig = {
  phases: [
    { phase: "boot", durationMs: 1200 },
    { phase: "metro", durationMs: 4500 },
    { phase: "emulator", durationMs: 2800 },
    { phase: "splash", durationMs: 1800 },
    { phase: "app", durationMs: 0 },
  ],
  mobilePhases: [
    { phase: "metro", durationMs: 2500 },
    { phase: "splash", durationMs: 1200 },
    { phase: "app", durationMs: 0 },
  ],
  reducedMotionPhases: [
    { phase: "splash", durationMs: 400 },
    { phase: "app", durationMs: 0 },
  ],
};

interface BootStore {
  readonly phase: BootPhase;
  readonly platform: PlatformInfo;
  readonly progress: number;
  readonly reducedMotion: boolean;
  readonly skipped: boolean;
  readonly config: BootConfig;
  setPlatform: (platform: PlatformInfo) => void;
  setReducedMotion: (value: boolean) => void;
  start: () => void;
  advance: () => void;
  skip: () => void;
  reset: () => void;
}

function getPhaseSequence(
  platform: PlatformInfo,
  reducedMotion: boolean,
  config: BootConfig
): readonly BootPhase[] {
  const durations = reducedMotion
    ? config.reducedMotionPhases
    : platform.isMobile
      ? config.mobilePhases
      : config.phases;

  return durations.map((item) => item.phase);
}

function getPhaseDuration(
  phase: BootPhase,
  platform: PlatformInfo,
  reducedMotion: boolean,
  config: BootConfig
): number {
  const durations: readonly PhaseDuration[] = reducedMotion
    ? config.reducedMotionPhases
    : platform.isMobile
      ? config.mobilePhases
      : config.phases;

  return durations.find((item) => item.phase === phase)?.durationMs ?? 0;
}

function getProgress(
  phase: BootPhase,
  platform: PlatformInfo,
  reducedMotion: boolean,
  config: BootConfig
): number {
  const sequence = getPhaseSequence(platform, reducedMotion, config);
  const index = sequence.indexOf(phase);

  if (index === -1 || sequence.length <= 1) {
    return 100;
  }

  return Math.round((index / (sequence.length - 1)) * 100);
}

let advanceTimer: ReturnType<typeof setTimeout> | null = null;

function clearAdvanceTimer(): void {
  if (advanceTimer) {
    clearTimeout(advanceTimer);
    advanceTimer = null;
  }
}

function scheduleAdvance(get: () => BootStore): void {
  clearAdvanceTimer();

  const state = get();
  const duration = getPhaseDuration(
    state.phase,
    state.platform,
    state.reducedMotion,
    state.config
  );

  if (state.phase === "app" || duration === 0) {
    return;
  }

  advanceTimer = setTimeout(() => {
    get().advance();
  }, duration);
}

export const useBootStore = create<BootStore>((set, get) => ({
  phase: "boot",
  platform: resolvePlatform(),
  progress: 0,
  reducedMotion: false,
  skipped: false,
  config: DEFAULT_CONFIG,

  setPlatform: (platform) => {
    set({ platform, progress: getProgress(get().phase, platform, get().reducedMotion, get().config) });
  },

  setReducedMotion: (value) => {
    set({ reducedMotion: value });
    if (value) {
      clearAdvanceTimer();
      set({ phase: "splash", progress: 50, skipped: true });
      scheduleAdvance(get);
    }
  },

  start: () => {
    const state = get();

    if (state.phase === "app") {
      return;
    }

    const initialPhase = state.reducedMotion
      ? "splash"
      : state.platform.isMobile
        ? "metro"
        : "boot";

    set({
      phase: initialPhase,
      progress: getProgress(
        initialPhase,
        state.platform,
        state.reducedMotion,
        state.config
      ),
    });
    scheduleAdvance(get);
  },

  advance: () => {
    const state = get();
    const sequence = getPhaseSequence(
      state.platform,
      state.reducedMotion,
      state.config
    );
    const currentIndex = sequence.indexOf(state.phase);

    if (currentIndex === -1 || currentIndex >= sequence.length - 1) {
      clearAdvanceTimer();
      set({ phase: "app", progress: 100 });
      return;
    }

    const nextPhase = sequence[currentIndex + 1];
    set({
      phase: nextPhase,
      progress: getProgress(nextPhase, state.platform, state.reducedMotion, state.config),
    });
    scheduleAdvance(get);
  },

  skip: () => {
    clearAdvanceTimer();
    set({ phase: "app", progress: 100, skipped: true });
  },

  reset: () => {
    clearAdvanceTimer();
    const platform = resolvePlatform();
    set({
      phase: platform.isMobile ? "metro" : "boot",
      platform,
      progress: 0,
      skipped: false,
    });
    scheduleAdvance(get);
  },
}));
