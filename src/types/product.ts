export interface Product {
    id: number;
    product_name: string;
    description: string;
    thumbnail_public_id: string;
    thumbnail_url: string;
    category: string;
    createdAt?: Date;
    variants: Variant[];
}

export interface Variant {
    id: number;
    product_id: number;
    variant_name: string;
    stock: number;
    price: number;
    image_public_id: string;
    image_url: string;
    sku: string;
}


export interface GetProductsResponse {
    success: boolean;
    page: number;
    limit: number;
    totalPages: number;
    total: number;
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