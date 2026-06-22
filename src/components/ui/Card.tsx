"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { cardHoverVariants } from "@/src/lib/motion";
import { cn } from "@/src/lib/cn";

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly onClick?: () => void;
  readonly interactive?: boolean;
}

export function Card({
  children,
  className,
  onClick,
  interactive = false,
}: CardProps) {
  const Component = interactive ? m.button : m.div;

  return (
    <Component
      type={interactive ? "button" : undefined}
      onClick={onClick}
      variants={interactive ? cardHoverVariants : undefined}
      initial="rest"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      className={cn(
        "rounded-2xl border bg-surface/80 backdrop-blur-sm text-left w-full",
        interactive && "cursor-pointer",
        className
      )}
    >
      {children}
    </Component>
  );
}
