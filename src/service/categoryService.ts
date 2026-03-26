import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateAndUpdateCategoryResponse, GetCategoryParams, GetCategoryResponse } from "../types/category";

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

    updateCategory: (id: number, data : { name: string }) : Promise<CreateAndUpdateCategoryResponse> => 
        apiAxios<CreateAndUpdateCategoryResponse>(`categories/${id}`, {
            method: HttpMethod.PUT,
            data
        })

};