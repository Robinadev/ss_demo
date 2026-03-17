import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUserProfile } from '../services/userService';
import { Role } from '../config/roles';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: Role;
  fallbackPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole,
  fallbackPath = '/unauthorized',
}) => {
  const [hasRole, setHasRole] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const user = await getCurrentUserProfile();
        setHasRole(user?.role === requiredRole);
      } catch (error) {
        console.error('Error checking user role:', error);
        setHasRole(false);
      }
    };

    checkRole();
  }, [requiredRole]);

  if (hasRole === null) {
    // Loading state
    return <div>Loading...</div>;
  }

  if (!hasRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};
