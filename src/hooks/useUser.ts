import { useMutation } from "@tanstack/react-query"
import { userService } from "../service/userService"
import { useAuthStore } from "../lib/store/authStore"
import type { UpdateUserPayload } from "../types/user.type";

export const useUser = () => {
    const { setUser } = useAuthStore();

    const updateOwn = useMutation({
        mutationFn: ({ payload, accessToken } : { 
            payload: UpdateUserPayload, 
            accessToken: string
        }) => userService.updateOwnAccount(payload, accessToken),
        onSuccess: (data) => {
            setUser(data.user)
        },
    })

    return {
        updateOwn
    }
}