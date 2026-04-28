import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type UpdateSponsoredItemResponse, type GetSponsoredItemsParams, type GetSponsoredItemsResponse, type GetSponsoredItemResponse } from "../types/sponsored-item.type";

export const sponsoredItemService = {
    getSponsoredItems: (params: GetSponsoredItemsParams) =>
        apiAxios<GetSponsoredItemsResponse>("sponsored-items", {
            method: HttpMethod.GET,
            params
        }),

    getSponsoredItemById: (id: string) =>
        apiAxios<GetSponsoredItemResponse>(`sponsored-items/${id}`,{
            method: HttpMethod.GET
        }),

    updateSponsoredItemStatus: (id: string, status: string) => 
        apiAxios<UpdateSponsoredItemResponse>(`sponsored-items/${id}`,{
            method: HttpMethod.PATCH,
            data: {
                status
            }
        })
};