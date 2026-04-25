import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetSponsoredItemsParams, GetSponsoredItemsResponse } from "../types/sponsored-item.type";

export const sponsoredItemService = {
    getSponsoredItems: (params: GetSponsoredItemsParams) =>
        apiAxios<GetSponsoredItemsResponse>("sponsored-items", {
            method: HttpMethod.GET,
            params
        }),
};