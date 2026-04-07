import { useQuery } from "@tanstack/react-query"
import type { GetDistributorSalesParams, GetDistributorSalesResponse } from "../types/distributorSale.type"
import { distributorSaleService } from "../service/distributorSale"

export const useDistributorSale = () => {

    const getDistributorSales = (params : GetDistributorSalesParams) => (
        useQuery<GetDistributorSalesResponse, Error>({
            queryKey: ['distributor-sales', params],
            queryFn: () => distributorSaleService.getDistributorSales(params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
        getDistributorSales
    }
}