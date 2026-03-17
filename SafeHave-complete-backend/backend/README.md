# Violence Reporting Platform - Backend API

A comprehensive NestJS-based backend for the Digital Reporting Platform for tracking violence, abuse, and bullying cases. Features ML-powered incident classification, automated case routing to appropriate professionals, and robust analytics for stakeholders.

## Features

### 1. **ML-Powered Classification**
- Automatic incident classification into 13 categories (physical violence, sexual assault, cyberbullying, etc.)
- Severity level assessment (CRITICAL, HIGH, MEDIUM, LOW)
- Risk scoring for duplicate/falsified reports
- Keyword-based analysis in multiple languages (Amharic, English)

### 2. **Intelligent Case Routing**
- Automatic routing to appropriate professionals:
  - **Counselors** for emotional/psychological support
  - **Medical Professionals** for physical injuries
  - **Legal Advisors** for legal matters
  - **NGOs/Government Agencies** for emergency support
  - **Combined Support** for complex cases

### 3. **Service Provider Directory**
- Comprehensive verified professional directory
- Advanced search and filtering
- Location-based specialist recommendations
- Rating and review system
- Multi-language support

### 4. **Case Management**
- Real-time case tracking
- Status updates and progress monitoring
- Feedback and performance metrics
- Case comments and collaboration tools
- Audit trails for compliance

### 5. **Analytics & Reporting**
- Dashboard with key metrics
- Incident trend analysis
- Professional performance tracking
- Anonymized reports for policymakers
- High-risk intervention data

### 6. **Security & Privacy**
- Anonymous reporting support
- IP-based fraud detection
- Encrypted data storage
- JWT authentication
- Role-based access control

## Tech Stack

- **Framework**: NestJS 10
- **ORM**: Prisma with PostgreSQL
- **Authentication**: JWT + bcryptjs
- **API Documentation**: Swagger/OpenAPI
- **Database**: PostgreSQL (Supabase compatible)
- **Language**: TypeScript

## Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 13+ or Supabase account
- npm or yarn

### 1. Install Dependencies

```bash
cd backend
npm install
# or
yarn install
```

### 2. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Update with your actual values
DATABASE_URL="postgresql://user:password@localhost:5432/violence_reporting"
JWT_SECRET="your-super-secret-key"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
FRONTEND_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Optional: Seed the database
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

**API Documentation**: `http://localhost:3001/api/docs`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/profile` - Get user profile
- `PUT /api/v1/auth/profile` - Update profile
- `POST /api/v1/auth/change-password` - Change password

### Reports
- `POST /api/v1/reports` - Submit incident report
- `GET /api/v1/reports` - Get all reports
- `GET /api/v1/reports/:id` - Get report details
- `PUT /api/v1/reports/:id` - Update report
- `GET /api/v1/reports/high-risk` - Get high-risk reports
- `GET /api/v1/reports/analytics` - Get report analytics
- `POST /api/v1/reports/:id/evidence` - Add evidence file

### Classification
- `POST /api/v1/classification/analyze` - Analyze and classify report
- `GET /api/v1/classification/stats` - Get classification statistics

### Cases
- `POST /api/v1/cases/auto-route/:reportId` - Auto-route case
- `POST /api/v1/cases/assign/:reportId` - Manual case assignment
- `GET /api/v1/cases/professional/:professionalId` - Get cases for professional
- `PUT /api/v1/cases/:caseId/status` - Update case status
- `GET /api/v1/cases/stats` - Get case statistics

### Professionals
- `GET /api/v1/professionals` - Get service providers
- `POST /api/v1/professionals` - Register service provider
- `GET /api/v1/professionals/search` - Search professionals
- `GET /api/v1/professionals/directory` - Get complete directory
- `GET /api/v1/professionals/specialists` - Find specialists
- `GET /api/v1/professionals/recommended` - Get recommended professionals
- `GET /api/v1/professionals/:id` - Get professional details
- `PUT /api/v1/professionals/:id` - Update professional
- `POST /api/v1/professionals/:id/verify` - Verify professional
- `POST /api/v1/professionals/:id/review` - Add review

### Analytics
- `GET /api/v1/analytics/dashboard` - Dashboard analytics
- `GET /api/v1/analytics/incidents` - Incident analytics
- `GET /api/v1/analytics/cases` - Case analytics
- `GET /api/v1/analytics/professionals` - Professional analytics
- `GET /api/v1/analytics/high-risk` - High-risk data
- `GET /api/v1/analytics/report/anonymized` - Anonymized report

## ML Classification Model

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

### Risk Scoring Algorithm
- **IP Reputation**: Multiple reports from same IP (30 pts)
- **Text Similarity**: Similar reports in database (40 pts)
- **Device Fingerprint**: Same device multiple reports (25 pts)
- **Text Characteristics**: Very short or spam indicators (10-20 pts)
- **Confidence Score**: Automated classification confidence check

**Flagging Threshold**: Risk Score ≥ 50
**Duplicate Detection**: Risk Score ≥ 70 + Text Similarity > 0.6

## Database Schema

Key tables:
- **User**: User accounts with roles
- **Report**: Incident reports with ML classification
- **CaseAssignment**: Case routing to professionals
- **ServiceProvider**: Directory of professionals
- **Evidence**: File attachments for reports
- **CaseComment**: Case notes and collaboration
- **AnalyticsSnapshot**: Anonymized data for reports
- **AuditLog**: Compliance and audit trail

## Authentication & Authorization

### Roles
- **SURVIVOR**: Reports incidents
- **COUNSELOR**: Provides counseling support
- **MEDICAL_PROFESSIONAL**: Handles medical cases
- **LEGAL_ADVISOR**: Provides legal assistance
- **ADMIN**: Full system access
- **MODERATOR**: Content moderation

### Protected Endpoints
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Development

### Run Tests
```bash
npm run test
npm run test:cov
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

### Build for Production
```bash
npm run build
npm run start:prod
```

## Database with Supabase

To use Supabase as your PostgreSQL provider:

1. Create a Supabase project: https://supabase.com
2. Get your connection string from project settings
3. Update `.env`:
   ```
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
   SUPABASE_URL="https://[PROJECT].supabase.co"
   SUPABASE_ANON_KEY="[ANON_KEY]"
   ```
4. Run migrations: `npm run prisma:migrate`

## Performance Optimization

- Connection pooling with Prisma
- Indexed database fields for fast queries
- Pagination for large datasets
- Caching strategies for analytics
- Async processing for heavy computations

## Security Best Practices

- ✅ Password hashing with bcryptjs
- ✅ JWT token expiration (24 hours default)
- ✅ CORS configuration
- ✅ Input validation with class-validator
- ✅ SQL injection prevention via Prisma ORM
- ✅ IP anonymization for privacy
- ✅ Audit logging for compliance

## Deployment

### Using Vercel
```bash
npm install -g vercel
vercel
```

### Using Docker
```bash
docker build -t violence-reporting-backend .
docker run -p 3001:3001 -e DATABASE_URL="..." violence-reporting-backend
```

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check firewall rules for database access
- Ensure PostgreSQL is running

### Classification Not Working
- Check if report text is at least 20 characters
- Verify keyword database is loaded
- Review logs for errors

### Case Assignment Failed
- Ensure service providers are verified
- Check availability status
- Verify location data is complete

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT

## Support

For issues, questions, or feature requests, please contact the development team or create an issue in the repository.

## Roadmap

- [ ] Advanced ML model integration
- [ ] Real-time notifications
- [ ] Mobile app backend
- [ ] Multi-language support expansion
- [ ] Blockchain for immutable audit trail
- [ ] AI-powered recommendations
- [ ] Integration with government systems
