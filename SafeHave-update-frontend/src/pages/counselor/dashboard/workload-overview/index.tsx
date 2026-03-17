import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  User,
  Briefcase,
  Zap,
  Target,
  RefreshCw,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const mockCounselors = [
  {
    id: 'counselor-1',
    name: 'Grace Thompson',
    currentLoad: 8,
    maxCapacity: 12,
    specialization: 'Domestic Violence',
    activeCases: 8,
    urgentCases: 2,
    completedThisWeek: 3,
    avgSessionTime: 55,
    burnoutRisk: 'Low',
    efficiency: 87,
  },
  {
    id: 'counselor-2',
    name: 'Dr. Sarah Johnson',
    currentLoad: 6,
    maxCapacity: 10,
    specialization: 'Trauma Recovery',
    activeCases: 6,
    urgentCases: 1,
    completedThisWeek: 4,
    avgSessionTime: 60,
    burnoutRisk: 'Low',
    efficiency: 92,
  },
  {
    id: 'counselor-3',
    name: 'Michael Chen',
    currentLoad: 9,
    maxCapacity: 15,
    specialization: 'Substance Abuse',
    activeCases: 9,
    urgentCases: 0,
    completedThisWeek: 2,
    avgSessionTime: 45,
    burnoutRisk: 'Medium',
    efficiency: 78,
  },
  {
    id: 'counselor-4',
    name: 'Lisa Rodriguez',
    currentLoad: 7,
    maxCapacity: 14,
    specialization: 'Family Counseling',
    activeCases: 7,
    urgentCases: 1,
    completedThisWeek: 5,
    avgSessionTime: 50,
    burnoutRisk: 'Low',
    efficiency: 89,
  },
  {
    id: 'counselor-5',
    name: 'David Kim',
    currentLoad: 11,
    maxCapacity: 10,
    specialization: 'General Counseling',
    activeCases: 11,
    urgentCases: 3,
    completedThisWeek: 1,
    avgSessionTime: 65,
    burnoutRisk: 'High',
    efficiency: 65,
  },
];

const mockOptimizationSuggestions = [
  {
    id: 'opt-1',
    type: 'Reassignment',
    title: 'Reassign 2 cases from David Kim',
    description:
      'David Kim is over capacity with 11 active cases. Reassign 2 medium-priority cases to available counselors.',
    impact: 'High',
    effort: 'Medium',
    affectedCounselors: ['David Kim', 'Grace Thompson', 'Michael Chen'],
    estimatedTime: '2 hours',
  },
  {
    id: 'opt-2',
    type: 'Schedule Optimization',
    title: 'Consolidate session times',
    description:
      'Optimize scheduling to reduce travel time between appointments by 25%.',
    impact: 'Medium',
    effort: 'Low',
    affectedCounselors: ['All Counselors'],
    estimatedTime: '1 hour',
  },
  {
    id: 'opt-3',
    type: 'Training Focus',
    title: 'Prioritize trauma cases to Sarah',
    description:
      'Route all new trauma cases to Dr. Sarah Johnson who has highest efficiency in this area.',
    impact: 'High',
    effort: 'Low',
    affectedCounselors: ['Dr. Sarah Johnson'],
    estimatedTime: '30 minutes',
  },
  {
    id: 'opt-4',
    type: 'Workload Balancing',
    title: 'Temporary case redistribution',
    description:
      'Temporarily redistribute 3 cases from Grace Thompson to balance urgent case load.',
    impact: 'High',
    effort: 'Medium',
    affectedCounselors: ['Grace Thompson', 'Lisa Rodriguez'],
    estimatedTime: '1.5 hours',
  },
];

function WorkloadOverviewPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('capacity');
  const [showOptimizations, setShowOptimizations] = useState(true);

  const filteredCounselors = useMemo(() => {
    return mockCounselors
      .filter((counselor) => {
        const matchesSearch =
          counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          counselor.specialization
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'capacity':
            return (
              b.currentLoad / b.maxCapacity - a.currentLoad / a.maxCapacity
            );
          case 'efficiency':
            return b.efficiency - a.efficiency;
          case 'urgent':
            return b.urgentCases - a.urgentCases;
          default:
            return 0;
        }
      });
  }, [searchQuery, sortBy]);

  const getCapacityColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio > 0.9) return 'bg-red-500';
    if (ratio > 0.75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-emerald-100 text-emerald-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const handleApplyOptimization = async (optimizationId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Optimization applied successfully!');
  };

  // Calculate overall statistics
  const totalCapacity = mockCounselors.reduce(
    (sum, c) => sum + c.maxCapacity,
    0
  );
  const totalCurrentLoad = mockCounselors.reduce(
    (sum, c) => sum + c.currentLoad,
    0
  );
  const overallUtilization = Math.round(
    (totalCurrentLoad / totalCapacity) * 100
  );
  const atRiskCounselors = mockCounselors.filter(
    (c) => c.burnoutRisk === 'High' || c.currentLoad / c.maxCapacity > 0.9
  ).length;
  const urgentCases = mockCounselors.reduce((sum, c) => sum + c.urgentCases, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Link to="/counselor">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Workload Overview
                </h1>
                <p className="mt-1 text-slate-600">
                  Monitor and optimize counselor workload distribution
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={showOptimizations ? 'default' : 'outline'}
              onClick={() => setShowOptimizations(!showOptimizations)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Zap className="mr-2 h-4 w-4" />
              {showOptimizations ? 'Hide' : 'Show'} Optimizations
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Overall Utilization
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {overallUtilization}%
                  </p>
                  <p className="text-xs text-slate-500">
                    {totalCurrentLoad} / {totalCapacity} capacity
                  </p>
                </div>
                <Activity className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    At Risk Counselors
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {atRiskCounselors}
                  </p>
                  <p className="text-xs text-slate-500">Need attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Urgent Cases
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {urgentCases}
                  </p>
                  <p className="text-xs text-slate-500">
                    Require immediate attention
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Avg Efficiency
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {Math.round(
                      mockCounselors.reduce((sum, c) => sum + c.efficiency, 0) /
                        mockCounselors.length
                    )}
                    %
                  </p>
                  <p className="text-xs text-slate-500">Performance score</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Optimization Suggestions */}
        {showOptimizations && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Workload Optimization Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOptimizationSuggestions.map((opt) => (
                  <div
                    key={opt.id}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="font-semibold text-slate-800">
                            {opt.title}
                          </h4>
                          <Badge className={getImpactColor(opt.impact)}>
                            {opt.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                          {opt.description}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleApplyOptimization(opt.id)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-500">
                      <span>Effort: {opt.effort}</span>
                      <span>Time: {opt.estimatedTime}</span>
                      <span>Affects: {opt.affectedCounselors.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <Input
                  placeholder="Search by counselor name or specialization..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort by"
                >
                  <option value="capacity">Sort by Capacity</option>
                  <option value="efficiency">Sort by Efficiency</option>
                  <option value="urgent">Sort by Urgent Cases</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Counselor Workload Cards */}
        <div className="space-y-4">
          {filteredCounselors.map((counselor) => (
            <Card
              key={counselor.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {counselor.name}
                        </h3>
                        <Badge
                          className={getBurnoutColor(counselor.burnoutRisk)}
                        >
                          {counselor.burnoutRisk} Burnout Risk
                        </Badge>
                        <Badge variant="outline">
                          {counselor.specialization}
                        </Badge>
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                        {/* Capacity */}
                        <div>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="text-slate-600">Capacity</span>
                            <span className="font-medium">
                              {counselor.currentLoad}/{counselor.maxCapacity}
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-200">
                            <div
                              className={`h-2 rounded-full ${getCapacityColor(counselor.currentLoad, counselor.maxCapacity)}`}
                              style={{
                                width: `${(counselor.currentLoad / counselor.maxCapacity) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            {Math.round(
                              (counselor.currentLoad / counselor.maxCapacity) *
                                100
                            )}
                            % utilized
                          </p>
                        </div>

                        {/* Efficiency */}
                        <div>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="text-slate-600">Efficiency</span>
                            <span className="font-medium">
                              {counselor.efficiency}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-200">
                            <div
                              className={`h-2 rounded-full ${
                                counselor.efficiency > 85
                                  ? 'bg-emerald-500'
                                  : counselor.efficiency > 70
                                    ? 'bg-amber-500'
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${counselor.efficiency}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="text-sm text-slate-600">
                          <div className="mb-1 flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{counselor.activeCases} active cases</span>
                          </div>
                          <div className="mb-1 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{counselor.urgentCases} urgent</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>{counselor.completedThisWeek} this week</span>
                          </div>
                        </div>

                        {/* Performance */}
                        <div className="text-sm text-slate-600">
                          <div>Avg session: {counselor.avgSessionTime}min</div>
                          <div className="mt-1">
                            {counselor.efficiency > 85 ? (
                              <span className="flex items-center gap-1 text-emerald-600">
                                <TrendingUp className="h-3 w-3" />
                                High performer
                              </span>
                            ) : counselor.efficiency > 70 ? (
                              <span className="text-amber-600">
                                Good performance
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-600">
                                <TrendingDown className="h-3 w-3" />
                                Needs support
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Reassign Cases
                        </Button>
                        <Button variant="outline" size="sm">
                          Performance Details
                        </Button>
                        {counselor.burnoutRisk === 'High' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-700"
                          >
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Support Needed
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCounselors.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No counselors found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default WorkloadOverviewPage;
