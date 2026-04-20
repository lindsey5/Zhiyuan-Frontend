import { useMutation, useQuery } from "@tanstack/react-query"
import type { CreateDistributorDTO, GetDistributorResponse, GetDistributorsParams, GetDistributorsResponse } from "../types/distributor.type";
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

    const createDistributor = useMutation({
        mutationFn: ({ data } : { data : CreateDistributorDTO}) =>  distributorService.createDistributor(data),
    })

    const deleteDistributor = useMutation({
        mutationFn: ({ id } : { id : string }) => distributorService.deleteDistributor(id)
    })

    return {
       getDistributors,
       getDistributorById,
       createDistributor,
       deleteDistributor
    }

}