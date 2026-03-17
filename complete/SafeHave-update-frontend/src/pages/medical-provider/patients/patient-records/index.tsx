import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, FileText, Calendar, Activity, AlertCircle } from 'lucide-react';

const PatientRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock patient data
  const patient = {
    id: 'P001',
    name: 'Sarah Johnson',
    age: 28,
    gender: 'Female',
    dob: '1996-05-15',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@email.com',
    address: '123 Main St, Anytown, USA',
    emergencyContact: 'John Johnson - Father - (555) 987-6543',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    chronicConditions: ['Asthma'],
    status: 'Active',
    priority: 'High',
  };

  const medicalHistory = [
    {
      date: '2024-02-20',
      type: 'Examination',
      description: 'Routine check-up',
      provider: 'Dr. Smith',
      notes: 'Patient reports improved breathing with new inhaler.',
    },
    {
      date: '2024-01-15',
      type: 'Treatment',
      description: 'Asthma management',
      provider: 'Dr. Smith',
      notes: 'Prescribed new inhaler and adjusted dosage.',
    },
    {
      date: '2023-12-01',
      type: 'Consultation',
      description: 'Initial assessment',
      provider: 'Dr. Smith',
      notes: 'Diagnosed with moderate asthma.',
    },
  ];

  const examinations = [
    {
      id: 'E001',
      date: '2024-02-20',
      type: 'Physical Exam',
      status: 'Completed',
      results: 'Normal vital signs, improved respiratory function.',
    },
    {
      id: 'E002',
      date: '2024-01-15',
      type: 'Pulmonary Function Test',
      status: 'Completed',
      results: 'FEV1 improved by 15%.',
    },
    {
      id: 'E003',
      date: '2023-12-01',
      type: 'Chest X-Ray',
      status: 'Completed',
      results: 'No abnormalities detected.',
    },
  ];

  const treatmentPlans = [
    {
      id: 'T001',
      name: 'Asthma Management Plan',
      startDate: '2024-01-15',
      status: 'Active',
      description: 'Daily inhaler use, avoid triggers, regular check-ups.',
    },
    {
      id: 'T002',
      name: 'Allergy Management',
      startDate: '2023-12-01',
      status: 'Ongoing',
      description: 'Avoid allergens, emergency epinephrine if needed.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{patient.name}</h1>
            <p className="text-muted-foreground">
              Patient ID: {patient.id} • Age: {patient.age} • {patient.gender}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={patient.priority === 'High' ? 'destructive' : 'default'}
            >
              {patient.priority} Priority
            </Badge>
            <Badge variant="outline">{patient.status}</Badge>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Patient
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Add Note
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="mb-4 flex w-full justify-between">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveTab('history')}
          >
            Medical History
          </Button>
          <Button
            variant={activeTab === 'examinations' ? 'default' : 'outline'}
            onClick={() => setActiveTab('examinations')}
          >
            Examinations
          </Button>
          <Button
            variant={activeTab === 'treatments' ? 'default' : 'outline'}
            onClick={() => setActiveTab('treatments')}
          >
            Treatments
          </Button>
          <Button
            variant={activeTab === 'documents' ? 'default' : 'outline'}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </Button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Date of Birth:</strong> {patient.dob}
                </div>
                <div>
                  <strong>Phone:</strong> {patient.phone}
                </div>
                <div>
                  <strong>Email:</strong> {patient.email}
                </div>
                <div>
                  <strong>Address:</strong> {patient.address}
                </div>
                <div>
                  <strong>Emergency Contact:</strong> {patient.emergencyContact}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Blood Type:</strong> {patient.bloodType}
                </div>
                <div>
                  <strong>Allergies:</strong> {patient.allergies.join(', ')}
                </div>
                <div>
                  <strong>Chronic Conditions:</strong>{' '}
                  {patient.chronicConditions.join(', ')}
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-orange-700">
                    High-risk patient
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.map((entry, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{entry.type}</span>
                        <Badge variant="outline">{entry.date}</Badge>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {entry.provider}
                      </span>
                    </div>
                    <h4 className="mb-1 font-medium">{entry.description}</h4>
                    <p className="text-muted-foreground text-sm">
                      {entry.notes}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'examinations' && (
          <Card>
            <CardHeader>
              <CardTitle>Examinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examinations.map((exam) => (
                  <div key={exam.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{exam.type}</h4>
                        <p className="text-muted-foreground text-sm">
                          ID: {exam.id} • Date: {exam.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          exam.status === 'Completed' ? 'default' : 'secondary'
                        }
                      >
                        {exam.status}
                      </Badge>
                    </div>
                    <p className="text-sm">{exam.results}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'treatments' && (
          <Card>
            <CardHeader>
              <CardTitle>Treatment Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treatmentPlans.map((plan) => (
                  <div key={plan.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{plan.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          Started: {plan.startDate}
                        </p>
                      </div>
                      <Badge
                        variant={
                          plan.status === 'Active' ? 'default' : 'secondary'
                        }
                      >
                        {plan.status}
                      </Badge>
                    </div>
                    <p className="text-sm">{plan.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground py-8 text-center">
                Document management feature coming soon.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
