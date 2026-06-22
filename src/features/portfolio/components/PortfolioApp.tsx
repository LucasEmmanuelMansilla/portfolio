"use client";

import { AppShell } from "@/src/features/portfolio/components/AppShell";
import { usePlatform } from "@/src/hooks/usePlatform";

interface PortfolioAppProps {
  readonly fullscreen?: boolean;
}

export function PortfolioApp({ fullscreen }: PortfolioAppProps) {
  const { isMobile } = usePlatform();

  return <AppShell fullscreen={fullscreen ?? isMobile} />;
}
