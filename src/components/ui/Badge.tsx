import { cn } from "@/src/lib/cn";

interface BadgeProps {
  readonly children: string;
  readonly variant?: "accent" | "ios" | "muted";
  readonly className?: string;
}

const variantStyles = {
  accent: "bg-accent/15 text-accent border-accent/25",
  ios: "bg-ios/15 text-ios border-ios/25",
  muted: "bg-surface-2 text-muted border-border",
};

export function Badge({ children, variant = "accent", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
