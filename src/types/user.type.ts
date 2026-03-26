
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
  role: string;
}

export interface UserResponse {
  success: boolean,
  user: User
}

export interface UpdateUserResponse extends UserResponse{
  message: string;
}

export interface UpdateUserPayload {
  firstname: string;
  lastname: string;
  email: string
}