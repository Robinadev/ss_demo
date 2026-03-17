import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Users,
  Shield,
  Clock,
  CheckCircle2,
  MessageCircle,
  Plus,
  Mic,
  Search,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Calendar,
  LifeBuoy,
  User,
  Briefcase,
  UserSearch,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function VictimDashboardPage() {
  const activeCases = [
    {
      id: 'SH-2026-ETH',
      type: 'Safety Support',
      status: 'Actively Supported',
      lastUpdate: '45m ago',
      progress: 65,
      milestone: 'Healing Plan Created',
      priority: 'high',
      stages: ['Reported', 'Reviewing', 'Assigned', 'Ongoing Support'],
      currentStage: 3,
      counselor: 'Dr. Selamawit',
    },
  ];

  const quickActions = [
    {
      icon: Mic,
      title: 'Voice Report',
      description: 'Record a secure voice message',
      path: '/survivor/messages',
      color: 'var(--role-survivor-primary)',
    },
    {
      icon: Shield,
      title: 'Safety Plan',
      description: 'Update your safety preferences',
      path: '/survivor/safety',
      color: 'var(--role-survivor-accent)',
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with support community',
      path: '/survivor/community-forum',
      color: 'var(--role-survivor-text)',
    },
    {
      icon: FileText,
      title: 'Report Incident',
      description: 'File a new confidential report',
      path: '/report',
      color: 'var(--role-survivor-primary)',
    },
  ];

  const resources = [
    {
      icon: Heart,
      title: 'Crisis Hotline',
      description: '24/7 emergency support',
      available: true,
    },
    {
      icon: Users,
      title: 'Peer Support Groups',
      description: 'Weekly virtual meetings',
      available: true,
    },
    {
      icon: Shield,
      title: 'Legal Aid',
      description: 'Free legal consultation',
      available: false,
    },
  ];

  const currentCase = activeCases[0];

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--role-survivor-bg)' }}>
      {/* Header */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--role-survivor-primary)' }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--role-survivor-text)' }}>
              Your safety and progress matter most
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="space-y-6 lg:col-span-2">
          {/* Current Case Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" style={{ color: 'var(--role-survivor-primary)' }} />
                  Active Case
                </CardTitle>
                <Badge className="bg-green-100 text-green-800">
                  {currentCase.status}
                </Badge>
              </div>
              <CardDescription>Case ID: {currentCase.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{currentCase.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ backgroundColor: 'var(--role-survivor-primary)', width: `${currentCase.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Counselor:</span>
                    <p className="font-medium">{currentCase.counselor}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Update:</span>
                    <p className="font-medium">{currentCase.lastUpdate}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">
                    Current Milestone:
                  </span>
                  <p className="font-medium text-green-600">
                    {currentCase.milestone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.path}>
                  <Card className="cursor-pointer border-0 p-4 transition-shadow hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg p-2" style={{ backgroundColor: action.color }}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-sm text-gray-500">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resources */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Available Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <resource.icon className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{resource.title}</p>
                        <p className="text-xs text-gray-500">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`h-2 w-2 rounded-full ${resource.available ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Contact */}
          <Card className="border-0 text-white shadow-lg" style={{ background: 'linear-gradient(to bottom right, var(--role-survivor-primary), var(--role-survivor-accent))', boxShadow: 'var(--role-survivor-shadow)' }}>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <LifeBuoy className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">Need Help?</h3>
                  <p className="text-sm opacity-90">24/7 Support Available</p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full text-white border-0"
                style={{ backgroundColor: 'var(--role-survivor-text)' }}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
