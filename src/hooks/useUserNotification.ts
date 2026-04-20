import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetUserNotificationsParams, GetUserNotificationsResponse } from "../types/userNotification.type"
import { userNotificationService } from "../service/userNotificationService"

export const useUserNotification = () => {
    const getUserNotifications = (params : GetUserNotificationsParams) => (
        useQuery<GetUserNotificationsResponse, Error>({
            queryKey: ['user-notifications', params],
            queryFn: () => userNotificationService.getUserNotifications(params),
            refetchOnWindowFocus: false,
        })
    )

    const readNotification = useMutation({
        mutationFn: ({ id } : { id: string }) => userNotificationService.readNotification(id)
    })

    const readAllNotifications = useMutation({
        mutationFn: () => userNotificationService.readAllNotifications()
    })

    return {
        getUserNotifications,
        readNotification,
        readAllNotifications
    }
}