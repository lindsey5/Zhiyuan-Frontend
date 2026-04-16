import { useQuery } from "@tanstack/react-query"
import { commissionLogService } from "../service/commissionLogService"
import type { GetCommissionsPerMonthResponse } from "../types/commissionLog.type"

export const useCommissionLog = () => {
    const getCommissionsPerMonth = (id: string, year: number = 2024) => (
        useQuery<GetCommissionsPerMonthResponse, Error>({
            queryKey: [`commission-logs/monthly/${id}`],
            queryFn: () => commissionLogService.getCommissionsPerMonth(id, year),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
        getCommissionsPerMonth
    }
}