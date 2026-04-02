import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetRoleResponse, GetRolesResponse, RoleDTO } from "../types/role.type"
import { roleService } from "../service/roleService"
import { useAuthStore } from "../lib/store/authStore"

export const useRole = () => {
    const { accessToken } = useAuthStore();

    const getOwnRole = () => {
        return useQuery<GetRoleResponse, Error>({
            queryKey: ['role'],
            queryFn: async () => {
                return roleService.getOwnRole(accessToken || "")
            }
        })
    }

    const getRoles = () => {
        return useQuery<GetRolesResponse, Error>({
            queryKey: ['roles'],
            queryFn: async () => {
                return roleService.getRoles(accessToken || "")
            },
            
        })
    }

    const createRole = useMutation({
        mutationFn: ({ payload } : { payload : RoleDTO }) => {
            return roleService.createRole(payload, accessToken || "")
        },
        onSuccess: () => window.location.href = '/dashboard/roles'
    })

    const getRoleById = (id : string) => (
        useQuery<GetRoleResponse>({
            queryKey: ['role', id],
            queryFn: async () => {
                return roleService.getRoleById(id, accessToken || "")
            },
        })
    )

    const updateRole = useMutation({
        mutationFn: ({ payload, id } : { payload: RoleDTO, id: string})=> {
            return roleService.updateRole(id, payload, accessToken || "");
        }
    })

    const deleteRole = useMutation({
        mutationFn: ({ id } : { id: string }) => {
            return roleService.deleteRole(id, accessToken || "")
        } 
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