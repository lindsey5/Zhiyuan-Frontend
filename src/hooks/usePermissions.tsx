import { useAuthStore } from "../lib/store/authStore";

export default function usePermissions () {
    const { isAuthenticated } = useAuthStore();

    return {
        isAuthenticated
    }
}