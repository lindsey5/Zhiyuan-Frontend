import { useQuery } from "@tanstack/react-query";
import type { GetOrdersResponse, GetOrdersParams } from "../types/order.type";
import { orderService } from "../service/orderService";

export const useOrder = () => {
    const getOrders = (params: GetOrdersParams) => (
        useQuery<GetOrdersResponse, Error>({
            queryKey: ["orders", params],
            queryFn: () => orderService.getOrders(params),
            refetchOnWindowFocus: false,
        })
    )

    return {
        getOrders,
    };
};