-- SafeHave Database Schema Migration
-- Script 001: Core Tables and Enums
-- This script creates the foundational tables for the SafeHave platform

-- Create custom enums
CREATE TYPE user_role AS ENUM (
  'SURVIVOR',
  'COUNSELOR',
  'MEDICAL_PROFESSIONAL',
  'LEGAL_ADVISOR',
  'ADMIN',
  'MODERATOR',
  'SYSTEM'
);

CREATE TYPE user_status AS ENUM (
  'ACTIVE',
  'INACTIVE',
  'SUSPENDED',
  'DELETED'
);

CREATE TYPE incident_category AS ENUM (
  'PHYSICAL_VIOLENCE',
  'SEXUAL_ASSAULT',
  'EMOTIONAL_ABUSE',
  'PSYCHOLOGICAL_ABUSE',
  'NEGLECT',
  'CYBERBULLYING',
  'HARASSMENT',
  'DISCRIMINATION',
  'WORKPLACE_ABUSE',
  'DOMESTIC_VIOLENCE',
  'CHILD_ABUSE',
  'ELDER_ABUSE',
  'OTHER'
);

CREATE TYPE severity_level AS ENUM (
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL'
);

CREATE TYPE report_status AS ENUM (
  'PENDING_REVIEW',
  'UNDER_INVESTIGATION',
  'ASSIGNED_TO_PROFESSIONAL',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
  'REJECTED',
  'ARCHIVED'
);

CREATE TYPE case_type AS ENUM (
  'COUNSELING',
  'MEDICAL_SUPPORT',
  'LEGAL_ASSISTANCE',
  'EMERGENCY_SUPPORT',
  'PREVENTION_EDUCATION',
  'RESOURCE_REFERRAL',
  'COMBINED_SUPPORT'
);

CREATE TYPE case_priority AS ENUM (
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL'
);

CREATE TYPE assignment_status AS ENUM (
  'ACTIVE',
  'ON_HOLD',
  'COMPLETED',
  'CANCELLED'
);

CREATE TYPE service_provider_type AS ENUM (
  'COUNSELOR',
  'MEDICAL_PROFESSIONAL',
  'LEGAL_ADVISOR',
  'NGO',
  'GOVERNMENT_AGENCY',
  'COMMUNITY_CENTER',
  'SHELTER',
  'HOTLINE'
);

CREATE TYPE request_status AS ENUM (
  'PENDING',
  'ACCEPTED',
  'IN_PROGRESS',
  'COMPLETED',
  'REJECTED',
  'CANCELLED'
);

CREATE TYPE forum_category AS ENUM (
  'PEER_SUPPORT',
  'STORYTELLING',
  'QUESTIONS_ANSWERS',
  'RESOURCES',
  'ANNOUNCEMENTS',
  'AWARENESS'
);

CREATE TYPE forum_post_status AS ENUM (
  'PENDING_MODERATION',
  'PUBLISHED',
  'HIDDEN',
  'DELETED'
);

CREATE TYPE missing_person_status AS ENUM (
  'ACTIVE',
  'FOUND',
  'CLOSED'
);

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'SURVIVOR' NOT NULL,
  status user_status DEFAULT 'ACTIVE' NOT NULL,
  language TEXT DEFAULT 'en' NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_status ON public.profiles(status);

-- Reports table (incident reports)
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category incident_category NOT NULL,
  severity severity_level NOT NULL,
  status report_status DEFAULT 'PENDING_REVIEW' NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE NOT NULL,
  language TEXT DEFAULT 'en' NOT NULL,
  
  -- ML Classification fields
  classification_score FLOAT,
  classification_label TEXT,
  suggested_case_type case_type,
  suggested_priority case_priority,
  
  -- Location & IP Risk
  location TEXT,
  ip_hash TEXT,
  device_fingerprint TEXT,
  
  -- Fraud Detection
  risk_score FLOAT DEFAULT 0 NOT NULL,
  flagged_as_repetitive BOOLEAN DEFAULT FALSE NOT NULL,
  is_duplicate BOOLEAN DEFAULT FALSE NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  resolved_at TIMESTAMPTZ
);

CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_reports_category ON public.reports(category);
CREATE INDEX idx_reports_severity ON public.reports(severity);
CREATE INDEX idx_reports_risk_score ON public.reports(risk_score);
CREATE INDEX idx_reports_ip_hash ON public.reports(ip_hash);
CREATE INDEX idx_reports_created_at ON public.reports(created_at);
CREATE INDEX idx_reports_reporter_id ON public.reports(reporter_id);

-- Evidence table (attachments for reports)
CREATE TABLE IF NOT EXISTS public.evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_evidence_report_id ON public.evidence(report_id);

-- Audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  changes JSONB NOT NULL DEFAULT '{}',
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_audit_logs_entity_type ON public.audit_logs(entity_type);
CREATE INDEX idx_audit_logs_entity_id ON public.audit_logs(entity_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
