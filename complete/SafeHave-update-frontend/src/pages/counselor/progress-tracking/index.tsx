import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle,
  Clock,
  Calendar,
  User,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  Edit,
  Filter,
  Download,
  Upload,
  Award,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  Star,
  Eye,
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
import { Link } from 'react-router-dom';

const mockClientProgress = [
  {
    id: 'progress-1',
    clientName: 'Sarah M.',
    clientId: 'client-1',
    caseType: 'Emergency Shelter',
    overallProgress: 65,
    counselor: 'Grace Thompson',
    startDate: '2024-01-15',
    lastAssessment: '2024-01-20',
    riskLevel: 'High',
    status: 'On Track',
    goals: [
      {
        id: 'goal-1',
        title: 'Secure stable housing',
        description: 'Find and secure long-term housing solution',
        status: 'In Progress',
        progress: 70,
        targetDate: '2024-02-15',
        milestones: [
          {
            title: 'Complete housing application',
            completed: true,
            completedDate: '2024-01-18',
          },
          {
            title: 'Interview with housing authority',
            completed: true,
            completedDate: '2024-01-19',
          },
          {
            title: 'Receive housing approval',
            completed: false,
            targetDate: '2024-02-01',
          },
          {
            title: 'Move into new housing',
            completed: false,
            targetDate: '2024-02-15',
          },
        ],
      },
      {
        id: 'goal-2',
        title: 'Develop safety plan',
        description:
          'Create comprehensive safety plan for domestic violence protection',
        status: 'Completed',
        progress: 100,
        targetDate: '2024-01-25',
        milestones: [
          {
            title: 'Identify safe locations',
            completed: true,
            completedDate: '2024-01-16',
          },
          {
            title: 'Establish emergency contacts',
            completed: true,
            completedDate: '2024-01-16',
          },
          {
            title: 'Create exit strategy',
            completed: true,
            completedDate: '2024-01-20',
          },
        ],
      },
    ],
    assessments: [
      {
        id: 'assessment-1',
        type: 'Initial Risk Assessment',
        date: '2024-01-15',
        score: 8,
        maxScore: 10,
        status: 'High Risk',
        notes:
          'Client shows high risk indicators for domestic violence recurrence',
      },
      {
        id: 'assessment-2',
        type: 'Progress Assessment',
        date: '2024-01-20',
        score: 6,
        maxScore: 10,
        status: 'Medium Risk',
        notes:
          'Significant improvement in safety planning and housing stability',
      },
    ],
    sessions: [
      {
        date: '2024-01-16',
        type: 'Initial Assessment',
        attended: true,
        duration: 60,
        notes: 'Good engagement, safety plan initiated',
      },
      {
        date: '2024-01-18',
        type: 'Follow-up',
        attended: true,
        duration: 45,
        notes: 'Housing application submitted',
      },
      {
        date: '2024-01-22',
        type: 'Counseling Session',
        attended: null,
        duration: 60,
        notes: 'Scheduled',
      },
    ],
  },
  {
    id: 'progress-2',
    clientName: 'Maria G.',
    clientId: 'client-3',
    caseType: 'Trauma Recovery',
    overallProgress: 80,
    counselor: 'Grace Thompson',
    startDate: '2024-01-10',
    lastAssessment: '2024-01-19',
    riskLevel: 'Medium',
    status: 'Excellent Progress',
    goals: [
      {
        id: 'goal-3',
        title: 'Reduce PTSD symptoms',
        description:
          'Decrease frequency and intensity of trauma-related symptoms',
        status: 'In Progress',
        progress: 85,
        targetDate: '2024-03-10',
        milestones: [
          {
            title: 'Complete EMDR therapy sessions',
            completed: false,
            targetDate: '2024-02-15',
          },
          {
            title: 'Reduce anxiety episodes by 50%',
            completed: true,
            completedDate: '2024-01-19',
          },
          {
            title: 'Improve sleep quality',
            completed: true,
            completedDate: '2024-01-17',
          },
        ],
      },
    ],
    assessments: [
      {
        id: 'assessment-3',
        type: 'PCL-5 Assessment',
        date: '2024-01-10',
        score: 45,
        maxScore: 80,
        status: 'Severe',
        notes: 'High PTSD symptom severity',
      },
      {
        id: 'assessment-4',
        type: 'PCL-5 Assessment',
        date: '2024-01-19',
        score: 28,
        maxScore: 80,
        status: 'Moderate',
        notes: 'Significant reduction in symptoms after EMDR therapy',
      },
    ],
    sessions: [
      {
        date: '2024-01-12',
        type: 'Initial Assessment',
        attended: true,
        duration: 90,
        notes: 'EMDR therapy recommended',
      },
      {
        date: '2024-01-17',
        type: 'EMDR Session',
        attended: true,
        duration: 60,
        notes: 'Good progress on trauma processing',
      },
      {
        date: '2024-01-23',
        type: 'Follow-up',
        attended: null,
        duration: 60,
        notes: 'Scheduled',
      },
    ],
  },
  {
    id: 'progress-3',
    clientName: 'James K.',
    clientId: 'client-5',
    caseType: 'Substance Abuse',
    overallProgress: 30,
    counselor: 'Grace Thompson',
    startDate: '2024-01-08',
    lastAssessment: '2024-01-18',
    riskLevel: 'High',
    status: 'Needs Attention',
    goals: [
      {
        id: 'goal-4',
        title: 'Achieve sobriety',
        description: 'Maintain abstinence from alcohol for 30 consecutive days',
        status: 'In Progress',
        progress: 25,
        targetDate: '2024-02-08',
        milestones: [
          {
            title: 'Complete detoxification',
            completed: true,
            completedDate: '2024-01-12',
          },
          {
            title: 'Attend AA meetings (5 sessions)',
            completed: false,
            targetDate: '2024-01-25',
          },
          { title: 'Find sponsor', completed: false, targetDate: '2024-01-30' },
        ],
      },
    ],
    assessments: [
      {
        id: 'assessment-5',
        type: 'AUDIT Assessment',
        date: '2024-01-08',
        score: 32,
        maxScore: 40,
        status: 'Severe Dependence',
        notes: 'High risk for severe alcohol dependence',
      },
      {
        id: 'assessment-6',
        type: 'Progress Check',
        date: '2024-01-18',
        score: 8,
        maxScore: 10,
        status: 'Moderate',
        notes: 'Some improvement but inconsistent attendance',
      },
    ],
    sessions: [
      {
        date: '2024-01-10',
        type: 'Initial Assessment',
        attended: true,
        duration: 75,
        notes: 'Motivated but struggling',
      },
      {
        date: '2024-01-17',
        type: 'Counseling Session',
        attended: true,
        duration: 60,
        notes: 'Discussed relapse prevention strategies',
      },
      {
        date: '2024-01-21',
        type: 'Group Session',
        attended: null,
        duration: 90,
        notes: 'Scheduled',
      },
    ],
  },
];

const progressStatuses = [
  'All',
  'Excellent Progress',
  'On Track',
  'Needs Attention',
  'At Risk',
];
const riskLevels = ['All', 'High', 'Medium', 'Low'];

type ClientProgress = {
  id: string;
  clientName: string;
  clientId: string;
  caseType: string;
  overallProgress: number;
  counselor: string;
  startDate: string;
  lastAssessment: string;
  riskLevel: string;
  status: string;
  goals: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    progress: number;
    targetDate: string;
    milestones: Array<{
      title: string;
      completed: boolean;
      completedDate?: string;
      targetDate?: string;
    }>;
  }>;
  assessments: Array<{
    id: string;
    type: string;
    date: string;
    score: number;
    maxScore: number;
    status: string;
    notes: string;
  }>;
  sessions: Array<{
    date: string;
    type: string;
    attended: boolean | null;
    duration: number;
    notes: string;
  }>;
};

function ProgressTrackingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [selectedClient, setSelectedClient] = useState<ClientProgress | null>(
    null
  );
  const [viewMode, setViewMode] = useState('overview'); // "overview" or "detail"

  const filteredClients = useMemo(() => {
    return mockClientProgress.filter((client) => {
      const matchesSearch =
        client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.caseType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || client.status === statusFilter;
      const matchesRisk =
        riskFilter === 'All' || client.riskLevel === riskFilter;
      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [searchQuery, statusFilter, riskFilter]);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 60) return 'bg-[var(--role-counselor-primary)]';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent Progress':
        return 'bg-emerald-100 text-emerald-800';
      case 'On Track':
        return 'bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]';
      case 'Needs Attention':
        return 'bg-amber-100 text-amber-800';
      case 'At Risk':
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

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'In Progress':
        return 'bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]';
      case 'Not Started':
        return 'bg-slate-100 text-slate-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getMilestoneStatus = (milestone: any) => {
    if (milestone.completed) return 'completed';
    const today = new Date();
    const targetDate = new Date(milestone.targetDate);
    if (today > targetDate) return 'overdue';
    return 'pending';
  };

  // Calculate statistics
  const totalClients = mockClientProgress.length;
  const excellentProgress = mockClientProgress.filter(
    (c) => c.status === 'Excellent Progress'
  ).length;
  const onTrack = mockClientProgress.filter(
    (c) => c.status === 'On Track'
  ).length;
  const needsAttention = mockClientProgress.filter(
    (c) => c.status === 'Needs Attention'
  ).length;
  const avgProgress = Math.round(
    mockClientProgress.reduce((sum, c) => sum + c.overallProgress, 0) /
      mockClientProgress.length
  );

  if (viewMode === 'detail' && selectedClient) {
    return (
      <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedClient(null);
                  setViewMode('overview');
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Progress Overview
              </Button>
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-[var(--role-counselor-primary)]" />
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    Progress Details: {selectedClient.clientName}
                  </h1>
                  <p className="mt-1 text-slate-600">
                    Case Type: {selectedClient.caseType} • Started:{' '}
                    {new Date(selectedClient.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Assessment
              </Button>
            </div>
          </div>

          {/* Overall Progress */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Overall Progress
                    </span>
                    <Badge className={getStatusColor(selectedClient.status)}>
                      {selectedClient.status}
                    </Badge>
                  </div>
                  <div className="mb-2 text-3xl font-bold text-slate-800">
                    {selectedClient.overallProgress}%
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-200">
                    <div
                      className={`h-3 rounded-full ${getProgressColor(selectedClient.overallProgress)}`}
                      style={{ width: `${selectedClient.overallProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-sm font-medium text-slate-600">
                    Goals Completed
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {
                      selectedClient.goals.filter(
                        (g) => g.status === 'Completed'
                      ).length
                    }
                  </div>
                  <div className="text-sm text-slate-500">
                    of {selectedClient.goals.length}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-sm font-medium text-slate-600">
                    Sessions Attended
                  </div>
                  <div className="text-2xl font-bold text-[var(--role-counselor-primary)]">
                    {
                      selectedClient.sessions.filter((s) => s.attended === true)
                        .length
                    }
                  </div>
                  <div className="text-sm text-slate-500">
                    of {selectedClient.sessions.length}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-sm font-medium text-slate-600">
                    Risk Level
                  </div>
                  <Badge className={getRiskColor(selectedClient.riskLevel)}>
                    {selectedClient.riskLevel}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Treatment Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedClient.goals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-slate-800">
                          {goal.title}
                        </h4>
                        <Badge className={getGoalStatusColor(goal.status)}>
                          {goal.status}
                        </Badge>
                      </div>
                      <p className="mb-3 text-slate-700">{goal.description}</p>
                      <div className="mb-3 flex items-center gap-4 text-sm text-slate-600">
                        <span>
                          Target:{' '}
                          {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                        <span>Progress: {goal.progress}%</span>
                      </div>
                      <div className="mb-4 h-2 w-full rounded-full bg-slate-200">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h5 className="mb-3 font-medium text-slate-800">
                      Milestones
                    </h5>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full ${
                              milestone.completed
                                ? 'bg-emerald-500'
                                : getMilestoneStatus(milestone) === 'overdue'
                                  ? 'bg-red-500'
                                  : 'bg-slate-300'
                            }`}
                          >
                            {milestone.completed && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              milestone.completed
                                ? 'text-emerald-700 line-through'
                                : getMilestoneStatus(milestone) === 'overdue'
                                  ? 'text-red-700'
                                  : 'text-slate-700'
                            }`}
                          >
                            {milestone.title}
                          </span>
                          <span className="ml-auto text-xs text-slate-500">
                            {milestone.completed
                              ? `Completed ${milestone.completedDate ? new Date(milestone.completedDate).toLocaleDateString() : ''}`
                              : milestone.targetDate
                                ? `Due ${new Date(milestone.targetDate).toLocaleDateString()}`
                                : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Assessments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Assessments & Measurements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedClient.assessments.map((assessment) => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                  >
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h4 className="font-semibold text-slate-800">
                          {assessment.type}
                        </h4>
                        <Badge variant="outline">
                          {new Date(assessment.date).toLocaleDateString()}
                        </Badge>
                      </div>
                      <div className="mb-2 flex items-center gap-4 text-sm text-slate-600">
                        <span>
                          Score: {assessment.score}/{assessment.maxScore}
                        </span>
                        <span>Status: {assessment.status}</span>
                      </div>
                      <p className="text-sm text-slate-700">
                        {assessment.notes}
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-800">
                          {assessment.score}/{assessment.maxScore}
                        </div>
                        <div className="mt-1 h-2 w-16 rounded-full bg-slate-200">
                          <div
                            className={`h-2 rounded-full ${getProgressColor((assessment.score / assessment.maxScore) * 100)}`}
                            style={{
                              width: `${(assessment.score / assessment.maxScore) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Session History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Session History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedClient.sessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium">{session.type}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(session.date).toLocaleDateString()} •{' '}
                          {session.duration} minutes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          session.attended === true
                            ? 'bg-emerald-100 text-emerald-800'
                            : session.attended === false
                              ? 'bg-red-100 text-red-800'
                              : 'bg-slate-100 text-slate-800'
                        }
                      >
                        {session.attended === true
                          ? 'Attended'
                          : session.attended === false
                            ? 'Missed'
                            : 'Scheduled'}
                      </Badge>
                      {session.notes && (
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
              <TrendingUp className="h-8 w-8 text-[var(--role-counselor-primary)]" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Progress Tracking
                </h1>
                <p className="mt-1 text-slate-600">
                  Monitor client progress and treatment outcomes
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Clients
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {totalClients}
                  </p>
                </div>
                <User className="h-8 w-8 text-[var(--role-counselor-primary)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Excellent Progress
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {excellentProgress}
                  </p>
                  <p className="text-xs text-emerald-600">
                    {Math.round((excellentProgress / totalClients) * 100)}% of
                    clients
                  </p>
                </div>
                <Award className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">On Track</p>
                  <p className="text-3xl font-bold text-slate-800">{onTrack}</p>
                  <p className="text-xs text-[var(--role-counselor-accent)]">
                    {Math.round((onTrack / totalClients) * 100)}% of clients
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Needs Attention
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {needsAttention}
                  </p>
                  <p className="text-xs text-amber-600">
                    {Math.round((needsAttention / totalClients) * 100)}% of
                    clients
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
                    Avg Progress
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {avgProgress}%
                  </p>
                  <p className="text-xs text-slate-500">across all clients</p>
                </div>
                <BarChart3 className="h-8 w-8 text-slate-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by progress status"
                >
                  {progressStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  aria-label="Filter by risk level"
                >
                  {riskLevels.map((risk) => (
                    <option key={risk} value={risk}>
                      {risk} Risk
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Progress Cards */}
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--role-counselor-secondary)]/30">
                      <User className="h-6 w-6 text-[var(--role-counselor-text)]" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {client.clientName}
                        </h3>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                        <Badge className={getRiskColor(client.riskLevel)}>
                          {client.riskLevel} Risk
                        </Badge>
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-4">
                        <div>
                          <strong>Case Type:</strong> {client.caseType}
                        </div>
                        <div>
                          <strong>Counselor:</strong> {client.counselor}
                        </div>
                        <div>
                          <strong>Started:</strong>{' '}
                          {new Date(client.startDate).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Last Assessment:</strong>{' '}
                          {new Date(client.lastAssessment).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Overall Progress */}
                      <div className="mb-4">
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-slate-600">
                            Overall Progress
                          </span>
                          <span className="font-medium">
                            {client.overallProgress}%
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-slate-200">
                          <div
                            className={`h-3 rounded-full ${getProgressColor(client.overallProgress)}`}
                            style={{ width: `${client.overallProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Goals Summary */}
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-600">
                            {
                              client.goals.filter(
                                (g) => g.status === 'Completed'
                              ).length
                            }
                          </div>
                          <div className="text-xs text-slate-600">
                            Goals Completed
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-[var(--role-counselor-primary)]">
                            {
                              client.goals.filter(
                                (g) => g.status === 'In Progress'
                              ).length
                            }
                          </div>
                          <div className="text-xs text-slate-600">
                            In Progress
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-600">
                            {
                              client.sessions.filter((s) => s.attended === true)
                                .length
                            }
                            /{client.sessions.length}
                          </div>
                          <div className="text-xs text-slate-600">
                            Sessions Attended
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedClient(client);
                            setViewMode('detail');
                          }}
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-1 h-4 w-4" />
                          Add Assessment
                        </Button>
                        <Button variant="outline" size="sm">
                          <Target className="mr-1 h-4 w-4" />
                          Update Goals
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          Add Progress Note
                        </Button>
                      </div>
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
              <TrendingUp className="mx-auto mb-4 h-12 w-12 text-slate-400" />
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

export default ProgressTrackingPage;
