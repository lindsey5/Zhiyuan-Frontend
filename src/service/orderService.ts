import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { OrderMarkAsPaidResponse, GetOrderResponse, GetOrdersParams, GetOrdersResponse, OrderMarkAsPaidPayload, UpdateOrderStatusPayload, UpdateOrderStatusResponse } from "../types/order.type";

export const orderService = {
    getOrders: (params : GetOrdersParams) => 
        apiAxios<GetOrdersResponse>("orders", {
            method: HttpMethod.GET,
            params
        }),

    getOrderById: (id: string) => 
        apiAxios<GetOrderResponse>(`orders/${id}`, {
            method: HttpMethod.GET,
        }),

    orderMarkAsPaid: (id: string, data : OrderMarkAsPaidPayload) => 
        apiAxios<OrderMarkAsPaidResponse>(`orders/paid/${id}`, {
            method: HttpMethod.PATCH,
            data
        }),
    
    updateOrderStatus: (id: string, data : UpdateOrderStatusPayload) => 
        apiAxios<UpdateOrderStatusResponse>(`orders/status/${id}`,{
            method: HttpMethod.PATCH,
            data
        })
};