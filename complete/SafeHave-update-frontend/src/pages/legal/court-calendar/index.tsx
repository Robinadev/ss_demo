import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';

const CourtCalendar = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Court Calendar</h1>
        <p className="text-muted-foreground">
          Track court dates, hearings, and legal deadlines.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Hearings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Hearings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <h4 className="font-medium">Case #2024-001 Hearing</h4>
                <p className="text-muted-foreground text-sm">
                  Domestic Violence Protection
                </p>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Feb 25, 2024 10:00 AM
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Court Room 3A
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <h4 className="font-medium">Case #2024-002 Mediation</h4>
                <p className="text-muted-foreground text-sm">Child Custody</p>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Mar 5, 2024 2:00 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Mediation Center
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              Add New Court Date
            </Button>
            <Button className="w-full" variant="outline">
              Export Calendar
            </Button>
            <Button className="w-full" variant="outline">
              Set Reminders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourtCalendar;
