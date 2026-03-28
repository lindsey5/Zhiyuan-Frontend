export interface SortOption {
    sortBy: string;
    order: 'ASC' | 'DESC';
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}