import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CasePreparation = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/legal/cases')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>
        </div>
        <h1 className="mb-2">Case Preparation</h1>
        <p className="text-muted-foreground">
          Prepare and organize materials for Case #2024-001.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Preparation Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Preparation Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="client-info" checked />
              <label
                htmlFor="client-info"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Client information collected
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="evidence" checked />
              <label
                htmlFor="evidence"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Evidence gathered and organized
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="witnesses" />
              <label
                htmlFor="witnesses"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Witness statements obtained
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="documents" checked />
              <label
                htmlFor="documents"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Legal documents prepared
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="court-date" />
              <label
                htmlFor="court-date"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Court date scheduled
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Preparation Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Preparation Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              Generate Case Summary
            </Button>
            <Button className="w-full" variant="outline">
              Create Evidence Timeline
            </Button>
            <Button className="w-full" variant="outline">
              Prepare Witness List
            </Button>
            <Button className="w-full" variant="outline">
              Draft Legal Arguments
            </Button>
            <Button className="w-full" variant="outline">
              Review Precedents
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <h4 className="font-medium">Review witness availability</h4>
                  <p className="text-muted-foreground text-sm">Due in 2 days</p>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">
                    Finalize evidence presentation
                  </h4>
                  <p className="text-muted-foreground text-sm">Due in 1 week</p>
                </div>
              </div>
              <Badge variant="outline">In Progress</Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium">Client consultation completed</h4>
                  <p className="text-muted-foreground text-sm">
                    Completed yesterday
                  </p>
                </div>
              </div>
              <Badge variant="default">Completed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CasePreparation;
