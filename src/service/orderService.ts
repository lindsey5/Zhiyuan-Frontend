import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetOrdersParams, GetOrdersResponse } from "../types/order.type";

export const orderService = {
    getOrders: (params : GetOrdersParams) => 
        apiAxios<GetOrdersResponse>("orders", {
            method: HttpMethod.GET,
            params
        }),
};