"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/cn";

interface AvatarProps {
  readonly src: string;
  readonly name: string;
  readonly size?: "sm" | "md" | "lg" | "xl";
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
  className,
}: {
  readonly name: string;
  readonly size: keyof typeof sizeMap;
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
        "rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center font-semibold text-accent shrink-0",
        sizeMap[size],
        className
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <AvatarInitials name={name} size={size} className={className} />;
  }

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden border border-border shrink-0",
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
