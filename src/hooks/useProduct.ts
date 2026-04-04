import { useMutation, useQuery } from "@tanstack/react-query"
import { productService } from "../service/productService"
import type { GetProductResponse, GetProductsParams, GetProductsResponse, UpdateProductPayload } from "../types/product.type"

export const useProduct = () => {

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
        mutationFn: ({ id } : { id: string }) => productService.deleteProduct(id),
    })

    const createProduct = useMutation({
        mutationFn: ({ formData } : { formData : FormData}) =>  productService.createProduct(formData),
        onSuccess: () => window.location.href = `/dashboard/products`,
        onError: (err) => console.log(err)
    })

    const updateProduct = useMutation({
        mutationFn: ({ id, data } : { id : string, data : UpdateProductPayload }) => productService.updateProduct(id, data),
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