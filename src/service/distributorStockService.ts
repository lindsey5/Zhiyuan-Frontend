import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetDistributorStocksParams, GetDistributorStocksResponse } from "../types/distributor-stock.type";

export const distributorStockService = {
    getDistributorStocks: (id: string, params: GetDistributorStocksParams, accessToken: string): Promise<GetDistributorStocksResponse> => (
        apiAxios<GetDistributorStocksResponse>(`/distributor-stocks/${id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            method: HttpMethod.GET,
            params
        })
    ),
};