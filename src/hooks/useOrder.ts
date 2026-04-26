import { useMutation, useQuery } from "@tanstack/react-query";
import type { GetOrdersResponse, GetOrdersParams, GetOrderResponse, OrderMarkAsPaidPayload, UpdateOrderStatusPayload } from "../types/order.type";
import { orderService } from "../service/orderService";

export const useOrder = () => {
    const getOrders = (params: GetOrdersParams) => (
        useQuery<GetOrdersResponse, Error>({
            queryKey: ["orders", params],
            queryFn: () => orderService.getOrders(params),
            refetchOnWindowFocus: false,
        })
    )

    const getOrderById = (id: string) => (
        useQuery<GetOrderResponse, Error>({
            queryKey: [`orders/${id}`],
            queryFn: () => orderService.getOrderById(id),
            refetchOnWindowFocus: false,
        })
    )

    const orderMarkAsPaid = useMutation({
        mutationFn: ({ id, data } : { id: string, data: OrderMarkAsPaidPayload }) => orderService.orderMarkAsPaid(id, data),
    })

    const updateOrderStatus = useMutation({
        mutationFn: ({ id, data } : { id: string, data: UpdateOrderStatusPayload }) => orderService.updateOrderStatus(id, data),
    })

    return {
        getOrders,
        getOrderById,
        orderMarkAsPaid,
        updateOrderStatus
    };
};