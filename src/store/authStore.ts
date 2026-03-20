import { create } from "zustand";
import type { AuthState } from "../types/auth.type";

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  permissions: JSON.parse(localStorage.getItem("permissions") || "null"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  errorMessage: null,

  setErrorMessage: (message) => {
    set({ errorMessage: message });
  },

  setAuth: (user, accessToken, refreshToken, permissions) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("permissions", JSON.stringify(permissions));

    set({
      user,
      accessToken,
      permissions,
      errorMessage: null,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("permissions");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      permissions: null,
      errorMessage: null,
    });
  },
}));