import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetStockTransferLogsParams, GetStockTransferLogsResponse, StockTransferLog } from "../types/stock-transfer-log.type";
import type { ApiResponse } from "../types/type";

export const stockTransferLogService = {
    getStockTransferLogs: ({ params } : { params : GetStockTransferLogsParams }) => {
        return apiAxios<GetStockTransferLogsResponse>("stock-transfer-logs", {
            method: HttpMethod.GET,
            params,
        })
    },

    updateStockTransferLogStatus: (id : string, status: string) => {
        return apiAxios<ApiResponse>(`stock-transfer-logs/${id}`, {
            method: HttpMethod.PATCH,
            data: { status }
        })
    }
}