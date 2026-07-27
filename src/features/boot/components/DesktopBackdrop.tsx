"use client";

import { BatteryFull, Search, Wifi } from "lucide-react";
import { Wallpaper } from "@/src/features/boot/components/Wallpaper";
import { MacDock } from "@/src/features/boot/components/MacDock";
import { useClock } from "@/src/hooks/useClock";

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

export function DesktopBackdrop() {
  const now = useClock();

  return (
    <div className="absolute inset-0 overflow-hidden select-none">
      <div className="absolute inset-0" aria-hidden>
        <Wallpaper />

        <div className="absolute top-0 left-0 right-0 flex h-7 items-center justify-between border-b border-white/10 bg-black/30 px-4 text-[12px] text-white/90 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.4 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-1-2.4-3.7zM14.2 6.1c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.1z" />
            </svg>
            {macMenus.map((menu, i) => (
              <span
                key={menu}
                className={i === 0 ? "font-semibold" : "hidden sm:inline"}
              >
                {menu}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3.5">
            <BatteryFull className="h-4 w-4" />
            <Wifi className="h-4 w-4" />
            <Search className="h-3.5 w-3.5" />
            <span className="tabular-nums">
              {now ? macBarFormatter.format(now) : ""}
            </span>
          </div>
        </div>
      </div>

      <MacDock />
    </div>
  );
}
