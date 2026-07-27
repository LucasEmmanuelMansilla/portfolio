"use client";

import { VSCodeFileTree } from "@/src/features/vscode/components/VSCodeFileTree";
import { vscodeFileTree } from "@/src/features/vscode/lib/fileTree";

export function VSCodeSideBar() {
  return (
    <aside
      aria-label="Explorer"
      className="flex w-[220px] shrink-0 flex-col border-r border-[#2b2b2b] bg-[#252526]"
    >
      <div className="flex h-9 items-center px-4 text-[11px] font-semibold tracking-wide text-[#bbbbbb]">
        EXPLORER
      </div>
      <div className="flex h-7 items-center px-3 text-[11px] font-semibold tracking-wide text-[#cccccc]">
        PORTFOLIO
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pb-2">
        <VSCodeFileTree nodes={vscodeFileTree} />
      </div>
    </aside>
  );
}
