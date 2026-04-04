import { useQuery } from "@tanstack/react-query"
import type { GetVariantsParams, GetVariantsResponse } from "../types/variant.type"
import { variantService } from "../service/variantService";


export const useVariant = () => {

    const getVariants = (params : GetVariantsParams) => (
        useQuery<GetVariantsResponse, Error>({
            queryKey: ['variants', params],
            queryFn: () => variantService.getVariants(params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
        getVariants
    }
}