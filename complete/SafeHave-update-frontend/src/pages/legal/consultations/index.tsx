import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Video, Phone, Calendar } from 'lucide-react';

const Consultations = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Legal Consultations</h1>
        <p className="text-muted-foreground">
          Schedule and manage legal consultations with clients.
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-4">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Consultations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Video Consultation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2 text-sm">
              Client: Jane Doe
            </p>
            <p className="mb-2 text-sm">Topic: Domestic Violence Support</p>
            <p className="text-sm">Feb 20, 2024 3:00 PM</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                Join Call
              </Button>
              <Button size="sm" variant="outline">
                Reschedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Consultation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2 text-sm">
              Client: John Smith
            </p>
            <p className="mb-2 text-sm">Topic: Child Custody Rights</p>
            <p className="text-sm">Feb 22, 2024 11:00 AM</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                Call Now
              </Button>
              <Button size="sm" variant="outline">
                Reschedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              In-Person Meeting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2 text-sm">
              Client: Maria Garcia
            </p>
            <p className="mb-2 text-sm">Topic: Restraining Order</p>
            <p className="text-sm">Feb 28, 2024 2:00 PM</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                View Details
              </Button>
              <Button size="sm" variant="outline">
                Reschedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Consultations;
