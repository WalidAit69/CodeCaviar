import { create } from "zustand";

type Store = {
  MenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const useMenu = create<Store>()((set) => ({
  MenuOpen: false,
  toggleMenu: () => set((state) => ({ MenuOpen: !state.MenuOpen })),
  closeMenu: () => set(() => ({ MenuOpen: false })),
}));
