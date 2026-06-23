"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/cn";

interface AvatarProps {
  readonly src: string;
  readonly name: string;
  readonly size?: "sm" | "md" | "lg" | "xl";
  readonly variant?: "default" | "ios";
  readonly className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
  xl: "w-24 h-24 text-xl",
};

function AvatarInitials({
  name,
  size,
  variant,
  className,
}: {
  readonly name: string;
  readonly size: keyof typeof sizeMap;
  readonly variant: "default" | "ios";
  readonly className?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        variant === "ios"
          ? "border border-ios-separator/60 bg-ios-cell text-ios-label"
          : "border border-accent/30 bg-gradient-to-br from-accent/20 to-accent/5 text-accent",
        sizeMap[size],
        className
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

export function Avatar({
  src,
  name,
  size = "md",
  variant = "default",
  className,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <AvatarInitials
        name={name}
        size={size}
        variant={variant}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border",
        variant === "ios" ? "border-ios-separator/60" : "border-border",
        sizeMap[size],
        className
      )}
    >
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
        sizes="96px"
      />
    </div>
  );
}
