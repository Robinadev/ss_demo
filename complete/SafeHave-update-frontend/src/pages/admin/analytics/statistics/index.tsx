import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Users, AlertTriangle, FileText } from 'lucide-react';

export function StatisticsPage() {
  // Mock statistics data
  const monthlyStats = [
    { month: 'Jan', users: 1200, incidents: 45, reports: 120 },
    { month: 'Feb', users: 1350, incidents: 52, reports: 135 },
    { month: 'Mar', users: 1580, incidents: 38, reports: 158 },
    { month: 'Apr', users: 1720, incidents: 41, reports: 172 },
    { month: 'May', users: 1890, incidents: 35, reports: 189 },
    { month: 'Jun', users: 2100, incidents: 48, reports: 210 },
  ];

  const userTypeData = [
    { name: 'Survivors', value: 65, color: '#8884d8' },
    { name: 'Counselors', value: 20, color: '#82ca9d' },
    { name: 'Medical', value: 10, color: '#ffc658' },
    { name: 'Legal', value: 3, color: '#ff7300' },
    { name: 'Moderators', value: 2, color: '#00ff00' },
  ];

  const keyStats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Active Incidents',
      value: '23',
      change: '-8%',
      icon: AlertTriangle,
      color: 'text-red-500',
    },
    {
      title: 'Reports Generated',
      value: '1,247',
      change: '+15%',
      icon: FileText,
      color: 'text-green-500',
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive statistical overview and data visualizations.
        </p>
      </div>

      {/* Key Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {keyStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{stat.value}</h2>
                    <span className="text-sm text-green-500">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#8884d8" name="Users" />
                <Bar dataKey="incidents" fill="#82ca9d" name="Incidents" />
                <Bar dataKey="reports" fill="#ffc658" name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Response Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Average Response</span>
                <span className="text-sm font-medium">120ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">95th Percentile</span>
                <span className="text-sm font-medium">250ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">99th Percentile</span>
                <span className="text-sm font-medium">500ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incident Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Violence</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Harassment</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Abuse</span>
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Daily Active Users</span>
                <span className="text-sm font-medium">892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Session Duration</span>
                <span className="text-sm font-medium">24min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Bounce Rate</span>
                <span className="text-sm font-medium">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
