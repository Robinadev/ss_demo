import { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Shield,
  Lock,
  ArrowLeft,
  Mic,
  Heart,
  ShieldX,
  Plus,
  Users,
  Skull,
  Ban,
  Zap,
  UserX,
  Home,
  Baby,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/components/AppContext';
import { IncidentCategory, INCIDENT_CATEGORY_LABELS } from '@/types/incident';
import { SecureBox } from '@/components/ui/SecureBox';
import { AnonymousToggle } from '@/components/ui/AnonymousToggle';
import { TrustMicrocopy } from '@/components/ui/TrustMicrocopy';
import { EvidenceUpload } from '@/components/ui/EvidenceUpload';

const ETHIOPIAN_REGIONS = [
  'Addis Ababa',
  'Afar',
  'Amhara',
  'Benishangul-Gumuz',
  'Dire Dawa',
  'Gambela',
  'Harari',
  'Oromia',
  'Sidama',
  'Somali',
  'South Ethiopia',
  'South West Ethiopia',
  'Tigray',
];

// Map incident categories to icons and colors for better UX
const INCIDENT_TYPE_CONFIG: Record<
  IncidentCategory,
  { icon: any; color: string; bg: string }
> = {
  [IncidentCategory.PHYSICAL_VIOLENCE]: {
    icon: Skull,
    color: 'text-[#C15B3E]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.SEXUAL_ASSAULT]: {
    icon: ShieldX,
    color: 'text-[#DDA15E]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.EMOTIONAL_ABUSE]: {
    icon: Heart,
    color: 'text-[#6B705C]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.PSYCHOLOGICAL_ABUSE]: {
    icon: AlertTriangle,
    color: 'text-[#C15B3E]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.NEGLECT]: {
    icon: UserX,
    color: 'text-[#DDA15E]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.CYBERBULLYING]: {
    icon: Zap,
    color: 'text-[#6B705C]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.HARASSMENT]: {
    icon: Ban,
    color: 'text-[#C15B3E]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.DISCRIMINATION]: {
    icon: Users,
    color: 'text-[#DDA15E]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.WORKPLACE_ABUSE]: {
    icon: Shield,
    color: 'text-[#6B705C]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.DOMESTIC_VIOLENCE]: {
    icon: Home,
    color: 'text-[#C15B3E]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.CHILD_ABUSE]: {
    icon: Baby,
    color: 'text-[#DDA15E]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.ELDER_ABUSE]: {
    icon: User,
    color: 'text-[#6B705C]',
    bg: 'bg-[var(--color-background)]',
  },
  [IncidentCategory.OTHER]: {
    icon: Plus,
    color: 'text-[#C15B3E]',
    bg: 'bg-[var(--color-background)]',
  },
};

export function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useApp();

  const [formData, setFormData] = useState<{
    incidentType: IncidentCategory | '';
    description: string;
    date: string;
    time: string;
    location: string;
    anonymous: boolean;
    files: File[];
    consentGeneral: boolean;
  }>({
    incidentType: '',
    description: '',
    date: '',
    time: '',
    location: '',
    anonymous: true,
    files: [],
    consentGeneral: false,
  });

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(user ? '/victims-dashboard' : '/');
    }, 2000);
  };

  const handleSafeExit = () => {
    window.location.replace('https://www.google.com/search?q=weather+today');
  };

  // Ensure document title is set correctly
  useEffect(() => {
    document.title = 'SafeHaven | Anonymous Report';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFDF5] via-[#6B705C]/10 to-[#C15B3E]/5 font-sans dark:from-slate-950 dark:to-slate-900">
      {/* Floating Emergency Exit */}
      <div className="fixed top-24 right-6 z-[100] opacity-80 transition-opacity hover:opacity-100 sm:opacity-100">
        <button
          type="button"
          onClick={handleSafeExit}
          className="flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-[10px] font-bold tracking-tight text-[var(--color-foreground)] uppercase shadow-xl transition-all hover:bg-rose-600"
          title="Emergency Safe Exit"
        >
          <ShieldX className="h-4 w-4" />
          <span className="xs:inline hidden">Emergency Exit</span>
        </button>
      </div>

      <main className="mx-auto max-w-3xl px-6 pt-12 pb-24">
        {/* Progress System */}
        <div className="mb-16">
          <div className="mb-4 flex items-end justify-between">
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              Safety Step {currentStep} of 5
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-[var(--color-foreground)]">
              {Math.round((currentStep / 5) * 100)}% Complete
            </span>
          </div>
          <div className="h-3 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-card)] p-1 shadow-inner">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-[#C15B3E] to-[#DDA15E] shadow-[0_0_15px_rgba(193,91,62,0.3)] transition-all duration-1000 ${
                currentStep === 1
                  ? 'w-1/5'
                  : currentStep === 2
                    ? 'w-2/5'
                    : currentStep === 3
                      ? 'w-3/5'
                      : currentStep === 4
                        ? 'w-4/5'
                        : 'w-full'
              }`}
            ></div>
          </div>
        </div>

        {/* Form Area Container */}
        <SecureBox className="p-8 md:p-12">
          {/* Anonymous Toggle - Prominent at top */}
          <div className="mb-8">
            <AnonymousToggle
              isAnonymous={formData.anonymous}
              onChange={(anonymous) =>
                handleInputChange('anonymous', anonymous)
              }
            />
          </div>

          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* STEP 1: Description (Primary) */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-6 space-y-10 duration-700">
                <div className="space-y-3">
                  <h2 className="text-3xl leading-tight font-medium text-slate-900 md:text-4xl dark:text-[var(--color-foreground)]">
                    Describe what{' '}
                    <span className="font-medium tracking-tight text-[#C15B3E]">
                      happened
                    </span>
                  </h2>
                  <p className="text-lg font-normal text-slate-500">
                    Share your story. Our ML will analyze and categorize it for
                    you.
                  </p>
                  <TrustMicrocopy type="privacy" className="mt-2" />
                </div>

                <div className="space-y-6">
                  <div className="group relative">
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange('description', e.target.value)
                      }
                      className="min-h-[300px] w-full rounded-[40px] border-2 border-[var(--color-border)] bg-[var(--color-card)] p-8 text-xl leading-relaxed font-normal transition-all outline-none placeholder:text-[var(--color-foreground)]/60 focus:border-[#C15B3E] focus:ring-4 focus:ring-[#C15B3E]/10 md:text-2xl"
                      placeholder="Your story is safe here..."
                      title="Incident description"
                    />
                    <TrustMicrocopy
                      type="security"
                      className="absolute bottom-2 left-4"
                    />
                    <button
                      type="button"
                      className="absolute right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-lg transition-colors hover:bg-rose-100 active:scale-95"
                      title="Optional voice input"
                      aria-label="Voice input"
                    >
                      <Mic className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.description}
                      className="h-16 flex-grow rounded-[24px] bg-[#C15B3E] text-lg font-bold"
                    >
                      Continue to Evidence
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Evidence Upload */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-6 space-y-10 duration-700">
                <div className="space-y-3">
                  <h2 className="text-3xl leading-tight font-medium text-slate-900 md:text-4xl dark:text-[var(--color-foreground)]">
                    Add{' '}
                    <span className="font-medium text-[#C15B3E]">
                      evidence
                    </span>{' '}
                    if safe
                  </h2>
                  <p className="text-lg font-normal text-slate-500">
                    This step is completely optional. Only share what feels
                    safe.
                  </p>
                  <TrustMicrocopy type="security" className="mt-2" />
                </div>

                <EvidenceUpload
                  onFilesChange={(files) => handleInputChange('files', files)}
                />

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex h-16 w-16 items-center justify-center rounded-[24px] border border-slate-200 bg-white text-[#6B705C] transition-all hover:text-[#C15B3E]"
                    title="Back"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="h-16 flex-grow rounded-[24px] bg-[#C15B3E] text-lg font-bold dark:bg-white dark:text-slate-900"
                  >
                    Continue to Evidence
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Location & Time */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-6 space-y-10 duration-700">
                <div className="space-y-3">
                  <h2 className="text-3xl leading-tight font-medium text-slate-900 md:text-4xl dark:text-[var(--color-foreground)]">
                    Where and{' '}
                    <span className="font-medium text-[#C15B3E]">when</span>{' '}
                    did this occur?
                  </h2>
                  <p className="text-lg font-medium font-normal text-slate-500 italic">
                    These details are optional but helpful.
                  </p>
                  <TrustMicrocopy type="privacy" className="mt-2" />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <label className="pl-2 text-xs font-black tracking-widest text-slate-400 uppercase">
                      Approximate Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange('location', e.target.value)
                      }
                      className="h-16 w-full appearance-none rounded-[24px] border-2 border-[var(--color-border)] bg-[var(--color-card)] p-4 font-bold text-[var(--color-foreground)] outline-none focus:border-[#C15B3E]"
                      title="Select Location"
                    >
                      <option value="">Select Region in Ethiopia</option>
                      {ETHIOPIAN_REGIONS.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    <TrustMicrocopy
                      type="anonymous"
                      text="Location stays general"
                      className="pl-2"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="pl-2 text-xs font-black tracking-widest text-slate-400 uppercase">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange('date', e.target.value)
                      }
                      className="h-16 w-full rounded-[24px] border-2 border-[var(--color-border)] bg-[var(--color-card)] p-4 font-bold text-[var(--color-foreground)] outline-none focus:border-[#C15B3E]"
                      title="Incident Date"
                    />
                    <TrustMicrocopy
                      type="security"
                      text="Timestamps encrypted"
                      className="pl-2"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex h-16 w-16 items-center justify-center rounded-[24px] border border-slate-200 bg-white text-[#6B705C] transition-all hover:text-[#C15B3E]"
                    title="Back"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="h-16 flex-grow rounded-[24px] bg-[#C15B3E] text-lg font-bold dark:bg-white dark:text-slate-900"
                  >
                    Continue to Category
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: Incident Type (Optional) */}
            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-right-6 space-y-10 duration-700">
                <div className="space-y-3">
                  <h2 className="text-3xl leading-tight font-medium text-slate-900 md:text-4xl dark:text-[var(--color-foreground)]">
                    Help us{' '}
                    <span className="font-medium text-[#C15B3E]">
                      categorize
                    </span>{' '}
                    (Optional)
                  </h2>
                  <p className="text-lg font-normal text-slate-500">
                    Our ML will auto-classify, but you can specify if you
                    prefer.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(IncidentCategory).map(([key, value]) => {
                    const config = INCIDENT_TYPE_CONFIG[value];
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleInputChange('incidentType', value)}
                        className={`group flex flex-col items-center gap-4 rounded-[32px] border-2 p-6 text-center transition-all duration-500 ${
                          formData.incidentType === value
                            ? 'border-[#C15B3E] bg-[var(--color-card)] shadow-2xl shadow-[#C15B3E]/10'
                            : 'border-slate-200 bg-white hover:border-[#C15B3E]/50 dark:border-slate-800 dark:bg-slate-900/50'
                        }`}
                        title={`Select ${INCIDENT_CATEGORY_LABELS[value]}`}
                      >
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${config.bg} ${config.color}`}
                        >
                          <config.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-[var(--color-foreground)]">
                            {INCIDENT_CATEGORY_LABELS[value]}
                          </h3>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex h-16 w-16 items-center justify-center rounded-[24px] border border-slate-200 bg-white text-[#6B705C] transition-all hover:text-[#C15B3E]"
                    title="Back"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="h-16 flex-grow rounded-[24px] bg-[#C15B3E] text-lg font-bold dark:bg-white dark:text-slate-900"
                  >
                    Final Safety Review
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 5: Consent & Submit */}
            {currentStep === 5 && (
              <div className="animate-in fade-in slide-in-from-right-6 space-y-10 duration-700">
                <div className="space-y-3">
                  <h2 className="text-3xl leading-tight font-medium text-slate-900 md:text-4xl dark:text-[var(--color-foreground)]">
                    Last step for your{' '}
                    <span className="font-medium text-[#C15B3E]">
                      protection
                    </span>
                  </h2>
                  <p className="text-lg font-normal text-slate-500">
                    Confirm how you would like to proceed with this report.
                  </p>
                </div>

                <div className="space-y-6">
                  <label className="group flex cursor-pointer items-start gap-4 rounded-[32px] border-2 border-slate-100 bg-white p-8 shadow-sm transition-all hover:border-[#C15B3E]/50">
                    <input
                      type="checkbox"
                      checked={formData.consentGeneral}
                      onChange={(e) =>
                        handleInputChange('consentGeneral', e.target.checked)
                      }
                      className="mt-1 h-6 w-6 rounded-lg border-2 border-slate-200 text-[#C15B3E] focus:ring-[#C15B3E]"
                    />
                    <div className="flex-grow">
                      <h4 className="text-lg font-bold text-slate-800">
                        Agree to secure documentation
                      </h4>
                      <p className="text-sm text-slate-500">
                        Enable our team to securely review this for your
                        protection.
                      </p>
                      <TrustMicrocopy type="verification" className="mt-2" />
                    </div>
                  </label>
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    disabled={!formData.consentGeneral || isSubmitting}
                    className={`relative h-20 w-full overflow-hidden rounded-[32px] text-xl font-bold shadow-2xl transition-all ${
                      formData.consentGeneral
                        ? 'bg-emerald-500 text-[var(--color-foreground)] shadow-emerald-500/20 hover:bg-emerald-600'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                        Submitting Securely...
                      </div>
                    ) : (
                      <>
                        <Shield className="mr-3 h-6 w-6" />
                        Submit Secure Report
                      </>
                    )}
                  </Button>

                  <div className="mt-6 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      <Lock className="h-3 w-3" />
                      AES-256 Military Grade Encryption Active
                    </div>
                    <p className="px-8 text-xs text-slate-400">
                      <span className="font-bold underline">Safety Note:</span>{' '}
                      You can delete this report anytime from your personal
                      dashboard. It will be completely purged from our servers.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full pt-4 text-sm font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-[#C15B3E]"
                >
                  Edit Previous Details
                </button>
              </div>
            )}
          </form>
        </SecureBox>
      </main>
    </div>
  );
}
