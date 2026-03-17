import { PrismaService } from '../../../common/prisma/prisma.service';
import { AssignmentStatus } from '@prisma/client';
import { CreateCaseAssignmentDto } from '../dtos/create-case-assignment.dto';
export declare class CaseManagementService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    /**
     * Automatically route case to appropriate professional based on classification
     */
    autoRouteCase(reportId: string): Promise<any>;
    /**
     * Manually assign case to specific professional
     */
    assignCase(reportId: string, dto: CreateCaseAssignmentDto, adminId: string): Promise<any>;
    /**
     * Get all cases for a professional
     */
    getCasesForProfessional(professionalId: string, page?: number, limit?: number): Promise<{
        data: ({
            report: {
                caseComments: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    reportId: string;
                    authorId: string;
                    content: string;
                    isPublic: boolean;
                }[];
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
            };
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
            feedbacks: {
                id: string;
                createdAt: Date;
                rating: number;
                caseAssignmentId: string;
                feedback: string | null;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    /**
     * Update case status
     */
    updateCaseStatus(caseId: string, newStatus: AssignmentStatus, _feedback?: string): Promise<{
        report: {
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
        };
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
    }>;
    /**
     * Find available professionals by type and location
     */
    private findAvailableProfessionals;
    /**
     * Select best professional based on rating, experience, and case severity
     */
    private selectBestProfessional;
    /**
     * Map case type to required service provider types
     */
    private mapCaseTypeToProviders;
    /**
     * Map severity to case priority
     */
    private mapSeverityToPriority;
    /**
     * Calculate due date based on severity
     */
    private calculateDueDate;
    /**
     * Get case statistics
     */
    getCaseStats(): Promise<{
        byType: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.CaseAssignmentGroupByOutputType, ("status" | "caseType" | "priority")[]> & {
            _count: number;
        })[];
        averageResolutionDays: number;
    }>;
}
//# sourceMappingURL=case-management.service.d.ts.map