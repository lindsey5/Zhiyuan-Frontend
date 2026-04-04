import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetRoleResponse, GetRolesResponse, RoleDTO } from "../types/role.type"
import { roleService } from "../service/roleService"

export const useRole = () => {

    const getOwnRole = () => (
        useQuery<GetRoleResponse, Error>({
            queryKey: ['role'],
            queryFn:() => roleService.getOwnRole(),
            staleTime: Infinity, 
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        })
    )

    const getRoles = () => (
        useQuery<GetRolesResponse, Error>({
            queryKey: ['roles'],
            queryFn: async () => roleService.getRoles(),
            staleTime: Infinity, 
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        })
    )

    const createRole = useMutation({
        mutationFn: ({ payload } : { payload : RoleDTO }) =>  roleService.createRole(payload),
        onSuccess: () => window.location.href = '/dashboard/roles'
    })

    const getRoleById = (id : string) => (
        useQuery<GetRoleResponse>({
            queryKey: ['role', id],
            queryFn: () => roleService.getRoleById(id),
            refetchOnWindowFocus: false,
        })
    )

    const updateRole = useMutation({
        mutationFn: ({ payload, id } : { payload: RoleDTO, id: string})=> roleService.updateRole(id, payload)
    })

    const deleteRole = useMutation({
        mutationFn: ({ id } : { id: string }) => roleService.deleteRole(id)
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