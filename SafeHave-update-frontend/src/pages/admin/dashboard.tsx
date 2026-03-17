import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  FileText,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Briefcase,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminPage() {
  const navigate = useNavigate();
  // Mock analytics data
  const reportStats = [
    { month: 'Apr', reports: 45 },
    { month: 'May', reports: 52 },
    { month: 'Jun', reports: 61 },
    { month: 'Jul', reports: 58 },
    { month: 'Aug', reports: 73 },
    { month: 'Sep', reports: 68 },
    { month: 'Oct', reports: 82 },
  ];

  const userGrowth = [
    { month: 'Apr', users: 120 },
    { month: 'May', users: 145 },
    { month: 'Jun', users: 178 },
    { month: 'Jul', users: 210 },
    { month: 'Aug', users: 256 },
    { month: 'Sep', users: 298 },
    { month: 'Oct', users: 342 },
  ];

  return (
    <div className="admin-theme-bg min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-8 border-b border-[var(--role-admin-border)] pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold admin-theme-structure mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Manage cases, moderate content, and monitor platform analytics.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="admin-badge-warning px-3 py-1 rounded-full text-sm font-medium">
                System Active
              </div>
              <div className="admin-badge-healthy px-3 py-1 rounded-full text-sm font-medium">
                All Services Operational
              </div>
            </div>
          </div>
        </div>

      {/* Key Metrics */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold admin-theme-structure mb-6">System Overview</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-medium">Total Cases</p>
                  <h2 className="admin-theme-structure text-3xl font-bold">342</h2>
                  <p className="admin-success-icon text-sm font-medium">+12% this month</p>
                </div>
                <div className="admin-theme-structure bg-opacity-10 p-3 rounded-lg">
                  <FileText className="admin-theme-structure h-10 w-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-medium">Active Users</p>
                  <h2 className="admin-theme-structure text-3xl font-bold">1,247</h2>
                  <p className="admin-success-icon text-sm font-medium">+8% this month</p>
                </div>
                <div className="admin-theme-structure bg-opacity-10 p-3 rounded-lg">
                  <Users className="admin-theme-structure h-10 w-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-medium">Pending Reviews</p>
                  <h2 className="admin-badge-warning text-3xl font-bold">23</h2>
                  <p className="admin-alert-icon text-sm font-medium">
                    Requires attention
                  </p>
                </div>
                <div className="admin-alert-icon bg-opacity-10 p-3 rounded-lg">
                  <Clock className="admin-alert-icon h-10 w-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-medium">Resolved Cases</p>
                  <h2 className="admin-theme-structure text-3xl font-bold">289</h2>
                  <p className="admin-success-icon text-sm font-medium">
                    84% resolution rate
                  </p>
                </div>
                <div className="admin-success-icon bg-opacity-10 p-3 rounded-lg">
                  <CheckCircle className="admin-success-icon h-10 w-10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold admin-theme-structure mb-6">Analytics Overview</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="admin-theme-border border-2">
            <CardHeader className="admin-theme-border border-b">
              <CardTitle className="admin-theme-structure flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Monthly Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={reportStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--role-admin-border)" />
                  <XAxis dataKey="month" stroke="var(--role-admin-structure)" />
                  <YAxis stroke="var(--role-admin-structure)" />
                  <Tooltip />
                  <Bar dataKey="reports" fill="var(--role-admin-structure)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="admin-theme-border border-2">
            <CardHeader className="admin-theme-border border-b">
              <CardTitle className="admin-theme-structure flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--role-admin-border)" />
                  <XAxis dataKey="month" stroke="var(--role-admin-structure)" />
                  <YAxis stroke="var(--role-admin-structure)" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="var(--role-admin-structure)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--role-admin-healthy)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold admin-theme-structure mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="admin-theme-structure bg-opacity-10 p-2 rounded-lg">
                    <Users className="admin-theme-structure h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold admin-theme-structure">User Management</h3>
                    <p className="text-muted-foreground text-sm">
                      Manage user accounts, roles, permissions, and access control.
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate('user-management')} className="admin-button-primary">
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="admin-alert-icon bg-opacity-10 p-2 rounded-lg">
                    <AlertTriangle className="admin-alert-icon h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold admin-theme-structure">Incident Oversight</h3>
                    <p className="text-muted-foreground text-sm">
                      Monitor, track, and respond to reported incidents and emergencies.
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate('incident-oversight')}
                  className="admin-button-primary"
                >
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="admin-theme-structure bg-opacity-10 p-2 rounded-lg">
                    <FileText className="admin-theme-structure h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold admin-theme-structure">Case Management</h3>
                    <p className="text-muted-foreground text-sm">
                      Handle case assignments, tracking, and resolution workflows.
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate('case-management')} className="admin-button-primary">
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="admin-success-icon bg-opacity-10 p-2 rounded-lg">
                    <CheckCircle className="admin-success-icon h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold admin-theme-structure">Provider Verification</h3>
                    <p className="text-muted-foreground text-sm">
                      Verify and manage service providers and their credentials.
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate('provider-verification')}
                  className="admin-button-primary"
                >
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="admin-theme-structure bg-opacity-10 p-2 rounded-lg">
                    <TrendingUp className="admin-theme-structure h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold admin-theme-structure">Analytics</h3>
                    <p className="text-muted-foreground text-sm">
                      View detailed reports, statistics, and data insights.
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate('analytics')} className="admin-button-primary">
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="admin-alert-icon bg-opacity-10 p-2 rounded-lg">
                    <Clock className="admin-alert-icon h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold admin-theme-structure">Security</h3>
                    <p className="text-muted-foreground text-sm">
                      Monitor audit logs, manage access control, and oversee security.
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate('security')} className="admin-button-primary">
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="admin-theme-structure bg-opacity-10 p-2 rounded-lg">
                    <MessageCircle className="admin-theme-structure h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold admin-theme-structure">System Settings</h3>
                    <p className="text-muted-foreground text-sm">
                      Configure system preferences and global settings.
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate('system-settings')} className="admin-button-primary">
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-theme-border border-2 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="admin-theme-structure bg-opacity-10 p-2 rounded-lg">
                    <Briefcase className="admin-theme-structure h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold admin-theme-structure">Backup Recovery</h3>
                    <p className="text-muted-foreground text-sm">
                      Manage system backups and data recovery processes.
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate('backup-recovery')} className="admin-button-primary">
                  Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}
