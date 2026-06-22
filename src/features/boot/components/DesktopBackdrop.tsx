"use client";

import { BatteryFull, Search, Wifi } from "lucide-react";
import type { ComponentType } from "react";
import {
  FinderIcon,
  SafariIcon,
  TerminalIcon,
  VSCodeIcon,
  XcodeIcon,
} from "@/src/features/boot/components/BrandIcons";
import { Wallpaper } from "@/src/features/boot/components/Wallpaper";
import { useClock } from "@/src/hooks/useClock";

type BrandIcon = ComponentType<{ readonly className?: string }>;

const macBarFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const macMenus: readonly string[] = [
  "Finder",
  "Archivo",
  "Edición",
  "Visualización",
  "Ventana",
];

interface DockApp {
  readonly label: string;
  readonly icon: BrandIcon;
}

const macDock: readonly DockApp[] = [
  { label: "Finder", icon: FinderIcon },
  { label: "Safari", icon: SafariIcon },
  { label: "Terminal", icon: TerminalIcon },
  { label: "VS Code", icon: VSCodeIcon },
  { label: "Xcode", icon: XcodeIcon },
];

export function DesktopBackdrop() {
  const now = useClock();

  return (
    <div className="absolute inset-0 overflow-hidden select-none" aria-hidden>
      <Wallpaper />

      <div className="absolute top-0 left-0 right-0 h-7 bg-black/30 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-4 text-[12px] text-white/90">
        <div className="flex items-center gap-4">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.4 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-1-2.4-3.7zM14.2 6.1c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.1z" />
          </svg>
          {macMenus.map((menu, i) => (
            <span key={menu} className={i === 0 ? "font-semibold" : "hidden sm:inline"}>
              {menu}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3.5">
          <BatteryFull className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Search className="w-3.5 h-3.5" />
          <span className="tabular-nums">
            {now ? macBarFormatter.format(now) : ""}
          </span>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-2.5 px-3 py-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
        {macDock.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            tabIndex={-1}
            aria-label={label}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-1"
          >
            <Icon className="w-10 h-10" />
          </button>
        ))}
      </div>
    </div>
  );
}
