import { useMutation, useQuery } from "@tanstack/react-query"
import type { 
    GetTotalDistributorsResponse, 
    CreateDistributorDTO, 
    GetDistributorResponse, 
    GetDistributorsParams, 
    GetDistributorsResponse, 
    GetTopDistributorsParams, 
    GetTopDistributorsResponse, 
    GetDownlineDistributorsResponse 
} from "../types/distributor.type";
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

    const getDownlineDistributors = (id: string) => (
        useQuery<GetDownlineDistributorsResponse, Error>({
            queryKey: [`distributors/downline/${id}`],
            queryFn: () => distributorService.getDownlineDistributors(id),
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
        getDownlineDistributors,
       getTotalDistributors,
       createDistributor,
       deleteDistributor,
       getTopDistributors,
    }

}