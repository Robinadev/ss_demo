import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  GraduationCap,
  ClipboardList,
  Search,
  Building2,
  MapPin,
  ChevronRight,
  Target,
  Users,
  Award,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Heart,
  Sparkles,
  Laptop,
} from 'lucide-react';

export function EmpowermentPage() {
  const [, setActiveTab] = useState('opportunities');

  const opportunities = [
    {
      id: 'OP-001',
      title: 'Community Outreach Specialist',
      organization: 'SafeHaven NGO',
      type: 'Full-time',
      location: 'Hawassa, Ethiopia',
      verified: true,
      category: 'Social Work',
      posted: '2d ago',
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      id: 'OP-002',
      title: 'Data Entry & Admin support',
      organization: 'TechForward Ethiopia',
      type: 'Remote',
      verified: true,
      category: 'Administration',
      posted: '3d ago',
      icon: Laptop,
      color: 'text-amber-600',
      bg: 'bg-amber-500/10',
    },
    {
      id: 'OP-003',
      title: 'Support Group Volunteer',
      organization: 'Healing Wings Foundation',
      type: 'Part-time',
      location: 'Addis Ababa',
      verified: true,
      category: 'Volunteer',
      posted: '5d ago',
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
    },
  ];

  const trainingPrograms = [
    {
      id: 'TR-001',
      title: 'Digital Literacy & Office Essentials',
      provider: 'Global Skills Hub',
      duration: '6 Weeks',
      modality: 'Hybrid',
      spots: 12,
      icon: BookOpen,
      level: 'Beginner',
      rating: 4.9,
    },
    {
      id: 'TR-002',
      title: 'Resilience & Entrepreneurship Workshop',
      provider: 'Hope Venture Capital',
      duration: '4 Days',
      modality: 'In-person (Addis Ababa)',
      spots: 5,
      icon: Target,
      level: 'All Levels',
      rating: 4.8,
    },
    {
      id: 'TR-003',
      title: 'Micro-Business Management',
      provider: 'Ethio-Growth Lab',
      duration: '3 Months',
      modality: 'Online',
      spots: 25,
      icon: GraduationCap,
      level: 'Intermediate',
      rating: 4.7,
    },
  ];

  const myApplications = [
    {
      id: 'APP-4422',
      target: 'Community Outreach Specialist',
      org: 'SafeHaven NGO',
      date: 'Oct 18, 2025',
      status: 'Under Review',
      step: 2,
    },
    {
      id: 'APP-3910',
      target: 'Digital Literacy Course',
      org: 'Global Skills Hub',
      date: 'Oct 15, 2025',
      status: 'Accepted',
      step: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 dark:bg-[#020617]">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-white pt-16 pb-12 dark:border-slate-800 dark:bg-slate-900">
        {/* Subtle Moroccan Pattern Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l2.5 7.5L40 10l-7.5 2.5L30 20l-2.5-7.5L20 10l7.5-2.5z' fill='%23708D81' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary/10 rounded-lg p-2">
                <Award className="text-primary h-5 w-5" />
              </div>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-wider uppercase"
              >
                Growth & Recovery
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
              Empowerment <span className="text-primary">& Career</span> Portal
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Curated opportunities, training, and resources designed to support
              your journey towards long-term resilience and independence.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="relative max-w-md flex-grow">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search jobs, workshops, or organizations..."
                  className="focus:ring-primary h-12 rounded-2xl border-slate-200 bg-slate-50 pl-12 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 shadow-primary/20 h-12 rounded-2xl px-8 font-bold shadow-lg">
                Find Opportunity
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs
          defaultValue="opportunities"
          className="space-y-8"
          onValueChange={setActiveTab}
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <TabsList className="h-14 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <TabsTrigger
                value="opportunities"
                className="data-[state=active]:bg-primary h-full rounded-xl px-8 shadow-none transition-all data-[state=active]:text-white"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Jobs & Volunteer
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className="data-[state=active]:bg-primary h-full rounded-xl px-8 shadow-none transition-all data-[state=active]:text-white"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Training Programs
              </TabsTrigger>
              <TabsTrigger
                value="tracker"
                className="data-[state=active]:bg-primary h-full rounded-xl px-8 shadow-none transition-all data-[state=active]:text-white"
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                My Applications
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="h-4 w-4 text-amber-500" />
                12 New Listings
              </span>
              <div className="h-4 w-px bg-slate-300"></div>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="text-primary h-4 w-4" />
                Verified Partners Only
              </span>
            </div>
          </div>

          <TabsContent value="opportunities" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {opportunities.map((op) => (
                <Card
                  key={op.id}
                  className="group hover:border-primary/20 overflow-hidden border border-none border-transparent bg-white shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 dark:bg-slate-900/50 dark:shadow-none"
                >
                  <div className="p-6">
                    <div className="mb-6 flex items-start justify-between">
                      <div
                        className={`h-14 w-14 rounded-2xl ${op.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                      >
                        <op.icon className={`h-7 w-7 ${op.color}`} />
                      </div>
                      <Badge className="rounded-full border-none bg-slate-100 px-3 py-1 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {op.posted}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                            {op.title}
                          </h3>
                          {op.verified && (
                            <CheckCircle2 className="text-primary h-4 w-4" />
                          )}
                        </div>
                        <p className="flex items-center gap-1.5 font-medium text-slate-500">
                          <Building2 className="h-4 w-4" />
                          {op.organization}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-full border-slate-200 text-xs font-medium"
                        >
                          {op.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="rounded-full border-slate-200 text-xs font-medium"
                        >
                          <MapPin className="mr-1 h-3 w-3" />
                          {op.location || 'Remote'}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="rounded-full border-slate-200 text-xs font-medium"
                        >
                          {op.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <Button className="bg-primary hover:bg-primary/90 flex-grow rounded-xl font-bold">
                        Apply Now
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-primary/5 hover:text-primary rounded-xl border-slate-200 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <Button
                variant="ghost"
                className="hover:text-primary font-bold text-slate-500"
              >
                View All Opportunities
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="training" className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trainingPrograms.map((tr) => (
                <Card
                  key={tr.id}
                  className="group overflow-hidden border-none bg-white shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:bg-slate-900/50 dark:shadow-none"
                >
                  <div className="from-primary via-secondary to-accent h-2 w-full bg-gradient-to-r"></div>
                  <CardContent className="p-6">
                    <div className="mb-6 flex gap-4">
                      <div className="text-primary flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
                        <tr.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="leading-tight font-bold text-slate-800 dark:text-slate-200">
                          {tr.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500">
                          {tr.provider}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Duration
                        </p>
                        <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                          <Clock className="h-3 w-3" />
                          {tr.duration}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Modality
                        </p>
                        <p className="truncate text-xs font-bold text-slate-700 dark:text-slate-300">
                          {tr.modality}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Level
                        </p>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {tr.level}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Spots Left
                        </p>
                        <p className="text-primary text-xs font-bold">
                          {tr.spots} Available
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      className="bg-primary/5 text-primary hover:bg-primary/10 w-full rounded-xl border-none font-bold"
                    >
                      Join Waiting List
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tracker" className="mt-0">
            <Card className="overflow-hidden border-none bg-white shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:bg-slate-900/50 dark:shadow-none">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="text-xl">Active Applications</CardTitle>
                <CardDescription>
                  Track the status of your recent submissions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-50 bg-slate-50/50 dark:border-slate-800 dark:bg-transparent">
                        <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Application
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Organization
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Applied On
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Pipeline
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {myApplications.map((app) => (
                        <tr
                          key={app.id}
                          className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/20"
                        >
                          <td className="px-6 py-5">
                            <p className="font-bold text-slate-800 dark:text-slate-200">
                              {app.target}
                            </p>
                            <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                              {app.id}
                            </p>
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                            {app.org}
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-500">
                            {app.date}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <div
                                  key={s}
                                  className={`h-1.5 w-6 rounded-full ${
                                    s <= app.step
                                      ? app.status === 'Accepted'
                                        ? 'bg-primary'
                                        : 'bg-secondary'
                                      : 'bg-slate-200 dark:bg-slate-700'
                                  }`}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <Badge
                              className={`${
                                app.status === 'Accepted'
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-secondary/10 text-secondary'
                              } border-none`}
                            >
                              {app.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-primary/10 hover:text-primary rounded-full"
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="from-primary/10 flex items-start gap-4 border-none bg-gradient-to-br to-transparent p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
                  <Laptop className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-slate-800 dark:text-slate-200">
                    Resume Builder
                  </h4>
                  <p className="mb-4 text-sm text-slate-500">
                    Create a professional profile that highlights your growth
                    and resilient mindset.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary/20 text-primary rounded-xl bg-white/50"
                  >
                    Start Building
                  </Button>
                </div>
              </Card>
              <Card className="from-secondary/10 flex items-start gap-4 border-none bg-gradient-to-br to-transparent p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
                  <Heart className="text-secondary h-6 w-6" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-slate-800 dark:text-slate-200">
                    Mentorship Program
                  </h4>
                  <p className="mb-4 text-sm text-slate-500">
                    Connect with experienced professionals who understand your
                    journey.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-secondary/20 text-secondary rounded-xl bg-white/50"
                  >
                    Find a Mentor
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
