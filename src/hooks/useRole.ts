import { useQuery } from "@tanstack/react-query"
import type { GetRoleResponse, GetRolesResponse } from "../types/role.type"
import { roleService } from "../service/roleService"
import { useAuthStore } from "../lib/store/authStore"

export const useRole = () => {
    const { accessToken } = useAuthStore();

    const getOwnRole = () => {
        return useQuery<GetRoleResponse, Error>({
            queryKey: ['permissions'],
            queryFn: async () => {
                return roleService.getOwnRole(accessToken || "")
            }
        })
    }

    const getRoles = () => {
        return useQuery<GetRolesResponse, Error>({
            queryKey: ['role'],
            queryFn: async () => {
                return roleService.getRoles(accessToken || "")
            }
        })
    }

    return {
        getOwnRole,
        getRoles
    }

}