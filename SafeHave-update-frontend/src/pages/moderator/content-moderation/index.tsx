import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, Check, X, AlertTriangle, MessageSquare } from 'lucide-react';

const ContentModeration = () => {
  const [filterPriority, setFilterPriority] = useState('all');

  const mockModerationQueue = [
    {
      id: '1',
      contentType: 'Forum Post',
      title: 'New user introduction',
      author: 'newuser123',
      submittedDate: '2024-01-15',
      priority: 'low',
      status: 'pending',
      reason: 'New user post',
    },
    {
      id: '2',
      contentType: 'Forum Reply',
      title: 'Re: Support resources',
      author: 'helper456',
      submittedDate: '2024-01-14',
      priority: 'medium',
      status: 'pending',
      reason: 'Contains external links',
    },
    {
      id: '3',
      contentType: 'Forum Thread',
      title: 'Mental health discussion',
      author: 'support789',
      submittedDate: '2024-01-13',
      priority: 'high',
      status: 'pending',
      reason: 'Sensitive topic',
    },
    {
      id: '4',
      contentType: 'User Profile',
      title: 'Profile update',
      author: 'user101',
      submittedDate: '2024-01-12',
      priority: 'low',
      status: 'approved',
      reason: 'Profile information',
    },
  ];

  const filteredQueue = mockModerationQueue.filter(
    (item) => filterPriority === 'all' || item.priority === filterPriority
  );

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" style={{ backgroundColor: 'rgba(var(--role-moderator-alert-rgb), 0.1)', color: 'var(--role-moderator-alert)', border: 'none' }}>High</Badge>;
      case 'medium':
        return <Badge variant="default" style={{ backgroundColor: 'rgba(var(--role-moderator-primary-rgb), 0.1)', color: 'var(--role-moderator-primary)', border: 'none' }}>Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" style={{ backgroundColor: 'var(--role-moderator-neutral)', color: 'var(--role-moderator-primary)', border: 'none' }}>Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="destructive">Pending</Badge>;
      case 'approved':
        return (
          <Badge variant="default" style={{ backgroundColor: 'var(--role-moderator-success)', color: 'white', border: 'none' }}>
            Approved
          </Badge>
        );
      case 'rejected':
        return <Badge variant="secondary">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'Forum Post':
      case 'Forum Thread':
      case 'Forum Reply':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen pb-20 font-sans" style={{ backgroundColor: 'var(--role-moderator-bg)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2">Content Moderation</h1>
          <p className="text-muted-foreground">Moderate platform content.</p>
        </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Priority:</span>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moderation Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Moderation Queue ({filteredQueue.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getContentTypeIcon(item.contentType)}
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {item.contentType}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.contentType}</TableCell>
                  <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.submittedDate}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {item.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
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

export default ContentModeration;
