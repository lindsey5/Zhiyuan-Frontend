import { Navigate, useNavigate } from 'react-router-dom';
import { type ReactNode, useEffect } from 'react';
import usePermissions from '../hooks/usePermissions';

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuthentication?: boolean;
  redirectTo?: string;
};

export const ProtectedRoute = ({
  children,
  requireAuthentication = true,
  redirectTo = '/',
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
  } = usePermissions();

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

  return <>{children}</>;
};