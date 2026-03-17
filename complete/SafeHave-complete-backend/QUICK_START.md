# Quick Start Guide - Backend & Integration

## 🚀 Start Backend in 5 Minutes

### Step 1: Install & Setup (2 min)
```bash
cd backend
npm install
cp .env.example .env
```

### Step 2: Update Environment (1 min)
Edit `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@host/database"
JWT_SECRET="your-secret-key-here"
FRONTEND_URL="http://localhost:3000"
```

### Step 3: Run Database Migrations (1 min)
```bash
npm run prisma:generate
npm run prisma:migrate
```

### Step 4: Start Server (1 min)
```bash
npm run start:dev
```

✅ **Backend running on**: http://localhost:3001

---

## 📚 API Documentation

**Swagger UI**: http://localhost:3001/api/docs

Includes interactive API testing and full endpoint documentation.

---

## 🔌 Frontend Integration (Quick)

### 1. Install HTTP Client
```bash
npm install axios
```

### 2. Create API Client (`lib/api-client.ts`)
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1'
});

// Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

### 3. Use in Components
```typescript
import api from '@/lib/api-client';

// Submit Report
const reportResponse = await api.post('/reports', {
  title: 'Report Title',
  description: 'Report details...',
  isAnonymous: true
});

// Get Classification
const classifyResponse = await api.post('/classification/analyze', {
  text: 'Report text...'
});

// Get Professionals
const professionalsResponse = await api.get('/professionals/directory');
```

---

## 🧪 Test the API

### Test 1: Create Account
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

Response: `{ "user": {...}, "token": "eyJ..." }`

### Test 2: Submit Report
```bash
curl -X POST http://localhost:3001/api/v1/reports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Report",
    "description": "This is a test incident report with sufficient details about the violence incident",
    "isAnonymous": true
  }'
```

### Test 3: Analyze Report
```bash
curl -X POST http://localhost:3001/api/v1/classification/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "text": "He hit me and caused injury during domestic violence incident"
  }'
```

Response includes:
- Classification category
- Severity level
- Suggested case type
- Risk score
- Confidence score

### Test 4: Get Professionals
```bash
curl http://localhost:3001/api/v1/professionals/directory
```

---

## 📊 Core Workflows

### Workflow 1: Report Submission & Auto-Routing

```
1. User submits report (POST /reports)
   ↓
2. System classifies incident (ML algorithm)
   ↓
3. Risk score calculated (fraud detection)
   ↓
4. Case auto-routed (POST /cases/auto-route/:id)
   ↓
5. Professional assigned + due date set
   ↓
6. Status updates sent to user dashboard
```

### Workflow 2: Case Management

```
1. Case manager views cases (GET /cases/professional/:id)
   ↓
2. Reviews incident classification
   ↓
3. Updates case status (PUT /cases/:id/status)
   ↓
4. Adds comments/notes
   ↓
5. Marks as completed with feedback
   ↓
6. Analytics updated automatically
```

### Workflow 3: Professional Directory Search

```
1. User searches professionals (GET /professionals/search)
   ↓
2. Filters by type, location, language
   ↓
3. Views ratings and specializations
   ↓
4. Requests support (POST /support)
   ↓
5. Professional accepts request
```

---

## 📈 Key Endpoints Cheat Sheet

| Feature | Method | Endpoint | Auth |
|---------|--------|----------|------|
| Register | POST | /auth/register | ❌ |
| Login | POST | /auth/login | ❌ |
| Get Profile | GET | /auth/profile | ✅ |
| Submit Report | POST | /reports | ❌ |
| Get Reports | GET | /reports | ✅ |
| Classify | POST | /classification/analyze | ✅ |
| Auto-Route | POST | /cases/auto-route/:id | ✅ |
| My Cases | GET | /cases/professional/:id | ✅ |
| Professionals | GET | /professionals/directory | ❌ |
| Search Professionals | GET | /professionals/search | ❌ |
| Analytics | GET | /analytics/dashboard | ✅ |

---

## 🎯 Common Tasks

### Task 1: Get User Token
```javascript
const login = async () => {
  const res = await fetch('http://localhost:3001/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'password123'
    })
  });
  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data.token;
};
```

### Task 2: Submit Report with Classification
```javascript
const submitReport = async (title, description) => {
  const token = localStorage.getItem('token');
  
  // Submit report
  const reportRes = await fetch('http://localhost:3001/api/v1/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      description,
      isAnonymous: true
    })
  });
  
  const report = await reportRes.json();
  
  // Get classification
  const classRes = await fetch('http://localhost:3001/api/v1/classification/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text: description })
  });
  
  const classification = await classRes.json();
  return { report, classification };
};
```

### Task 3: Get Dashboard Data
```javascript
const getDashboard = async () => {
  const token = localStorage.getItem('token');
  
  const res = await fetch('http://localhost:3001/api/v1/analytics/dashboard?days=30', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const data = await res.json();
  return {
    totalReports: data.summary.totalReports,
    criticalCases: data.summary.criticalCases,
    resolutionRate: data.summary.resolutionRate,
    professionals: data.summary.activeProfessionals
  };
};
```

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

# Server
PORT=3001
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:3000

# Supabase (Optional)
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=...

# Classification
ML_MODEL_VERSION=1.0.0
CLASSIFICATION_CONFIDENCE_THRESHOLD=0.7
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3001 in use | Change PORT in `.env` or `npm run start:dev -- --port 3002` |
| Database connection error | Verify DATABASE_URL format in `.env` |
| JWT errors | Check JWT_SECRET is set and token is valid |
| CORS errors | Verify FRONTEND_URL matches your frontend URL |
| Module not found | Run `npm install` again |
| Prisma errors | Run `npm run prisma:generate` |

---

## 📱 Response Examples

### Report Submission Response
```json
{
  "id": "report_123",
  "title": "Report Title",
  "description": "...",
  "category": "PHYSICAL_VIOLENCE",
  "severity": "HIGH",
  "status": "PENDING_REVIEW",
  "classification": {
    "category": "PHYSICAL_VIOLENCE",
    "confidence": 0.92
  },
  "riskScore": 25
}
```

### Classification Response
```json
{
  "classification": {
    "category": "PHYSICAL_VIOLENCE",
    "severity": "HIGH",
    "suggestedCaseType": "MEDICAL_SUPPORT",
    "confidence": 0.92,
    "keywordMatches": ["hit", "injury"]
  },
  "riskScore": {
    "riskScore": 25,
    "isRepetitive": false,
    "isDuplicate": false,
    "flagged": false
  }
}
```

### Analytics Response
```json
{
  "summary": {
    "totalReports": 156,
    "criticalCases": 12,
    "resolutionRate": 78.5,
    "flaggedReports": 8,
    "activeProfessionals": 42,
    "averageResponseTime": 3.2
  },
  "reportsByCategory": {
    "PHYSICAL_VIOLENCE": 45,
    "SEXUAL_ASSAULT": 23,
    "CYBERBULLYING": 34,
    "...": "..."
  }
}
```

---

## 🚢 Deploy to Production

### Step 1: Set Environment Variables
```bash
# In hosting platform (Vercel, Render, Railway, etc)
DATABASE_URL=postgresql://...
JWT_SECRET=production-secret-key-here
NODE_ENV=production
FRONTEND_URL=https://your-frontend.com
```

### Step 2: Build & Deploy
```bash
# Vercel
npm run build
vercel deploy --prod

# Docker
docker build -t api .
docker run -e DATABASE_URL=... -p 3001:3001 api
```

### Step 3: Update Frontend
```env
NEXT_PUBLIC_API_URL=https://your-api.com/api/v1
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `backend/README.md` | Complete backend documentation |
| `BACKEND_INTEGRATION.md` | Frontend integration guide |
| `IMPLEMENTATION_SUMMARY.md` | Full implementation overview |
| `QUICK_START.md` | This quick reference |

---

## ✅ Verification Checklist

- [ ] Backend installed and running
- [ ] Database migrations completed
- [ ] API docs accessible at `/api/docs`
- [ ] Can register new user
- [ ] Can login and get token
- [ ] Can submit report
- [ ] Classification returns valid results
- [ ] Can view professionals
- [ ] Analytics dashboard working
- [ ] Frontend can connect to API
- [ ] Error handling working
- [ ] Ready for production

---

## 🎓 Next Steps

1. **Read Full Documentation**: Check `backend/README.md`
2. **Integrate Frontend**: Follow `BACKEND_INTEGRATION.md`
3. **Test Workflows**: Use curl commands above
4. **Setup Database**: Configure your PostgreSQL/Supabase
5. **Deploy**: Choose your hosting platform
6. **Monitor**: Watch logs and performance

---

## 💬 Support Resources

- **API Documentation**: http://localhost:3001/api/docs
- **NestJS Docs**: https://docs.nestjs.com
- **Prisma Docs**: https://www.prisma.io/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs

---

**Status**: ✅ Ready to Use  
**Last Updated**: February 9, 2026  
**Version**: 1.0.0
