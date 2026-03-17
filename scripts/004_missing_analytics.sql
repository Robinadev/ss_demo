-- SafeHave Database Schema Migration
-- Script 004: Missing Persons and Analytics Tables
-- This script creates tables for missing persons registry and analytics

-- Missing persons table
CREATE TABLE IF NOT EXISTS public.missing_persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  description TEXT,
  photo_url TEXT,
  last_seen_location TEXT NOT NULL,
  last_seen_date TIMESTAMPTZ NOT NULL,
  contact_info TEXT,
  status missing_person_status DEFAULT 'ACTIVE' NOT NULL,
  reported_by_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  resolved_at TIMESTAMPTZ
);

CREATE INDEX idx_missing_persons_status ON public.missing_persons(status);
CREATE INDEX idx_missing_persons_last_seen_date ON public.missing_persons(last_seen_date);
CREATE INDEX idx_missing_persons_reported_by ON public.missing_persons(reported_by_id);

-- Analytics snapshots table (for dashboard metrics)
CREATE TABLE IF NOT EXISTS public.analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  total_reports INTEGER DEFAULT 0 NOT NULL,
  reports_by_category JSONB DEFAULT '{}' NOT NULL,
  reports_by_severity JSONB DEFAULT '{}' NOT NULL,
  resolution_rate FLOAT DEFAULT 0 NOT NULL,
  average_resolution_time INTEGER DEFAULT 0 NOT NULL, -- in hours
  anonymous_report_count INTEGER DEFAULT 0 NOT NULL,
  public_report_count INTEGER DEFAULT 0 NOT NULL,
  cases_by_type JSONB DEFAULT '{}' NOT NULL,
  unique_reporters INTEGER DEFAULT 0 NOT NULL
);

CREATE INDEX idx_analytics_snapshots_date ON public.analytics_snapshots(date);

-- ML Training data table (for improving classification)
CREATE TABLE IF NOT EXISTS public.ml_training_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category incident_category NOT NULL,
  text TEXT NOT NULL,
  severity severity_level NOT NULL,
  frequency INTEGER DEFAULT 1 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_ml_training_data_category ON public.ml_training_data(category);
CREATE INDEX idx_ml_training_data_is_active ON public.ml_training_data(is_active);

-- Enable Row Level Security
ALTER TABLE public.missing_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_training_data ENABLE ROW LEVEL SECURITY;

-- Add updated_at trigger for missing_persons
CREATE TRIGGER update_missing_persons_updated_at
  BEFORE UPDATE ON public.missing_persons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate daily analytics snapshot
CREATE OR REPLACE FUNCTION generate_analytics_snapshot()
RETURNS void AS $$
DECLARE
  today DATE := CURRENT_DATE;
  v_total_reports INTEGER;
  v_reports_by_category JSONB;
  v_reports_by_severity JSONB;
  v_resolution_rate FLOAT;
  v_avg_resolution_time INTEGER;
  v_anonymous_count INTEGER;
  v_public_count INTEGER;
  v_cases_by_type JSONB;
  v_unique_reporters INTEGER;
BEGIN
  -- Count total reports
  SELECT COUNT(*) INTO v_total_reports FROM public.reports;
  
  -- Reports by category
  SELECT jsonb_object_agg(category, cnt)
  INTO v_reports_by_category
  FROM (
    SELECT category::text, COUNT(*) as cnt
    FROM public.reports
    GROUP BY category
  ) t;
  
  -- Reports by severity
  SELECT jsonb_object_agg(severity, cnt)
  INTO v_reports_by_severity
  FROM (
    SELECT severity::text, COUNT(*) as cnt
    FROM public.reports
    GROUP BY severity
  ) t;
  
  -- Resolution rate
  SELECT 
    CASE WHEN COUNT(*) > 0 
      THEN (COUNT(*) FILTER (WHERE status IN ('RESOLVED', 'CLOSED'))::FLOAT / COUNT(*)::FLOAT) * 100
      ELSE 0 
    END
  INTO v_resolution_rate
  FROM public.reports;
  
  -- Average resolution time (in hours)
  SELECT COALESCE(
    AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600)::INTEGER,
    0
  )
  INTO v_avg_resolution_time
  FROM public.reports
  WHERE resolved_at IS NOT NULL;
  
  -- Anonymous vs public counts
  SELECT COUNT(*) FILTER (WHERE is_anonymous = true),
         COUNT(*) FILTER (WHERE is_anonymous = false)
  INTO v_anonymous_count, v_public_count
  FROM public.reports;
  
  -- Cases by type
  SELECT jsonb_object_agg(case_type, cnt)
  INTO v_cases_by_type
  FROM (
    SELECT case_type::text, COUNT(*) as cnt
    FROM public.case_assignments
    GROUP BY case_type
  ) t;
  
  -- Unique reporters
  SELECT COUNT(DISTINCT reporter_id)
  INTO v_unique_reporters
  FROM public.reports
  WHERE reporter_id IS NOT NULL;
  
  -- Insert or update snapshot
  INSERT INTO public.analytics_snapshots (
    date,
    total_reports,
    reports_by_category,
    reports_by_severity,
    resolution_rate,
    average_resolution_time,
    anonymous_report_count,
    public_report_count,
    cases_by_type,
    unique_reporters
  )
  VALUES (
    today,
    v_total_reports,
    COALESCE(v_reports_by_category, '{}'),
    COALESCE(v_reports_by_severity, '{}'),
    v_resolution_rate,
    v_avg_resolution_time,
    v_anonymous_count,
    v_public_count,
    COALESCE(v_cases_by_type, '{}'),
    v_unique_reporters
  )
  ON CONFLICT (date) DO UPDATE SET
    total_reports = EXCLUDED.total_reports,
    reports_by_category = EXCLUDED.reports_by_category,
    reports_by_severity = EXCLUDED.reports_by_severity,
    resolution_rate = EXCLUDED.resolution_rate,
    average_resolution_time = EXCLUDED.average_resolution_time,
    anonymous_report_count = EXCLUDED.anonymous_report_count,
    public_report_count = EXCLUDED.public_report_count,
    cases_by_type = EXCLUDED.cases_by_type,
    unique_reporters = EXCLUDED.unique_reporters;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
