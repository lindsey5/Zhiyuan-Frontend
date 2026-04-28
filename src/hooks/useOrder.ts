import { useMutation, useQuery } from "@tanstack/react-query";
import type { GetOrdersResponse, GetOrdersParams, GetOrderResponse, OrderMarkAsPaidPayload, UpdateOrderStatusPayload, GetOrderMonthlySalesResponse, GetOrderSalesByPeriodResponse } from "../types/order.type";
import { orderService } from "../service/orderService";
import type { Period } from "../types/distributorSale.type";

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

    
    const getOrderMonthlySales = (year: number = 2024) => (
        useQuery<GetOrderMonthlySalesResponse, Error>({
            queryKey: [`orders/monthly`, year],
            queryFn: () => orderService.getOrderMonthlySales(year),
            refetchOnWindowFocus: false,
        })
    )

    const getOrderSalesByPeriod = (period: Period) => (
        useQuery<GetOrderSalesByPeriodResponse, Error>({
            queryKey: [`orders/sales/${period}`],
            queryFn: () => orderService.getOrderSalesByPeriod(period),
            refetchOnWindowFocus: false,
        })
    )

    return {
        getOrders,
        getOrderById,
        orderMarkAsPaid,
        updateOrderStatus,
        getOrderSalesByPeriod,
        getOrderMonthlySales
    };
};