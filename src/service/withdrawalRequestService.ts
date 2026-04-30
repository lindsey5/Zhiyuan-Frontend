import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetWithdrawalRequestResponse, GetWithdrawalRequestsParams, GetWithdrawalRequestsResponse } from "../types/withdrawalRequest.type";

export const withdrawalRequestService = {
    getWithdrawalRequestById: (id : string) => (
        apiAxios<GetWithdrawalRequestResponse>(`withdrawal-requests/${id}`, {
            method: HttpMethod.GET,
        })
    ),
    
    getWithdrawalRequests: (params: GetWithdrawalRequestsParams) => (
        apiAxios<GetWithdrawalRequestsResponse>('withdrawal-requests', {
            method: HttpMethod.GET,
            params
        })
    )
}