import { create } from "zustand";
import type { AppTab } from "@/src/types/portfolio";

interface AppNavStore {
  readonly activeTab: AppTab;
  readonly previousTab: AppTab;
  readonly openProjectId: string | null;
  readonly chatFabVisible: boolean;
  setActiveTab: (tab: AppTab) => void;
  goBackFromChat: () => void;
  openProject: (id: string) => void;
  closeProject: () => void;
  setChatFabVisible: (visible: boolean) => void;
}

export const useAppNavStore = create<AppNavStore>((set) => ({
  activeTab: "home",
  previousTab: "home",
  openProjectId: null,
  chatFabVisible: true,

  setActiveTab: (tab) =>
    set((state) => {
      if (tab === "chat" && state.activeTab !== "chat") {
        return {
          activeTab: tab,
          previousTab: state.activeTab,
          openProjectId: null,
        };
      }

      return {
        activeTab: tab,
        openProjectId: null,
      };
    }),

  goBackFromChat: () =>
    set((state) => ({
      activeTab: state.previousTab,
    })),

  openProject: (id) => set({ openProjectId: id }),

  closeProject: () => set({ openProjectId: null }),

  setChatFabVisible: (visible) => set({ chatFabVisible: visible }),
}));
