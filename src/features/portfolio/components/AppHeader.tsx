"use client";

import { ChevronLeft } from "lucide-react";
import { cn } from "@/src/lib/cn";

interface AppHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly showBack?: boolean;
  readonly onBack?: () => void;
  readonly large?: boolean;
  readonly className?: string;
}

export function AppHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  large = false,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "shrink-0 bg-ios-surface/95 backdrop-blur-xl",
        large ? "px-5 pb-2 pt-1" : "border-b border-ios-separator px-5 pb-3 pt-2",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver"
            className="-ml-2 rounded-lg p-1.5 text-ios active:bg-ios-label/[0.08]"
          >
            <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h1
            className={cn(
              "font-bold leading-tight tracking-tight text-ios-label",
              large ? "text-[28px]" : "text-[15px]"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-[13px] text-ios-label-secondary">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
