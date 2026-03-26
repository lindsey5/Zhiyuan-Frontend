
export interface Category {
    id: number;
    name: string;
    createdAt: Date;
}

export interface GetCategoryResponse {
    success: boolean;
    categories: Category[];
}

export interface CreateAndUpdateCategoryResponse {
    success: boolean;
    message?: string;
    category: Category;
}

export interface GetCategoryParams {
    search?: string;
}