import { useState } from 'react';
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  MessageSquare,
  Edit,
  Download,
  Phone,
  Mail,
  MapPin,
  Shield,
  Activity,
  History,
  Plus,
  Save,
  X,
  Paperclip,
  Eye,
  Flag,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  CasePriority,
  CaseType,
  CASE_PRIORITY_LABELS,
  PRIORITY_COLORS,
} from '@/types/case';
import { Link } from 'react-router-dom';

const mockCase = {
  id: 'case-1',
  title: 'Emergency Shelter Placement',
  clientName: 'Sarah M.',
  clientId: 'client-123',
  type: CaseType.EMERGENCY_SUPPORT,
  priority: CasePriority.CRITICAL,
  status: 'Active',
  createdDate: '2024-01-20',
  lastUpdated: '2024-01-20T14:30:00Z',
  assignedTo: 'Grace Thompson',
  riskScore: 88,
  description:
    'Client requires immediate emergency shelter placement due to domestic violence situation. Police report filed, court protection order pending. Client has two children under 12 years old.',

  clientDetails: {
    age: 28,
    location: 'Downtown District',
    phone: '+1 (555) 123-4567',
    email: 'sarah.m@example.com',
    emergencyContact: 'Jane Smith (Sister) - +1 (555) 987-6543',
    children: 2,
    occupation: 'Retail Associate',
  },

  caseNotes: [
    {
      id: 'note-1',
      author: 'Grace Thompson',
      date: '2024-01-20T14:30:00Z',
      type: 'Initial Assessment',
      content:
        'Client arrived at safe house location. Physical assessment shows minor bruising on arms and neck. Client reports incident occurred yesterday evening. Police notified and report taken. Immediate safety plan implemented.',
      isPrivate: false,
    },
    {
      id: 'note-2',
      author: 'Legal Team',
      date: '2024-01-20T11:15:00Z',
      type: 'Legal Update',
      content:
        'Emergency protection order filed with family court. Hearing scheduled for January 25th. Temporary restraining order granted.',
      isPrivate: false,
    },
    {
      id: 'note-3',
      author: 'Grace Thompson',
      date: '2024-01-20T09:00:00Z',
      type: 'Follow-up',
      content:
        'Client settled into emergency shelter. Children enrolled in onsite childcare program. Initial counseling session scheduled for tomorrow.',
      isPrivate: false,
    },
  ],

  timeline: [
    {
      date: '2024-01-20T08:00:00Z',
      event: 'Case created - Emergency intake',
      type: 'creation',
    },
    {
      date: '2024-01-20T08:30:00Z',
      event: 'Police report filed',
      type: 'action',
    },
    {
      date: '2024-01-20T09:00:00Z',
      event: 'Emergency shelter placement confirmed',
      type: 'milestone',
    },
    {
      date: '2024-01-20T11:15:00Z',
      event: 'Protection order filed',
      type: 'legal',
    },
    {
      date: '2024-01-20T14:30:00Z',
      event: 'Initial assessment completed',
      type: 'assessment',
    },
  ],

  documents: [
    {
      id: 'doc-1',
      name: 'Police Report',
      type: 'PDF',
      size: '2.4 MB',
      date: '2024-01-20',
    },
    {
      id: 'doc-2',
      name: 'Medical Assessment',
      type: 'PDF',
      size: '1.8 MB',
      date: '2024-01-20',
    },
    {
      id: 'doc-3',
      name: 'Protection Order',
      type: 'PDF',
      size: '145 KB',
      date: '2024-01-20',
    },
  ],

  communications: [
    {
      id: 'comm-1',
      type: 'phone',
      date: '2024-01-20T10:00:00Z',
      summary: 'Initial crisis call - client very distressed',
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

function CaseDetailsPage() {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const priority = PRIORITY_COLORS[mockCase.priority];
  const riskLevel =
    mockCase.riskScore > 80
      ? 'text-red-600'
      : mockCase.riskScore > 50
        ? 'text-amber-600'
        : 'text-emerald-600';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'creation':
        return <FileText className="h-4 w-4" />;
      case 'milestone':
        return <CheckCircle className="h-4 w-4" />;
      case 'legal':
        return <Shield className="h-4 w-4" />;
      case 'assessment':
        return <Activity className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'creation':
        return 'bg-blue-500';
      case 'milestone':
        return 'bg-emerald-500';
      case 'legal':
        return 'bg-[var(--role-counselor-accent)]';
      case 'assessment':
        return 'bg-amber-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/counselor/cases">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cases
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {mockCase.title}
                </h1>
                <p className="text-slate-600">
                  Case #{mockCase.id} • {mockCase.clientName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={`${priority.bg} ${priority.text} border-${priority.text}/20`}
              >
                {CASE_PRIORITY_LABELS[mockCase.priority]}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {mockCase.status}
              </Badge>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Case
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Case Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Case Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-slate-800">
                      Case Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Type:</span>
                        <span>{mockCase.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Created:</span>
                        <span>{formatDate(mockCase.createdDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Last Updated:</span>
                        <span>{formatDate(mockCase.lastUpdated)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Assigned To:</span>
                        <span>{mockCase.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-slate-800">
                      Risk Assessment
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Risk Score:
                        </span>
                        <span className={`text-xl font-bold ${riskLevel}`}>
                          {mockCase.riskScore}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                          className={`h-2 rounded-full ${mockCase.riskScore > 80 ? 'bg-red-500' : mockCase.riskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${mockCase.riskScore}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500">
                        High risk - immediate intervention required
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-slate-800">
                    Description
                  </h4>
                  <p className="text-slate-600">{mockCase.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Case Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Case Notes & Updates</CardTitle>
                  <Button onClick={() => setIsAddingNote(true)} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isAddingNote && (
                  <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <Textarea
                      placeholder="Add a new case note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setIsAddingNote(false)}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Note
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsAddingNote(false)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  {mockCase.caseNotes.map((note) => (
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
                          {note.isPrivate && (
                            <Badge
                              variant="outline"
                              className="text-xs text-red-600"
                            >
                              Private
                            </Badge>
                          )}
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
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                    <User className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800">
                    {mockCase.clientName}
                  </h4>
                  <p className="text-sm text-slate-600">
                    Age: {mockCase.clientDetails.age}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>{mockCase.clientDetails.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span>{mockCase.clientDetails.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span>{mockCase.clientDetails.email}</span>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <p className="mb-1 text-xs text-slate-600">
                    Emergency Contact
                  </p>
                  <p className="text-sm">
                    {mockCase.clientDetails.emergencyContact}
                  </p>
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
                  Generate Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Flag className="mr-2 h-4 w-4" />
                  Escalate Priority
                </Button>
              </CardContent>
            </Card>

            {/* Case Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Case Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCase.timeline.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${getTimelineColor(event.type)}`}
                      >
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {event.event}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(event.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCase.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded border border-slate-200 p-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {doc.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
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

export default CaseDetailsPage;
