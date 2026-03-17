import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  TrendingUp,
  Eye,
  Activity,
  Database,
} from 'lucide-react';

export function AnalyticsPage() {
  const navigate = useNavigate();

  const analyticsStats = [
    {
      title: 'Total Reports',
      value: '1,247',
      icon: FileText,
      color: 'admin-theme-structure',
    },
    {
      title: 'Data Points',
      value: '45.2K',
      icon: Database,
      color: 'admin-success-icon',
    },
    {
      title: 'Active Dashboards',
      value: '12',
      icon: BarChart3,
      color: 'admin-theme-structure',
    },
    {
      title: 'Real-time Updates',
      value: '99.9%',
      icon: Activity,
      color: 'admin-alert-icon',
    },
  ];

  const analyticsSections = [
    {
      title: 'Reports',
      description:
        'Generate and download detailed reports for analysis and compliance',
      path: 'reports',
      icon: FileText,
      color: 'admin-theme-structure',
      features: ['Custom reports', 'Scheduled exports', 'Historical data'],
    },
    {
      title: 'Statistics',
      description: 'View comprehensive statistical data and visualizations',
      path: 'statistics',
      icon: BarChart3,
      color: 'admin-success-icon',
      features: ['Interactive charts', 'Trend analysis', 'Performance metrics'],
    },
    {
      title: 'Insights',
      description: 'Discover key insights and trends from platform data',
      path: 'insights',
      icon: Eye,
      color: 'admin-theme-structure',
      features: [
        'AI-powered insights',
        'Automated alerts',
        'Predictive analytics',
      ],
    },
  ];

  return (
    <div className="admin-theme-bg container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive analytics and reporting tools for data-driven decision
          making.
        </p>
      </div>

      {/* Analytics Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {analyticsSections.map((section, index) => (
          <Card key={index} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <section.icon className={`h-6 w-6 ${section.color}`} />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {section.description}
              </p>
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium">Features:</h4>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  {section.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => navigate(section.path)} className="w-full">
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Analytics Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="flex h-auto flex-col items-center gap-2 p-4"
            >
              <FileText className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-auto flex-col items-center gap-2 p-4"
            >
              <BarChart3 className="h-6 w-6" />
              <span>View Dashboard</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-auto flex-col items-center gap-2 p-4"
            >
              <Eye className="h-6 w-6" />
              <span>Latest Insights</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
