import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Plus, Eye, Edit } from 'lucide-react';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock patient data
  const patients = [
    {
      id: 'P001',
      name: 'Sarah Johnson',
      age: 28,
      gender: 'Female',
      status: 'Active',
      lastVisit: '2024-02-20',
      priority: 'High',
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      age: 35,
      gender: 'Male',
      status: 'Follow-up',
      lastVisit: '2024-02-19',
      priority: 'Medium',
    },
    {
      id: 'P003',
      name: 'Emma Davis',
      age: 42,
      gender: 'Female',
      status: 'Completed',
      lastVisit: '2024-02-18',
      priority: 'Low',
    },
    {
      id: 'P004',
      name: 'David Wilson',
      age: 31,
      gender: 'Male',
      status: 'Active',
      lastVisit: '2024-02-17',
      priority: 'High',
    },
    {
      id: 'P005',
      name: 'Lisa Brown',
      age: 26,
      gender: 'Female',
      status: 'Active',
      lastVisit: '2024-02-16',
      priority: 'Medium',
    },
    {
      id: 'P006',
      name: 'James Miller',
      age: 48,
      gender: 'Male',
      status: 'Follow-up',
      lastVisit: '2024-02-15',
      priority: 'Low',
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 medical-theme-bg">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold medical-theme-text">Patient List</h1>
        <p className="text-muted-foreground">
          View and manage all patients in your care.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search patients by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patients ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        patient.status === 'Active'
                          ? 'default'
                          : patient.status === 'Follow-up'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        patient.priority === 'High' ? 'medical-badge-high' :
                        patient.priority === 'Medium' ? 'medical-badge-medium' :
                        'medical-badge-low'
                      }
                    >
                      {patient.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate('/medical-provider/patients/patient-records')
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPatients.length === 0 && (
            <div className="text-muted-foreground py-8 text-center">
              No patients found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
