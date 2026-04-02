import { useMutation, useQuery } from "@tanstack/react-query"
import { userService } from "../service/userService"
import { useAuthStore } from "../lib/store/authStore"
import type { CreateUserPayload, GetUsersCountResponse, GetUsersParams, GetUsersResponse, UpdateUserOwnPayload, UpdateUserPayload } from "../types/user.type";

export const useUser = () => {
    const { accessToken, setUser } = useAuthStore();

    const createUser = useMutation({
        mutationFn: ({ payload } : {
            payload: CreateUserPayload,
        }) => userService.createUser(payload, accessToken || ""),
    })

    const updateUser = useMutation({
        mutationFn: ({ id, payload } : { 
            id: string, 
            payload: UpdateUserPayload 
        }) => userService.updateUser(id, payload, accessToken || "")
    })

    const updateOwn = useMutation({
        mutationFn: ({ payload } : { 
            payload: UpdateUserOwnPayload, 
        }) => userService.updateOwnAccount(payload, accessToken || ""),
        onSuccess: (data) => setUser(data.user)
    })

    const deleteUser = useMutation({
        mutationFn: ({ id } : { id: string }) => userService.deleteUser(id, accessToken || "")
    })

    const getUsers = (params : GetUsersParams) => (
        useQuery<GetUsersResponse, Error>({
            queryKey: ['users', params],
            queryFn: () => userService.getUsers(accessToken || "", params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getUsersCount = () => (
        useQuery<GetUsersCountResponse, Error>({
            queryKey: ['users/count'],
            queryFn: () => userService.getUsersCount(accessToken || ""),
            refetchOnWindowFocus: false,
        })
    )

    return {
        createUser,
        updateUser,
        updateOwn,
        deleteUser,
        getUsers,
        getUsersCount
    }
}