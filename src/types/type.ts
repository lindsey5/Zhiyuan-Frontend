export interface SortOption {
    sortBy: string;
    order: 'asc' | 'desc';
}

export interface ApiResponse {
    success: boolean;
    message: string;
}

export interface CreateColumnsParams {
    hasPermissions: (requiredPermissions: string[]) => boolean;
    hasAnyPermissions: (anyPermissions: string[]) => boolean;
}