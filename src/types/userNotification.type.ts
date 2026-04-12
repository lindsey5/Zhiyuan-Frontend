import type { Distributor } from "./distributor.type";
import type { DistributorSale } from "./distributorSale.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";
import type { ReturnRequest } from "./returnRequest.type";

export interface UserNotification {
    _id: string;
    user_id: string;
    message: string;
    status: 'read' | 'unread';
    saleNotification?: SaleNotification;
    returnNotification?: ReturnNotification;
    createdAt: string;
}

export interface SaleNotification{
    _id: string
    notification_id: string;
    distributor_id: string;
    sale_ids: string;
    sold_by: Distributor;
    sales: DistributorSale[];
}

export interface ReturnNotification {
    _id: string;
    notification_id: string;
    return_id: string;
    returnRequest: ReturnRequest;
}

export interface GetUserNotificationsParams extends PaginationParams{}

export interface GetUserNotificationsResponse extends PaginationResponse{
    userNotifications: UserNotification[];
    unread: number;
}