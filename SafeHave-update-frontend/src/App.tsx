import React from "react"
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
  Navigate, 
} from "react-router-dom"; 

import { ScrollToTop } from "./components/ScrollToTop";
import { AppProvider, useApp } from "./components/AppContext";
import { Navigation } from "./components/Navigation";
// ... rest of the code remains the same ...
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";

// Lazy loaded page components
const HomePage = lazy(() => import("./pages/public/home/index").then(module => ({ default: module.HomePage })));
const AdminPage = lazy(() => import("./pages/admin/dashboard").then(({ AdminPage }) => ({ default: AdminPage })));
const AboutPage = lazy(() => import("./pages/public/general").then(module => ({ default: module.AboutPage })));
const SupportDirectoryPage = lazy(() => import("./pages/public/provider-directory").then(module => ({ default: module.SupportDirectoryPage })));
const MissingPersonsPage = lazy(() => import("./pages/public/missing-persons").then(module => ({ default: module.MissingPersonsPage })));
const MissingPersonsViewPage = lazy(() => import("./pages/public/missing-persons/view").then(module => ({ default: module.MissingPersonsViewPage })));
const SupportServicesPage = lazy(() => import("./pages/public/general/support-services").then(module => ({ default: module.SupportServicesPage })));
const RecoveryHub = lazy(() => import("./pages/public/general/recovery-hub").then(module => ({ default: module.RecoveryHub })));
const TransparencyPage = lazy(() => import("./pages/public/general/transparency").then(module => ({ default: module.TransparencyPage })));
const ResourcesPage = lazy(() => import("./pages/public/resources").then(module => ({ default: module.ResourcesPage })));
const ReportPage = lazy(() => import("./pages/public/anonymous-reporting").then(module => ({ default: module.ReportPage })));
const LoginPage = lazy(() => import("./auth/login").then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import("./auth/register").then(module => ({ default: module.RegisterPage })));
const ResetPasswordPage = lazy(() => import("./auth/reset-password").then(module => ({ default: module.ResetPasswordPage })));
const VerifyEmailPage = lazy(() => import("./auth/verify-email").then(module => ({ default: module.VerifyEmailPage })));
const VictimDashboardPage = lazy(() => import("./pages/survivor/dashboard/index").then(module => ({ default: module.VictimDashboardPage })));
const MyCases = lazy(() => import("./pages/survivor/my-cases/index").then(module => ({ default: module.MyCases })));
const CommunityForumPage = lazy(() => import("./pages/survivor/community-forum/index").then(module => ({ default: module.CommunityForumPage })));
const EmpowermentPage = lazy(() => import("./pages/survivor/empowerment/index").then(module => ({ default: module.EmpowermentPage })));
const SafetySettings = lazy(() => import("./pages/survivor/safety/index").then(module => ({ default: module.SafetySettings })));
const Messages = lazy(() => import("./pages/survivor/messages/index").then(module => ({ default: module.Messages })));
const SettingsPage = lazy(() => import("./pages/survivor/settings/index").then(module => ({ default: module.SettingsPage })));
const CaseDetailsPage = lazy(() => import("./pages/survivor/case-details/index").then(module => ({ default: module.CaseDetailsPage })));
const CounselorDashboardPage = lazy(() => import("./pages/counselor/dashboard/index").then(module => ({ default: module.default })));
const MedicalDashboardPage = lazy(() => import("./pages/medical-provider/dashboard/index").then(module => ({ default: module.default })));
const ModeratorDashboardPage = lazy(() => import("./pages/moderator/dashboard/index").then(module => ({ default: module.default })));
const LegalDashboard = lazy(() => import("./pages/legal/dashboard").then(module => ({ default: module.default })));
const LegalCases = lazy(() => import("./pages/legal/cases").then(module => ({ default: module.default })));
const LegalCaseList = lazy(() => import("./pages/legal/cases/case-list").then(module => ({ default: module.default })));
const LegalCaseFiles = lazy(() => import("./pages/legal/cases/case-files").then(module => ({ default: module.default })));
const LegalCasePreparation = lazy(() => import("./pages/legal/cases/case-preparation").then(module => ({ default: module.default })));
const LegalDocuments = lazy(() => import("./pages/legal/documents").then(module => ({ default: module.default })));
const LegalDocumentLibrary = lazy(() => import("./pages/legal/documents/document-library").then(module => ({ default: module.default })));
const LegalTemplates = lazy(() => import("./pages/legal/documents/templates").then(module => ({ default: module.default })));
const LegalGenerator = lazy(() => import("./pages/legal/documents/generator").then(module => ({ default: module.default })));
const LegalCourtCalendar = lazy(() => import("./pages/legal/court-calendar").then(module => ({ default: module.default })));
const LegalConsultations = lazy(() => import("./pages/legal/consultations").then(module => ({ default: module.default })));
const LegalEvidenceManagement = lazy(() => import("./pages/legal/evidence-management").then(module => ({ default: module.default })));
const LegalMessaging = lazy(() => import("./pages/legal/messaging").then(module => ({ default: module.default })));
const LegalInbox = lazy(() => import("./pages/legal/messaging/inbox").then(module => ({ default: module.default })));
const LegalMessageThread = lazy(() => import("./pages/legal/messaging/message-thread").then(module => ({ default: module.default })));
const LegalMessageComposer = lazy(() => import("./pages/legal/messaging/message-composer").then(module => ({ default: module.default })));
const LegalAttachments = lazy(() => import("./pages/legal/messaging/attachments").then(module => ({ default: module.default })));
const LegalResources = lazy(() => import("./pages/legal/resources").then(module => ({ default: module.default })));
const LegalOutcomes = lazy(() => import("./pages/legal/outcomes").then(module => ({ default: module.default })));
const LegalProfile = lazy(() => import("./pages/legal/profile").then(module => ({ default: module.default })));

// Medical Provider pages
const MedicalProviderDashboard = lazy(() => import("./pages/medical-provider/dashboard/index").then(module => ({ default: module.default })));
const MedicalProviderPatientList = lazy(() => import("./pages/medical-provider/patients/patient-list/index").then(module => ({ default: module.default })));
const MedicalProviderPatientRecords = lazy(() => import("./pages/medical-provider/patients/patient-records/index").then(module => ({ default: module.default })));
const MedicalProviderPatientHistory = lazy(() => import("./pages/medical-provider/patients/patient-history/index").then(module => ({ default: module.default })));
const MedicalProviderForensicExams = lazy(() => import("./pages/medical-provider/examinations/forensic-exams/index").then(module => ({ default: module.default })));
const MedicalProviderExamReports = lazy(() => import("./pages/medical-provider/examinations/exam-reports/index").then(module => ({ default: module.default })));
const MedicalProviderTreatmentPlans = lazy(() => import("./pages/medical-provider/treatment-plans/index").then(module => ({ default: module.default })));
const MedicalProviderReferrals = lazy(() => import("./pages/medical-provider/referrals/index").then(module => ({ default: module.default })));
const MedicalProviderAppointments = lazy(() => import("./pages/medical-provider/appointments/index").then(module => ({ default: module.default })));
const MedicalProviderTelemedicine = lazy(() => import("./pages/medical-provider/telemedicine/index").then(module => ({ default: module.default })));
const MedicalProviderDocumentation = lazy(() => import("./pages/medical-provider/documentation/index").then(module => ({ default: module.default })));
const MedicalProviderResources = lazy(() => import("./pages/medical-provider/resources/index").then(module => ({ default: module.default })));
const MedicalProviderMessaging = lazy(() => import("./pages/medical-provider/messaging/index").then(module => ({ default: module.default })));
const MedicalProviderProfile = lazy(() => import("./pages/medical-provider/profile/index").then(module => ({ default: module.default })));
const MedicalProviderAlerts = lazy(() => import("./pages/medical-provider/alerts/index").then(module => ({ default: module.default })));
const MedicalProviderAlertsHistory = lazy(() => import("./pages/medical-provider/alerts/history/index").then(module => ({ default: module.default })));

// Import route protection components
import { RoleBasedRoute } from "./routes/RoleBasedRoute";
import { AdminRoutes } from "./routes/AdminRoutes";
import { ModeratorRoutes } from "./routes/ModeratorRoutes";
import { counselorRoutes } from "./routes/CounselorRoutesConfig";

// Route ↔ Page Sync
const pageToRoute: Record<string, string> = {
  // Public
  landing: "/",
  home: "/",
  about: "/about",
  "public-support-directory": "/public-support-directory",
  "missing-persons-view": "/missing-persons/view",
  "missing-persons": "/missing-persons",
  "report-anonymously": "/report",
  report: "/report",
  login: "/auth/login",
  signup: "/auth/register",
  "forgot-password": "/auth/forgot-password",
  "reset-password": "/auth/reset-password",
  "verify-email": "/auth/verify-email",

  // Authenticated routes
  dashboard: "/survivor/dashboard",
  "counselor-dashboard": "/counselor-dashboard",
  cases: "/counselor/cases",
  audit: "/counselor/audit",
  "medical-counselor-dashboard": "/medical-counselor-dashboard",
  "report-incident": "/report-incident",
  "support-directory": "/verified-support-directory",
  "missing-persons-submit": "/missing-persons/submit",
  "community-forum": "/survivor/community-forum",
  empowerment: "/survivor/empowerment",
  "recovery-hub": "/recovery-hub",
  transparency: "/transparency",
  "safety-settings": "/survivor/safety",
  messages: "/survivor/messages",
  "my-profile": "/profile",

  // Admin
  "admin-dashboard": "/admin",
  "manage-cases": "/admin/cases",
  "user-management": "/admin/users",
  "missing-persons-admin": "/admin/missing-persons",
  "directory-admin": "/admin/directory",
  moderation: "/admin/moderation",
  analytics: "/admin/analytics",
  "job-portal-admin": "/admin/jobs",
  "system-settings": "/admin/settings",
  "moderator-dashboard": "/moderator/dashboard",

  // Legal Provider
  "legal-dashboard": "/legal/dashboard",
  "legal-cases": "/legal/cases",
  "legal-documents": "/legal/documents",
  "legal-messaging": "/legal/messaging",
  "legal-resources": "/legal/resources",
  "legal-outcomes": "/legal/outcomes",
  "legal-profile": "/legal/profile",

  // Medical Provider
  "medical-provider-dashboard": "/medical-provider/dashboard",
  "medical-provider-patient-list": "/medical-provider/patients/patient-list",
  "medical-provider-patient-records": "/medical-provider/patients/patient-records",
  "medical-provider-patient-history": "/medical-provider/patients/patient-history",
  "medical-provider-forensic-exams": "/medical-provider/examinations/forensic-exams",
  "medical-provider-exam-reports": "/medical-provider/examinations/exam-reports",
  "medical-provider-treatment-plans": "/medical-provider/treatment-plans",
  "medical-provider-referrals": "/medical-provider/referrals",
  "medical-provider-appointments": "/medical-provider/appointments",
  "medical-provider-telemedicine": "/medical-provider/telemedicine",
  "medical-provider-documentation": "/medical-provider/documentation",
  "medical-provider-resources": "/medical-provider/resources",
  "medical-provider-messaging": "/medical-provider/messaging",
  "medical-provider-profile": "/medical-provider/profile",

  // Additional routes
  "support-services": "/support-services",
};

//counselor


const routeToPage: Record<string, string> = {
  "/": "landing",
  "/landing": "landing",
  "/about": "about",
  "/public-support-directory": "public-support-directory",
  "/verified-support-directory": "verified-support-directory",
  "/missing-persons": "missing-persons",
  "/missing-persons/view": "missing-persons-view",
  "/report": "report-anonymously",
  "/report-incident": "report-incident",
  "/auth/login": "login",
  "/auth/register": "signup",
  "/auth/forgot-password": "forgot-password",
  "/auth/reset-password": "reset-password",
  "/auth/verify-email": "verify-email",
  "/survivor/dashboard": "dashboard",
  "/counselor-dashboard": "counselor-dashboard",
  "/medical-counselor-dashboard": "medical-counselor-dashboard",
  "/legal-counselor-dashboard": "legal-counselor-dashboard",
  "/survivor/my-cases": "my-cases",
  "/survivor/evidence-vault": "evidence-vault",
  "/missing-persons/submit": "missing-persons-submit",
  "/survivor/community-forum": "community-forum",
  "/survivor/my-story": "my-story",
  "/survivor/jobs-training": "job-portal",
  "/survivor/empowerment": "empowerment",
  "/survivor/safety": "safety-settings",
  "/survivor/messages": "messages",
  "/profile": "my-profile",
  "/admin": "admin-dashboard",
  "/admin/cases": "manage-cases",
  "/admin/users": "user-management",
  "/admin/missing-persons": "missing-persons-admin",
  "/admin/directory": "directory-admin",
  "/admin/moderation": "moderation",
  "/admin/analytics": "analytics",
  "/admin/jobs": "job-portal-admin",
  "/admin/settings": "system-settings",
  "/moderator/dashboard": "moderator-dashboard",
  "/support-services": "support-services",
  "/medical-provider/dashboard": "medical-provider-dashboard",
  "/medical-provider/patients/patient-list": "medical-provider-patient-list",
  "/medical-provider/patients/patient-records": "medical-provider-patient-records",
  "/medical-provider/patients/patient-history": "medical-provider-patient-history",
  "/medical-provider/examinations/forensic-exams": "medical-provider-forensic-exams",
  "/medical-provider/examinations/exam-reports": "medical-provider-exam-reports",
  "/medical-provider/treatment-plans": "medical-provider-treatment-plans",
  "/medical-provider/referrals": "medical-provider-referrals",
  "/medical-provider/appointments": "medical-provider-appointments",
  "/medical-provider/telemedicine": "medical-provider-telemedicine",
  "/medical-provider/documentation": "medical-provider-documentation",
  "/medical-provider/resources": "medical-provider-resources",
  "/medical-provider/messaging": "medical-provider-messaging",
  "/medical-provider/profile": "medical-provider-profile",
};

function RouterSync() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage, setCurrentPage } = useApp();
  const [isNavigating, setIsNavigating] = useState(false);

  // sync URL to currentPage
  useEffect(() => {
    const page = routeToPage[location.pathname] || "landing";
    if (currentPage !== page && !isNavigating) {
      setCurrentPage(page);
    }
  }, [
    location.pathname,
    isNavigating,
    currentPage,
    setCurrentPage,
  ]);

  // sync currentPage to URL
  useEffect(() => {
    const targetRoute = pageToRoute[currentPage];
    const currentRoute = location.pathname;
    if (
      targetRoute &&
      targetRoute !== currentRoute &&
      !isNavigating
    ) {
      setIsNavigating(true);
      navigate(targetRoute, { replace: true });
      const timer = setTimeout(
        () => setIsNavigating(false),
        100,
      );
      return () => clearTimeout(timer);
    }
  }, [currentPage, isNavigating, location.pathname, navigate]);

  return null;
}

function PublicLayout() {
  const { user } = useApp();

  if (user) {
    return null; // Don't render public layout if user is authenticated
  }

  return (
    <Navigation>
      <Outlet />
      <Footer />
    </Navigation>
  );
}

function AppContent() {
  const { user } = useApp();
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.4
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RouterSync />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          <Suspense fallback={<LoadingScreen />}>
            <Routes location={location}>
              {/* Public routes with navigation and footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/public-support-directory" element={<SupportDirectoryPage />} />
                <Route path="/missing-persons" element={<MissingPersonsPage />} />
                <Route path="/missing-persons/view" element={<MissingPersonsViewPage />} />
                <Route path="/support" element={<SupportServicesPage />} />
                <Route path="/support-services" element={<SupportServicesPage />} />
                <Route path="/recovery-hub" element={<RecoveryHub />} />
                <Route path="/transparency" element={<TransparencyPage />} />
              </Route>

              {/* Report and resources pages with navigation only */}
              <Route path="/report" element={<Navigation><ReportPage /></Navigation>} />
              <Route path="/resources" element={<Navigation><ResourcesPage /></Navigation>} />

              {/* Auth routes - standalone */}
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
              <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />

              {/* Protected routes for authenticated users */}
              <Route path="/survivor/dashboard" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><VictimDashboardPage /></Navigation></RoleBasedRoute>} />
              <Route path="/survivor/my-cases" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><MyCases /></Navigation></RoleBasedRoute>} />
              <Route path="/survivor/community-forum" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><CommunityForumPage /></Navigation></RoleBasedRoute>} />
              <Route path="/survivor/empowerment" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><EmpowermentPage /></Navigation></RoleBasedRoute>} />
              <Route path="/survivor/safety" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><SafetySettings /></Navigation></RoleBasedRoute>} />
              <Route path="/survivor/messages" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><Messages /></Navigation></RoleBasedRoute>} />
              <Route path="/survivor/settings" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><SettingsPage /></Navigation></RoleBasedRoute>} />
              <Route path="/survivor/case/:id" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><CaseDetailsPage /></Navigation></RoleBasedRoute>} />
              <Route path="/report-incident" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><ReportPage /></Navigation></RoleBasedRoute>} />
              <Route path="/missing-persons/submit" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><MissingPersonsPage /></Navigation></RoleBasedRoute>} />
              <Route path="/verified-support-directory" element={<RoleBasedRoute roles={["SURVIVOR"]}><Navigation><ResourcesPage /></Navigation></RoleBasedRoute>} />
              <Route path="/profile" element={<RoleBasedRoute roles={["SURVIVOR"]}><div className="p-6">Profile Page - To be implemented</div></RoleBasedRoute>} />

              {/* Counselor routes */}
              {counselorRoutes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<RoleBasedRoute roles={route.roles}><Navigation>{React.createElement(route.component)}</Navigation></RoleBasedRoute>}
                />
              ))}

              {/* Medical provider routes */}
              <Route path="/medical/dashboard" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalDashboardPage /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/dashboard" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderDashboard /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/patients" element={<Navigate to="/medical-provider/patients/patient-list" />} />
              <Route path="/medical-provider/patients/patient-list" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderPatientList /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/patients/patient-records" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderPatientRecords /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/patients/patient-history" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderPatientHistory /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/examinations/forensic-exams" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderForensicExams /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/examinations/exam-reports" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderExamReports /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/treatment-plans" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderTreatmentPlans /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/referrals" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderReferrals /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/appointments" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderAppointments /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/telemedicine" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderTelemedicine /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/documentation" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderDocumentation /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/resources" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderResources /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/messaging" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderMessaging /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/profile" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderProfile /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/alerts" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderAlerts /></Navigation></RoleBasedRoute>} />
              <Route path="/medical-provider/alerts/history" element={<RoleBasedRoute roles={["MEDICAL_PROFESSIONAL"]}><Navigation><MedicalProviderAlertsHistory /></Navigation></RoleBasedRoute>} />

              {/* Legal provider routes */}
              <Route path="/legal/dashboard" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalDashboard /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/cases" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalCases /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/cases/case-list" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalCaseList /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/cases/case-files" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalCaseFiles /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/cases/case-files" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalCaseFiles /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/cases/case-preparation" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalCasePreparation /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/documents" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalDocuments /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/documents/document-library" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalDocumentLibrary /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/documents/templates" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalTemplates /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/documents/generator" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalGenerator /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/court-calendar" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalCourtCalendar /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/consultations" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalConsultations /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/evidence-management" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalEvidenceManagement /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/messaging" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalMessaging /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/messaging/inbox" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalInbox /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/messaging/message-thread" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalMessageThread /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/messaging/message-composer" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalMessageComposer /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/messaging/attachments" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalAttachments /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/resources" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalResources /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/outcomes" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalOutcomes /></Navigation></RoleBasedRoute>} />
              <Route path="/legal/profile" element={<RoleBasedRoute roles={["LEGAL_ADVISOR"]}><Navigation><LegalProfile /></Navigation></RoleBasedRoute>} />

              {/* Moderator routes */}
              <Route path="/moderator/dashboard" element={<RoleBasedRoute roles={["MODERATOR"]}><Navigation><ModeratorDashboardPage /></Navigation></RoleBasedRoute>} />
              <Route path="/moderator/*" element={<ModeratorRoutes />} />

              {/* Admin routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* Catch-all route */}
              <Route
                path="*"
                element={
                  user ? (
                    user.role === "SURVIVOR" ? (
                      <Navigation><VictimDashboardPage /></Navigation>
                    ) : user.role === "COUNSELOR" ? (
                      <Navigation><CounselorDashboardPage /></Navigation>
                    ) : user.role === "MEDICAL_PROFESSIONAL" ? (
                      <Navigation><MedicalDashboardPage /></Navigation>
                    ) : user.role === "LEGAL_ADVISOR" ? (
                      <Navigation><LegalDashboard /></Navigation>
                    ) : user.role === "ADMIN" ? (
                      <Navigation><AdminPage /></Navigation>
                    ) : user.role === "MODERATOR" ? (
                      <Navigation><ModeratorDashboardPage /></Navigation>
                    ) : (
                      <HomePage />
                    )
                  ) : (
                    <HomePage />
                  )
                }
              />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Suppress browser extension errors
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('Could not establish connection') ||
        args[0]?.includes?.('runtime.lastError') ||
        args[0]?.includes?.('message channel closed')) {
        return;
      }
      originalError.apply(console, args);
    };

    // Suppress unhandled promise rejections from extensions
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes?.('message channel closed') ||
        event.reason?.message?.includes?.('Could not establish connection')) {
        event.preventDefault();
      }
    };
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      console.error = originalError;
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" themes={["light", "dark", "high-contrast"]}>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}