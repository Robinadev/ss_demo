import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Plus,
  FileText,
  AlertTriangle,
  Shield,
  Clock,
  MessageSquare,
  Activity,
  History,
  Heart,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useSearchParams } from 'react-router-dom';

const mockClient = {
  id: 'client-1',
  name: 'Sarah M.',
  age: 28,
  location: 'Downtown District',
  riskLevel: 'Medium',
  status: 'Active',
  createdDate: '2024-01-15',
  lastContact: '2024-01-20T14:30:00Z',
  assignedCounselor: 'Grace Thompson',
  phone: '+1 (555) 123-4567',
  email: 'sarah.m@example.com',
  emergencyContact: {
    name: 'Jane Smith',
    relationship: 'Sister',
    phone: '+1 (555) 987-6543',
  },
  demographics: {
    occupation: 'Retail Associate',
    incomeLevel: 'Low',
    education: 'High School',
    maritalStatus: 'Single',
    children: 2,
    languages: ['English', 'Spanish'],
  },
  caseHistory: [
    {
      id: 'case-1',
      title: 'Emergency Shelter Placement',
      status: 'Active',
      priority: 'Critical',
      createdDate: '2024-01-20',
      lastUpdated: '2024-01-20',
    },
    {
      id: 'case-2',
      title: 'Domestic Violence Support',
      status: 'Resolved',
      priority: 'High',
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-18',
    },
  ],
  notes: [
    {
      id: 'note-1',
      author: 'Grace Thompson',
      date: '2024-01-20T14:30:00Z',
      content:
        'Client arrived at safe house location. Physical assessment shows minor bruising on arms and neck. Client reports incident occurred yesterday evening. Police notified and report taken.',
      type: 'Assessment',
    },
    {
      id: 'note-2',
      author: 'Grace Thompson',
      date: '2024-01-19T11:00:00Z',
      content:
        'Initial phone consultation. Client expressed fear for safety and requested emergency shelter placement. Arranged for immediate intake.',
      type: 'Contact',
    },
  ],
  communications: [
    {
      id: 'comm-1',
      type: 'phone',
      date: '2024-01-20T10:00:00Z',
      summary: 'Emergency intake call - very distressed',
      duration: '15 min',
    },
    {
      id: 'comm-2',
      type: 'email',
      date: '2024-01-19T16:30:00Z',
      summary: 'Follow-up on previous intake',
      duration: null,
    },
  ],
};

function ClientDetailsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEditMode = searchParams.get('edit') === 'true';

  const [isEditing, setIsEditing] = useState(isEditMode);
  const [clientData, setClientData] = useState(mockClient);
  const [newNote, setNewNote] = useState('');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-amber-600 bg-amber-50';
      case 'Low':
        return 'text-emerald-600 bg-emerald-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSave = () => {
    // Save client data
    setIsEditing(false);
    // Update URL to remove edit parameter
    navigate('/counselor/clients/client-details', { replace: true });
  };

  const handleCancel = () => {
    // Reset to original data
    setClientData(mockClient);
    setIsEditing(false);
    navigate('/counselor/clients/client-details', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/counselor/clients')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Clients
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {clientData.name}
                </h1>
                <p className="text-slate-600">Client #{clientData.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getRiskColor(clientData.riskLevel)}>
                {clientData.riskLevel} Risk
              </Badge>
              <Badge className="bg-emerald-100 text-emerald-800">
                {clientData.status}
              </Badge>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Client
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={clientData.name}
                        onChange={(e) =>
                          setClientData({ ...clientData, name: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-slate-800">{clientData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Age
                    </label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={clientData.age}
                        onChange={(e) =>
                          setClientData({
                            ...clientData,
                            age: parseInt(e.target.value),
                          })
                        }
                      />
                    ) : (
                      <p className="text-slate-800">
                        {clientData.age} years old
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Location
                  </label>
                  {isEditing ? (
                    <Input
                      value={clientData.location}
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          location: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="text-slate-800">{clientData.location}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Assigned Counselor
                  </label>
                  <p className="text-slate-800">
                    {clientData.assignedCounselor}
                  </p>
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
                      {isEditing ? (
                        <Input
                          value={clientData.phone}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              phone: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-slate-600">{clientData.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700">
                        Email
                      </label>
                      {isEditing ? (
                        <Input
                          value={clientData.email}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-slate-600">{clientData.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <h4 className="mb-2 font-semibold text-slate-800">
                    Emergency Contact
                  </h4>
                  <div className="text-sm text-slate-600">
                    <p>
                      <strong>{clientData.emergencyContact.name}</strong> (
                      {clientData.emergencyContact.relationship})
                    </p>
                    <p>{clientData.emergencyContact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Demographics & Background</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Occupation
                      </label>
                      <p className="text-slate-600">
                        {clientData.demographics.occupation}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Education
                      </label>
                      <p className="text-slate-600">
                        {clientData.demographics.education}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Marital Status
                      </label>
                      <p className="text-slate-600">
                        {clientData.demographics.maritalStatus}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Income Level
                      </label>
                      <p className="text-slate-600">
                        {clientData.demographics.incomeLevel}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Children
                      </label>
                      <p className="text-slate-600">
                        {clientData.demographics.children} children
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Languages
                      </label>
                      <div className="flex gap-1">
                        {clientData.demographics.languages.map(
                          (lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {lang}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case History */}
            <Card>
              <CardHeader>
                <CardTitle>Case History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.caseHistory.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <FileText className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {caseItem.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            Created: {formatDate(caseItem.createdDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`text-xs ${
                            caseItem.priority === 'Critical'
                              ? 'bg-red-100 text-red-800'
                              : caseItem.priority === 'High'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {caseItem.priority}
                        </Badge>
                        <Badge
                          className={`text-xs ${
                            caseItem.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : caseItem.status === 'Resolved'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {caseItem.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Case
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Client Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Client Notes</CardTitle>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.notes.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">
                            {note.author}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {note.type}
                          </Badge>
                        </div>
                        <span className="text-xs text-slate-500">
                          {formatDate(note.date)}
                        </span>
                      </div>
                      <p className="text-slate-600">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                    <User className="h-10 w-10 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {clientData.name}
                  </h3>
                  <p className="text-slate-600">
                    Client since{' '}
                    {formatDate(clientData.createdDate).split(',')[0]}
                  </p>
                  <div className="mt-3 flex justify-center gap-2">
                    <Badge className={getRiskColor(clientData.riskLevel)}>
                      {clientData.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Active Cases</span>
                  <span className="font-semibold">
                    {
                      clientData.caseHistory.filter(
                        (c) => c.status === 'Active'
                      ).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Cases</span>
                  <span className="font-semibold">
                    {clientData.caseHistory.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Last Contact</span>
                  <span className="text-sm font-semibold">
                    {formatDate(clientData.lastContact)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Communication Count
                  </span>
                  <span className="font-semibold">
                    {clientData.communications.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Client
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Case
                </Button>
                <Button className="w-full" variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  View Timeline
                </Button>
              </CardContent>
            </Card>

            {/* Recent Communications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Communications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {clientData.communications.slice(0, 3).map((comm) => (
                    <div key={comm.id} className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          comm.type === 'phone' ? 'bg-blue-100' : 'bg-green-100'
                        }`}
                      >
                        {comm.type === 'phone' ? (
                          <Phone className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Mail className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {comm.summary}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(comm.date)}
                          {comm.duration && ` • ${comm.duration}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailsPage;
