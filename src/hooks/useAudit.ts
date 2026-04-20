import { useQuery } from "@tanstack/react-query"
import { type GetAuditLogsResponse, type GetAuditParams } from "../types/audit.type"
import { auditService } from "../service/auditService"

export const useAudit = () => {

    const getAuditLogs = (params : GetAuditParams) => (
        useQuery<GetAuditLogsResponse, Error>({
            queryKey: ['audit_logs', params],
            queryFn: () => auditService.getAuditLogs({ params }),
            refetchOnWindowFocus: false,
        })
    )

    return {
        getAuditLogs
    }
}