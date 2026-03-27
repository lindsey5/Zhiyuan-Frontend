import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateProductResponse, GetProductResponse, GetProductsParams, GetProductsResponse, SearchProductResponse, UpdateProductPayload, UpdateProductResponse } from "../types/product";

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

  getProductById: (id : number) : Promise<GetProductResponse> => {
    return apiAxios<GetProductResponse>(`products/${id}`, {
      method: HttpMethod.GET
    })
  },

  updateProduct: (id : number, data : UpdateProductPayload) : Promise<UpdateProductResponse> => {
    return apiAxios<GetProductResponse>(`products/${id}`, {
      method: HttpMethod.PUT,
      data
    })
  },

  searchProduct: ({ params, accessToken, id } : { params : Record<string, string>, id?: number, accessToken : string}) : Promise<SearchProductResponse> => {
    return apiAxios<SearchProductResponse>("products/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
      params: { ...params, id }
    })
  },
  searchVariant: ({ params, accessToken, id } : { params : Record<string, string>, id?: number, accessToken : string}) : Promise<SearchProductResponse> => {
    return apiAxios<SearchProductResponse>("variants/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
      params: { ...params, id }
    })
  },
};