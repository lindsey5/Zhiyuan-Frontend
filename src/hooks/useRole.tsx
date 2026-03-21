import { useQuery } from "@tanstack/react-query"
import type { GetRoleResponse } from "../types/role.type"
import { roleService } from "../service/roleService"

export const useRole = () => {

    const getOwnRole = () => {
        return useQuery<GetRoleResponse, Error>({
            queryKey: ['permissions'],
            queryFn: roleService.getOwnRole
        })
    }

    return {
        getOwnRole
    }

}