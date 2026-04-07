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

export type Period = "today" | "this-week" | "this-month" | "this-year";

export interface GetDistributorSalesByPeriodResponse {
    success: boolean;
    sales: number;
}

export interface GetDistributorItemsSoldResponse {
    success: boolean;
    totalQuantity: number;
}

export interface GetDistributorMonthlySalesResponse {
    success: true;
    monthlySales: { month: string, totalSales: number }[];
    year: number;
}

export interface GetDistributorItemsSoldPerMonthResponse {
    success: true;
    itemsSoldPerMonth: { month: string, totalQuantity: number }[];
    year: number;
}