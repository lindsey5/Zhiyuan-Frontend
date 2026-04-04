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

  createProduct: (data : FormData) : Promise<CreateProductResponse> => {
    return apiAxios<CreateProductResponse>("products", {
      method: HttpMethod.POST,
      data
    })
  },

  getProductById: (id : string) : Promise<GetProductResponse> => {
    return apiAxios<GetProductResponse>(`products/${id}`, {
      method: HttpMethod.GET
    })
  },

  updateProduct: (id: string, data : UpdateProductPayload) : Promise<UpdateProductResponse> => {
    return apiAxios<UpdateProductResponse>(`products/${id}`, {
      method: HttpMethod.PUT,
      data
    })
  },

  deleteProduct: (id: string) => {
    return apiAxios<ApiResponse>(`products/${id}`, {
      method: HttpMethod.DELETE,
    })
  },

  searchProduct: ({ params, id } : { params : Record<string, string>, id?: string}) : Promise<SearchProductResponse> => {
    return apiAxios<SearchProductResponse>("products/search", {
      method: HttpMethod.GET,
      params: { ...params, id }
    })
  },
  searchVariant: ({ params, id } : { params : Record<string, string>, id?: string }) : Promise<SearchProductResponse> => {
    return apiAxios<SearchProductResponse>("variants/search", {
      method: HttpMethod.GET,
      params: { ...params, id }
    })
  },
};