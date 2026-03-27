import type { User } from "./user.type";

export interface AuditLog{
    id: number;
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

export interface GetAuditParams {
    page: number;
    limit: number;
    startDate?: string;
    endDate?: string;
    role?: string;
    severity?: string;
    search?: string;
    order?: "ASC" | "DESC";
};

export interface GetAuditLogsResponse {
    success: boolean;
    auditLogs: AuditLog[];
    page: number;
    limit: number;
    totalPages: number;
    total: number;
}