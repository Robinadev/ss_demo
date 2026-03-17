import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { medicalProviderRoutes } from './MedicalProviderRoutesConfig';

export function MedicalProviderRoutes() {
  return <AuthenticatedRoutes routes={medicalProviderRoutes} />;
}
