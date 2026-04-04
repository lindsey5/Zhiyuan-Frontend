import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../lib/store/authStore"
import type { GetStockTransferLogsParams, GetStockTransferLogsResponse } from "../types/stock-transfer-log.type";
import { stockTransferLogService } from "../service/stockTransferLogService";

export const useStockTransfer = () => {
    const { accessToken } = useAuthStore();

    const getStockTransferLogs = (params : GetStockTransferLogsParams) => (
        useQuery<GetStockTransferLogsResponse, Error>({
            queryKey: ['stock-transfer-logs', params],
            queryFn: () => stockTransferLogService.getStockTransferLogs({ params, accessToken: accessToken || ""}),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
        getStockTransferLogs
    }
}