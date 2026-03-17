import {
  Shield,
  Bell,
  AlertTriangle,
  Settings,
  MessageCircle,
  Languages,
  Sun,
  Moon,
} from 'lucide-react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useApp } from './AppContext';
import '../styles/safehaven-navigation.css';
import { useState } from 'react';

// --- Types ---
interface NavItem {
  label: string;
  path: string;
  page?: string;
}

// --- Navigation Configuration ---
const NAV_CONFIG = {
  public: {
    label: 'GUEST ACCESS',
    items: [
      { page: 'landing', label: 'home', path: '/' },
      { page: 'report-incident', label: 'report', path: '/report' },
      { page: 'missing-persons', label: 'missing', path: '/missing-persons' },
      { page: 'support-services', label: 'support', path: '/support-services' },
    ],
  },
  SURVIVOR: {
    label: 'SURVIVOR PORTAL',
    items: [
      { page: 'dashboard', label: 'overview', path: '/survivor/dashboard' },
      { page: 'my-cases', label: 'cases', path: '/survivor/my-cases' },
      { page: 'safety', label: 'safety', path: '/survivor/safety' },
      { page: 'resources', label: 'resources', path: '/resources' },
    ],
  },
  COUNSELOR: {
    label: 'COUNSELOR ACCESS',
    items: [
      {
        page: 'counselor-dashboard',
        label: 'dashboard',
        path: '/counselor-dashboard',
      },
      { page: 'counselor-lists', label: 'clients', path: '/counselor/clients' },
      { page: 'counselor-cases', label: 'cases', path: '/counselor/cases' },
      {
        page: 'counselor-appointments',
        label: 'appointments',
        path: '/counselor/appointments',
      },
      {
        page: 'counselor-resources',
        label: 'resources',
        path: '/counselor/resources',
      },
      {
        page: 'counselor-profile',
        label: 'profile',
        path: '/counselor/profile',
      },
    ],
  },
  MEDICAL_PROFESSIONAL: {
    label: 'MEDICAL ACCESS',
    items: [
      {
        page: 'medical-provider-dashboard',
        label: 'overview',
        path: '/medical/dashboard',
      },
      {
        page: 'medical-provider-patient-list',
        label: 'patients',
        path: '/medical-provider/patients/patient-list',
      },
      {
        page: 'medical-provider-appointments',
        label: 'appointments',
        path: '/medical-provider/appointments',
      },
      {
        page: 'medical-provider-examinations',
        label: 'examinations',
        path: '/medical-provider/examinations/forensic-exams',
      },
      {
        page: 'medical-provider-profile',
        label: 'profile',
        path: '/medical-provider/profile',
      },
    ],
  },
  LEGAL_ADVISOR: {
    label: 'LEGAL ACCESS',
    items: [
      { page: 'legal-dashboard', label: 'overview', path: '/legal/dashboard' },
      { page: 'legal-cases', label: 'cases', path: '/legal/cases' },
      { page: 'legal-documents', label: 'documents', path: '/legal/documents' },
      { page: 'legal-resources', label: 'resources', path: '/legal/resources' },
      { page: 'legal-profile', label: 'profile', path: '/legal/profile' },
    ],
  },
  MODERATOR: {
    label: 'MODERATOR ACCESS',
    items: [
      { page: 'dashboard', label: 'dashboard', path: '/moderator/dashboard' },
      {
        page: 'content-moderation',
        label: 'moderation',
        path: '/moderator/content-moderation',
      },
      {
        page: 'user-management',
        label: 'users',
        path: '/moderator/user-management',
      },
      { page: 'analytics', label: 'analytics', path: '/moderator/analytics' },
      { page: 'profile', label: 'profile', path: '/moderator/profile' },
    ],
  },
  ADMIN: {
    label: 'ADMIN ACCESS',
    items: [
      { page: 'dashboard', label: 'overview', path: '/admin' },
      { page: 'users', label: 'users', path: '/admin/user-management/users' },
      { page: 'cases', label: 'cases', path: '/admin/case-management' },
      { page: 'settings', label: 'settings', path: '/admin/system-settings' },
    ],
  },
};

// --- Navigation Header Component ---
const NavigationHeader: React.FC<{
  roleLabel: string;
  userName: string;
  navItems: NavItem[];
  isSurvivor?: boolean;
  user?: any;
}> = ({ roleLabel, userName, navItems, isSurvivor, user }) => {
  const { setUser, language, setLanguage } = useApp();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleSignOut = () => {
    setUser(null);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <header className="sh-header">
      <div className="flex items-center gap-12">
        {/* Left: Branding */}
        <div className="sh-branding">
          <Shield className="h-6 w-6 text-[var(--color-primary)]" />
          <span className="sh-logo-text">SAFEHAVEN</span>
        </div>

        {/* Center-Left: Navigation */}
        <nav className="sh-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `sh-nav-link ${isActive ? 'active border-primary border-b-2' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right: User Section & Actions */}
      <div className="sh-meta overflow-visible">
        <div className="flex items-center gap-3">
          {/* Action Clusters */}
          <div className="flex items-center gap-1">
            {isSurvivor && (
              <Link
                to="/survivor/messages"
                className="sh-notification-bell"
                title="Secure Messages"
              >
                <MessageCircle className="h-5 w-5 text-slate-400" />
                <span className="notification-dot border-white bg-indigo-500"></span>
              </Link>
            )}
            {user?.role === 'LEGAL_ADVISOR' && (
              <Link
                to="/legal/messaging"
                className="sh-notification-bell"
                title="Legal Messaging"
              >
                <MessageCircle className="h-5 w-5 text-slate-400" />
                <span className="notification-dot border-white bg-blue-500"></span>
              </Link>
            )}
            {user?.role === 'COUNSELOR' && (
              <Link
                to="/counselor/messaging"
                className="sh-notification-bell"
                title="Counselor Messaging"
              >
                <MessageCircle className="h-5 w-5 text-slate-400" />
                <span className="notification-dot border-white bg-purple-500"></span>
              </Link>
            )}
            {user?.role === 'MEDICAL_PROFESSIONAL' && (
              <Link
                to="/medical-provider/messaging"
                className="sh-notification-bell"
                title="Medical Messaging"
              >
                <MessageCircle className="h-5 w-5 text-slate-400" />
                <span className="notification-dot border-white bg-green-500"></span>
              </Link>
            )}
            <button className="sh-notification-bell" title="Notifications">
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="notification-dot"></span>
            </button>
          </div>

          {/* Global Toggles */}
          <div className="flex items-center gap-2 border-x border-slate-100 px-3 dark:border-slate-800">
            <button
              onClick={() => setLanguage(language === 'ENG' ? 'AMH' : 'ENG')}
              className="sh-toggle-btn"
              title="Switch Language"
            >
              <Languages className="h-4 w-4 text-slate-400" />
              <span className="text-[10px] font-black">{language}</span>
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center h-8 w-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/50 transition-all hover:bg-[var(--color-primary)] hover:text-[var(--color-foreground)]"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>
          </div>

          {/* Login or User Profile */}
          {user ? (
            <>
              {/* Integrated User Profile Cluster */}
              <div
                className={`relative flex items-center gap-2.5 overflow-visible pl-1 ${user?.role === 'LEGAL_ADVISOR' || user?.role === 'MEDICAL_PROFESSIONAL' ? 'cursor-pointer' : ''}`}
                onClick={
                  user?.role === 'LEGAL_ADVISOR' ||
                  user?.role === 'MEDICAL_PROFESSIONAL'
                    ? () => setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    : undefined
                }
              >
                <div className="sh-meta-group items-end">
                  <span className="sh-meta-label">
                    {isSurvivor ? 'SURVIVOR SESSION' : roleLabel}
                  </span>
                  <span className="sh-meta-value text-[10px]">
                    {isSurvivor ? `Peace, ${userName.split(' ')[0]}` : userName}
                  </span>
                </div>
                <div className="sh-avatar border-slate-200/50 bg-slate-50">
                  <span className="text-[10px] font-black text-slate-400">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Profile Dropdown for Legal Advisors and Medical Professionals */}
                {(user?.role === 'LEGAL_ADVISOR' ||
                  user?.role === 'MEDICAL_PROFESSIONAL') &&
                  isProfileDropdownOpen && (
                    <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                      <Link
                        to={
                          user?.role === 'LEGAL_ADVISOR'
                            ? '/legal/profile'
                            : '/medical-provider/profile'
                        }
                        className="block px-4 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        View Profile
                      </Link>
                    </div>
                  )}
              </div>

              {/* QUICK EXIT - High priority for Survivors */}
              {isSurvivor && (
                <button
                  onClick={handleSafeExit}
                  className="sh-quick-exit"
                  title="Immediate Safety Redirect"
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>QUICK EXIT</span>
                </button>
              )}

              <button
                onClick={handleSignOut}
                className="text-[9px] font-bold tracking-widest text-slate-300 uppercase transition-colors hover:text-red-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-semibold transition-colors hover:bg-[var(--color-primary)]/80"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

// --- Main Navigation Wrapper Component ---
export function Navigation({ children }: { children?: React.ReactNode }) {
  const { user } = useApp();
  const location = useLocation();

  // Determine nav config based on role
  const roleKey = user?.role || 'public';
  const config =
    NAV_CONFIG[roleKey as keyof typeof NAV_CONFIG] || NAV_CONFIG.public;
  const isSurvivor = user?.role === 'SURVIVOR';

  // Don't show header on landing page for public users (nav is in hero section)
  if (!user && location.pathname === '/') {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <NavigationHeader
        roleLabel={config.label}
        userName={
          user?.role === 'SURVIVOR'
            ? user.name || 'Anonymous'
            : user?.name || 'Guest User'
        }
        navItems={config.items}
        isSurvivor={isSurvivor}
        user={user}
      />
      <main className="relative z-0 w-full flex-1">{children}</main>
    </div>
  );
}
