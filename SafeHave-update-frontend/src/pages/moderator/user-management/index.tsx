import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  UserCheck,
  UserX,
  AlertTriangle,
  MoreHorizontal,
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'SURVIVOR',
      status: 'ACTIVE',
      flags: 0,
      lastActive: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'COUNSELOR',
      status: 'ACTIVE',
      flags: 1,
      lastActive: '2024-01-14',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'SURVIVOR',
      status: 'SUSPENDED',
      flags: 3,
      lastActive: '2024-01-10',
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'MEDICAL_PROFESSIONAL',
      status: 'ACTIVE',
      flags: 0,
      lastActive: '2024-01-15',
    },
  ];

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <Badge variant="default" style={{ backgroundColor: 'var(--role-moderator-success)', color: 'white' }}>
            Active
          </Badge>
        );
      case 'SUSPENDED':
        return <Badge variant="destructive" style={{ backgroundColor: 'var(--role-moderator-alert)', color: 'white' }}>Suspended</Badge>;
      case 'INACTIVE':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      SURVIVOR: 'bg-blue-500',
      COUNSELOR: 'bg-purple-500',
      MEDICAL_PROFESSIONAL: 'bg-green-500',
      LEGAL_ADVISOR: 'bg-orange-500',
      ADMIN: 'bg-red-500',
      MODERATOR: 'var(--role-moderator-primary)',
    };
    return (
      <Badge
        variant="default"
        style={role === 'MODERATOR' ? { backgroundColor: 'var(--role-moderator-primary)', color: 'white' } : {}}
        className={role !== 'MODERATOR' ? (colors[role as keyof typeof colors] || 'bg-gray-500') : ''}
      >
        {role}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen pb-20 font-sans" style={{ backgroundColor: 'var(--role-moderator-bg)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions.
          </p>
        </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {user.flags > 0 ? (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>{user.flags}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <UserX className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default UserManagement;
