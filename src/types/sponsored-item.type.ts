import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { VariantWithProduct } from "./variant.type";

export interface SponsoredItem {
    _id: string;
    sponsored_id: string;
    distributor_id: string;
    distributor: Distributor;
    variant_id: string;
    variant: VariantWithProduct;
    quantity: number;
    createdAt: string;
    status: 'pending' | 'approved' | 'completed' | 'cancelled' | 'rejected' | 'expired',
}

export interface GetSponsoredItemsParams extends PaginationParams{
    sortBy?: string;
    order?: 'asc' | 'desc',
    startDate?: string;
    endDate?: string;
    search?: string;
}

export interface GetSponsoredItemsResponse extends PaginationResponse {
    sponsoredItems: SponsoredItem[];
}

export interface GetSponsoredItemResponse {
    success: boolean;
    sponsoredItem: SponsoredItem;
}

export interface UpdateSponsoredItemResponse extends ApiResponse {
    sponsoredItem: SponsoredItem;
}