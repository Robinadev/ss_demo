import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  User,
  Shield,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  AlertTriangle,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const mockProfessionals = [
  {
    id: 'prof-1',
    name: 'Dr. Sarah Johnson',
    role: 'Clinical Psychologist',
    specialization: ['Trauma', 'PTSD', 'Anxiety'],
    experience: '12 years',
    location: 'Downtown Counseling Center',
    availability: 'Available',
    rating: 4.9,
    activeCases: 8,
    maxCapacity: 15,
    certifications: [
      'Licensed Psychologist',
      'EMDR Certified',
      'Trauma-Focused CBT',
    ],
    contact: {
      phone: '(555) 123-4567',
      email: 'sarah.johnson@safehaven.org',
    },
  },
  {
    id: 'prof-2',
    name: 'Michael Chen, LCSW',
    role: 'Licensed Clinical Social Worker',
    specialization: [
      'Domestic Violence',
      'Family Therapy',
      'Crisis Intervention',
    ],
    experience: '8 years',
    location: 'North District Office',
    availability: 'Limited Availability',
    rating: 4.7,
    activeCases: 12,
    maxCapacity: 18,
    certifications: ['LCSW', 'DV Specialist'],
    contact: {
      phone: '(555) 234-5678',
      email: 'michael.chen@safehaven.org',
    },
  },
  {
    id: 'prof-3',
    name: 'Dr. Emily Rodriguez',
    role: 'Trauma Specialist',
    specialization: ['Sexual Assault', 'Trauma Recovery', 'Group Therapy'],
    experience: '15 years',
    location: 'SAFE Medical Center',
    availability: 'Fully Booked',
    rating: 4.8,
    activeCases: 16,
    maxCapacity: 12,
    certifications: [
      'MD',
      'Trauma Surgery',
      'Sexual Assault Forensic Examiner',
    ],
    contact: {
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@safehaven.org',
    },
  },
  {
    id: 'prof-4',
    name: 'James Wilson, LMFT',
    role: 'Licensed Marriage & Family Therapist',
    specialization: ['Family Violence', 'Couples Therapy', "Children's Trauma"],
    experience: '10 years',
    location: 'Family Support Center',
    availability: 'Available',
    rating: 4.6,
    activeCases: 9,
    maxCapacity: 14,
    certifications: ['LMFT', 'Certified Family Trauma Professional'],
    contact: {
      phone: '(555) 456-7890',
      email: 'james.wilson@safehaven.org',
    },
  },
];

function ProfessionListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  const filteredProfessionals = useMemo(() => {
    return mockProfessionals.filter((prof) => {
      const matchesSearch =
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.specialization.some((spec) =>
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesSpecialization =
        selectedSpecialization === 'All' ||
        prof.specialization.includes(selectedSpecialization);
      const matchesAvailability =
        selectedAvailability === 'All' ||
        prof.availability === selectedAvailability;
      return matchesSearch && matchesSpecialization && matchesAvailability;
    });
  }, [searchQuery, selectedSpecialization, selectedAvailability]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800';
      case 'Limited Availability':
        return 'bg-amber-100 text-amber-800';
      case 'Fully Booked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getCapacityStatus = (active: number, max: number) => {
    const percentage = (active / max) * 100;
    if (percentage >= 90) return 'Critical';
    if (percentage >= 75) return 'High';
    if (percentage >= 50) return 'Moderate';
    return 'Low';
  };

  const allSpecializations = Array.from(
    new Set(mockProfessionals.flatMap((prof) => prof.specialization))
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Link to="/counselor/cases">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cases
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Professional Directory
              </h1>
              <p className="mt-1 text-slate-600">
                Available professionals for case assignment
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Professionals
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {mockProfessionals.length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Available Now
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {
                      mockProfessionals.filter(
                        (p) => p.availability === 'Available'
                      ).length
                    }
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
                    At Capacity
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {
                      mockProfessionals.filter(
                        (p) =>
                          getCapacityStatus(p.activeCases, p.maxCapacity) ===
                          'Critical'
                      ).length
                    }
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
                    Avg Rating
                  </p>
                  <p className="text-3xl font-bold text-slate-800">4.8</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <Input
                  placeholder="Search by name, role, or specialization..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  aria-label="Filter by specialization"
                >
                  <option value="All">All Specializations</option>
                  {allSpecializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  aria-label="Filter by availability"
                >
                  <option value="All">All Availability</option>
                  <option value="Available">Available</option>
                  <option value="Limited Availability">Limited</option>
                  <option value="Fully Booked">Fully Booked</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professionals List */}
        <div className="grid gap-6">
          {filteredProfessionals.map((professional) => {
            const capacityStatus = getCapacityStatus(
              professional.activeCases,
              professional.maxCapacity
            );
            return (
              <Card
                key={professional.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                        <User className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-800">
                            {professional.name}
                          </h3>
                          <Badge
                            className={getAvailabilityColor(
                              professional.availability
                            )}
                          >
                            {professional.availability}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {professional.rating}
                          </div>
                        </div>

                        <p className="mb-3 text-slate-600">
                          {professional.role}
                        </p>

                        <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-3">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            {professional.experience} experience
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {professional.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {professional.activeCases}/
                            {professional.maxCapacity} cases
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="mb-2 text-sm font-medium text-slate-700">
                            Specializations:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {professional.specialization.map((spec, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="mb-2 text-sm font-medium text-slate-700">
                            Certifications:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {professional.certifications
                              .slice(0, 3)
                              .map((cert, index) => (
                                <Badge
                                  key={index}
                                  className="bg-blue-100 text-xs text-blue-800"
                                >
                                  <Award className="mr-1 h-3 w-3" />
                                  {cert}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="flex gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {professional.contact.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {professional.contact.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            capacityStatus === 'Critical'
                              ? 'text-red-600'
                              : capacityStatus === 'High'
                                ? 'text-amber-600'
                                : 'text-emerald-600'
                          }`}
                        >
                          {capacityStatus}
                        </div>
                        <div className="text-xs tracking-widest text-slate-500 uppercase">
                          Capacity Status
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700"
                          onClick={() =>
                            alert(`Assigning case to ${professional.name}...`)
                          }
                        >
                          Assign Case
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProfessionals.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-600">
                No professionals found
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

export default ProfessionListPage;
