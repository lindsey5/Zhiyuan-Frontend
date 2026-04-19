import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type CreateDistributorStocksResponse, type CreateDistributorStockPayload, type GetDistributorStocksParams, type GetDistributorStocksResponse, type GetDistributorTotalStocksResponse, type DownloadDistributorStocksParams, type GetDistributorStockResponse } from "../types/distributor-stock.type";
import { errorToast } from "../utils/sileo";
import { downloadFile } from "../utils/utils";

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

    getDistributorStock: (variant_id: string, distributor_id: string) => (
        apiAxios<GetDistributorStockResponse>(`distributor-stocks/${variant_id}/${distributor_id}`, {
            method: HttpMethod.GET,
        })
    ),


    getDistributorTotalStocks: (id: string) => (
        apiAxios<GetDistributorTotalStocksResponse>(`distributor-stocks/stock/${id}`, {
            method: HttpMethod.GET
        })
    ),
    downloadDistributorStocks: async (id: string, params: DownloadDistributorStocksParams) => {
        try{
            const response = await apiAxios<{
                data: string; // base64 string
                filename: string;
            }>(`distributor-stocks/download/${id}`, {
                method: HttpMethod.GET,
                params,
            });

            downloadFile(response.data, response.filename);
        }catch(err : any){
            errorToast("Error", err.message || "Failed to download")
        }
    },
};