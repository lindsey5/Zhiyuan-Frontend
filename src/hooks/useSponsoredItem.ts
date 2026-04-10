import { useMutation, useQuery } from "@tanstack/react-query"
import type { CreateSponsoredItemsPayload, GetSponsoredItemsParams, GetSponsoredItemsResponse } from "../types/sponsored-item"
import { sponsoredItemService } from "../service/sponsoredItemService"

export const useSponsoredItem = () => {

    const getSponsoredItems = (params : GetSponsoredItemsParams) => (
        useQuery<GetSponsoredItemsResponse, Error>({
            queryKey: ['sponsored-items', params],
            queryFn: () => sponsoredItemService.getSponsoredItems(params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const createSponsoredItems= useMutation({
        mutationFn: (data : CreateSponsoredItemsPayload) =>  sponsoredItemService.createSponsoredItems(data),
    })

    return {
        getSponsoredItems,
        createSponsoredItems,
    }
}