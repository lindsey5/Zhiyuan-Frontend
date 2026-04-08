import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetCommissionsPerMonthResponse } from "../types/commissionLog.type";

export const commissionLogService = {
    
    getCommissionsPerMonth: (id: string, year: number) => (
        apiAxios<GetCommissionsPerMonthResponse>(`commission-logs/monthly/${id}?year=${year}`, {
            method: HttpMethod.GET
        })
    ),
};