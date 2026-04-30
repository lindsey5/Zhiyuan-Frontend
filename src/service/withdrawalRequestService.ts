import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetWithdrawalRequestResponse, GetWithdrawalRequestsParams, GetWithdrawalRequestsResponse, UpdateWithdrawalRequestPayload, UpdateWithdrawalRequestResponse } from "../types/withdrawalRequest.type";

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
    ),

    updateWithdrawalRequestStatus: (payload : UpdateWithdrawalRequestPayload) => (
        apiAxios<UpdateWithdrawalRequestResponse>(`withdrawal-requests/${payload.id}`, {
            method: HttpMethod.PATCH,
            data: { status: payload.status }
        })
    )
}