# Database Setup Guide

## Overview

This guide covers setting up the PostgreSQL database for the Violence Reporting Platform backend using Prisma ORM and Supabase.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+ (local) OR Supabase account
- Environment variables configured

## Database Architecture

### 15 Main Tables

1. **User** - Platform users (survivors, counselors, professionals, admins)
2. **Report** - Incident reports with ML classification
3. **Evidence** - Attachments/files for reports
4. **CaseAssignment** - Routing to professionals
5. **CaseComment** - Internal case discussions
6. **ServiceProvider** - Organizations providing support
7. **ServiceProviderReview** - Ratings and feedback
8. **SupportRequest** - User requests to service providers
9. **CaseFeedback** - Feedback on case resolution
10. **ForumPost** - Community discussion posts
11. **ForumComment** - Comments on forum posts
12. **MissingPerson** - Missing persons database
13. **AnalyticsSnapshot** - Daily analytics snapshots
14. **AuditLog** - Activity and compliance logs
15. **MLTrainingData** - ML model training samples

## Setup Steps

### 1. Environment Configuration

Create `.env` in the backend directory:

```bash
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# Or for local PostgreSQL
# DATABASE_URL="postgresql://postgres:password@localhost:5432/violence_reporting_db"

# Application
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=24h

# ML Configuration
CLASSIFICATION_CONFIDENCE_THRESHOLD=0.7

# API Documentation
SWAGGER_TITLE="Violence Reporting Platform API"
SWAGGER_DESCRIPTION="Comprehensive API for incident reporting and case management"
SWAGGER_VERSION="1.0.0"
```

### 2. Database Connection Setup

#### Option A: Using Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com) and create a project
2. Get your connection string from Project Settings → Database → Connection Pooling
3. Add to `.env`:
```bash
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-region.pooler.supabase.com:6543/postgres"
```

#### Option B: Local PostgreSQL

```bash
# Create database
createdb violence_reporting_db

# Set connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/violence_reporting_db?schema=public"
```

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

This generates the Prisma Client from the schema.

### 4. Run Migrations

```bash
# Development: creates and applies migrations
npm run prisma:migrate

# Production: applies existing migrations
npm run prisma:deploy

# Push schema directly (development only)
npm run db:push
```

### 5. Seed Database

```bash
# Seed with sample data
npm run prisma:seed

# Or reset and seed
npm run db:reset
```

This creates:
- 1 Admin account
- 2 Counselors
- 2 Medical Professionals
- 2 Legal Advisors
- 2 Moderators
- 6 Service Provider Organizations
- 8 ML Training Data samples
- 4 Sample Reports
- 2 Case Assignments

### 6. Verify Setup

```bash
# View database in Prisma Studio
npm run prisma:studio

# Should open: http://localhost:5555
```

## Database Schema Details

### User Roles

- **SURVIVOR** - Report creator
- **COUNSELOR** - Provides emotional support
- **MEDICAL_PROFESSIONAL** - Medical assessment
- **LEGAL_ADVISOR** - Legal representation
- **ADMIN** - System administration
- **MODERATOR** - Content moderation
- **SYSTEM** - System-generated actions

### Incident Categories

1. PHYSICAL_VIOLENCE
2. SEXUAL_ASSAULT
3. EMOTIONAL_ABUSE
4. PSYCHOLOGICAL_ABUSE
5. NEGLECT
6. CYBERBULLYING
7. HARASSMENT
8. DISCRIMINATION
9. WORKPLACE_ABUSE
10. DOMESTIC_VIOLENCE
11. CHILD_ABUSE
12. ELDER_ABUSE
13. OTHER

### Severity Levels

- LOW - Minor incidents
- MEDIUM - Moderate impact
- HIGH - Significant harm
- CRITICAL - Immediate danger

### Case Types

- COUNSELING - Emotional/psychological support
- MEDICAL_SUPPORT - Physical health
- LEGAL_ASSISTANCE - Legal matters
- EMERGENCY_SUPPORT - Immediate help
- PREVENTION_EDUCATION - Education and prevention
- RESOURCE_REFERRAL - Connect to resources
- COMBINED_SUPPORT - Multiple support types

### Report Status Workflow

```
PENDING_REVIEW
    ↓
UNDER_INVESTIGATION
    ↓
ASSIGNED_TO_PROFESSIONAL
    ↓
IN_PROGRESS
    ↓
RESOLVED/CLOSED/REJECTED
```

## Key Features

### ML Classification

- Automatic incident categorization
- Multi-language support (English, Amharic)
- Confidence scoring (0-100%)
- Risk indicator detection
- Severity assessment

### Fraud Detection

- IP-based duplicate detection
- Device fingerprinting
- Text similarity analysis
- Spam pattern detection
- Risk scoring algorithm

### Service Routing

Automatic routing based on incident type:
- Physical Violence → Medical Support
- Sexual Assault → Legal Assistance
- Emotional Abuse → Counseling
- Child Abuse → Combined Support
- Workplace Issues → Legal Assistance

### Security

- IP hashing (SHA-256)
- Anonymous reporting support
- Audit logging for compliance
- Row-level security ready

## Common Operations

### View Database Structure

```bash
npm run prisma:studio
```

### Create New Migration

```bash
# After schema.prisma changes
npm run prisma:migrate
# Follow prompts to create migration
```

### Reset Database (Development)

```bash
npm run db:reset
# Drops all data, recreates schema, seeds sample data
```

### Export Data

```bash
# Using Prisma extensions or SQL export
npm run prisma:studio
# Export from UI or use SQL directly
```

### Add Service Provider

```typescript
// Via API or directly
await prisma.serviceProvider.create({
  data: {
    name: "Organization Name",
    type: "COUNSELOR", // or other types
    email: "contact@org.com",
    phone: "+251...",
    city: "Addis Ababa",
    country: "Ethiopia",
    description: "...",
    isVerified: true,
    languages: ["en", "am"],
    specializations: ["Trauma Counseling"],
  }
});
```

## Troubleshooting

### Connection Issues

```bash
# Test connection
npm run prisma:studio

# Check .env DATABASE_URL format
# PostgreSQL: postgresql://user:password@host:port/db
# Supabase: postgresql://postgres.[id]:[pw]@aws-region.pooler.supabase.com:6543/postgres
```

### Migration Conflicts

```bash
# Reset and start fresh (development only)
npm run db:reset

# Or manually check migrations
ls prisma/migrations/
```

### Seed Data Already Exists

```bash
# Reset clears and reseeds
npm run db:reset

# Or delete records manually
npm run prisma:studio
```

## Deployment Considerations

### Production Database Setup

1. Create dedicated PostgreSQL instance
2. Use strong credentials and SSL connections
3. Enable automated backups
4. Set up read replicas for analytics
5. Configure firewall rules

### Environment Variables

```bash
# Production should use:
DATABASE_URL=postgresql://user:pwd@prod-host/db?sslmode=require
NODE_ENV=production
JWT_SECRET=very-long-random-secure-key
```

### Running Migrations in Production

```bash
# Use deploy, not dev migrations
npm run prisma:deploy

# Verify migrations applied
npm run prisma:studio --skip-engine
```

## Performance Optimization

### Indexes

All critical tables have indexes on:
- status fields
- category fields
- date fields
- foreign keys
- frequently queried fields

### Queries

Use pagination for large result sets:
```typescript
const reports = await prisma.report.findMany({
  skip: (page - 1) * limit,
  take: limit,
});
```

### Caching

Consider caching:
- Service provider lists
- Classification keywords
- Analytics snapshots
- User roles/permissions

## Next Steps

1. Configure environment variables
2. Run `npm run db:setup`
3. Start backend: `npm run start:dev`
4. Access API at http://localhost:3001
5. View Swagger docs at http://localhost:3001/api/docs

## Support

For database-specific issues:
- Check Supabase documentation: https://supabase.com/docs
- Prisma documentation: https://www.prisma.io/docs
- PostgreSQL documentation: https://www.postgresql.org/docs
