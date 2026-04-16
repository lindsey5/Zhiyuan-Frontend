import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { Product } from "./product.type";
import type { VariantWithProduct } from "./variant.type";

export interface DistributorSale {
    _id: string;
    seller_id: string; 
    seller: Distributor;
    variant_id: string;
    product: Product;
    variant: VariantWithProduct;
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


export interface DownloadDistributorSalesParams extends PaginationParams {
    startDate?: string;
    endDate?: string;
    search?: string;
}