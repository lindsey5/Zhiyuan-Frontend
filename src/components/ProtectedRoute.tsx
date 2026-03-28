import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import usePermissions from '../hooks/usePermissions';
import { useRole } from '../hooks/useRole';
import Unauthorized from './Unauthorized';

type ProtectedRouteProps = {
    children: ReactNode;
    requireAuthentication?: boolean;
    requiredPermissions?: string[];
    anyPermissions?: string[];
    redirectTo?: string;
};

export const ProtectedRoute = ({
    children,
    requireAuthentication = true,
    requiredPermissions = [],
    anyPermissions = [],
    redirectTo = '/',
}: ProtectedRouteProps) => {
    const {
        isAuthenticated,
        hasPermissions,
        hasAnyPermissions
    } = usePermissions();
    const { getOwnRole } = useRole();
    const { isLoading, data } = getOwnRole();
    const permissions = data?.permissions || []

    if (requireAuthentication && !isAuthenticated()) {
        return <Navigate to={redirectTo} replace />;
    }

    if(isLoading){
        return null
    }

    if (permissions.length > 0) {
        const hasRequiredPermissions = hasPermissions(requiredPermissions, permissions);

        if (!hasRequiredPermissions) {
            return <Unauthorized>{children}</Unauthorized>
        }
    }

    if (anyPermissions.length > 0) {
        const hasAnyPermission = hasAnyPermissions(anyPermissions, permissions);

        if (!hasAnyPermission) {
            return <Unauthorized>{children}</Unauthorized>;
        }
    }

    return <>{children}</>;
};