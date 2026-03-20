import { apiClient } from "../api/api";
import type { User } from "../types/User.type";
import type { AuthResponse } from "../types/auth.type";

export interface LoginPayload {
  email: string
  password: string
}

export const authService = {

  login: (data: LoginPayload): Promise<AuthResponse> =>
    apiClient("auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiClient("auth/logout", {
      method: "POST",
    }),

  getUser: (): Promise<User> =>
    apiClient("user"),

}