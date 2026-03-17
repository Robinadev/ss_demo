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
var ReportsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const classification_service_1 = require("../../classification/services/classification.service");
const client_1 = require("@prisma/client");
let ReportsService = ReportsService_1 = class ReportsService {
    constructor(prisma, classificationService) {
        this.prisma = prisma;
        this.classificationService = classificationService;
        this.logger = new common_1.Logger(ReportsService_1.name);
    }
    /**
     * Create new incident report with ML classification
     */
    async createReport(dto, userId) {
        this.logger.log('Creating new report');
        // Classify the report text
        const classification = await this.classificationService.classifyReport(dto.description);
        // Calculate risk score
        const riskScore = await this.classificationService.calculateRiskScore(dto.description, dto.ipAddress || null, dto.deviceFingerprint || null);
        // Hash IP for privacy
        const ipHash = dto.ipAddress
            ? Buffer.from(dto.ipAddress).toString('base64').substring(0, 20)
            : null;
        // Create the report
        const report = await this.prisma.report.create({
            data: {
                reporterId: dto.isAnonymous ? null : userId,
                title: dto.title,
                description: dto.description,
                category: classification.category,
                severity: classification.severity,
                isAnonymous: dto.isAnonymous,
                language: dto.language || 'en',
                location: dto.location || null,
                ipAddress: dto.ipAddress ? dto.ipAddress.substring(0, 50) : null,
                ipHash: ipHash,
                deviceFingerprint: dto.deviceFingerprint || null,
                classificationScore: classification.confidence,
                classificationLabel: classification.category,
                suggestedCaseType: classification.suggestedCaseType,
                suggestedPriority: this.mapSeverityToPriority(classification.severity),
                riskScore: riskScore.riskScore,
                flaggedAsRepetitive: riskScore.isRepetitive,
                isDuplicate: riskScore.isDuplicate,
                status: riskScore.flagged ? client_1.ReportStatus.PENDING_REVIEW : client_1.ReportStatus.PENDING_REVIEW,
            },
            include: {
                reporter: true,
            },
        });
        // Create audit log
        await this.createAuditLog('CREATE_REPORT', report.id, {
            category: classification.category,
            severity: classification.severity,
            riskScore: riskScore.riskScore,
        }, userId, dto.ipAddress);
        this.logger.log(`Report created: ${report.id} (Category: ${classification.category}, Risk: ${riskScore.riskScore})`);
        return {
            ...report,
            classification,
            riskScore,
        };
    }
    /**
     * Get report by ID with full details
     */
    async getReport(reportId) {
        const report = await this.prisma.report.findUnique({
            where: { id: reportId },
            include: {
                reporter: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                evidences: true,
                caseAssignment: {
                    include: {
                        assignedTo: true,
                        supportProviders: true,
                    },
                },
                caseComments: {
                    include: {
                        author: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
        if (!report) {
            throw new common_1.BadRequestException('Report not found');
        }
        return report;
    }
    /**
     * Get all reports with filtering and pagination
     */
    async getAllReports(page = 1, limit = 20, filters) {
        const skip = (page - 1) * limit;
        const where = {
            ...(filters?.status && { status: filters.status }),
            ...(filters?.category && { category: filters.category }),
            ...(filters?.severity && { severity: filters.severity }),
            ...(filters?.flagged !== undefined && {
                flaggedAsRepetitive: filters.flagged,
            }),
        };
        const [reports, total] = await Promise.all([
            this.prisma.report.findMany({
                where,
                skip,
                take: limit,
                include: {
                    reporter: true,
                    caseAssignment: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.report.count({ where }),
        ]);
        return {
            data: reports,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Update report status
     */
    async updateReport(reportId, dto, userId) {
        const report = await this.prisma.report.update({
            where: { id: reportId },
            data: {
                status: dto.status,
                resolvedAt: dto.status === client_1.ReportStatus.RESOLVED ? new Date() : null,
            },
        });
        // Create audit log
        await this.createAuditLog('UPDATE_REPORT', reportId, { status: dto.status }, userId);
        return report;
    }
    /**
     * Get high-risk reports requiring review
     */
    async getHighRiskReports(limit = 50) {
        return this.prisma.report.findMany({
            where: {
                OR: [
                    { flaggedAsRepetitive: true },
                    { isDuplicate: true },
                    { riskScore: { gte: 70 } },
                    { classificationScore: { lt: 0.5 } },
                ],
            },
            orderBy: [{ riskScore: 'desc' }],
            take: limit,
            include: {
                reporter: true,
                caseAssignment: true,
            },
        });
    }
    /**
     * Get report analytics
     */
    async getReportAnalytics(days = 30) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const reports = await this.prisma.report.findMany({
            where: {
                createdAt: { gte: fromDate },
            },
        });
        const byCategory = {};
        const bySeverity = {};
        const byStatus = {};
        reports.forEach((report) => {
            byCategory[report.category] = (byCategory[report.category] || 0) + 1;
            bySeverity[report.severity] = (bySeverity[report.severity] || 0) + 1;
            byStatus[report.status] = (byStatus[report.status] || 0) + 1;
        });
        return {
            totalReports: reports.length,
            byCategory,
            bySeverity,
            byStatus,
            anonymousCount: reports.filter((r) => r.isAnonymous).length,
            averageRiskScore: reports.reduce((acc, r) => acc + r.riskScore, 0) / reports.length,
        };
    }
    /**
     * Add evidence to report
     */
    async addEvidence(reportId, fileUrl, fileName, fileType, fileSize) {
        const evidence = await this.prisma.evidence.create({
            data: {
                reportId,
                fileUrl,
                fileName,
                fileType,
                fileSize,
            },
        });
        // Create audit log
        await this.createAuditLog('ADD_EVIDENCE', reportId, {
            fileName,
            fileSize,
        });
        return evidence;
    }
    /**
     * Create audit log for report actions
     */
    async createAuditLog(action, reportId, changes, userId, ipAddress) {
        try {
            await this.prisma.auditLog.create({
                data: {
                    action,
                    entityType: 'Report',
                    entityId: reportId,
                    changes: JSON.stringify(changes),
                    userId: userId || null,
                    ipAddress: ipAddress?.substring(0, 50) || null,
                },
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.logger.warn(`Failed to create audit log: ${message}`);
        }
    }
    /**
     * Map severity level to priority string
     */
    mapSeverityToPriority(severity) {
        const mapping = {
            CRITICAL: 'CRITICAL',
            HIGH: 'HIGH',
            MEDIUM: 'MEDIUM',
            LOW: 'LOW',
        };
        return mapping[severity] || 'MEDIUM';
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = ReportsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        classification_service_1.ClassificationService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map