import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Building,
  Calendar,
  FileText,
  ExternalLink,
  Filter,
  Plus,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';

const mockReferrals = [
  {
    id: 'ref-1',
    clientName: 'Sarah M.',
    caseType: 'Emergency Shelter',
    riskLevel: 'High',
    status: 'Pending',
    referredTo: 'Downtown Shelter Services',
    referredBy: 'Grace Thompson',
    referralDate: '2024-01-20T10:30:00Z',
    urgency: 'Urgent',
    reason: 'Immediate shelter needed due to domestic violence situation',
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'shelter@downtown.org',
    },
    notes: 'Client has children - family shelter preferred',
  },
  {
    id: 'ref-2',
    clientName: 'Maria G.',
    caseType: 'Trauma Recovery',
    riskLevel: 'Medium',
    status: 'Accepted',
    referredTo: 'Trauma Recovery Center',
    referredBy: 'Grace Thompson',
    referralDate: '2024-01-19T14:15:00Z',
    urgency: 'High',
    reason: 'EMDR therapy needed for PTSD treatment',
    contactInfo: {
      phone: '+1 (555) 987-6543',
      email: 'intake@traumacenter.org',
    },
    notes: 'Previous trauma counseling experience',
  },
  {
    id: 'ref-3',
    clientName: 'James K.',
    caseType: 'Substance Abuse',
    riskLevel: 'High',
    status: 'Completed',
    referredTo: 'Rehabilitation Center',
    referredBy: 'Grace Thompson',
    referralDate: '2024-01-18T09:20:00Z',
    urgency: 'High',
    reason: 'Inpatient rehabilitation program required',
    contactInfo: {
      phone: '+1 (555) 555-0123',
      email: 'admissions@rehabcenter.org',
    },
    notes: 'Client motivated for change',
  },
  {
    id: 'ref-4',
    clientName: 'Anonymous-412',
    caseType: 'Domestic Violence Support',
    riskLevel: 'High',
    status: 'Rejected',
    referredTo: 'Crisis Intervention Center',
    referredBy: 'Grace Thompson',
    referralDate: '2024-01-17T16:45:00Z',
    urgency: 'Urgent',
    reason: 'Emergency safety planning and legal advocacy',
    contactInfo: {
      phone: '+1 (555) 111-2222',
      email: 'crisis@intervention.org',
    },
    notes: 'Anonymous client - handle with care',
  },
];

const referralStatuses = [
  'All',
  'Pending',
  'Accepted',
  'Completed',
  'Rejected',
];
const urgencyLevels = ['All', 'Urgent', 'High', 'Medium', 'Low'];

const referralServices = [
  'Emergency Shelter Services',
  'Trauma Recovery Center',
  'Rehabilitation Center',
  'Crisis Intervention Center',
  'Legal Aid Society',
  'Family Counseling Center',
  'Mental Health Clinic',
  'Substance Abuse Treatment',
];

function ReferralsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showNewReferral, setShowNewReferral] = useState(false);

  const filteredReferrals = useMemo(() => {
    return mockReferrals.filter((referral) => {
      const matchesSearch =
        referral.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.referredTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.caseType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || referral.status === statusFilter;
      const matchesUrgency =
        urgencyFilter === 'All' || referral.urgency === urgencyFilter;
      return matchesSearch && matchesStatus && matchesUrgency;
    });
  }, [searchQuery, statusFilter, urgencyFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Accepted':
        return 'bg-emerald-100 text-emerald-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const handleSendReferral = async (referralId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Referral sent successfully!');
  };

  const handleNewReferral = async (formData: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('New referral created successfully!');
    setShowNewReferral(false);
  };

  // Calculate statistics
  const totalReferrals = mockReferrals.length;
  const pendingReferrals = mockReferrals.filter(
    (r) => r.status === 'Pending'
  ).length;
  const acceptedReferrals = mockReferrals.filter(
    (r) => r.status === 'Accepted'
  ).length;
  const urgentReferrals = mockReferrals.filter(
    (r) => r.urgency === 'Urgent'
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
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
              <Send className="h-8 w-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Referrals Management
                </h1>
                <p className="mt-1 text-slate-600">
                  Manage client referrals to external services and organizations
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowNewReferral(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Referral
          </Button>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Referrals
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {totalReferrals}
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
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {pendingReferrals}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Accepted</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {acceptedReferrals}
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
                  <p className="text-sm font-medium text-slate-600">Urgent</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {urgentReferrals}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
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
                  placeholder="Search by client name, service, or case type..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                >
                  {referralStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                  aria-label="Filter by urgency"
                >
                  {urgencyLevels.map((urgency) => (
                    <option key={urgency} value={urgency}>
                      {urgency} Priority
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Referral Form */}
        {showNewReferral && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Referral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Client Name
                    </label>
                    <Input placeholder="Enter client name..." />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Case Type
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select case type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">
                          Emergency Shelter
                        </SelectItem>
                        <SelectItem value="trauma">Trauma Recovery</SelectItem>
                        <SelectItem value="substance">
                          Substance Abuse
                        </SelectItem>
                        <SelectItem value="domestic">
                          Domestic Violence
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Refer to Service
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {referralServices.map((service) => (
                        <SelectItem
                          key={service}
                          value={service.toLowerCase().replace(/\s+/g, '-')}
                        >
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Urgency Level
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Risk Level
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Reason for Referral
                  </label>
                  <Textarea
                    rows={3}
                    placeholder="Describe the reason for this referral..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Additional Notes
                  </label>
                  <Textarea
                    rows={2}
                    placeholder="Any additional information or special considerations..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleNewReferral({})}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Create Referral
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewReferral(false)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Referrals List */}
        <div className="space-y-4">
          {filteredReferrals.map((referral) => (
            <Card
              key={referral.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <Building className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {referral.clientName}
                        </h3>
                        <Badge className={getStatusColor(referral.status)}>
                          {referral.status}
                        </Badge>
                        <Badge className={getUrgencyColor(referral.urgency)}>
                          {referral.urgency}
                        </Badge>
                        <Badge className={getRiskColor(referral.riskLevel)}>
                          {referral.riskLevel} Risk
                        </Badge>
                      </div>

                      <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <strong>Referred to:</strong> {referral.referredTo}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <strong>Referred by:</strong> {referral.referredBy}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <strong>Date:</strong>{' '}
                          {new Date(referral.referralDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-slate-700">
                          <strong>Reason:</strong> {referral.reason}
                        </p>
                        {referral.notes && (
                          <p className="mt-1 text-sm text-slate-700">
                            <strong>Notes:</strong> {referral.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                        {referral.status === 'Pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendReferral(referral.id)}
                            className="border-blue-300 text-blue-700"
                          >
                            <Send className="mr-1 h-4 w-4" />
                            Send Referral
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          Contact Service
                        </Button>
                        {referral.contactInfo?.phone && (
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-1 h-4 w-4" />
                            Call {referral.contactInfo.phone}
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

        {filteredReferrals.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Send className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No referrals found
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

export default ReferralsPage;
