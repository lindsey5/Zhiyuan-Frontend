import { apiAxios, HttpMethod } from "../lib/api/apiAxios"
import type { UpdateUserPayload, UpdateUserResponse, UserResponse } from "../types/user.type"

export const userService = {
    updateOwnAccount: (data: UpdateUserPayload, accessToken: string) => {
        return apiAxios<UpdateUserResponse>("users/me", {
            method: HttpMethod.PUT,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    },
    getUser: (accessToken : string) => {
        return apiAxios<UserResponse>("user", {
            method: HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

}