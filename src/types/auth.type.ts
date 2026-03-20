import type { User } from './User.type';

export interface AuthState {
  user: User | null
  permissions: string[] | null
  token: string | null
  errorMessage: string | null;

  setErrorMessage: (message: string) => void;
  setAuth: (user: User, token: string, permissions: string[]) => void
  logout: () => void
}

export interface AuthResponse { 
  user: User
  token: string
  permissions: string[]
}


/*
*  THIS TYPES SHOULD BE UPDATED ACCORDING TO THE 
*  USER TABLE STRUCTURE
*/