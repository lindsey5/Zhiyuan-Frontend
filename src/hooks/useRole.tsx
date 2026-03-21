import { useQuery } from "@tanstack/react-query"
import type { OwnPermissionResponse } from "../types/role.type"
import { roleService } from "../service/roleService"

export const useRole = () => {

    const getOwnPermissions = () => {
        return useQuery<OwnPermissionResponse, Error>({
            queryKey: ['permissions'],
            queryFn: roleService.getOwnPermissions
        })
    }

    return {
        getOwnPermissions
    }

}