import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { ApiResponse } from "../types/type";
import { type GetVariantsResponse, type GetVariantsParams, type UpdateVariantPayload, type UpdateVariantResponse, type DownloadVariantsParams } from "../types/variant.type";
import { errorToast } from "../utils/sileo";
import { downloadFile } from "../utils/utils";

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
        }),

    downloadVariants: async (params: DownloadVariantsParams) => {
        try{
            const response = await apiAxios<{
                data: string; // base64 string
                filename: string;
            }>(`variants/download`, {
                method: HttpMethod.GET,
                params,
            });

            downloadFile(response.data, response.filename);
        }catch(err : any){
            errorToast(err.message)
        }
    },
}