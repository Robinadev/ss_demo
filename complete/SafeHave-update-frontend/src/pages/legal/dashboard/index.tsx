import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Calendar, TrendingUp, Clock, AlertCircle, Scale, MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const recentCases = [
    { id: 1, title: 'Doe vs. Smith', status: 'Active', lastUpdate: '2 hours ago', priority: 'High' },
    { id: 2, title: 'Johnson Custody Case', status: 'Review', lastUpdate: '1 day ago', priority: 'Medium' },
    { id: 3, title: 'Estate Planning - Williams', status: 'Pending', lastUpdate: '3 days ago', priority: 'Low' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Court Hearing - Doe vs. Smith', date: 'Tomorrow, 2:00 PM', type: 'hearing' },
    { id: 2, title: 'Client Consultation - Johnson', date: 'Mar 12, 10:00 AM', type: 'consultation' },
    { id: 3, title: 'Deadline - Evidence Submission', date: 'Mar 15, 5:00 PM', type: 'deadline' },
  ];

  const quickActions = [
    { title: 'New Case', icon: FileText, color: 'bg-blue-500', href: '/legal/cases/new' },
    { title: 'Schedule Consultation', icon: Calendar, color: 'bg-green-500', href: '/legal/consultations/new' },
    { title: 'Upload Document', icon: Scale, color: 'bg-purple-500', href: '/legal/documents/upload' },
    { title: 'Message Client', icon: MessageSquare, color: 'bg-orange-500', href: '/legal/messaging' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Legal Provider Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your legal cases and activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => navigate('/legal/cases')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">+2 from last month</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => navigate('/legal/consultations')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultations</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-muted-foreground text-xs">This week</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => navigate('/legal/court-calendar')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Court Dates</CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-muted-foreground text-xs">Next 30 days</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => navigate('/legal/outcomes')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-muted-foreground text-xs">
              +5% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 text-center cursor-pointer rounded-lg border hover:bg-accent transition-colors"
                onClick={() => navigate(action.href)}
              >
                <div className={`${action.color} p-3 rounded-full text-white mb-2`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Cases */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Cases</CardTitle>
            <button
              onClick={() => navigate('/legal/cases')}
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-medium">{case_.title}</h4>
                    <p className="text-sm text-muted-foreground">{case_.lastUpdate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      case_.priority === 'High' ? 'bg-red-100 text-red-800' :
                      case_.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {case_.priority}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {case_.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Events</CardTitle>
            <button
              onClick={() => navigate('/legal/court-calendar')}
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              View calendar
              <ArrowRight className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className={`p-2 rounded-full ${
                    event.type === 'hearing' ? 'bg-red-100 text-red-600' :
                    event.type === 'consultation' ? 'bg-blue-100 text-blue-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {event.type === 'hearing' ? <Scale className="h-4 w-4" /> :
                     event.type === 'consultation' ? <Users className="h-4 w-4" /> :
                     <Clock className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <p className="text-sm text-muted-foreground">Client Satisfaction</p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">4.8</div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">24h</div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
