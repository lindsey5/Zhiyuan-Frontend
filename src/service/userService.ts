import { apiAxios, HttpMethod } from "../lib/api/apiAxios"
import type { CreateUserPayload, CreateUserResponse, GetUsersCountResponse, GetUsersParams, GetUsersResponse, UpdateUserOwnPayload, UpdateUserPayload, UpdateUserResponse } from "../types/user.type"

export const userService = {
    updateOwnAccount: (data: UpdateUserOwnPayload, accessToken: string) => {
        return apiAxios<UpdateUserResponse>("users/me", {
            method: HttpMethod.PUT,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    },
    getUsers: (accessToken : string, params : GetUsersParams) => {
        return apiAxios<GetUsersResponse>("users", {
            method: HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params
        })
    },
    getUsersCount: (accessToken : string) => {
        return apiAxios<GetUsersCountResponse>("users/count", {
            method: HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
    },

    createUser: (data : CreateUserPayload, accessToken : string) => {
        return apiAxios<CreateUserResponse>("users", {
            method: HttpMethod.POST,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data
        })
    },

    updateUser: (id : string, data : UpdateUserPayload, accessToken : string) => {
        return apiAxios<UpdateUserResponse>(`users/${id}`, {
            method: HttpMethod.PUT,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data
        })
    }

}