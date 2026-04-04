import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateDistributorDTO, CreateDistributorResponse, GetDistributorResponse, GetDistributorsParams, GetDistributorsResponse } from "../types/distributor.type";
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

    deleteDistributor: (id: string) : Promise<ApiResponse> => (
        apiAxios<ApiResponse>(`/distributors/${id}`, {
            method: HttpMethod.DELETE,
        })
    )
};