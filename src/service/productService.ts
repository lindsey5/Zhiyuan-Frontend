import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateProductResponse, GetProductResponse, GetProductsParams, GetProductsResponse, SearchProductResponse, UpdateProductPayload, UpdateProductResponse } from "../types/product.type";
import type { ApiResponse } from "../types/type";

export const productService = {
  getProducts: (params : GetProductsParams): Promise<GetProductsResponse> => {
    return apiAxios<GetProductsResponse>("products", {
      method: HttpMethod.GET,
      params
    })
  },

  createProduct: (data : FormData, accessToken : string) : Promise<CreateProductResponse> => {
    return apiAxios<CreateProductResponse>("products", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.POST,
      data
    })
  },

  getProductById: (id : string) : Promise<GetProductResponse> => {
    return apiAxios<GetProductResponse>(`products/${id}`, {
      method: HttpMethod.GET
    })
  },

  updateProduct: (id: string, data : UpdateProductPayload, accessToken : string) : Promise<UpdateProductResponse> => {
    return apiAxios<UpdateProductResponse>(`products/${id}`, {
      method: HttpMethod.PUT,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data
    })
  },

  deleteProduct: (id: string, accessToken : string) => {
    return apiAxios<ApiResponse>(`products/${id}`, {
      method: HttpMethod.DELETE,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
  },

  searchProduct: ({ params, accessToken, id } : { params : Record<string, string>, id?: string, accessToken : string}) : Promise<SearchProductResponse> => {
    return apiAxios<SearchProductResponse>("products/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
      params: { ...params, id }
    })
  },
  searchVariant: ({ params, accessToken, id } : { params : Record<string, string>, id?: string, accessToken : string}) : Promise<SearchProductResponse> => {
    return apiAxios<SearchProductResponse>("variants/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
      params: { ...params, id }
    })
  },
};