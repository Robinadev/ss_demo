// Database types for Supabase integration
// These types mirror the Prisma schema from the NestJS backend

export type UserRole =
  | "SURVIVOR"
  | "COUNSELOR"
  | "MEDICAL_PROFESSIONAL"
  | "LEGAL_ADVISOR"
  | "ADMIN"
  | "MODERATOR"
  | "SYSTEM"

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED"

export type IncidentCategory =
  | "PHYSICAL_VIOLENCE"
  | "SEXUAL_ASSAULT"
  | "EMOTIONAL_ABUSE"
  | "PSYCHOLOGICAL_ABUSE"
  | "NEGLECT"
  | "CYBERBULLYING"
  | "HARASSMENT"
  | "DISCRIMINATION"
  | "WORKPLACE_ABUSE"
  | "DOMESTIC_VIOLENCE"
  | "CHILD_ABUSE"
  | "ELDER_ABUSE"
  | "OTHER"

export type SeverityLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export type ReportStatus =
  | "PENDING_REVIEW"
  | "UNDER_INVESTIGATION"
  | "ASSIGNED_TO_PROFESSIONAL"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED"
  | "REJECTED"
  | "ARCHIVED"

export type CaseType =
  | "COUNSELING"
  | "MEDICAL_SUPPORT"
  | "LEGAL_ASSISTANCE"
  | "EMERGENCY_SUPPORT"
  | "PREVENTION_EDUCATION"
  | "RESOURCE_REFERRAL"
  | "COMBINED_SUPPORT"

export type CasePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export type AssignmentStatus = "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED"

export type ServiceProviderType =
  | "COUNSELOR"
  | "MEDICAL_PROFESSIONAL"
  | "LEGAL_ADVISOR"
  | "NGO"
  | "GOVERNMENT_AGENCY"
  | "COMMUNITY_CENTER"
  | "SHELTER"
  | "HOTLINE"

export type RequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED"

export type ForumCategory =
  | "PEER_SUPPORT"
  | "STORYTELLING"
  | "QUESTIONS_ANSWERS"
  | "RESOURCES"
  | "ANNOUNCEMENTS"
  | "AWARENESS"

export type ForumPostStatus = "PENDING_MODERATION" | "PUBLISHED" | "HIDDEN" | "DELETED"

export type MissingPersonStatus = "ACTIVE" | "FOUND" | "CLOSED"

// Database table types
export interface Profile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  role: UserRole
  status: UserStatus
  language: string
  avatar_url: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Report {
  id: string
  reporter_id: string | null
  title: string
  description: string
  category: IncidentCategory
  severity: SeverityLevel
  status: ReportStatus
  is_anonymous: boolean
  language: string
  classification_score: number | null
  classification_label: string | null
  suggested_case_type: CaseType | null
  suggested_priority: CasePriority | null
  location: string | null
  ip_hash: string | null
  device_fingerprint: string | null
  risk_score: number
  flagged_as_repetitive: boolean
  is_duplicate: boolean
  created_at: string
  updated_at: string
  resolved_at: string | null
}

export interface Evidence {
  id: string
  report_id: string
  file_url: string
  file_name: string
  file_type: string
  file_size: number
  description: string | null
  created_at: string
}

export interface CaseAssignment {
  id: string
  report_id: string
  assigned_to_id: string
  assigned_by_id: string | null
  case_type: CaseType
  priority: CasePriority
  due_date: string | null
  notes: string | null
  status: AssignmentStatus
  created_at: string
  updated_at: string
  completed_at: string | null
}

export interface CaseComment {
  id: string
  report_id: string
  author_id: string
  content: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface ServiceProvider {
  id: string
  user_id: string | null
  name: string
  type: ServiceProviderType
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  country: string | null
  description: string | null
  website: string | null
  is_verified: boolean
  rating: number | null
  availability: string | null
  languages: string[]
  specializations: string[]
  created_at: string
  updated_at: string
}

export interface ServiceProviderReview {
  id: string
  service_provider_id: string
  reviewer_id: string | null
  rating: number
  feedback: string | null
  created_at: string
}

export interface SupportRequest {
  id: string
  user_id: string
  service_provider_id: string
  description: string
  status: RequestStatus
  requested_at: string
  responded_at: string | null
  resolved_at: string | null
}

export interface CaseFeedback {
  id: string
  case_assignment_id: string
  rating: number
  feedback: string | null
  created_at: string
}

export interface ForumPost {
  id: string
  author_id: string
  title: string
  content: string
  category: ForumCategory
  status: ForumPostStatus
  views: number
  likes: number
  is_anonymous: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ForumComment {
  id: string
  post_id: string
  author_id: string | null
  content: string
  likes: number
  is_anonymous: boolean
  created_at: string
  updated_at: string
}

export interface MissingPerson {
  id: string
  first_name: string
  last_name: string
  age: number | null
  gender: string | null
  description: string | null
  photo_url: string | null
  last_seen_location: string
  last_seen_date: string
  contact_info: string | null
  status: MissingPersonStatus
  reported_by_id: string | null
  created_at: string
  updated_at: string
  resolved_at: string | null
}

export interface AnalyticsSnapshot {
  id: string
  date: string
  total_reports: number
  reports_by_category: Record<string, number>
  reports_by_severity: Record<string, number>
  resolution_rate: number
  average_resolution_time: number
  anonymous_report_count: number
  public_report_count: number
  cases_by_type: Record<string, number>
  unique_reporters: number
}

export interface AuditLog {
  id: string
  action: string
  entity_type: string
  entity_id: string
  changes: Record<string, unknown>
  user_id: string | null
  ip_address: string | null
  created_at: string
}

// Supabase Database type definition
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, "created_at" | "updated_at">
        Update: Partial<Omit<Profile, "id" | "created_at">>
      }
      reports: {
        Row: Report
        Insert: Omit<Report, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Report, "id" | "created_at">>
      }
      evidence: {
        Row: Evidence
        Insert: Omit<Evidence, "id" | "created_at">
        Update: Partial<Omit<Evidence, "id" | "created_at">>
      }
      case_assignments: {
        Row: CaseAssignment
        Insert: Omit<CaseAssignment, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<CaseAssignment, "id" | "created_at">>
      }
      case_comments: {
        Row: CaseComment
        Insert: Omit<CaseComment, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<CaseComment, "id" | "created_at">>
      }
      service_providers: {
        Row: ServiceProvider
        Insert: Omit<ServiceProvider, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<ServiceProvider, "id" | "created_at">>
      }
      service_provider_reviews: {
        Row: ServiceProviderReview
        Insert: Omit<ServiceProviderReview, "id" | "created_at">
        Update: Partial<Omit<ServiceProviderReview, "id" | "created_at">>
      }
      support_requests: {
        Row: SupportRequest
        Insert: Omit<SupportRequest, "id" | "requested_at">
        Update: Partial<Omit<SupportRequest, "id" | "requested_at">>
      }
      case_feedback: {
        Row: CaseFeedback
        Insert: Omit<CaseFeedback, "id" | "created_at">
        Update: Partial<Omit<CaseFeedback, "id" | "created_at">>
      }
      forum_posts: {
        Row: ForumPost
        Insert: Omit<ForumPost, "id" | "created_at" | "updated_at" | "views" | "likes">
        Update: Partial<Omit<ForumPost, "id" | "created_at">>
      }
      forum_comments: {
        Row: ForumComment
        Insert: Omit<ForumComment, "id" | "created_at" | "updated_at" | "likes">
        Update: Partial<Omit<ForumComment, "id" | "created_at">>
      }
      missing_persons: {
        Row: MissingPerson
        Insert: Omit<MissingPerson, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<MissingPerson, "id" | "created_at">>
      }
      analytics_snapshots: {
        Row: AnalyticsSnapshot
        Insert: Omit<AnalyticsSnapshot, "id">
        Update: Partial<Omit<AnalyticsSnapshot, "id">>
      }
      audit_logs: {
        Row: AuditLog
        Insert: Omit<AuditLog, "id" | "created_at">
        Update: never
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      user_status: UserStatus
      incident_category: IncidentCategory
      severity_level: SeverityLevel
      report_status: ReportStatus
      case_type: CaseType
      case_priority: CasePriority
      assignment_status: AssignmentStatus
      service_provider_type: ServiceProviderType
      request_status: RequestStatus
      forum_category: ForumCategory
      forum_post_status: ForumPostStatus
      missing_person_status: MissingPersonStatus
    }
  }
}
