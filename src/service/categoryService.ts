import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateAndUpdateCategoryResponse, GetCategoryParams, GetCategoryResponse } from "../types/category.type";
import type { ApiResponse } from "../types/type";

export interface CreateCategoryPayload {
    name: string;
}

export const categoryService = {
    createCategory: (data: CreateCategoryPayload): Promise<CreateAndUpdateCategoryResponse> =>
        apiAxios<CreateAndUpdateCategoryResponse>("categories", {
            method: HttpMethod.POST,
            data,
        }),

    getCategories: (params : GetCategoryParams): Promise<GetCategoryResponse> => 
        apiAxios<GetCategoryResponse>("categories", {
            method: HttpMethod.GET,
            params
        }),

    updateCategory: (id: string, data : { name: string }) : Promise<CreateAndUpdateCategoryResponse> => 
        apiAxios<CreateAndUpdateCategoryResponse>(`categories/${id}`, {
            method: HttpMethod.PUT,
            data
        }),

    deleteCategory: (id: string) : Promise<ApiResponse> =>
        apiAxios<ApiResponse>(`categories/${id}`, {
            method: HttpMethod.DELETE,
        })

};