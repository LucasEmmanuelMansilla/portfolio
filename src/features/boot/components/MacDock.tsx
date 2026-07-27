"use client";

import type { ComponentType } from "react";
import {
  FinderIcon,
  SafariIcon,
  TerminalIcon,
  VSCodeIcon,
  XcodeIcon,
} from "@/src/features/boot/components/BrandIcons";
import { useVSCodeWindowStore } from "@/src/store/vscodeWindowStore";
import { cn } from "@/src/lib/cn";

type BrandIcon = ComponentType<{ readonly className?: string }>;

interface DockApp {
  readonly id: string;
  readonly label: string;
  readonly icon: BrandIcon;
  readonly interactive?: boolean;
}

const macDock: readonly DockApp[] = [
  { id: "finder", label: "Finder", icon: FinderIcon },
  { id: "safari", label: "Safari", icon: SafariIcon },
  { id: "terminal", label: "Terminal", icon: TerminalIcon },
  { id: "vscode", label: "VS Code", icon: VSCodeIcon, interactive: true },
  { id: "xcode", label: "Xcode", icon: XcodeIcon },
];

export function MacDock() {
  const isOpen = useVSCodeWindowStore((store) => store.isOpen);
  const isMinimized = useVSCodeWindowStore((store) => store.isMinimized);
  const toggle = useVSCodeWindowStore((store) => store.toggle);
  const restore = useVSCodeWindowStore((store) => store.restore);
  const open = useVSCodeWindowStore((store) => store.open);

  function handleVSCodeClick() {
    if (isOpen && isMinimized) {
      restore();
      return;
    }

    if (isOpen && !isMinimized) {
      toggle();
      return;
    }

    open();
  }

  return (
    <nav
      aria-label="Dock de aplicaciones"
      className="pointer-events-auto absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-end gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
    >
      {macDock.map(({ id, label, icon: Icon, interactive }) => {
        const isVSCode = id === "vscode";
        const showIndicator = isVSCode && isOpen;

        return (
          <div key={id} className="relative flex flex-col items-center">
            <button
              type="button"
              tabIndex={interactive ? 0 : -1}
              aria-label={
                isVSCode
                  ? isOpen && !isMinimized
                    ? "Minimizar Visual Studio Code"
                    : "Abrir Visual Studio Code"
                  : label
              }
              aria-pressed={isVSCode ? isOpen && !isMinimized : undefined}
              disabled={!interactive}
              onClick={isVSCode ? handleVSCodeClick : undefined}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl transition-transform",
                interactive &&
                  "cursor-pointer hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70",
                !interactive && "cursor-default"
              )}
            >
              <Icon className="h-10 w-10" />
            </button>
            <span
              className={cn(
                "mt-0.5 h-1 w-1 rounded-full bg-white/90 transition-opacity",
                showIndicator ? "opacity-100" : "opacity-0"
              )}
              aria-hidden
            />
          </div>
        );
      })}
    </nav>
  );
}
