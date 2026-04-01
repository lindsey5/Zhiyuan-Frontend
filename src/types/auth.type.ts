import type { Distributor } from './distributor.type';
import type { User } from './user.type';

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null

  setAuth: (accessToken: string, refreshToken: string) => void
  setUser: (user : User) => void
  isAuthenticated: () => boolean
  logout: () => void
}

export interface AuthResponse { 
  success: boolean
  user: User
  token: {
    accessToken: string
    refreshToken: string
  }
}

export interface DistributorAuthState {
  distributor: Distributor | null
  accessToken: string | null
  refreshToken: string | null

  setAuth: (accessToken: string, refreshToken: string) => void
  setDistributor: (distributor : Distributor) => void
  isAuthenticated: () => boolean
  logout: () => void
}

export interface DistributorAuthResponse { 
  success: boolean
  distributor: Distributor
  token: {
    accessToken: string
    refreshToken: string
  }
}