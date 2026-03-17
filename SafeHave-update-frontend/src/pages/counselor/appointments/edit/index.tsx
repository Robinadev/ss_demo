import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  Phone,
  Mail,
  Video,
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
import { useNavigate, useParams } from 'react-router-dom';

// Mock appointment data - in real app this would come from API
const mockAppointment = {
  id: 'appt-1',
  clientName: 'Sarah M.',
  clientId: 'client-123',
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
};

function EditAppointmentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [appointment, setAppointment] = useState(mockAppointment);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Appointment updated successfully!');
    navigate('/counselor/appointments');
    setIsLoading(false);
  };

  const handleCancel = () => {
    navigate('/counselor/appointments');
  };

  const locationOptions = [
    'Virtual - Secure Video',
    'Downtown Office - Room 204',
    'Community Center',
    'Mobile Unit - Location TBD',
  ];

  const appointmentTypes = [
    'Counseling Session',
    'Initial Assessment',
    'Follow-up',
    'Group Session',
    'Family Session',
    'Crisis Intervention',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/counselor/appointments')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Appointments
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Edit Appointment
                </h1>
                <p className="text-slate-600">Appointment #{id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Client Name
                    </label>
                    <Input
                      value={appointment.clientName}
                      onChange={(e) =>
                        setAppointment({
                          ...appointment,
                          clientName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Appointment Type
                    </label>
                    <Select
                      value={appointment.type}
                      onValueChange={(value) =>
                        setAppointment({ ...appointment, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={appointment.date}
                      onChange={(e) =>
                        setAppointment({ ...appointment, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={appointment.time
                        .replace(' AM', '')
                        .replace(' PM', '')}
                      onChange={(e) =>
                        setAppointment({ ...appointment, time: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      value={appointment.duration}
                      onChange={(e) =>
                        setAppointment({
                          ...appointment,
                          duration: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Location
                  </label>
                  <Select
                    value={appointment.location}
                    onValueChange={(value) =>
                      setAppointment({ ...appointment, location: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <Select
                    value={appointment.status}
                    onValueChange={(value) =>
                      setAppointment({ ...appointment, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Notes
                  </label>
                  <Textarea
                    value={appointment.notes}
                    onChange={(e) =>
                      setAppointment({ ...appointment, notes: e.target.value })
                    }
                    rows={3}
                    placeholder="Add any additional notes or special instructions..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700">
                        Phone
                      </label>
                      <Input
                        value={appointment.contactInfo.phone}
                        onChange={(e) =>
                          setAppointment({
                            ...appointment,
                            contactInfo: {
                              ...appointment.contactInfo,
                              phone: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700">
                        Email
                      </label>
                      <Input
                        value={appointment.contactInfo.email}
                        onChange={(e) =>
                          setAppointment({
                            ...appointment,
                            contactInfo: {
                              ...appointment.contactInfo,
                              email: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appointment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">{appointment.clientName}</p>
                    <p className="text-sm text-slate-500">Client</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-sm text-slate-500">Date</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">{appointment.time}</p>
                    <p className="text-sm text-slate-500">
                      {appointment.duration} minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">{appointment.location}</p>
                    <p className="text-sm text-slate-500">Location</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <Badge
                    className={`w-full justify-center ${
                      appointment.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : appointment.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : appointment.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert('Reschedule functionality coming soon')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    alert('Send reminder functionality coming soon')
                  }
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminder
                </Button>
                {appointment.location.includes('Virtual') && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Test Video Link
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    alert('Cancel appointment functionality coming soon')
                  }
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Recent Changes */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last modified:</span>
                    <span>Just now</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Modified by:</span>
                    <span>Grace Thompson</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2">
                    <p className="text-xs text-slate-500">
                      Changes will be saved when you click "Save Changes"
                    </p>
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

export default EditAppointmentPage;
