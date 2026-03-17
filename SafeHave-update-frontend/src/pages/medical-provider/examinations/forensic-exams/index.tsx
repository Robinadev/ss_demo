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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Eye, Edit, Calendar, FileText } from 'lucide-react';

const ForensicExams = () => {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  // Mock forensic exam data
  const exams = [
    {
      id: 'FE001',
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      type: 'Sexual Assault Exam',
      scheduledDate: '2024-02-25',
      scheduledTime: '10:00 AM',
      status: 'Scheduled',
      priority: 'High',
      location: 'Medical Center Room 5',
      examiner: 'Dr. Emily Davis',
    },
    {
      id: 'FE002',
      patientName: 'Michael Chen',
      patientId: 'P002',
      type: 'Domestic Violence Exam',
      scheduledDate: '2024-02-22',
      scheduledTime: '02:30 PM',
      status: 'Completed',
      priority: 'Medium',
      location: 'Medical Center Room 3',
      examiner: 'Dr. James Wilson',
    },
    {
      id: 'FE003',
      patientName: 'Emma Davis',
      patientId: 'P003',
      type: 'Child Abuse Exam',
      scheduledDate: '2024-02-28',
      scheduledTime: '09:15 AM',
      status: 'In Progress',
      priority: 'High',
      location: 'Medical Center Room 7',
      examiner: 'Dr. Lisa Thompson',
    },
    {
      id: 'FE004',
      patientName: 'David Wilson',
      patientId: 'P004',
      type: 'Sexual Assault Exam',
      scheduledDate: '2024-02-20',
      scheduledTime: '11:45 AM',
      status: 'Completed',
      priority: 'High',
      location: 'Medical Center Room 5',
      examiner: 'Dr. Emily Davis',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Forensic Examinations</h1>
            <p className="text-muted-foreground">
              Manage and schedule forensic medical examinations.
            </p>
          </div>
          <Dialog
            open={isScheduleDialogOpen}
            onOpenChange={setIsScheduleDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule Forensic Examination</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patient" className="text-right">
                    Patient
                  </Label>
                  <Input
                    id="patient"
                    placeholder="Patient name or ID"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="exam-type" className="text-right">
                    Exam Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sexual-assault">
                        Sexual Assault Exam
                      </SelectItem>
                      <SelectItem value="domestic-violence">
                        Domestic Violence Exam
                      </SelectItem>
                      <SelectItem value="child-abuse">
                        Child Abuse Exam
                      </SelectItem>
                      <SelectItem value="elder-abuse">
                        Elder Abuse Exam
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input id="time" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsScheduleDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsScheduleDialogOpen(false)}>
                  Schedule Exam
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams.length}</div>
            <p className="text-muted-foreground text-xs">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exams.filter((exam) => exam.status === 'Scheduled').length}
            </div>
            <p className="text-muted-foreground text-xs">Upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exams.filter((exam) => exam.status === 'In Progress').length}
            </div>
            <p className="text-muted-foreground text-xs">Active exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exams.filter((exam) => exam.status === 'Completed').length}
            </div>
            <p className="text-muted-foreground text-xs">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Exams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Forensic Examinations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{exam.patientName}</p>
                      <p className="text-muted-foreground text-sm">
                        {exam.patientId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{exam.type}</TableCell>
                  <TableCell>
                    <div>
                      <p>{exam.scheduledDate}</p>
                      <p className="text-muted-foreground text-sm">
                        {exam.scheduledTime}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(exam.status)}>
                      {exam.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(exam.priority)}>
                      {exam.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {exam.status === 'Completed' && (
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
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
  );
};

export default ForensicExams;
