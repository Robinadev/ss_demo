import { CaseManagementService } from './services/case-management.service';
import { CreateCaseAssignmentDto } from './dtos/create-case-assignment.dto';
import { AssignmentStatus } from '@prisma/client';
export declare class CasesController {
    private caseService;
    constructor(caseService: CaseManagementService);
    autoRouteCase(reportId: string): Promise<any>;
    assignCase(reportId: string, dto: CreateCaseAssignmentDto, req: any): Promise<any>;
    getCasesForProfessional(professionalId: string, page: number, limit: number): Promise<{
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
    updateCaseStatus(caseId: string, body: {
        status: AssignmentStatus;
        feedback?: string;
    }): Promise<{
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
    getCaseStats(): Promise<{
        byType: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.CaseAssignmentGroupByOutputType, ("status" | "caseType" | "priority")[]> & {
            _count: number;
        })[];
        averageResolutionDays: number;
    }>;
}
//# sourceMappingURL=cases.controller.d.ts.map