import type { DistributorSale } from "./distributorSale.type";
import type { PaginationParams, PaginationResponse } from "./pagination.type";

export interface UserNotification {
    _id: string;
    user_id: string;
    message: string;
    status: 'read' | 'unread';
    saleNotification?: DistributorSale
    createdAt: string;
}

export interface GetUserNotificationsParams extends PaginationParams{}

export interface GetUserNotificationsResponse extends PaginationResponse{
    userNotifications: UserNotification[];
    unread: number;
}