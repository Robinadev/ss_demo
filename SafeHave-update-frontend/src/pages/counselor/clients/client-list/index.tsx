import { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Calendar,
  MapPin,
  MoreVertical,
  Edit,
  Eye,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const mockClients = [
  {
    id: 'client-1',
    name: 'Sarah M.',
    age: 28,
    location: 'Downtown District',
    riskLevel: 'Medium',
    lastContact: '2 days ago',
    assignedCounselor: 'Grace Thompson',
    caseCount: 3,
    status: 'Active',
    phone: '+1 (555) 123-4567',
    email: 'sarah.m@example.com',
  },
  {
    id: 'client-2',
    name: 'Anonymous-412',
    age: null,
    location: 'North Sector',
    riskLevel: 'High',
    lastContact: '5 hours ago',
    assignedCounselor: 'Grace Thompson',
    caseCount: 1,
    status: 'Active',
    phone: null,
    email: null,
  },
  {
    id: 'client-3',
    name: 'Maria G.',
    age: 35,
    location: 'East District',
    riskLevel: 'Low',
    lastContact: '1 week ago',
    assignedCounselor: 'Grace Thompson',
    caseCount: 2,
    status: 'Inactive',
    phone: '+1 (555) 987-6543',
    email: 'maria.g@example.com',
  },
];

function CounselorListsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  const filteredClients = useMemo(() => {
    return mockClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (client.location &&
          client.location.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus =
        filterStatus === 'All' || client.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-500 bg-red-50 border-red-200';
      case 'Medium':
        return 'text-amber-500 bg-amber-50 border-amber-200';
      case 'Low':
        return 'text-emerald-500 bg-emerald-50 border-emerald-200';
      default:
        return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[var(--role-counselor-text)]">
              Client Management
            </h1>
            <p className="mt-1 text-[var(--role-counselor-text)]/70">
              Manage and track client relationships
            </p>
          </div>
          <Button className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--role-counselor-text)]/70">
                    Total Clients
                  </p>
                  <p className="text-3xl font-bold text-[var(--role-counselor-text)]">
                    {mockClients.length}
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
                  <p className="text-sm font-medium text-[var(--role-counselor-text)]/70">
                    Active Clients
                  </p>
                  <p className="text-3xl font-bold text-[var(--role-counselor-text)]">
                    {mockClients.filter((c) => c.status === 'Active').length}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--role-counselor-text)]/70">
                    High Risk
                  </p>
                  <p className="text-3xl font-bold text-[var(--role-counselor-text)]">
                    {mockClients.filter((c) => c.riskLevel === 'High').length}
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
                  <p className="text-sm font-medium text-[var(--role-counselor-text)]/70">
                    New This Week
                  </p>
                  <p className="text-3xl font-bold text-[var(--role-counselor-text)]">2</p>
                </div>
                <Calendar className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <Input
                  placeholder="Search by name or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'All' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('All')}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'Active' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('Active')}
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === 'Inactive' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('Inactive')}
                >
                  Inactive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client List */}
        <div className="grid gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--role-counselor-secondary)]/30">
                      <Users className="h-6 w-6 text-[var(--role-counselor-text)]" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-[var(--role-counselor-text)]">
                          {client.name}
                        </h3>
                        <Badge className={getRiskColor(client.riskLevel)}>
                          {client.riskLevel} Risk
                        </Badge>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-sm text-[var(--role-counselor-text)]/70 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {client.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Last contact: {client.lastContact}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {client.caseCount} active cases
                        </div>
                      </div>

                      {(client.phone || client.email) && (
                        <div className="mt-3 flex gap-4">
                          {client.phone && (
                            <div className="flex items-center gap-1 text-sm text-[var(--role-counselor-text)]/50">
                              <Phone className="h-3 w-3" />
                              {client.phone}
                            </div>
                          )}
                          {client.email && (
                            <div className="flex items-center gap-1 text-sm text-[var(--role-counselor-text)]/50">
                              <Mail className="h-3 w-3" />
                              {client.email}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/counselor/clients/client-details`)
                      }
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/counselor/clients/client-details?edit=true`)
                      }
                    >
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
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No clients found
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

export default CounselorListsPage;
