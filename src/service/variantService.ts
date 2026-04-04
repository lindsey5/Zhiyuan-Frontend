import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type GetVariantsResponse, type GetVariantsParams } from "../types/variant";

export const variantService = {
    getVariants: (params : GetVariantsParams) => 
        apiAxios<GetVariantsResponse>("variants", {
            params,
            method: HttpMethod.GET,
        })
}