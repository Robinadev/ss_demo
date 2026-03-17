import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../components/AppContext';

interface RoleBasedRouteProps {
  children: ReactNode;
  roles: string[];
  fallbackPath?: string;
}

export function RoleBasedRoute({
  children,
  roles,
  fallbackPath = '/',
}: RoleBasedRouteProps) {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!user.role || !roles.includes(user.role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
