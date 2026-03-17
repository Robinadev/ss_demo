import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  User,
  Filter,
  Download,
  Eye,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const mockAuditLogs = [
  {
    id: 'audit-1',
    caseId: 'case-1',
    caseTitle: 'Emergency Shelter Placement',
    clientName: 'Sarah M.',
    action: 'Case Assigned',
    performedBy: 'Grace Thompson',
    timestamp: '2024-01-20T10:30:00Z',
    details: 'Case assigned to Dr. Sarah Johnson via ML recommendation',
    compliance: 'Compliant',
    riskLevel: 'Low',
  },
  {
    id: 'audit-2',
    caseId: 'case-2',
    caseTitle: 'Domestic Violence Support',
    clientName: 'Anonymous-412',
    action: 'Session Notes Updated',
    performedBy: 'Grace Thompson',
    timestamp: '2024-01-20T14:15:00Z',
    details: 'Session notes documented with risk assessment and follow-up plan',
    compliance: 'Compliant',
    riskLevel: 'Medium',
  },
  {
    id: 'audit-3',
    caseId: 'case-3',
    caseTitle: 'Trauma Recovery',
    clientName: 'Maria G.',
    action: 'Manual Override Used',
    performedBy: 'Grace Thompson',
    timestamp: '2024-01-19T16:45:00Z',
    details: 'Manual assignment override - EMDR specialist requested',
    compliance: 'Requires Review',
    riskLevel: 'High',
  },
  {
    id: 'audit-4',
    caseId: 'case-1',
    caseTitle: 'Emergency Shelter Placement',
    clientName: 'Sarah M.',
    action: 'Client Contact',
    performedBy: 'Grace Thompson',
    timestamp: '2024-01-19T11:20:00Z',
    details: 'Emergency phone contact - client in crisis',
    compliance: 'Compliant',
    riskLevel: 'High',
  },
  {
    id: 'audit-5',
    caseId: 'case-4',
    caseTitle: 'Family Counseling',
    clientName: 'Lisa R.',
    action: 'Case Closed',
    performedBy: 'Grace Thompson',
    timestamp: '2024-01-18T15:30:00Z',
    details: 'Case successfully closed - goals achieved',
    compliance: 'Compliant',
    riskLevel: 'Low',
  },
];

const auditActions = [
  'All Actions',
  'Case Assigned',
  'Session Notes Updated',
  'Manual Override Used',
  'Client Contact',
  'Case Closed',
  'Referral Made',
];

const complianceLevels = [
  'All',
  'Compliant',
  'Requires Review',
  'Non-Compliant',
];

export default function CasesAuditPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [complianceFilter, setComplianceFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter((log) => {
      const matchesSearch =
        log.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.caseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.performedBy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAction =
        actionFilter === 'All Actions' || log.action === actionFilter;
      const matchesCompliance =
        complianceFilter === 'All' || log.compliance === complianceFilter;
      const matchesDate =
        dateFilter === 'All' || log.timestamp.startsWith(dateFilter);
      return matchesSearch && matchesAction && matchesCompliance && matchesDate;
    });
  }, [searchQuery, actionFilter, complianceFilter, dateFilter]);

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case 'Compliant':
        return 'bg-emerald-100 text-emerald-800';
      case 'Requires Review':
        return 'bg-amber-100 text-amber-800';
      case 'Non-Compliant':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

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

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Case Assigned':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'Manual Override Used':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'Case Closed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

  // Calculate statistics
  const totalActions = mockAuditLogs.length;
  const compliantActions = mockAuditLogs.filter(
    (log) => log.compliance === 'Compliant'
  ).length;
  const reviewRequired = mockAuditLogs.filter(
    (log) => log.compliance === 'Requires Review'
  ).length;
  const highRiskActions = mockAuditLogs.filter(
    (log) => log.riskLevel === 'High'
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Link to="/counselor/cases">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cases
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Case Audit Trail
                </h1>
                <p className="mt-1 text-slate-600">
                  Comprehensive audit log of all case-related activities
                </p>
              </div>
            </div>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Actions
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {totalActions}
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
                    Compliant
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {compliantActions}
                  </p>
                  <p className="text-xs text-emerald-600">
                    {((compliantActions / totalActions) * 100).toFixed(1)}%
                    compliance rate
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Needs Review
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {reviewRequired}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500" />
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
                    {highRiskActions}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <Input
                  placeholder="Search by client, case, action, or user..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  aria-label="Filter by action type"
                >
                  {auditActions.map((action) => (
                    <option key={action} value={action}>
                      {action}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={complianceFilter}
                  onChange={(e) => setComplianceFilter(e.target.value)}
                  aria-label="Filter by compliance"
                >
                  {complianceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  aria-label="Filter by date"
                >
                  <option value="All">All Dates</option>
                  <option value="2024-01-20">Today</option>
                  <option value="2024-01-19">Yesterday</option>
                  <option value="2024-01-18">This Week</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <Card key={log.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      {getActionIcon(log.action)}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {log.action}
                        </h3>
                        <Badge className={getComplianceColor(log.compliance)}>
                          {log.compliance}
                        </Badge>
                        <Badge className={getRiskColor(log.riskLevel)}>
                          {log.riskLevel} Risk
                        </Badge>
                      </div>

                      <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <strong>Client:</strong> {log.clientName}
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <strong>Case:</strong> {log.caseTitle}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <strong>Time:</strong>{' '}
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-slate-700">
                          <strong>Performed by:</strong> {log.performedBy}
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          <strong>Details:</strong> {log.details}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          View Full Details
                        </Button>
                        {log.compliance === 'Requires Review' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-700"
                          >
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Review Required
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

        {filteredLogs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No audit logs found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Compliance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Compliance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-emerald-600">
                  {((compliantActions / totalActions) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-slate-600">
                  Overall Compliance Rate
                </p>
                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${(compliantActions / totalActions) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-amber-600">
                  {reviewRequired}
                </div>
                <p className="text-sm text-slate-600">
                  Actions Requiring Review
                </p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-red-600">
                  {highRiskActions}
                </div>
                <p className="text-sm text-slate-600">High-Risk Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
