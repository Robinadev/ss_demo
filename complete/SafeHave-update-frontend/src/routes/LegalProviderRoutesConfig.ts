import { lazy } from 'react';

const LegalDashboardPage = lazy(() =>
  import('../pages/counselor/legal/dashboard').then((module) => ({
    default: module.default,
  }))
);

// Note: Legal professionals may share some routes with counselors
// This file contains routes specific to LEGAL_ADVISOR role
export const legalProviderRoutes = [
  {
    path: '/legal/dashboard',
    component: LegalDashboardPage,
    layout: 'navigation',
    roles: ['LEGAL_ADVISOR'],
  },
];
