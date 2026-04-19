import { useMutation, useQuery } from "@tanstack/react-query"
import type { CreateStockTransferLogPayload, GetStockTransferLogsParams, GetStockTransferLogsResponse } from "../types/stock-transfer-log.type";
import { stockTransferLogService } from "../service/stockTransferLogService";

export const useStockTransfer = () => {

    const getStockTransferLogs = (params : GetStockTransferLogsParams) => (
        useQuery<GetStockTransferLogsResponse, Error>({
            queryKey: ['stock-transfer-logs', params],
            queryFn: () => stockTransferLogService.getStockTransferLogs({ params }),
            placeholderData: (prev) => prev,
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
        createStockTransferLog
    }
}