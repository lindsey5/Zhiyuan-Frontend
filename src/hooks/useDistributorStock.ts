import { useMutation, useQuery } from "@tanstack/react-query"
import { type GetDistributorTotalStocksResponse, type CreateDistributorStockPayload, type GetDistributorStocksParams, type GetDistributorStocksResponse } from "../types/distributor-stock.type";
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

    const createDistributorStocks = useMutation({
        mutationFn: ({ id, data } : { id: string, data: CreateDistributorStockPayload[] }) => distributorStockService.createDistributorStocks(id, data),
    })

    return {
       getDistributorStocks,
       createDistributorStocks,
       getDistributorTotalStocks
    }

}