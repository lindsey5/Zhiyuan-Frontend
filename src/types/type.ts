export interface SortOption {
    sortBy: string;
    order: 'ASC' | 'DESC';
}

export interface ApiResponse {
    success: boolean;
    message: string;
}