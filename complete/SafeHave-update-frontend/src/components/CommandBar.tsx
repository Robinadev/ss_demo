import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Users,
  BarChart3,
  Clock,
  Bell,
  Shield,
  CheckCircle2,
  Menu,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from './AppContext';
import { UserRole } from '@/types/user';

interface CommandBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activePage?: string;
}

export const CommandBar = ({
  isDark,
  onToggleTheme,
  activePage,
}: CommandBarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { user } = useApp();

  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Critical Case Alert',
      message: 'Case #2847 requires immediate attention',
      time: '2 min ago',
      caseId: '2847',
    },
    {
      id: 2,
      type: 'high',
      title: 'High Priority Case',
      message: 'Case #2851 - Legal consultation needed',
      time: '15 min ago',
      caseId: '2851',
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'New crisis protocol guidelines published',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'message',
      title: 'Team Message',
      message: 'Dr. Sarah Chen shared new resources',
      time: '2 hours ago',
    },
  ];

  const getActiveClass = (page: string) => {
    return activePage === page
      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
      : `${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'}`;
  };

  return (
    <>
      <header
        className={`relative z-50 flex h-[60px] items-center justify-between border-b px-6 backdrop-blur-xl ${
          isDark
            ? 'border-slate-700/50 bg-slate-900/95'
            : 'border-slate-200/50 bg-white/95'
        }`}
      >
        {/* Left: Menu + Primary Navigation */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`mr-2 ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'}`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {user?.role === UserRole.COUNSELOR ||
          user?.role === UserRole.MEDICAL_PROFESSIONAL ||
          user?.role === UserRole.LEGAL_ADVISOR ? (
            <>
              <Link to="/counselor-dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className={getActiveClass('dashboard')}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Operational Hub
                </Button>
              </Link>

              <Link to="/counselor/cases">
                <Button
                  variant="ghost"
                  size="sm"
                  className={getActiveClass('cases')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Case Queue
                </Button>
              </Link>

              <Link to="/counselor/audit">
                <Button
                  variant="ghost"
                  size="sm"
                  className={getActiveClass('audit')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Audit Logs
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to={
                  user?.role === 'general_case_manager'
                    ? '/general-case-manager'
                    : '/counselor-dashboard'
                }
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={getActiveClass('dashboard')}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              <Link to="/general-case-manager">
                <Button
                  variant="ghost"
                  size="sm"
                  className={getActiveClass('general-case-manager')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Case Management
                </Button>
              </Link>
            </>
          )}

          <Link to="/reports">
            <Button
              variant="ghost"
              size="sm"
              className={getActiveClass('reports')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
        </div>

        {/* Right: Schedule, Alerts, Profile, Safe Exit */}
        <div className="flex items-center gap-2">
          <Link to="/schedule">
            <Button
              variant="ghost"
              size="sm"
              className={getActiveClass('schedule')}
            >
              <Clock className="mr-2 h-4 w-4" />
              Schedule
            </Button>
          </Link>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className={`relative ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'}`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                4
              </span>
            </Button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div
                  className={`absolute top-full right-0 z-50 mt-2 w-80 rounded-lg border shadow-lg ${
                    isDark
                      ? 'border-slate-700 bg-slate-800'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="border-b border-slate-200 p-4 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
                      >
                        Notifications
                      </h3>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Mark all read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border-b border-slate-100 p-3 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50 ${
                          notification.type === 'critical'
                            ? 'border-l-4 border-l-red-500'
                            : notification.type === 'high'
                              ? 'border-l-4 border-l-orange-500'
                              : notification.type === 'system'
                                ? 'border-l-4 border-l-blue-500'
                                : 'border-l-4 border-l-green-500'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4
                              className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
                            >
                              {notification.title}
                            </h4>
                            <p
                              className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} mt-1`}
                            >
                              {notification.message}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <span
                                className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
                              >
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 p-3 dark:border-slate-700">
                    <Link to="/notifications">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => setShowNotifications(false)}
                      >
                        View All Notifications
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            className={
              isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-800'
            }
          >
            {isDark ? '☀️' : '🌙'}
          </Button>

          <div className="ml-2 flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-600 text-xs text-white">
                GM
              </AvatarFallback>
            </Avatar>
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          </div>

          <Button
            size="sm"
            className="ml-2 bg-red-600 font-semibold text-white hover:bg-red-700"
          >
            <Shield className="mr-2 h-4 w-4" />
            Safe Exit
          </Button>
        </div>
      </header>

      {/* Menu Slide-out */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowMenu(false)}
            />

            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-[60px] left-0 z-50 h-[calc(100vh-60px)] w-64 border-r shadow-2xl backdrop-blur-xl ${
                isDark
                  ? 'border-slate-700/50 bg-slate-900/95'
                  : 'border-slate-200/50 bg-white/95'
              }`}
            >
              <div className="p-4">
                <h3
                  className={`mb-4 text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
                >
                  Settings & Tools
                </h3>

                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm ${isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Button>

                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm ${isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <HelpCircle className="mr-3 h-4 w-4" />
                    Help Center
                  </Button>

                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm text-red-600 hover:bg-red-50 hover:text-red-700 ${isDark ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' : ''}`}
                    onClick={() => {
                      navigate('/');
                      setShowMenu(false);
                    }}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Log Out
                  </Button>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
