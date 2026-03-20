import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types/auth.type";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      permissions: null,
      accessToken: null,
      refreshToken: null,
      errorMessage: null,

      setErrorMessage: (message) => {
        set({ errorMessage: message });
      },

      setAuth: (user, accessToken, refreshToken, permissions) => {
        set({
          user,
          accessToken,
          refreshToken,
          permissions,
          errorMessage: null,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          permissions: null,
          errorMessage: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);