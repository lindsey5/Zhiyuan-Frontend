import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { Variant } from "./variant.type";

export interface DistributorSale {
    _id: string;
    seller_id: string; 
    seller: Distributor;
    variant_id: string;
    variant: Variant;
    quantity: number;
    total_amount: number;
    createdAt: string;
}

export interface GetDistributorSalesParams extends PaginationParams {
    sortBy?: string;
    order?: 'asc' | 'desc',
    startDate?: string;
    endDate?: string;
    search?: string;
}

export interface GetDistributorSalesResponse extends PaginationResponse {
    distributorSales: DistributorSale[];
    totalSales: number;
}