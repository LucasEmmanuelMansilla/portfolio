import { cn } from "@/src/lib/cn";

interface StatusBarProps {
  readonly className?: string;
  /** Iconos claros sobre fondo oscuro (boot / splash) */
  readonly light?: boolean;
}

function DynamicIsland() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[7px] z-20 -translate-x-1/2"
      aria-hidden
    >
      <div
        className={cn(
          "relative h-[30px] w-[102px] rounded-full",
          "bg-gradient-to-b from-[#1c1c1e] via-[#0a0a0a] to-black",
          "shadow-[0_1px_2px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]"
        )}
      >
        <div className="absolute inset-x-[10px] top-[4px] h-[3px] rounded-full bg-white/[0.04]" />
        <div className="absolute right-[12px] top-1/2 flex -translate-y-1/2 items-center gap-[3px]">
          <div className="h-[8px] w-[8px] rounded-full bg-[#0b0b0d] ring-1 ring-[#252528]" />
          <div className="h-[5px] w-[5px] rounded-full bg-[#101012] opacity-80" />
        </div>
      </div>
    </div>
  );
}

function StatusCellular({ className }: { readonly className?: string }) {
  return (
    <svg
      className={cn("h-[10px] w-[16px]", className)}
      viewBox="0 0 18 12"
      fill="currentColor"
      aria-hidden
    >
      <rect x="0" y="7" width="3.2" height="5" rx="0.6" />
      <rect x="4.8" y="4.5" width="3.2" height="7.5" rx="0.6" />
      <rect x="9.6" y="2" width="3.2" height="10" rx="0.6" />
      <rect x="14.4" y="0" width="3.2" height="12" rx="0.6" />
    </svg>
  );
}

function StatusWifi({ className }: { readonly className?: string }) {
  return (
    <svg
      className={cn("h-[10px] w-[14px]", className)}
      viewBox="0 0 16 12"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="8" cy="10.1" r="1.15" />
      <path d="M5.2 7.2a3.9 3.9 0 015.6 0l-.8 1a2.7 2.7 0 00-4 0l-.8-1z" />
      <path d="M2.6 4.6a7.4 7.4 0 0110.8 0l-.9 1.1a5.9 5.9 0 00-9 0L2.6 4.6z" />
      <path
        d="M0 2.1a10.8 10.8 0 0116 0l-.9 1.1a9.2 9.2 0 00-14.2 0L0 2.1z"
        opacity="0.42"
      />
    </svg>
  );
}

function StatusBattery({ className }: { readonly className?: string }) {
  return (
    <svg
      className={cn("h-[11px] w-[24px]", className)}
      viewBox="0 0 27 13"
      fill="currentColor"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.38"
      />
      <rect x="2" y="2" width="16.5" height="9" rx="1.8" />
      <path
        d="M24.5 4.6v3.8c.8-.3 1.3-1 1.3-1.9s-.5-1.6-1.3-1.9z"
        opacity="0.38"
      />
    </svg>
  );
}

export function StatusBar({ className, light = false }: StatusBarProps) {
  const foreground = light ? "text-white" : "text-[#1d1d1f]";

  return (
    <div
      className={cn(
        "relative h-[52px] w-full shrink-0 select-none bg-ios-surface",
        foreground,
        className
      )}
      aria-hidden
    >
      <DynamicIsland />

      <div className="absolute inset-x-0 bottom-[7px] flex items-center justify-between px-[18px]">
        <time
          dateTime="09:41"
          className={cn(
            "font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]",
            "text-[13px] font-semibold leading-none tracking-[-0.02em] tabular-nums",
            !light && "text-[#1d1d1f]"
          )}
        >
          9:41
        </time>

        <div className="flex items-center gap-[5px]">
          <StatusCellular className={foreground} />
          <StatusWifi className={foreground} />
          <StatusBattery className={foreground} />
        </div>
      </div>
    </div>
  );
}
