import { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ExternalLink,
  Phone,
  MapPin,
  Users,
  Heart,
  Shield,
  AlertTriangle,
  FileText,
  Video,
  Download,
  Star,
  Calendar,
  Building,
  Globe,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockResources = {
  emergency: [
    {
      id: 'emergency-1',
      name: 'National Domestic Violence Hotline',
      type: 'Emergency Support',
      description:
        '24/7 crisis intervention and support for domestic violence survivors',
      contact: '1-800-799-7233',
      website: 'https://www.thehotline.org',
      availability: '24/7',
      verified: true,
      rating: 4.9,
      specializations: [
        'Domestic Violence',
        'Crisis Intervention',
        'Emergency Support',
      ],
    },
    {
      id: 'emergency-2',
      name: 'Emergency Shelter Network',
      type: 'Emergency Housing',
      description: 'Immediate shelter placement and safety planning',
      contact: '911 (Emergency Services)',
      website: 'https://www.shelternetwork.org',
      availability: '24/7',
      verified: true,
      rating: 4.7,
      specializations: [
        'Emergency Housing',
        'Safety Planning',
        'Crisis Intervention',
      ],
    },
    {
      id: 'emergency-3',
      name: 'Crisis Text Line',
      type: 'Crisis Support',
      description: 'Free 24/7 crisis counseling via text message',
      contact: 'Text HOME to 741741',
      website: 'https://www.crisistextline.org',
      availability: '24/7',
      verified: true,
      rating: 4.8,
      specializations: [
        'Text-based Counseling',
        'Crisis Intervention',
        'Mental Health Support',
      ],
    },
  ],
  counseling: [
    {
      id: 'counseling-1',
      name: 'Trauma Recovery Institute',
      type: 'Specialized Counseling',
      description: 'Evidence-based trauma treatment and recovery programs',
      contact: '(555) 123-4567',
      website: 'https://www.traumarecovery.org',
      availability: 'Mon-Fri 9AM-6PM',
      verified: true,
      rating: 4.6,
      specializations: ['PTSD', 'Trauma', 'EMDR'],
    },
    {
      id: 'counseling-2',
      name: 'Family Support Center',
      type: 'Family Counseling',
      description: 'Comprehensive family therapy and support services',
      contact: '(555) 987-6543',
      website: 'https://www.familysupportcenter.org',
      availability: 'Mon-Sat 8AM-8PM',
      verified: true,
      rating: 4.4,
      specializations: ['Family Therapy', 'Children', 'Couples'],
    },
  ],
  legal: [
    {
      id: 'legal-1',
      name: 'Legal Aid Society',
      type: 'Legal Services',
      description: 'Free legal assistance for domestic violence and family law',
      contact: '(555) 555-0123',
      website: 'https://www.legalaid.org',
      availability: 'Mon-Fri 9AM-5PM',
      verified: true,
      rating: 4.5,
      specializations: ['Domestic Violence', 'Protection Orders', 'Custody'],
    },
  ],
  medical: [
    {
      id: 'medical-1',
      name: 'SAFE Medical Center',
      type: 'Forensic Medical Care',
      description: 'Specialized medical care for survivors of sexual assault',
      contact: '(555) 111-2222',
      website: 'https://www.safemedical.org',
      availability: '24/7 Emergency',
      verified: true,
      rating: 4.9,
      specializations: ['Sexual Assault', 'Forensic Exams', 'STI Testing'],
    },
  ],
};

const mockMaterials = [
  {
    id: 'material-1',
    title: 'Trauma-Informed Care Guide',
    type: 'Guide',
    description: 'Comprehensive guide for trauma-informed counseling practices',
    format: 'PDF',
    size: '2.4 MB',
    downloads: 1247,
    rating: 4.8,
  },
  {
    id: 'material-2',
    title: 'Safety Planning Toolkit',
    type: 'Toolkit',
    description: 'Interactive tools and worksheets for creating safety plans',
    format: 'Interactive PDF',
    size: '5.1 MB',
    downloads: 892,
    rating: 4.6,
  },
  {
    id: 'material-3',
    title: 'EMDR Training Module',
    type: 'Training',
    description: 'Self-paced EMDR therapy training for counselors',
    format: 'Video Series',
    size: '1.2 GB',
    downloads: 456,
    rating: 4.9,
  },
  {
    id: 'material-4',
    title: 'Client Intake Form Template',
    type: 'Template',
    description: 'Comprehensive intake form for new counseling clients',
    format: 'Word Document',
    size: '145 KB',
    downloads: 2156,
    rating: 4.3,
  },
];

const mockReferrals = [
  {
    id: 'ref-1',
    clientName: 'Sarah M.',
    resourceName: 'Trauma Recovery Institute',
    resourceType: 'Counseling',
    status: 'Completed',
    date: '2024-01-20',
    notes: 'Client successfully connected and began weekly sessions',
  },
  {
    id: 'ref-2',
    clientName: 'Anonymous-412',
    resourceName: 'Legal Aid Society',
    resourceType: 'Legal Services',
    status: 'Pending',
    date: '2024-01-19',
    notes: 'Initial consultation scheduled for next week',
  },
];

function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('emergency');

  const filteredResources = useMemo(() => {
    if (!mockResources[selectedCategory as keyof typeof mockResources])
      return [];
    return mockResources[selectedCategory as keyof typeof mockResources].filter(
      (resource) =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedCategory]);

  const handleReferClient = (resource: any) => {
    // Open referral form/modal
    alert(
      `Opening referral form for ${resource.name}\n\nPlease select a client to refer to this resource.`
    );
    // In a real app, this would open a modal or navigate to a referral form
    // with pre-selected resource
  };

  const handleViewReferralDetails = (referral: any) => {
    // Show detailed referral information
    const details = `
Referral Details:
Client: ${referral.clientName}
Resource: ${referral.resourceName}
Type: ${referral.resourceType}
Status: ${referral.status}
Date: ${referral.date}
Notes: ${referral.notes || 'No additional notes'}
    `;
    alert(details.trim());
    // In a real app, this would open a detailed modal or page
  };

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'emergency support':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'counseling':
        return <Heart className="h-5 w-5 text-[var(--role-counselor-accent)]" />;
      case 'legal services':
        return <Shield className="h-5 w-5 text-[var(--role-counselor-primary)]" />;
      case 'medical care':
        return <Building className="h-5 w-5 text-green-500" />;
      default:
        return <Globe className="h-5 w-5 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'In Progress':
        return 'bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Resource Directory
            </h1>
            <p className="mt-1 text-slate-600">
              Access support resources and manage referrals
            </p>
          </div>
          <Button className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90">
            <Users className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Resources
                  </p>
                  <p className="text-3xl font-bold text-slate-800">147</p>
                  <p className="mt-1 text-xs text-emerald-600">
                    +12 this month
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
                    Active Referrals
                  </p>
                  <p className="text-3xl font-bold text-slate-800">23</p>
                  <p className="mt-1 text-xs text-slate-500">
                    5 pending review
                  </p>
                </div>
                <Users className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Emergency Resources
                  </p>
                  <p className="text-3xl font-bold text-slate-800">24/7</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Always available
                  </p>
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
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold text-slate-800">89%</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Referral completion
                  </p>
                </div>
                <Award className="h-8 w-8 text-[var(--role-counselor-accent)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="space-y-6"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="counseling">Counseling</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
            </TabsList>

            <div className="relative w-full sm:w-80">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
              <Input
                placeholder="Search resources..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Resource Directory */}
          <TabsContent value={selectedCategory} className="space-y-4">
            <div className="grid gap-4">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-1 gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-slate-800">
                              {resource.name}
                            </h3>
                            {resource.verified && (
                              <Badge className="bg-emerald-100 text-emerald-800">
                                <Shield className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {resource.rating}
                            </div>
                          </div>

                          <p className="mb-3 text-slate-600">
                            {resource.description}
                          </p>

                          <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-3">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {resource.contact}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {resource.availability}
                            </div>
                            {resource.specializations && (
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                {resource.specializations
                                  .slice(0, 2)
                                  .join(', ')}
                                {resource.specializations.length > 2 &&
                                  ` +${resource.specializations.length - 2} more`}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="mr-1 h-4 w-4" />
                              Visit Website
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="mr-1 h-4 w-4" />
                              Call
                            </Button>
                            <Button
                              size="sm"
                              className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90"
                              onClick={() => handleReferClient(resource)}
                            >
                              Refer Client
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Referrals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                      <Users className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {referral.clientName}
                      </h4>
                      <p className="text-sm text-slate-600">
                        Referred to: {referral.resourceName}
                      </p>
                      <p className="text-xs text-slate-500">{referral.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(referral.status)}>
                      {referral.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewReferralDetails(referral)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Support Materials & Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mockMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--role-counselor-secondary)]/30">
                        {material.type === 'Guide' && (
                          <BookOpen className="h-6 w-6 text-[var(--role-counselor-text)]" />
                        )}
                        {material.type === 'Toolkit' && (
                          <FileText className="h-6 w-6 text-[var(--role-counselor-text)]" />
                        )}
                        {material.type === 'Training' && (
                          <Video className="h-6 w-6 text-[var(--role-counselor-text)]" />
                        )}
                        {material.type === 'Template' && (
                          <FileText className="h-6 w-6 text-[var(--role-counselor-text)]" />
                        )}
                      </div>
                      <h4 className="mb-2 text-sm font-semibold text-slate-800">
                        {material.title}
                      </h4>
                      <p className="mb-3 line-clamp-2 text-xs text-slate-600">
                        {material.description}
                      </p>
                      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                        <span>{material.format}</span>
                        <span>{material.size}</span>
                      </div>
                      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                        <span>{material.downloads} downloads</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {material.rating}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90"
                      >
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ResourcesPage;
