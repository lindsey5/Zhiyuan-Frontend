import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetUserNotificationsParams, GetUserNotificationsResponse } from "../types/userNotification.type";

export const userNotificationService = {
    getUserNotifications: (params : GetUserNotificationsParams) : Promise<GetUserNotificationsResponse> => 
        apiAxios<GetUserNotificationsResponse>("user-notifications", {
            method: HttpMethod.GET,
            params,
        })
}