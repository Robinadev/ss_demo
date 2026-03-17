import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  Calendar,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  // Mock data - in real app, this would come from API
  const stats = {
    totalPatients: 1247,
    activeCases: 89,
    pendingExams: 23,
    todayAppointments: 12,
  };

  const recentPatients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastVisit: '2024-02-20',
      status: 'active',
      priority: 'high',
    },
    {
      id: 2,
      name: 'Michael Chen',
      lastVisit: '2024-02-19',
      status: 'follow-up',
      priority: 'medium',
    },
    {
      id: 3,
      name: 'Emma Davis',
      lastVisit: '2024-02-18',
      status: 'completed',
      priority: 'low',
    },
    {
      id: 4,
      name: 'David Wilson',
      lastVisit: '2024-02-17',
      status: 'active',
      priority: 'high',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '09:00 AM',
      type: 'Follow-up Exam',
    },
    { id: 2, patient: 'Michael Chen', time: '11:30 AM', type: 'Consultation' },
    {
      id: 3,
      patient: 'Emma Davis',
      time: '02:00 PM',
      type: 'Treatment Review',
    },
  ];

  const handleAddPatient = () => {
    // Navigate to add patient page or open modal
    console.log('Add Patient clicked');
    navigate('/medical-provider/patients');
  };

  const handleNewExam = () => {
    // Navigate to new examination page
    console.log('New Exam clicked');
    navigate('/medical-provider/examinations');
  };

  const handleSchedule = () => {
    // Navigate to scheduling page
    console.log('Schedule clicked');
    navigate('/medical-provider/appointments');
  };

  const handleAlerts = () => {
    // Navigate to alerts page
    console.log('Alerts clicked');
    navigate('/medical-provider/alerts');
  };

  const handleViewAllPatients = () => {
    // Navigate to patients page
    console.log('View All Patients clicked');
    navigate('/medical-provider/patients');
  };

  const handleManageAppointments = () => {
    // Navigate to appointments page
    console.log('Manage Appointments clicked');
    navigate('/medical-provider/appointments');
  };

  return (
    <div className="container mx-auto px-4 py-12 medical-theme-bg">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold medical-theme-text">Medical Provider Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your medical practice and patient management.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 medical-theme-grid">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalPatients.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCases}</div>
            <p className="text-muted-foreground text-xs">
              Currently under care
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Exams</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingExams}</div>
            <p className="text-muted-foreground text-xs">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayAppointments}</div>
            <p className="text-muted-foreground text-xs">Scheduled for today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-muted-foreground text-sm">
                      Last visit: {patient.lastVisit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        patient.priority === 'high' ? 'medical-badge-high' :
                        patient.priority === 'medium' ? 'medical-badge-medium' :
                        'medical-badge-low'
                      }
                    >
                      {patient.priority}
                    </Badge>
                    <Badge variant="outline">{patient.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={handleViewAllPatients}
            >
              View All Patients
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-muted-foreground text-sm">
                      {appointment.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={handleManageAppointments}
            >
              Manage Appointments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Button 
              className="flex h-20 flex-col items-center gap-2 medical-button-primary"
              onClick={handleAddPatient}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Add Patient</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center gap-2"
              onClick={handleNewExam}
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">New Exam</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center gap-2"
              onClick={handleSchedule}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center gap-2"
              onClick={handleAlerts}
            >
              <AlertTriangle className="h-6 w-6 medical-alert-icon" />
              <span className="text-sm">Alerts</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
