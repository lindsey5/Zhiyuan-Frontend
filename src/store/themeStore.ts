import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false,

      toggleTheme: () => {
        const next = !get().isDark;
        set({ isDark: next });
        applyTheme(next);
      },

      initTheme: () => {
        const isDark = get().isDark;
        applyTheme(isDark);
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

function applyTheme(isDark: boolean) {
  if (typeof document === "undefined") return;

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}