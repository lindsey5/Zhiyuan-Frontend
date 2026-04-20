import { useMutation, useQuery } from "@tanstack/react-query"
import { userService } from "../service/userService"
import { useAuthStore } from "../lib/store/authStore"
import type { ChangePasswordPayload, CreateUserPayload, GetUsersCountResponse, GetUsersParams, GetUsersResponse, UpdateUserOwnPayload, UpdateUserPayload } from "../types/user.type";

export const useUser = () => {
    const { setUser } = useAuthStore();

    const createUser = useMutation({
        mutationFn: ({ payload } : {
            payload: CreateUserPayload,
        }) => userService.createUser(payload),
    })

    const updateUser = useMutation({
        mutationFn: ({ id, payload } : { 
            id: string, 
            payload: UpdateUserPayload 
        }) => userService.updateUser(id, payload)
    })

    const updateOwn = useMutation({
        mutationFn: ({ payload } : { 
            payload: UpdateUserOwnPayload, 
        }) => userService.updateOwnAccount(payload),
        onSuccess: (data) => setUser(data.user)
    })

    const changePasswordMutate = useMutation({
        mutationFn: (payload: ChangePasswordPayload) =>
        userService.changePassword(payload),
    });

    const deleteUser = useMutation({
        mutationFn: ({ id } : { id: string }) => userService.deleteUser(id)
    })

    const getUsers = (params : GetUsersParams) => (
        useQuery<GetUsersResponse, Error>({
            queryKey: ['users', params],
            queryFn: () => userService.getUsers(params),
            refetchOnWindowFocus: false,
        })
    )

    const getUsersCount = () => (
        useQuery<GetUsersCountResponse, Error>({
            queryKey: ['users/count'],
            queryFn: () => userService.getUsersCount(),
            refetchOnWindowFocus: false,
        })
    )

    return {
        createUser,
        updateUser,
        updateOwn,
        changePasswordMutate,
        deleteUser,
        getUsers,
        getUsersCount
    }
}