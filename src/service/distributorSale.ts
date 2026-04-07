
import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetDistributorSalesParams, GetDistributorSalesResponse } from "../types/distributorSale.type";

export const distributorSaleService = {
    getDistributorSales: (params : GetDistributorSalesParams) : Promise<GetDistributorSalesResponse> => {
        return apiAxios<GetDistributorSalesResponse>("distributor-sales", {
            method: HttpMethod.GET,
            params,
        })
    }
}