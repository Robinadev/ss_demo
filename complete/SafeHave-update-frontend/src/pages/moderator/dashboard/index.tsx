import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Eye,
  Users,
  MessageCircle,
  CheckCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';

const ModeratorDashboardPage = () => {
  const navigate = useNavigate();

  const dashboardStats = [
    {
      title: 'Pending Reviews',
      value: '47',
      icon: Eye,
      color: 'text-orange-500',
      change: '+12 today',
    },
    {
      title: 'Active Flags',
      value: '23',
      icon: AlertTriangle,
      color: 'text-red-500',
      change: '-5 today',
    },
    {
      title: 'Total Users',
      value: '1,247',
      icon: Users,
      color: 'text-blue-500',
      change: '+23 this week',
    },
    {
      title: 'Forum Posts',
      value: '892',
      icon: MessageCircle,
      color: 'text-green-500',
      change: '+67 today',
    },
  ];

  const recentActivities = [
    {
      type: 'report',
      message: 'New content report in General Discussion',
      time: '5 min ago',
      priority: 'high',
    },
    {
      type: 'flag',
      message: 'User flagged for inappropriate behavior',
      time: '12 min ago',
      priority: 'medium',
    },
    {
      type: 'review',
      message: 'Thread review completed',
      time: '1 hour ago',
      priority: 'low',
    },
    {
      type: 'user',
      message: 'New user registration requires review',
      time: '2 hours ago',
      priority: 'medium',
    },
  ];

  const quickActions = [
    {
      title: 'Review Queue',
      description: 'Check pending content reviews',
      path: '/moderator/content-moderation',
      icon: Eye,
    },
    {
      title: 'Reported Content',
      description: 'Manage forum reports',
      path: '/moderator/forums/reported-content',
      icon: AlertTriangle,
    },
    {
      title: 'User Management',
      description: 'Review flagged users',
      path: '/moderator/user-management',
      icon: Users,
    },
    {
      title: 'Analytics',
      description: 'View moderation stats',
      path: '/moderator/analytics',
      icon: TrendingUp,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'flag':
        return <Users className="h-4 w-4 text-orange-500" />;
      case 'review':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'user':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <Badge className="rounded-lg px-3 py-1 text-[9px] font-black tracking-widest uppercase" style={{ backgroundColor: 'rgba(var(--role-moderator-alert-rgb), 0.1)', color: 'var(--role-moderator-alert)', border: 'none' }}>
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="rounded-lg px-3 py-1 text-[9px] font-black tracking-widest uppercase" style={{ backgroundColor: 'rgba(var(--role-moderator-primary-rgb), 0.1)', color: 'var(--role-moderator-primary)', border: 'none' }}>
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge className="rounded-lg px-3 py-1 text-[9px] font-black tracking-widest uppercase" style={{ backgroundColor: 'var(--role-moderator-neutral)', color: 'var(--role-moderator-primary)', border: 'none' }}>
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20 font-sans" style={{ backgroundColor: 'var(--role-moderator-bg)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2">Moderator Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of moderation activities and statistics.
          </p>
        </div>

      {/* Key Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <h2 className="text-2xl font-bold">{stat.value}</h2>
                  <p className="text-muted-foreground text-xs">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        {activity.time}
                      </span>
                      {getPriorityBadge(activity.priority)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto justify-start p-4"
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className="text-muted-foreground mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-muted-foreground text-sm">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
};

export default ModeratorDashboardPage;
