import { useState, useMemo } from 'react';
import {
  TrendingUp,
  Calendar,
  Brain,
  Activity,
  Clock,
  ShieldCheck,
  Scale,
  MessageSquare,
  Layers,
  Lock,
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Users,
  AlertTriangle,
  History,
  FileText,
  UserCheck,
  BarChart3,
  BookOpen,
  Target,
  Settings,
  Bell,
  Stethoscope,
  Gavel,
  Phone,
  Mail,
  ClipboardList,
  Award,
  ArrowRight,
  Grid3X3,
  Zap,
  CheckCircle,
  Star,
  PlayCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  CasePriority,
  CaseType,
  AssignmentStatus,
  CASE_PRIORITY_LABELS,
  PRIORITY_COLORS,
  ServiceProviderType,
} from '@/types/case';

const mockWorkQueue = [
  {
    id: 'case-1',
    survivor: 'Anonymous-928',
    title: 'Request for Legal Advocacy',
    time: '10m ago',
    type: CaseType.LEGAL_ASSISTANCE,
    priority: CasePriority.CRITICAL,
    status: AssignmentStatus.ACTIVE,
    riskScore: 92,
    mlClassification: 'High Confidence',
    auditCount: 3,
    lastAction: 'ML Scanned',
  },
  {
    id: 'case-2',
    survivor: 'Sarah M.',
    title: 'Ongoing Trauma Counseling',
    time: '45m ago',
    type: CaseType.COUNSELING,
    priority: CasePriority.HIGH,
    status: AssignmentStatus.ACTIVE,
    riskScore: 15,
    mlClassification: 'Verified User',
    auditCount: 12,
    lastAction: 'Session Scheduled',
  },
  {
    id: 'case-3',
    survivor: 'Anonymous-412',
    title: 'Emergency Shelter Placement',
    time: '2h ago',
    type: CaseType.EMERGENCY_SUPPORT,
    priority: CasePriority.CRITICAL,
    status: AssignmentStatus.ACTIVE,
    riskScore: 88,
    mlClassification: 'High Risk',
    auditCount: 5,
    lastAction: 'Police Notified',
  },
];

const mockMessages = [
  {
    id: 1,
    sender: 'Sarah M.',
    text: 'Thank you for the resources, I was able to...',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: 2,
    sender: 'Legal Team',
    text: 'Protection order has been filed for case #2847',
    time: '9:15 AM',
    unread: false,
  },
];

const mockAnalytics = {
  totalSurvivors: 124,
  monthlyTrend: '+12%',
  avgResolutionTime: '4.2 days',
  encryptionStatus: '100% Encrypted',
  privacyScore: 98,
};

const mockReferrals = [
  {
    name: 'City Shelter Pro',
    type: ServiceProviderType.SHELTER,
    status: 'Connected',
  },
  {
    name: 'Wubet Medical',
    type: ServiceProviderType.MEDICAL_PROFESSIONAL,
    status: 'Available',
  },
];

function CounselorDashboardPage() {
  const isDark = false;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQueue = useMemo(() => {
    return mockWorkQueue.filter(
      (c) =>
        c.survivor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-[var(--role-counselor-bg)]'}`}
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-4 h-96 w-96 rounded-full bg-gradient-to-br from-[var(--role-counselor-primary)]/20 to-[var(--role-counselor-accent)]/20 blur-3xl" />
        <div className="absolute bottom-0 -left-4 h-96 w-96 rounded-full bg-gradient-to-tr from-[var(--role-counselor-text)]/20 to-[var(--role-counselor-secondary)]/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8 p-8">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-2xl bg-gradient-to-r from-[var(--role-counselor-primary)] to-[var(--role-counselor-accent)] p-3 shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-[var(--role-counselor-text)] to-[var(--role-counselor-primary)] bg-clip-text text-4xl font-bold text-transparent">
                Welcome back, Grace
              </h1>
              <p className="font-medium text-[var(--role-counselor-text)]">
                Your counseling command center
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-4"
        >
          <Card className="border-0 bg-gradient-to-r from-[var(--role-counselor-primary)] to-[var(--role-counselor-primary)]/80 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">
                    Active Cases
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {mockWorkQueue.length}
                  </p>
                </div>
                <div className="rounded-xl bg-white/20 p-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-[var(--role-counselor-accent)] to-[var(--role-counselor-accent)]/80 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">
                    Sessions Today
                  </p>
                  <p className="text-3xl font-bold text-white">8</p>
                </div>
                <div className="rounded-xl bg-white/20 p-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-[var(--role-counselor-text)] to-[var(--role-counselor-text)]/80 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">
                    Pending Tasks
                  </p>
                  <p className="text-3xl font-bold text-white">12</p>
                </div>
                <div className="rounded-xl bg-white/20 p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-[var(--role-counselor-secondary)] to-[var(--role-counselor-secondary)]/80 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold text-white">94%</p>
                </div>
                <div className="rounded-xl bg-white/20 p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-[var(--role-counselor-text)]">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            <Link to="/general-case-manager">
              <Card className="group border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-fit rounded-2xl bg-gradient-to-br from-[var(--role-counselor-primary)] to-[var(--role-counselor-primary)]/80 p-4 transition-transform duration-300 group-hover:scale-110">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--role-counselor-text)]">
                    Case Manager
                  </h3>
                  <p className="mt-1 text-xs text-[var(--role-counselor-text)]/60">
                    View all cases
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/counselor/sessions/session-list">
              <Card className="group border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-fit rounded-2xl bg-gradient-to-br from-[var(--role-counselor-accent)] to-[var(--role-counselor-accent)]/80 p-4 transition-transform duration-300 group-hover:scale-110">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--role-counselor-text)]">
                    Sessions
                  </h3>
                  <p className="mt-1 text-xs text-[var(--role-counselor-text)]/60">
                    Schedule & manage
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/counselor/clients/assign-client">
              <Card className="group border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-fit rounded-2xl bg-gradient-to-br from-[var(--role-counselor-text)] to-[var(--role-counselor-text)]/80 p-4 transition-transform duration-300 group-hover:scale-110">
                    <UserCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--role-counselor-text)]">
                    Assignments
                  </h3>
                  <p className="mt-1 text-xs text-[var(--role-counselor-text)]/60">
                    Assign counselors
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/counselor/dashboard/alerts">
              <Card className="group border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-fit rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-4 transition-transform duration-300 group-hover:scale-110">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--role-counselor-text)]">Alerts</h3>
                  <p className="mt-1 text-xs text-[var(--role-counselor-text)]/60">Notifications</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/counselor/progress-tracking">
              <Card className="group border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-fit rounded-2xl bg-gradient-to-br from-[var(--role-counselor-secondary)] to-[var(--role-counselor-secondary)]/80 p-4 transition-transform duration-300 group-hover:scale-110">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--role-counselor-text)]">
                    Progress
                  </h3>
                  <p className="mt-1 text-xs text-[var(--role-counselor-text)]/60">Track outcomes</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/counselor/training">
              <Card className="group border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-fit rounded-2xl bg-gradient-to-br from-[var(--role-counselor-primary)]/70 to-[var(--role-counselor-accent)]/70 p-4 transition-transform duration-300 group-hover:scale-110">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-[var(--role-counselor-text)]">
                    Training
                  </h3>
                  <p className="mt-1 text-xs text-[var(--role-counselor-text)]/60">
                    Professional dev
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Cases */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2">
                      <Activity className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-[var(--role-counselor-text)]">
                        Recent Cases
                      </CardTitle>
                      <p className="text-sm text-[var(--role-counselor-text)]/60">
                        Priority cases requiring attention
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredQueue.slice(0, 3).map((item, idx) => {
                    const priority = PRIORITY_COLORS[item.priority];
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex cursor-pointer items-center justify-between rounded-xl bg-[var(--role-counselor-secondary)]/30 p-4 transition-colors hover:bg-[var(--role-counselor-secondary)]/50"
                      >
                        <Link
                          to="/general-case-manager"
                          className="flex flex-1 items-center gap-4"
                        >
                          <div className="rounded-lg bg-white p-2 shadow-sm">
                            <Users className="h-5 w-5 text-slate-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[var(--role-counselor-text)] group-hover:text-[var(--role-counselor-primary)]">
                              {item.survivor}
                            </h4>
                            <p className="text-sm text-[var(--role-counselor-text)]/70">
                              {item.title}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge
                                className={`${priority.bg} ${priority.text} px-2 py-1 text-xs`}
                              >
                                {CASE_PRIORITY_LABELS[item.priority]}
                              </Badge>
                              <span className="text-xs text-[var(--role-counselor-text)]/50">
                                {item.time}
                              </span>
                            </div>
                          </div>
                        </Link>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div
                              className={`text-lg font-bold ${item.riskScore > 80 ? 'text-red-500' : item.riskScore > 50 ? 'text-orange-500' : 'text-emerald-500'}`}
                            >
                              {item.riskScore}%
                            </div>
                            <div className="text-xs text-[var(--role-counselor-text)]/50">
                              Risk Score
                            </div>
                          </div>
                          <Link to="/general-case-manager">
                            <ArrowRight className="h-5 w-5 text-[var(--role-counselor-text)]/40 transition-colors group-hover:text-[var(--role-counselor-text)]" />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Today's Schedule */}
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="rounded-lg bg-[var(--role-counselor-accent)]/20 p-2">
                    <CheckCircle className="h-5 w-5 text-[var(--role-counselor-accent)]" />
                  </div>
                  <span className="text-[var(--role-counselor-text)]">Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-[var(--role-counselor-accent)]/20 p-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--role-counselor-accent)]"></div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--role-counselor-text)]">
                      Session with Sarah M.
                    </p>
                    <p className="text-sm text-[var(--role-counselor-text)]/70">
                      10:00 AM - 11:00 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[var(--role-counselor-primary)]/20 p-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--role-counselor-primary)]"></div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--role-counselor-text)]">
                      Case Review Meeting
                    </p>
                    <p className="text-sm text-[var(--role-counselor-text)]/70">2:00 PM - 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[var(--role-counselor-secondary)]/20 p-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--role-counselor-text)]/40"></div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--role-counselor-text)]">
                      Documentation Time
                    </p>
                    <p className="text-sm text-[var(--role-counselor-text)]/70">4:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="rounded-lg bg-[var(--role-counselor-secondary)]/20 p-2">
                    <Star className="h-5 w-5 text-[var(--role-counselor-secondary)]" />
                  </div>
                  <span className="text-[var(--role-counselor-text)]">This Week</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--role-counselor-text)]/70">
                    Sessions Completed
                  </span>
                  <span className="font-bold text-[var(--role-counselor-text)]">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--role-counselor-text)]/70">Cases Resolved</span>
                  <span className="font-bold text-[var(--role-counselor-text)]">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--role-counselor-text)]/70">
                    Client Satisfaction
                  </span>
                  <span className="font-bold text-[var(--role-counselor-accent)]">96%</span>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-[var(--role-counselor-secondary)]/30">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[var(--role-counselor-accent)] to-[var(--role-counselor-accent)]/80"
                    style={{ width: '96%' }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CounselorDashboardPage;
