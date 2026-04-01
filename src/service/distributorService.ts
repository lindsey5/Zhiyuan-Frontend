import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { DistributorPayload, DistributorResponse, GetDistributorsParams, GetDistributorsResponse } from "../types/distributor.type";

export const distributorService = {
    getdistributors: ({ params, accessToken } : { params : GetDistributorsParams, accessToken: string }) : Promise<GetDistributorsResponse> => {
        return apiAxios<GetDistributorsResponse>("distributors", {
            method: HttpMethod.GET,
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    },
    createDistributor: ({ data, accessToken } : { data: DistributorPayload , accessToken: string}) : Promise<DistributorResponse> => {
        return apiAxios<DistributorResponse>("distributors", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.POST,
            data
        })
    },
    updateDistributor: ({ data, accessToken, id } : { data: DistributorPayload , accessToken: string, id : number}) : Promise<DistributorResponse> => {
        return apiAxios<DistributorResponse>(`distributors/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.PUT,
            data
        })
    }
}