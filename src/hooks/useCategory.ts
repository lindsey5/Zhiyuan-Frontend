import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetCategoryParams, GetCategoryResponse } from "../types/category.type"
import { categoryService, type CreateCategoryPayload } from "../service/categoryService"

export const useCategory = () => {

    const getCategories = (params : GetCategoryParams) => (
        useQuery<GetCategoryResponse, Error>({
            queryKey: ['categories', params],
            queryFn: () => categoryService.getCategories(params),
            refetchOnWindowFocus: false,
        })
    )

    const createCategory = useMutation({
        mutationFn: ({ data } : { data:  CreateCategoryPayload }) => categoryService.createCategory(data)
    })

    const updateCategory = useMutation({
        mutationFn: ({ id, data } : { id: string, data : { name: string } }) => categoryService.updateCategory(id, data)
    })

    const deleteCategory = useMutation({
        mutationFn: ({ id } : { id: string }) => categoryService.deleteCategory(id)
     })

    return {
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}