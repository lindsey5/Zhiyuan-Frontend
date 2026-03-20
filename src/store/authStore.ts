import { create } from "zustand";
import type { AuthState } from "../types/auth.type";

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  permissions: JSON.parse(localStorage.getItem("permissions") || "null"),
  token: localStorage.getItem("token"),
  errorMessage: null,

  setErrorMessage: (message) => {
    set({ errorMessage: message });
  },

  setAuth: (user, token, permissions) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("permissions", JSON.stringify(permissions));

    set({
      user,
      token,
      permissions,
      errorMessage: null, // ✅ clear error on success
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");

    set({
      user: null,
      token: null,
      permissions: null,
      errorMessage: null,
    });
  },
}));