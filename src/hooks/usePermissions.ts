import { useAuthStore } from "../lib/store/authStore";

export default function usePermissions () {
    const { isAuthenticated } = useAuthStore();

    return {
        isAuthenticated,
        hasPermissions: (requiredPermissions : string[], permissions : string[]) => {
            if(permissions.length === 0) return false;
            return requiredPermissions.every(permission => permissions.includes(permission))
        },
        hasAnyPermissions: (anyPermissions: string[], permissions: string[]) => {
        if (permissions.length === 0) return false;
        return anyPermissions.some(permission => permissions.includes(permission));
        }
    }
}