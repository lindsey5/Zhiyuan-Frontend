import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { Product } from "./product.type";
import type { ApiResponse } from "./type";
import type { Variant } from "./variant.type";

export interface SponsoredItem {
    _id: string;
    variant_id: string;
    product: Product;
    variant: Variant;
    quantity: number;
    createdAt: string;
}

export interface GetSponsoredItemsParams extends PaginationParams{
    sortBy?: string;
    order?: 'asc' | 'desc',
    startDate?: string;
    endDate?: string;
    search?: string;
}

export interface GetSponsoredItemsResponse extends PaginationResponse {
    success: true;
    sponsoredItems: SponsoredItem[];
}

export interface CreateSponsoredItemsPayload {
    newSponsoredItems: {
        variant_id: string;
        quantity: number;
    }[];
}

export interface CreateSponsoredItemsResponse extends ApiResponse {
    sponsoredItems: SponsoredItem[];
}