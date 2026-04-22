import { useQuery } from "@tanstack/react-query"
import type { GetStockOrdersParams, GetStockOrdersResponse } from "../types/stock-order.type"
import { stockOrderService } from "../service/stockOrderService"

export const useStockOrder = () => {
    const getStockOrders = (params : GetStockOrdersParams) => (
        useQuery<GetStockOrdersResponse, Error>({
            queryKey: ['audit_logs', params],
            queryFn: () => stockOrderService.getStockOrders(params),
            refetchOnWindowFocus: false,
        })
    ) 

    return {
        getStockOrders
    }
}