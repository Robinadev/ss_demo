import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { IncidentCategory, SeverityLevel, CaseType } from '@prisma/client';
export interface ClassificationResult {
    category: IncidentCategory;
    severity: SeverityLevel;
    suggestedCaseType: CaseType;
    confidence: number;
    keywordMatches: string[];
    riskIndicators?: string[];
}
export interface RiskScoreResult {
    riskScore: number;
    isRepetitive: boolean;
    isDuplicate: boolean;
    flagged: boolean;
    reasons: string[];
}
export declare class ClassificationService {
    private prisma;
    private configService;
    private readonly logger;
    private readonly confidenceThreshold;
    private readonly categoryKeywords;
    constructor(prisma: PrismaService, configService: ConfigService);
    /**
     * Detect language from text (simple detection)
     */
    private detectLanguage;
    /**
     * Classify incident report text into category and severity with multi-language support
     */
    classifyReport(text: string, language?: string): Promise<ClassificationResult>;
    /**
     * Detect risk indicators in text
     */
    private detectRiskIndicators;
    /**
     * Calculate risk score for duplicate/falsified reports
     */
    calculateRiskScore(text: string, ipAddress: string | null, deviceFingerprint: string | null): Promise<RiskScoreResult>;
    /**
     * Find semantically similar reports using simple text similarity
     */
    private findSimilarReports;
    /**
     * Determine appropriate case type based on incident category
     */
    private determineCaseType;
    /**
     * Hash IP address for privacy using SHA-256
     */
    private hashIP;
    /**
     * Get classification statistics
     */
    getClassificationStats(): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ReportGroupByOutputType, ("category" | "severity")[]> & {
        _count: number;
    })[]>;
}
//# sourceMappingURL=classification.service.d.ts.map