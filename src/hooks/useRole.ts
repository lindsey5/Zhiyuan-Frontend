import { useMutation, useQuery } from "@tanstack/react-query"
import type { GetRoleResponse, GetRolesResponse, RoleDTO } from "../types/role.type"
import { roleService } from "../service/roleService"

export const useRole = () => {

    const getOwnRole = (accessToken : string) => {
        return useQuery<GetRoleResponse, Error>({
            queryKey: ['role'],
            queryFn: async () => {
                return roleService.getOwnRole(accessToken)
            }
        })
    }

    const getRoles = (accessToken : string) => {
        return useQuery<GetRolesResponse, Error>({
            queryKey: ['roles'],
            queryFn: async () => {
                return roleService.getRoles(accessToken)
            },
            
        })
    }

    const createRole = useMutation({
        mutationFn: ({ payload, accessToken } : { payload : RoleDTO, accessToken: string}) => {
            return roleService.createRole(payload, accessToken)
        },
        onSuccess: () => window.location.href = '/dashboard/roles'
    })

    const getRoleById = (id : string, accessToken : string) => (
        useQuery<GetRoleResponse>({
            queryKey: ['role', id],
            queryFn: async () => {
                return roleService.getRoleById(id, accessToken)
            },
        })
    )

    const updateRole = useMutation({
        mutationFn: ({ payload, accessToken, id } : { payload: RoleDTO, accessToken: string, id: string})=> {
            return roleService.updateRole(id, payload, accessToken);
        }
    })

    const deleteRole = useMutation({
        mutationFn: ({ id, accessToken } : { id: string, accessToken: string}) => {
            return roleService.deleteRole(id, accessToken)
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