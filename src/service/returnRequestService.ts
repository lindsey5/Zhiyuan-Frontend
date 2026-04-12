import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { UpdateReturnRequestItemsResponse } from "../types/returnRequest.type";

export const returnRequestService = {
    updateAllReturnRequestItems: (data : {
        status : 'accepted' | 'rejected'; 
        distributor_id: string;
        return_id: string;
    }) => {
        return apiAxios<UpdateReturnRequestItemsResponse>(`return-requests/${data.return_id}/${data.distributor_id}`, {
            method: HttpMethod.PUT,
            data: { status: data.status }
        })
    }
}