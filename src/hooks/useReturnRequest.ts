import { useMutation, useQuery } from "@tanstack/react-query";
import { returnRequestService } from "../service/returnRequestService";
import type { GetReturnRequestByIdResponse, GetReturnRequestsParams, GetReturnRequestsResponse } from "../types/returnRequest.type";

export const useReturnRequest = () => {
    const updateAllReturnRequestItems = useMutation({
        mutationFn: returnRequestService.updateAllReturnRequestItems,
    });

    const updateReturnRequestItem = useMutation({
        mutationFn: returnRequestService.updateReturnRequestItem,
    });
    
    const getReturnRequests = (params : GetReturnRequestsParams) => (
        useQuery<GetReturnRequestsResponse, Error>({
            queryKey: ['return-requests', params],
            queryFn: () => returnRequestService.getReturnRequests(params),
            refetchOnWindowFocus: false,
        })
    )

    const getReturnRequestById = (id : string) => (
        useQuery<GetReturnRequestByIdResponse, Error>({
            queryKey: [`return-requests/${id}`],
            queryFn: () => returnRequestService.getReturnRequestById(id),
            refetchOnWindowFocus: false,
        })
    )

    return {
        updateAllReturnRequestItems,
        updateReturnRequestItem,
        getReturnRequests,
        getReturnRequestById
    };
};
