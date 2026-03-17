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
import { Eye, Check, X, MessageSquare } from 'lucide-react';

const ReportedContent = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const mockReports = [
    {
      id: '1',
      postTitle: 'Inappropriate content in discussion',
      reporter: 'user123',
      reason: 'Harassment',
      reportedDate: '2024-01-15',
      status: 'pending',
      postType: 'thread',
      severity: 'high',
    },
    {
      id: '2',
      postTitle: 'Spam reply',
      reporter: 'moderator456',
      reason: 'Spam',
      reportedDate: '2024-01-14',
      status: 'reviewed',
      postType: 'reply',
      severity: 'medium',
    },
    {
      id: '3',
      postTitle: 'Offensive language',
      reporter: 'user789',
      reason: 'Hate speech',
      reportedDate: '2024-01-13',
      status: 'pending',
      postType: 'thread',
      severity: 'high',
    },
    {
      id: '4',
      postTitle: 'Misleading information',
      reporter: 'user101',
      reason: 'False information',
      reportedDate: '2024-01-12',
      status: 'resolved',
      postType: 'reply',
      severity: 'low',
    },
  ];

  const filteredReports = mockReports.filter(
    (report) => filterStatus === 'all' || report.status === filterStatus
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="destructive">Pending</Badge>;
      case 'reviewed':
        return <Badge variant="default" style={{ backgroundColor: 'var(--role-moderator-success)', color: 'white' }}>Reviewed</Badge>;
      case 'resolved':
        return <Badge variant="secondary">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return (
          <Badge className="text-xs" style={{ backgroundColor: 'rgba(var(--role-moderator-alert-rgb), 0.1)', color: 'var(--role-moderator-alert)', border: 'none' }}>
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="text-xs" style={{ backgroundColor: 'rgba(var(--role-moderator-primary-rgb), 0.1)', color: 'var(--role-moderator-primary)', border: 'none' }}>
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge className="text-xs" style={{ backgroundColor: 'var(--role-moderator-neutral)', color: 'var(--role-moderator-primary)', border: 'none' }}>
            Low
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {severity}
          </Badge>
        );
    }
  };

  const getPostTypeIcon = (type: string) => {
    return type === 'thread' ? (
      <MessageSquare className="h-4 w-4" />
    ) : (
      <MessageSquare className="text-muted-foreground h-4 w-4" />
    );
  };

  return (
    <div className="min-h-screen pb-20 font-sans" style={{ backgroundColor: 'var(--role-moderator-bg)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2">Reported Content</h1>
          <p className="text-muted-foreground">
            Manage reported content in forums.
          </p>
        </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reported Content ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPostTypeIcon(report.postType)}
                      <div>
                        <p className="text-sm font-medium">
                          {report.postTitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {report.postType}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.reportedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {report.status === 'pending' && (
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

export default ReportedContent;
