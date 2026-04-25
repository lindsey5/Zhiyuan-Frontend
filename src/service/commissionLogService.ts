import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { type GetCommissionsResponse, type GetCommissionsParams, type GetCommissionsPerMonthResponse } from "../types/commissionLog.type";

export const commissionLogService = {
    
    getCommissionsPerMonth: (id: string, year: number) => (
        apiAxios<GetCommissionsPerMonthResponse>(`commission-logs/monthly/${id}?year=${year}`, {
            method: HttpMethod.GET
        })
    ),

    getDistributorCommissions: (distributor_id: string, params: GetCommissionsParams) => (
        apiAxios<GetCommissionsResponse>(`commission-logs/${distributor_id}`,{
            method: HttpMethod.GET,
            params,
        })
    )
};