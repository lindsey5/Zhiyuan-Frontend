import type { Distributor } from "./distributor.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ApiResponse } from "./type";
import type { User } from "./user.type";
import type { VariantWithProduct } from "./variant.type";

export type StockTransferStatus = 'pending'| 'approved'| 'processing' | 'delivered' | 'received' |  'cancelled' | 'rejected';

export interface StockTransferLog {
    _id: string;
    transfer_no: string;
    receiver_id: string;
    sender_id: string;
    createdAt: string;
    updatedAt: string;
    receiver: Distributor;
    sender: User;
    items: StockTransferItem[];
    status: StockTransferStatus;
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
    status: string;
}

export interface CreateStockTransferLogPayload {
    variant_id: string;
    quantity: number;
}

export interface StockTransferLogResponse extends ApiResponse {
    stockTransfer: StockTransferLog;
}