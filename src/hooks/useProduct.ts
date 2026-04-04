import { useMutation, useQuery } from "@tanstack/react-query"
import { productService } from "../service/productService"
import type { GetProductResponse, GetProductsParams, GetProductsResponse, UpdateProductPayload } from "../types/product.type"
import { useAuthStore } from "../lib/store/authStore"

export const useProduct = () => {
    const { accessToken } = useAuthStore();

    const getProducts = (params : GetProductsParams) => (
        useQuery<GetProductsResponse, Error>({
            queryKey: ['products', params],
            queryFn: () => productService.getProducts(params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getProductById = (id : string) => (
        useQuery<GetProductResponse, Error>({
            queryKey: ['product', id],
            queryFn: () => productService.getProductById(id),
            refetchOnWindowFocus: false,
        })
    )

    const deleteProduct = useMutation({
        mutationFn: ({ id } : { id: string }) => productService.deleteProduct(id, accessToken || ""),
    })

    const createProduct = useMutation({
        mutationFn: ({ formData } : { formData : FormData}) =>  productService.createProduct(formData, accessToken || ""),
        onSuccess: () => window.location.href = `/dashboard/products`,
        onError: (err) => console.log(err)
    })

    const updateProduct = useMutation({
        mutationFn: ({ id, data } : { id : string, data : UpdateProductPayload }) => productService.updateProduct(id, data, accessToken || ""),
        onError: (err) => console.log(err)
    })

    return {
        getProducts,
        createProduct,
        updateProduct,
        getProductById,
        deleteProduct
    }

}