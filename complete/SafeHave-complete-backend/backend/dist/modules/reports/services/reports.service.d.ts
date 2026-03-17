import { PrismaService } from '../../../common/prisma/prisma.service';
import { ClassificationService } from '../../classification/services/classification.service';
import { CreateReportDto } from '../dtos/create-report.dto';
import { UpdateReportDto } from '../dtos/update-report.dto';
import { IncidentCategory, ReportStatus, SeverityLevel } from '@prisma/client';
export declare class ReportsService {
    private prisma;
    private classificationService;
    private readonly logger;
    constructor(prisma: PrismaService, classificationService: ClassificationService);
    /**
     * Create new incident report with ML classification
     */
    createReport(dto: CreateReportDto, userId?: string): Promise<{
        classification: import("../../classification/services/classification.service").ClassificationResult;
        riskScore: import("../../classification/services/classification.service").RiskScoreResult;
        reporter: {
            email: string;
            password: string | null;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            language: string;
            id: string;
            status: import(".prisma/client").$Enums.UserStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
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
        flaggedAsRepetitive: boolean;
        isDuplicate: boolean;
        resolvedAt: Date | null;
    }>;
    /**
     * Get report by ID with full details
     */
    getReport(reportId: string): Promise<{
        caseAssignment: ({
            assignedTo: {
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
            };
            supportProviders: {
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
            }[];
        } & {
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
        }) | null;
        caseComments: ({
            author: {
                email: string;
                password: string | null;
                firstName: string | null;
                lastName: string | null;
                phone: string | null;
                role: import(".prisma/client").$Enums.UserRole;
                language: string;
                id: string;
                status: import(".prisma/client").$Enums.UserStatus;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            reportId: string;
            authorId: string;
            content: string;
            isPublic: boolean;
        })[];
        reporter: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            id: string;
        } | null;
        evidences: {
            description: string | null;
            id: string;
            createdAt: Date;
            reportId: string;
            fileUrl: string;
            fileName: string;
            fileType: string;
            fileSize: number;
        }[];
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
    }>;
    /**
     * Get all reports with filtering and pagination
     */
    getAllReports(page?: number, limit?: number, filters?: {
        status?: ReportStatus;
        category?: IncidentCategory;
        severity?: SeverityLevel;
        flagged?: boolean;
    }): Promise<{
        data: ({
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
                password: string | null;
                firstName: string | null;
                lastName: string | null;
                phone: string | null;
                role: import(".prisma/client").$Enums.UserRole;
                language: string;
                id: string;
                status: import(".prisma/client").$Enums.UserStatus;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
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
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    /**
     * Update report status
     */
    updateReport(reportId: string, dto: UpdateReportDto, userId?: string): Promise<{
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
    }>;
    /**
     * Get high-risk reports requiring review
     */
    getHighRiskReports(limit?: number): Promise<({
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
            password: string | null;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            language: string;
            id: string;
            status: import(".prisma/client").$Enums.UserStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
    })[]>;
    /**
     * Get report analytics
     */
    getReportAnalytics(days?: number): Promise<{
        totalReports: number;
        byCategory: Record<string, number>;
        bySeverity: Record<string, number>;
        byStatus: Record<string, number>;
        anonymousCount: number;
        averageRiskScore: number;
    }>;
    /**
     * Add evidence to report
     */
    addEvidence(reportId: string, fileUrl: string, fileName: string, fileType: string, fileSize: number): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        reportId: string;
        fileUrl: string;
        fileName: string;
        fileType: string;
        fileSize: number;
    }>;
    /**
     * Create audit log for report actions
     */
    private createAuditLog;
    /**
     * Map severity level to priority string
     */
    private mapSeverityToPriority;
}
//# sourceMappingURL=reports.service.d.ts.map