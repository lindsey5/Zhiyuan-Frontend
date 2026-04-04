import type { PaginationParams } from "./pagination.type";
import type { User } from "./user.type";

export interface AuditLog{
    _id: string;
    user_id: number;
    user: User;
    role: string;
    action: string;
    description: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    ip_address: string;
    user_agent: string;
    old_values: Record<string, any> | null;
    new_values: Record<string, any> | null;
    createdAt: Date;
}

export interface GetAuditParams extends PaginationParams {
    startDate?: string;
    endDate?: string;
    role?: string;
    severity?: string;
    search?: string;
    order?: "asc" | "desc";
};

export interface GetAuditLogsResponse {
    success: boolean;
    auditLogs: AuditLog[];
    page: number;
    limit: number;
    totalPages: number;
    total: number;
}