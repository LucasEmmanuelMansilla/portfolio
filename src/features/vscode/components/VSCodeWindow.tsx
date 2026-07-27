"use client";

import { m } from "framer-motion";
import { VSCodeTitleBar } from "@/src/features/vscode/components/VSCodeTitleBar";
import { VSCodeActivityBar } from "@/src/features/vscode/components/VSCodeActivityBar";
import { VSCodeSideBar } from "@/src/features/vscode/components/VSCodeSideBar";
import { VSCodeTabBar } from "@/src/features/vscode/components/VSCodeTabBar";
import { VSCodeEditor } from "@/src/features/vscode/components/VSCodeEditor";
import { VSCodeStatusBar } from "@/src/features/vscode/components/VSCodeStatusBar";
import { useVSCodeEditorStore } from "@/src/features/vscode/store/vscodeEditorStore";
import { useVSCodeWindowStore } from "@/src/store/vscodeWindowStore";
import { findFileName } from "@/src/features/vscode/lib/fileTree";

export function VSCodeWindow() {
  const isOpen = useVSCodeWindowStore((store) => store.isOpen);
  const isMinimized = useVSCodeWindowStore((store) => store.isMinimized);
  const position = useVSCodeWindowStore((store) => store.position);
  const activePath = useVSCodeEditorStore((store) => store.activePath);

  if (!isOpen || isMinimized) {
    return null;
  }

  const activeFileName = activePath ? findFileName(activePath) : null;

  return (
    <m.div
      role="dialog"
      aria-label="Visual Studio Code"
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      style={{ left: position.x, top: position.y }}
      className="pointer-events-auto absolute z-40 flex h-[min(720px,calc(100dvh-96px))] w-[min(980px,calc(100vw-48px))] flex-col overflow-hidden rounded-lg border border-[#111111] bg-[#1e1e1e] shadow-[0_24px_80px_rgba(0,0,0,0.55)] font-[family-name:var(--font-fira-code),ui-monospace,monospace]"
    >
      <VSCodeTitleBar activeFileName={activeFileName} />
      <div className="flex min-h-0 flex-1">
        <VSCodeActivityBar />
        <VSCodeSideBar />
        <div className="flex min-w-0 flex-1 flex-col">
          <VSCodeTabBar />
          <VSCodeEditor />
        </div>
      </div>
      <VSCodeStatusBar />
    </m.div>
  );
}
