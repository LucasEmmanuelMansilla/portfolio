"use client";

import { useVSCodeWindowStore } from "@/src/store/vscodeWindowStore";
import { useWindowDrag } from "@/src/features/vscode/hooks/useWindowDrag";
import { cn } from "@/src/lib/cn";

interface VSCodeTitleBarProps {
  readonly activeFileName: string | null;
}

export function VSCodeTitleBar({ activeFileName }: VSCodeTitleBarProps) {
  const position = useVSCodeWindowStore((store) => store.position);
  const setPosition = useVSCodeWindowStore((store) => store.setPosition);
  const close = useVSCodeWindowStore((store) => store.close);
  const minimize = useVSCodeWindowStore((store) => store.minimize);

  const { onPointerDown } = useWindowDrag({
    position,
    onPositionChange: setPosition,
  });

  const title = activeFileName
    ? `${activeFileName} — portfolio — Visual Studio Code`
    : "portfolio — Visual Studio Code";

  return (
    <div
      onPointerDown={onPointerDown}
      className="flex h-9 shrink-0 cursor-default items-center gap-3 border-b border-[#2b2b2b] bg-[#3c3c3c] px-3 select-none"
    >
      <div data-no-drag className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Cerrar Visual Studio Code"
          onClick={close}
          className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        />
        <button
          type="button"
          aria-label="Minimizar Visual Studio Code"
          onClick={minimize}
          className="h-3 w-3 rounded-full bg-[#febc2e] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        />
        <span
          aria-hidden
          className="h-3 w-3 rounded-full bg-[#28c840] opacity-80"
        />
      </div>
      <p
        className={cn(
          "min-w-0 flex-1 truncate text-center text-[12px] text-[#cccccc]"
        )}
      >
        {title}
      </p>
      <div className="w-14 shrink-0" aria-hidden />
    </div>
  );
}
