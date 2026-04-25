import { useQuery } from "@tanstack/react-query"
import type { GetSponsoredItemsParams, GetSponsoredItemsResponse } from "../types/sponsored-item.type"
import { sponsoredItemService } from "../service/sponsoredItemService"

export const useSponsoredItem = () => {

    const getSponsoredItems = (params : GetSponsoredItemsParams) => (
        useQuery<GetSponsoredItemsResponse, Error>({
            queryKey: ['sponsored-items', params],
            queryFn: () => sponsoredItemService.getSponsoredItems(params),
            refetchOnWindowFocus: false,
        })
    )

    return {
        getSponsoredItems,
    }
}