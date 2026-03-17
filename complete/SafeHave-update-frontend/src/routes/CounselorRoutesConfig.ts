import { lazy } from 'react';

const CounselorDashboardPage = lazy(() =>
  import('../pages/counselor/dashboard/index').then((module) => ({
    default: module.default,
  }))
);
const CounselorCasesPage = lazy(() => import('../pages/counselor/cases'));
const CounselorAuditPage = lazy(() => import('../pages/counselor/cases/audit'));
const GeneralCaseManager = lazy(
  () => import('../pages/counselor/cases/general-case-manager')
);
const CounselorLists = lazy(() =>
  import('../pages/counselor/clients/client-list').then((module) => ({
    default: module.default,
  }))
);
const ReportsPage = lazy(
  () => import('../pages/counselor/dashboard/workload-overview')
);
const SchedulePage = lazy(
  () => import('../pages/counselor/sessions/schedule-session')
);
const MedicalDashboardPage = lazy(() =>
  import('../pages/counselor/medical/dashboard').then((module) => ({
    default: module.MedicalDashboardPage,
  }))
);
const LegalDashboardPage = lazy(() =>
  import('../pages/counselor/legal/dashboard').then((module) => ({
    default: module.default,
  }))
);

// Dashboard sub-pages
const ReferralsPage = lazy(
  () => import('../pages/counselor/dashboard/referrals')
);
const AlertsPage = lazy(() => import('../pages/counselor/dashboard/alerts'));

// Client pages
const ClientDetailsPage = lazy(
  () => import('../pages/counselor/clients/client-details')
);
const AssignClientPage = lazy(
  () => import('../pages/counselor/clients/assign-client')
);

// Case pages
const CaseListPage = lazy(() => import('../pages/counselor/cases/case-list'));
const CaseDetailsPage = lazy(
  () => import('../pages/counselor/cases/case-details')
);
const ProfessionListPage = lazy(
  () => import('../pages/counselor/cases/case-routing/profession-list')
);
const MLRecommendationPage = lazy(
  () => import('../pages/counselor/cases/case-routing/ml-recommendation')
);
const ManualOverridePage = lazy(
  () => import('../pages/counselor/cases/case-routing/manual-override')
);

// Session pages
const SessionListPage = lazy(
  () => import('../pages/counselor/sessions/session-list')
);
const SessionNotesPage = lazy(
  () => import('../pages/counselor/sessions/session-notes')
);

// Other pages
const AppointmentsPage = lazy(() => import('../pages/counselor/appointments'));
const EditAppointmentPage = lazy(
  () => import('../pages/counselor/appointments/edit')
);
const MessagingPage = lazy(() => import('../pages/counselor/messaging'));
const ResourcesPage = lazy(() => import('../pages/counselor/resources'));
const ProgressTrackingPage = lazy(
  () => import('../pages/counselor/progress-tracking')
);
const TrainingPage = lazy(() => import('../pages/counselor/training'));
const ProfilePage = lazy(() => import('../pages/counselor/profile'));

export const counselorRoutes = [
  {
    path: '/counselor-dashboard',
    component: CounselorDashboardPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  // Dashboard sub-pages
  {
    path: '/counselor/dashboard/referrals',
    component: ReferralsPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/dashboard/alerts',
    component: AlertsPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  // Client pages
  {
    path: '/counselor/clients/client-details',
    component: ClientDetailsPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/clients/assign-client',
    component: AssignClientPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  // Case pages
  {
    path: '/counselor/cases',
    component: CounselorCasesPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/cases/case-list',
    component: CaseListPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/cases/case-details',
    component: CaseDetailsPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/cases/case-routing/profession-list',
    component: ProfessionListPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/cases/case-routing/ml-recommendation',
    component: MLRecommendationPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/cases/case-routing/manual-override',
    component: ManualOverridePage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/cases/audit',
    component: CounselorAuditPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/general-case-manager',
    component: GeneralCaseManager,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  // Session pages
  {
    path: '/counselor/sessions/session-list',
    component: SessionListPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/sessions/session-notes',
    component: SessionNotesPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/schedule',
    component: SchedulePage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  // Other pages
  {
    path: '/counselor/appointments',
    component: AppointmentsPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/appointments/edit/:id',
    component: EditAppointmentPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/messaging',
    component: MessagingPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/resources',
    component: ResourcesPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/progress-tracking',
    component: ProgressTrackingPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/training',
    component: TrainingPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/counselor/profile',
    component: ProfilePage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  // Existing routes
  {
    path: '/counselor/clients',
    component: CounselorLists,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/reports',
    component: ReportsPage,
    layout: 'navigation',
    roles: ['COUNSELOR'],
  },
  {
    path: '/medical-counselor-dashboard',
    component: MedicalDashboardPage,
    layout: 'navigation',
    roles: ['COUNSELOR', 'MEDICAL_PROFESSIONAL'],
  },
  {
    path: '/counselor/medical/dashboard',
    component: MedicalDashboardPage,
    layout: 'navigation',
    roles: ['COUNSELOR', 'MEDICAL_PROFESSIONAL'],
  },
  {
    path: '/legal-counselor-dashboard',
    component: LegalDashboardPage,
    layout: 'navigation',
    roles: ['COUNSELOR', 'LEGAL_ADVISOR'],
  },
  {
    path: '/counselor/legal/dashboard',
    component: LegalDashboardPage,
    layout: 'navigation',
    roles: ['COUNSELOR', 'LEGAL_ADVISOR'],
  },
];
