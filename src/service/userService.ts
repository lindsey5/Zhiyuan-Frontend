import { apiAxios, HttpMethod } from "../lib/api/apiAxios"
import type { CreateUserPayload, CreateUserResponse, GetUsersCountResponse, GetUsersParams, GetUsersResponse, UpdateUserOwnPayload, UpdateUserPayload, UpdateUserResponse } from "../types/user.type"

export const userService = {
    updateOwnAccount: (data: UpdateUserOwnPayload) => {
        return apiAxios<UpdateUserResponse>("users/me", {
            method: HttpMethod.PUT,
            data,
        })
    },

    getUsers: (params : GetUsersParams) => {
        return apiAxios<GetUsersResponse>("users", {
            method: HttpMethod.GET,
            params
        })
    },

    getUsersCount: () => {
        return apiAxios<GetUsersCountResponse>("users/count", {
            method: HttpMethod.GET,
        })
    },

    createUser: (data : CreateUserPayload) => {
        return apiAxios<CreateUserResponse>("users", {
            method: HttpMethod.POST,
            data
        })
    },

    updateUser: (id : string, data : UpdateUserPayload) => {
        return apiAxios<UpdateUserResponse>(`users/${id}`, {
            method: HttpMethod.PUT,
            data
        })
    },

    changePassword: (data: any) => {
        return apiAxios<void>("users/change-password", {
            method: HttpMethod.PATCH,
            data,
        })
    },

    deleteUser: (id : string) => {
        return apiAxios<UpdateUserResponse>(`users/${id}`, {
            method: HttpMethod.DELETE,
        })
    },

    isEmailExist: ({id, email} : { id?: string, email: string}) => {
        return apiAxios<CreateUserResponse>(`users/email`, {
            method: HttpMethod.GET,
            params: {
                email,
                id
            }
        })
    },

}