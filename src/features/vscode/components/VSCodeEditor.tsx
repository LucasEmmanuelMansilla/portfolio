"use client";

import { useVSCodeEditorStore } from "@/src/features/vscode/store/vscodeEditorStore";
import { useVSCodeFile } from "@/src/features/vscode/hooks/useVSCodeFile";

export function VSCodeEditor() {
  const activePath = useVSCodeEditorStore((store) => store.activePath);
  const { data, isLoading, isError } = useVSCodeFile(activePath);

  if (!activePath) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#1e1e1e] text-[13px] text-[#6a6a6a]">
        Abrí un archivo desde el Explorer
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#1e1e1e] text-[13px] text-[#858585]">
        Cargando {activePath}…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#1e1e1e] text-[13px] text-[#f48771]">
        No se pudo cargar el archivo
      </div>
    );
  }

  return (
    <div className="vscode-editor min-h-0 flex-1 overflow-auto bg-[#1e1e1e]">
      <div
        className="vscode-shiki min-h-full text-[13px] leading-[1.5]"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </div>
  );
}
