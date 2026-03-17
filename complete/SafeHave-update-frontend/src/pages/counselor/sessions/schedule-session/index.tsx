import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  Phone,
  Plus,
  Save,
  X,
  CheckCircle,
  AlertCircle,
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

const mockClients = [
  {
    id: 'client-1',
    name: 'Sarah M.',
    riskLevel: 'High',
    assignedCounselor: 'Grace Thompson',
  },
  {
    id: 'client-2',
    name: 'Anonymous-412',
    riskLevel: 'High',
    assignedCounselor: 'Grace Thompson',
  },
  {
    id: 'client-3',
    name: 'Maria G.',
    riskLevel: 'Medium',
    assignedCounselor: 'Grace Thompson',
  },
  {
    id: 'client-4',
    name: 'Lisa R.',
    riskLevel: 'Low',
    assignedCounselor: 'Grace Thompson',
  },
];

const sessionTypes = [
  'Individual Counseling',
  'Family Session',
  'Crisis Intervention',
  'Initial Assessment',
  'Follow-up',
  'Group Session',
];

const locations = [
  'Virtual - Secure Video',
  'Downtown Office - Room 204',
  'Community Center',
  'Mobile Unit - Location TBD',
];

function ScheduleSessionPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    sessionType: '',
    date: '',
    time: '',
    duration: 60,
    location: '',
    notes: '',
    priority: 'Normal',
    sendReminder: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.clientId ||
      !formData.sessionType ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert('Session scheduled successfully!');
    navigate('/counselor/sessions');
    setIsLoading(false);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
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

  const selectedClient = mockClients.find(
    (client) => client.id === formData.clientId
  );

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Link to="/counselor/sessions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sessions
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Schedule New Session
                </h1>
                <p className="mt-1 text-slate-600">
                  Book a counseling session with a client
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Client Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Select Client <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.clientId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, clientId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a client..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        <div className="flex w-full items-center justify-between">
                          <span>{client.name}</span>
                          <Badge
                            className={`ml-2 ${getRiskColor(client.riskLevel)}`}
                          >
                            {client.riskLevel} Risk
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClient && (
                <div className="rounded-lg bg-[var(--role-counselor-secondary)]/30 p-4">
                  <h4 className="mb-2 font-semibold text-slate-800">
                    Client Details
                  </h4>
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                    <div>
                      <span className="text-slate-600">Name:</span>
                      <span className="ml-2 font-medium">
                        {selectedClient.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600">Risk Level:</span>
                      <Badge
                        className={`ml-2 ${getRiskColor(selectedClient.riskLevel)}`}
                      >
                        {selectedClient.riskLevel}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-slate-600">Counselor:</span>
                      <span className="ml-2 font-medium">
                        {selectedClient.assignedCounselor}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Session Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Session Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.sessionType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, sessionType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Priority Level
                  </label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low Priority</SelectItem>
                      <SelectItem value="Normal">Normal Priority</SelectItem>
                      <SelectItem value="High">High Priority</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Duration (minutes)
                  </label>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        duration: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, location: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location..." />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        <div className="flex items-center gap-2">
                          {location.includes('Virtual') && (
                            <Video className="h-4 w-4 text-[var(--role-counselor-accent)]" />
                          )}
                          {location.includes('Phone') && (
                            <Phone className="h-4 w-4 text-green-500" />
                          )}
                          {!location.includes('Virtual') &&
                            !location.includes('Phone') && (
                              <MapPin className="h-4 w-4 text-slate-500" />
                            )}
                          {location}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Session Notes
                </label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  rows={3}
                  placeholder="Add any special instructions, topics to cover, or preparation needed..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Additional Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="sendReminder"
                  checked={formData.sendReminder}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sendReminder: e.target.checked,
                    }))
                  }
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="sendReminder"
                  className="text-sm text-slate-700"
                >
                  Send automated reminder to client 24 hours before session
                </label>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <h4 className="mb-1 font-medium text-blue-800">
                      Session Confirmation
                    </h4>
                    <p className="text-sm text-blue-700">
                      Once scheduled, the client will receive a confirmation
                      with session details and any preparation instructions. You
                      can modify or cancel the session up to 2 hours before the
                      scheduled time.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/counselor/sessions')}
              className="flex-1"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Schedule Session
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleSessionPage;
