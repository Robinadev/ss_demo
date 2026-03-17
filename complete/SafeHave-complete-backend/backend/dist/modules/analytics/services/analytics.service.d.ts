import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    /**
     * Get comprehensive dashboard analytics
     */
    getDashboardAnalytics(days?: number): Promise<{
        summary: {
            totalReports: number;
            criticalCases: number;
            resolutionRate: number;
            flaggedReports: number;
            activeProfessionals: number;
            averageResponseTime: number;
        };
        reportsByCategory: Record<string, number>;
        reportsBySeverity: Record<string, number>;
        reportsByStatus: Record<string, number>;
        recentReports: {
            description: string;
            title: string;
            language: string;
            id: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.IncidentCategory;
            severity: import(".prisma/client").$Enums.SeverityLevel;
            suggestedCaseType: string | null;
            reporterId: string | null;
            isAnonymous: boolean;
            classificationScore: number | null;
            classificationLabel: string | null;
            suggestedPriority: string | null;
            location: string | null;
            ipAddress: string | null;
            ipHash: string | null;
            deviceFingerprint: string | null;
            riskScore: number;
            flaggedAsRepetitive: boolean;
            isDuplicate: boolean;
            resolvedAt: Date | null;
        }[];
        riskyReports: {
            description: string;
            title: string;
            language: string;
            id: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.IncidentCategory;
            severity: import(".prisma/client").$Enums.SeverityLevel;
            suggestedCaseType: string | null;
            reporterId: string | null;
            isAnonymous: boolean;
            classificationScore: number | null;
            classificationLabel: string | null;
            suggestedPriority: string | null;
            location: string | null;
            ipAddress: string | null;
            ipHash: string | null;
            deviceFingerprint: string | null;
            riskScore: number;
            flaggedAsRepetitive: boolean;
            isDuplicate: boolean;
            resolvedAt: Date | null;
        }[];
    }>;
    /**
     * Get detailed incident analytics
     */
    getIncidentAnalytics(days?: number): Promise<{
        period: {
            from: Date;
            to: Date;
        };
        totalReports: number;
        anonymousVsReported: {
            anonymous: number;
            reported: number;
        };
        riskDistribution: {
            high: number;
            medium: number;
            low: number;
        };
        categoryDistribution: Record<string, number>;
        severityDistribution: Record<string, number>;
        dailyTrend: Record<string, number>;
        topReportingDays: {
            day: string;
            count: number;
        }[];
        languageDistribution: Record<string, number>;
    }>;
    /**
     * Get case management analytics
     */
    getCaseManagementAnalytics(days?: number): Promise<{
        summary: {
            totalCases: number;
            completedCases: number;
            completionRate: number;
            averageTimeToComplete: number;
        };
        casesByType: Record<string, number>;
        casesByPriority: Record<string, number>;
        casesByStatus: Record<string, number>;
        professionalPerformance: any[];
        feedback: {
            averageRating: string | number;
            totalRatings: any;
        };
    }>;
    /**
     * Get professional directory analytics
     */
    getProfessionalAnalytics(): Promise<{
        total: number;
        verified: number;
        unverified: number;
        byType: Record<string, number>;
        averageRating: number;
        topRated: ({
            assignedCases: {
                id: string;
                status: import(".prisma/client").$Enums.AssignmentStatus;
                createdAt: Date;
                updatedAt: Date;
                reportId: string;
                assignedToId: string;
                assignedById: string | null;
                caseType: import(".prisma/client").$Enums.CaseType;
                priority: import(".prisma/client").$Enums.CasePriority;
                dueDate: Date | null;
                notes: string | null;
                completedAt: Date | null;
            }[];
            supportCases: {
                id: string;
                status: import(".prisma/client").$Enums.AssignmentStatus;
                createdAt: Date;
                updatedAt: Date;
                reportId: string;
                assignedToId: string;
                assignedById: string | null;
                caseType: import(".prisma/client").$Enums.CaseType;
                priority: import(".prisma/client").$Enums.CasePriority;
                dueDate: Date | null;
                notes: string | null;
                completedAt: Date | null;
            }[];
            reviews: {
                id: string;
                createdAt: Date;
                rating: number;
                feedback: string | null;
                serviceProviderId: string;
            }[];
        } & {
            description: string | null;
            name: string;
            type: import(".prisma/client").$Enums.ServiceProviderType;
            email: string | null;
            phone: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string | null;
            city: string | null;
            country: string | null;
            website: string | null;
            isVerified: boolean;
            rating: number | null;
            availability: string | null;
            languages: string[];
            specializations: string[];
        })[];
        languageSupport: Record<string, number>;
    }>;
    /**
     * Generate anonymized report for stakeholders
     */
    generateAnonymizedReport(days?: number): Promise<{
        date: Date;
        totalReports: number;
        reportsByCategory: string;
        reportsBySeverity: string;
        resolutionRate: number;
        averageResolutionTime: number;
        anonymousReportCount: number;
        publicReportCount: number;
        casesByType: string;
        uniqueReporters: number;
    }>;
    /**
     * Get high-risk reports for intervention
     */
    getHighRiskInterventionData(): Promise<{
        criticalCaseCount: number;
        reports: ({
            caseAssignment: {
                id: string;
                status: import(".prisma/client").$Enums.AssignmentStatus;
                createdAt: Date;
                updatedAt: Date;
                reportId: string;
                assignedToId: string;
                assignedById: string | null;
                caseType: import(".prisma/client").$Enums.CaseType;
                priority: import(".prisma/client").$Enums.CasePriority;
                dueDate: Date | null;
                notes: string | null;
                completedAt: Date | null;
            } | null;
            reporter: {
                email: string;
                id: string;
            } | null;
        } & {
            description: string;
            title: string;
            language: string;
            id: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.IncidentCategory;
            severity: import(".prisma/client").$Enums.SeverityLevel;
            suggestedCaseType: string | null;
            reporterId: string | null;
            isAnonymous: boolean;
            classificationScore: number | null;
            classificationLabel: string | null;
            suggestedPriority: string | null;
            location: string | null;
            ipAddress: string | null;
            ipHash: string | null;
            deviceFingerprint: string | null;
            riskScore: number;
            flaggedAsRepetitive: boolean;
            isDuplicate: boolean;
            resolvedAt: Date | null;
        })[];
        recommendations: {
            priority: string;
            action: string;
            targetGroup: string;
        }[];
    }>;
    /**
     * Helper: Group array by property
     */
    private groupBy;
    /**
     * Helper: Get daily trend
     */
    private getDailyTrend;
    /**
     * Helper: Get top reporting days
     */
    private getTopReportingDays;
    /**
     * Helper: Calculate average completion time
     */
    private calculateAvgCompletionTime;
    /**
     * Helper: Calculate average response time
     */
    private calculateAverageResponseTime;
    /**
     * Helper: Get professional stats
     */
    private getProfessionalStats;
    /**
     * Helper: Generate intervention recommendations
     */
    private generateInterventionRecommendations;
}
//# sourceMappingURL=analytics.service.d.ts.map