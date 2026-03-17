import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  User,
  Users,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Filter,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
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

const mockUnassignedClients = [
  {
    id: 'client-6',
    name: 'Robert T.',
    age: 34,
    riskLevel: 'High',
    caseType: 'Domestic Violence',
    intakeDate: '2024-01-18',
    priority: 'Urgent',
    notes:
      'Recent domestic violence incident, needs immediate shelter placement',
    location: 'Emergency Services',
  },
  {
    id: 'client-7',
    name: 'Jennifer L.',
    age: 28,
    riskLevel: 'Medium',
    caseType: 'Family Counseling',
    intakeDate: '2024-01-17',
    priority: 'High',
    notes: 'Family conflict resolution needed',
    location: 'Community Center',
  },
  {
    id: 'client-8',
    name: 'David M.',
    age: 45,
    riskLevel: 'Low',
    caseType: 'Substance Abuse',
    intakeDate: '2024-01-16',
    priority: 'Medium',
    notes: 'Seeking rehabilitation support',
    location: 'Outpatient Clinic',
  },
  {
    id: 'client-9',
    name: 'Amanda S.',
    age: 32,
    riskLevel: 'High',
    caseType: 'Trauma Recovery',
    intakeDate: '2024-01-15',
    priority: 'Urgent',
    notes: 'PTSD symptoms following recent trauma',
    location: 'Crisis Center',
  },
];

const mockCounselors = [
  {
    id: 'counselor-1',
    name: 'Grace Thompson',
    specialization: 'Domestic Violence',
    currentLoad: 8,
    maxCapacity: 12,
    availability: 'Available',
    location: 'Downtown Office',
  },
  {
    id: 'counselor-2',
    name: 'Dr. Sarah Johnson',
    specialization: 'Trauma Recovery',
    currentLoad: 6,
    maxCapacity: 10,
    availability: 'Available',
    location: 'Community Center',
  },
  {
    id: 'counselor-3',
    name: 'Michael Chen',
    specialization: 'Substance Abuse',
    currentLoad: 9,
    maxCapacity: 15,
    availability: 'Limited',
    location: 'Outpatient Clinic',
  },
  {
    id: 'counselor-4',
    name: 'Lisa Rodriguez',
    specialization: 'Family Counseling',
    currentLoad: 7,
    maxCapacity: 14,
    availability: 'Available',
    location: 'Family Services',
  },
];

type Client = {
  id: string;
  name: string;
  age: number;
  riskLevel: string;
  caseType: string;
  intakeDate: string;
  priority: string;
  notes: string;
  location: string;
};

function AssignClientPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  const filteredClients = useMemo(() => {
    return mockUnassignedClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.caseType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk =
        riskFilter === 'All' || client.riskLevel === riskFilter;
      const matchesPriority =
        priorityFilter === 'All' || client.priority === priorityFilter;
      return matchesSearch && matchesRisk && matchesPriority;
    });
  }, [searchQuery, riskFilter, priorityFilter]);

  const handleAssignClient = async (clientId: string, counselorId: string) => {
    if (!counselorId) {
      alert('Please select a counselor.');
      return;
    }

    setIsAssigning(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert('Client assigned successfully!');
    setSelectedClient(null);
    setSelectedCounselor('');
    setAssignmentNotes('');
    navigate('/counselor/clients');
    setIsAssigning(false);
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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800';
      case 'Limited':
        return 'bg-amber-100 text-amber-800';
      case 'Unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)]">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/counselor/dashboard">
              <Button variant="outline" size="sm" className="rounded-xl">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[var(--role-counselor-text)]">
                Assign Client
              </h1>
              <p className="text-[var(--role-counselor-text)]/70">
                Match clients with appropriate counselors
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Unassigned Clients */}
          <div className="space-y-6 lg:col-span-2">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                    <Input
                      placeholder="Search by client name or case type..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                      value={riskFilter}
                      onChange={(e) => setRiskFilter(e.target.value)}
                      aria-label="Filter by risk level"
                    >
                      <option value="All">All Risk Levels</option>
                      <option value="High">High Risk</option>
                      <option value="Medium">Medium Risk</option>
                      <option value="Low">Low Risk</option>
                    </select>
                    <select
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      aria-label="Filter by priority"
                    >
                      <option value="All">All Priorities</option>
                      <option value="Urgent">Urgent</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clients List */}
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <Card
                  key={client.id}
                  className={`cursor-pointer transition-shadow hover:shadow-md ${
                    selectedClient?.id === client.id
                      ? 'ring-2 ring-indigo-500'
                      : ''
                  }`}
                  onClick={() => setSelectedClient(client)}
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
                              {client.name}
                            </h3>
                            <Badge className={getRiskColor(client.riskLevel)}>
                              {client.riskLevel} Risk
                            </Badge>
                            <Badge
                              className={getPriorityColor(client.priority)}
                            >
                              {client.priority}
                            </Badge>
                          </div>

                          <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              <strong>Case Type:</strong> {client.caseType}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <strong>Intake Date:</strong>{' '}
                              {new Date(client.intakeDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <strong>Location:</strong> {client.location}
                            </div>
                            <div>
                              <strong>Age:</strong> {client.age} years old
                            </div>
                          </div>

                          <p className="mb-3 text-sm text-slate-700">
                            <strong>Notes:</strong> {client.notes}
                          </p>

                          {selectedClient?.id === client.id && (
                            <div className="mt-4 rounded-lg bg-indigo-50 p-4">
                              <h4 className="mb-2 font-medium text-indigo-800">
                                Assignment Details
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Select Counselor
                                  </label>
                                  <Select
                                    value={selectedCounselor}
                                    onValueChange={setSelectedCounselor}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Choose a counselor..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {mockCounselors.map((counselor) => (
                                        <SelectItem
                                          key={counselor.id}
                                          value={counselor.id}
                                        >
                                          <div className="flex w-full items-center justify-between">
                                            <span>
                                              {counselor.name} -{' '}
                                              {counselor.specialization}
                                            </span>
                                            <Badge
                                              className={getAvailabilityColor(
                                                counselor.availability
                                              )}
                                            >
                                              {counselor.availability}
                                            </Badge>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Assignment Notes
                                  </label>
                                  <Textarea
                                    value={assignmentNotes}
                                    onChange={(e) =>
                                      setAssignmentNotes(e.target.value)
                                    }
                                    rows={2}
                                    placeholder="Add any special instructions or considerations..."
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() =>
                                      handleAssignClient(
                                        client.id,
                                        selectedCounselor
                                      )
                                    }
                                    disabled={!selectedCounselor || isAssigning}
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                  >
                                    {isAssigning ? (
                                      <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                        Assigning...
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="mr-2 h-4 w-4" />
                                        Assign Client
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedClient(null);
                                      setSelectedCounselor('');
                                      setAssignmentNotes('');
                                    }}
                                  >
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredClients.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <User className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                  <h3 className="mb-2 text-lg font-medium text-slate-600">
                    No unassigned clients found
                  </h3>
                  <p className="text-slate-500">
                    All clients have been assigned to counselors.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Counselor Overview */}
          <div className="space-y-6">
            {/* Counselor Capacity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Counselor Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCounselors.map((counselor) => (
                  <div key={counselor.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {counselor.name}
                      </span>
                      <Badge
                        className={getAvailabilityColor(counselor.availability)}
                      >
                        {counselor.availability}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-600">
                      {counselor.specialization} • {counselor.location}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>
                        {counselor.currentLoad} / {counselor.maxCapacity}{' '}
                        clients
                      </span>
                      <span>
                        {Math.round(
                          (counselor.currentLoad / counselor.maxCapacity) * 100
                        )}
                        % capacity
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200">
                      <div
                        className={`h-1.5 rounded-full ${
                          counselor.currentLoad / counselor.maxCapacity > 0.8
                            ? 'bg-red-500'
                            : counselor.currentLoad / counselor.maxCapacity >
                                0.6
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                        }`}
                        style={{
                          width: `${(counselor.currentLoad / counselor.maxCapacity) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Assignment Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Assignment Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">
                      High Risk Clients
                    </h4>
                    <p className="text-xs text-slate-600">
                      Assign to counselors with domestic violence or trauma
                      specialization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">
                      Urgent Cases
                    </h4>
                    <p className="text-xs text-slate-600">
                      Schedule initial assessment within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <div>
                    <h4 className="text-sm font-medium text-emerald-800">
                      Workload Balance
                    </h4>
                    <p className="text-xs text-slate-600">
                      Maintain counselor capacity below 80%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      Sarah M. → Grace Thompson
                    </span>
                    <span className="text-xs text-slate-500">2h ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      Maria G. → Dr. Sarah Johnson
                    </span>
                    <span className="text-xs text-slate-500">1d ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      Lisa R. → Lisa Rodriguez
                    </span>
                    <span className="text-xs text-slate-500">2d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignClientPage;
