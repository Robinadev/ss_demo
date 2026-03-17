import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Activity, FileText, Stethoscope, Pill } from 'lucide-react';

const PatientHistory = () => {
  // Mock patient history data
  const history = [
    {
      id: 1,
      date: '2024-02-20',
      time: '09:30 AM',
      type: 'Appointment',
      category: 'examination',
      title: 'Routine Check-up',
      description: 'Regular physical examination and asthma review.',
      provider: 'Dr. Sarah Smith',
      notes:
        'Patient reports good compliance with inhaler. Spirometry shows improvement. Adjusted dosage slightly.',
      attachments: [],
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '02:15 PM',
      type: 'Treatment',
      category: 'medication',
      title: 'Medication Adjustment',
      description:
        'Adjusted asthma medication dosage based on recent test results.',
      provider: 'Dr. Sarah Smith',
      notes:
        'Increased Fluticasone from 100mcg to 125mcg twice daily. Patient educated on proper inhaler technique.',
      attachments: ['Prescription.pdf'],
    },
    {
      id: 3,
      date: '2024-01-30',
      time: '11:00 AM',
      type: 'Test Results',
      category: 'diagnostic',
      title: 'Pulmonary Function Test',
      description: 'Spirometry and lung function assessment.',
      provider: 'Respiratory Therapy',
      notes:
        'FEV1: 85% predicted (improved from 72%). FVC: 92% predicted. Good response to bronchodilator.',
      attachments: ['PFT_Report_20240130.pdf'],
    },
    {
      id: 4,
      date: '2024-01-15',
      time: '10:45 AM',
      type: 'Consultation',
      category: 'consultation',
      title: 'Asthma Management Review',
      description: 'Review of asthma control and treatment plan.',
      provider: 'Dr. Sarah Smith',
      notes:
        'Patient experiencing fewer symptoms. Trigger identification discussed. Action plan reviewed and updated.',
      attachments: [],
    },
    {
      id: 5,
      date: '2023-12-20',
      time: '03:30 PM',
      type: 'Emergency Visit',
      category: 'emergency',
      title: 'Acute Asthma Exacerbation',
      description: 'Emergency department visit for asthma flare-up.',
      provider: 'Emergency Medicine',
      notes:
        'Presented with shortness of breath and wheezing. Treated with nebulized albuterol and oral steroids. Discharged with prednisone taper.',
      attachments: ['ED_Note_20231220.pdf'],
    },
    {
      id: 6,
      date: '2023-12-01',
      time: '09:00 AM',
      type: 'Initial Assessment',
      category: 'consultation',
      title: 'New Patient Evaluation',
      description: 'Comprehensive initial assessment for asthma management.',
      provider: 'Dr. Sarah Smith',
      notes:
        'New patient with history of childhood asthma. Diagnosed with moderate persistent asthma. Started on controller therapy.',
      attachments: [],
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'examination':
        return <Stethoscope className="h-4 w-4" />;
      case 'medication':
        return <Pill className="h-4 w-4" />;
      case 'diagnostic':
        return <Activity className="h-4 w-4" />;
      case 'consultation':
        return <FileText className="h-4 w-4" />;
      case 'emergency':
        return <Activity className="h-4 w-4 text-red-500" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'examination':
        return 'bg-blue-100 text-blue-800';
      case 'medication':
        return 'bg-green-100 text-green-800';
      case 'diagnostic':
        return 'bg-purple-100 text-purple-800';
      case 'consultation':
        return 'bg-yellow-100 text-yellow-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Patient History</h1>
        <p className="text-muted-foreground">
          Complete timeline of patient interactions, treatments, and medical
          events.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <Button variant="outline" size="sm">
          All Events
        </Button>
        <Button variant="outline" size="sm">
          Appointments
        </Button>
        <Button variant="outline" size="sm">
          Treatments
        </Button>
        <Button variant="outline" size="sm">
          Tests
        </Button>
        <Button variant="outline" size="sm">
          Emergency
        </Button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {history.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Timeline line */}
            {index < history.length - 1 && (
              <div className="absolute top-12 left-6 h-16 w-0.5 bg-gray-200"></div>
            )}

            <Card className="ml-12">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="absolute -left-3 h-6 w-6 rounded-full border-4 border-blue-500 bg-white"></div>

                  {/* Icon */}
                  <div
                    className={`rounded-full p-2 ${getCategoryColor(event.category)}`}
                  >
                    {getCategoryIcon(event.category)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <Badge
                          variant="outline"
                          className={getCategoryColor(event.category)}
                        >
                          {event.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.date}</p>
                        <p className="text-muted-foreground text-xs">
                          {event.time}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-3">
                      {event.description}
                    </p>

                    <div className="mb-3 rounded-lg bg-gray-50 p-4">
                      <p className="text-sm">{event.notes}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-sm">
                        Provider: {event.provider}
                      </p>
                      {event.attachments.length > 0 && (
                        <div className="flex gap-2">
                          {event.attachments.map((attachment, idx) => (
                            <Button key={idx} variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              {attachment}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline">Load More History</Button>
      </div>
    </div>
  );
};

export default PatientHistory;
