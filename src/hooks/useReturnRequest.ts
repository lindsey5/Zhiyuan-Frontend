import { useMutation, useQuery } from "@tanstack/react-query";
import { returnRequestService } from "../service/returnRequestService";
import type { GetReturnRequestsParams, GetReturnRequestsResponse } from "../types/returnRequest.type";

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
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
        updateAllReturnRequestItems,
        updateReturnRequestItem,
        getReturnRequests
    };
};
