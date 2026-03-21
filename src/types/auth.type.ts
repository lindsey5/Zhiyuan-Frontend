import type {  User, UserResponse } from './user.type';

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  errorMessage: string | null

  setErrorMessage: (message: string) => void;
  setAuth: (accessToken: string, refreshToken: string) => void
  setUser: (user : User) => void
  isAuthenticated: () => boolean
  logout: () => void
}

export interface AuthResponse { 
  user: User
  token: {
    accessToken: string
    refreshToken: string
  }
}


/*
*  THIS TYPES SHOULD BE UPDATED ACCORDING TO THE 
*  USER TABLE STRUCTURE
*/