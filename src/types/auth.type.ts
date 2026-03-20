import type { User } from './user.type';

export interface AuthState {
  user: User | null
  permissions: { action: string }[] | null
  accessToken: string | null
  refreshToken: string | null
  errorMessage: string | null;

  setErrorMessage: (message: string) => void;
  setAuth: (user: User, accessToken: string, refreshToken: string, permissions: { action: string }[]) => void
  logout: () => void
}

export interface AuthResponse { 
  user: User
  accessToken: string
  refreshToken: string
  permissions: { action: string }[]
}


/*
*  THIS TYPES SHOULD BE UPDATED ACCORDING TO THE 
*  USER TABLE STRUCTURE
*/