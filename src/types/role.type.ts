import type { PERMISSIONS } from "../config/permission";

export interface Role {
    id: number
    name: string
    description: string
    permissions: Permission[]
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

export interface GetRolesResponse {
    success: boolean
    roles: Role[]
}

export interface CreateRoleResponse {
    success: boolean
    role: Role
    permissions: Permission[]
}

export interface RoleCreateDTO {
    name: string,
    description: string,
    permissions: typeof PERMISSIONS[keyof typeof PERMISSIONS]
}