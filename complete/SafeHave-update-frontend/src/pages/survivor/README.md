# Job Portal & Missing Person Pages

## Overview

Two new trauma-informed pages have been added to the Anonymous Reporting Platform's survivor dashboard:

1. **Job Portal & Economic Empowerment** (`/survivor/job-portal`)
2. **Missing Person Search & Report** (`/survivor/missing-person`)

## Features

### Job Portal Page (`job-portal.tsx`)

**Purpose**: Economic empowerment and long-term recovery support for survivors

**Key Features**:

- **Anonymous Mode Toggle**: Survivors can apply anonymously or publicly
- **Verified Opportunities**: All job listings are trauma-informed and survivor-friendly
- **Ethiopian Context**: Tailored for Ethiopian job market and cultural context
- **Application Tracking**: Track application progress with visual indicators
- **Support Resources**: Resume builder, mentorship, skills assessment, financial literacy

**Trauma-Informed Design**:

- Safe exit button always visible
- Gentle, empowering language
- Privacy controls and anonymous options
- Support provided indicators for each opportunity
- Emergency hotline access

**Job Categories**:

- Social Work
- Education
- Vocational Training
- Volunteer Opportunities
- Entrepreneurship Programs

### Missing Person Page (`missing-person.tsx`)

**Purpose**: Community-powered search for missing persons, often related to violence/abuse

**Key Features**:

- **Verified Cases Only**: All reports reviewed by administrators
- **Anonymous Reporting**: Option to report without revealing identity
- **Urgency Levels**: Critical, High, Medium, Low priority system
- **Sighting Reports**: Community can report sightings securely
- **Safety Resources**: Emergency contacts and support services

**Trauma-Informed Design**:

- Privacy-first approach with sensitive data protection
- Admin verification prevents misuse
- Safety guidelines and emergency contacts
- Gentle language for sensitive situations
- Clear consent mechanisms

**Search Features**:

- Filter by gender, location, urgency, timeframe
- Search by description, location, or case ID
- Visual case cards with essential information
- Sighting tracking and progress indicators

## Technical Implementation

### Design System Integration

- Uses existing CSS variables and design tokens
- Consistent with platform's trauma-informed color palette
- Responsive design with mobile-first approach
- Accessibility compliant (WCAG 2.1 Level AA)

### State Management

- React hooks for local state management
- Form validation and error handling
- Loading states and user feedback
- Data persistence considerations

### Safety Features

- **Quick Exit Button**: Always visible, redirects to Google
- **Emergency Contacts**: Ethiopian-specific hotlines (911, 7711 GBV)
- **Data Protection**: Sensitive information handling
- **Anonymous Options**: Privacy-preserving functionality

## Navigation Integration

Both pages are accessible from the survivor dashboard through:

- Quick action cards in the main dashboard
- Direct navigation links
- Breadcrumb navigation (when implemented)

## Ethiopian Context

### Job Portal

- Ethiopian Birr (ETB) salary ranges
- Local organizations and NGOs
- Regional locations (Addis Ababa, Hawassa, Dire Dawa)
- Cultural sensitivity in job descriptions
- UN Women and UNFPA partnership references

### Missing Person

- Ethiopian regions and cities
- Local emergency numbers
- Cultural considerations for family relationships
- Language support (Amharic/English)

## Future Enhancements

### Job Portal

- Integration with external job boards
- Skills matching algorithms
- Employer verification system
- Training program partnerships
- Micro-loan integration

### Missing Person

- Photo recognition technology
- SMS alert system
- Integration with law enforcement
- Multi-language support
- Geolocation features

## Security Considerations

- All forms include CSRF protection
- Data encryption for sensitive information
- Admin verification workflows
- Audit trails for case management
- Privacy controls and data retention policies

## Accessibility Features

- Screen reader compatibility
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences
- Clear focus indicators
- Semantic HTML structure

## Testing Recommendations

- User acceptance testing with survivors
- Accessibility testing with assistive technologies
- Security penetration testing
- Performance testing under load
- Cross-browser compatibility testing

## Deployment Notes

- Ensure environment variables are configured
- Database migrations for new data models
- Admin panel updates for case management
- Monitoring and alerting setup
- Backup and recovery procedures
