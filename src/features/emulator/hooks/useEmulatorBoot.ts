"use client";

import { useEffect, useState } from "react";

export function useEmulatorBoot(active: boolean): boolean {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const timer = setTimeout(() => setBooted(true), 1800);
    return () => clearTimeout(timer);
  }, [active]);

  return active && booted;
}
