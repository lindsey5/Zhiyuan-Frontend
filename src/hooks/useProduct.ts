import { useMutation, useQuery } from "@tanstack/react-query"
import { productService } from "../service/productService"
import type { GetProductsParams, GetProductsResponse } from "../types/product"

export const useProduct = () => {

    const getProducts = (params : GetProductsParams) => {
        return useQuery<GetProductsResponse, Error>({
            queryKey: ['products', params],
            queryFn: () => productService.getProducts(params),
            placeholderData: (prev) => prev,
        })
    }

    const createProduct = useMutation({
        mutationFn: ({ formData, accessToken} : { formData : FormData, accessToken : string}) =>  {
            return productService.createProduct(formData, accessToken)
        },
        onSuccess: () => {
            window.location.reload();
        },
        onError: (err) => console.log(err)
    })

    return {
        getProducts,
        createProduct,
    }

}