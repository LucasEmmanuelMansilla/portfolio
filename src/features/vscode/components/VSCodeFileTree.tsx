"use client";

import { ChevronDown, ChevronRight, FileCode2, Folder, FolderOpen } from "lucide-react";
import type { VSCodeTreeNode } from "@/src/features/vscode/types/vscode";
import { useVSCodeEditorStore } from "@/src/features/vscode/store/vscodeEditorStore";
import { cn } from "@/src/lib/cn";

interface VSCodeFileTreeProps {
  readonly nodes: readonly VSCodeTreeNode[];
  readonly depth?: number;
}

interface TreeRowProps {
  readonly node: VSCodeTreeNode;
  readonly depth: number;
}

function TreeRow({ node, depth }: TreeRowProps) {
  const expandedFolders = useVSCodeEditorStore((store) => store.expandedFolders);
  const selectedPath = useVSCodeEditorStore((store) => store.selectedPath);
  const toggleFolder = useVSCodeEditorStore((store) => store.toggleFolder);
  const openFile = useVSCodeEditorStore((store) => store.openFile);

  const paddingLeft = 8 + depth * 12;

  if (node.type === "folder") {
    const isExpanded = expandedFolders.has(node.path);

    return (
      <div>
        <button
          type="button"
          onClick={() => toggleFolder(node.path)}
          className="flex w-full items-center gap-1 py-[2px] pr-2 text-left text-[13px] text-[#cccccc] hover:bg-[#2a2d2e] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#007fd4]"
          style={{ paddingLeft }}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#c5c5c5]" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#c5c5c5]" />
          )}
          {isExpanded ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-[#dcb67a]" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-[#dcb67a]" />
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {isExpanded && (
          <VSCodeFileTree nodes={node.children} depth={depth + 1} />
        )}
      </div>
    );
  }

  const isSelected = selectedPath === node.path;

  return (
    <button
      type="button"
      onClick={() => openFile(node.path)}
      className={cn(
        "flex w-full items-center gap-1.5 py-[2px] pr-2 text-left text-[13px] text-[#cccccc] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#007fd4]",
        isSelected ? "bg-[#37373d]" : "hover:bg-[#2a2d2e]"
      )}
      style={{ paddingLeft: paddingLeft + 14 }}
      aria-current={isSelected ? "true" : undefined}
    >
      <FileCode2 className="h-4 w-4 shrink-0 text-[#519aba]" />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

export function VSCodeFileTree({ nodes, depth = 0 }: VSCodeFileTreeProps) {
  return (
    <div role={depth === 0 ? "tree" : undefined}>
      {nodes.map((node) => (
        <TreeRow key={node.path} node={node} depth={depth} />
      ))}
    </div>
  );
}
