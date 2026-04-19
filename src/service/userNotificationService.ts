import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { ApiResponse } from "../types/type";
import type { GetUserNotificationsParams, GetUserNotificationsResponse } from "../types/userNotification.type";

export const userNotificationService = {
    getUserNotifications: (params : GetUserNotificationsParams) : Promise<GetUserNotificationsResponse> => 
        apiAxios<GetUserNotificationsResponse>("user-notifications", {
            method: HttpMethod.GET,
            params,
        }),

    readNotification: (id : string) : Promise<ApiResponse> => 
        apiAxios<ApiResponse>(`user-notifications/${id}`, {
            method: HttpMethod.PATCH
    }),

    readAllNotifications: () => 
        apiAxios<ApiResponse>(`user-notifications`, {
            method: HttpMethod.PATCH
        })


}