import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetProductsParams, GetProductsResponse } from "../types/product";

export const productService = {
  getProducts: (params : GetProductsParams): Promise<GetProductsResponse> => {
    return apiAxios<GetProductsResponse>("products", {
      method: HttpMethod.GET,
      params
    })
  },
};