import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { VariantWithProduct } from "./variant.type";

export interface ReturnRequest {
    _id: string;
    distributor_id: string;
    distributor: Distributor;
    items: {
        _id: string;
        variant_id: string;
        quantity: number;
        variant: VariantWithProduct;
        status: 'pending' | 'accepted' | 'processing' | 'delivered' | 'received' | 'rejected' | 'expired' | 'insufficient stock'
    }[];
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