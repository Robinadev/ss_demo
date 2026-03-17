import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cases = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Legal Cases</h1>
        <p className="text-muted-foreground">
          Manage and track your legal cases.
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-4">
          <Link to="/legal/cases/case-list">
            <Button variant="outline">View All Cases</Button>
          </Link>
          <Link to="/legal/cases/case-preparation">
            <Button variant="outline">Case Preparation</Button>
          </Link>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Case List */}
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => navigate('/legal/cases/case-list')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Case List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Browse and manage all your legal cases.
            </p>
            <Button size="sm" variant="outline" className="w-full">
              View Cases
            </Button>
          </CardContent>
        </Card>

        {/* Case Files */}
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => navigate('/legal/cases/case-files')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Case Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Access and organize case documents.
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Manage Files
            </Button>
          </CardContent>
        </Card>

        {/* Case Preparation */}
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => navigate('/legal/cases/case-preparation')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Case Preparation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Prepare materials and checklists for cases.
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Start Preparation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cases;
