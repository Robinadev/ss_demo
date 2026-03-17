import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  CheckCircle,
  PlayCircle,
  FileText,
  Users,
  Calendar,
  Star,
  Download,
  ExternalLink,
  Filter,
  Plus,
  User,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const mockTrainingCourses = [
  {
    id: 'course-1',
    title: 'Trauma-Informed Care Fundamentals',
    description:
      'Comprehensive training on trauma-informed care principles and practices for counseling professionals.',
    category: 'Clinical Skills',
    level: 'Beginner',
    duration: '8 hours',
    instructor: 'Dr. Sarah Johnson',
    enrolled: 245,
    rating: 4.8,
    status: 'Available',
    mandatory: true,
    deadline: '2024-02-15',
    modules: [
      { title: 'Understanding Trauma', duration: '2h', completed: true },
      {
        title: 'Trauma-Informed Assessment',
        duration: '1.5h',
        completed: true,
      },
      { title: 'Creating Safe Environments', duration: '2h', completed: false },
      {
        title: 'Self-Care for Practitioners',
        duration: '1.5h',
        completed: false,
      },
      {
        title: 'Case Studies and Application',
        duration: '1h',
        completed: false,
      },
    ],
    progress: 40,
    certificate: null,
  },
  {
    id: 'course-2',
    title: 'Domestic Violence Intervention',
    description:
      'Advanced strategies for working with survivors of domestic violence and implementing safety plans.',
    category: 'Specialized Care',
    level: 'Intermediate',
    duration: '12 hours',
    instructor: 'Grace Thompson',
    enrolled: 156,
    rating: 4.9,
    status: 'In Progress',
    mandatory: false,
    deadline: null,
    modules: [
      { title: 'DV Dynamics and Cycle', duration: '2h', completed: true },
      { title: 'Risk Assessment Protocols', duration: '2.5h', completed: true },
      { title: 'Safety Planning Techniques', duration: '3h', completed: true },
      { title: 'Legal Advocacy Support', duration: '2.5h', completed: false },
      { title: 'Long-term Recovery Support', duration: '2h', completed: false },
    ],
    progress: 60,
    certificate: null,
  },
  {
    id: 'course-3',
    title: 'EMDR Therapy Certification',
    description:
      'Comprehensive EMDR training for trauma treatment with hands-on practice and supervision.',
    category: 'Certification',
    level: 'Advanced',
    duration: '40 hours',
    instructor: 'Dr. Michael Chen',
    enrolled: 89,
    rating: 4.7,
    status: 'Completed',
    mandatory: false,
    deadline: null,
    modules: [
      { title: 'EMDR Theory and Research', duration: '4h', completed: true },
      { title: 'EMDR Protocol Overview', duration: '6h', completed: true },
      { title: 'Target Sequence Planning', duration: '8h', completed: true },
      { title: 'Practical Application', duration: '12h', completed: true },
      { title: 'Advanced Techniques', duration: '6h', completed: true },
      { title: 'Certification Exam', duration: '4h', completed: true },
    ],
    progress: 100,
    certificate: 'EMDR-Certified',
  },
  {
    id: 'course-4',
    title: 'Cultural Competency in Counseling',
    description:
      'Developing cultural awareness and competence in multicultural counseling practice.',
    category: 'Professional Development',
    level: 'All Levels',
    duration: '6 hours',
    instructor: 'Lisa Rodriguez',
    enrolled: 312,
    rating: 4.6,
    status: 'Available',
    mandatory: true,
    deadline: '2024-03-01',
    modules: [
      { title: 'Cultural Self-Awareness', duration: '1.5h', completed: false },
      {
        title: 'Understanding Cultural Differences',
        duration: '2h',
        completed: false,
      },
      {
        title: 'Bias Recognition and Mitigation',
        duration: '1.5h',
        completed: false,
      },
      {
        title: 'Culturally Adapted Interventions',
        duration: '1h',
        completed: false,
      },
    ],
    progress: 0,
    certificate: null,
  },
];

const mockResources = [
  {
    id: 'resource-1',
    title: 'DSM-5 Quick Reference Guide',
    type: 'Reference Material',
    category: 'Clinical Tools',
    downloads: 1247,
    rating: 4.5,
    lastUpdated: '2024-01-15',
    description:
      'Essential diagnostic criteria and codes for mental health professionals',
  },
  {
    id: 'resource-2',
    title: 'Crisis Intervention Protocols',
    type: 'Guidelines',
    category: 'Emergency Response',
    downloads: 892,
    rating: 4.8,
    lastUpdated: '2024-01-10',
    description: 'Step-by-step protocols for handling crisis situations',
  },
  {
    id: 'resource-3',
    title: 'Ethics in Counseling Webinar Series',
    type: 'Video Training',
    category: 'Ethics',
    downloads: 567,
    rating: 4.9,
    lastUpdated: '2024-01-08',
    description: 'Comprehensive video series on ethical decision-making',
  },
];

const categories = [
  'All',
  'Clinical Skills',
  'Specialized Care',
  'Certification',
  'Professional Development',
  'Ethics',
];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];
const statuses = ['All', 'Available', 'In Progress', 'Completed'];

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  enrolled: number;
  rating: number;
  status: string;
  mandatory?: boolean;
  deadline?: string | null;
  modules: Array<{
    title: string;
    duration: string;
    completed: boolean;
  }>;
  progress: number;
  certificate?: string | null;
}

function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('courses'); // "courses" or "resources"
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return mockTrainingCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'All' || course.category === categoryFilter;
      const matchesLevel =
        levelFilter === 'All' || course.level === levelFilter;
      const matchesStatus =
        statusFilter === 'All' || course.status === statusFilter;
      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });
  }, [searchQuery, categoryFilter, levelFilter, statusFilter]);

  const filteredResources = useMemo(() => {
    return mockResources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-100 text-emerald-800';
      case 'Intermediate':
        return 'bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]';
      case 'Advanced':
        return 'bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]';
      case 'All Levels':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800';
      case 'In Progress':
        return 'bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]';
      case 'Completed':
        return 'bg-[var(--role-counselor-secondary)]/20 text-[var(--role-counselor-text)]';
      default:
        return 'bg-[var(--role-counselor-secondary)]/20 text-[var(--role-counselor-text)]';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-[var(--role-counselor-primary)]';
    if (progress >= 50) return 'bg-[var(--role-counselor-accent)]';
    return 'bg-[var(--role-counselor-primary)]';
  };

  const handleEnrollCourse = async (courseId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Successfully enrolled in course!');
  };

  const handleStartModule = async (courseId: string, moduleIndex: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert('Starting module...');
  };

  const handleDownloadResource = async (resourceId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Resource downloaded successfully!');
  };

  // Calculate statistics
  const totalCourses = mockTrainingCourses.length;
  const completedCourses = mockTrainingCourses.filter(
    (c) => c.status === 'Completed'
  ).length;
  const inProgressCourses = mockTrainingCourses.filter(
    (c) => c.status === 'In Progress'
  ).length;
  const mandatoryCourses = mockTrainingCourses.filter(
    (c) => c.mandatory
  ).length;
  const avgRating =
    mockTrainingCourses.reduce((sum, c) => sum + c.rating, 0) /
    mockTrainingCourses.length;

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCourse(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Training
            </Button>
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {selectedCourse.title}
                </h1>
                <p className="mt-1 text-slate-600">
                  by {selectedCourse.instructor}
                </p>
              </div>
            </div>
          </div>

          {/* Course Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
                <div>
                  <div className="mb-1 text-sm font-medium text-slate-600">
                    Progress
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {selectedCourse.progress}%
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(selectedCourse.progress)}`}
                      style={{ width: `${selectedCourse.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium text-slate-600">
                    Duration
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {selectedCourse.duration}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium text-slate-600">
                    Level
                  </div>
                  <Badge className={getLevelColor(selectedCourse.level)}>
                    {selectedCourse.level}
                  </Badge>
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium text-slate-600">
                    Rating
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-lg font-bold">
                      {selectedCourse.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 font-semibold text-slate-800">
                  Description
                </h3>
                <p className="text-slate-700">{selectedCourse.description}</p>
              </div>

              {selectedCourse.certificate && (
                <div className="mb-6 rounded-lg bg-emerald-50 p-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-emerald-800">
                        Certificate Earned
                      </h4>
                      <p className="text-sm text-emerald-700">
                        {selectedCourse.certificate}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedCourse.mandatory && selectedCourse.deadline && (
                <div className="mb-6 rounded-lg bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                    <div>
                      <h4 className="font-semibold text-amber-800">
                        Mandatory Training
                      </h4>
                      <p className="text-sm text-amber-700">
                        This course is mandatory. Deadline:{' '}
                        {new Date(selectedCourse.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Course Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedCourse.modules.map((module, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          module.completed
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[var(--role-counselor-secondary)]/20 text-[var(--role-counselor-text)]'
                        }`}
                      >
                        {module.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">
                          {module.title}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {module.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.completed ? (
                        <Badge className="bg-emerald-100 text-emerald-800">
                          Completed
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStartModule(selectedCourse.id, index)
                          }
                          className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90"
                        >
                          <PlayCircle className="mr-1 h-4 w-4" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
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
              <BookOpen className="h-8 w-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Training & Resources
                </h1>
                <p className="mt-1 text-slate-600">
                  Professional development courses and reference materials
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Courses
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {totalCourses}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-[var(--role-counselor-primary)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {completedCourses}
                  </p>
                  <p className="text-xs text-emerald-600">
                    {Math.round((completedCourses / totalCourses) * 100)}%
                    completion rate
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {inProgressCourses}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Mandatory
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {mandatoryCourses}
                  </p>
                  <p className="text-xs text-amber-600">required courses</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Avg Rating
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {avgRating.toFixed(1)}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(avgRating) ? 'fill-current text-yellow-500' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-slate-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex w-fit gap-1 rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab('courses')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'courses'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Courses ({filteredCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'resources'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Resources ({filteredResources.length})
          </button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {activeTab === 'courses' && (
                <div className="flex gap-2">
                  <select
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    aria-label="Filter by category"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    aria-label="Filter by level"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter by status"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--role-counselor-secondary)]/30">
                        <BookOpen className="h-8 w-8 text-[var(--role-counselor-text)]" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-slate-800">
                            {course.title}
                          </h3>
                          <Badge className={getLevelColor(course.level)}>
                            {course.level}
                          </Badge>
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                          {course.mandatory && (
                            <Badge className="bg-red-100 text-red-800">
                              Mandatory
                            </Badge>
                          )}
                        </div>

                        <p className="mb-3 text-slate-700">
                          {course.description}
                        </p>

                        <div className="mb-4 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Instructor: {course.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Duration: {course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Enrolled: {course.enrolled}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                            <span>Rating: {course.rating}</span>
                          </div>
                        </div>

                        {course.progress > 0 &&
                          course.status === 'In Progress' && (
                            <div className="mb-4">
                              <div className="mb-1 flex justify-between text-sm">
                                <span className="text-slate-600">Progress</span>
                                <span className="font-medium">
                                  {course.progress}%
                                </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-slate-200">
                                <div
                                  className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                        {course.deadline && (
                          <div className="mb-4 rounded-lg bg-amber-50 p-3">
                            <div className="flex items-center gap-2 text-sm text-amber-800">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Deadline:{' '}
                                {new Date(course.deadline).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {course.status === 'Available' && (
                            <Button
                              onClick={() => handleEnrollCourse(course.id)}
                              className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Enroll
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => setSelectedCourse(course)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          {course.certificate && (
                            <Button variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Certificate
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
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <Card
                key={resource.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-100">
                        <FileText className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-slate-800">
                            {resource.title}
                          </h3>
                          <Badge variant="outline">{resource.type}</Badge>
                          <Badge variant="outline">{resource.category}</Badge>
                        </div>

                        <p className="mb-3 text-slate-700">
                          {resource.description}
                        </p>

                        <div className="mb-4 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-3">
                          <div className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            <span>{resource.downloads} downloads</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                            <span>Rating: {resource.rating}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Updated:{' '}
                              {new Date(
                                resource.lastUpdated
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleDownloadResource(resource.id)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button variant="outline">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {(activeTab === 'courses' ? filteredCourses : filteredResources)
          .length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No {activeTab} found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default TrainingPage;
