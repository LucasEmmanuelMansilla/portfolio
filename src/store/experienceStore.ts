import { create } from "zustand";
import { resolvePlatform } from "@/src/lib/platform";
import type {
  ExperienceEvent,
  ExperienceState,
  ExperienceStore,
} from "@/src/types/experience";
import {
  compareExperienceState,
  DESKTOP_STATE_SEQUENCE,
  MOBILE_STATE_SEQUENCE,
  STATE_EVENT_MAP,
} from "@/src/types/experience";
import type { PlatformInfo } from "@/src/types/platform";

function getSequence(platform: PlatformInfo): readonly ExperienceState[] {
  return platform.isMobile
    ? MOBILE_STATE_SEQUENCE.map((item) => item.state)
    : DESKTOP_STATE_SEQUENCE.map((item) => item.state);
}

function getStateDuration(
  state: ExperienceState,
  platform: PlatformInfo
): number {
  const sequence = platform.isMobile
    ? MOBILE_STATE_SEQUENCE
    : DESKTOP_STATE_SEQUENCE;

  return sequence.find((item) => item.state === state)?.durationMs ?? 0;
}

function getNextState(
  current: ExperienceState,
  platform: PlatformInfo
): ExperienceState | null {
  const sequence = getSequence(platform);
  const index = sequence.indexOf(current);

  if (index === -1 || index >= sequence.length - 1) {
    return null;
  }

  return sequence[index + 1] ?? null;
}

function getInitialState(
  platform: PlatformInfo,
  reducedMotion: boolean
): ExperienceState {
  if (reducedMotion) {
    return "APPLICATION_READY";
  }

  if (platform.isMobile) {
    return "LAUNCHING_APPLICATION";
  }

  return "BOOTING";
}

let advanceTimer: ReturnType<typeof setTimeout> | null = null;

function clearAdvanceTimer(): void {
  if (advanceTimer) {
    clearTimeout(advanceTimer);
    advanceTimer = null;
  }
}

function scheduleTimedAdvance(
  get: () => ExperienceStore,
  platformOverride?: PlatformInfo
): void {
  clearAdvanceTimer();

  const { state, platform } = get();
  const resolvedPlatform = platformOverride ?? platform;

  if (state === "APPLICATION_READY") {
    return;
  }

  const duration = getStateDuration(state, resolvedPlatform);

  if (duration <= 0) {
    return;
  }

  advanceTimer = setTimeout(() => {
    get().advanceTimed();
  }, duration);
}

function transitionTo(
  set: (partial: Partial<ExperienceStore>) => void,
  get: () => ExperienceStore,
  nextState: ExperienceState
): void {
  set({ state: nextState });

  if (nextState === "APPLICATION_READY") {
    clearAdvanceTimer();
    return;
  }

  scheduleTimedAdvance(get);
}

export const useExperienceStore = create<ExperienceStore>((set, get) => ({
  state: "BOOTING",
  platform: resolvePlatform(),
  reducedMotion: false,
  skipped: false,

  setPlatform: (platform) => set({ platform }),

  setReducedMotion: (value) => {
    set({ reducedMotion: value });

    if (value) {
      clearAdvanceTimer();
      set({ state: "APPLICATION_READY", skipped: true });
    }
  },

  start: () => {
    const { platform, reducedMotion, state } = get();

    if (state === "APPLICATION_READY") {
      return;
    }

    const initialState = getInitialState(platform, reducedMotion);
    set({ state: initialState, skipped: false });
    scheduleTimedAdvance(get, platform);
  },

  adaptPlatform: (platform) => {
    clearAdvanceTimer();

    const { state, reducedMotion } = get();

    if (reducedMotion) {
      set({ platform, state: "APPLICATION_READY", skipped: false });
      return;
    }

    if (state === "APPLICATION_READY") {
      set({ platform });
      return;
    }

    if (compareExperienceState(state, "LAUNCHING_APPLICATION")) {
      set({ platform, state: "APPLICATION_READY", skipped: false });
      return;
    }

    const initialState = getInitialState(platform, reducedMotion);
    set({ platform, state: initialState, skipped: false });
    scheduleTimedAdvance(get, platform);
  },

  dispatch: (event: ExperienceEvent) => {
    const { state, platform } = get();
    const expectedEvent = STATE_EVENT_MAP[state];

    if (expectedEvent !== event) {
      return;
    }

    const nextState = getNextState(state, platform);

    if (!nextState) {
      clearAdvanceTimer();
      set({ state: "APPLICATION_READY" });
      return;
    }

    transitionTo(set, get, nextState);
  },

  advanceTimed: () => {
    const { state, platform } = get();
    const nextState = getNextState(state, platform);

    if (!nextState) {
      clearAdvanceTimer();
      set({ state: "APPLICATION_READY" });
      return;
    }

    transitionTo(set, get, nextState);
  },

  skip: () => {
    clearAdvanceTimer();
    set({ state: "APPLICATION_READY", skipped: true });
  },

  reset: () => {
    clearAdvanceTimer();
    const platform = resolvePlatform();
    const initialState = getInitialState(platform, get().reducedMotion);
    set({
      state: initialState,
      platform,
      skipped: false,
    });
    scheduleTimedAdvance(get, platform);
  },
}));
