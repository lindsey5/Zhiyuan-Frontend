import { useMutation, useQuery } from "@tanstack/react-query"
import { type GetTotalDistributorsResponse, type CreateDistributorDTO, type GetDistributorResponse, type GetDistributorsParams, type GetDistributorsResponse, type GetTopDistributorsParams, type GetTopDistributorsResponse } from "../types/distributor.type";
import { distributorService } from "../service/distributorService";

export const useDistributor = () => {

    const getDistributors = (params : GetDistributorsParams) => (
        useQuery<GetDistributorsResponse, Error>({
            queryKey: ['distributors', params],
            queryFn: () => distributorService.getDistributors(params),
            refetchOnWindowFocus: false,
        })
    )

    const getDistributorById = (id: string) => (
        useQuery<GetDistributorResponse, Error>({
            queryKey: [`distributors/${id}`],
            queryFn: () => distributorService.getDistributorById(id),
            refetchOnWindowFocus: false,
        })
    )

    const getTotalDistributors = () => (
        useQuery<GetTotalDistributorsResponse, Error>({
            queryKey: ['distributors/total'],
            queryFn: () => distributorService.getTotalDistributors(),
            refetchOnWindowFocus: false,
        })
    )

    const createDistributor = useMutation({
        mutationFn: ({ data } : { data : CreateDistributorDTO}) =>  distributorService.createDistributor(data),
    })

    const deleteDistributor = useMutation({
        mutationFn: ({ id } : { id : string }) => distributorService.deleteDistributor(id)
    })

    const getTopDistributors = (params: GetTopDistributorsParams) => (
        useQuery<GetTopDistributorsResponse, Error>({
            queryKey: [`distributors/top`, params],
            queryFn: () => distributorService.getTopDistributors(params),
            refetchOnWindowFocus: false,
        })
    )

    return {
       getDistributors,
       getDistributorById,
       getTotalDistributors,
       createDistributor,
       deleteDistributor,
       getTopDistributors
    }

}