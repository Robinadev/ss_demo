import { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Plus,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Users,
  MoreVertical,
  Eye,
  Edit,
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

const mockCases = [
  {
    id: 'case-1',
    title: 'Emergency Shelter Placement',
    clientName: 'Sarah M.',
    type: CaseType.EMERGENCY_SUPPORT,
    priority: CasePriority.CRITICAL,
    status: 'Active',
    createdDate: '2024-01-15',
    lastUpdated: '2 hours ago',
    assignedTo: 'Grace Thompson',
    riskScore: 88,
    description:
      'Client requires immediate emergency shelter placement due to domestic violence situation.',
  },
  {
    id: 'case-2',
    title: 'Legal Advocacy Support',
    clientName: 'Anonymous-412',
    type: CaseType.LEGAL_ASSISTANCE,
    priority: CasePriority.HIGH,
    status: 'In Progress',
    createdDate: '2024-01-12',
    lastUpdated: '1 day ago',
    assignedTo: 'Grace Thompson',
    riskScore: 75,
    description:
      'Client needs legal assistance for protection order and restraining order.',
  },
  {
    id: 'case-3',
    title: 'Ongoing Trauma Counseling',
    clientName: 'Maria G.',
    type: CaseType.COUNSELING,
    priority: CasePriority.MEDIUM,
    status: 'Active',
    createdDate: '2024-01-08',
    lastUpdated: '3 days ago',
    assignedTo: 'Grace Thompson',
    riskScore: 45,
    description: 'Weekly trauma counseling sessions and ongoing support.',
  },
  {
    id: 'case-4',
    title: 'Medical Care Coordination',
    clientName: 'Anonymous-928',
    type: CaseType.MEDICAL_SUPPORT,
    priority: CasePriority.HIGH,
    status: 'Resolved',
    createdDate: '2024-01-05',
    lastUpdated: '1 week ago',
    assignedTo: 'Grace Thompson',
    riskScore: 30,
    description: 'Coordinated medical care and follow-up appointments.',
  },
];

function CaseListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  const filteredCases = useMemo(() => {
    return mockCases.filter((caseItem) => {
      const matchesSearch =
        caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === 'All' || caseItem.status === filterStatus;
      const matchesPriority =
        filterPriority === 'All' || caseItem.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, filterStatus, filterPriority]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Active':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800';
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-emerald-600';
  };

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[var(--role-counselor-text)]">
              Case Management
            </h1>
            <p className="mt-1 text-[var(--role-counselor-text)]">Track and manage client cases</p>
          </div>
          <Button className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90">
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--role-counselor-text)]">
                    Total Cases
                  </p>
                  <p className="text-3xl font-bold text-[var(--role-counselor-text)]">
                    {mockCases.length}
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
                  <p className="text-sm font-medium text-[var(--role-counselor-text)]">
                    Active Cases
                  </p>
                  <p className="text-3xl font-bold text-[var(--role-counselor-text)]">
                    {mockCases.filter((c) => c.status === 'Active').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-[var(--role-counselor-primary)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--role-counselor-text)]">
                    High Priority
                  </p>
                  <p className="text-3xl font-bold text-[var(--role-counselor-text)]">
                    {
                      mockCases.filter(
                        (c) =>
                          c.priority === 'CRITICAL' || c.priority === 'HIGH'
                      ).length
                    }
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
                  <p className="text-sm font-medium text-slate-600">Resolved</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {mockCases.filter((c) => c.status === 'Resolved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-[var(--role-counselor-accent)]" />
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
                  placeholder="Search by case title or client name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  aria-label="Filter by case status"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  aria-label="Filter by case priority"
                >
                  <option value="All">All Priority</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case List */}
        <div className="grid gap-4">
          {filteredCases.map((caseItem) => {
            const priority = PRIORITY_COLORS[caseItem.priority];
            return (
              <Card
                key={caseItem.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        {getStatusIcon(caseItem.status)}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-800">
                            {caseItem.title}
                          </h3>
                          <Badge
                            className={`${priority.bg} ${priority.text} border-${priority.text}/20`}
                          >
                            {CASE_PRIORITY_LABELS[caseItem.priority]}
                          </Badge>
                          <Badge className={getStatusColor(caseItem.status)}>
                            {caseItem.status}
                          </Badge>
                        </div>

                        <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {caseItem.clientName}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Created:{' '}
                            {new Date(
                              caseItem.createdDate
                            ).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Updated: {caseItem.lastUpdated}
                          </div>
                          <div
                            className={`flex items-center gap-2 font-medium ${getRiskColor(caseItem.riskScore)}`}
                          >
                            Risk: {caseItem.riskScore}%
                          </div>
                        </div>

                        <p className="line-clamp-2 text-sm text-slate-600">
                          {caseItem.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCases.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No cases found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CaseListPage;
