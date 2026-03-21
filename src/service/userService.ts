import { apiAxios, HttpMethod } from "../lib/api/apiAxios"
import { useAuthStore } from "../lib/store/authStore"
import type { UpdateUserPayload, UserResponse } from "../types/user.type"

export const userService = {
    updateOwnAccount: (data: UpdateUserPayload): Promise<UserResponse> => {
        const { accessToken } = useAuthStore.getState()
        return apiAxios<UserResponse>("users/me", {
            method: HttpMethod.PUT,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    },
    getUser: (): Promise<UserResponse> => {
        const { accessToken } = useAuthStore.getState()
        return apiAxios<UserResponse>("user", {
            method: HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

}