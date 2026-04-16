import type { PaginationParams, PaginationResponse } from "./pagination.type";

export interface Order {
    _id: string;
    order_id: string;
    customer_name: string;
    status: "pending" | "processing" | "delivered" |"completed" | "cancelled" | "refunded";
    total_amount: number;
    delivery_type: "pickup" | "delivery";
    payment_method: "COD" | "GCash" | "Card" | "Paymaya";
    payment_status: "paid" | "unpaid";
    order_items: OrderItem[]
    createdAt: string;
}

export interface OrderItem {
    _id: string;
    order: Order;
    order_id: string;
    variant_id: string;
    quantity: number;
    amount: number;
    price: number;
}

export interface GetOrdersParams extends PaginationParams{
    search?: string;
    status?: string;
    paymentMethod?: string;
    paymentStatus?: string;
    deliveryType?: string;
    startDate?: string;
    endDate?: string;
}

export interface GetOrdersResponse extends PaginationResponse {
    orders: Order[];
}