import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import usePermissions from '../hooks/usePermissions';
import { useRole } from '../hooks/useRole';

type ProtectedRouteProps = {
    children: ReactNode;
    requireAuthentication?: boolean;
    requiredPermissions?: string[]
    redirectTo?: string;
};

export const ProtectedRoute = ({
    children,
    requireAuthentication = true,
    requiredPermissions = [],
    redirectTo = '/',
}: ProtectedRouteProps) => {
    const {
        isAuthenticated,
        hasPermissions
    } = usePermissions();
    const { getOwnRole } = useRole();
    const permissions = getOwnRole().data?.permissions || []

    if (requireAuthentication && !isAuthenticated()) {
        return <Navigate to={redirectTo} replace />;
    }

    if (permissions.length > 0) {
        const hasRequiredPermissions = hasPermissions(requiredPermissions, permissions);
        
        if (!hasRequiredPermissions) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <>{children}</>;
};