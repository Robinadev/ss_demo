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
var CaseManagementService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseManagementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
let CaseManagementService = CaseManagementService_1 = class CaseManagementService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(CaseManagementService_1.name);
    }
    /**
     * Automatically route case to appropriate professional based on classification
     */
    async autoRouteCase(reportId) {
        this.logger.log(`Auto-routing case for report: ${reportId}`);
        const report = await this.prisma.report.findUnique({
            where: { id: reportId },
            include: {
                caseAssignment: true,
            },
        });
        if (!report) {
            throw new common_1.BadRequestException('Report not found');
        }
        if (report.caseAssignment) {
            this.logger.warn(`Case already assigned for report: ${reportId}`);
            return report.caseAssignment;
        }
        // Determine required service provider types based on case type
        const serviceProviderTypes = this.mapCaseTypeToProviders(report.suggestedCaseType);
        // Find available professionals
        const availableProfessionals = await this.findAvailableProfessionals(serviceProviderTypes, report.location ?? undefined);
        if (availableProfessionals.length === 0) {
            this.logger.warn(`No available professionals for case: ${reportId}`);
            return {
                error: 'No available professionals',
                message: 'Case will be reviewed manually',
            };
        }
        // Select primary professional (highest rated, most relevant)
        const primaryProfessional = this.selectBestProfessional(availableProfessionals, report.severity);
        // Create case assignment
        const caseAssignment = await this.prisma.caseAssignment.create({
            data: {
                reportId,
                assignedToId: primaryProfessional.id,
                caseType: report.suggestedCaseType,
                priority: this.mapSeverityToPriority(report.severity),
                dueDate: this.calculateDueDate(report.severity),
                notes: `Auto-routed case: ${report.category}. ${report.severity} severity. Suggested support: ${report.suggestedCaseType}`,
                status: client_1.AssignmentStatus.ACTIVE,
            },
            include: {
                assignedTo: true,
                supportProviders: true,
            },
        });
        // Link other relevant service providers
        const otherProviders = availableProfessionals
            .filter((p) => p.id !== primaryProfessional.id)
            .slice(0, 2); // Add up to 2 more providers
        for (const provider of otherProviders) {
            await this.prisma.caseAssignment.update({
                where: { id: caseAssignment.id },
                data: {
                    supportProviders: {
                        connect: { id: provider.id },
                    },
                },
            });
        }
        this.logger.log(`Case auto-routed to ${primaryProfessional.name} (ID: ${primaryProfessional.id})`);
        return caseAssignment;
    }
    /**
     * Manually assign case to specific professional
     */
    async assignCase(reportId, dto, adminId) {
        this.logger.log(`Manual case assignment by admin ${adminId} for report ${reportId}`);
        const [report, professional] = await Promise.all([
            this.prisma.report.findUnique({ where: { id: reportId } }),
            this.prisma.serviceProvider.findUnique({
                where: { id: dto.assignedToId },
            }),
        ]);
        if (!report) {
            throw new common_1.BadRequestException('Report not found');
        }
        if (!professional) {
            throw new common_1.BadRequestException('Professional not found');
        }
        // Delete existing assignment if present
        const existing = await this.prisma.caseAssignment.findUnique({
            where: { reportId },
        });
        if (existing) {
            await this.prisma.caseAssignment.delete({ where: { id: existing.id } });
        }
        // Create new assignment
        const caseAssignment = await this.prisma.caseAssignment.create({
            data: {
                reportId,
                assignedToId: dto.assignedToId,
                assignedById: adminId,
                caseType: dto.caseType,
                priority: dto.priority || client_1.CasePriority.MEDIUM,
                notes: dto.notes,
                status: client_1.AssignmentStatus.ACTIVE,
            },
            include: {
                assignedTo: true,
            },
        });
        // Update report status
        await this.prisma.report.update({
            where: { id: reportId },
            data: {
                status: 'ASSIGNED_TO_PROFESSIONAL',
            },
        });
        this.logger.log(`Case manually assigned to ${professional.name}`);
        return caseAssignment;
    }
    /**
     * Get all cases for a professional
     */
    async getCasesForProfessional(professionalId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [cases, total] = await Promise.all([
            this.prisma.caseAssignment.findMany({
                where: {
                    assignedToId: professionalId,
                    status: client_1.AssignmentStatus.ACTIVE,
                },
                include: {
                    report: {
                        include: {
                            reporter: true,
                            caseComments: true,
                        },
                    },
                    assignedTo: true,
                    feedbacks: true,
                },
                orderBy: {
                    priority: 'desc',
                },
                skip,
                take: limit,
            }),
            this.prisma.caseAssignment.count({
                where: {
                    assignedToId: professionalId,
                    status: client_1.AssignmentStatus.ACTIVE,
                },
            }),
        ]);
        return {
            data: cases,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Update case status
     */
    async updateCaseStatus(caseId, newStatus, _feedback) {
        const caseAssignment = await this.prisma.caseAssignment.update({
            where: { id: caseId },
            data: {
                status: newStatus,
                completedAt: newStatus === client_1.AssignmentStatus.COMPLETED ? new Date() : null,
            },
            include: {
                report: true,
            },
        });
        // Update report status if case completed
        if (newStatus === client_1.AssignmentStatus.COMPLETED) {
            await this.prisma.report.update({
                where: { id: caseAssignment.reportId },
                data: {
                    status: 'RESOLVED',
                    resolvedAt: new Date(),
                },
            });
        }
        return caseAssignment;
    }
    /**
     * Find available professionals by type and location
     */
    async findAvailableProfessionals(providerTypes, _location) {
        const professionals = await this.prisma.serviceProvider.findMany({
            where: {
                type: { in: providerTypes },
                isVerified: true,
                AND: [
                    {
                        OR: [
                            { availability: { contains: 'available' } },
                            { availability: { contains: 'open' } },
                        ],
                    },
                ],
            },
            include: {
                reviews: true,
            },
            orderBy: {
                rating: 'desc',
            },
            take: 10,
        });
        return professionals;
    }
    /**
     * Select best professional based on rating, experience, and case severity
     */
    selectBestProfessional(professionals, severity) {
        // Weight selection based on severity and ratings
        let bestScore = -1;
        let selected = professionals[0];
        for (const professional of professionals) {
            let score = professional.rating || 0;
            // Critical cases: prioritize high-rated specialists
            if (severity === 'CRITICAL') {
                score = (professional.rating || 0) * 2;
            }
            // Check if professional has relevant specialization
            if (professional.specializations &&
                professional.specializations.length > 0) {
                score += 1;
            }
            if (score > bestScore) {
                bestScore = score;
                selected = professional;
            }
        }
        return selected;
    }
    /**
     * Map case type to required service provider types
     */
    mapCaseTypeToProviders(caseType) {
        const mapping = {
            [client_1.CaseType.COUNSELING]: [client_1.ServiceProviderType.COUNSELOR],
            [client_1.CaseType.MEDICAL_SUPPORT]: [client_1.ServiceProviderType.MEDICAL_PROFESSIONAL],
            [client_1.CaseType.LEGAL_ASSISTANCE]: [client_1.ServiceProviderType.LEGAL_ADVISOR],
            [client_1.CaseType.EMERGENCY_SUPPORT]: [
                client_1.ServiceProviderType.NGO,
                client_1.ServiceProviderType.GOVERNMENT_AGENCY,
            ],
            [client_1.CaseType.PREVENTION_EDUCATION]: [client_1.ServiceProviderType.NGO],
            [client_1.CaseType.RESOURCE_REFERRAL]: [client_1.ServiceProviderType.HOTLINE],
            [client_1.CaseType.COMBINED_SUPPORT]: [
                client_1.ServiceProviderType.COUNSELOR,
                client_1.ServiceProviderType.MEDICAL_PROFESSIONAL,
                client_1.ServiceProviderType.LEGAL_ADVISOR,
            ],
        };
        return mapping[caseType] || [client_1.ServiceProviderType.NGO];
    }
    /**
     * Map severity to case priority
     */
    mapSeverityToPriority(severity) {
        const mapping = {
            CRITICAL: client_1.CasePriority.CRITICAL,
            HIGH: client_1.CasePriority.HIGH,
            MEDIUM: client_1.CasePriority.MEDIUM,
            LOW: client_1.CasePriority.LOW,
        };
        return mapping[severity] || client_1.CasePriority.MEDIUM;
    }
    /**
     * Calculate due date based on severity
     */
    calculateDueDate(severity) {
        const date = new Date();
        switch (severity) {
            case 'CRITICAL':
                date.setDate(date.getDate() + 1); // 1 day
                break;
            case 'HIGH':
                date.setDate(date.getDate() + 3); // 3 days
                break;
            case 'MEDIUM':
                date.setDate(date.getDate() + 7); // 7 days
                break;
            default:
                date.setDate(date.getDate() + 14); // 14 days
        }
        return date;
    }
    /**
     * Get case statistics
     */
    async getCaseStats() {
        const stats = await this.prisma.caseAssignment.groupBy({
            by: ['caseType', 'priority', 'status'],
            _count: true,
        });
        return {
            byType: stats,
            averageResolutionDays: 7, // Placeholder
        };
    }
};
exports.CaseManagementService = CaseManagementService;
exports.CaseManagementService = CaseManagementService = CaseManagementService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CaseManagementService);
//# sourceMappingURL=case-management.service.js.map