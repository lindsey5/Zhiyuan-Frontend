import { useQuery } from "@tanstack/react-query"
import type { OwnPermission } from "../types/role.type"
import { roleService } from "../service/roleService"

export const useRole = () => {

    const getOwnPermissions = () => {
        return useQuery<OwnPermission, Error>({
            queryKey: ['permissions'],
            queryFn: roleService.getOwnPermissions
        })
    }

    return {
        getOwnPermissions
    }

}