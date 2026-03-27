import { useMutation, useQuery } from "@tanstack/react-query"
import { productService } from "../service/productService"
import type { GetProductResponse, GetProductsParams, GetProductsResponse, Product, UpdateProductPayload } from "../types/product"

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

    const createProduct = useMutation({
        mutationFn: ({ formData, accessToken} : { formData : FormData, accessToken : string}) =>  {
            return productService.createProduct(formData, accessToken)
        },
        onSuccess: (data) => {
            window.location.href = `/dashboard/edit-product/${data.product.id}`;
        },
        onError: (err) => console.log(err)
    })

    const updateProduct = useMutation({
        mutationFn: ({ id, data } : { id : number, data : UpdateProductPayload }) => {
            return productService.updateProduct(id, data);
        },
        onSuccess: () => window.location.reload(),
        onError: (err) => console.log(err)
    })

    return {
        getProducts,
        createProduct,
        updateProduct,
        getProductById
    }

}