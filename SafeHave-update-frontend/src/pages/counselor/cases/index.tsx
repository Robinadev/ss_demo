import { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Activity,
  Eye,
  Edit,
  BarChart3,
  Target,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CasePriority,
  CaseType,
  CASE_PRIORITY_LABELS,
  PRIORITY_COLORS,
} from '@/types/case';
import { Link } from 'react-router-dom';

const mockCaseStats = {
  total: 247,
  active: 89,
  resolved: 158,
  critical: 12,
  thisMonth: 34,
  avgResolution: '4.2 days',
};

const mockRecentCases = [
  {
    id: 'case-1',
    title: 'Emergency Shelter Placement',
    clientName: 'Sarah M.',
    type: CaseType.EMERGENCY_SUPPORT,
    priority: CasePriority.CRITICAL,
    status: 'Active',
    createdDate: '2024-01-20',
    lastUpdated: '2 hours ago',
    riskScore: 88,
  },
  {
    id: 'case-2',
    title: 'Legal Advocacy Support',
    clientName: 'Anonymous-412',
    type: CaseType.LEGAL_ASSISTANCE,
    priority: CasePriority.HIGH,
    status: 'In Progress',
    createdDate: '2024-01-19',
    lastUpdated: '1 day ago',
    riskScore: 75,
  },
  {
    id: 'case-3',
    title: 'Ongoing Trauma Counseling',
    clientName: 'Maria G.',
    type: CaseType.COUNSELING,
    priority: CasePriority.MEDIUM,
    status: 'Active',
    createdDate: '2024-01-18',
    lastUpdated: '3 days ago',
    riskScore: 45,
  },
];

const mockCaseTypes = [
  { type: CaseType.COUNSELING, count: 45, percentage: 18 },
  { type: CaseType.EMERGENCY_SUPPORT, count: 38, percentage: 15 },
  { type: CaseType.LEGAL_ASSISTANCE, count: 32, percentage: 13 },
  { type: CaseType.MEDICAL_SUPPORT, count: 28, percentage: 11 },
  { type: CaseType.PREVENTION_EDUCATION, count: 22, percentage: 9 },
];

export default function CounselorCasesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = useMemo(() => {
    return mockRecentCases.filter(
      (caseItem) =>
        caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800';
      case 'Active':
        return 'bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]';
      default:
        return 'bg-[var(--role-counselor-secondary)]/20 text-[var(--role-counselor-text)]';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Case Management
            </h1>
            <p className="mt-1 text-slate-600">
              Comprehensive case tracking and resolution
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
            <Button className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90">
              <Plus className="h-4 w-4" />
              New Case
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Cases
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {mockCaseStats.total}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[var(--role-counselor-text)]">
                    <TrendingUp className="h-3 w-3" />+{mockCaseStats.thisMonth}{' '}
                    this month
                  </p>
                </div>
                <Users className="h-8 w-8 text-[var(--role-counselor-primary)]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Active Cases
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {mockCaseStats.active}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {mockCaseStats.critical} critical
                  </p>
                </div>
                <Clock className="h-8 w-8 text-[var(--role-counselor-text)]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Resolution Rate
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {mockCaseStats.avgResolution}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Average resolution time
                  </p>
                </div>
                <Target className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold text-slate-800">94%</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Client satisfaction
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Cases */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recent Cases
                  </CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                      <Input
                        placeholder="Search cases..."
                        className="w-64 pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Link to="/counselor/cases/case-list">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCases.map((caseItem) => {
                    const priority = PRIORITY_COLORS[caseItem.priority];
                    return (
                      <div
                        key={caseItem.id}
                        className="flex items-center justify-between rounded-lg border border-slate-100 p-4 transition-colors hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                            <FileText className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">
                              {caseItem.title}
                            </h4>
                            <p className="text-sm text-slate-600">
                              {caseItem.clientName}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge
                                className={`${priority.bg} ${priority.text} border-${priority.text}/20 text-xs`}
                              >
                                {CASE_PRIORITY_LABELS[caseItem.priority]}
                              </Badge>
                              <Badge
                                className={
                                  getStatusColor(caseItem.status) + ' text-xs'
                                }
                              >
                                {caseItem.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right text-sm text-slate-500">
                            <p>Risk: {caseItem.riskScore}%</p>
                            <p>{caseItem.lastUpdated}</p>
                          </div>
                          <Link to={`/counselor/cases/case-details`}>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Types Breakdown */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Case Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCaseTypes.map((type) => (
                    <div
                      key={type.type}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {type.type.replace('_', ' ')}
                        </p>
                        <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-[var(--role-counselor-primary)]"
                            style={{ width: `${type.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm font-semibold text-slate-800">
                          {type.count}
                        </p>
                        <p className="text-xs text-slate-500">
                          {type.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/counselor/cases/case-list">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Browse All Cases
                  </Button>
                </Link>
                <Link to="/counselor/cases/case-routing/profession-list">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    ML Recommendations
                  </Button>
                </Link>
                <Link to="/counselor/cases/audit">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="mr-2 h-4 w-4" />
                    Case Audit Log
                  </Button>
                </Link>
                <Link to="/general-case-manager">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Case Manager
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
