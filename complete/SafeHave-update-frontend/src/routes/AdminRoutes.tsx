import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { adminRoutes } from './AdminRoutesConfig';

export function AdminRoutes() {
  return <AuthenticatedRoutes routes={adminRoutes} />;
}
