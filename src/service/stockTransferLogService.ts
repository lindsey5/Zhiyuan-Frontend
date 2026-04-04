import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetStockTransferLogsParams, GetStockTransferLogsResponse } from "../types/stock-transfer-log.type";

export const stockTransferLogService = {
    getStockTransferLogs: ({ params, accessToken } : { params : GetStockTransferLogsParams, accessToken: string }) : Promise<GetStockTransferLogsResponse> => {
        return apiAxios<GetStockTransferLogsResponse>("stock-transfer-logs", {
            method: HttpMethod.GET,
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
}