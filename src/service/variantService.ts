import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type GetVariantsResponse, type GetVariantsParams } from "../types/variant.type";

export const variantService = {
    getVariants: (params : GetVariantsParams) => 
        apiAxios<GetVariantsResponse>("variants", {
            params,
            method: HttpMethod.GET,
        })
}