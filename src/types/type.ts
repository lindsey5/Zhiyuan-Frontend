export interface SortOption {
    sortBy: string;
    order: 'asc' | 'desc';
}

export interface ApiResponse {
    success: boolean;
    message: string;
}

export interface CreateColumnsParams {
    hasPermissions: (requiredPermissions: string[], permissions: string[]) => boolean;
    hasAnyPermissions: (anyPermissions: string[], permissions: string[]) => boolean;
    permissions: string[];
}