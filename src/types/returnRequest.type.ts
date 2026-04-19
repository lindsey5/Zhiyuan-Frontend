import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { VariantWithProduct } from "./variant.type";

export type ReturnRequestItemStatus = 'pending' | 'accepted' | 'processing' | 'delivered' | 'received' | 'cancelled' |'rejected' | 'expired' | 'insufficient stock';

export interface ReturnRequestItem {
    _id: string;
    variant_id: string;
    quantity: number;
    variant: VariantWithProduct;
    status: ReturnRequestItemStatus
}

export interface ReturnRequest {
    _id: string;
    distributor_id: string;
    distributor: Distributor;
    items: ReturnRequestItem[];
    reason: string;
    createdAt: string;
}

export interface UpdateReturnRequestItemsResponse extends ApiResponse {
    returnRequest: ReturnRequest;
}

export interface GetReturnRequestsParams extends PaginationParams {
    search?: string;
    startDate?: string;
    endDate?: string;
    order?: 'asc' | 'desc'
}

export interface GetReturnRequestsResponse extends PaginationResponse {
    returnRequests: ReturnRequest[];
}