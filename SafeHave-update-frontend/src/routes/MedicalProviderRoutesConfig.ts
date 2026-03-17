import { lazy } from 'react';

const MedicalDashboardPage = lazy(() =>
  import('../pages/medical-provider/dashboard').then((module) => ({
    default: module.default,
  }))
);

const MedicalPatientListPage = lazy(() =>
  import('../pages/medical-provider/patients/patient-list').then((module) => ({
    default: module.default,
  }))
);

const MedicalForensicExamsPage = lazy(() =>
  import('../pages/medical-provider/examinations/forensic-exams').then((module) => ({
    default: module.default,
  }))
);

const MedicalAppointmentsPage = lazy(() =>
  import('../pages/medical-provider/appointments').then((module) => ({
    default: module.default,
  }))
);

// Note: Medical professionals may share some routes with counselors
// This file contains routes specific to MEDICAL_PROFESSIONAL role
export const medicalProviderRoutes = [
  {
    path: '/medical-provider/dashboard',
    component: MedicalDashboardPage,
    layout: 'navigation',
    roles: ['MEDICAL_PROFESSIONAL'],
  },
  {
    path: '/medical-provider/patients',
    component: MedicalPatientListPage,
    layout: 'navigation',
    roles: ['MEDICAL_PROFESSIONAL'],
  },
  {
    path: '/medical-provider/examinations',
    component: MedicalForensicExamsPage,
    layout: 'navigation',
    roles: ['MEDICAL_PROFESSIONAL'],
  },
  {
    path: '/medical-provider/appointments',
    component: MedicalAppointmentsPage,
    layout: 'navigation',
    roles: ['MEDICAL_PROFESSIONAL'],
  },
];
