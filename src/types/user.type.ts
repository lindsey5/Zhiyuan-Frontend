import type { PaginationResponse, PaginationState } from "./pagination.type";
import type { Role } from "./role.type";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
  role: string;
  createdAt: Date;
}

export interface UserResponse {
  success: boolean,
  user: User
}

export interface CreateUserResponse extends UserResponse {
  message?: string;
}

export interface CreateUserPayload {
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
  password: string;
}

export interface UpdateUserResponse extends UserResponse{
  message?: string;
}

export interface UpdateUserOwnPayload {
  firstname: string;
  lastname: string;
  email: string
}

export interface UpdateUserPayload {
  firstname: string;
  lastname: string;
  email: string
  role_id: string;
  password?: string;
}

export interface GetUsersCountResponse {
  success: boolean,
  usersCount: {
    role_name: string;
    total: number;
  }[]
}

export interface GetUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
  role: Role;
  createdAt: Date;
}

export interface GetUsersParams extends PaginationState {
  search?: string;
  role?: string;
}

export interface GetUsersResponse extends PaginationResponse {
  users: GetUser[]
}
