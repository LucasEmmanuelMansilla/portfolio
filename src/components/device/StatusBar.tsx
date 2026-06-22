import { cn } from "@/src/lib/cn";

interface StatusBarProps {
  readonly className?: string;
  readonly light?: boolean;
}

export function StatusBar({ className, light = false }: StatusBarProps) {
  const textColor = light ? "text-white" : "text-black";

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto_1fr] items-end px-[14px] pt-[8.4px] pb-[2.8px] h-[37.8px] text-[10.5px] font-semibold tracking-[-0.02em] shrink-0",
        textColor,
        className
      )}
      aria-hidden
    >
      <span className="justify-self-start leading-none">9:41</span>

      <div className="w-[84px]" />

      <div className="flex items-center justify-end gap-[3.5px] justify-self-end">
        <svg className="w-[11.9px] h-[7.7px]" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.5" />
          <rect x="9" y="2" width="3" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
        </svg>
        <svg className="w-[10.5px] h-[7.7px]" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.2c1.8 0 3.4.7 4.6 1.9l1.2-1.2C11.8 1.3 9.8.5 7.5.5S3.2 1.3 1.7 2.9l1.2 1.2c1.2-1.2 2.8-1.9 4.6-1.9z" />
          <path d="M7.5 5.5c1.1 0 2.1.4 2.9 1.1l1.2-1.2c-1.1-.9-2.5-1.4-4.1-1.4s-3 .5-4.1 1.4l1.2 1.2c.8-.7 1.8-1.1 2.9-1.1z" />
          <circle cx="7.5" cy="9.2" r="1.3" />
        </svg>
        <svg className="w-[17.5px] h-[8.4px]" viewBox="0 0 25 12" fill="currentColor">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="2.5"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            opacity="0.35"
          />
          <rect x="2" y="2" width="16" height="8" rx="1.5" />
          <path
            d="M23 4.5v3a1.5 1.5 0 000-3z"
            fill="currentColor"
            opacity="0.35"
          />
        </svg>
      </div>
    </div>
  );
}
