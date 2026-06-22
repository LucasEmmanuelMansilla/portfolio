"use client";

import type { ReactNode } from "react";
import { SimulatorWindow } from "@/src/features/emulator/components/SimulatorWindow";

interface EmulatorSceneProps {
  readonly children: ReactNode;
}

export function EmulatorScene({ children }: EmulatorSceneProps) {
  return (
    <div className="relative flex h-full min-h-0 w-full overflow-hidden">
      <SimulatorWindow>{children}</SimulatorWindow>
    </div>
  );
}
