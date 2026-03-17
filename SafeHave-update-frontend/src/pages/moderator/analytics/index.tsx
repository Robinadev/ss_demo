import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  Users,
  AlertTriangle,
  Eye,
  Activity,
} from 'lucide-react';

const Analytics = () => {
  const navigate = useNavigate();

  const getIcon = (title: string) => {
    switch (title) {
      case 'Total Moderated': return FileText;
      case 'Active Flags': return AlertTriangle;
      case 'Flagged Users': return Users;
      case 'Review Queue': return Activity;
      default: return FileText;
    }
  };

  const getSectionIcon = (title: string) => {
    switch (title) {
      case 'Moderation Reports': return FileText;
      case 'Content Analytics': return BarChart3;
      case 'User Behavior': return Users;
      default: return FileText;
    }
  };

  const analyticsStats = [
    {
      title: 'Total Moderated',
      value: '2,847',
      icon: FileText,
      color: 'text-blue-500',
    },
    {
      title: 'Active Flags',
      value: '156',
      icon: AlertTriangle,
      color: 'text-red-500',
    },
    {
      title: 'Flagged Users',
      value: '23',
      icon: Users,
      color: 'text-orange-500',
    },
    {
      title: 'Review Queue',
      value: '89',
      icon: Activity,
      color: 'text-green-500',
    },
  ];

  const analyticsSections = [
    {
      title: 'Moderation Reports',
      description: 'View detailed reports on moderation activities and trends',
      path: '/moderator/analytics/reports',
      icon: FileText,
      color: 'text-blue-500',
      features: ['Action logs', 'Trend analysis', 'Performance metrics'],
    },
    {
      title: 'Content Analytics',
      description: 'Analyze content moderation patterns and effectiveness',
      path: '/moderator/analytics/content',
      icon: BarChart3,
      color: 'text-purple-500',
      features: ['Content types', 'Moderation rates', 'Success rates'],
    },
    {
      title: 'User Behavior',
      description: 'Monitor user behavior patterns and flag triggers',
      path: '/moderator/analytics/users',
      icon: Users,
      color: 'text-green-500',
      features: ['User activity', 'Flag history', 'Risk assessment'],
    },
  ];

  return (
    <div className="min-h-screen pb-20 font-sans moderator-bg">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            View moderation analytics and reports.
          </p>
        </div>

      {/* Key Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat, index) => {
          const Icon = getIcon(stat.title);
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <h2 className="text-2xl font-bold">{stat.value}</h2>
                    <p className="text-muted-foreground text-xs">
                      +12% this week
                    </p>
                  </div>
                  <Icon className={'h-8 w-8 ' + stat.color} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {analyticsSections.map((section, index) => {
          const Icon = getSectionIcon(section.title);
          return (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className={'h-6 w-6 ' + section.color} />
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  {section.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-1">
                  {section.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate(section.path)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </div>
  );
};

export default Analytics;
