"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ClassificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassificationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
const crypto = require("crypto");
let ClassificationService = ClassificationService_1 = class ClassificationService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.logger = new common_1.Logger(ClassificationService_1.name);
        // Multi-language knowledge base for classification
        this.categoryKeywords = {
            [client_1.IncidentCategory.PHYSICAL_VIOLENCE]: {
                en: {
                    keywords: [
                        'hit',
                        'beat',
                        'punch',
                        'kick',
                        'slap',
                        'strike',
                        'violence',
                        'injury',
                        'hurt',
                        'assault',
                        'attack',
                        'wound',
                        'bruise',
                        'fracture',
                        'bleed',
                        'bleeding',
                    ],
                    severity: client_1.SeverityLevel.HIGH,
                },
                am: {
                    keywords: [
                        'ምግት',
                        'መውጣት',
                        'መምታት',
                        'ግድያ',
                        'ጉዳት',
                        'ስቃይ',
                        'ሙስሙስ',
                        'ደም',
                        'ስንጣ',
                    ],
                    severity: client_1.SeverityLevel.HIGH,
                },
            },
            [client_1.IncidentCategory.SEXUAL_ASSAULT]: {
                en: {
                    keywords: [
                        'rape',
                        'sexual assault',
                        'molestation',
                        'groping',
                        'unwanted touch',
                        'coercion',
                        'forced sex',
                        'non-consensual',
                        'sexual violence',
                        'sexual abuse',
                        'inappropriate touching',
                        'sexual harassment',
                    ],
                    severity: client_1.SeverityLevel.CRITICAL,
                },
                am: {
                    keywords: [
                        'የወሲብ ጥቅስ',
                        'የወሲብ ግጭት',
                        'ህገ-ወጥ ግብረ-ስጋ',
                        'ስጋ',
                        'ያልተስማማ ግብረ-ስጋ',
                    ],
                    severity: client_1.SeverityLevel.CRITICAL,
                },
            },
            [client_1.IncidentCategory.EMOTIONAL_ABUSE]: {
                en: {
                    keywords: [
                        'humiliation',
                        'shame',
                        'degradation',
                        'insults',
                        'emotional abuse',
                        'psychological abuse',
                        'belittle',
                        'control',
                        'manipulation',
                        'criticism',
                        'disrespect',
                        'put down',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
                am: {
                    keywords: [
                        'ገምጣ',
                        'ስሕተት',
                        'ግልበጣ',
                        'ማሳደድ',
                        'መስዋዕት',
                        'ስነ-ምግባር',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
            },
            [client_1.IncidentCategory.PSYCHOLOGICAL_ABUSE]: {
                en: {
                    keywords: [
                        'trauma',
                        'intimidation',
                        'threats',
                        'fear',
                        'mental abuse',
                        'mind games',
                        'gaslighting',
                        'isolation',
                        'psychological manipulation',
                        'emotional torture',
                    ],
                    severity: client_1.SeverityLevel.HIGH,
                },
                am: {
                    keywords: [
                        'ስርወ-ሕሊና',
                        'ፍራ',
                        'ማስፈራራት',
                        'ማጣልበጥ',
                        'አወቃቀር ማርማት',
                    ],
                    severity: client_1.SeverityLevel.HIGH,
                },
            },
            [client_1.IncidentCategory.NEGLECT]: {
                en: {
                    keywords: [
                        'abandoned',
                        'ignored',
                        'neglect',
                        'uncared',
                        'denial',
                        'deprivation',
                        'withhold',
                        'neglectful',
                        'lack of care',
                        'abandonment',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
                am: {
                    keywords: [
                        'ተተወ',
                        'አደር',
                        'ተላለየ',
                        'ቢ',
                        'ግድየለሸ',
                        'ተደበቀ',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
            },
            [client_1.IncidentCategory.CYBERBULLYING]: {
                en: {
                    keywords: [
                        'online',
                        'cyberbully',
                        'social media',
                        'harassment online',
                        'hate comments',
                        'doxxing',
                        'revenge porn',
                        'blackmail',
                        'trolling',
                        'online abuse',
                        'digital harassment',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
                am: {
                    keywords: [
                        'ቢ',
                        'ወደ ሙያ',
                        'ተሳሪ',
                        'ተወካይ',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
            },
            [client_1.IncidentCategory.HARASSMENT]: {
                en: {
                    keywords: [
                        'harass',
                        'stalk',
                        'unwanted contact',
                        'threatening',
                        'persistent',
                        'intimidate',
                        'harassment',
                        'stalking',
                        'repeated contact',
                        'threatening behavior',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
                am: {
                    keywords: [
                        'ስሩአት',
                        'ሕገወጥ ምርመራ',
                        'ተደጋጋሚ ቅርበት',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
            },
            [client_1.IncidentCategory.DISCRIMINATION]: {
                en: {
                    keywords: [
                        'discrimination',
                        'racist',
                        'sexist',
                        'homophobic',
                        'prejudice',
                        'bias',
                        'hate',
                        'stereotype',
                        'discriminatory',
                        'racial abuse',
                        'ethnic abuse',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
                am: {
                    keywords: [
                        'ልዩነት',
                        'ማዝ',
                        'ጠዋት',
                        'ደዛፍ',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
            },
            [client_1.IncidentCategory.WORKPLACE_ABUSE]: {
                en: {
                    keywords: [
                        'work',
                        'job',
                        'boss',
                        'supervisor',
                        'colleague',
                        'workplace',
                        'office',
                        'unfair treatment',
                        'workplace harassment',
                        'occupational abuse',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
                am: {
                    keywords: [
                        'ስራ',
                        'ሥራ ቤት',
                        'መስሪያ',
                        'ሬሳ',
                        'ስራ አመራር',
                    ],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
            },
            [client_1.IncidentCategory.DOMESTIC_VIOLENCE]: {
                en: {
                    keywords: [
                        'partner',
                        'spouse',
                        'husband',
                        'wife',
                        'domestic',
                        'home',
                        'family',
                        'household',
                        'intimate partner',
                        'domestic abuse',
                        'family violence',
                    ],
                    severity: client_1.SeverityLevel.HIGH,
                },
                am: {
                    keywords: [
                        'ወገን',
                        'ሚስት',
                        'ባል',
                        'ቤት',
                        'ቤተሰብ',
                        'ሣፋሪ',
                        'የቤት ሕይወት ግጭት',
                    ],
                    severity: client_1.SeverityLevel.HIGH,
                },
            },
            [client_1.IncidentCategory.CHILD_ABUSE]: {
                en: {
                    keywords: [
                        'child',
                        'kid',
                        'minor',
                        'baby',
                        'infant',
                        'juvenile',
                        'children',
                        'toddler',
                        'young',
                        'underage',
                        'child abuse',
                        'child exploitation',
                    ],
                    severity: client_1.SeverityLevel.CRITICAL,
                },
                am: {
                    keywords: [
                        'ልጅ',
                        'ሕፃናት',
                        'አነስተኛ',
                        'ወጣት',
                        'ዘረጋ',
                    ],
                    severity: client_1.SeverityLevel.CRITICAL,
                },
            },
            [client_1.IncidentCategory.ELDER_ABUSE]: {
                en: {
                    keywords: [
                        'elderly',
                        'elder',
                        'senior',
                        'old',
                        'aged',
                        'grandparent',
                        'retired',
                        'pensioner',
                        'senior abuse',
                        'elder neglect',
                    ],
                    severity: client_1.SeverityLevel.HIGH,
                },
                am: {
                    keywords: [
                        'ሽማግሌ',
                        'ጋር',
                        'ወቅታዊ',
                        'አዛማ',
                        'አስፈሪ',
                    ],
                    severity: client_1.SeverityLevel.HIGH,
                },
            },
            [client_1.IncidentCategory.OTHER]: {
                en: {
                    keywords: [],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
                am: {
                    keywords: [],
                    severity: client_1.SeverityLevel.MEDIUM,
                },
            },
        };
        this.confidenceThreshold =
            parseFloat(this.configService.get('CLASSIFICATION_CONFIDENCE_THRESHOLD') ?? '0.7') || 0.7;
    }
    /**
     * Detect language from text (simple detection)
     */
    detectLanguage(text) {
        // Simple language detection - look for Amharic Unicode range
        const amharicRegex = /[\u1200-\u137F]/g;
        const amharicMatches = text.match(amharicRegex) || [];
        return amharicMatches.length > text.length * 0.1 ? 'am' : 'en';
    }
    /**
     * Classify incident report text into category and severity with multi-language support
     */
    async classifyReport(text, language) {
        const lowerText = text.toLowerCase();
        const detectedLanguage = language || this.detectLanguage(text);
        // Calculate keyword matches for each category
        const categoryScores = {};
        const matchedKeywords = {};
        const riskIndicators = [];
        for (const [category, langVariants] of Object.entries(this.categoryKeywords)) {
            const variant = langVariants[detectedLanguage] || langVariants['en'];
            let matches = 0;
            const foundKeywords = [];
            for (const keyword of variant.keywords) {
                if (lowerText.includes(keyword.toLowerCase())) {
                    matches += 1;
                    foundKeywords.push(keyword);
                }
            }
            if (matches > 0) {
                const maxPossible = Math.max(1, variant.keywords.length);
                categoryScores[category] = matches / maxPossible;
                matchedKeywords[category] = foundKeywords;
            }
        }
        // Find best matching category
        const sortedCategories = Object.entries(categoryScores).sort(([, a], [, b]) => b - a);
        const [bestCategory, score] = sortedCategories[0] || [client_1.IncidentCategory.OTHER, 0];
        const confidence = Math.min(score, 1.0);
        const category = bestCategory;
        const severity = this.categoryKeywords[category]?.[detectedLanguage]?.severity ||
            client_1.SeverityLevel.MEDIUM;
        // Detect risk indicators
        this.detectRiskIndicators(lowerText, riskIndicators);
        // Determine suggested case type based on category
        const suggestedCaseType = this.determineCaseType(category);
        this.logger.log(`Classification: ${category} (confidence: ${confidence.toFixed(2)}, language: ${detectedLanguage})`);
        return {
            category,
            severity,
            suggestedCaseType,
            confidence,
            keywordMatches: matchedKeywords[category] || [],
            riskIndicators,
        };
    }
    /**
     * Detect risk indicators in text
     */
    detectRiskIndicators(text, indicators) {
        const riskPatterns = {
            'immediate_harm': /\b(now|immediately|urgent|emergency|right now|asap)\b/i,
            'weapons': /\b(gun|knife|weapon|bomb|explosive|poison|drug)\b/i,
            'suicidal': /\b(suicide|kill myself|end my life|want to die|no point)\b/i,
            'trafficking': /\b(trafficking|exploitation|forced labor|sold|trafficking network)\b/i,
            'organized_crime': /\b(gang|cartel|mafia|organized|criminal network)\b/i,
        };
        for (const [indicator, pattern] of Object.entries(riskPatterns)) {
            if (pattern.test(text)) {
                indicators.push(indicator);
            }
        }
    }
    /**
     * Calculate risk score for duplicate/falsified reports
     */
    async calculateRiskScore(text, ipAddress, deviceFingerprint) {
        let riskScore = 0;
        const reasons = [];
        // 1. Check for similar reports from same IP
        if (ipAddress) {
            const recentReports = await this.prisma.report.findMany({
                where: {
                    ipHash: this.hashIP(ipAddress),
                    createdAt: {
                        gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
                    },
                },
            });
            if (recentReports.length > 3) {
                riskScore += 30;
                reasons.push('Multiple reports from same IP in 24h');
            }
        }
        // 2. Check for text similarity with recent reports
        const similarReports = await this.findSimilarReports(text);
        if (similarReports.length > 0) {
            riskScore += 40;
            reasons.push('Similar report text found recently');
        }
        // 3. Check device fingerprint for repetitive patterns
        if (deviceFingerprint) {
            const deviceReports = await this.prisma.report.findMany({
                where: {
                    deviceFingerprint,
                    createdAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
                    },
                },
                take: 5,
            });
            if (deviceReports.length > 5) {
                riskScore += 25;
                reasons.push('Device used for multiple reports');
            }
        }
        // 4. Check text characteristics (extremely short or generic)
        if (text.length < 20) {
            riskScore += 10;
            reasons.push('Report text too short');
        }
        // 5. Check for spam patterns
        const spamPatterns = /(test|spam|fake|joke|prank|lol)/gi;
        if (spamPatterns.test(text)) {
            riskScore += 20;
            reasons.push('Potential spam indicators detected');
        }
        const isRepetitive = riskScore >= 50;
        const isDuplicate = similarReports.length > 0 && riskScore >= 70;
        return {
            riskScore: Math.min(riskScore, 100),
            isRepetitive,
            isDuplicate,
            flagged: riskScore >= 50,
            reasons,
        };
    }
    /**
     * Find semantically similar reports using simple text similarity
     */
    async findSimilarReports(text, limit = 5) {
        // Get recent reports
        const recentReports = await this.prisma.report.findMany({
            where: {
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
                },
            },
            select: {
                id: true,
                description: true,
            },
            take: 50,
        });
        // Calculate similarity using simple word overlap
        const textWords = new Set(text.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
        const similar = recentReports
            .map((report) => {
            const reportWords = new Set(report.description.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
            const intersection = Array.from(textWords).filter((w) => reportWords.has(w));
            const similarity = intersection.length /
                Math.max(textWords.size, reportWords.size);
            return { ...report, similarity };
        })
            .filter((r) => r.similarity > 0.6)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, limit);
        return similar;
    }
    /**
     * Determine appropriate case type based on incident category
     */
    determineCaseType(category) {
        const categoryToCaseType = {
            [client_1.IncidentCategory.PHYSICAL_VIOLENCE]: client_1.CaseType.MEDICAL_SUPPORT,
            [client_1.IncidentCategory.SEXUAL_ASSAULT]: client_1.CaseType.LEGAL_ASSISTANCE,
            [client_1.IncidentCategory.EMOTIONAL_ABUSE]: client_1.CaseType.COUNSELING,
            [client_1.IncidentCategory.PSYCHOLOGICAL_ABUSE]: client_1.CaseType.COUNSELING,
            [client_1.IncidentCategory.NEGLECT]: client_1.CaseType.COUNSELING,
            [client_1.IncidentCategory.CYBERBULLYING]: client_1.CaseType.LEGAL_ASSISTANCE,
            [client_1.IncidentCategory.HARASSMENT]: client_1.CaseType.LEGAL_ASSISTANCE,
            [client_1.IncidentCategory.DISCRIMINATION]: client_1.CaseType.LEGAL_ASSISTANCE,
            [client_1.IncidentCategory.WORKPLACE_ABUSE]: client_1.CaseType.LEGAL_ASSISTANCE,
            [client_1.IncidentCategory.DOMESTIC_VIOLENCE]: client_1.CaseType.COMBINED_SUPPORT,
            [client_1.IncidentCategory.CHILD_ABUSE]: client_1.CaseType.COMBINED_SUPPORT,
            [client_1.IncidentCategory.ELDER_ABUSE]: client_1.CaseType.COMBINED_SUPPORT,
            [client_1.IncidentCategory.OTHER]: client_1.CaseType.RESOURCE_REFERRAL,
        };
        return categoryToCaseType[category] || client_1.CaseType.RESOURCE_REFERRAL;
    }
    /**
     * Hash IP address for privacy using SHA-256
     */
    hashIP(ipAddress) {
        return crypto
            .createHash('sha256')
            .update(ipAddress)
            .digest('hex')
            .substring(0, 32);
    }
    /**
     * Get classification statistics
     */
    async getClassificationStats() {
        const stats = await this.prisma.report.groupBy({
            by: ['category', 'severity'],
            _count: true,
        });
        return stats;
    }
};
exports.ClassificationService = ClassificationService;
exports.ClassificationService = ClassificationService = ClassificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], ClassificationService);
//# sourceMappingURL=classification.service.js.map