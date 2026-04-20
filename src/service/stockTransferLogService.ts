import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { CreateStockTransferLogPayload, StockTransferLogResponse, GetStockTransferLogsParams, GetStockTransferLogsResponse } from "../types/stock-transfer-log.type";
import type { ApiResponse } from "../types/type";

export const stockTransferLogService = {
    getStockTransferLogs: ({ params } : { params : GetStockTransferLogsParams }) => {
        return apiAxios<GetStockTransferLogsResponse>("stock-transfer-logs", {
            method: HttpMethod.GET,
            params,
        })
    },

    getStockTransferLogById: (id: string) => {
        return apiAxios<StockTransferLogResponse>(`stock-transfer-logs/${id}`, {
            method: HttpMethod.GET,
        })
    },

    updateStockTransferLogStatus: (id : string, status: string) => {
        return apiAxios<ApiResponse>(`stock-transfer-logs/${id}`, {
            method: HttpMethod.PATCH,
            data: { status }
        })
    },

    createStockTransferLog: (id: string, data: CreateStockTransferLogPayload[]) => (
        apiAxios<StockTransferLogResponse>(`stock-transfer-logs/${id}`, {
            method: HttpMethod.POST,
            data
        })
    ),
}