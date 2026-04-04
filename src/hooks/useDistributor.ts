import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../lib/store/authStore"
import type { CreateDistributorDTO, GetDistributorResponse, GetDistributorsParams, GetDistributorsResponse } from "../types/distributor.type";
import { distributorService } from "../service/distributorService";

export const useDistributor = () => {
    const { accessToken } = useAuthStore();

    const getDistributors = (params : GetDistributorsParams) => (
        useQuery<GetDistributorsResponse, Error>({
            queryKey: ['distributors', params],
            queryFn: () => distributorService.getDistributors(params, accessToken || ""),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getDistributorById = (id: string) => (
        useQuery<GetDistributorResponse, Error>({
            queryKey: [`distributors/${id}`],
            queryFn: () => distributorService.getDistributorById(id, accessToken || ""),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const createDistributor = useMutation({
        mutationFn: ({ data } : { data : CreateDistributorDTO}) =>  distributorService.createDistributor(data, accessToken || ""),
    })

    const deleteDistributor = useMutation({
        mutationFn: ({ id } : { id : string }) => distributorService.deleteDistributor(id, accessToken || "")
    })

    return {
       getDistributors,
       getDistributorById,
       createDistributor,
       deleteDistributor
    }

}