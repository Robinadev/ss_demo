# ML Classification System Documentation

## Overview

The ML Classification System automatically analyzes incident reports to:
- Classify into 13 incident categories
- Assess severity levels
- Detect risk indicators
- Suggest appropriate case types
- Calculate fraud risk scores
- Support multi-language processing (English, Amharic)

## Architecture

### Classification Pipeline

```
Raw Report Text
    ↓
Language Detection
    ↓
Text Preprocessing
    ↓
Keyword Matching
    ↓
Risk Indicator Analysis
    ↓
Classification Result
    ↓
Route to Professionals
```

## Classification Categories

### 1. Physical Violence
- Keywords: hit, beat, punch, kick, wound, bruise, fracture, assault
- Severity: HIGH
- Suggested Case: MEDICAL_SUPPORT
- Risk Indicators: Active harm, weapons mentioned

### 2. Sexual Assault
- Keywords: rape, sexual assault, molestation, non-consensual, coercion
- Severity: CRITICAL
- Suggested Case: LEGAL_ASSISTANCE
- Risk Indicators: Immediate threat, ongoing threat

### 3. Emotional Abuse
- Keywords: humiliation, shame, degradation, belittle, manipulation
- Severity: MEDIUM
- Suggested Case: COUNSELING
- Risk Indicators: Escalating abuse, suicidal ideation

### 4. Psychological Abuse
- Keywords: trauma, intimidation, threats, gaslighting, isolation
- Severity: HIGH
- Suggested Case: COUNSELING
- Risk Indicators: Mind control, severe isolation

### 5. Neglect
- Keywords: abandoned, ignored, neglect, deprivation, withhold
- Severity: MEDIUM
- Suggested Case: COUNSELING
- Risk Indicators: Child/elder involved, basic needs denied

### 6. Cyberbullying
- Keywords: online, social media, hate comments, doxxing, revenge porn
- Severity: MEDIUM
- Suggested Case: LEGAL_ASSISTANCE
- Risk Indicators: Organized harassment, false information

### 7. Harassment
- Keywords: harass, stalk, unwanted contact, persistent, intimidate
- Severity: MEDIUM
- Suggested Case: LEGAL_ASSISTANCE
- Risk Indicators: Escalating contact, threat of harm

### 8. Discrimination
- Keywords: discrimination, racist, sexist, bias, hate, stereotype
- Severity: MEDIUM
- Suggested Case: LEGAL_ASSISTANCE
- Risk Indicators: Pattern of discrimination, institutional abuse

### 9. Workplace Abuse
- Keywords: work, supervisor, colleague, workplace, unfair treatment
- Severity: MEDIUM
- Suggested Case: LEGAL_ASSISTANCE
- Risk Indicators: Power imbalance, systemic issue

### 10. Domestic Violence
- Keywords: partner, spouse, husband, wife, domestic, family
- Severity: HIGH
- Suggested Case: COMBINED_SUPPORT
- Risk Indicators: Isolation, financial control, threats

### 11. Child Abuse
- Keywords: child, kid, minor, baby, infant, juvenile
- Severity: CRITICAL
- Suggested Case: COMBINED_SUPPORT
- Risk Indicators: Sexual abuse, severe neglect, endangerment

### 12. Elder Abuse
- Keywords: elderly, elder, senior, aged, grandparent
- Severity: HIGH
- Suggested Case: COMBINED_SUPPORT
- Risk Indicators: Financial exploitation, medical neglect

### 13. Other
- Unclassified or miscellaneous incidents
- Severity: MEDIUM
- Suggested Case: RESOURCE_REFERRAL

## Multi-Language Support

### English (en)
Full support for English language keywords and analysis.

### Amharic (ኣማርኛ)
Amharic keywords for all categories:
- ምግት (violence)
- ስጋ (body/assault)
- ገምጣ (shame)
- ፍራ (fear)
- ልጅ (child)
- ሚስት (wife)

### Language Detection

Automatic detection via Unicode range checking:
```typescript
// Amharic Unicode range: \u1200-\u137F
const amharicRegex = /[\u1200-\u137F]/g;
const isAmharic = text.match(amharicRegex).length > text.length * 0.1;
```

## Risk Scoring Algorithm

### Components

1. **IP-Based Reputation** (0-30 points)
   - Multiple reports from same IP in 24h
   - Repeated report pattern
   - Historical abuse flags

2. **Text Similarity** (0-40 points)
   - Word-level overlap analysis
   - Cosine similarity to recent reports
   - Pattern repetition detection

3. **Device Fingerprinting** (0-25 points)
   - Device used for multiple reports
   - Frequency of reports from device
   - Historical device behavior

4. **Content Characteristics** (0-10 points)
   - Suspiciously short text
   - Generic language patterns
   - Spam indicators

5. **Spam Detection** (0-20 points)
   - Common spam keywords
   - Test/joke/fake indicators
   - Random character patterns

### Risk Score Ranges

- **0-20**: Low risk - Accept report
- **21-50**: Medium risk - Flag for review
- **51-70**: High risk - Likely duplicate/false
- **71-100**: Critical risk - Reject or manual review

### Fraud Detection

```typescript
interface RiskScoreResult {
  riskScore: number;           // 0-100
  isRepetitive: boolean;       // riskScore >= 50
  isDuplicate: boolean;        // similarity > 0.6 && riskScore >= 70
  flagged: boolean;            // riskScore >= 50
  reasons: string[];           // Detailed reasons
}
```

## Risk Indicators

High-priority patterns that trigger escalation:

### Immediate Danger
- Keywords: now, immediately, urgent, emergency, right now
- Action: CRITICAL priority assignment

### Weapons/Explosives
- Keywords: gun, knife, bomb, explosive, weapon, poison
- Action: Police notification

### Suicidal Ideation
- Keywords: suicide, kill myself, end my life, want to die
- Action: Emergency services alert

### Human Trafficking
- Keywords: trafficking, exploitation, forced labor, sold
- Action: Specialized trafficking unit

### Organized Crime
- Keywords: gang, cartel, mafia, organized crime
- Action: Law enforcement escalation

## API Usage

### Classification Endpoint

```bash
POST /api/classification/analyze
Content-Type: application/json

{
  "text": "I was hit and beaten by my husband. I have bruises and am scared.",
  "language": "en",
  "ipAddress": "192.168.1.1",
  "deviceFingerprint": "device-id-123"
}

Response:
{
  "category": "DOMESTIC_VIOLENCE",
  "severity": "HIGH",
  "suggestedCaseType": "COMBINED_SUPPORT",
  "confidence": 0.94,
  "keywordMatches": ["hit", "beaten", "husband"],
  "riskIndicators": [],
  "riskScore": {
    "riskScore": 12,
    "isRepetitive": false,
    "isDuplicate": false,
    "flagged": false,
    "reasons": []
  }
}
```

### Training Data Management

```bash
# Get classification statistics
GET /api/classification/stats

# Update ML training data
POST /api/classification/training
{
  "category": "PHYSICAL_VIOLENCE",
  "text": "I was punched in the face",
  "severity": "HIGH"
}

# Refresh classification model
POST /api/classification/refresh
```

## Confidence Scoring

### How It Works

1. **Keyword Matching**
   - Count matching keywords per category
   - Divide by total keywords in category
   - Result: 0-1.0 score per category

2. **Best Category Selection**
   - Choose category with highest score
   - Confidence = highest score (capped at 1.0)

3. **Threshold Comparison**
   - Default threshold: 0.7 (configurable)
   - Below threshold: consider OTHER category
   - Above threshold: proceed with classification

### Interpretation

- **0.9-1.0**: Very high confidence, reliable
- **0.7-0.89**: Good confidence, likely accurate
- **0.5-0.69**: Moderate confidence, review recommended
- **< 0.5**: Low confidence, manual review required

## Training & Improvement

### ML Training Data Model

```typescript
model MLTrainingData {
  id        String               @id
  category  IncidentCategory
  text      String
  severity  SeverityLevel
  frequency Int                  // How often used for training
  isActive  Boolean              // Enable/disable training sample
  createdAt DateTime
}
```

### Adding Training Data

```typescript
// Via API
POST /api/classification/training
{
  "category": "CHILD_ABUSE",
  "text": "My child is being abused at school by teachers",
  "severity": "CRITICAL"
}

// Programmatically
await prisma.mlTrainingData.create({
  data: {
    category: 'CHILD_ABUSE',
    text: 'My child is being abused...',
    severity: 'CRITICAL',
    frequency: 1,
    isActive: true
  }
});
```

### Improving Classification Accuracy

1. **Collect Feedback**
   - Track misclassifications
   - Gather user corrections
   - Monitor false positives/negatives

2. **Update Keywords**
   - Add new keywords from feedback
   - Remove misleading keywords
   - Adjust keyword weights

3. **Expand Training Data**
   - Add diverse report examples
   - Include edge cases
   - Cover multiple languages

4. **Periodic Retraining**
   - Review classification accuracy monthly
   - Adjust thresholds based on data
   - Update risk scoring parameters

## Performance Considerations

### Optimization

- Keyword matching is O(n*m) where n=keywords, m=words in text
- Typical processing: <100ms per report
- Similarity analysis cached for 24 hours
- Batch processing available for analytics

### Caching

```typescript
// Cache classification results
const cached = await cache.get(`classification:${reportId}`);

// Invalidate after update
await cache.del(`classification:${reportId}`);
```

## Troubleshooting

### Low Confidence Classifications

```typescript
// Check keyword matches
const result = await classificationService.classifyReport(text);
if (result.confidence < 0.7) {
  // Review keywords matched
  console.log(result.keywordMatches);
  // Consider OTHER category
}
```

### False Positives

- Review risk scoring parameters
- Check for overly broad keywords
- Update category boundaries
- Adjust confidence threshold

### Misclassifications

1. Review the report text
2. Check matched keywords
3. Compare with similar classified reports
4. Update training data if needed
5. Adjust category-specific keywords

## Integration with Case Management

### Automatic Routing

```typescript
// Classification result flows to case assignment
const classification = await analyzeReport(report.description);

const caseAssignment = await createCaseAssignment({
  reportId: report.id,
  caseType: classification.suggestedCaseType,
  priority: severityToPriority(classification.severity),
  // Route to appropriate professional
});
```

### Professional Selection

```typescript
// Match professionals by case type
const professionals = await findProfessionalsByType(
  classification.suggestedCaseType,
  language: report.language
);

// Assign to least busy professional
const bestFit = findLeastBusy(professionals);
```

## Future Enhancements

1. **NLP Integration**
   - Use advanced NLP libraries
   - Semantic similarity analysis
   - Context-aware classification

2. **Machine Learning**
   - Train ML models on historical data
   - Dynamic keyword weighting
   - Pattern recognition

3. **Multi-Modal**
   - Process images/videos (future)
   - Audio transcription analysis
   - Document review

4. **Real-time Updates**
   - Feedback loop from professionals
   - Continuous model improvement
   - A/B testing of thresholds

## Testing

### Unit Tests

```typescript
describe('ClassificationService', () => {
  it('should classify physical violence correctly', async () => {
    const result = await service.classifyReport('He hit me');
    expect(result.category).toBe('PHYSICAL_VIOLENCE');
    expect(result.confidence).toBeGreaterThan(0.7);
  });

  it('should detect Amharic text', async () => {
    const result = await service.classifyReport('ምግት ሞግዋ');
    expect(result.category).toBe('PHYSICAL_VIOLENCE');
  });

  it('should calculate risk score accurately', async () => {
    const risk = await service.calculateRiskScore(text, ip, device);
    expect(risk.riskScore).toBeLessThanOrEqual(100);
  });
});
```

## References

- Incident Categories: Based on UN classification
- Severity Framework: WHO Violence Prevention Guidelines
- Risk Scoring: Adapted from fraud detection algorithms
- Multi-language: Supports Unicode text processing
