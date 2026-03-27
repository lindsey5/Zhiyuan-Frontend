import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateProductResponse, GetProductsParams, GetProductsResponse, SearchProductResponse } from "../types/product";

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

  searchProduct: ({ params, accessToken } : { params : Record<string, string>, accessToken : string}) : Promise<SearchProductResponse> => {
    return apiAxios<SearchProductResponse>("products/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
      params
    })
  },
  searchVariant: ({ params, accessToken } : { params : Record<string, string>, accessToken : string}) : Promise<SearchProductResponse> => {
    return apiAxios<SearchProductResponse>("variants/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
      params
    })
  },
};