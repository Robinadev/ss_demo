import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  Shield,
  Calendar,
  ExternalLink,
  Filter,
  Settings,
  Volume2,
  VolumeX,
  Eye,
  Archive,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const mockAlerts = [
  {
    id: 'alert-1',
    type: 'Emergency',
    priority: 'Critical',
    title: 'Client in Crisis - Immediate Response Required',
    message:
      'Sarah M. has reported suicidal ideation and needs immediate intervention. Client is currently at Downtown Shelter.',
    timestamp: '2024-01-20T14:30:00Z',
    clientName: 'Sarah M.',
    caseId: 'case-1',
    category: 'Crisis Intervention',
    status: 'Active',
    acknowledged: false,
    escalated: true,
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'shelter@emergency.org',
    },
    actions: ['Call Client', 'Send Emergency Response', 'Notify Supervisor'],
  },
  {
    id: 'alert-2',
    type: 'Urgent',
    priority: 'High',
    title: 'Missed Session Follow-up',
    message:
      "James K. missed their scheduled session and hasn't responded to reminder messages. Risk level assessment required.",
    timestamp: '2024-01-20T13:15:00Z',
    clientName: 'James K.',
    caseId: 'case-5',
    category: 'Session Management',
    status: 'Active',
    acknowledged: false,
    escalated: false,
    contactInfo: {
      phone: '+1 (555) 987-6543',
      email: 'james.k@email.com',
    },
    actions: ['Contact Client', 'Schedule Follow-up', 'Update Risk Assessment'],
  },
  {
    id: 'alert-3',
    type: 'Important',
    priority: 'Medium',
    title: 'Case Transfer Request',
    message:
      "Request to transfer Maria G.'s case to specialized trauma counselor. Current counselor has reached capacity.",
    timestamp: '2024-01-20T11:45:00Z',
    clientName: 'Maria G.',
    caseId: 'case-3',
    category: 'Case Management',
    status: 'Pending Review',
    acknowledged: true,
    escalated: false,
    contactInfo: null,
    actions: ['Approve Transfer', 'Deny Request', 'Schedule Discussion'],
  },
  {
    id: 'alert-4',
    type: 'Information',
    priority: 'Low',
    title: 'Training Reminder',
    message:
      'Mandatory trauma-informed care training session scheduled for tomorrow at 2:00 PM.',
    timestamp: '2024-01-20T09:30:00Z',
    clientName: null,
    caseId: null,
    category: 'Training',
    status: 'Active',
    acknowledged: false,
    escalated: false,
    contactInfo: null,
    actions: ['View Training Details', 'Add to Calendar'],
  },
  {
    id: 'alert-5',
    type: 'Warning',
    priority: 'High',
    title: 'Documentation Deadline',
    message:
      "Session notes for Lisa R.'s case are due in 24 hours. Please complete documentation to maintain compliance.",
    timestamp: '2024-01-19T16:20:00Z',
    clientName: 'Lisa R.',
    caseId: 'case-4',
    category: 'Compliance',
    status: 'Active',
    acknowledged: true,
    escalated: false,
    contactInfo: null,
    actions: ['Complete Notes', 'Request Extension', 'View Guidelines'],
  },
];

const alertTypes = [
  'All',
  'Emergency',
  'Urgent',
  'Important',
  'Information',
  'Warning',
];
const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];

function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAcknowledged, setShowAcknowledged] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter((alert) => {
      const matchesSearch =
        !searchQuery ||
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (alert.clientName &&
          alert.clientName.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = typeFilter === 'All' || alert.type === typeFilter;
      const matchesPriority =
        priorityFilter === 'All' || alert.priority === priorityFilter;
      const matchesStatus =
        statusFilter === 'All' || alert.status === statusFilter;
      const matchesAcknowledged = showAcknowledged || !alert.acknowledged;
      return (
        matchesSearch &&
        matchesType &&
        matchesPriority &&
        matchesStatus &&
        matchesAcknowledged
      );
    });
  }, [searchQuery, typeFilter, priorityFilter, statusFilter, showAcknowledged]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Low':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Emergency':
        return 'bg-red-500 text-white';
      case 'Urgent':
        return 'bg-orange-500 text-white';
      case 'Important':
        return 'bg-[var(--role-counselor-accent)] text-white';
      case 'Information':
        return 'bg-slate-500 text-white';
      case 'Warning':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800';
      case 'Pending Review':
        return 'bg-amber-100 text-amber-800';
      case 'Resolved':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Emergency':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'Urgent':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'Important':
        return <Bell className="h-5 w-5 text-[var(--role-counselor-accent)]" />;
      case 'Information':
        return <MessageSquare className="h-5 w-5 text-slate-600" />;
      case 'Warning':
        return <Shield className="h-5 w-5 text-amber-600" />;
      default:
        return <Bell className="h-5 w-5 text-slate-600" />;
    }
  };

  const handleAcknowledgeAlert = async (alertId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert('Alert acknowledged!');
  };

  const handleResolveAlert = async (alertId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert('Alert resolved!');
  };

  const handleActionClick = async (alertId: string, action: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(`Action "${action}" performed on alert ${alertId}`);
  };

  // Calculate statistics
  const totalAlerts = mockAlerts.length;
  const activeAlerts = mockAlerts.filter((a) => a.status === 'Active').length;
  const criticalAlerts = mockAlerts.filter(
    (a) => a.priority === 'Critical'
  ).length;
  const unacknowledgedAlerts = mockAlerts.filter((a) => !a.acknowledged).length;

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
              <Bell className="h-8 w-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Alerts & Notifications
                </h1>
                <p className="mt-1 text-slate-600">
                  Manage urgent notifications and system alerts
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Alert Settings
            </Button>
            <Button variant="outline">
              <Volume2 className="mr-2 h-4 w-4" />
              Notification Preferences
            </Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Alerts
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {totalAlerts}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-[var(--role-counselor-primary)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Active Alerts
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {activeAlerts}
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
                  <p className="text-sm font-medium text-slate-600">
                    Critical Priority
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {criticalAlerts}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Unacknowledged
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {unacknowledgedAlerts}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-[var(--role-counselor-text)]" />
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
                  placeholder="Search alerts by title, message, or client name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  aria-label="Filter by alert type"
                >
                  {alertTypes.map((type) => (
                    <option key={type} value={type}>
                      {type} Alerts
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  aria-label="Filter by priority"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority} Priority
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showAcknowledged}
                    onChange={(e) => setShowAcknowledged(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  Show Acknowledged
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`transition-shadow hover:shadow-md ${
                alert.priority === 'Critical'
                  ? 'border-l-4 border-l-red-500'
                  : alert.priority === 'High'
                    ? 'border-l-4 border-l-orange-500'
                    : 'border-l-4 border-l-slate-300'
              } ${!alert.acknowledged ? 'bg-[var(--role-counselor-secondary)]/20' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--role-counselor-secondary)]/30">
                      {getTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {alert.title}
                        </h3>
                        <Badge className={getTypeColor(alert.type)}>
                          {alert.type}
                        </Badge>
                        <Badge className={getPriorityColor(alert.priority)}>
                          {alert.priority}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                        {!alert.acknowledged && (
                          <Badge className="bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]">
                            New
                          </Badge>
                        )}
                      </div>

                      <p className="mb-3 text-slate-700">{alert.message}</p>

                      <div className="mb-4 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <strong>Time:</strong>{' '}
                          {new Date(alert.timestamp).toLocaleString()}
                        </div>
                        {alert.clientName && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <strong>Client:</strong> {alert.clientName}
                          </div>
                        )}
                        <div>
                          <strong>Category:</strong> {alert.category}
                        </div>
                      </div>

                      {alert.actions && alert.actions.length > 0 && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-slate-700">
                            Quick Actions:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {alert.actions.map((action, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleActionClick(alert.id, action)
                                }
                                className={`${
                                  action.includes('Emergency') ||
                                  action.includes('Call')
                                    ? 'border-red-300 text-red-700 hover:bg-red-50'
                                    : 'border-[var(--role-counselor-primary)]/30 text-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-secondary)]/30'
                                }`}
                              >
                                {action.includes('Call') && (
                                  <Phone className="mr-1 h-3 w-3" />
                                )}
                                {action.includes('Send') && (
                                  <Mail className="mr-1 h-3 w-3" />
                                )}
                                {action.includes('Contact') && (
                                  <MessageSquare className="mr-1 h-3 w-3" />
                                )}
                                {action.includes('Schedule') && (
                                  <Calendar className="mr-1 h-3 w-3" />
                                )}
                                {action.includes('Complete') && (
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                )}
                                {action}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {!alert.acknowledged && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcknowledgeAlert(alert.id)}
                            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Acknowledge
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Archive className="mr-1 h-4 w-4" />
                          Archive
                        </Button>
                        {alert.status !== 'Resolved' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResolveAlert(alert.id)}
                            className="border-[var(--role-counselor-primary)]/30 text-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-secondary)]/30"
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Mark Resolved
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

        {filteredAlerts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No alerts found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Alert Categories Summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Crisis Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Crisis Cases</span>
                  <span className="font-medium">
                    {
                      mockAlerts.filter(
                        (a) =>
                          a.category === 'Crisis Intervention' &&
                          a.status === 'Active'
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Emergency Contacts</span>
                  <span className="font-medium">
                    {mockAlerts.filter((a) => a.contactInfo?.phone).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Escalated Cases</span>
                  <span className="font-medium">
                    {mockAlerts.filter((a) => a.escalated).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Session Follow-ups</span>
                  <span className="font-medium">
                    {
                      mockAlerts.filter(
                        (a) => a.category === 'Session Management'
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Documentation Due</span>
                  <span className="font-medium">
                    {
                      mockAlerts.filter((a) => a.category === 'Compliance')
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Transfer Requests</span>
                  <span className="font-medium">
                    {
                      mockAlerts.filter((a) => a.status === 'Pending Review')
                        .length
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                System Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Training Reminders</span>
                  <span className="font-medium">
                    {mockAlerts.filter((a) => a.category === 'Training').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">System Updates</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Policy Changes</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AlertsPage;
