import { useMutation, useQuery } from "@tanstack/react-query"
import { type GetDistributorTotalStocksResponse, type GetDistributorStocksParams, type GetDistributorStocksResponse, type GetDistributorStockResponse } from "../types/distributor-stock.type";
import { distributorStockService } from "../service/distributorStockService";

export const useDistributorStock = () => {

    const getDistributorStocks = (id: string, params : GetDistributorStocksParams) => (
        useQuery<GetDistributorStocksResponse, Error>({
            queryKey: ['distributor-stocks', params],
            queryFn: () => distributorStockService.getDistributorStocks(id, params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getDistributorTotalStocks = (id: string) => (
        useQuery<GetDistributorTotalStocksResponse, Error>({
            queryKey: [`distributor-stocks-${id}`],
            queryFn: () => distributorStockService.getDistributorTotalStocks(id),
            placeholderData: (prev) => prev,
        })
    )

    const getDistributorStock = (variant_id: string, distributor_id: string) => (
        useQuery<GetDistributorStockResponse, Error>({
            queryKey: [`distributor-stocks-${variant_id}-${distributor_id}`],
            queryFn: () => distributorStockService.getDistributorStock(variant_id, distributor_id),
            placeholderData: (prev) => prev,
        })
    )


    return {
       getDistributorStocks,
       getDistributorTotalStocks,
       getDistributorStock
    }

}