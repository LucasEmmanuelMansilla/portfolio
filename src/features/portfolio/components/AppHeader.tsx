"use client";

import { ChevronLeft } from "lucide-react";

interface AppHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly showBack?: boolean;
  readonly onBack?: () => void;
}

export function AppHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
}: AppHeaderProps) {
  return (
    <header className="shrink-0 px-4 pt-2 pb-3 border-b border-border/50 bg-surface/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver"
            className="p-1 -ml-1 rounded-lg hover:bg-white/5 text-ios"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-lg font-semibold text-text leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
}
