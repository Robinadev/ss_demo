import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, AlertTriangle, CheckCircle } from 'lucide-react';

export function InsightsPage() {
  // Mock insights data
  const insights = [
    {
      title: 'User Engagement Increase',
      description:
        'User engagement has increased by 25% this month due to new features.',
      icon: TrendingUp,
      color: 'text-green-500',
      change: '+25%',
    },
    {
      title: 'Incident Resolution Time',
      description: 'Average incident resolution time has decreased by 15%.',
      icon: CheckCircle,
      color: 'text-blue-500',
      change: '-15%',
    },
    {
      title: 'New User Registrations',
      description:
        'New user registrations are up 40% compared to last quarter.',
      icon: Users,
      color: 'text-purple-500',
      change: '+40%',
    },
    {
      title: 'High-Priority Alerts',
      description:
        'High-priority alerts have increased by 10%, requiring attention.',
      icon: AlertTriangle,
      color: 'text-red-500',
      change: '+10%',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Insights</h1>
        <p className="text-muted-foreground mt-2">
          Key insights and trends from platform data and user behavior.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {insight.title}
              </CardTitle>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.change}</div>
              <p className="text-muted-foreground text-xs">
                {insight.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System Uptime</span>
              <span className="text-muted-foreground text-sm">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Response Time</span>
              <span className="text-muted-foreground text-sm">120ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Sessions</span>
              <span className="text-muted-foreground text-sm">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data Processing Rate</span>
              <span className="text-muted-foreground text-sm">2.5 GB/min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
