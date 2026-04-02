import { useMutation, useQuery } from "@tanstack/react-query"
import { productService } from "../service/productService"
import type { GetProductResponse, GetProductsParams, GetProductsResponse, UpdateProductPayload } from "../types/product.type"
import { useAuthStore } from "../lib/store/authStore"

export const useProduct = () => {
    const { accessToken } = useAuthStore();

    const getProducts = (params : GetProductsParams) => {
        return useQuery<GetProductsResponse, Error>({
            queryKey: ['products', params],
            queryFn: () => productService.getProducts(params),
            placeholderData: (prev) => prev,
        })
    }

    const getProductById = (id : string) => {
        return useQuery<GetProductResponse, Error>({
            queryKey: ['product', id],
            queryFn: () => productService.getProductById(id),
        })
    }

    const deleteProduct = useMutation({
        mutationFn: ({ id } : { id: string }) => {
            return productService.deleteProduct(id, accessToken || "");
        },
        onSuccess: () => window.location.reload()
    })

    const createProduct = useMutation({
        mutationFn: ({ formData } : { formData : FormData}) =>  {
            return productService.createProduct(formData, accessToken || "")
        },
        onSuccess: () => {
            window.location.href = `/dashboard/products`;
        },
        onError: (err) => console.log(err)
    })

    const updateProduct = useMutation({
        mutationFn: ({ id, data } : { id : string, data : UpdateProductPayload }) => {
            console.log(data)
            return productService.updateProduct(id, data, accessToken || "");
        },
        onSuccess: () => window.location.reload(),
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