import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../lib/store/authStore"
import type { CreateDistributorDTO, GetDistributorsParams, GetDistributorsResponse } from "../types/distributor.type";
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

    const createDistributor = useMutation({
        mutationFn: ({ data } : { data : CreateDistributorDTO}) =>  distributorService.createDistributor(data, accessToken || ""),
        onSuccess: () => window.location.href = `/dashboard/products`,
        onError: (err) => console.log(err)
    })

    return {
       getDistributors,
       createDistributor
    }

}