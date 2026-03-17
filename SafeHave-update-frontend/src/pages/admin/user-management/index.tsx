import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Key, UserCheck, UserX, Crown } from 'lucide-react';

export function UserManagementPage() {
  const navigate = useNavigate();

  const userStats = [
    {
      title: 'Total Users',
      value: '2,847',
      icon: Users,
      color: 'admin-theme-structure',
    },
    {
      title: 'Active Users',
      value: '2,156',
      icon: UserCheck,
      color: 'admin-success-icon',
    },
    {
      title: 'Inactive Users',
      value: '691',
      icon: UserX,
      color: 'admin-alert-icon',
    },
    {
      title: 'Admin Users',
      value: '12',
      icon: Crown,
      color: 'admin-theme-structure',
    },
  ];

  const managementSections = [
    {
      title: 'Users',
      description: 'View and manage all system users',
      count: 2847,
      path: 'users',
      icon: Users,
      color: 'admin-theme-structure',
    },
    {
      title: 'Roles',
      description: 'Manage user roles and permissions',
      count: 5,
      path: 'roles',
      icon: Shield,
      color: 'admin-success-icon',
    },
    {
      title: 'Permissions',
      description: 'Configure system permissions',
      count: 24,
      path: 'permissions',
      icon: Key,
      color: 'admin-theme-structure',
    },
  ];

  return (
    <div className="admin-theme-bg container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Oversee user accounts, roles, permissions, and access control across
          the platform.
        </p>
      </div>

      {/* User Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat, index) => (
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

      {/* Management Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {managementSections.map((section, index) => (
          <Card key={index} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <section.icon className={`h-6 w-6 ${section.color}`} />
                {section.title}
                <Badge variant="secondary">{section.count}</Badge>
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

      {/* Recent User Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent User Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <UserCheck className="h-5 w-5 admin-success-icon" />
              <div className="flex-1">
                <p className="font-medium">New user registered</p>
                <p className="text-muted-foreground text-sm">
                  john.doe@example.com - 5 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <Shield className="h-5 w-5 admin-theme-structure" />
              <div className="flex-1">
                <p className="font-medium">Role updated</p>
                <p className="text-muted-foreground text-sm">
                  jane.smith promoted to Moderator - 1 hour ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <Key className="h-5 w-5 admin-theme-structure" />
              <div className="flex-1">
                <p className="font-medium">Permissions changed</p>
                <p className="text-muted-foreground text-sm">
                  Admin permissions granted to support team - 2 hours ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
