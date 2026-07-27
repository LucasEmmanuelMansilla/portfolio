import type { VSCodeTreeNode } from "@/src/features/vscode/types/vscode";
import fileTreeJson from "@/src/features/vscode/data/fileTree.json";

export const vscodeFileTree = fileTreeJson as readonly VSCodeTreeNode[];

export function findFileName(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1] ?? path;
}
