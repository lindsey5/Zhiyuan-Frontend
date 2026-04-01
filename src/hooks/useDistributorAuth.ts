import { useMutation } from "@tanstack/react-query"
import { authService } from "../service/authService"
import { useNavigate } from "react-router-dom"
import { useDistributorAuthStore } from "../lib/store/distributorAuthStore"

export const useDistributorAuth = () => {
    const { setAuth, setDistributor, logout } = useDistributorAuthStore();
    const navigate = useNavigate()

    const login = useMutation({
        mutationFn: authService.distributorLogin,
        onSuccess: (data) => {
        setAuth(data.token.accessToken, data.token.refreshToken)
        setDistributor(data.distributor)
        navigate("dashboard")
        },
    })

    const logoutMutate = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
        logout()
        navigate("/");
        },
    })

    return {
        login,
        logoutMutate,
    }
}