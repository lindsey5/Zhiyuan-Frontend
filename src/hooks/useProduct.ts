import { useMutation, useQuery } from "@tanstack/react-query"
import { productService } from "../service/productService"
import type { GetProductResponse, GetProductsParams, GetProductsResponse, UpdateProductPayload } from "../types/product"
import { successToast } from "../utils/sileo"

export const useProduct = () => {

    const getProducts = (params : GetProductsParams) => {
        return useQuery<GetProductsResponse, Error>({
            queryKey: ['products', params],
            queryFn: () => productService.getProducts(params),
            placeholderData: (prev) => prev,
        })
    }

    const getProductById = (id : number) => {
        return useQuery<GetProductResponse, Error>({
            queryKey: [`products/${id}`],
            queryFn: () => productService.getProductById(id),
        })
    }

    const deleteProduct = useMutation({
        mutationFn: ({ id, accessToken } : { id: number, accessToken: string}) => {
            return productService.deleteProduct(id, accessToken);
        }
    })

    const createProduct = useMutation({
        mutationFn: ({ formData, accessToken} : { formData : FormData, accessToken : string}) =>  {
            return productService.createProduct(formData, accessToken)
        },
        onSuccess: () => {
            window.location.href = `/dashboard/products`;
        },
        onError: (err) => console.log(err)
    })

    const updateProduct = useMutation({
        mutationFn: ({ id, data, accessToken } : { id : number, data : UpdateProductPayload, accessToken : string }) => {
            return productService.updateProduct(id, data, accessToken);
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