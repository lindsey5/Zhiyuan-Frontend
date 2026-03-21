
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
  role: string;
}

export interface UserResponse {
  success: boolean,
  message?: string,
  user: User
}

export interface UpdateUserPayload {
  firstname: string;
  lastname: string;
  email: string
}