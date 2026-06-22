"use client";

import { useEffect, useState } from "react";
import { resolvePlatform } from "@/src/lib/platform";
import type { PlatformInfo } from "@/src/types/platform";

export function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformInfo>(() =>
    resolvePlatform()
  );

  useEffect(() => {
    const update = () => setPlatform(resolvePlatform());

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return platform;
}
