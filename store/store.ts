import { create } from "zustand";

// Navbar menu
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

// Settings Menu
type Settings = {
  active: number;
  setactive: (index: number) => void;
};

export const useSettings = create<Settings>()((set) => ({
  active: 0,
  setactive: (index: number) => set(() => ({ active: index })),
}));
