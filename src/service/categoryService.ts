import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateAndUpdateCategoryResponse, GetCategoryParams, GetCategoryResponse } from "../types/category.type";
import type { ApiResponse } from "../types/type";

export interface CreateCategoryPayload {
    name: string;
}

export const categoryService = {
    createCategory: (data: CreateCategoryPayload, accessToken : string): Promise<CreateAndUpdateCategoryResponse> =>
        apiAxios<CreateAndUpdateCategoryResponse>("categories", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.POST,
            data,
        }),

    getCategories: (params : GetCategoryParams): Promise<GetCategoryResponse> => 
        apiAxios<GetCategoryResponse>("categories", {
            method: HttpMethod.GET,
            params
        }),

    updateCategory: (id: number, data : { name: string }, accessToken : string) : Promise<CreateAndUpdateCategoryResponse> => 
        apiAxios<CreateAndUpdateCategoryResponse>(`categories/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.PUT,
            data
        }),

    deleteCategory: (id: number, accessToken : string) : Promise<ApiResponse> =>
        apiAxios<ApiResponse>(`categories/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.DELETE,
        })

};