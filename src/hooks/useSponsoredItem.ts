import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetSponsoredItemResponse, GetSponsoredItemsParams, GetSponsoredItemsResponse } from "../types/sponsored-item.type"
import { sponsoredItemService } from "../service/sponsoredItemService"

export const useSponsoredItem = () => {

    const getSponsoredItems = (params : GetSponsoredItemsParams) => (
        useQuery<GetSponsoredItemsResponse, Error>({
            queryKey: ['sponsored-items', params],
            queryFn: () => sponsoredItemService.getSponsoredItems(params),
            refetchOnWindowFocus: false,
        })
    )

    const getSponsoredItemById = (id : string) => (
        useQuery<GetSponsoredItemResponse, Error>({
            queryKey: [`sponsored-items/${id}`],
            queryFn: () => sponsoredItemService.getSponsoredItemById(id),
            refetchOnWindowFocus: false,
        })
    )

    const updateSponsoredItemStatus = useMutation({
        mutationFn: ({ id, status } : { id: string, status: string }) => sponsoredItemService.updateSponsoredItemStatus(id, status)
    })

    return {
        getSponsoredItems,
        getSponsoredItemById,
        updateSponsoredItemStatus
    }
}