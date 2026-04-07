import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type CreateDistributorStocksResponse, type CreateDistributorStockPayload, type GetDistributorStocksParams, type GetDistributorStocksResponse, type GetDistributorTotalStocksResponse } from "../types/distributor-stock.type";

export const distributorStockService = {
    getDistributorStocks: (id: string, params: GetDistributorStocksParams): Promise<GetDistributorStocksResponse> => (
        apiAxios<GetDistributorStocksResponse>(`distributor-stocks/${id}`,{
            method: HttpMethod.GET,
            params
        })
    ),

    createDistributorStocks: (id: string, data: CreateDistributorStockPayload[]) => (
        apiAxios<CreateDistributorStocksResponse>(`distributor-stocks/${id}`, {
            method: HttpMethod.POST,
            data
        })
    ),

    getDistributorTotalStocks: (id: string) => (
        apiAxios<GetDistributorTotalStocksResponse>(`distributor-stocks/stock/${id}`, {
            method: HttpMethod.GET
        })
    )
};