import type { DistributorSale } from "./distributorSale.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";

export interface CommissionLog {
    _id: string;
    sale_ids: string[];
    sales: DistributorSale[];
    receiver_id: string;
    commission_rate: number;
    commission_amount: number;
    createdAt: string;
}

export interface GetCommissionsPerMonthResponse {
    commissionsPerMonth: { month: string, totalCommission: number }[];
    year: number;
}

export interface GetCommissionsParams extends PaginationParams {
    startDate?: string;
    endDate?: string;
}

export interface GetCommissionsResponse extends PaginationResponse {
    commissions: CommissionLog[];
}