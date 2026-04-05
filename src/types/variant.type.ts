import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { Product } from "./product.type";
import type { ApiResponse } from "./type";

export interface Variant {
    _id: string;
    product_id: string;
    variant_name: string;
    stock: number;
    price: number;
    image_public_id: string;
    image_url: string;
    sku: string;
    createdAt: string;
}

export interface VariantWithProduct extends Variant{
    product: Product;
}

export interface GetVariantsResponse extends PaginationResponse {
    variants: VariantWithProduct[]
}

export interface GetVariantsParams extends PaginationParams {
    search?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc"
}

export interface UpdateVariantPayload {
    _id?: string;
    product_id?: string;
    variant_name: string;
    stock: number;
    price: number;
    image_public_id?: string;
    image_url: string;
    sku: string;
}

export interface UpdateVariantResponse extends ApiResponse {
    variant: Variant;
}