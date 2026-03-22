import { apiAxios, HttpMethod } from "../lib/api/apiAxios"
import type { UpdateUserPayload, UserResponse } from "../types/user.type"

export const userService = {
    updateOwnAccount: (data: UpdateUserPayload, accessToken: string): Promise<UserResponse> => {
        return apiAxios<UserResponse>("users/me", {
            method: HttpMethod.PUT,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    },
    getUser: (accessToken : string): Promise<UserResponse> => {
        return apiAxios<UserResponse>("user", {
            method: HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

}