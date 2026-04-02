import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetCategoryParams, GetCategoryResponse } from "../types/category.type"
import { categoryService, type CreateCategoryPayload } from "../service/categoryService"
import { useAuthStore } from "../lib/store/authStore"

export const useCategory = () => {
    const { accessToken } = useAuthStore();

    const getCategories = (params : GetCategoryParams) => {
        return useQuery<GetCategoryResponse, Error>({
            queryKey: ['categories', params],
            queryFn: () => categoryService.getCategories(params),
            placeholderData: (prev) => prev
        })
    }

    const createCategory = useMutation({
        mutationFn: ({ data } : { data:  CreateCategoryPayload, accessToken : string}) => {
            return categoryService.createCategory(data, accessToken || "")
        },
        onSuccess: () => {
            window.location.reload();
        }
    })

    const updateCategory = useMutation({
        mutationFn: ({ id, data } : { id: string, data : { name: string }, accessToken : string}) => {
            return categoryService.updateCategory(id, data, accessToken || "")
        },
        onSuccess: () => {
            window.location.reload();
        }
    })

    const deleteCategory = useMutation({
        mutationFn: ({ id } : { id: string }) => {
            return categoryService.deleteCategory(id, accessToken || "")
        },
        onSuccess: () => {
            window.location.reload();
        }
     })

    return {
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}