import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { VariantWithProduct } from "./variant.type";

export interface Address {
    street: string;
    barangay: string;
    city: string;
}

export interface Order {
    _id: string;
    order_id: string;
    customer_name: string;
    status: "pending" | "processing" | "delivered" |"completed" | "cancelled" | "refunded" | "expired";
    total_amount: number;
    delivery_type: "pickup" | "delivery";
    payment_method: "cash" | "gcash" | "card" | "paymaya";
    payment_status: "paid" | "unpaid";
    payment: number;
    change: number;
    order_items: OrderItem[];
    address?: Address;
    createdAt: string;
}

export interface OrderItem {
    _id: string;
    order: Order;
    order_id: string;
    variant_id: string;
    variant: VariantWithProduct;
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

export interface GetOrderResponse {
    success: boolean;
    order: Order;
}

export interface OrderMarkAsPaidPayload {
    payment_method:  "cash" | "gcash" | "card" | "paymaya";
    payment: number;
}

export interface OrderMarkAsPaidResponse extends ApiResponse {
    order: Order;
}

export interface UpdateOrderStatusPayload {
    status: string;
}

export interface UpdateOrderStatusResponse extends ApiResponse {
    order: Order;
}