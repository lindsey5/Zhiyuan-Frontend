import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";

export interface Distributor {
    _id: string;
    parent_distributor_id?: string;
    parent_distributor: Distributor;
    distributor_name: string;
    commission_rate: number;
    wallet_balance: number;
    email: string;
    status: "active" | "deleted";
    total_stocks?: number;
    createdAt: Date;
}

export interface CreateDistributorDTO {
    distributor_name: string;
    email: string;
}

export interface CreateDistributorResponse extends ApiResponse {
    _id: string;
    parent_distributor_id?: string;
    distributor_name: string;
    commission_rate: number;
    wallet_balance: number;
    email: string;
    status: "active" | "deleted";
    total_stocks?: number;
    createdAt: Date;
}

export interface GetDistributorsParams extends PaginationParams {
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc"
}

export interface GetDistributorsResponse extends PaginationResponse {
    distributors: Distributor[]
}

export interface GetDistributorResponse extends ApiResponse {
    distributor: Distributor
}