"use client";

import { useVSCodeEditorStore } from "@/src/features/vscode/store/vscodeEditorStore";
import { useVSCodeFile } from "@/src/features/vscode/hooks/useVSCodeFile";

function formatLanguageLabel(language: string): string {
  const labels: Record<string, string> = {
    typescript: "TypeScript",
    tsx: "TypeScript React",
    javascript: "JavaScript",
    jsx: "JavaScript React",
    json: "JSON",
    css: "CSS",
    markdown: "Markdown",
    mdx: "MDX",
    html: "HTML",
    xml: "XML",
    plaintext: "Plain Text",
  };

  return labels[language] ?? language;
}

export function VSCodeStatusBar() {
  const activePath = useVSCodeEditorStore((store) => store.activePath);
  const { data } = useVSCodeFile(activePath);

  return (
    <footer className="flex h-6 shrink-0 items-center justify-between bg-[#007acc] px-3 text-[12px] text-white">
      <div className="flex items-center gap-3">
        <span>main*</span>
        <span>0↓ 1↑</span>
      </div>
      <div className="flex items-center gap-3">
        {data ? (
          <>
            <span>Ln 1, Col 1</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span>{formatLanguageLabel(data.language)}</span>
          </>
        ) : (
          <>
            <span>UTF-8</span>
            <span>TypeScript React</span>
          </>
        )}
      </div>
    </footer>
  );
}
