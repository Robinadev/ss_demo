import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

export function CaseManagementPage() {
  // Mock case data
  const cases = [
    {
      id: '#REP48293',
      type: 'Violence',
      status: 'Under Review',
      priority: 'High',
      date: '2025-10-10',
      assignedTo: 'Jane Smith',
      description: 'Domestic violence incident reported',
    },
    {
      id: '#REP48192',
      type: 'Bullying',
      status: 'In Progress',
      priority: 'Medium',
      date: '2025-10-09',
      assignedTo: 'John Doe',
      description: 'Workplace harassment case',
    },
    {
      id: '#REP48091',
      type: 'Missing Person',
      status: 'Critical',
      priority: 'Critical',
      date: '2025-10-09',
      assignedTo: 'Alice Brown',
      description: 'Adult missing person report',
    },
    {
      id: '#REP47990',
      type: 'Abuse',
      status: 'Resolved',
      priority: 'Low',
      date: '2025-10-08',
      assignedTo: 'Bob Johnson',
      description: 'Child abuse investigation',
    },
    {
      id: '#REP47889',
      type: 'Harassment',
      status: 'Under Review',
      priority: 'Medium',
      date: '2025-10-07',
      assignedTo: 'Charlie Wilson',
      description: 'Online harassment complaint',
    },
  ];

  const handleAddCase = () => {
    // TODO: Implement add case functionality
    console.log('Add case clicked');
  };

  const handleViewCase = (caseId: string) => {
    // TODO: Implement view case functionality
    console.log('View case', caseId);
  };

  const handleEditCase = (caseId: string) => {
    // TODO: Implement edit case functionality
    console.log('Edit case', caseId);
  };

  const handleDeleteCase = (caseId: string) => {
    // TODO: Implement delete case functionality
    console.log('Delete case', caseId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Case Management</h1>
            <p className="text-muted-foreground mt-2">
              Handle case assignments, track progress, and manage resolution
              workflows.
            </p>
          </div>
          <Button onClick={handleAddCase} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Case
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell className="font-medium">{case_.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{case_.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {case_.description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        case_.status === 'Resolved'
                          ? 'default'
                          : case_.status === 'In Progress'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {case_.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        case_.priority === 'Critical'
                          ? 'destructive'
                          : case_.priority === 'High'
                            ? 'default'
                            : 'secondary'
                      }
                    >
                      {case_.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{case_.assignedTo}</TableCell>
                  <TableCell>
                    {new Date(case_.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCase(case_.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCase(case_.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCase(case_.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">
                {cases.length}
              </div>
              <p className="text-muted-foreground text-sm">Total Cases</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {cases.filter((c) => c.status === 'Under Review').length}
              </div>
              <p className="text-muted-foreground text-sm">Under Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {cases.filter((c) => c.status === 'Resolved').length}
              </div>
              <p className="text-muted-foreground text-sm">Resolved</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
