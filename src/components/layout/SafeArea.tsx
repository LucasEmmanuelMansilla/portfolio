import type { ReactNode } from "react";
import { cn } from "@/src/lib/cn";

interface SafeAreaProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly top?: boolean;
  readonly bottom?: boolean;
}

export function SafeArea({
  children,
  className,
  top = true,
  bottom = true,
}: SafeAreaProps) {
  return (
    <div
      className={cn(
        top && "pt-[env(safe-area-inset-top)]",
        bottom && "pb-[env(safe-area-inset-bottom)]",
        className
      )}
    >
      {children}
    </div>
  );
}
