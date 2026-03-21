export interface Role {
    id: number;
    name: string; 
    description: string;
    permissions: Permission[]
}

export interface Permission {
    id: number;
    action: string;
    role_id: number;
}

export interface OwnPermissionResponse {
    success: boolean
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