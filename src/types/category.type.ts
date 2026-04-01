import type { ApiResponse } from "./type";

export interface Category {
    _id: string;
    name: string;
    createdAt?: Date;
}

export interface GetCategoryResponse {
    success: boolean;
    categories: Category[];
}

export interface CreateAndUpdateCategoryResponse extends ApiResponse {
    category: Category;
}

export interface GetCategoryParams {
    search?: string;
}