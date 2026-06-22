"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ExperienceState } from "@/src/types/experience";
import { STATE_EVENT_MAP } from "@/src/types/experience";
import { compareExperienceState } from "@/src/types/experience";
import {
  createNavigationLogSegment,
  createPerformanceLogSegment,
  SEGMENTS_BY_STATE,
  type MetroSegment,
  TAB_SCREEN_NAMES,
} from "@/src/features/terminal/data/metroLogs";
import { useAppNavStore } from "@/src/store/appNavStore";
import { useExperienceStore } from "@/src/store/experienceStore";

interface SegmentBatch {
  readonly state: ExperienceState;
  readonly segments: readonly MetroSegment[];
}

interface MetroLogEngineResult {
  readonly segments: readonly MetroSegment[];
  readonly visibleCount: number;
  readonly isStreaming: boolean;
}

const LOG_STATES: readonly ExperienceState[] = [
  "STARTING_METRO",
  "INSTALLING_IPA",
  "LAUNCHING_APPLICATION",
  "APPLICATION_READY",
];

function buildStateBatches(state: ExperienceState): readonly SegmentBatch[] {
  return LOG_STATES.flatMap((logState) => {
    if (!compareExperienceState(state, logState)) {
      return [];
    }

    const factory = SEGMENTS_BY_STATE[logState];
    return factory ? [{ state: logState, segments: factory() }] : [];
  });
}

export function useMetroLogEngine(): MetroLogEngineResult {
  const experienceState = useExperienceStore((store) => store.state);
  const dispatch = useExperienceStore((store) => store.dispatch);
  const skipped = useExperienceStore((store) => store.skipped);
  const activeTab = useAppNavStore((store) => store.activeTab);

  const [liveSegments, setLiveSegments] = useState<readonly MetroSegment[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const dispatchedStatesRef = useRef<Set<ExperienceState>>(new Set());
  const lastTabRef = useRef(activeTab);
  const performanceTimerRef = useRef<number | null>(null);

  const stateBatches = useMemo(
    () => buildStateBatches(experienceState),
    [experienceState]
  );

  const segments = useMemo(
    () => [
      ...stateBatches.flatMap((batch) => batch.segments),
      ...liveSegments,
    ],
    [stateBatches, liveSegments]
  );

  const isSkippedReady = skipped && experienceState === "APPLICATION_READY";
  const activeVisibleCount = isSkippedReady ? segments.length : visibleCount;

  useEffect(() => {
    if (isSkippedReady || visibleCount >= segments.length || segments.length === 0) {
      return undefined;
    }

    const nextSegment = segments[visibleCount];
    const timer = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, nextSegment?.delayMs ?? 200);

    return () => window.clearTimeout(timer);
  }, [segments, visibleCount, isSkippedReady]);

  useEffect(() => {
    if (isSkippedReady || visibleCount === 0) {
      return;
    }

    let runningIndex = 0;

    for (const batch of stateBatches) {
      const batchEnd = runningIndex + batch.segments.length;

      if (
        visibleCount >= batchEnd &&
        !dispatchedStatesRef.current.has(batch.state)
      ) {
        dispatchedStatesRef.current.add(batch.state);
        const event = STATE_EVENT_MAP[batch.state];

        if (event) {
          dispatch(event);
        }
      }

      runningIndex = batchEnd;
    }
  }, [visibleCount, stateBatches, experienceState, dispatch, isSkippedReady]);

  useEffect(() => {
    if (experienceState !== "APPLICATION_READY" || isSkippedReady) {
      return undefined;
    }

    if (lastTabRef.current !== activeTab) {
      const screenName = TAB_SCREEN_NAMES[activeTab] ?? activeTab;
      const navSegment = createNavigationLogSegment(screenName);
      window.setTimeout(() => {
        setLiveSegments((current) => [...current, navSegment]);
      }, 0);
      lastTabRef.current = activeTab;
    }

    performanceTimerRef.current = window.setInterval(() => {
      if (Math.random() > 0.65) {
        const perfSegment = createPerformanceLogSegment();
        setLiveSegments((current) => [...current, perfSegment]);
      }
    }, 8000);

    return () => {
      if (performanceTimerRef.current) {
        window.clearInterval(performanceTimerRef.current);
        performanceTimerRef.current = null;
      }
    };
  }, [experienceState, activeTab, isSkippedReady]);

  return {
    segments,
    visibleCount: activeVisibleCount,
    isStreaming: activeVisibleCount < segments.length,
  };
}
