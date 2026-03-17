import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Shield,
} from 'lucide-react';

export function ProviderVerificationPage() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Providers',
      value: '247',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Verified Providers',
      value: '189',
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'Pending Verification',
      value: '34',
      icon: Clock,
      color: 'text-orange-500',
    },
    {
      title: 'Rejected Applications',
      value: '24',
      icon: AlertTriangle,
      color: 'text-red-500',
    },
  ];

  const sections = [
    {
      title: 'Pending Providers',
      description: 'Review and verify new provider applications',
      count: 34,
      path: 'pending-providers',
      icon: Clock,
      color: 'text-orange-500',
    },
    {
      title: 'Verified Providers',
      description: 'Manage active and verified service providers',
      count: 189,
      path: 'verified-providers',
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'Verification Process',
      description: 'Configure verification requirements and workflows',
      count: null,
      path: 'verification-process',
      icon: Shield,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Provider Verification</h1>
        <p className="text-muted-foreground mt-2">
          Manage and verify service providers across the platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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

      {/* Verification Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <Card key={index} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <section.icon className={`h-6 w-6 ${section.color}`} />
                {section.title}
                {section.count && (
                  <Badge variant="secondary">{section.count}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {section.description}
              </p>
              <Button onClick={() => navigate(section.path)} className="w-full">
                Manage
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Verification Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="font-medium">Legal Aid Center verified</p>
                <p className="text-muted-foreground text-sm">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <Clock className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <p className="font-medium">
                  New application from Counseling Services
                </p>
                <p className="text-muted-foreground text-sm">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <p className="font-medium">
                  Application rejected - Missing documentation
                </p>
                <p className="text-muted-foreground text-sm">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
