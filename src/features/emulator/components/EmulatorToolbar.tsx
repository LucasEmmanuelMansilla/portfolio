import { Camera, Home, RotateCw } from "lucide-react";
import { cn } from "@/src/lib/cn";

interface EmulatorToolbarProps {
  readonly deviceName?: string;
  readonly osVersion?: string;
  readonly className?: string;
}

function MacTrafficLights() {
  return (
    <div className="flex items-center gap-[7px] w-[52px] shrink-0" aria-hidden>
      <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]" />
      <span className="w-[11px] h-[11px] rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]" />
      <span className="w-[11px] h-[11px] rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

const simulatorControls = [
  { icon: Home, label: "Home" },
  { icon: Camera, label: "Screenshot" },
  { icon: RotateCw, label: "Rotate" },
] as const;

export function EmulatorToolbar({
  deviceName = "iPhone 15",
  osVersion = "iOS 17.2",
  className,
}: EmulatorToolbarProps) {
  return (
    <div
      className={cn(
        "shrink-0 w-full",
        "rounded-[18px] overflow-hidden",
        "bg-[#2a2a2c]/72 backdrop-blur-2xl",
        "border border-white/[0.14]",
        "shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      <div className="grid grid-cols-[52px_1fr_76px] items-center px-3.5 h-[52px]">
        <MacTrafficLights />

        <div className="flex flex-col items-center justify-center min-w-0 px-1 col-start-2">
          <p className="text-[13px] font-semibold text-white/[0.88] tracking-[-0.01em] leading-tight truncate max-w-full">
            {deviceName}
          </p>
          <p className="text-[10px] text-white/45 leading-tight truncate max-w-full">
            {osVersion}
          </p>
        </div>

        <div className="flex items-center gap-0.5 justify-end col-start-3">
          {simulatorControls.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              tabIndex={-1}
              aria-hidden
              className="w-7 h-7 flex items-center justify-center rounded-md text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
            >
              <Icon className="w-[15px] h-[15px]" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
