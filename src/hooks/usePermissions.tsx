import { useAuthStore } from "../lib/store/authStore";

export default function usePermissions () {
    const { isAuthenticated } = useAuthStore();

    return {
        isAuthenticated,
        hasPermissions: (requiredPermissions : string[], permissions : string[]) => requiredPermissions.every(permission => permissions.includes(permission))
    }
}