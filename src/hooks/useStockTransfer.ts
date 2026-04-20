import { useMutation, useQuery } from "@tanstack/react-query"
import type { CreateStockTransferLogPayload, GetStockTransferLogsParams, GetStockTransferLogsResponse, StockTransferLogResponse } from "../types/stock-transfer-log.type";
import { stockTransferLogService } from "../service/stockTransferLogService";

export const useStockTransfer = () => {

    const getStockTransferLogs = (params : GetStockTransferLogsParams) => (
        useQuery<GetStockTransferLogsResponse, Error>({
            queryKey: ['stock-transfer-logs', params],
            queryFn: () => stockTransferLogService.getStockTransferLogs({ params }),
            refetchOnWindowFocus: false,
        })
    )

    const getStockTransferLogById = (id: string) => (
        useQuery<StockTransferLogResponse, Error>({
            queryKey: [`stock-transfer-logs/${id}`],
            queryFn: () => stockTransferLogService.getStockTransferLogById(id),
            refetchOnWindowFocus: false,
        })
    )

    const updateStockTransferLogStatus = useMutation({
        mutationFn: (data : { id: string, status: string}) =>  stockTransferLogService.updateStockTransferLogStatus(data.id, data.status),
    })

    const createStockTransferLog = useMutation({
        mutationFn: ({ id, data } : { id: string, data: CreateStockTransferLogPayload[] }) => stockTransferLogService.createStockTransferLog(id, data),
    })

    return {
        getStockTransferLogs,
        updateStockTransferLogStatus,
        createStockTransferLog,
        getStockTransferLogById
    }
}