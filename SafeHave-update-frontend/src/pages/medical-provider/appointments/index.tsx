import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Plus,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
} from 'lucide-react';
import { useState } from 'react';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  // Mock appointments data
  const appointments = [
    {
      id: 'A001',
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      date: '2024-02-20',
      time: '09:00 AM',
      duration: 30,
      type: 'Follow-up',
      status: 'Confirmed',
      location: 'Room 101',
      notes: 'Asthma check-up and medication review.',
    },
    {
      id: 'A002',
      patientName: 'Michael Chen',
      patientId: 'P002',
      date: '2024-02-20',
      time: '11:30 AM',
      duration: 45,
      type: 'Consultation',
      status: 'Confirmed',
      location: 'Room 103',
      notes: 'Cardiac rehabilitation assessment.',
    },
    {
      id: 'A003',
      patientName: 'Emma Davis',
      patientId: 'P003',
      date: '2024-02-21',
      time: '02:00 PM',
      duration: 60,
      type: 'Treatment Review',
      status: 'Pending',
      location: 'Room 102',
      notes: 'Diabetes management and insulin adjustment.',
    },
    {
      id: 'A004',
      patientName: 'David Wilson',
      patientId: 'P004',
      date: '2024-02-22',
      time: '10:15 AM',
      duration: 30,
      type: 'Physical Therapy',
      status: 'Confirmed',
      location: 'Therapy Room 1',
      notes: 'Post-operative knee rehabilitation.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTodaysAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter((apt) => apt.date === today);
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter((apt) => apt.date > today).slice(0, 5);
  };

  return (
    <div className="container mx-auto px-4 py-12 medical-theme-bg">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold medical-theme-text">Appointments</h1>
            <p className="text-muted-foreground">
              Schedule and manage patient appointments.
            </p>
          </div>
          <Dialog
            open={isScheduleDialogOpen}
            onOpenChange={setIsScheduleDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="medical-button-primary">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patient-select" className="text-right">
                    Patient
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p001">Sarah Johnson (P001)</SelectItem>
                      <SelectItem value="p002">Michael Chen (P002)</SelectItem>
                      <SelectItem value="p003">Emma Davis (P003)</SelectItem>
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
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="treatment">Treatment</SelectItem>
                      <SelectItem value="examination">Examination</SelectItem>
                      <SelectItem value="therapy">Therapy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Room or location"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsScheduleDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsScheduleDialogOpen(false)} className="medical-button-primary">
                  Schedule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getTodaysAppointments().map((appointment) => (
                <div key={appointment.id} className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-muted-foreground text-sm">
                          {appointment.patientId}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="text-muted-foreground h-4 w-4" />
                      <span>
                        {appointment.time} ({appointment.duration}min)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-muted-foreground h-4 w-4" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {appointment.type}
                  </p>
                  {appointment.notes && (
                    <p className="mt-2 rounded bg-gray-50 p-2 text-sm">
                      {appointment.notes}
                    </p>
                  )}
                </div>
              ))}
              {getTodaysAppointments().length === 0 && (
                <div className="text-muted-foreground py-8 text-center">
                  No appointments scheduled for today.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getUpcomingAppointments().map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-green-100 p-2">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-muted-foreground text-sm">
                      {appointment.patientId}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p>{appointment.date}</p>
                    <p className="text-muted-foreground">{appointment.time}</p>
                  </div>
                  <p className="text-sm">{appointment.type}</p>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getTodaysAppointments().length}
            </div>
            <p className="text-muted-foreground text-xs">Appointments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-muted-foreground text-xs">Total scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter((apt) => apt.status === 'Confirmed').length}
            </div>
            <p className="text-muted-foreground text-xs">Ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter((apt) => apt.status === 'Pending').length}
            </div>
            <p className="text-muted-foreground text-xs">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
