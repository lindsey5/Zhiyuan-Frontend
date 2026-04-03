import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateDistributorDTO, CreateDistributorResponse, GetDistributorsParams, GetDistributorsResponse } from "../types/distributor.type";

export const distributorService = {
    createDistributor: (data: CreateDistributorDTO, accessToken: string): Promise<CreateDistributorResponse> =>
        apiAxios<CreateDistributorResponse>("/distributors", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.POST,
            data,
        }),

    getDistributors: (params: GetDistributorsParams, accessToken: string): Promise<GetDistributorsResponse> => (
        apiAxios<GetDistributorsResponse>("/distributors",{
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.GET,
            params
        })
    )
};