import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { User } from "./user.type";
import type { VariantWithProduct } from "./variant.type";

export interface StockTransferLog {
    _id: string;
    receiver_id: string;
    sender_id: string;
    createdAt: string;
    receiver: Distributor;
    sender: User;
    items: StockTransferItem[];
}

export interface StockTransferItem {
    _id: string;
    transfer_id: string;
    quantity: number;
    variant_id: string;
    variant: VariantWithProduct;
}

export interface GetStockTransferLogsResponse extends PaginationResponse {
    stockTransferLogs: StockTransferLog[]
}

export interface GetStockTransferLogsParams extends PaginationParams {
    search?: string;
    startDate: string;
    endDate: string;
}