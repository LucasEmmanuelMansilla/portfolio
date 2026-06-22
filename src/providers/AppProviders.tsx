"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "@/src/providers/MotionProvider";
import { QueryProvider } from "@/src/providers/QueryProvider";

interface AppProvidersProps {
  readonly children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <MotionProvider>{children}</MotionProvider>
    </QueryProvider>
  );
}
