-- SafeHave Database Schema Migration
-- Script 002: Case Management Tables
-- This script creates tables for case assignments and collaboration

-- Service providers table
CREATE TABLE IF NOT EXISTS public.service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type service_provider_type NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  description TEXT,
  website TEXT,
  is_verified BOOLEAN DEFAULT FALSE NOT NULL,
  rating FLOAT DEFAULT 0,
  availability TEXT,
  languages TEXT[] DEFAULT ARRAY['en'],
  specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_service_providers_type ON public.service_providers(type);
CREATE INDEX idx_service_providers_is_verified ON public.service_providers(is_verified);
CREATE INDEX idx_service_providers_user_id ON public.service_providers(user_id);
CREATE INDEX idx_service_providers_city ON public.service_providers(city);

-- Case assignments table
CREATE TABLE IF NOT EXISTS public.case_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID UNIQUE NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  assigned_to_id UUID NOT NULL REFERENCES public.service_providers(id) ON DELETE RESTRICT,
  assigned_by_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  case_type case_type NOT NULL,
  priority case_priority DEFAULT 'MEDIUM' NOT NULL,
  due_date TIMESTAMPTZ,
  notes TEXT,
  status assignment_status DEFAULT 'ACTIVE' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_case_assignments_report_id ON public.case_assignments(report_id);
CREATE INDEX idx_case_assignments_assigned_to_id ON public.case_assignments(assigned_to_id);
CREATE INDEX idx_case_assignments_case_type ON public.case_assignments(case_type);
CREATE INDEX idx_case_assignments_priority ON public.case_assignments(priority);
CREATE INDEX idx_case_assignments_status ON public.case_assignments(status);

-- Case comments table (for collaboration)
CREATE TABLE IF NOT EXISTS public.case_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_case_comments_report_id ON public.case_comments(report_id);
CREATE INDEX idx_case_comments_author_id ON public.case_comments(author_id);

-- Case feedback table
CREATE TABLE IF NOT EXISTS public.case_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_assignment_id UUID NOT NULL REFERENCES public.case_assignments(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_case_feedback_case_assignment_id ON public.case_feedback(case_assignment_id);

-- Service provider reviews table
CREATE TABLE IF NOT EXISTS public.service_provider_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_provider_id UUID NOT NULL REFERENCES public.service_providers(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_service_provider_reviews_provider_id ON public.service_provider_reviews(service_provider_id);
CREATE INDEX idx_service_provider_reviews_reviewer_id ON public.service_provider_reviews(reviewer_id);

-- Support requests table
CREATE TABLE IF NOT EXISTS public.support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_provider_id UUID NOT NULL REFERENCES public.service_providers(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  status request_status DEFAULT 'PENDING' NOT NULL,
  requested_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  responded_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

CREATE INDEX idx_support_requests_user_id ON public.support_requests(user_id);
CREATE INDEX idx_support_requests_provider_id ON public.support_requests(service_provider_id);
CREATE INDEX idx_support_requests_status ON public.support_requests(status);

-- Enable Row Level Security
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_provider_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- Add updated_at triggers
CREATE TRIGGER update_service_providers_updated_at
  BEFORE UPDATE ON public.service_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_assignments_updated_at
  BEFORE UPDATE ON public.case_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_comments_updated_at
  BEFORE UPDATE ON public.case_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
