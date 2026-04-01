import type { PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";

export interface Creator {
    firstname: string;
    lastname: string;
    email: string;
    role_id: string;
    createdAt: Date;
}
export interface Distributor {
    id: number;
    recruiter: Distributor;
    user: Creator;
    distributor_name: string;
    email: string;
    commission_rate: number;
    wallet_balance: number;
    status: 'active' | 'deleted',
    createdAt: Date;
}

export interface DistributorResponse {
    id: number;
    parent_distributor_id: number;
    creator: number;
    distributor_name: string;
    email: string;
    commission_rate: number;
    wallet_balance: number;
    status: 'active' | 'deleted',
    createdAt: Date;
}

export interface GetDistributorsParams {
    page: number;
    limit: number;
    search?: string;
};

export interface GetDistributorsResponse extends PaginationResponse {
    distributors: Distributor[]
}

export interface DistributorPayload {
    distributor_name: string;
    email: string;
    parent_distributor_id?: number;
}

export interface DistributorResponse extends ApiResponse{
    distributor: DistributorResponse;
}