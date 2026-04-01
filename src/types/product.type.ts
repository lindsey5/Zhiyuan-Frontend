import type { PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { Variant } from "./variant";

export interface Product {
    id: number;
    product_name: string;
    description: string;
    thumbnail_public_id: string;
    thumbnail_url: string;
    category: string;
    createdAt: string;
    variants: Variant[];
}

export interface GetProductsResponse extends PaginationResponse {
    products: Product[]
}

export interface GetProductsParams {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    sortBy?: string;
    order?: "ASC" | "DESC";
};

export interface CreateVariant {
    variant_name: string;
    stock: number;
    price: number;
    sku: string;
    image: File;
}

export interface CreateProductResponse extends ApiResponse {
    product: Product
}

export interface SearchProductResponse {
    success: boolean;
    product: Product
}

export interface GetProductResponse {
    success: boolean;
    product: Product
}

export interface UpdateProductPayload {
    id: number;
    product_name: string;
    description: string;
    thumbnail_public_id?: string;
    thumbnail_url: string;
    category: string;
    createdAt: string;
    variants: UpdateVariantPayload[];
}

export interface UpdateVariantPayload {
    id?: number;
    product_id?: number;
    variant_name: string;
    stock: number;
    price: number;
    image_public_id?: string;
    image_url: string;
    sku: string;
}

export interface UpdateProductResponse extends ApiResponse {
    product: Product;
}