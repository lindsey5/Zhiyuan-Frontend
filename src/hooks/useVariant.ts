import { useQuery } from "@tanstack/react-query"
import type { GetVariantsParams, GetVariantsResponse } from "../types/variant"
import { useAuthStore } from "../lib/store/authStore"
import { variantService } from "../service/variantService";


export const useVariant = () => {
    const { accessToken } = useAuthStore.getState();

    const getVariants = (params : GetVariantsParams) => (
        useQuery<GetVariantsResponse, Error>({
            queryKey: ['variants', params],
            queryFn: () => variantService.getVariants(params, accessToken || ""),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
        getVariants
    }
}