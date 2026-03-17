import React, { useState } from 'react';
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
import { AlertTriangle, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

export function IncidentOversightPage() {
  const [filter, setFilter] = useState('all');

  // Mock incident data
  const incidents = [
    {
      id: '#INC48293',
      type: 'Violence',
      status: 'Under Review',
      priority: 'High',
      reportedDate: '2025-10-10',
      location: 'Downtown',
      assignedTo: 'Jane Smith',
      description: 'Domestic violence incident reported at local shelter',
    },
    {
      id: '#INC48192',
      type: 'Bullying',
      status: 'In Progress',
      priority: 'Medium',
      reportedDate: '2025-10-09',
      location: 'School District',
      assignedTo: 'John Doe',
      description: 'Workplace harassment case involving multiple employees',
    },
    {
      id: '#INC48091',
      type: 'Missing Person',
      status: 'Critical',
      priority: 'Critical',
      reportedDate: '2025-10-09',
      location: 'Residential Area',
      assignedTo: 'Alice Brown',
      description: 'Adult missing person - last seen 48 hours ago',
    },
    {
      id: '#INC47990',
      type: 'Abuse',
      status: 'Resolved',
      priority: 'Low',
      reportedDate: '2025-10-08',
      location: 'Community Center',
      assignedTo: 'Bob Johnson',
      description: 'Child abuse investigation - case closed successfully',
    },
    {
      id: '#INC47889',
      type: 'Harassment',
      status: 'Under Review',
      priority: 'Medium',
      reportedDate: '2025-10-07',
      location: 'Online',
      assignedTo: 'Charlie Wilson',
      description: 'Online harassment complaint - social media platform',
    },
  ];

  const filteredIncidents =
    filter === 'all'
      ? incidents
      : incidents.filter((inc) => inc.status.toLowerCase() === filter);

  const handleViewIncident = (id: string) => {
    // TODO: Implement view incident
    console.log('View incident', id);
  };

  const handleUpdateStatus = (id: string, status: string) => {
    // TODO: Implement status update
    console.log('Update status', id, status);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Incident Oversight</h1>
        <p className="text-muted-foreground mt-2">
          Monitor, track, and oversee all reported incidents across the
          platform.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm font-medium">Total Incidents</p>
                <p className="text-2xl font-bold">{incidents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Under Review</p>
                <p className="text-2xl font-bold">
                  {incidents.filter((i) => i.status === 'Under Review').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium">Resolved</p>
                <p className="text-2xl font-bold">
                  {incidents.filter((i) => i.status === 'Resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <XCircle className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Critical</p>
                <p className="text-2xl font-bold">
                  {incidents.filter((i) => i.priority === 'Critical').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Incident Reports</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Incidents</SelectItem>
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{incident.type}</Badge>
                  </TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        incident.status === 'Resolved'
                          ? 'default'
                          : incident.status === 'In Progress'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        incident.priority === 'Critical'
                          ? 'destructive'
                          : incident.priority === 'High'
                            ? 'default'
                            : 'secondary'
                      }
                    >
                      {incident.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.assignedTo}</TableCell>
                  <TableCell>
                    {new Date(incident.reportedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewIncident(incident.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        onValueChange={(value) =>
                          handleUpdateStatus(incident.id, value)
                        }
                      >
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue placeholder="Update" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Under Review">
                            Under Review
                          </SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
