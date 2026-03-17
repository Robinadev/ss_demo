import { useState } from 'react';
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  User,
  Shield,
  Award,
  Star,
  Target,
  Zap,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const mockMLRecommendations = [
  {
    professional: {
      id: 'prof-1',
      name: 'Dr. Sarah Johnson',
      role: 'Clinical Psychologist',
      specialization: ['Trauma', 'PTSD', 'Anxiety'],
      experience: '12 years',
      location: 'Downtown Counseling Center',
      rating: 4.9,
      activeCases: 8,
      maxCapacity: 15,
    },
    confidenceScore: 94,
    reasoning: [
      'High match on trauma specialization (98%)',
      'Excellent success rate with similar cases (95%)',
      'Optimal location proximity to client',
      'Strong EMDR certification alignment',
    ],
    riskFactors: [],
    estimatedWaitTime: '2 days',
    successPrediction: 87,
  },
  {
    professional: {
      id: 'prof-2',
      name: 'Michael Chen, LCSW',
      role: 'Licensed Clinical Social Worker',
      specialization: ['Domestic Violence', 'Family Therapy'],
      experience: '8 years',
      location: 'North District Office',
      rating: 4.7,
      activeCases: 12,
      maxCapacity: 18,
    },
    confidenceScore: 87,
    reasoning: [
      'Strong domestic violence expertise (92%)',
      'Good track record with urgent cases (89%)',
      'Available within client-preferred time frame',
    ],
    riskFactors: ['Higher caseload may extend response time'],
    estimatedWaitTime: '5 days',
    successPrediction: 82,
  },
  {
    professional: {
      id: 'prof-3',
      name: 'Dr. Emily Rodriguez',
      role: 'Trauma Specialist',
      specialization: ['Sexual Assault', 'Trauma Recovery'],
      experience: '15 years',
      location: 'SAFE Medical Center',
      rating: 4.8,
      activeCases: 16,
      maxCapacity: 12,
    },
    confidenceScore: 76,
    reasoning: [
      'Excellent trauma recovery credentials',
      'Strong forensic medical background',
      'Highly rated by previous clients',
    ],
    riskFactors: [
      'Currently at 133% capacity',
      'Longer estimated wait time',
      'Location less convenient for client',
    ],
    estimatedWaitTime: '12 days',
    successPrediction: 91,
  },
];

const mockCaseContext = {
  title: 'Emergency Shelter Placement',
  clientName: 'Sarah M.',
  type: 'EMERGENCY_SUPPORT',
  priority: 'CRITICAL',
  symptoms: ['Acute anxiety', 'Fear of safety', 'Recent trauma'],
  riskLevel: 'High',
  location: 'Downtown District',
  preferredTimes: ['Evenings', 'Weekends'],
  specialRequirements: ['EMDR certified', 'Domestic violence experience'],
};

function MLRecommendationPage() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<
    string | null
  >(null);

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskColor = (risks: string[]) => {
    if (risks.length === 0) return 'text-emerald-600';
    if (risks.length === 1) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Link to="/counselor/cases">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cases
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  ML Case Recommendations
                </h1>
                <p className="mt-1 text-slate-600">
                  AI-powered professional matching for optimal case outcomes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Context */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Case Context Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">
                  Case Details
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Title:</strong> {mockCaseContext.title}
                  </p>
                  <p>
                    <strong>Client:</strong> {mockCaseContext.clientName}
                  </p>
                  <p>
                    <strong>Type:</strong>{' '}
                    {mockCaseContext.type.replace('_', ' ')}
                  </p>
                  <Badge className="mt-2 bg-red-100 text-red-800">
                    {mockCaseContext.priority} Priority
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">
                  Client Symptoms
                </h4>
                <div className="flex flex-wrap gap-1">
                  {mockCaseContext.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">
                  Requirements
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-slate-500" />
                    {mockCaseContext.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-slate-500" />
                    {mockCaseContext.preferredTimes.join(', ')}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">
                  Special Certifications
                </h4>
                <div className="flex flex-wrap gap-1">
                  {mockCaseContext.specialRequirements.map((req, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-xs text-blue-800"
                    >
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[var(--role-counselor-accent)]" />
              AI Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-emerald-600">
                  94%
                </div>
                <p className="text-sm text-slate-600">
                  Highest Match Confidence
                </p>
                <Progress value={94} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-blue-600">87%</div>
                <p className="text-sm text-slate-600">Predicted Success Rate</p>
                <Progress value={87} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-amber-600">
                  2-5 days
                </div>
                <p className="text-sm text-slate-600">
                  Estimated Assignment Time
                </p>
                <div className="mt-2 flex items-center justify-center">
                  <Clock className="mr-1 h-4 w-4 text-amber-500" />
                  <span className="text-xs text-slate-500">
                    Optimal timeframe
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Recommended Professionals
          </h2>
          {mockMLRecommendations.map((rec, index) => (
            <Card
              key={rec.professional.id}
              className={`transition-all ${
                selectedRecommendation === rec.professional.id
                  ? 'ring-2 ring-indigo-500'
                  : 'hover:shadow-md'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                      <User className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {rec.professional.name}
                        </h3>
                        <Badge
                          className={getConfidenceColor(rec.confidenceScore)}
                        >
                          {rec.confidenceScore}% Match
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {rec.professional.rating}
                        </div>
                        <div className="text-sm text-slate-500">
                          #{index + 1} Recommendation
                        </div>
                      </div>

                      <p className="mb-3 text-slate-600">
                        {rec.professional.role}
                      </p>

                      <div className="mb-3 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          {rec.professional.experience} experience
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {rec.professional.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {rec.professional.activeCases}/
                          {rec.professional.maxCapacity} cases
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Wait: {rec.estimatedWaitTime}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="mb-2 text-sm font-medium text-slate-700">
                          Why this match:
                        </p>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                          {rec.reasoning.map((reason, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                              {reason}
                            </div>
                          ))}
                        </div>
                      </div>

                      {rec.riskFactors.length > 0 && (
                        <div className="mb-3">
                          <p
                            className={`mb-2 text-sm font-medium ${getRiskColor(rec.riskFactors)}`}
                          >
                            ⚠️ Risk Factors:
                          </p>
                          <div className="space-y-1">
                            {rec.riskFactors.map((risk, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm text-amber-700"
                              >
                                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                                {risk}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {rec.successPrediction}% predicted success rate
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${getConfidenceColor(rec.confidenceScore).split(' ')[0]}`}
                      >
                        {rec.confidenceScore}%
                      </div>
                      <div className="text-xs tracking-widest text-slate-500 uppercase">
                        AI Confidence
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={() =>
                          alert(`Assigning case to ${rec.professional.name}...`)
                        }
                      >
                        Assign Case
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manual Override Option */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Not satisfied with AI recommendations?
                  </h3>
                  <p className="text-sm text-slate-600">
                    You can manually override and assign to a different
                    professional
                  </p>
                </div>
              </div>
              <Link to="/counselor/cases/case-routing/manual-override">
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  Manual Override
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MLRecommendationPage;
