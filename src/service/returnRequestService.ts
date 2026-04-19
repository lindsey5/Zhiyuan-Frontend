import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetReturnRequestsResponse, UpdateReturnRequestItemsResponse } from "../types/returnRequest.type";
import type { GetSponsoredItemsParams } from "../types/sponsored-item";

export const returnRequestService = {
    updateAllReturnRequestItems: (data : { status : string; distributor_id: string; return_id: string; }) => apiAxios<UpdateReturnRequestItemsResponse>(`return-requests/${data.return_id}/${data.distributor_id}`, {
            method: HttpMethod.PUT,
            data: { status: data.status }
        }),

    updateReturnRequestItem: (data : { status : string; distributor_id: string; variant_id: string, return_id: string;}) => 
        apiAxios<UpdateReturnRequestItemsResponse>(`return-requests/${data.return_id}/${data.distributor_id}/${data.variant_id}`, {
            method: HttpMethod.PATCH,
            data: { status: data.status }
        }),

    getReturnRequests: (params : GetSponsoredItemsParams) => 
        apiAxios<GetReturnRequestsResponse>('return-requests', {
            method: HttpMethod.GET,
            params
        })

}