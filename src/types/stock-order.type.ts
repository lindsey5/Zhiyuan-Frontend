import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { VariantWithProduct } from "./variant.type";

export type StockOrderStatus = 'pending' | 'approved'| 'processing' | 'delivered' | 'received' | 'cancelled' | 'rejected' | 'failed'

export interface StockOrder {
    _id: string;
    stock_order_id: string;
    distributor_id: string;
    distributor: Distributor;
    items: {
        variant: VariantWithProduct;
        variant_id: string;
        quantity: number;
    }[];
    status: StockOrderStatus;
    createdAt: string;
    updatedAt: string;
}

export interface GetStockOrdersParams extends PaginationParams{
    search?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
}

export interface GetStockOrdersResponse extends PaginationResponse {
    stockOrders: StockOrder[];
}

export interface GetStockOrderByIdResponse extends ApiResponse{
    stockOrder: StockOrder
}