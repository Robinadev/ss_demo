import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Search, Shield } from 'lucide-react';

const EvidenceManagement = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Evidence Management</h1>
        <p className="text-muted-foreground">
          Securely store, organize, and manage legal evidence.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upload Evidence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Evidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Upload photos, documents, audio, and video evidence securely.
            </p>
            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </CardContent>
        </Card>

        {/* Evidence Library */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Evidence Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Browse and organize stored evidence by case.
            </p>
            <Button variant="outline" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Browse Evidence
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <p className="text-muted-foreground text-sm">Encrypted Storage</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <p className="text-muted-foreground text-sm">Access Monitoring</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">GDPR</div>
              <p className="text-muted-foreground text-sm">Compliant</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidenceManagement;
