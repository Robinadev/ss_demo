# SafeHaven - Violence, Abuse & Bullying Digital Reporting Platform

A complete, production-ready full-stack application for reporting and managing cases of violence, abuse, and bullying. Built with React, NestJS, Prisma, PostgreSQL, and hosted on Supabase.

## Project Structure

```
/
├── complete/SafeHave-complete-backend/
│   ├── backend/                 # NestJS API backend
│   │   ├── src/
│   │   │   ├── modules/        # Feature modules (auth, reports, cases, classification, etc.)
│   │   │   ├── common/         # Shared utilities (prisma, types, filters, interceptors)
│   │   │   └── main.ts         # Application entry point
│   │   ├── prisma/             # Database schema and migrations
│   │   └── package.json
│   └── frontend/               # React frontend application
│       ├── src/
│       │   ├── pages/          # Page components (Home, Login, Register, Dashboard)
│       │   ├── components/     # Reusable components (Layout, ProtectedRoute)
│       │   ├── contexts/       # React contexts (AuthContext)
│       │   ├── services/       # API client and services
│       │   └── App.tsx         # Main App component
│       └── package.json
└── package.json                # Root monorepo configuration
```

## Features

### Authentication & Authorization
- JWT-based authentication with refresh tokens
- Password hashing with bcryptjs
- Role-based access control (RBAC) for 6 user roles:
  - SURVIVOR: Report abuse incidents
  - COUNSELOR: Provide counseling support
  - DOCTOR: Medical professional assessment
  - LAWYER: Legal advice and representation
  - MODERATOR: Content moderation
  - ADMIN: Platform administration

### Core Features
- **Report Management**: Create, submit, and track abuse reports
- **ML Classification**: AI-powered automatic case classification
- **Evidence Management**: Secure file upload and evidence storage
- **Case Management**: Assign cases to professionals, track progress
- **Professional Directory**: Browse and connect with support professionals
- **Analytics Dashboard**: Real-time statistics and insights
- **Forum & Support**: Community support and forum discussions

### Backend Architecture
- **NestJS**: Modern TypeScript framework
- **Prisma ORM**: Type-safe database access
- **PostgreSQL/Supabase**: Secure database
- **JWT Authentication**: Secure token-based auth
- **REST API**: Comprehensive API endpoints
- **Global Error Handling**: Centralized error management
- **Rate Limiting**: Built-in rate limiting (100 req/min)
- **CORS Protection**: Cross-origin security
- **Input Validation**: Automatic request validation

### Frontend Architecture
- **React 18**: Modern UI library
- **Vite**: Fast build tool
- **React Router**: Client-side routing
- **React Context**: State management
- **React Query**: Server state management
- **TypeScript**: Type-safe code
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account (for database)

### Installation

```bash
# Install dependencies for all workspaces
npm run install:all

# Setup database (migrations and seeding)
npm run db:setup
```

### Running Development Servers

```bash
# Terminal 1 - Start backend (http://localhost:3001)
npm run dev:backend

# Terminal 2 - Start frontend (http://localhost:3000)
npm run dev:frontend
```

## Environment Variables

### Backend (`.env` in `backend/` directory)
```
NODE_ENV=development
DATABASE_URL=your_supabase_database_url
PORT=3001
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env.local` in `frontend/` directory)
```
REACT_APP_API_URL=http://localhost:3001/api
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user info

### Reports
- `POST /api/reports` - Create new report
- `GET /api/reports` - List all reports (paginated)
- `GET /api/reports/:id` - Get report details
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report
- `POST /api/reports/:id/submit` - Submit report
- `POST /api/reports/:id/evidence` - Upload evidence file
- `GET /api/reports/:id/evidence` - List evidence
- `DELETE /api/reports/:id/evidence/:evidenceId` - Delete evidence

### Classification
- `POST /api/classification/classify` - Classify report content
- `GET /api/classification/stats` - Get classification statistics

### Cases
- `GET /api/cases` - List all cases
- `GET /api/cases/:id` - Get case details
- `PUT /api/cases/:id` - Update case
- `PATCH /api/cases/:id/assign` - Assign case to professional

### Analytics
- `GET /api/analytics/dashboard` - Dashboard statistics
- `GET /api/analytics/reports` - Report statistics
- `GET /api/analytics/cases` - Case statistics

### Professionals
- `GET /api/professionals` - List professionals
- `GET /api/professionals/:id` - Get professional details
- `PUT /api/professionals/:id` - Update professional info

## Database Schema

The application includes the following main models:

- **User**: User accounts with roles and authentication
- **Report**: Abuse incident reports
- **Case**: Case management for reports
- **Classification**: ML classification results
- **Evidence**: File attachments for reports
- **Professional**: Service provider profiles
- **ReviewRating**: Professional reviews and ratings
- **ForumPost**: Community forum posts
- **SupportTicket**: Support request tracking

## Running Commands

```bash
# Build production bundle
npm run build

# Start production server
npm start

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format

# Database management
npm run db:setup      # Initialize database
npm run db:reset      # Reset database
npm run db:seed       # Seed test data

# Cleanup
npm run clean         # Remove all node_modules and dist directories
```

## Deployment

### To Vercel
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy

### To Other Platforms
1. Build: `npm run build`
2. Deploy `complete/SafeHave-complete-backend/backend/dist` and `complete/SafeHave-complete-backend/frontend/dist`
3. Set environment variables
4. Run migrations: `npm run db:setup`

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS protection
- Rate limiting (100 requests/minute)
- Input validation and sanitization
- SQL injection prevention (Prisma)
- Secure password reset flow
- Session management with refresh tokens
- Role-based access control (RBAC)

## Testing

The project includes:
- Unit tests for services
- Integration tests for API endpoints
- E2E tests for critical flows

Run tests with:
```bash
npm run test
npm run test:cov    # With coverage
npm run test:e2e    # End-to-end tests
```

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the repository
4. Create a Pull Request

## License

MIT

## Support

For issues or questions, please:
1. Check existing documentation
2. Create an issue in the GitHub repository
3. Contact the development team

## Roadmap

- Mobile app development (React Native)
- Advanced analytics and reporting
- Video call support for counseling
- Multi-language support
- Enhanced AI/ML classification models
- Integration with external services (law enforcement, NGOs)
