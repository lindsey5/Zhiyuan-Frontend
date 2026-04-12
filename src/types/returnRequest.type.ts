import type { Distributor } from "./distributor.type";
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
        status: 'pending' | 'rejected' | 'expired' | 'insufficient stock'
    }[];
    reason: string;
}

export interface UpdateReturnRequestItemsResponse extends ApiResponse {
    returnRequest: ReturnRequest;
}