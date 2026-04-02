import { useQuery } from "@tanstack/react-query"
import { type GetAuditLogsResponse, type GetAuditParams } from "../types/audit.type"
import { auditService } from "../service/auditService"
import { useAuthStore } from "../lib/store/authStore"

export const useAudit = () => {
    const { accessToken } = useAuthStore();

    const getAuditLogs = (params : GetAuditParams) => {
        return useQuery<GetAuditLogsResponse, Error>({
            queryKey: ['audit_logs', params],
            queryFn: () => auditService.getAuditLogs({ params, accessToken: accessToken || "" }),
            placeholderData: (prev) => prev
        })
    }

    return {
        getAuditLogs
    }
}