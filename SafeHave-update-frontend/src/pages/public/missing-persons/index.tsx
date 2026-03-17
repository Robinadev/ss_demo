import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  User,
  Shield,
  Eye,
  AlertTriangle,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for missing persons reports
const MOCK_MISSING_PERSONS = [
  {
    id: 'MP-2025-0018',
    name: 'Sara M.',
    age: 24,
    gender: 'Female',
    lastSeenLocation: 'Addis Ababa, Bole Area',
    lastSeenDate: '2025-01-15',
    lastSeenTime: '14:30',
    physicalDescription:
      'Height: 165cm, long black hair, last seen wearing blue jacket and jeans. Speaks Amharic and English.',
    photo: null,
    circumstances: 'Mental health concerns, left home without medication',
    reporterRelationship: 'Family',
    contactMethod: 'secure',
    publicConsent: true,
    status: 'verified',
    dateReported: '2025-01-16',
    sightings: 2,
  },
  {
    id: 'MP-2025-0017',
    name: null, // Anonymous case
    age: 16,
    gender: 'Male',
    lastSeenLocation: 'Hawassa',
    lastSeenDate: '2025-01-10',
    lastSeenTime: '18:00',
    physicalDescription:
      'Height: 170cm, short curly hair, school uniform. Shy demeanor.',
    photo: null,
    circumstances: 'Bullying-related disappearance from school',
    reporterRelationship: 'Family',
    contactMethod: 'email',
    publicConsent: true,
    status: 'verified',
    dateReported: '2025-01-11',
    sightings: 0,
  },
  {
    id: 'MP-2025-0016',
    name: 'Yordanos T.',
    age: 32,
    gender: 'Female',
    lastSeenLocation: 'Addis Ababa, Merkato',
    lastSeenDate: '2025-01-08',
    lastSeenTime: '11:00',
    physicalDescription:
      'Height: 160cm, braided hair, distinctive scar on left cheek. Last seen in traditional dress.',
    photo: null,
    circumstances: 'Suspected trafficking situation',
    reporterRelationship: 'Friend',
    contactMethod: 'secure',
    publicConsent: true,
    status: 'verified',
    dateReported: '2025-01-09',
    sightings: 1,
  },
  {
    id: 'MP-2025-0015',
    name: null,
    age: 45,
    gender: 'Male',
    lastSeenLocation: 'Dire Dawa',
    lastSeenDate: '2025-01-05',
    lastSeenTime: '09:00',
    physicalDescription:
      'Height: 175cm, bald, glasses. Walking with slight limp.',
    photo: null,
    circumstances: 'Mental health crisis, left treatment facility',
    reporterRelationship: 'Other',
    contactMethod: 'phone',
    publicConsent: true,
    status: 'pending',
    dateReported: '2025-01-05',
    sightings: 0,
  },
];

const GENDER_OPTIONS = ['Male', 'Female'];
const RELATIONSHIP_OPTIONS = ['Family', 'Friend', 'Witness', 'Other'];
const CONTACT_METHODS = ['Email', 'Phone', 'Secure Platform Messaging'];

interface MissingPerson {
  id: string;
  name: string | null;
  age: number;
  gender: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  lastSeenTime: string;
  physicalDescription: string;
  photo: string | null;
  circumstances: string;
  reporterRelationship: string;
  contactMethod: string;
  publicConsent: boolean;
  status: string;
  dateReported: string;
  sightings: number;
}

interface MissingPersonFormData {
  name: string;
  age: string;
  gender: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  lastSeenTime: string;
  physicalDescription: string;
  photo: File | null;
  circumstances: string;
  reporterRelationship: string;
  contactMethod: string;
  contactEmail: string;
  contactPhone: string;
  publicConsent: boolean;
}

export function MissingPersonsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: 'All',
    location: 'All',
    status: 'All',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showSightingForm, setShowSightingForm] = useState<string | null>(null);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [filteredCases, setFilteredCases] = useState<MissingPerson[]>([]);
  const [formData, setFormData] = useState<MissingPersonFormData>({
    // Missing Person Details
    name: '',
    age: '',
    gender: '',
    lastSeenLocation: '',
    lastSeenDate: '',
    lastSeenTime: '',
    physicalDescription: '',
    photo: null,

    // Circumstances
    circumstances: '',
    reporterRelationship: '',

    // Contact & Consent
    contactMethod: '',
    contactEmail: '',
    contactPhone: '',
    publicConsent: false,
  });

  // Filter cases based on search and filters
  useEffect(() => {
    let results = MOCK_MISSING_PERSONS.filter(
      (caseItem) => caseItem.status === 'verified' && caseItem.publicConsent
    );

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (caseItem) =>
          caseItem.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          caseItem.physicalDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          caseItem.lastSeenLocation
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          caseItem.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Gender filter
    if (filters.gender !== 'All') {
      results = results.filter(
        (caseItem) => caseItem.gender === filters.gender
      );
    }

    // Location filter
    if (filters.location !== 'All') {
      results = results.filter((caseItem) =>
        caseItem.lastSeenLocation
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    setFilteredCases(results);
  }, [searchTerm, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (
    field: keyof MissingPersonFormData,
    value: string | boolean | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to secure storage
      alert(
        'Photo uploaded securely. Note: Location metadata will be automatically removed for safety.'
      );
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const submitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to backend for admin verification
    toast.success('Report submitted successfully! Our team will verify it before making it public. You will be notified once verified.');
    setShowReportForm(false);
    setFormData({
      name: '',
      age: '',
      gender: '',
      lastSeenLocation: '',
      lastSeenDate: '',
      lastSeenTime: '',
      physicalDescription: '',
      photo: null,
      circumstances: '',
      reporterRelationship: '',
      contactMethod: '',
      contactEmail: '',
      contactPhone: '',
      publicConsent: false,
    });
  };

  const submitSighting = (caseId: string, _sightingData: any) => {
    // In a real app, this would send to admins and the reporter
    console.log('Sighting for case:', caseId);
    alert('Sighting report submitted. Our team will follow up on this lead.');
    setShowSightingForm(null);
  };

  const clearFilters = () => {
    setFilters({
      gender: 'All',
      location: 'All',
      status: 'All',
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-background)] to-[var(--color-muted)]">
      {/* Header Section */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]">
                <User className="h-6 w-6 text-[var(--color-foreground)]" />
              </div>
              <h1 className="heading-amharic text-4xl font-bold">
                Missing Persons
              </h1>
            </div>
            <div className="tibeb-divider mx-auto mb-6 max-w-md"></div>
            <p className="mb-2 text-lg text-[var(--color-muted-foreground)]">
              Community-powered search with verified, safe information
            </p>
            <p className="text-[var(--color-muted-foreground)]">
              All cases are verified by administrators to ensure accuracy and
              prevent misuse
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Safety Notice */}
        <section className="animate-fade-in-up mb-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-lg bg-[var(--color-accent)] p-4 text-[var(--color-accent-foreground)]">
              <div className="flex items-start">
                <Shield className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="mb-1 font-medium">Safety First</p>
                  <p className="text-sm">
                    We protect everyone's privacy. Sensitive details are never
                    shown publicly. All reports are verified by admins before
                    appearing here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mb-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => setShowReportForm(true)}
                className="flex items-center gap-2 rounded-xl bg-[#C15B3E] px-6 py-3 text-[var(--color-foreground)] font-bold shadow-lg hover:bg-[#8c3e2b] transition-colors"
              >
                <User className="h-5 w-5" />
                Report Missing Person
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-[#6B705C] px-6 py-3 text-[var(--color-foreground)] font-bold shadow-lg hover:bg-[#4a5a46] transition-colors" onClick={() => setShowSafetyModal(true)}>
                <Eye className="h-5 w-5" />
                Safety Guidelines
              </button>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="animate-fade-in-up mb-8">
          <div className="card mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[var(--color-muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search by location, description, or case ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="button-secondary flex items-center justify-center gap-2 lg:w-auto"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="animate-scale-in border-t border-[var(--color-border)] pt-6">
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Gender Filter */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="mb-2 block text-sm font-medium"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      value={filters.gender}
                      onChange={(e) =>
                        handleFilterChange('gender', e.target.value)
                      }
                      className="w-full rounded-lg border border-[var(--color-border)] p-2"
                    >
                      <option value="All">All Genders</option>
                      {GENDER_OPTIONS.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label
                      htmlFor="location"
                      className="mb-2 block text-sm font-medium"
                    >
                      Location
                    </label>
                    <select
                      id="location"
                      value={filters.location}
                      onChange={(e) =>
                        handleFilterChange('location', e.target.value)
                      }
                      className="w-full rounded-lg border border-[var(--color-border)] p-2"
                    >
                      <option value="All">All Locations</option>
                      <option value="Addis Ababa">Addis Ababa</option>
                      <option value="Hawassa">Hawassa</option>
                      <option value="Dire Dawa">Dire Dawa</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium"
                    >
                      Case Status
                    </label>
                    <select
                      id="status"
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange('status', e.target.value)
                      }
                      className="w-full rounded-lg border border-[var(--color-border)] p-2"
                    >
                      <option value="All">All Cases</option>
                      <option value="verified">Verified Only</option>
                      <option value="recent">Recent (Last 7 days)</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {filteredCases.length} verified cases
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Missing Persons Grid */}
        <section className="mb-12">
          <div className="mx-auto max-w-6xl">
            {filteredCases.length === 0 ? (
              <div className="card py-12 text-center">
                <User className="mx-auto mb-4 h-12 w-12 text-[var(--color-muted-foreground)]" />
                <h3 className="mb-2 text-xl font-medium">No cases found</h3>
                <p className="mb-4 text-[var(--color-muted-foreground)]">
                  {searchTerm || Object.values(filters).some((f) => f !== 'All')
                    ? 'Try adjusting your search criteria or filters'
                    : 'No verified missing persons cases at this time'}
                </p>
                <button onClick={clearFilters} className="button-primary">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="group relative overflow-hidden rounded-2xl border-2 border-[var(--color-border)] border-l-[var(--color-primary)] bg-[var(--color-card)] shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    {/* Top Official Banner */}
                    <div className="flex items-center justify-between border-b border-[var(--color-secondary)] bg-[var(--color-secondary)] px-4 py-1.5">
                      <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-[var(--color-foreground)] uppercase">
                        <AlertTriangle className="h-3 w-3" />
                        Active Search
                      </span>
                      <span className="font-mono text-[10px] text-[var(--color-foreground)]/70">
                        {caseItem.id}
                      </span>
                    </div>

                    <div className="p-5">
                      {/* Case Header with Profile */}
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-[var(--color-primary)]/10 bg-gradient-to-br from-[#FDFDF5] to-[#6B705C]/30 transition-transform duration-300 group-hover:scale-105">
                          {caseItem.photo ? (
                            <img
                              src={caseItem.photo}
                              alt={caseItem.name || 'Missing Person'}
                              className="h-full w-full rounded-2xl object-cover"
                            />
                          ) : (
                            <User className="h-8 w-8 text-[var(--color-primary)]/40" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-xl leading-tight font-bold text-[var(--color-foreground)]">
                            {caseItem.name || 'Anonymous Case'}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="rounded border border-[var(--color-primary)]/10 bg-[var(--color-background)] px-2 py-0.5 text-xs font-semibold text-[var(--color-primary)]">
                              {caseItem.age} Years • {caseItem.gender}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Vital Information Grid */}
                      <div className="mb-6 grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--colors-grey-1)]">
                            <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold tracking-wider text-[var(--color-muted-foreground)] uppercase">
                              Last Seen Location
                            </p>
                            <p className="text-sm font-medium text-[var(--color-foreground)]">
                              {caseItem.lastSeenLocation}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--colors-grey-1)]">
                            <Calendar className="h-4 w-4 text-[var(--color-primary)]" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold tracking-wider text-[var(--color-muted-foreground)] uppercase">
                              Last Seen On
                            </p>
                            <p className="text-sm font-medium text-[var(--color-foreground)]">
                              {new Date(
                                caseItem.lastSeenDate
                              ).toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                              <span className="ml-1 font-normal text-[var(--color-muted-foreground)]">
                                at {caseItem.lastSeenTime}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Description Snippet */}
                      <div className="mb-6 rounded-xl border border-[var(--color-primary)]/5 bg-[var(--color-background)] p-3">
                        <p className="line-clamp-2 text-xs leading-relaxed text-[var(--color-foreground)]/80 italic">
                          "{caseItem.physicalDescription}"
                        </p>
                      </div>

                      {/* Case Stats & Status */}
                      <div className="mb-6 flex items-center justify-between border-y border-[var(--color-border)] py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
                          <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase">
                            Verified Report
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase">
                            Sightings
                          </p>
                          <p className="text-sm font-bold text-[var(--color-primary)]">
                            {caseItem.sightings || 0}
                          </p>
                        </div>
                      </div>

                      {/* Action Suite */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowSightingForm(caseItem.id)}
                          className="flex h-11 flex-[2] items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 text-sm font-bold text-[var(--color-foreground)] shadow-[var(--color-primary)]/20 shadow-md transition-all hover:bg-[#8c3e2b] active:scale-95"
                        >
                          <Eye className="h-4 w-4" />
                          Report Sighting
                        </button>
                        <button className="flex h-11 flex-1 items-center justify-center rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm font-bold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-background)] active:scale-95" onClick={() => navigate(`/missing-persons/view?id=${caseItem.id}`)}>
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Report Missing Person Form Modal */}
        {showReportForm && (
          <div className="animate-fade-in fixed inset-0 z-[1000] flex items-start justify-center bg-black/50 p-4 pt-24">
            <div className="card-calm max-h-[90vh] w-full max-w-2xl overflow-y-auto">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Report Missing Person</h2>
                <button
                  onClick={() => setShowReportForm(false)}
                  className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  ×
                </button>
              </div>

              <form onSubmit={submitReport} className="space-y-6">
                {/* Missing Person Details */}
                <div>
                  <h3 className="mb-4 text-lg font-medium">
                    Missing Person Details
                  </h3>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Name - Optional for safety */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Full Name{' '}
                        <span className="text-[var(--color-muted-foreground)]">
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] p-2"
                        placeholder="Can be omitted for safety"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="age"
                        className="mb-2 block text-sm font-medium"
                      >
                        Age *
                      </label>
                      <input
                        id="age"
                        type="number"
                        required
                        value={formData.age}
                        onChange={(e) =>
                          handleInputChange('age', e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] p-2"
                        min={1}
                        max={120}
                      />
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="gender"
                        className="mb-2 block text-sm font-medium"
                      >
                        Gender *
                      </label>
                      <select
                        id="gender"
                        required
                        value={formData.gender}
                        onChange={(e) =>
                          handleInputChange('gender', e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] p-2"
                      >
                        <option value="">Select gender</option>
                        {GENDER_OPTIONS.map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="lastSeenDate"
                        className="mb-2 block text-sm font-medium"
                      >
                        Last Seen Date *
                      </label>
                      <input
                        id="lastSeenDate"
                        type="date"
                        required
                        value={formData.lastSeenDate}
                        onChange={(e) =>
                          handleInputChange('lastSeenDate', e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] p-2"
                      />
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="lastSeenTime"
                        className="mb-2 block text-sm font-medium"
                      >
                        Last Seen Time
                      </label>
                      <input
                        id="lastSeenTime"
                        type="time"
                        value={formData.lastSeenTime}
                        onChange={(e) =>
                          handleInputChange('lastSeenTime', e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] p-2"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Last Seen Location *
                      </label>
                      <input
                        name="lastSeenLocation"
                        type="text"
                        required
                        value={formData.lastSeenLocation}
                        onChange={(e) =>
                          handleInputChange('lastSeenLocation', e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] p-2"
                        placeholder="City, area, or landmark"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                      Physical Description *
                    </label>
                    <textarea
                      name="physicalDescription"
                      required
                      value={formData.physicalDescription}
                      onChange={(e) =>
                        handleInputChange('physicalDescription', e.target.value)
                      }
                      className="w-full rounded-lg border border-[var(--color-border)] p-2"
                      rows={3}
                      placeholder="Height, hair color, clothing, distinguishing features..."
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                      Photo{' '}
                      <span className="text-[var(--color-muted-foreground)]">
                        (Optional)
                      </span>
                    </label>
                    <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] p-4 text-center">
                      <Upload className="mx-auto mb-2 h-8 w-8 text-[var(--color-muted-foreground)]" />
                      <p className="mb-2 text-sm text-[var(--color-muted-foreground)]">
                        Upload a recent photo (metadata will be removed for
                        safety)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="button-secondary cursor-pointer"
                      >
                        Choose Photo
                      </label>
                    </div>
                  </div>
                </div>

                {/* Circumstances */}
                <div>
                  <h3 className="mb-4 text-lg font-medium">Circumstances</h3>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                      Circumstances of Disappearance *
                    </label>
                    <textarea
                      name="circumstances"
                      required
                      value={formData.circumstances}
                      onChange={(e) =>
                        handleInputChange('circumstances', e.target.value)
                      }
                      className="w-full rounded-lg border border-[var(--color-border)] p-2"
                      rows={3}
                      placeholder="Was there abuse? Mental health concerns? Suspected trafficking? Bullying?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reporterRelationship"
                      className="mb-2 block text-sm font-medium"
                    >
                      Your Relationship *
                    </label>
                    <select
                      id="reporterRelationship"
                      required
                      value={formData.reporterRelationship}
                      onChange={(e) =>
                        handleInputChange(
                          'reporterRelationship',
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-[var(--color-border)] p-2"
                    >
                      <option value="">Select relationship</option>
                      {RELATIONSHIP_OPTIONS.map((relationship) => (
                        <option key={relationship} value={relationship}>
                          {relationship}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact & Consent */}
                <div>
                  <h3 className="mb-4 text-lg font-medium">
                    Contact & Consent
                  </h3>

                  <div className="mb-4">
                    <label
                      htmlFor="contactMethod"
                      className="mb-2 block text-sm font-medium"
                    >
                      Preferred Contact Method *
                    </label>
                    <select
                      id="contactMethod"
                      required
                      value={formData.contactMethod}
                      onChange={(e) =>
                        handleInputChange('contactMethod', e.target.value)
                      }
                      className="w-full rounded-lg border border-[var(--color-border)] p-2"
                    >
                      <option value="">Select method</option>
                      {CONTACT_METHODS.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.contactMethod === 'Email' && (
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange('contactEmail', e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] p-2"
                        placeholder="Your email (not shown publicly)"
                      />
                    </div>
                  )}

                  {formData.contactMethod === 'Phone' && (
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          handleInputChange('contactPhone', e.target.value)
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] p-2"
                        placeholder="Your phone (not shown publicly)"
                      />
                    </div>
                  )}

                  {formData.contactMethod === 'Secure Platform Messaging' && (
                    <div className="mb-4 rounded-lg bg-[var(--color-background)] p-3">
                      <p className="text-sm text-[#6B705C]">
                        You'll receive notifications through our secure platform
                        messaging system. No personal contact information will
                        be shared.
                      </p>
                    </div>
                  )}

                  <div className="flex items-start gap-3 rounded-lg bg-[var(--color-hover)] p-4">
                    <input
                      type="checkbox"
                      id="public-consent"
                      checked={formData.publicConsent}
                      onChange={(e) =>
                        handleInputChange('publicConsent', e.target.checked)
                      }
                      className="mt-1"
                    />
                    <label htmlFor="public-consent" className="text-sm">
                      I allow this case to appear in the public missing persons
                      directory after verification. I understand that sensitive
                      details will be protected and only safe information will
                      be shown.
                    </label>
                  </div>
                </div>

                {/* Safety Notice */}
                <div className="rounded-lg bg-[var(--color-accent)] p-4 text-[var(--color-accent-foreground)]">
                  <div className="flex items-start">
                    <AlertTriangle className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="mb-1 font-medium">
                        Important Safety Information
                      </p>
                      <p className="text-sm">
                        All reports are verified by administrators before
                        appearing publicly to prevent misuse. Your personal
                        information is kept confidential. Exact locations and
                        sensitive details are never shown publicly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      toast.info('Report cancelled. Your information was not saved.');
                      setShowReportForm(false);
                    }}
                    className="flex-1 rounded-xl bg-[#6B705C] px-6 py-3 text-[var(--color-foreground)] font-bold shadow-lg hover:bg-[#4a5a46] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#C15B3E] px-6 py-3 text-[var(--color-foreground)] font-bold shadow-lg hover:bg-[#8c3e2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!formData.publicConsent}
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Report Sighting Form Modal */}
        {showSightingForm && (
          <div className="animate-fade-in fixed inset-0 z-[1000] flex items-start justify-center bg-black/50 p-4 pt-24">
            <div className="card-calm w-full max-w-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Report Sighting</h2>
                <button
                  onClick={() => setShowSightingForm(null)}
                  className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Where did you see them? *
                  </label>
                  <input
                    name="sightingLocation"
                    type="text"
                    className="w-full rounded-lg border border-[var(--color-border)] p-2"
                    placeholder="Location, city, area..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="sightingWhen"
                    className="mb-2 block text-sm font-medium"
                  >
                    When did you see them? *
                  </label>
                  <input
                    id="sightingWhen"
                    name="sightingWhen"
                    type="datetime-local"
                    className="w-full rounded-lg border border-[var(--color-border)] p-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Additional Details
                  </label>
                  <textarea
                    name="sightingAdditionalDetails"
                    className="w-full rounded-lg border border-[var(--color-border)] p-2"
                    rows={3}
                    placeholder="What were they doing? Who were they with? Condition?"
                  />
                </div>

                <div className="rounded-lg bg-[var(--color-background)] p-3">
                  <p className="text-sm text-[#6B705C]">
                    Your report will be sent securely to our team and the case
                    reporter. Your contact information is not required and will
                    remain anonymous.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      toast.info('Sighting report cancelled.');
                      setShowSightingForm(null);
                    }}
                    className="flex-1 rounded-xl bg-[#6B705C] px-6 py-3 text-[var(--color-foreground)] font-bold shadow-lg hover:bg-[#4a5a46] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      toast.success('Sighting report submitted successfully! Our team will follow up on this lead.');
                      submitSighting(showSightingForm, {});
                    }}
                    className="flex-1 rounded-xl bg-[#C15B3E] px-6 py-3 text-[var(--color-foreground)] font-bold shadow-lg hover:bg-[#8c3e2b] transition-colors"
                  >
                    Submit Sighting
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Safety Guidelines Modal */}
        {showSafetyModal && (
          <div className="animate-fade-in fixed inset-0 z-[1000] flex items-start justify-center bg-black/50 p-4 pt-24">
            <div className="card-calm w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Safety Guidelines</h2>
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  ×
                </button>
              </div>

              <div className="space-y-8">
                {/* Emergency Contacts */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--color-foreground)]">Emergency Contacts</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="text-center p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Police Emergency</h4>
                      <p className="text-lg font-bold text-[#C15B3E] mb-1">+251-911</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">For immediate danger</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Anti-Trafficking</h4>
                      <p className="text-lg font-bold text-[#C15B3E] mb-1">+251-11-123-4567</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Human trafficking concerns</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Mental Health Crisis</h4>
                      <p className="text-lg font-bold text-[#C15B3E] mb-1">+251-900-123-456</p>
                      <p className="text-sm text-[var(--color-muted-foreground)]">Mental health emergencies</p>
                    </div>
                  </div>
                </div>

                {/* Safety Guidelines */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--color-foreground)]">Safety Guidelines</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-[var(--color-background)] p-4 border border-[#C15B3E]/10">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Your Safety First</h4>
                      <p className="text-[var(--color-muted-foreground)]">
                        All reports are anonymous by default. You control what information you share. We never share your location or contact details without your explicit permission.
                      </p>
                    </div>

                    <div className="rounded-lg bg-[var(--color-background)] p-4 border border-[#C15B3E]/10">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Privacy Protection</h4>
                      <p className="text-[var(--color-muted-foreground)]">
                        Sensitive details are automatically filtered from public view. Only verified, safe information appears in case listings. Your personal safety is our top priority.
                      </p>
                    </div>

                    <div className="rounded-lg bg-[var(--color-background)] p-4 border border-[#C15B3E]/10">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Emergency Situations</h4>
                      <p className="text-[var(--color-muted-foreground)]">
                        If you're in immediate danger, contact emergency services first. This platform is for reporting and awareness, not emergency response.
                      </p>
                    </div>
                  </div>
                </div>

                {/* What Happens When You Report */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--color-foreground)]">What Happens When You Report?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B705C] text-[var(--color-foreground)] font-bold">1</div>
                      <div>
                        <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Your Report is Submitted</h4>
                        <p className="text-sm text-[var(--color-muted-foreground)]">Your report is securely submitted and timestamped.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B705C] text-[var(--color-foreground)] font-bold">2</div>
                      <div>
                        <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Admin Verification</h4>
                        <p className="text-sm text-[var(--color-muted-foreground)]">Our team reviews your report for accuracy and safety.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B705C] text-[var(--color-foreground)] font-bold">3</div>
                      <div>
                        <h4 className="font-semibold text-[var(--color-foreground)] mb-1">Safe Public Display</h4>
                        <p className="text-sm text-[var(--color-muted-foreground)]">Approved information helps the community search safely.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Statement */}
                <div className="rounded-lg bg-gradient-to-r from-[#C15B3E]/5 to-[#6B705C]/5 border border-[#C15B3E]/20 p-6 text-center">
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-2">You're Not Alone</h4>
                  <p className="text-[var(--color-muted-foreground)]">
                    Every report helps build awareness and potentially saves lives. We stand with you.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowSafetyModal(false);
                      setShowReportForm(true);
                    }}
                    className="flex-1 rounded-xl bg-[#C15B3E] px-6 py-3 text-[var(--color-foreground)] font-bold shadow-lg hover:bg-[#8c3e2b] transition-colors"
                  >
                    Start Your Report
                  </button>
                  <button
                    onClick={() => setShowSafetyModal(false)}
                    className="flex-1 rounded-xl bg-[#6B705C] px-6 py-3 text-[var(--color-foreground)] font-bold shadow-lg hover:bg-[#4a5a46] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Resources */}
        <section className="mb-12">
          <div className="mx-auto max-w-6xl">
            <div className="card text-center">
              <h2 className="card-title mb-4">Need Immediate Help?</h2>
              <p className="mb-6 text-[var(--color-muted-foreground)]">
                Contact these emergency services for urgent situations
              </p>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                <div className="rounded-lg bg-[var(--color-hover)] p-4">
                  <p className="mb-1 font-medium">Police Emergency</p>
                  <p className="text-[var(--color-primary)]">+251-911</p>
                </div>
                <div className="rounded-lg bg-[var(--color-hover)] p-4">
                  <p className="mb-1 font-medium">Anti-Trafficking</p>
                  <p className="text-[var(--color-primary)]">
                    +251-11-123-4567
                  </p>
                </div>
                <div className="rounded-lg bg-[var(--color-hover)] p-4">
                  <p className="mb-1 font-medium">Mental Health Crisis</p>
                  <p className="text-[var(--color-primary)]">
                    +251-900-123-456
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-card)] py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="mb-4 text-[var(--color-muted-foreground)]">
              All cases are verified by administrators. Personal and sensitive
              information is protected.
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              For law enforcement inquiries: missingpersons@tibeb.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
