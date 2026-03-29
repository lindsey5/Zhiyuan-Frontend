import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetAuditLogsResponse, GetAuditParams } from "../types/audit.type";

export const auditService = {
    getAuditLogs: ({ params, accessToken } : { params : GetAuditParams, accessToken: string }) : Promise<GetAuditLogsResponse> => {
        return apiAxios<GetAuditLogsResponse>("audits", {
            method: HttpMethod.GET,
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
}