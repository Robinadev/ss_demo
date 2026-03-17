# Database Schema Reference

## Complete Schema Overview

### Table Structure and Relationships

```
User
├── Report (one-to-many)
├── CaseComment (one-to-many as author)
├── CaseAssignment (one-to-many as assignedTo)
├── ForumPost (one-to-many)
└── SupportRequest (one-to-many)

Report
├── User (many-to-one as reporter)
├── Evidence (one-to-many)
├── CaseAssignment (one-to-one)
├── CaseComment (one-to-many)
└── AuditLog (one-to-many)

CaseAssignment
├── Report (many-to-one)
├── User (many-to-one as assignedTo)
├── ServiceProvider (many-to-many)
├── CaseFeedback (one-to-many)
└── CaseComment (one-to-many via Report)

ServiceProvider
├── CaseAssignment (many-to-many)
├── ServiceProviderReview (one-to-many)
└── SupportRequest (one-to-many)
```

## Detailed Table Schemas

### User Table

```typescript
Table: User
├── id (String, PK, CUID)              // Unique identifier
├── email (String, UNIQUE)             // Email address
├── password (String, nullable)        // Hashed password
├── firstName (String, nullable)       // First name
├── lastName (String, nullable)        // Last name
├── phone (String, nullable)           // Contact phone
├── role (Enum: UserRole)              // User role
├── status (Enum: UserStatus)          // Account status
├── language (String, default: 'en')   // Preferred language
├── createdAt (DateTime)               // Creation timestamp
├── updatedAt (DateTime)               // Last update
└── deletedAt (DateTime, nullable)     // Soft delete timestamp

Indexes:
- UNIQUE: email
- INDEX: role
```

**Relationships:**
- Has many: Report, CaseComment, CaseAssignment, ForumPost, SupportRequest
- Referenced by: CaseComment, CaseAssignment, SupportRequest, ForumPost

### Report Table

```typescript
Table: Report
├── id (String, PK, CUID)
├── reporterId (String, FK, nullable)        // User who reported
├── title (String)                           // Report title
├── description (Text)                       // Full description
├── category (Enum: IncidentCategory)        // Classification category
├── severity (Enum: SeverityLevel)           // Severity level
├── status (Enum: ReportStatus)              // Processing status
├── isAnonymous (Boolean, default: true)     // Anonymous flag
├── language (String, default: 'en')         // Report language
├── classificationScore (Float, nullable)    // ML confidence
├── classificationLabel (String, nullable)   // Predicted category
├── suggestedCaseType (String, nullable)     // Case type suggestion
├── suggestedPriority (String, nullable)     // Priority suggestion
├── location (String, nullable)              // Incident location
├── ipAddress (VarChar(255), nullable)       // Reporter IP
├── ipHash (String, nullable, UNIQUE)        // Hashed IP for privacy
├── deviceFingerprint (VarChar(255), nullable)
├── riskScore (Float, default: 0)            // Fraud risk score
├── flaggedAsRepetitive (Boolean)            // Repetition flag
├── isDuplicate (Boolean)                    // Duplicate flag
├── createdAt (DateTime)
├── updatedAt (DateTime)
└── resolvedAt (DateTime, nullable)

Indexes:
- INDEX: status, category, severity, riskScore, createdAt
- UNIQUE: ipHash
```

**Status Workflow:**
```
PENDING_REVIEW
    ↓
UNDER_INVESTIGATION
    ↓
ASSIGNED_TO_PROFESSIONAL
    ↓
IN_PROGRESS
    ↓
RESOLVED / CLOSED / REJECTED / ARCHIVED
```

### Evidence Table

```typescript
Table: Evidence
├── id (String, PK, CUID)
├── reportId (String, FK)              // Related report
├── fileUrl (String)                   // File URL
├── fileName (String)                  // Original file name
├── fileType (String)                  // MIME type
├── fileSize (Integer)                 // File size in bytes
├── description (String, nullable)     // File description
└── createdAt (DateTime)

Indexes:
- INDEX: reportId
- FK Constraint: CASCADE delete with Report
```

### CaseAssignment Table

```typescript
Table: CaseAssignment
├── id (String, PK, CUID)
├── reportId (String, FK, UNIQUE)              // Assigned report
├── assignedToId (String, FK)                  // Professional user
├── assignedById (String, nullable)            // Admin who assigned
├── caseType (Enum: CaseType)                  // Type of support
├── priority (Enum: CasePriority, MEDIUM)      // Case priority
├── dueDate (DateTime, nullable)               // Target completion
├── notes (Text, nullable)                     // Assignment notes
├── status (Enum: AssignmentStatus)            // Assignment status
├── createdAt (DateTime)
├── updatedAt (DateTime)
└── completedAt (DateTime, nullable)

Indexes:
- INDEX: reportId, assignedToId, caseType, priority, status
- FK: reportId (CASCADE), assignedToId (RESTRICT)
```

**Many-to-Many:**
- CaseAssignment → ServiceProvider (via junction table)

### CaseComment Table

```typescript
Table: CaseComment
├── id (String, PK, CUID)
├── reportId (String, FK)              // Related case
├── authorId (String, FK)              // Comment author
├── content (Text)                     // Comment content
├── isPublic (Boolean, default: false) // Public/internal
├── createdAt (DateTime)
└── updatedAt (DateTime)

Indexes:
- INDEX: reportId, authorId
- FK: reportId (CASCADE), authorId (RESTRICT)
```

### ServiceProvider Table

```typescript
Table: ServiceProvider
├── id (String, PK, CUID)
├── name (String)                              // Organization name
├── type (Enum: ServiceProviderType)           // Provider type
├── email (String, nullable)                   // Contact email
├── phone (String, nullable)                   // Contact phone
├── address (Text, nullable)                   // Physical address
├── city (String, nullable)                    // City
├── country (String, nullable)                 // Country
├── description (Text, nullable)               // About provider
├── website (String, nullable)                 // Website URL
├── isVerified (Boolean, default: false)       // Verification status
├── rating (Float, default: 0)                 // Average rating
├── availability (String, nullable)            // Operating hours
├── languages (String[], default: ['en'])      // Supported languages
├── specializations (String[])                 // Expertise areas
├── createdAt (DateTime)
└── updatedAt (DateTime)

Indexes:
- INDEX: type, isVerified
```

**Provider Types:**
- COUNSELOR
- MEDICAL_PROFESSIONAL
- LEGAL_ADVISOR
- NGO
- GOVERNMENT_AGENCY
- COMMUNITY_CENTER
- SHELTER
- HOTLINE

### ServiceProviderReview Table

```typescript
Table: ServiceProviderReview
├── id (String, PK, CUID)
├── serviceProviderId (String, FK)   // Reviewed provider
├── rating (Integer)                 // 1-5 stars
├── feedback (Text, nullable)        // Review text
└── createdAt (DateTime)

Indexes:
- INDEX: serviceProviderId
- FK: serviceProviderId (CASCADE)
```

### SupportRequest Table

```typescript
Table: SupportRequest
├── id (String, PK, CUID)
├── userId (String, FK)              // Requesting user
├── serviceProviderId (String, FK)   // Service provider
├── description (Text)               // Request details
├── status (Enum: RequestStatus)     // Request status
├── requestedAt (DateTime)           // Request timestamp
├── respondedAt (DateTime, nullable) // Response timestamp
└── resolvedAt (DateTime, nullable)  // Resolution timestamp

Indexes:
- INDEX: userId, serviceProviderId, status

Status Progression:
PENDING → ACCEPTED → IN_PROGRESS → COMPLETED
              ↓
           REJECTED / CANCELLED
```

### CaseFeedback Table

```typescript
Table: CaseFeedback
├── id (String, PK, CUID)
├── caseAssignmentId (String, FK)    // Related case
├── rating (Integer)                 // Satisfaction rating
├── feedback (Text, nullable)        // Feedback text
└── createdAt (DateTime)

Indexes:
- INDEX: caseAssignmentId
- FK: caseAssignmentId (CASCADE)
```

### ForumPost Table

```typescript
Table: ForumPost
├── id (String, PK, CUID)
├── authorId (String, FK)                      // Post author
├── title (String)                             // Post title
├── content (Text)                             // Post content
├── category (Enum: ForumCategory)             // Post category
├── status (Enum: ForumPostStatus)             // Moderation status
├── views (Integer, default: 0)                // View count
├── likes (Integer, default: 0)                // Like count
├── isAnonymous (Boolean, default: true)       // Anonymous posting
├── createdAt (DateTime)
├── updatedAt (DateTime)
└── deletedAt (DateTime, nullable)

Indexes:
- INDEX: authorId, category, status, createdAt

Categories:
- PEER_SUPPORT
- STORYTELLING
- QUESTIONS_ANSWERS
- RESOURCES
- ANNOUNCEMENTS
- AWARENESS

Status:
- PENDING_MODERATION
- PUBLISHED
- HIDDEN
- DELETED
```

### ForumComment Table

```typescript
Table: ForumComment
├── id (String, PK, CUID)
├── postId (String, FK)              // Parent post
├── content (Text)                   // Comment content
├── likes (Integer, default: 0)      // Like count
├── createdAt (DateTime)
└── updatedAt (DateTime)

Indexes:
- INDEX: postId
```

### MissingPerson Table

```typescript
Table: MissingPerson
├── id (String, PK, CUID)
├── firstName (String)               // First name
├── lastName (String)                // Last name
├── age (Integer, nullable)          // Age
├── description (Text, nullable)     // Physical description
├── photoUrl (String, nullable)      // Photo URL
├── lastSeenLocation (String)        // Last seen location
├── lastSeenDate (DateTime)          // Date last seen
├── status (Enum: MissingPersonStatus)
├── createdAt (DateTime)
├── updatedAt (DateTime)
└── resolvedAt (DateTime, nullable)

Indexes:
- INDEX: status, lastSeenDate

Status:
- ACTIVE
- FOUND
- CLOSED
```

### AnalyticsSnapshot Table

```typescript
Table: AnalyticsSnapshot
├── id (String, PK, CUID)
├── date (DateTime, UNIQUE, default: now)
├── totalReports (Integer, default: 0)
├── reportsByCategory (Text - JSON)
├── reportsBySeverity (Text - JSON)
├── resolutionRate (Float, default: 0)
├── averageResolutionTime (Integer, default: 0)
├── anonymousReportCount (Integer, default: 0)
├── publicReportCount (Integer, default: 0)
├── casesByType (Text - JSON)
└── uniqueReporters (Integer, default: 0)

Indexes:
- UNIQUE: date

JSON Structure Example:
{
  "reportsByCategory": {
    "PHYSICAL_VIOLENCE": 15,
    "SEXUAL_ASSAULT": 8,
    "CYBERBULLYING": 12
  },
  "reportsBySeverity": {
    "CRITICAL": 5,
    "HIGH": 20,
    "MEDIUM": 30,
    "LOW": 5
  }
}
```

### AuditLog Table

```typescript
Table: AuditLog
├── id (String, PK, CUID)
├── action (String)                  // Action performed
├── entityType (String)              // Entity type (Report, etc)
├── entityId (String)                // Entity ID
├── changes (Text - JSON)            // Detailed changes
├── userId (String, nullable)        // User who acted
├── ipAddress (String, nullable)     // User IP address
└── createdAt (DateTime)

Indexes:
- INDEX: entityType, entityId, createdAt

Actions:
- REPORT_CREATED
- REPORT_UPDATED
- CASE_ASSIGNED
- COMMENT_ADDED
- STATUS_CHANGED
- PROFESSIONAL_NOTIFIED
```

### MLTrainingData Table

```typescript
Table: MLTrainingData
├── id (String, PK, CUID)
├── category (Enum: IncidentCategory)
├── text (Text)                      // Training sample
├── severity (Enum: SeverityLevel)   // Known severity
├── frequency (Integer, default: 1)  // Usage frequency
├── isActive (Boolean, default: true) // Active for training
└── createdAt (DateTime)

Indexes:
- INDEX: category, isActive
```

## Enumerations

### UserRole
```
SURVIVOR           - Report creator
COUNSELOR          - Emotional support
MEDICAL_PROFESSIONAL - Medical care
LEGAL_ADVISOR      - Legal support
ADMIN              - System admin
MODERATOR          - Content mod
SYSTEM             - Auto-generated
```

### UserStatus
```
ACTIVE    - Active account
INACTIVE  - Temporarily inactive
SUSPENDED - Account suspended
DELETED   - Soft deleted
```

### IncidentCategory
```
PHYSICAL_VIOLENCE    - Physical harm
SEXUAL_ASSAULT       - Sexual violence
EMOTIONAL_ABUSE      - Emotional harm
PSYCHOLOGICAL_ABUSE  - Mental harm
NEGLECT              - Lack of care
CYBERBULLYING        - Online harassment
HARASSMENT           - Direct harassment
DISCRIMINATION       - Discriminatory abuse
WORKPLACE_ABUSE      - Work-related abuse
DOMESTIC_VIOLENCE    - Home-based abuse
CHILD_ABUSE          - Child harm
ELDER_ABUSE          - Elderly harm
OTHER                - Other incidents
```

### SeverityLevel
```
LOW      - Minor impact
MEDIUM   - Moderate impact
HIGH     - Significant harm
CRITICAL - Immediate danger
```

### ReportStatus
```
PENDING_REVIEW              - Awaiting initial review
UNDER_INVESTIGATION         - Being investigated
ASSIGNED_TO_PROFESSIONAL    - Assigned to case manager
IN_PROGRESS                 - Case in progress
RESOLVED                    - Successfully resolved
CLOSED                      - Case closed
REJECTED                    - Report rejected
ARCHIVED                    - Historical archive
```

### CaseType
```
COUNSELING          - Mental health support
MEDICAL_SUPPORT     - Medical care
LEGAL_ASSISTANCE    - Legal help
EMERGENCY_SUPPORT   - Emergency response
PREVENTION_EDUCATION - Education services
RESOURCE_REFERRAL   - Resource connection
COMBINED_SUPPORT    - Multiple support types
```

### CasePriority
```
LOW      - Low priority
MEDIUM   - Standard priority
HIGH     - High priority
CRITICAL - Urgent/critical
```

### AssignmentStatus
```
ACTIVE     - Currently assigned
ON_HOLD    - Temporarily paused
COMPLETED  - Case completed
CANCELLED  - Assignment cancelled
```

### ServiceProviderType
```
COUNSELOR              - Counseling services
MEDICAL_PROFESSIONAL   - Medical services
LEGAL_ADVISOR          - Legal services
NGO                    - NGO organizations
GOVERNMENT_AGENCY      - Government services
COMMUNITY_CENTER       - Community centers
SHELTER                - Emergency shelter
HOTLINE                - Phone helpline
```

### RequestStatus
```
PENDING    - Awaiting response
ACCEPTED   - Request accepted
IN_PROGRESS - Request in progress
COMPLETED  - Request complete
REJECTED   - Request rejected
CANCELLED  - Request cancelled
```

### ForumCategory
```
PEER_SUPPORT      - Survivor support
STORYTELLING      - Personal stories
QUESTIONS_ANSWERS - Q&A discussions
RESOURCES         - Resource sharing
ANNOUNCEMENTS     - Platform news
AWARENESS         - Awareness content
```

### ForumPostStatus
```
PENDING_MODERATION - Awaiting approval
PUBLISHED          - Published/visible
HIDDEN             - Hidden from view
DELETED            - Soft deleted
```

### MissingPersonStatus
```
ACTIVE - Still missing
FOUND  - Located
CLOSED - Case closed
```

## Performance Indexes

### Critical Indexes for Common Queries

```sql
-- User lookups
CREATE INDEX idx_user_email ON User(email);

-- Report filtering
CREATE INDEX idx_report_status ON Report(status);
CREATE INDEX idx_report_category ON Report(category);
CREATE INDEX idx_report_severity ON Report(severity);
CREATE INDEX idx_report_created_at ON Report(createdAt);

-- Risk detection
CREATE INDEX idx_report_risk_score ON Report(riskScore);
CREATE INDEX idx_report_ip_hash ON Report(ipHash);

-- Case management
CREATE INDEX idx_case_assignment_status ON CaseAssignment(status);
CREATE INDEX idx_case_assignment_assigned_to ON CaseAssignment(assignedToId);

-- Analytics
CREATE INDEX idx_analytics_date ON AnalyticsSnapshot(date);
CREATE INDEX idx_audit_log_created_at ON AuditLog(createdAt);
```

## Data Relationships

### Cascade Rules

- Report deletes → Evidence deleted
- Report deletes → CaseAssignment deleted
- Report deletes → CaseComment deleted
- CaseAssignment deletes → CaseFeedback deleted
- ForumPost deletes → ForumComment deleted
- ServiceProvider deletes → ServiceProviderReview deleted
- ServiceProvider deletes → SupportRequest deleted

### Restrict Rules

- User with CaseComment cannot delete
- User with CaseAssignment cannot delete
- ServiceProvider with active SupportRequest cannot delete

## Query Examples

### Find Active Cases by Priority

```typescript
const cases = await prisma.caseAssignment.findMany({
  where: {
    status: 'ACTIVE',
    priority: { in: ['CRITICAL', 'HIGH'] },
  },
  include: {
    report: true,
    assignedTo: true,
  },
  orderBy: { priority: 'asc' },
});
```

### Get Incident Statistics

```typescript
const stats = await prisma.report.groupBy({
  by: ['category', 'severity'],
  _count: true,
  where: {
    createdAt: {
      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  },
});
```

### Find Duplicate Reports

```typescript
const duplicates = await prisma.report.findMany({
  where: {
    isDuplicate: true,
    status: 'PENDING_REVIEW',
  },
});
```

### Professional Performance

```typescript
const performance = await prisma.caseAssignment.groupBy({
  by: ['assignedToId'],
  _count: {
    id: true,
  },
  _avg: {
    // Would need computed field for completion time
  },
});
```

## Backup & Recovery

- Regular automated backups (daily recommended)
- Point-in-time recovery capability
- Disaster recovery procedures
- Data retention policies (per regulation)

## Future Schema Enhancements

1. Media support (images, videos)
2. Notification preferences table
3. Subscription/pricing models
4. Advanced permissions system
5. Multi-organization support
