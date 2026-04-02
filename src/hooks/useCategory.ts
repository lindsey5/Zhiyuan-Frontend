import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetCategoryParams, GetCategoryResponse } from "../types/category.type"
import { categoryService, type CreateCategoryPayload } from "../service/categoryService"
import { useAuthStore } from "../lib/store/authStore"

export const useCategory = () => {
    const { accessToken } = useAuthStore();

    const getCategories = (params : GetCategoryParams) => (
        useQuery<GetCategoryResponse, Error>({
            queryKey: ['categories', params],
            queryFn: () => categoryService.getCategories(params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const createCategory = useMutation({
        mutationFn: ({ data } : { data:  CreateCategoryPayload, accessToken : string}) => categoryService.createCategory(data, accessToken || "")
    })

    const updateCategory = useMutation({
        mutationFn: ({ id, data } : { id: string, data : { name: string }, accessToken : string}) => categoryService.updateCategory(id, data, accessToken || "")
    })

    const deleteCategory = useMutation({
        mutationFn: ({ id } : { id: string }) => categoryService.deleteCategory(id, accessToken || "")
     })

    return {
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}