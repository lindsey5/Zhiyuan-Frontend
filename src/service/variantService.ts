import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { ApiResponse } from "../types/type";
import { type GetVariantsResponse, type GetVariantsParams, type UpdateVariantPayload, type UpdateVariantResponse } from "../types/variant.type";

export const variantService = {
    getVariants: (params : GetVariantsParams) => 
        apiAxios<GetVariantsResponse>("variants", {
            params,
            method: HttpMethod.GET,
        }),
    
    deleteVariant: (id: string) => 
        apiAxios<ApiResponse>(`variants/${id}`, {
            method: HttpMethod.DELETE
        }),

    updateVariant: (id: string, data: UpdateVariantPayload) => 
        apiAxios<UpdateVariantResponse>(`variants/${id}`, {
            method: HttpMethod.PUT,
            data
        })
}