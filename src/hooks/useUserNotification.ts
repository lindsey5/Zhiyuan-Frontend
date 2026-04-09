import { useQuery } from "@tanstack/react-query"
import type { GetUserNotificationsParams, GetUserNotificationsResponse } from "../types/userNotification.type"
import { userNotificationService } from "../service/userNotificationService"

export const useUserNotification = () => {
    const getUserNotifications = (params : GetUserNotificationsParams) => (
        useQuery<GetUserNotificationsResponse, Error>({
            queryKey: ['user-notifications', params],
            queryFn: () => userNotificationService.getUserNotifications(params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
        getUserNotifications
    }
}