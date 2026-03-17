import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Shield,
  Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for service providers
const MOCK_PROVIDERS = [
  {
    id: 1,
    name: "Addis Ababa Women's Support Center",
    serviceType: 'Counseling & Shelter',
    location: 'Addis Ababa',
    contact: {
      phone: '+251-11-123-4567',
      email: 'support@aawsc.org',
      website: 'www.aawsc.org',
    },
    languages: ['Amharic', 'English', 'Oromiffa'],
    availability: '24/7',
    specializations: ['Domestic violence', 'Trauma therapy', 'Legal aid'],
    accessibility: ['Wheelchair accessible'],
    verified: true,
  },
  {
    id: 2,
    name: 'Ethiopian Legal Aid Services',
    serviceType: 'Legal Aid',
    location: 'Addis Ababa',
    contact: {
      phone: '+251-11-234-5678',
      email: 'legal@elas.org',
      website: 'www.elas.org',
    },
    languages: ['Amharic', 'English'],
    availability: 'Weekdays 9-5',
    specializations: ['Family law', 'Human rights', 'Child protection'],
    accessibility: ['Remote consultations available'],
    verified: true,
  },
  {
    id: 3,
    name: 'Hope Counseling Services',
    serviceType: 'Counseling',
    location: 'Remote/Online',
    contact: {
      phone: '+251-11-345-6789',
      email: 'counseling@hope.org',
      website: 'www.hope-counseling.org',
    },
    languages: ['Amharic', 'English', 'Tigrinya'],
    availability: 'By appointment',
    specializations: ['Trauma', 'Anxiety', 'Depression'],
    accessibility: ['Online sessions only'],
    verified: true,
  },
  {
    id: 4,
    name: 'Child Protection Alliance',
    serviceType: 'Child Protection',
    location: 'Addis Ababa',
    contact: {
      phone: '+251-11-456-7890',
      email: 'childprotection@cpa.org',
      website: 'www.cpa-ethiopia.org',
    },
    languages: ['Amharic', 'English'],
    availability: '24/7 Hotline',
    specializations: ['Child abuse', 'Family support', 'Education'],
    accessibility: ['Wheelchair accessible', 'Child-friendly spaces'],
    verified: true,
  },
  {
    id: 5,
    name: 'National Crisis Hotline',
    serviceType: 'Crisis Support',
    location: 'Nationwide',
    contact: {
      phone: '+251-900-123-456',
      email: 'crisis@hotline.org',
      website: 'www.crisis-hotline.org',
    },
    languages: ['Amharic', 'English', 'Oromiffa', 'Tigrinya'],
    availability: '24/7',
    specializations: [
      'Crisis intervention',
      'Suicide prevention',
      'Emergency support',
    ],
    accessibility: ['Phone and text support'],
    verified: true,
  },
];

interface ServiceProvider {
  id: number;
  name: string;
  serviceType: string;
  location: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  languages: string[];
  availability: string;
  specializations: string[];
  accessibility: string[];
  verified: boolean;
}

const SERVICE_TYPES = [
  'All Services',
  'Counseling',
  'Legal Aid',
  'Shelter',
  'Medical',
  'Crisis Support',
  'Child Protection',
];

const LOCATIONS = [
  'All Locations',
  'Addis Ababa',
  'Remote/Online',
  'Nationwide',
  'Regional',
];

const LANGUAGES = ['All Languages', 'Amharic', 'English'];

export function SupportDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    serviceType: 'All Services',
    location: 'All Locations',
    language: 'All Languages',
    availability: 'All',
  });
  const [filteredProviders, setFilteredProviders] =
    useState<ServiceProvider[]>(MOCK_PROVIDERS);
  const [showFilters, setShowFilters] = useState(false);

  // Filter providers based on search and filters
  useEffect(() => {
    let results = MOCK_PROVIDERS;

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.serviceType
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          provider.specializations.some((spec) =>
            spec.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Service type filter
    if (filters.serviceType !== 'All Services') {
      results = results.filter(
        (provider) => provider.serviceType === filters.serviceType
      );
    }

    // Location filter
    if (filters.location !== 'All Locations') {
      results = results.filter(
        (provider) => provider.location === filters.location
      );
    }

    // Language filter
    if (filters.language !== 'All Languages') {
      results = results.filter((provider) =>
        provider.languages.includes(filters.language)
      );
    }

    setFilteredProviders(results);
  }, [searchTerm, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      serviceType: 'All Services',
      location: 'All Locations',
      language: 'All Languages',
      availability: 'All',
    });
    setSearchTerm('');
  };

  return (
    <div className="from-background min-h-screen bg-linear-to-b to-(--color-muted)">
      {/* Header Section */}
      <header className="bg-card border-border border-b shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="heading-amharic mb-4">Public Support Directory</h1>
            <div className="tibeb-divider mx-auto mb-6 max-w-md"></div>
            <p className="text-muted-foreground mb-2 text-lg">
              Find verified support services near you
            </p>
            <p className="text-muted-foreground">
              All providers are carefully vetted to ensure your safety and
              privacy
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <section className="animate-fade-in-up mb-8">
          <div className="card mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
                <input
                  name="supportDirectorySearch"
                  type="text"
                  placeholder="Search by name, service type, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-border focus:ring-primary w-full rounded-lg border py-3 pr-4 pl-10 focus:border-transparent focus:ring-2"
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
              <div className="border-border animate-scale-in border-t pt-6">
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Service Type Filter */}
                  <div>
                    <label
                      htmlFor="servicetype"
                      className="mb-2 block text-sm font-medium"
                    >
                      Service Type
                    </label>
                    <select
                      id="servicetype"
                      value={filters.serviceType}
                      onChange={(e) =>
                        handleFilterChange('serviceType', e.target.value)
                      }
                      className="border-border w-full rounded-lg border p-2"
                    >
                      {SERVICE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
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
                      className="border-border w-full rounded-lg border p-2"
                    >
                      {LOCATIONS.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Language Filter */}
                  <div>
                    <label
                      htmlFor="language"
                      className="mb-2 block text-sm font-medium"
                    >
                      Language
                    </label>
                    <select
                      id="language"
                      value={filters.language}
                      onChange={(e) =>
                        handleFilterChange('language', e.target.value)
                      }
                      className="border-border w-full rounded-lg border p-2"
                    >
                      {LANGUAGES.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">
                    {filteredProviders.length} services found
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-primary hover:text-accent text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Safety Disclaimer */}
        <section className="animate-fade-in-up mb-8">
          <div className="mx-auto max-w-6xl">
            <div className="bg-accent text-accent-foreground rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="mt-0.5 mr-3 h-5 w-5 shrink-0" />
                <div>
                  <p className="mb-1 font-medium">Your Safety Matters</p>
                  <p className="text-sm">
                    All providers are verified by our team. However, always
                    trust your instincts. If you feel unsafe, discontinue
                    contact and report concerns to us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Providers Grid */}
        <section className="mb-12">
          <div className="mx-auto max-w-6xl">
            {filteredProviders.length === 0 ? (
              <div className="card py-12 text-center">
                <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-medium">No services found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button onClick={clearFilters} className="button-primary">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="bg-card border-border border-l-primary group relative flex flex-col overflow-hidden rounded-2xl border-2 shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    {/* Trust Header Banner */}
                    <div className="border-border flex items-center justify-between border-b bg-(--colors-blue-0) px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Shield className="text-primary h-4 w-4" />
                        <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
                          Verified Resource
                        </span>
                      </div>
                      <Heart className="text-primary/20 group-hover:text-primary h-4 w-4 transition-colors" />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-4">
                        <h3 className="text-foreground group-hover:text-primary mb-2 text-xl leading-tight font-bold transition-colors">
                          {provider.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-secondary rounded px-2 py-0.5 text-[10px] font-bold tracking-tighter text-white uppercase">
                            {provider.serviceType}
                          </span>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--colors-blue-0)">
                            <MapPin className="text-primary h-4 w-4" />
                          </div>
                          <span className="text-foreground text-sm font-medium">
                            {provider.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--colors-blue-0)">
                            <Clock className="text-primary h-4 w-4" />
                          </div>
                          <span className="text-foreground text-sm font-medium">
                            {provider.availability}
                          </span>
                        </div>
                      </div>

                      {/* Contact Options */}
                      <div className="border-border/50 mb-6 space-y-2 rounded-xl border bg-(--colors-grey-1) p-3">
                        <div className="flex items-center gap-3">
                          <Phone className="text-primary h-3.5 w-3.5" />
                          <a
                            href={`tel:${provider.contact.phone}`}
                            className="text-foreground hover:text-primary text-xs font-bold transition-colors"
                          >
                            {provider.contact.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="text-primary h-3.5 w-3.5" />
                          <a
                            href={`mailto:${provider.contact.email}`}
                            className="text-foreground hover:text-primary truncate text-xs font-bold transition-colors"
                          >
                            {provider.contact.email}
                          </a>
                        </div>
                      </div>

                      {/* Detail Pill Groups */}
                      <div className="mb-6 space-y-4">
                        <div>
                          <p className="text-muted-foreground mb-2 text-[10px] font-bold uppercase">
                            Capabilities
                          </p>
                          <div className="wrap flex gap-1.5 font-bold">
                            {provider.specializations
                              .slice(0, 2)
                              .map((spec) => (
                                <span
                                  key={spec}
                                  className="border-border text-primary rounded-lg border bg-[var(--color-card)] px-2 py-1 text-[9px]"
                                >
                                  {spec}
                                </span>
                              ))}
                            {provider.specializations.length > 2 && (
                              <span className="border-border text-muted-foreground rounded-lg border bg-[var(--color-card)] px-2 py-1 text-[9px]">
                                +{provider.specializations.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="border-border/50 mt-auto border-t pt-4">
                        <button className="bg-primary flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white shadow-(--color-primary)/10 shadow-md transition-all hover:bg-(--colors-blue-6) active:scale-95">
                          Contact Service
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="mb-12">
          <div className="mx-auto max-w-6xl">
            <div className="card from-primary/5 border-primary/10 bg-linear-to-br to-transparent text-center">
              <h2 className="mb-4 text-2xl font-bold">Need More Help?</h2>
              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
                Access immediate crisis intervention, institutional
                partnerships, and safety planning resources on our main support
                services page.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/support-services">
                  <button className="button-primary h-12 w-full px-8 sm:w-auto">
                    Crisis Hotlines & Stakeholders
                  </button>
                </Link>
                <Link to="/how-to-report">
                  <button className="button-secondary h-12 w-full px-8 sm:w-auto">
                    How to Report Safely
                  </button>
                </Link>
                <Link to="/resources">
                  <button className="button-secondary h-12 w-full px-8 sm:w-auto">
                    Safety Planning
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-border border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-muted-foreground mb-4">
              Your privacy and safety are our priority. All providers are
              verified and listings are regularly updated.
            </p>
            <p className="text-muted-foreground text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
