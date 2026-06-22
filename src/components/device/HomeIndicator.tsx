import { cn } from "@/src/lib/cn";

interface HomeIndicatorProps {
  readonly className?: string;
  readonly light?: boolean;
}

export function HomeIndicator({ className, light = false }: HomeIndicatorProps) {
  return (
    <div className={cn("flex shrink-0 justify-center py-1 sm:py-2", className)} aria-hidden>
      <div
        className={cn(
          "w-28 h-1 rounded-full",
          light ? "bg-white/80" : "bg-black/30"
        )}
      />
    </div>
  );
}
