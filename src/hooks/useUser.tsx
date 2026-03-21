import { useMutation } from "@tanstack/react-query"
import { userService } from "../service/userService"
import { useAuthStore } from "../lib/store/authStore"

export const useUser = () => {
    const { setUser } = useAuthStore();

    const updateOwn = useMutation({
        mutationFn: userService.updateOwnAccount,
        onSuccess: (data) => {
            setUser(data.user)
        },
    })

    return {
        updateOwn
    }
}