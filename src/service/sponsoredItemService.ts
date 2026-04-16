import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateSponsoredItemsPayload, CreateSponsoredItemsResponse, GetSponsoredItemsParams, GetSponsoredItemsResponse } from "../types/sponsored-item";

export const sponsoredItemService = {
    getSponsoredItems: (params: GetSponsoredItemsParams) =>
        apiAxios<GetSponsoredItemsResponse>("sponsored-items", {
            method: HttpMethod.GET,
            params
        }),
    createSponsoredItems: (data : CreateSponsoredItemsPayload) => {
        return apiAxios<CreateSponsoredItemsResponse>("sponsored-items", {
            method: HttpMethod.POST,
            data
        })
    },
};