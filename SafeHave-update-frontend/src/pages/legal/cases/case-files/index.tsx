import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CaseFiles = () => {
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
        <h1 className="mb-2">Case Files</h1>
        <p className="text-muted-foreground">
          Manage documents and files for Case #2024-001.
        </p>
      </div>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-muted-foreground mb-4 text-sm">
              Drag and drop files here, or click to browse
            </p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Case Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">
                    Protection Order Application.pdf
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Uploaded 2 days ago • 2.3 MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Primary</Badge>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium">Witness Statements.docx</h4>
                  <p className="text-muted-foreground text-sm">
                    Uploaded 1 week ago • 1.8 MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Evidence</Badge>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-purple-500" />
                <div>
                  <h4 className="font-medium">Court Hearing Notes.pdf</h4>
                  <p className="text-muted-foreground text-sm">
                    Uploaded 3 days ago • 0.9 MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Notes</Badge>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseFiles;
