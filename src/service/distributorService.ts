import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type GetTotalDistributorsResponse, type CreateDistributorDTO, type CreateDistributorResponse, type GetDistributorResponse, type GetDistributorsParams, type GetDistributorsResponse } from "../types/distributor.type";
import type { ApiResponse } from "../types/type";

export const distributorService = {
    createDistributor: (data: CreateDistributorDTO): Promise<CreateDistributorResponse> =>
        apiAxios<CreateDistributorResponse>("/distributors", {
            method: HttpMethod.POST,
            data,
        }),

    getDistributors: (params: GetDistributorsParams): Promise<GetDistributorsResponse> => (
        apiAxios<GetDistributorsResponse>("/distributors",{
            method: HttpMethod.GET,
            params
        })
    ),

    getDistributorById: (id: string): Promise<GetDistributorResponse> => (
        apiAxios<GetDistributorResponse>(`/distributors/${id}`,{
            method: HttpMethod.GET,
        })
    ),

    getTotalDistributors: () => (
        apiAxios<GetTotalDistributorsResponse>('distributors/total', {
            method: HttpMethod.GET
        })
    ),

    deleteDistributor: (id: string) : Promise<ApiResponse> => (
        apiAxios<ApiResponse>(`/distributors/${id}`, {
            method: HttpMethod.DELETE,
        })
    )
};