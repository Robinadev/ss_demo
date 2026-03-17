import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Calendar } from 'lucide-react';

export function ReportsPage() {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');

  // Mock reports data
  const reports = [
    {
      id: 1,
      name: 'Monthly User Activity Report',
      type: 'User Activity',
      dateRange: 'Jan 2025',
      generatedDate: '2025-02-01',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Incident Summary Report',
      type: 'Incidents',
      dateRange: 'Jan 2025',
      generatedDate: '2025-02-05',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'System Performance Report',
      type: 'Performance',
      dateRange: 'Jan 2025',
      generatedDate: '2025-02-10',
      status: 'Processing',
    },
  ];

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    console.log('Generating report:', { reportType, dateRange });
  };

  const handleDownloadReport = (reportId: number) => {
    // TODO: Implement report download
    console.log('Downloading report', reportId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-2">
          Generate and download detailed reports for analysis and compliance.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate New Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user-activity">User Activity</SelectItem>
                  <SelectItem value="incidents">Incidents</SelectItem>
                  <SelectItem value="performance">
                    System Performance
                  </SelectItem>
                  <SelectItem value="security">Security Audit</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerateReport} className="w-full">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Scheduled Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Weekly User Activity</p>
                  <p className="text-muted-foreground text-sm">Every Monday</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Monthly Incident Summary</p>
                  <p className="text-muted-foreground text-sm">
                    1st of each month
                  </p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Quarterly Compliance Report</p>
                  <p className="text-muted-foreground text-sm">
                    End of quarter
                  </p>
                </div>
                <Badge variant="secondary">Inactive</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.dateRange}</TableCell>
                  <TableCell>{report.generatedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.status === 'Completed'
                          ? 'default'
                          : report.status === 'Processing'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {report.status === 'Completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
