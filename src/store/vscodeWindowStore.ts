import { create } from "zustand";

interface WindowPosition {
  readonly x: number;
  readonly y: number;
}

interface VSCodeWindowStore {
  readonly isOpen: boolean;
  readonly isMinimized: boolean;
  readonly position: WindowPosition;
  open: () => void;
  close: () => void;
  minimize: () => void;
  restore: () => void;
  toggle: () => void;
  setPosition: (position: WindowPosition) => void;
}

const DEFAULT_POSITION: WindowPosition = { x: 72, y: 48 };

export const useVSCodeWindowStore = create<VSCodeWindowStore>((set, get) => ({
  isOpen: false,
  isMinimized: false,
  position: DEFAULT_POSITION,

  open: () => set({ isOpen: true, isMinimized: false }),

  close: () => set({ isOpen: false, isMinimized: false }),

  minimize: () => set({ isMinimized: true }),

  restore: () => set({ isOpen: true, isMinimized: false }),

  toggle: () => {
    const { isOpen, isMinimized } = get();

    if (!isOpen) {
      set({ isOpen: true, isMinimized: false });
      return;
    }

    if (isMinimized) {
      set({ isMinimized: false });
      return;
    }

    set({ isMinimized: true });
  },

  setPosition: (position) => set({ position }),
}));
