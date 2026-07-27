"use client";

import { X } from "lucide-react";
import { useVSCodeEditorStore } from "@/src/features/vscode/store/vscodeEditorStore";
import { cn } from "@/src/lib/cn";

export function VSCodeTabBar() {
  const openTabs = useVSCodeEditorStore((store) => store.openTabs);
  const activePath = useVSCodeEditorStore((store) => store.activePath);
  const setActivePath = useVSCodeEditorStore((store) => store.setActivePath);
  const closeTab = useVSCodeEditorStore((store) => store.closeTab);

  if (openTabs.length === 0) {
    return (
      <div className="flex h-9 shrink-0 border-b border-[#2b2b2b] bg-[#252526]" />
    );
  }

  return (
    <div
      role="tablist"
      aria-label="Archivos abiertos"
      className="flex h-9 shrink-0 overflow-x-auto border-b border-[#2b2b2b] bg-[#252526]"
    >
      {openTabs.map((tab) => {
        const isActive = tab.path === activePath;

        return (
          <div
            key={tab.path}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "group flex h-full min-w-[120px] max-w-[200px] items-center gap-2 border-r border-[#2b2b2b] px-3 text-[13px]",
              isActive
                ? "bg-[#1e1e1e] text-[#ffffff]"
                : "bg-[#2d2d2d] text-[#969696] hover:bg-[#292929]"
            )}
          >
            <button
              type="button"
              onClick={() => setActivePath(tab.path)}
              className="min-w-0 flex-1 truncate text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#007fd4]"
            >
              {tab.name}
            </button>
            <button
              type="button"
              aria-label={`Cerrar ${tab.name}`}
              onClick={(event) => {
                event.stopPropagation();
                closeTab(tab.path);
              }}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[#cccccc] hover:bg-white/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#007fd4]",
                !isActive && "opacity-0 group-hover:opacity-100"
              )}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
