import type { ApiResponse } from "./type";

export interface Role {
    id: number
    name: string
    description: string
    permissions: Permission[]
    createdAt: Date;
}

export interface Permission {
    id: number;
    action: string;
    role_id: number;
}

export interface GetRoleResponse {
    success: boolean
    role: Role
    permissions: string[]
}

export interface RoleWithUsersCount extends Role{
    usersCount: number;
}

export interface GetRolesResponse {
    success: boolean
    roles: RoleWithUsersCount[]
}

export interface CreateRoleResponse {
    success: boolean
    role: Role
    message?: string
    permissions: Permission[]
}

export interface RoleDTO {
    name: string,
    description: string,
    permissions: string[]
}

export interface UpdateRoleResponse extends ApiResponse {
    role: Role
}