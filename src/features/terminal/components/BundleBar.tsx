"use client";

import { useEffect, useState } from "react";

interface BundleBarProps {
  readonly target: string;
}

const TOTAL_MODULES = 477;
const TOTAL_BLOCKS = 22;

export function BundleBar({ target }: BundleBarProps) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1500;
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setPct(Math.round(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const filled = Math.round((pct / 100) * TOTAL_BLOCKS);
  const modules = Math.round((pct / 100) * TOTAL_MODULES);
  const done = pct >= 100;

  return (
    <div className="font-mono text-[13px] leading-relaxed whitespace-pre flex flex-wrap items-center gap-x-1">
      <span className="bg-[#16c60c] text-black font-bold px-1">BUNDLE</span>
      <span className="text-[#4ec9c9]">{target} ./index.js</span>
      <span className="text-[#16c60c]">{"\u2588".repeat(filled)}</span>
      <span className="text-[#16c60c]/25">
        {"\u2588".repeat(TOTAL_BLOCKS - filled)}
      </span>
      <span className="text-[#4ec9c9]">
        {pct.toFixed(1)}% ({modules}/{TOTAL_MODULES})
        {done ? ", done." : ""}
      </span>
    </div>
  );
}
