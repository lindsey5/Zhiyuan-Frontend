import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetCategoryParams, GetCategoryResponse } from "../types/category"
import { categoryService, type CreateCategoryPayload } from "../service/categoryService"
import { successToast } from "../utils/sileo"

export const useCategory = () => {
    const getCategories = (params : GetCategoryParams) => {
        return useQuery<GetCategoryResponse, Error>({
            queryKey: ['categories', params],
            queryFn: () => categoryService.getCategories(params)
        })
    }

    const createCategory = useMutation({
        mutationFn: (data:  CreateCategoryPayload) => categoryService.createCategory(data),
        onSuccess: (response) => {
            successToast(response.message || "Success");
            window.location.reload();
        }
    })

    const updateCategory = useMutation({
        mutationFn: ({ id, data } : { id: number, data : { name: string }}) => categoryService.updateCategory(id, data),
        onSuccess: (response) => {
            successToast(response.message || "Success");
            window.location.reload();
        }
    })

    return {
        getCategories,
        createCategory,
        updateCategory
    }
}