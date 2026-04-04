import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetStockTransferLogsParams, GetStockTransferLogsResponse } from "../types/stock-transfer-log.type";

export const stockTransferLogService = {
    getStockTransferLogs: ({ params } : { params : GetStockTransferLogsParams }) : Promise<GetStockTransferLogsResponse> => {
        return apiAxios<GetStockTransferLogsResponse>("stock-transfer-logs", {
            method: HttpMethod.GET,
            params,
        })
    }
}