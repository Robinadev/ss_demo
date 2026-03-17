import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  Plus,
  User,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const mockCases = [
  {
    id: 'case-1',
    clientName: 'Sarah M.',
    caseType: 'Emergency Shelter',
    riskLevel: 'High',
    status: 'Active',
    assignedCounselor: 'Grace Thompson',
    priority: 'Urgent',
    lastActivity: '2024-01-20T14:30:00Z',
    progress: 65,
    nextSession: '2024-01-22T10:00:00Z',
  },
  {
    id: 'case-2',
    clientName: 'Anonymous-412',
    caseType: 'Domestic Violence',
    riskLevel: 'High',
    status: 'Active',
    assignedCounselor: 'Grace Thompson',
    priority: 'High',
    lastActivity: '2024-01-20T12:15:00Z',
    progress: 45,
    nextSession: '2024-01-21T14:00:00Z',
  },
  {
    id: 'case-3',
    clientName: 'Maria G.',
    caseType: 'Trauma Recovery',
    riskLevel: 'Medium',
    status: 'Active',
    assignedCounselor: 'Grace Thompson',
    priority: 'Medium',
    lastActivity: '2024-01-19T16:45:00Z',
    progress: 80,
    nextSession: '2024-01-23T11:00:00Z',
  },
  {
    id: 'case-4',
    clientName: 'Lisa R.',
    caseType: 'Family Counseling',
    riskLevel: 'Low',
    status: 'Closed',
    assignedCounselor: 'Grace Thompson',
    priority: 'Low',
    lastActivity: '2024-01-18T15:30:00Z',
    progress: 100,
    nextSession: null,
  },
  {
    id: 'case-5',
    clientName: 'James K.',
    caseType: 'Substance Abuse',
    riskLevel: 'High',
    status: 'Active',
    assignedCounselor: 'Grace Thompson',
    priority: 'High',
    lastActivity: '2024-01-20T09:20:00Z',
    progress: 30,
    nextSession: '2024-01-21T09:00:00Z',
  },
];

const caseStatuses = ['All', 'Active', 'Closed', 'Pending'];
const riskLevels = ['All', 'High', 'Medium', 'Low'];
const caseTypes = [
  'All',
  'Emergency Shelter',
  'Domestic Violence',
  'Trauma Recovery',
  'Family Counseling',
  'Substance Abuse',
];

export default function GeneralCaseManagerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('priority');

  const filteredCases = useMemo(() => {
    return mockCases
      .filter((caseItem) => {
        const matchesSearch =
          caseItem.clientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          caseItem.caseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.status.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === 'All' || caseItem.status === statusFilter;
        const matchesRisk =
          riskFilter === 'All' || caseItem.riskLevel === riskFilter;
        const matchesType =
          typeFilter === 'All' || caseItem.caseType === typeFilter;
        return matchesSearch && matchesStatus && matchesRisk && matchesType;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'priority':
            const priorityOrder = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          case 'lastActivity':
            return (
              new Date(b.lastActivity).getTime() -
              new Date(a.lastActivity).getTime()
            );
          case 'progress':
            return b.progress - a.progress;
          default:
            return 0;
        }
      });
  }, [searchQuery, statusFilter, riskFilter, typeFilter, sortBy]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Closed':
        return 'bg-slate-100 text-slate-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  // Calculate statistics
  const totalCases = mockCases.length;
  const activeCases = mockCases.filter((c) => c.status === 'Active').length;
  const highRiskCases = mockCases.filter((c) => c.riskLevel === 'High').length;
  const urgentCases = mockCases.filter((c) => c.priority === 'Urgent').length;
  const avgProgress = Math.round(
    mockCases.reduce((sum, c) => sum + c.progress, 0) / mockCases.length
  );

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Link to="/counselor">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  General Case Manager
                </h1>
                <p className="mt-1 text-slate-600">
                  Comprehensive case overview and management dashboard
                </p>
              </div>
            </div>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Cases
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {totalCases}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-indigo-500" />
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
                    {activeCases}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    High Risk
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {highRiskCases}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Urgent</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {urgentCases}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Avg Progress
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {avgProgress}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <Input
                  placeholder="Search by client name, case type, or status..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                >
                  {caseStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status} Status
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  aria-label="Filter by risk level"
                >
                  {riskLevels.map((risk) => (
                    <option key={risk} value={risk}>
                      {risk} Risk
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  aria-label="Filter by case type"
                >
                  {caseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort by"
                >
                  <option value="priority">Sort by Priority</option>
                  <option value="lastActivity">Sort by Last Activity</option>
                  <option value="progress">Sort by Progress</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <Card
              key={caseItem.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {caseItem.clientName}
                        </h3>
                        <Badge className={getStatusColor(caseItem.status)}>
                          {caseItem.status}
                        </Badge>
                        <Badge className={getRiskColor(caseItem.riskLevel)}>
                          {caseItem.riskLevel} Risk
                        </Badge>
                        <Badge className={getPriorityColor(caseItem.priority)}>
                          {caseItem.priority}
                        </Badge>
                      </div>

                      <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-4">
                        <div>
                          <strong>Type:</strong> {caseItem.caseType}
                        </div>
                        <div>
                          <strong>Counselor:</strong>{' '}
                          {caseItem.assignedCounselor}
                        </div>
                        <div>
                          <strong>Last Activity:</strong>{' '}
                          {new Date(caseItem.lastActivity).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Next Session:</strong>{' '}
                          {caseItem.nextSession
                            ? new Date(caseItem.nextSession).toLocaleString()
                            : 'Not scheduled'}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium">
                            {caseItem.progress}%
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-indigo-600"
                            style={{ width: `${caseItem.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-1 h-4 w-4" />
                          Schedule Session
                        </Button>
                        <Button variant="outline" size="sm">
                          Update Progress
                        </Button>
                        {caseItem.priority === 'Urgent' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-700"
                          >
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Urgent Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No cases found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Case Distribution Chart */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Case Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Cases</span>
                  <span className="font-medium">
                    {activeCases} (
                    {Math.round((activeCases / totalCases) * 100)}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(activeCases / totalCases) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Closed Cases</span>
                  <span className="font-medium">
                    {totalCases - activeCases} (
                    {Math.round(
                      ((totalCases - activeCases) / totalCases) * 100
                    )}
                    %)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-slate-500"
                    style={{
                      width: `${((totalCases - activeCases) / totalCases) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Risk Level Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-red-600">High Risk</span>
                  <span className="font-medium">
                    {highRiskCases} (
                    {Math.round((highRiskCases / totalCases) * 100)}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${(highRiskCases / totalCases) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-amber-600">Medium Risk</span>
                  <span className="font-medium">
                    {mockCases.filter((c) => c.riskLevel === 'Medium').length} (
                    {Math.round(
                      (mockCases.filter((c) => c.riskLevel === 'Medium')
                        .length /
                        totalCases) *
                        100
                    )}
                    %)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-amber-500"
                    style={{
                      width: `${(mockCases.filter((c) => c.riskLevel === 'Medium').length / totalCases) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-emerald-600">Low Risk</span>
                  <span className="font-medium">
                    {mockCases.filter((c) => c.riskLevel === 'Low').length} (
                    {Math.round(
                      (mockCases.filter((c) => c.riskLevel === 'Low').length /
                        totalCases) *
                        100
                    )}
                    %)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${(mockCases.filter((c) => c.riskLevel === 'Low').length / totalCases) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
