# Backend Integration Guide

## Overview

This guide explains how to integrate the NestJS backend with your existing Next.js frontend for the Violence Reporting Platform.

## Architecture

```
Frontend (Next.js 16)          Backend (NestJS)           Database (PostgreSQL/Supabase)
├── Report Submission    →    Reports API           →    Report Table
├── Classification UI    →    Classification API    →    ML Analysis
├── Case Dashboard      →    Cases API             →    Case Assignments
├── Professional Dir    →    Professionals API     →    Service Providers
└── Analytics           →    Analytics API         →    Aggregated Data
```

## Backend Setup

### 1. Database Connection

**Using Supabase (Recommended)**:

```env
# backend/.env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[PROJECT-ID].supabase.co:5432/postgres"
```

Get this from Supabase Project Settings → Database → Connection string (Postgres)

### 2. Initialize Backend

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run start:dev
```

Server runs on `http://localhost:3001`

## Frontend Integration

### 1. Update API Client

Create `/lib/api-client.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 2. Environment Variables

Update `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000
```

### 3. Report Submission Integration

Create `/lib/services/reports.ts`:

```typescript
import apiClient from '../api-client';

export const reportsService = {
  submitReport: async (data: {
    title: string;
    description: string;
    isAnonymous?: boolean;
    language?: string;
    location?: string;
  }) => {
    const response = await apiClient.post('/reports', data);
    return response.data;
  },

  getReports: async (page = 1, limit = 20, filters?: any) => {
    const response = await apiClient.get('/reports', {
      params: { page, limit, ...filters },
    });
    return response.data;
  },

  getReport: async (id: string) => {
    const response = await apiClient.get(`/reports/${id}`);
    return response.data;
  },

  classifyReport: async (text: string, ipAddress?: string) => {
    const response = await apiClient.post('/classification/analyze', {
      text,
      ipAddress,
    });
    return response.data;
  },
};
```

### 4. Case Management Integration

Create `/lib/services/cases.ts`:

```typescript
import apiClient from '../api-client';

export const casesService = {
  autoRouteCase: async (reportId: string) => {
    const response = await apiClient.post(`/cases/auto-route/${reportId}`);
    return response.data;
  },

  getCasesForProfessional: async (
    professionalId: string,
    page = 1,
    limit = 20
  ) => {
    const response = await apiClient.get(
      `/cases/professional/${professionalId}`,
      { params: { page, limit } }
    );
    return response.data;
  },

  updateCaseStatus: async (
    caseId: string,
    status: string,
    feedback?: string
  ) => {
    const response = await apiClient.put(`/cases/${caseId}/status`, {
      status,
      feedback,
    });
    return response.data;
  },
};
```

### 5. Professional Directory Integration

Create `/lib/services/professionals.ts`:

```typescript
import apiClient from '../api-client';

export const professionalsService = {
  getServiceDirectory: async (type?: string) => {
    const response = await apiClient.get('/professionals/directory', {
      params: { type },
    });
    return response.data;
  },

  searchProfessionals: async (
    query: string,
    filters?: { type?: string; city?: string; language?: string }
  ) => {
    const response = await apiClient.get('/professionals/search', {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  getRecommended: async (caseType: string, severity: string, location?: string) => {
    const response = await apiClient.get('/professionals/recommended', {
      params: { caseType, severity, location },
    });
    return response.data;
  },
};
```

### 6. Authentication Integration

Create `/lib/services/auth.ts`:

```typescript
import apiClient from '../api-client';

export const authService = {
  register: async (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  }) => {
    const response = await apiClient.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
};
```

### 7. Analytics Integration

Create `/lib/services/analytics.ts`:

```typescript
import apiClient from '../api-client';

export const analyticsService = {
  getDashboard: async (days = 30) => {
    const response = await apiClient.get('/analytics/dashboard', {
      params: { days },
    });
    return response.data;
  },

  getIncidents: async (days = 30) => {
    const response = await apiClient.get('/analytics/incidents', {
      params: { days },
    });
    return response.data;
  },

  getCases: async (days = 30) => {
    const response = await apiClient.get('/analytics/cases', {
      params: { days },
    });
    return response.data;
  },
};
```

## Frontend Components

### Report Form Component

```typescript
// components/ReportForm.tsx
import { useState } from 'react';
import { reportsService } from '@/lib/services/reports';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function ReportForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isAnonymous: true,
    language: 'en',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await reportsService.submitReport(formData);
      console.log('Report submitted:', result);
      // Show success message and redirect
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Report Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        required
      />

      <Textarea
        placeholder="Describe the incident..."
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        minLength={20}
        required
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.isAnonymous}
          onChange={(e) =>
            setFormData({ ...formData, isAnonymous: e.target.checked })
          }
        />
        Submit Anonymously
      </label>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Report'}
      </Button>
    </form>
  );
}
```

### Professional Directory Component

```typescript
// components/ProfessionalDirectory.tsx
import { useEffect, useState } from 'react';
import { professionalsService } from '@/lib/services/professionals';
import { Card } from '@/components/ui/card';

export default function ProfessionalDirectory() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDirectory = async () => {
      try {
        const data = await professionalsService.getServiceDirectory();
        setProfessionals(Object.values(data).flat());
      } catch (error) {
        console.error('Failed to load professionals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDirectory();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {professionals.map((prof: any) => (
        <Card key={prof.id} className="p-4">
          <h3 className="font-bold">{prof.name}</h3>
          <p className="text-sm text-gray-600">{prof.type}</p>
          <p className="text-sm">{prof.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-yellow-500">★ {prof.rating || 0}</span>
            <span className="text-sm text-gray-500">
              {prof.isVerified ? '✓ Verified' : 'Unverified'}
            </span>
          </div>
          {prof.phone && <p className="text-sm mt-2">{prof.phone}</p>}
        </Card>
      ))}
    </div>
  );
}
```

### Dashboard Analytics Component

```typescript
// components/Dashboard.tsx
import { useEffect, useState } from 'react';
import { analyticsService } from '@/lib/services/analytics';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await analyticsService.getDashboard(30);
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!analytics) return <div>No data available</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <p className="text-gray-600">Total Reports</p>
        <p className="text-2xl font-bold">{analytics.summary.totalReports}</p>
      </Card>

      <Card className="p-4">
        <p className="text-gray-600">Critical Cases</p>
        <p className="text-2xl font-bold text-red-600">
          {analytics.summary.criticalCases}
        </p>
      </Card>

      <Card className="p-4">
        <p className="text-gray-600">Resolution Rate</p>
        <p className="text-2xl font-bold">{analytics.summary.resolutionRate}%</p>
      </Card>

      <Card className="p-4">
        <p className="text-gray-600">Active Professionals</p>
        <p className="text-2xl font-bold">
          {analytics.summary.activeProfessionals}
        </p>
      </Card>
    </div>
  );
}
```

## API Response Examples

### Submit Report Response

```json
{
  "id": "report_123",
  "title": "Incident Report",
  "description": "...",
  "category": "PHYSICAL_VIOLENCE",
  "severity": "HIGH",
  "status": "PENDING_REVIEW",
  "classification": {
    "category": "PHYSICAL_VIOLENCE",
    "severity": "HIGH",
    "suggestedCaseType": "MEDICAL_SUPPORT",
    "confidence": 0.85,
    "keywordMatches": ["hit", "injury", "assault"]
  },
  "riskScore": {
    "riskScore": 25,
    "isRepetitive": false,
    "isDuplicate": false,
    "flagged": false,
    "reasons": []
  }
}
```

### Auto-Route Case Response

```json
{
  "id": "case_123",
  "reportId": "report_123",
  "caseType": "MEDICAL_SUPPORT",
  "priority": "HIGH",
  "assignedTo": {
    "id": "prof_123",
    "name": "Dr. Smith",
    "type": "MEDICAL_PROFESSIONAL",
    "rating": 4.8
  },
  "status": "ACTIVE",
  "dueDate": "2026-02-10"
}
```

## Error Handling

```typescript
// Add to your API client
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An error occurred';

    if (error.response?.status === 400) {
      // Bad request
      console.error('Validation error:', message);
    } else if (error.response?.status === 401) {
      // Unauthorized
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access denied:', message);
    } else if (error.response?.status === 404) {
      // Not found
      console.error('Resource not found:', message);
    } else if (error.response?.status === 500) {
      // Server error
      console.error('Server error:', message);
    }

    return Promise.reject(error);
  }
);
```

## Testing Integration

### Test Report Submission

```bash
curl -X POST http://localhost:3001/api/v1/reports \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Report",
    "description": "This is a test incident report with sufficient details about the violence incident.",
    "isAnonymous": true,
    "language": "en"
  }'
```

### Test Authentication

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## Deployment

### Deploy Backend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd backend
vercel

# Set environment variables in Vercel dashboard
```

### Update Frontend Environment

Update production environment variables in Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://your-api.vercel.app/api/v1
```

## Troubleshooting

### CORS Issues

If you get CORS errors, update backend `main.ts`:

```typescript
app.enableCors({
  origin: 'https://your-frontend-domain.com',
  credentials: true,
});
```

### Database Connection

Verify connection string format:

```
postgresql://username:password@host:port/database
```

### Token Issues

Ensure tokens are sent correctly:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Next Steps

1. ✅ Backend setup complete
2. ✅ Database migrations applied
3. ✅ Frontend API integration
4. Test end-to-end workflows
5. Deploy to production
6. Monitor and optimize

For more details, see `backend/README.md` and API documentation at `http://localhost:3001/api/docs`.
