export interface SortOption {
    sortBy: string;
    order: 'asc' | 'desc';
}

export interface ApiResponse {
    success: boolean;
    message: string;
}