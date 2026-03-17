import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, FileBarChart, Award, Target } from 'lucide-react';

const Outcomes = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Case Outcomes & Reporting</h1>
        <p className="text-muted-foreground">
          Track case outcomes, generate reports, and analyze legal performance.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Success Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Award className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-muted-foreground text-xs">
              +3% from last quarter
            </p>
          </CardContent>
        </Card>

        {/* Cases Closed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cases Closed</CardTitle>
            <Target className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-muted-foreground text-xs">This quarter</p>
          </CardContent>
        </Card>

        {/* Average Resolution Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Resolution
            </CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-muted-foreground text-xs">days</p>
          </CardContent>
        </Card>

        {/* Reports Generated */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <FileBarChart className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Case Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <h4 className="font-medium">Case #2024-001</h4>
                  <p className="text-muted-foreground text-sm">
                    Protection Order Granted
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-green-600">Success</span>
                  <p className="text-muted-foreground text-xs">Feb 10, 2024</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <h4 className="font-medium">Case #2024-002</h4>
                  <p className="text-muted-foreground text-sm">
                    Child Custody Awarded
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-green-600">Success</span>
                  <p className="text-muted-foreground text-xs">Feb 8, 2024</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <h4 className="font-medium">Case #2024-003</h4>
                  <p className="text-muted-foreground text-sm">
                    Restraining Order Extended
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-green-600">Success</span>
                  <p className="text-muted-foreground text-xs">Feb 5, 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reporting Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="h-5 w-5" />
              Generate Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              Monthly Case Report
            </Button>
            <Button className="w-full" variant="outline">
              Success Rate Analysis
            </Button>
            <Button className="w-full" variant="outline">
              Court Performance Metrics
            </Button>
            <Button className="w-full" variant="outline">
              Custom Report Builder
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Outcomes;
