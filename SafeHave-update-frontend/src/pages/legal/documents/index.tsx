import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const Documents = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Legal Documents</h1>
        <p className="text-muted-foreground">
          Manage legal documents, templates, and generators.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Document Library */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Access and manage all legal documents.
            </p>
            <Link to="/legal/documents/document-library">
              <Button className="w-full">Browse Documents</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Use pre-built legal document templates.
            </p>
            <Link to="/legal/documents/templates">
              <Button className="w-full">View Templates</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Document Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Generate custom legal documents.
            </p>
            <Link to="/legal/documents/generator">
              <Button className="w-full">Create Document</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;
