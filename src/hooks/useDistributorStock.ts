import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../lib/store/authStore"
import type { GetDistributorStocksParams, GetDistributorStocksResponse } from "../types/distributor-stock.type";
import { distributorStockService } from "../service/distributorStockService";

export const useDistributorStock = () => {
    const { accessToken } = useAuthStore();

    const getDistributorStocks = (id: string, params : GetDistributorStocksParams) => (
        useQuery<GetDistributorStocksResponse, Error>({
            queryKey: ['distributor-stocks', params],
            queryFn: () => distributorStockService.getDistributorStocks(id, params, accessToken || ""),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
       getDistributorStocks,
    }

}