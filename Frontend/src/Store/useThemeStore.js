import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("mergePad-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("mergePad-theme", theme);
    set({ theme });
  },
}));
