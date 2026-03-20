import type { User } from "../types/user.type";
import type { AuthResponse } from "../types/auth.type";
import { apiAxios, HttpMethod } from "../api/apiAxios";

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  login: (data: LoginPayload): Promise<AuthResponse> =>
    apiAxios<AuthResponse>("auth/login", {
      method: HttpMethod.POST,
      data,
    }),

  logout: (): Promise<void> =>
    apiAxios<void>("auth/logout", {
      method: HttpMethod.POST,
    }),

  getUser: (): Promise<User> =>
    apiAxios<User>("user"),
};