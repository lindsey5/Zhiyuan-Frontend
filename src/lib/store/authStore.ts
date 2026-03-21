import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../../types/auth.type";
import type { User } from "../../types/user.type";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      errorMessage: null,

      setErrorMessage: (message) => set({ errorMessage: message }),

      setAuth: (accessToken: string, refreshToken : string) => {
        set({
          accessToken,
          refreshToken,
          errorMessage: null,
        });
      },

      setUser: (user : User) => set({ user }),
      isAuthenticated: () => {
        const { user, accessToken } = get();
        return !!(user && accessToken);
      },

      logout: () => {
        window.location.reload();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          errorMessage: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);