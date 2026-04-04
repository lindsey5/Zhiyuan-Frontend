export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginationResponse {
    success: boolean;
    page: number;
    limit: number;
    totalPages: number;
    total: number;
}