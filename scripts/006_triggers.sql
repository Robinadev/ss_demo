-- SafeHave Database Schema Migration
-- Script 006: Triggers and Functions
-- This script creates database triggers for automation

-- =====================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    role,
    status,
    language
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', NULL),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'SURVIVOR'),
    'ACTIVE',
    COALESCE(NEW.raw_user_meta_data ->> 'language', 'en')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- AUDIT LOGGING TRIGGERS
-- =====================================================

-- Function to create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  changes_json JSONB;
  action_name TEXT;
BEGIN
  IF TG_OP = 'INSERT' THEN
    changes_json := to_jsonb(NEW);
    action_name := 'CREATE';
  ELSIF TG_OP = 'UPDATE' THEN
    changes_json := jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW)
    );
    action_name := 'UPDATE';
  ELSIF TG_OP = 'DELETE' THEN
    changes_json := to_jsonb(OLD);
    action_name := 'DELETE';
  END IF;

  INSERT INTO public.audit_logs (
    action,
    entity_type,
    entity_id,
    changes,
    user_id
  )
  VALUES (
    action_name,
    TG_TABLE_NAME,
    COALESCE(NEW.id::text, OLD.id::text),
    changes_json,
    auth.uid()
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

-- Audit trigger for reports
CREATE TRIGGER audit_reports
  AFTER INSERT OR UPDATE OR DELETE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION create_audit_log();

-- Audit trigger for case_assignments
CREATE TRIGGER audit_case_assignments
  AFTER INSERT OR UPDATE OR DELETE ON public.case_assignments
  FOR EACH ROW
  EXECUTE FUNCTION create_audit_log();

-- =====================================================
-- AUTO-ASSIGN CASE TYPE AND PRIORITY
-- =====================================================

CREATE OR REPLACE FUNCTION auto_set_report_defaults()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Set suggested case type based on category if not provided
  IF NEW.suggested_case_type IS NULL THEN
    NEW.suggested_case_type := CASE NEW.category
      WHEN 'PHYSICAL_VIOLENCE' THEN 'MEDICAL_SUPPORT'
      WHEN 'SEXUAL_ASSAULT' THEN 'LEGAL_ASSISTANCE'
      WHEN 'EMOTIONAL_ABUSE' THEN 'COUNSELING'
      WHEN 'PSYCHOLOGICAL_ABUSE' THEN 'COUNSELING'
      WHEN 'NEGLECT' THEN 'COUNSELING'
      WHEN 'CYBERBULLYING' THEN 'LEGAL_ASSISTANCE'
      WHEN 'HARASSMENT' THEN 'LEGAL_ASSISTANCE'
      WHEN 'DISCRIMINATION' THEN 'LEGAL_ASSISTANCE'
      WHEN 'WORKPLACE_ABUSE' THEN 'LEGAL_ASSISTANCE'
      WHEN 'DOMESTIC_VIOLENCE' THEN 'COMBINED_SUPPORT'
      WHEN 'CHILD_ABUSE' THEN 'COMBINED_SUPPORT'
      WHEN 'ELDER_ABUSE' THEN 'COMBINED_SUPPORT'
      ELSE 'RESOURCE_REFERRAL'
    END;
  END IF;

  -- Set suggested priority based on severity if not provided
  IF NEW.suggested_priority IS NULL THEN
    NEW.suggested_priority := CASE NEW.severity
      WHEN 'CRITICAL' THEN 'CRITICAL'
      WHEN 'HIGH' THEN 'HIGH'
      WHEN 'MEDIUM' THEN 'MEDIUM'
      ELSE 'LOW'
    END;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER set_report_defaults
  BEFORE INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION auto_set_report_defaults();

-- =====================================================
-- UPDATE SERVICE PROVIDER RATING
-- =====================================================

CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  avg_rating FLOAT;
BEGIN
  -- Calculate new average rating
  SELECT AVG(rating)::FLOAT
  INTO avg_rating
  FROM public.service_provider_reviews
  WHERE service_provider_id = NEW.service_provider_id;

  -- Update service provider rating
  UPDATE public.service_providers
  SET rating = avg_rating
  WHERE id = NEW.service_provider_id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER update_rating_on_review
  AFTER INSERT OR UPDATE ON public.service_provider_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_rating();

-- =====================================================
-- NOTIFY ON HIGH PRIORITY REPORTS
-- =====================================================

CREATE OR REPLACE FUNCTION notify_high_priority_report()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Notify on critical severity reports
  IF NEW.severity = 'CRITICAL' THEN
    PERFORM pg_notify(
      'high_priority_report',
      json_build_object(
        'report_id', NEW.id,
        'category', NEW.category,
        'severity', NEW.severity,
        'created_at', NEW.created_at
      )::text
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_on_critical_report
  AFTER INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION notify_high_priority_report();

-- =====================================================
-- AUTO-UPDATE REPORT STATUS
-- =====================================================

CREATE OR REPLACE FUNCTION update_report_status_on_assignment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.reports
    SET status = 'ASSIGNED_TO_PROFESSIONAL'
    WHERE id = NEW.report_id
    AND status IN ('PENDING_REVIEW', 'UNDER_INVESTIGATION');
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.status = 'COMPLETED' AND OLD.status != 'COMPLETED' THEN
      UPDATE public.reports
      SET 
        status = 'RESOLVED',
        resolved_at = NOW()
      WHERE id = NEW.report_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER update_report_on_assignment
  AFTER INSERT OR UPDATE ON public.case_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_report_status_on_assignment();
