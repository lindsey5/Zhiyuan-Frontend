
import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type GetDistributorMonthlySalesResponse, type GetDistributorItemsSoldResponse, type GetDistributorSalesByPeriodResponse, type GetDistributorSalesParams, type GetDistributorSalesResponse, type Period, type GetDistributorItemsSoldPerMonthResponse } from "../types/distributorSale.type";

export const distributorSaleService = {
    getAllDistributorSales: (params : GetDistributorSalesParams) : Promise<GetDistributorSalesResponse> => (
        apiAxios<GetDistributorSalesResponse>("distributor-sales", {
            method: HttpMethod.GET,
            params,
        })
    ),
    getDistributorSales: (id: string, params : GetDistributorSalesParams) : Promise<GetDistributorSalesResponse> => (
        apiAxios<GetDistributorSalesResponse>(`distributor-sales/${id}`, {
            method: HttpMethod.GET,
            params,
        })
    ),

    getAllDistributorSalesByPeriod: (period: Period) => (
        apiAxios<GetDistributorSalesByPeriodResponse>(`distributor-sales/${period}`, {
            method: HttpMethod.GET
        })
    ),
    
    getDistributorSalesByPeriod: (id: string, period: Period) => (
        apiAxios<GetDistributorSalesByPeriodResponse>(`distributor-sales/${period}/${id}`, {
            method: HttpMethod.GET
        })
    ),

    getAllDistributorItemsSoldByPeriod: (period: Period) => (
        apiAxios<GetDistributorItemsSoldResponse>(`distributor-sales/items/${period}`, {
            method: HttpMethod.GET
        })
    ),

    getDistributorItemsSoldByPeriod: (id: string, period: Period) => (
        apiAxios<GetDistributorItemsSoldResponse>(`distributor-sales/items/${period}/${id}`, {
            method: HttpMethod.GET
        })
    ),

    getAllDistributorMonthlySales: (year: number) => (
        apiAxios<GetDistributorMonthlySalesResponse>(`distributor-sales/monthly?year=${year}`, {
            method: HttpMethod.GET
        })
    ),

    getDistributorMonthlySales: (id: string, year: number) => (
        apiAxios<GetDistributorMonthlySalesResponse>(`distributor-sales/monthly/${id}?year=${year}`, {
            method: HttpMethod.GET
        })
    ),

    getAllDistributorItemsSoldPerMonth: (year: number) => (
        apiAxios<GetDistributorItemsSoldPerMonthResponse>(`distributor-sales/items-sold?year=${year}`, {
            method: HttpMethod.GET
        })
    ),

    getDistributorItemsSoldPerMonth: (id: string, year: number) => (
        apiAxios<GetDistributorItemsSoldPerMonthResponse>(`distributor-sales/items-sold/${id}?year=${year}`, {
            method: HttpMethod.GET
        })
    ),

    downloadDistributorSales: async (id: string, params: DownloadDistributorSalesParams) => {
        try{
            const response = await apiAxios<{
                data: string; // base64 string
                filename: string;
            }>(`distributor-sales/download/${id}`, {
                method: HttpMethod.GET,
                params,
            });

            downloadFile(response.data, response.filename);
        }catch(err : any){
            errorToast(err.message)
        }

    },

    downloadAllDistributorSales: async (params: DownloadDistributorSalesParams) => {
        try{
            const response = await apiAxios<{
                data: string; // base64 string
                filename: string;
            }>(`distributor-sales/download`, {
                method: HttpMethod.GET,
                params,
            });

            downloadFile(response.data, response.filename);
        }catch(err : any){
            errorToast(err.message)
        }
    },
}