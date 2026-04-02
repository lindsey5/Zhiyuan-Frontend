import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetRoleResponse, GetRolesResponse, RoleDTO } from "../types/role.type"
import { roleService } from "../service/roleService"
import { useAuthStore } from "../lib/store/authStore"

export const useRole = () => {
    const { accessToken } = useAuthStore();

    const getOwnRole = () => (
        useQuery<GetRoleResponse, Error>({
            queryKey: ['role'],
            queryFn:() => roleService.getOwnRole(accessToken || ""),
            staleTime: Infinity, 
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        })
    )

    const getRoles = () => (
        useQuery<GetRolesResponse, Error>({
            queryKey: ['roles'],
            queryFn: async () => roleService.getRoles(accessToken || ""),
            staleTime: Infinity, 
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        })
    )

    const createRole = useMutation({
        mutationFn: ({ payload } : { payload : RoleDTO }) =>  roleService.createRole(payload, accessToken || ""),
        onSuccess: () => window.location.href = '/dashboard/roles'
    })

    const getRoleById = (id : string) => (
        useQuery<GetRoleResponse>({
            queryKey: ['role', id],
            queryFn: () => roleService.getRoleById(id, accessToken || ""),
            refetchOnWindowFocus: false,
        })
    )

    const updateRole = useMutation({
        mutationFn: ({ payload, id } : { payload: RoleDTO, id: string})=> roleService.updateRole(id, payload, accessToken || "")
    })

    const deleteRole = useMutation({
        mutationFn: ({ id } : { id: string }) => roleService.deleteRole(id, accessToken || "")
    })

    return {
        getOwnRole,
        getRoles,
        createRole,
        getRoleById,
        updateRole,
        deleteRole
    }

}