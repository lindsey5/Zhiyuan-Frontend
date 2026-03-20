import type { User } from './User.type';

export interface AuthState {
  user: User | null
  permissions: string[] | null
  token: string | null

  email: string; 
  password: string;
  
  errorMessage: string;

  setErrorMessage: (message: string) => void;
  setCredentials: (email: string , password: string) => void
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