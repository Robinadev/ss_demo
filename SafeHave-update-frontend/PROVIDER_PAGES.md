# Provider (General Counselor) Pages - Complete Structure

## Overview

The provider pages have been completely redesigned with the award-winning design system applied throughout. All pages use the floating-card, glass-card, neu-card, and gradient button styles.

## Pages Implemented

### 1. Provider Dashboard (`/provider/dashboard`)

**File:** `src/pages/provider/dashboard.tsx`
**Features:**

- Active clients overview with stats cards
- Upcoming appointments calendar view
- New case referrals counter
- Pending tasks tracker
- Monthly statistics (sessions conducted, clients served)
- Recent activity feed
- Quick action buttons

**Design Elements:**

- `floating-card` for stat cards with `hover-lift-3d`
- `glass-card` for appointments section
- `gradient-text` for headings
- `btn-gradient-primary` and `btn-gradient-secondary` for actions

---

### 2. My Clients (`/provider/clients`)

**File:** `src/pages/provider/clients.tsx`
**Features:**

- List of assigned clients
- Client profiles with case summaries
- Filter by case status or urgency
- Search functionality
- Client progress tracking with visual progress bars
- Last session information

**Design Elements:**

- `floating-card` for each client card
- Progress bars with gradient fills
- Priority badges (High/Medium/Low)
- Search bar with icon

---

### 3. Case Management (`/provider/cases/:id`)

**File:** `src/pages/provider/cases.tsx`
**Features:**

- Detailed case view for assigned clients
- Case timeline with updates
- Add case notes (private and shared)
- Update case status
- Request additional services for client
- Treatment plan documentation
- Quick actions sidebar

**Design Elements:**

- Timeline with icon indicators
- `floating-card` for notes sections
- `glass-card` for case details
- Alert cards for important notifications

---

### 4. Appointments (`/provider/appointments`)

**File:** `src/pages/provider/appointments.tsx`
**Features:**

- Calendar view of all appointments
- Schedule new appointments
- Virtual session links (telehealth)
- Appointment status (Confirmed/Pending)
- Reschedule and cancellation
- Weekly statistics

**Design Elements:**

- `glass-card` for schedule view
- Status badges with color coding
- Video/Calendar icons for session types
- Quick actions sidebar with `neu-card`

---

### 5. Messages (`/provider/messages`)

**File:** `src/pages/provider/messages.tsx`
**Features:**

- Secure messaging with assigned clients
- Internal messaging with other providers
- Encrypted communication indicator
- Attachment sharing capability
- Conversation list with unread counts
- Real-time message interface

**Design Elements:**

- Split-view layout (conversations + chat)
- `glass-card` for conversation list
- `floating-card` for chat area
- Lock icon for encryption indicator
- Message bubbles with rounded corners

---

### 6. Session Notes (`/provider/sessions`)

**File:** `src/pages/provider/sessions.tsx`
**Features:**

- Create session notes
- Template-based note entry
- SOAP note format support
- Private notes vs shared notes
- Export session history
- Voice-to-text entry option
- Filter by note type

**Design Elements:**

- Tab navigation for note types
- `floating-card` for note entries
- `glass-card` for quick entry form
- Status badges (Completed/Draft)
- Download icons for export

---

### 7. Resource Library (`/provider/resources`)

**File:** `src/pages/provider/resources.tsx`
**Features:**

- Professional resources and guidelines
- Treatment protocols
- Client handouts and worksheets
- Trauma-informed care materials
- Share resources with clients
- Category filtering

**Design Elements:**

- Grid layout for categories
- `glass-card` for category cards with `hover-lift-3d`
- `floating-card` for resource items
- Download and share icons
- Search functionality

---

### 8. Training & Certification (`/provider/training`)

**File:** `src/pages/provider/training.tsx`
**Features:**

- Required trainings list
- Certification renewals
- Professional development courses
- Progress tracking
- Training hours counter
- Completion status

**Design Elements:**

- Stats cards for overview
- Progress bars with gradient fills
- `floating-card` for training items
- Status badges (Completed/In Progress/Not Started)
- `glass-card` for renewals section

---

### 9. Profile & Credentials (`/provider/profile`)

**File:** `src/pages/provider/profile.tsx`
**Features:**

- Professional profile management
- License verification
- Specializations and certifications
- Languages spoken
- Contact information
- Bio and photo upload

**Design Elements:**

- Two-column layout
- `floating-card` for main form
- `glass-card` for profile photo section
- `neu-card` for contact info
- Tag-style badges for specializations and languages

---

## Routes Configuration

All routes are prefixed with `/provider/`:

```typescript
/provider/dashboard          → Provider Dashboard
/provider/clients            → My Clients
/provider/appointments       → Appointments
/provider/messages           → Messages
/provider/sessions           → Session Notes
/provider/resources          → Resource Library
/provider/training           → Training & Certification
/provider/profile            → Profile & Credentials
/provider/cases/:id          → Case Management (dynamic)
```

## Design System Usage

### Cards

- **floating-card**: Main content cards with elevation and hover effects
- **glass-card**: Glassmorphic cards with backdrop blur
- **neu-card**: Neomorphic cards with soft shadows

### Buttons

- **btn-gradient-primary**: Primary action buttons (indigo to blue gradient)
- **btn-gradient-secondary**: Secondary action buttons (purple gradient)
- Standard outlined buttons for tertiary actions

### Text

- **gradient-text**: Gradient text effect for main headings
- **iridescent-text**: Available for special emphasis (not heavily used)

### Animations

- **hover-lift-3d**: 3D lift effect on hover
- **motion** from framer-motion for page transitions
- Staggered animations for list items

### Colors

- Primary: Indigo (500-600)
- Secondary: Purple (500-600)
- Success: Green/Emerald (500-600)
- Warning: Orange (500-600)
- Danger: Red (500-600)

## Accessibility Features

- High contrast text
- Keyboard navigation support
- ARIA labels (to be added)
- Focus indicators
- Responsive design for all screen sizes

## Next Steps

1. Connect to backend API endpoints
2. Add real-time data updates
3. Implement authentication checks
4. Add loading states
5. Implement error handling
6. Add form validation
7. Connect to Supabase for data persistence

## Old Pages Removed

The following old counselor pages have been replaced:

- `/counselor-dashboard` → `/provider/dashboard`
- `/counselor/cases` → `/provider/clients` + `/provider/cases/:id`
- `/counselor/audit` → Removed (functionality integrated)
- `/general-case-manager` → Removed
- `/counselor-lists` → Removed
- `/reports` → Removed
- `/schedule` → `/provider/appointments`

Medical and Legal counselor dashboards remain unchanged for specialized roles.
