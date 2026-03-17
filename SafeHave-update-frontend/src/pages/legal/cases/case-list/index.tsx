import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Filter, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CaseList = () => {
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
        <h1 className="mb-2">Case List</h1>
        <p className="text-muted-foreground">
          View and manage all legal cases.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input placeholder="Search cases..." className="pl-10" />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Case #2024-001
              </CardTitle>
              <Badge variant="default">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2 text-sm">
              Domestic Violence Protection
            </p>
            <p className="mb-2 text-sm">Client: Jane Doe</p>
            <p className="mb-4 text-sm">Filed: Jan 15, 2024</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/legal/cases/case-files')}
              >
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/legal/cases/case-preparation')}
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Case #2024-002
              </CardTitle>
              <Badge variant="secondary">Preparation</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2 text-sm">Child Custody</p>
            <p className="mb-2 text-sm">Client: John Smith</p>
            <p className="mb-4 text-sm">Filed: Feb 1, 2024</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/legal/cases/case-files')}
              >
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/legal/cases/case-preparation')}
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Case #2024-003
              </CardTitle>
              <Badge variant="destructive">Urgent</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2 text-sm">
              Restraining Order
            </p>
            <p className="mb-2 text-sm">Client: Maria Garcia</p>
            <p className="mb-4 text-sm">Filed: Feb 10, 2024</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/legal/cases/case-files')}
              >
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/legal/cases/case-preparation')}
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseList;
