export interface Order {
    _id: string;
    order_id: string;
    customer_name: string;
    status: "pending" | "processing" | "completed" | "cancelled";
    total_amount: number;
    delivery_type: "pickup" | "delivery";
    payment_method: "COD" | "GCash" | "Card";
    payment_status: "paid" | "unpaid";
}

export interface OrderItemAttributes {
    _id: string;
    order: Order;
    order_id: string;
    variant_id: string;
    quantity: number;
    amount: number;
    price: number;
}