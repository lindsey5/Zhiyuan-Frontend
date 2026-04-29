import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { 
  type GetTotalLowStockProducts, 
  type CreateProductResponse, 
  type GetProductResponse, 
  type GetProductsParams, 
  type GetProductsResponse, 
  type GetTotalProductsResponse, 
  type SearchProductResponse, 
  type UpdateProductPayload, 
  type UpdateProductResponse, 
  type GetBestSellingProductsResponse 
} from "../types/product.type";
import type { ApiResponse } from "../types/type";
import type { GetVariantsParams, GetVariantsResponse } from "../types/variant.type";

export const productService = {
  getProducts: (params : GetProductsParams) => {
    return apiAxios<GetProductsResponse>("products", {
      method: HttpMethod.GET,
      params
    })
  },

  createProduct: (data : FormData) => {
    return apiAxios<CreateProductResponse>("products", {
      method: HttpMethod.POST,
      data
    })
  },

  getProductById: (id : string) => {
    return apiAxios<GetProductResponse>(`products/${id}`, {
      method: HttpMethod.GET
    })
  },

  getTotalProducts: () => {
    return apiAxios<GetTotalProductsResponse>('products/total', {
      method: HttpMethod.GET
    })
  },

  getLowStockProducts: (params : GetVariantsParams) => {
    return apiAxios<GetVariantsResponse>(`products/low-stocks`, {
      method: HttpMethod.GET,
      params
    })
  },

  getTotalLowStockProducts: () => {
    return apiAxios<GetTotalLowStockProducts>('products/low-stocks/total', {
      method: HttpMethod.GET
    })
  },

  getBestSellingProducts: () => {
    return apiAxios<GetBestSellingProductsResponse>(`products/best-selling`, {
      method: HttpMethod.GET,
    })
  },

  updateProduct: (id: string, data : UpdateProductPayload) => {
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

  searchProduct: ({ params, id } : { params : Record<string, string>, id?: string}) => {
    return apiAxios<SearchProductResponse>("products/search", {
      method: HttpMethod.GET,
      params: { ...params, id }
    })
  },
  searchVariant: ({ params, id } : { params : Record<string, string>, id?: string }) => {
    return apiAxios<SearchProductResponse>("variants/search", {
      method: HttpMethod.GET,
      params: { ...params, id }
    })
  },
};