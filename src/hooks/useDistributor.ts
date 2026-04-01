import { useMutation, useQuery } from "@tanstack/react-query"
import type { DistributorPayload, GetDistributorsParams, GetDistributorsResponse } from "../types/distributor.type"
import { distributorService } from "../service/distributorService"

export const useDistributor = () => {
    const getDistributors = (params : GetDistributorsParams, accessToken : string) => {
        return useQuery<GetDistributorsResponse, Error>({
            queryKey: ['distributors', params],
            queryFn: () => distributorService.getdistributors({ params, accessToken }),
            placeholderData: (prev) => prev
        })
    }

    const createDistributor = useMutation({
        mutationFn: ({ data, accessToken } : { data:  DistributorPayload, accessToken : string}) => {
            return distributorService.createDistributor({ data, accessToken})
        },
    })

    const updateDistributor = useMutation({
        mutationFn: ({ id, data, accessToken } : { id: number, data:  DistributorPayload, accessToken : string}) => {
            return distributorService.updateDistributor({ id, data, accessToken})
        },
    })

    return {
        getDistributors,
        createDistributor,
        updateDistributor
    }
}