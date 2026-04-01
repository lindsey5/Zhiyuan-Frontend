import type { AuthResponse, DistributorAuthResponse } from "../types/auth.type";
import { apiAxios, distributorApi, HttpMethod } from "../lib/api/apiAxios";

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

  refreshAccessToken: (refreshToken : string): Promise<AuthResponse> => 
    apiAxios<AuthResponse>("auth/refreshToken", {
      method: HttpMethod.POST,
      data: { refreshToken }
    }),

  distributorLogin: (data: LoginPayload): Promise<DistributorAuthResponse> =>
    distributorApi<DistributorAuthResponse>("auth/login/distributor", {
      method: HttpMethod.POST,
      data,
    }),
    
  distributorRefreshAccessToken: (refreshToken : string): Promise<DistributorAuthResponse> => 
    distributorApi<DistributorAuthResponse>("auth/refreshToken/distributor", {
      method: HttpMethod.POST,
      data: { refreshToken }
    })
};