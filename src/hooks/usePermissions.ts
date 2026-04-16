import { useRole } from "./useRole";

export default function usePermissions () {
    const { getOwnRole } = useRole();
    const { data, isFetching } = getOwnRole();
    const permissions = data?.permissions || [];

    return {
        hasPermissions: (requiredPermissions : string[]) => {
            if(permissions.length === 0) return false;
            return requiredPermissions.every(permission => permissions.includes(permission))
        },
        hasAnyPermissions: (anyPermissions: string[]) => {
            if (permissions.length === 0) return false;
            return anyPermissions.some(permission => permissions.includes(permission));
        },
        isLoading: isFetching
    }
}