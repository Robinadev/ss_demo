-- SafeHave Database Schema Migration
-- Script 005: Row Level Security Policies
-- This script creates comprehensive RLS policies for all tables

-- =====================================================
-- PROFILES POLICIES
-- =====================================================

-- Users can view their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins and moderators can view all profiles
CREATE POLICY "profiles_select_admin" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('ADMIN', 'MODERATOR')
    )
  );

-- Professionals can view profiles of users they're assigned to
CREATE POLICY "profiles_select_assigned" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.case_assignments ca
      JOIN public.service_providers sp ON ca.assigned_to_id = sp.id
      JOIN public.reports r ON ca.report_id = r.id
      WHERE sp.user_id = auth.uid()
      AND r.reporter_id = profiles.id
    )
  );

-- =====================================================
-- REPORTS POLICIES
-- =====================================================

-- Users can view their own reports
CREATE POLICY "reports_select_own" ON public.reports
  FOR SELECT USING (reporter_id = auth.uid());

-- Users can create reports
CREATE POLICY "reports_insert_own" ON public.reports
  FOR INSERT WITH CHECK (reporter_id = auth.uid() OR is_anonymous = true);

-- Users can update their own reports
CREATE POLICY "reports_update_own" ON public.reports
  FOR UPDATE USING (reporter_id = auth.uid());

-- Admins and moderators can view all reports
CREATE POLICY "reports_select_admin" ON public.reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('ADMIN', 'MODERATOR')
    )
  );

-- Admins can update any report
CREATE POLICY "reports_update_admin" ON public.reports
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'ADMIN'
    )
  );

-- Professionals can view assigned reports
CREATE POLICY "reports_select_assigned" ON public.reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.case_assignments ca
      JOIN public.service_providers sp ON ca.assigned_to_id = sp.id
      WHERE ca.report_id = reports.id
      AND sp.user_id = auth.uid()
    )
  );

-- Professionals can update assigned reports
CREATE POLICY "reports_update_assigned" ON public.reports
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.case_assignments ca
      JOIN public.service_providers sp ON ca.assigned_to_id = sp.id
      WHERE ca.report_id = reports.id
      AND sp.user_id = auth.uid()
    )
  );

-- =====================================================
-- EVIDENCE POLICIES
-- =====================================================

-- Users can view evidence for their own reports
CREATE POLICY "evidence_select_own" ON public.evidence
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = evidence.report_id
      AND r.reporter_id = auth.uid()
    )
  );

-- Users can add evidence to their own reports
CREATE POLICY "evidence_insert_own" ON public.evidence
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = evidence.report_id
      AND r.reporter_id = auth.uid()
    )
  );

-- Professionals can view evidence for assigned cases
CREATE POLICY "evidence_select_assigned" ON public.evidence
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.case_assignments ca
      JOIN public.service_providers sp ON ca.assigned_to_id = sp.id
      WHERE ca.report_id = evidence.report_id
      AND sp.user_id = auth.uid()
    )
  );

-- Admins can view all evidence
CREATE POLICY "evidence_select_admin" ON public.evidence
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('ADMIN', 'MODERATOR')
    )
  );

-- =====================================================
-- SERVICE PROVIDERS POLICIES
-- =====================================================

-- Anyone can view verified service providers
CREATE POLICY "service_providers_select_verified" ON public.service_providers
  FOR SELECT USING (is_verified = true);

-- Service providers can view and update their own profile
CREATE POLICY "service_providers_select_own" ON public.service_providers
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "service_providers_update_own" ON public.service_providers
  FOR UPDATE USING (user_id = auth.uid());

-- Admins can manage all service providers
CREATE POLICY "service_providers_all_admin" ON public.service_providers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'ADMIN'
    )
  );

-- =====================================================
-- CASE ASSIGNMENTS POLICIES
-- =====================================================

-- Users can view assignments for their own reports
CREATE POLICY "case_assignments_select_own" ON public.case_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = case_assignments.report_id
      AND r.reporter_id = auth.uid()
    )
  );

-- Professionals can view their assigned cases
CREATE POLICY "case_assignments_select_assigned" ON public.case_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.service_providers sp
      WHERE sp.id = case_assignments.assigned_to_id
      AND sp.user_id = auth.uid()
    )
  );

-- Professionals can update their assigned cases
CREATE POLICY "case_assignments_update_assigned" ON public.case_assignments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.service_providers sp
      WHERE sp.id = case_assignments.assigned_to_id
      AND sp.user_id = auth.uid()
    )
  );

-- Admins can manage all case assignments
CREATE POLICY "case_assignments_all_admin" ON public.case_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'ADMIN'
    )
  );

-- =====================================================
-- CASE COMMENTS POLICIES
-- =====================================================

-- Users can view public comments on their own cases
CREATE POLICY "case_comments_select_own" ON public.case_comments
  FOR SELECT USING (
    is_public = true AND
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = case_comments.report_id
      AND r.reporter_id = auth.uid()
    )
  );

-- Professionals can view all comments on assigned cases
CREATE POLICY "case_comments_select_assigned" ON public.case_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.case_assignments ca
      JOIN public.service_providers sp ON ca.assigned_to_id = sp.id
      WHERE ca.report_id = case_comments.report_id
      AND sp.user_id = auth.uid()
    )
  );

-- Professionals can add comments to assigned cases
CREATE POLICY "case_comments_insert_assigned" ON public.case_comments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.case_assignments ca
      JOIN public.service_providers sp ON ca.assigned_to_id = sp.id
      WHERE ca.report_id = case_comments.report_id
      AND sp.user_id = auth.uid()
    )
  );

-- Admins can manage all comments
CREATE POLICY "case_comments_all_admin" ON public.case_comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'ADMIN'
    )
  );

-- =====================================================
-- FORUM POLICIES
-- =====================================================

-- Anyone can view published forum posts
CREATE POLICY "forum_posts_select_published" ON public.forum_posts
  FOR SELECT USING (status = 'PUBLISHED' AND deleted_at IS NULL);

-- Users can view their own posts regardless of status
CREATE POLICY "forum_posts_select_own" ON public.forum_posts
  FOR SELECT USING (author_id = auth.uid());

-- Users can create forum posts
CREATE POLICY "forum_posts_insert" ON public.forum_posts
  FOR INSERT WITH CHECK (author_id = auth.uid());

-- Users can update their own posts
CREATE POLICY "forum_posts_update_own" ON public.forum_posts
  FOR UPDATE USING (author_id = auth.uid());

-- Moderators can manage all posts
CREATE POLICY "forum_posts_all_moderator" ON public.forum_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('ADMIN', 'MODERATOR')
    )
  );

-- Anyone can view comments on published posts
CREATE POLICY "forum_comments_select" ON public.forum_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.forum_posts fp
      WHERE fp.id = forum_comments.post_id
      AND fp.status = 'PUBLISHED'
      AND fp.deleted_at IS NULL
    )
  );

-- Users can create comments
CREATE POLICY "forum_comments_insert" ON public.forum_comments
  FOR INSERT WITH CHECK (author_id = auth.uid() OR author_id IS NULL);

-- Users can update their own comments
CREATE POLICY "forum_comments_update_own" ON public.forum_comments
  FOR UPDATE USING (author_id = auth.uid());

-- Moderators can manage all comments
CREATE POLICY "forum_comments_all_moderator" ON public.forum_comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('ADMIN', 'MODERATOR')
    )
  );

-- =====================================================
-- MISSING PERSONS POLICIES
-- =====================================================

-- Anyone can view active missing persons
CREATE POLICY "missing_persons_select_active" ON public.missing_persons
  FOR SELECT USING (status = 'ACTIVE');

-- Users can view their own submissions
CREATE POLICY "missing_persons_select_own" ON public.missing_persons
  FOR SELECT USING (reported_by_id = auth.uid());

-- Users can create missing person reports
CREATE POLICY "missing_persons_insert" ON public.missing_persons
  FOR INSERT WITH CHECK (reported_by_id = auth.uid() OR reported_by_id IS NULL);

-- Users can update their own submissions
CREATE POLICY "missing_persons_update_own" ON public.missing_persons
  FOR UPDATE USING (reported_by_id = auth.uid());

-- Admins can manage all missing persons
CREATE POLICY "missing_persons_all_admin" ON public.missing_persons
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'ADMIN'
    )
  );

-- =====================================================
-- ANALYTICS & AUDIT POLICIES
-- =====================================================

-- Only admins can view analytics
CREATE POLICY "analytics_select_admin" ON public.analytics_snapshots
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'ADMIN'
    )
  );

-- Only admins can view audit logs
CREATE POLICY "audit_logs_select_admin" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'ADMIN'
    )
  );

-- ML training data is admin only
CREATE POLICY "ml_training_data_admin" ON public.ml_training_data
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'ADMIN'
    )
  );
