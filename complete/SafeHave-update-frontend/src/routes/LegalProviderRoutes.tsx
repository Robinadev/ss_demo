import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { legalProviderRoutes } from './LegalProviderRoutesConfig';

export function LegalProviderRoutes() {
  return <AuthenticatedRoutes routes={legalProviderRoutes} />;
}
