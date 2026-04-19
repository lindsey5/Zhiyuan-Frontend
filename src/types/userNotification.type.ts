import type { Distributor } from "./distributor.type";
import type { DistributorSale } from "./distributorSale.type";
import type { Order } from "./order.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ReturnRequest } from "./returnRequest.type";
import type { StockTransferLog } from "./stock-transfer-log.type";

export interface UserNotification {
    _id: string;
    user_id: string;
    message: string;
    status: 'read' | 'unread';
    saleNotification?: SaleNotification;
    returnNotification?: ReturnNotification;
    orderNotification?: OrderNotification;
    stockTransferNotification?: StockTransferNotification;
    createdAt: string;
}

export interface SaleNotification{
    _id: string
    notification_id: string;
    distributor_id: string;
    sale_ids: string;
    sold_by: Distributor;
    sales: DistributorSale[];
    createdAt: string;
}

export interface ReturnNotification {
    _id: string;
    notification_id: string;
    return_id: string;
    returnRequest: ReturnRequest;
}

export interface OrderNotification {
    _id: string;
    notification_id: string;
    order_id: string;
    order: Order;
}

export interface StockTransferNotification{
    _id: string;
    notification_id: string;
    stock_transfer_id: string;
    stockTransfer: StockTransferLog;
    
}

export interface GetUserNotificationsParams extends PaginationParams{}

export interface GetUserNotificationsResponse extends PaginationResponse{
    userNotifications: UserNotification[];
    unread: number;
}