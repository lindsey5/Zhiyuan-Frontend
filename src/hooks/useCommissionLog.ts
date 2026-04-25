import { useQuery } from "@tanstack/react-query"
import { commissionLogService } from "../service/commissionLogService"
import type { GetCommissionsParams, GetCommissionsPerMonthResponse, GetCommissionsResponse } from "../types/commissionLog.type"

export const useCommissionLog = () => {
    const getCommissionsPerMonth = (id: string, year: number = 2024) => (
        useQuery<GetCommissionsPerMonthResponse, Error>({
            queryKey: [`commission-logs/monthly/${id}`],
            queryFn: () => commissionLogService.getCommissionsPerMonth(id, year),
            refetchOnWindowFocus: false,
        })
    )

    const getCommissions = ({ distributor_id, params } : { distributor_id: string, params : GetCommissionsParams}) => (
        useQuery<GetCommissionsResponse, Error>({
            queryKey: [`commission-log/${distributor_id}`],
            queryFn: () => commissionLogService.getDistributorCommissions(distributor_id, params),
            refetchOnWindowFocus: false,
        })
    )

    return {
        getCommissionsPerMonth,
        getCommissions
    }
}