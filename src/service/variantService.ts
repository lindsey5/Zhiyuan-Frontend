import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type GetVariantsResponse, type GetVariantsParams } from "../types/variant";


export const variantService = {
    getVariants: (params : GetVariantsParams, accessToken : string) => 
        apiAxios<GetVariantsResponse>("variants", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params,
            method: HttpMethod.GET,
        })
}