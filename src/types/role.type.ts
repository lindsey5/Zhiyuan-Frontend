
export interface OwnPermission {
    permissions: string[]
}

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