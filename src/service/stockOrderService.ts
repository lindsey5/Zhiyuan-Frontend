import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetStockOrdersParams, GetStockOrdersResponse } from "../types/stock-order.type";

export const stockOrderService = {
    getStockOrders: (params : GetStockOrdersParams) => {
        return apiAxios<GetStockOrdersResponse>("stock-orders", {
            method: HttpMethod.GET,
            params,
        })
    }
}