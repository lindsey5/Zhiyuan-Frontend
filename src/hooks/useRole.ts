import { useQuery } from "@tanstack/react-query"
import type { GetRoleResponse } from "../types/role.type"
import { roleService } from "../service/roleService"
import { useAuthStore } from "../lib/store/authStore"

export const useRole = () => {
    const { accessToken } = useAuthStore();

    const getOwnRole = () => {
        return useQuery<GetRoleResponse, Error>({
            queryKey: ['permissions'],
            queryFn: async () => roleService.getOwnRole(accessToken || "")
        })
    }

    return {
        getOwnRole
    }

}