import { useQuery } from "@tanstack/react-query"
import type { GetWithdrawalRequestResponse, GetWithdrawalRequestsParams, GetWithdrawalRequestsResponse } from "../types/withdrawalRequest.type"
import { withdrawalRequestService } from "../service/withdrawalRequestService"

export const useWithdrawalRequest = () => {

    const getWithdrawalRequestById = (id: string) => (
        useQuery<GetWithdrawalRequestResponse, Error>({
            queryKey: [`withdrawal-requests/${id}`],
            queryFn: () => withdrawalRequestService.getWithdrawalRequestById(id),
            refetchOnWindowFocus: false,
        })
    )

    const getWithdrawalRequests = (params: GetWithdrawalRequestsParams) => (
        useQuery<GetWithdrawalRequestsResponse, Error>({
            queryKey: ['withdrawal-requests', params],
            queryFn: () => withdrawalRequestService.getWithdrawalRequests(params),
            refetchOnWindowFocus: false,
        })
    )

    return {
        getWithdrawalRequestById,
        getWithdrawalRequests
    }
}