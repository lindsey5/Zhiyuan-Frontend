import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { VariantWithProduct } from "./variant.type";

export interface DistributorStock {
    _id: string;
    distributor_id: string;
    variant_id: string;
    quantity: number;
    variant: VariantWithProduct;
    updatedAt: Date;
}

export interface GetDistributorStocksParams extends PaginationParams {
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

export interface GetDistributorTotalStocksResponse extends ApiResponse {
    totalStocks: number;
}

export interface DownloadDistributorStocksParams {
    search?: string;
    sortBy?: string;
    order?: "desc" | "asc";
}

export interface GetDistributorStockResponse extends ApiResponse {
    distributorStock: DistributorStock;
}