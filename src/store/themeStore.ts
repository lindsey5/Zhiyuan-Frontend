import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true,

      toggleTheme: () => set((state) => {
        const nextMode = !state.isDark;
        if (nextMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return { isDark: nextMode };
      }),

      initTheme: () => {
        const storage = localStorage.getItem('theme-storage');
        const isDark = storage ? JSON.parse(storage).state.isDark : true;
        if (isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
    }),
    { name: 'theme-storage' }
  )
);