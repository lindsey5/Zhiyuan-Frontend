import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetStockOrderByIdResponse, GetStockOrdersParams, GetStockOrdersResponse } from "../types/stock-order.type";

export const stockOrderService = {
    getStockOrders: (params : GetStockOrdersParams) => {
        return apiAxios<GetStockOrdersResponse>("stock-orders", {
            method: HttpMethod.GET,
            params,
        })
    },

    getStockOrderById: (id: string) => {
        return apiAxios<GetStockOrderByIdResponse>(`stock-orders/${id}`, {
            method: HttpMethod.GET,
        })
    },
    updateStockOrderStatus: (id: string, status: string) => {
        return apiAxios<GetStockOrderByIdResponse>(`stock-orders/${id}`, {
            method: HttpMethod.PATCH,
            data: { status }
        })
    }
}