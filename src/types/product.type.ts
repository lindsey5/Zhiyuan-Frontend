import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { UpdateVariantPayload, Variant, VariantWithProduct } from "./variant.type";

export interface Product {
    _id: string;
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

export interface GetProductsParams extends PaginationParams {
    search?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc";
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
    _id: string;
    product_name: string;
    description: string;
    thumbnail_public_id?: string;
    thumbnail_url: string;
    category: string;
    createdAt: string;
    variants: UpdateVariantPayload[];
}

export interface UpdateProductResponse extends ApiResponse {
    product: Product;
}

export interface GetTotalProductsResponse {
    success: boolean;
    totalProducts: number;
}

export interface GetTotalLowStockProducts {
    success: boolean;
    totalLowStockProducts: number;
}

export interface MostSellingProduct {
    _id: string;
    totalSold: number;
    totalRevenue: number;
    variant: VariantWithProduct;
}

export interface GetMostSellingProductsResponse {
    success: boolean;
    mostSellingProducts: MostSellingProduct[];
}