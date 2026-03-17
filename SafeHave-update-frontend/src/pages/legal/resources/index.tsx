import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Lightbulb, Search } from 'lucide-react';

const Resources = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Legal Resources</h1>
        <p className="text-muted-foreground">
          Access legal precedents, forms, guidelines, and educational materials.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Legal Precedents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Legal Precedents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Browse case law and judicial precedents relevant to domestic
              violence cases.
            </p>
            <Button className="w-full" variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Search Precedents
            </Button>
          </CardContent>
        </Card>

        {/* Forms & Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Forms & Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Download standardized legal forms and templates.
            </p>
            <Button className="w-full" variant="outline">
              Browse Forms
            </Button>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Access best practices and procedural guidelines.
            </p>
            <Button className="w-full" variant="outline">
              View Guidelines
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Featured Resources */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Featured Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">
                Domestic Violence Protection Act Guidelines
              </h4>
              <p className="text-muted-foreground mb-2 text-sm">
                Comprehensive guide to protection orders and legal procedures.
              </p>
              <Button size="sm">Download PDF</Button>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">
                Child Custody Case Precedents
              </h4>
              <p className="text-muted-foreground mb-2 text-sm">
                Recent court decisions and their implications.
              </p>
              <Button size="sm">View Cases</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;
