import { useMutation, useQuery } from "@tanstack/react-query"
import { productService } from "../service/productService"
import type { GetProductResponse, GetProductsParams, GetProductsResponse, GetTotalLowStockProducts, GetTotalProductsResponse, UpdateProductPayload } from "../types/product.type"
import type { GetVariantsParams, GetVariantsResponse } from "../types/variant.type"

export const useProduct = () => {

    const getProducts = (params : GetProductsParams) => (
        useQuery<GetProductsResponse, Error>({
            queryKey: ['products', params],
            queryFn: () => productService.getProducts(params),
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
    
    const getTotalProducts = () => (
        useQuery<GetTotalProductsResponse, Error>({
            queryKey: ['products/total'],
            queryFn: () => productService.getTotalProducts(),
            refetchOnWindowFocus: false,
        })
    )

    const getLowStockProducts = (params : GetVariantsParams) => (
        useQuery<GetVariantsResponse, Error>({
            queryKey: ['products/low-stocks', params],
            queryFn: () => productService.getLowStockProducts(params),
            refetchOnWindowFocus: false,
        })
    )

    const getTotalLowStockProducts = () => (
        useQuery<GetTotalLowStockProducts, Error>({
            queryKey: ['products/low-stocks/total'],
            queryFn: () => productService.getTotalLowStockProducts(),
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
        getTotalProducts,
        getLowStockProducts,
        getTotalLowStockProducts,
        deleteProduct
    }

}