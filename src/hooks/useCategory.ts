import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetCategoryParams, GetCategoryResponse } from "../types/category"
import { categoryService, type CreateCategoryPayload } from "../service/categoryService"

export const useCategory = () => {
    const getCategories = (params : GetCategoryParams) => {
        return useQuery<GetCategoryResponse, Error>({
            queryKey: ['categories', params],
            queryFn: () => categoryService.getCategories(params),
            placeholderData: (prev) => prev
        })
    }

    const createCategory = useMutation({
        mutationFn: ({ data, accessToken } : { data:  CreateCategoryPayload, accessToken : string}) => {
            return categoryService.createCategory(data, accessToken)
        },
        onSuccess: () => {
            window.location.reload();
        }
    })

    const updateCategory = useMutation({
        mutationFn: ({ id, data, accessToken } : { id: number, data : { name: string }, accessToken : string}) => {
            return categoryService.updateCategory(id, data, accessToken)
        },
        onSuccess: () => {
            window.location.reload();
        }
    })

    return {
        getCategories,
        createCategory,
        updateCategory
    }
}