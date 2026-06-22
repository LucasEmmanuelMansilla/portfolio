import { cn } from "@/src/lib/cn";

interface TagProps {
  readonly children: string;
  readonly variant?: "default" | "accent" | "ios";
  readonly className?: string;
}

const variantStyles = {
  default: "border-border text-muted bg-surface-2",
  accent: "border-accent/30 text-accent bg-accent/10",
  ios: "border-ios/30 text-ios bg-ios/10",
};

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-full border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
