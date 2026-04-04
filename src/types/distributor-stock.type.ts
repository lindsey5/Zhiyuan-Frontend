import type { PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { Variant } from "./variant";

export interface DistributorStock {
    _id: string;
    distributor_id: string;
    variant_id: string;
    quantity: number;
    variant: Variant;
    updatedAt: Date;
}

export interface GetDistributorStocksParams {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    order?: "desc" | "asc";
}

export interface GetDistributorStocksResponse extends PaginationResponse {
    distributorStocks: DistributorStock[];
}

export interface CreateDistributorStockPayload {
    variant_id: string;
    quantity: number;
}

export interface CreateDistributorStocksResponse extends ApiResponse {
    newStocks: DistributorStock[]
}