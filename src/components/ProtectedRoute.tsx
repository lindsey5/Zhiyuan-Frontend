import { Navigate, useNavigate } from 'react-router-dom';
import { type ReactNode, useEffect } from 'react';
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

  const navigate = useNavigate();
  const {
    isAuthenticated,
    hasPermissions
  } = usePermissions();
  const { getOwnPermissions } = useRole();
  const permissions = getOwnPermissions().data?.permissions || []

  // Watch for authentication changes and redirect immediately if user becomes unauthenticated
  useEffect(() => {
    if (requireAuthentication && !isAuthenticated()) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, requireAuthentication, navigate, redirectTo]);

  // Check authentication if required
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