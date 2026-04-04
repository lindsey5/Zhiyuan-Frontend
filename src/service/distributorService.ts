import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateDistributorDTO, CreateDistributorResponse, GetDistributorResponse, GetDistributorsParams, GetDistributorsResponse } from "../types/distributor.type";
import type { ApiResponse } from "../types/type";

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
    ),

    getDistributorById: (id: string, accessToken: string): Promise<GetDistributorResponse> => (
        apiAxios<GetDistributorResponse>(`/distributors/${id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.GET,
        })
    ),

    deleteDistributor: (id: string, accessToken: string) : Promise<ApiResponse> => (
        apiAxios<ApiResponse>(`/distributors/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.DELETE,
        })
    )
};