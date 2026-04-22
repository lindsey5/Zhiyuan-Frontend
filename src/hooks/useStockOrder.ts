import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetStockOrderByIdResponse, GetStockOrdersParams, GetStockOrdersResponse } from "../types/stock-order.type"
import { stockOrderService } from "../service/stockOrderService"

export const useStockOrder = () => {
    const getStockOrders = (params : GetStockOrdersParams) => (
        useQuery<GetStockOrdersResponse, Error>({
            queryKey: ['stock-orders', params],
            queryFn: () => stockOrderService.getStockOrders(params),
            refetchOnWindowFocus: false,
        })
    )
    
    const getStockOrderById = (id: string) => (
        useQuery<GetStockOrderByIdResponse, Error>({
            queryKey: ['stock-orders', id],
            queryFn: () => stockOrderService.getStockOrderById(id),
            refetchOnWindowFocus: false,
        })
    ) 

    const updateStockOrderStatus = useMutation({
        mutationFn: (data : { id: string, status: string}) =>  stockOrderService.updateStockOrderStatus(data.id, data.status),
    })
    return {
        getStockOrders,
        getStockOrderById,
        updateStockOrderStatus
    }
}