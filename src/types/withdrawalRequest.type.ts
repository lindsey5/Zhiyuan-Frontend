import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";

export interface WithdrawalRequestMethod {
    type: "cash" | "bank" | "gcash" | "maya";
    account_name?: string;
    account_number?: string;
    bank_name?: string;
}

export interface WithdrawalRequest {
    _id: string;
    distributor: Distributor;
    distributor_id: string;
    withdrawal_method: WithdrawalRequestMethod;
    amount: number;
    status: "pending" | "approved" | "completed" | "rejected" | "cancelled";
    createdAt: string;
}

export interface GetWithdrawalRequestResponse {
    success: boolean;
    withdrawalRequest: WithdrawalRequest;
}

export interface GetWithdrawalRequestsParams extends PaginationParams{
    search?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
}

export interface GetWithdrawalRequestsResponse extends PaginationResponse {
    withdrawalRequests: WithdrawalRequest[];
}