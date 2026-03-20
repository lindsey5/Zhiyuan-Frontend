import type { User } from './user.type';

export interface AuthState {
  user: User | null
  permissions: { action: string }[] | null
  token: string | null
  errorMessage: string | null;

  setErrorMessage: (message: string) => void;
  setAuth: (user: User, token: string, permissions: { action: string }[]) => void
  logout: () => void
}

export interface AuthResponse { 
  user: User
  token: string
  permissions: { action: string }[]
}


/*
*  THIS TYPES SHOULD BE UPDATED ACCORDING TO THE 
*  USER TABLE STRUCTURE
*/