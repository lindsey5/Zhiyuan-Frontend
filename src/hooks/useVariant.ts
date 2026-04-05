import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetVariantsParams, GetVariantsResponse, UpdateVariantPayload } from "../types/variant.type"
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

    const deleteVariant = useMutation({
         mutationFn: ({ id } : { id: string }) =>  variantService.deleteVariant(id),
    })

    const updateVariant = useMutation({
        mutationFn: ({ id, data } : { id: string, data: UpdateVariantPayload}) => variantService.updateVariant(id, data)
    })

    return {
        getVariants,
        deleteVariant,
        updateVariant
    }
}