import type { ReactNode } from "react";
import { cn } from "@/src/lib/cn";

interface DeviceBezelProps {
  readonly children: ReactNode;
  readonly className?: string;
}

function SideHardwareButtons() {
  return (
    <>
      <div
        className="absolute -left-[2px] top-[108px] w-[3px] h-[26px] rounded-l-sm bg-[#3a3a3c] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        aria-hidden
      />
      <div
        className="absolute -left-[2px] top-[148px] w-[3px] h-[42px] rounded-l-sm bg-[#3a3a3c] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        aria-hidden
      />
      <div
        className="absolute -left-[2px] top-[198px] w-[3px] h-[42px] rounded-l-sm bg-[#3a3a3c] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        aria-hidden
      />
      <div
        className="absolute -right-[2px] top-[168px] w-[3px] h-[72px] rounded-r-sm bg-[#3a3a3c] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        aria-hidden
      />
    </>
  );
}

function DynamicIsland() {
  return (
    <div
      className="absolute top-[11px] left-1/2 -translate-x-1/2 z-20 w-[110px] h-[32px] bg-black rounded-full flex items-center justify-end pr-3.5"
      aria-hidden
    >
      <div className="w-[11px] h-[11px] rounded-full bg-[#1a1a1c] ring-1 ring-[#2c2c2e]" />
    </div>
  );
}

export function DeviceBezel({ children, className }: DeviceBezelProps) {
  return (
    <div className={cn("relative w-fit", className)}>
      <SideHardwareButtons />
      <div
        className={cn(
          "relative rounded-[44px] p-[3px]",
          "bg-gradient-to-b from-[#3a3a3c] via-[#1c1c1e] to-[#0a0a0a]"
        )}
      >
        <DynamicIsland />
        <div className="relative rounded-[40px] overflow-hidden bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}
