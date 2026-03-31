import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetRoleResponse, GetRolesResponse, RoleDTO } from "../types/role.type"
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
            },
            
        })
    }

    const createRole = useMutation({
        mutationFn: ({ payload, accessToken } : { payload : RoleDTO, accessToken: string}) => {
            return roleService.createRole(payload, accessToken)
        },
        onSuccess: () => window.location.href = '/dashboard/roles'
    })

    const getRoleById = (id : number, accessToken : string) => (
        useQuery<GetRoleResponse>({
            queryKey: ['role'],
            queryFn: async () => {
                return roleService.getRoleById(id, accessToken)
            },
        })
    )

    const updateRole = useMutation({
        mutationFn: ({ payload, accessToken, id } : { payload: RoleDTO, accessToken: string, id: number})=> {
            return roleService.updateRole(id, payload, accessToken);
        }
    })

    return {
        getOwnRole,
        getRoles,
        createRole,
        getRoleById,
        updateRole
    }

}