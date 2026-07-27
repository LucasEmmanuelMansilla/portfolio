import { create } from "zustand";
import type { VSCodeOpenTab } from "@/src/features/vscode/types/vscode";

interface VSCodeEditorStore {
  readonly openTabs: readonly VSCodeOpenTab[];
  readonly activePath: string | null;
  readonly selectedPath: string | null;
  readonly expandedFolders: ReadonlySet<string>;
  openFile: (path: string) => void;
  closeTab: (path: string) => void;
  setActivePath: (path: string) => void;
  toggleFolder: (path: string) => void;
}

function fileNameFromPath(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1] ?? path;
}

const DEFAULT_EXPANDED = new Set<string>(["src", "app"]);

export const useVSCodeEditorStore = create<VSCodeEditorStore>((set, get) => ({
  openTabs: [],
  activePath: null,
  selectedPath: null,
  expandedFolders: DEFAULT_EXPANDED,

  openFile: (path) => {
    const { openTabs } = get();
    const exists = openTabs.some((tab) => tab.path === path);

    set({
      selectedPath: path,
      activePath: path,
      openTabs: exists
        ? openTabs
        : [...openTabs, { path, name: fileNameFromPath(path) }],
    });
  },

  closeTab: (path) => {
    const { openTabs, activePath } = get();
    const nextTabs = openTabs.filter((tab) => tab.path !== path);

    let nextActive = activePath;
    if (activePath === path) {
      const closedIndex = openTabs.findIndex((tab) => tab.path === path);
      const fallback =
        nextTabs[Math.min(closedIndex, nextTabs.length - 1)] ?? null;
      nextActive = fallback?.path ?? null;
    }

    set({
      openTabs: nextTabs,
      activePath: nextActive,
      selectedPath: nextActive,
    });
  },

  setActivePath: (path) =>
    set({
      activePath: path,
      selectedPath: path,
    }),

  toggleFolder: (path) => {
    const next = new Set(get().expandedFolders);
    if (next.has(path)) {
      next.delete(path);
    } else {
      next.add(path);
    }
    set({ expandedFolders: next });
  },
}));
