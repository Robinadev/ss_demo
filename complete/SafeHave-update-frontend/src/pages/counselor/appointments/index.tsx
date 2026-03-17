import { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  User,
  MoreVertical,
  Edit,
  X,
  CheckCircle,
  Video,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const mockAppointments = [
  {
    id: 'appt-1',
    clientName: 'Sarah M.',
    type: 'Counseling Session',
    date: '2024-01-20',
    time: '10:00 AM',
    duration: 60,
    location: 'Virtual - Secure Video',
    status: 'Confirmed',
    notes: 'Follow-up on trauma recovery progress',
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'sarah.m@example.com',
    },
  },
  {
    id: 'appt-2',
    clientName: 'Anonymous-412',
    type: 'Initial Assessment',
    date: '2024-01-20',
    time: '2:00 PM',
    duration: 90,
    location: 'Downtown Office - Room 204',
    status: 'Pending',
    notes: 'New client intake and risk assessment',
    contactInfo: null,
  },
  {
    id: 'appt-3',
    clientName: 'Maria G.',
    type: 'Support Group',
    date: '2024-01-21',
    time: '6:00 PM',
    duration: 120,
    location: 'Community Center',
    status: 'Confirmed',
    notes: 'Weekly trauma survivors support group',
    contactInfo: {
      phone: '+1 (555) 987-6543',
      email: 'maria.g@example.com',
    },
  },
  {
    id: 'appt-4',
    clientName: 'Anonymous-928',
    type: 'Follow-up',
    date: '2024-01-22',
    time: '11:00 AM',
    duration: 45,
    location: 'Virtual - Secure Video',
    status: 'Completed',
    notes: 'Medical care coordination follow-up',
    contactInfo: null,
  },
];

function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2024-01-20');
  const navigate = useNavigate();

  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter((appt) => {
      const matchesSearch =
        appt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === 'All' || appt.status === filterStatus;
      const matchesDate = appt.date === selectedDate;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchQuery, filterStatus, selectedDate]);

  const handleEditAppointment = (appointmentId: string) => {
    // Navigate to edit appointment page or open edit modal
    navigate(`/counselor/appointments/edit/${appointmentId}`);
  };

  const handleStartSession = (appointment: any) => {
    // Start video session or call
    if (appointment.location.includes('Virtual')) {
      // Open video conferencing
      alert(
        `Starting video session with ${appointment.clientName} at ${appointment.time}`
      );
      // In a real app, this would open a video conferencing interface
      window.open(`https://meet.google.com/${appointment.id}`, '_blank');
    } else {
      // For in-person appointments, show location
      alert(
        `Appointment with ${appointment.clientName} at ${appointment.location} starting at ${appointment.time}`
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Completed':
        return 'bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-[var(--role-counselor-accent)]" />;
      case 'Cancelled':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Calendar className="h-4 w-4 text-slate-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
            <p className="mt-1 text-slate-600">
              Manage your counseling appointments
            </p>
          </div>
          <Button className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Today's Appointments
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {
                      mockAppointments.filter((a) => a.date === selectedDate)
                        .length
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-[var(--role-counselor-primary)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Confirmed
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {
                      mockAppointments.filter((a) => a.status === 'Confirmed')
                        .length
                    }
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
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {
                      mockAppointments.filter((a) => a.status === 'Pending')
                        .length
                    }
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
                  <p className="text-sm font-medium text-slate-600">
                    This Week
                  </p>
                  <p className="text-3xl font-bold text-slate-800">12</p>
                </div>
                <Calendar className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Date Selector and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex gap-4">
                <div>
                  <label
                    htmlFor="appointment-date"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Select Date
                  </label>
                  <input
                    id="appointment-date"
                    type="date"
                    className="rounded-md border border-slate-300 px-3 py-2"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="self-end text-lg font-semibold text-slate-800">
                  {formatDate(selectedDate)}
                </div>
              </div>
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <Input
                  placeholder="Search by client name or appointment type..."
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
                  aria-label="Filter appointments by status"
                >
                  <option value="All">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--role-counselor-secondary)]/30">
                      {getStatusIcon(appointment.status)}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {appointment.clientName}
                        </h3>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-[var(--role-counselor-primary)]/30 text-[var(--role-counselor-primary)]"
                        >
                          {appointment.type}
                        </Badge>
                      </div>

                      <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {appointment.time} ({appointment.duration} min)
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {appointment.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Counselor: Grace Thompson
                        </div>
                      </div>

                      {appointment.notes && (
                        <p className="mb-3 text-sm text-slate-600">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      )}

                      {appointment.contactInfo && (
                        <div className="flex gap-4 text-sm text-slate-500">
                          {appointment.contactInfo.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {appointment.contactInfo.phone}
                            </div>
                          )}
                          {appointment.contactInfo.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {appointment.contactInfo.email}
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
                      onClick={() => handleEditAppointment(appointment.id)}
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartSession(appointment)}
                    >
                      <Video className="mr-1 h-4 w-4" />
                      Start Session
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

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No appointments found
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

export default AppointmentsPage;
