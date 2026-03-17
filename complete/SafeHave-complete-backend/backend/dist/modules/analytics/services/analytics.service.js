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
var AnalyticsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let AnalyticsService = AnalyticsService_1 = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AnalyticsService_1.name);
    }
    /**
     * Get comprehensive dashboard analytics
     */
    async getDashboardAnalytics(days = 30) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const [reports, cases, professionals] = await Promise.all([
            this.prisma.report.findMany({
                where: { createdAt: { gte: fromDate } },
            }),
            this.prisma.caseAssignment.findMany({
                where: { createdAt: { gte: fromDate } },
                include: { report: true },
            }),
            this.prisma.serviceProvider.findMany({
                where: { isVerified: true },
            }),
        ]);
        const categoryCount = this.groupBy(reports, 'category');
        const severityCount = this.groupBy(reports, 'severity');
        const statusCount = this.groupBy(reports, 'status');
        const criticalReports = reports.filter((r) => r.severity === 'CRITICAL').length;
        const resolvedReports = reports.filter((r) => r.status === 'RESOLVED').length;
        const resolutionRate = reports.length > 0
            ? ((resolvedReports / reports.length) * 100).toFixed(2)
            : 0;
        const flaggedReports = reports.filter((r) => r.flaggedAsRepetitive || r.isDuplicate).length;
        return {
            summary: {
                totalReports: reports.length,
                criticalCases: criticalReports,
                resolutionRate: parseFloat(resolutionRate),
                flaggedReports,
                activeProfessionals: professionals.length,
                averageResponseTime: this.calculateAverageResponseTime(cases),
            },
            reportsByCategory: categoryCount,
            reportsBySeverity: severityCount,
            reportsByStatus: statusCount,
            recentReports: reports
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, 10),
            riskyReports: reports
                .filter((r) => r.riskScore >= 50)
                .sort((a, b) => b.riskScore - a.riskScore)
                .slice(0, 5),
        };
    }
    /**
     * Get detailed incident analytics
     */
    async getIncidentAnalytics(days = 30) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const reports = await this.prisma.report.findMany({
            where: { createdAt: { gte: fromDate } },
            include: { reporter: true },
        });
        const dailyTrend = this.getDailyTrend(reports, days);
        const categoryDistribution = this.groupBy(reports, 'category');
        const severityDistribution = this.groupBy(reports, 'severity');
        const anonymousCount = reports.filter((r) => r.isAnonymous).length;
        const reportedCount = reports.length - anonymousCount;
        const highRiskCount = reports.filter((r) => r.riskScore >= 70).length;
        const mediumRiskCount = reports.filter((r) => r.riskScore >= 40 && r.riskScore < 70).length;
        const lowRiskCount = reports.filter((r) => r.riskScore < 40).length;
        return {
            period: { from: fromDate, to: new Date() },
            totalReports: reports.length,
            anonymousVsReported: {
                anonymous: anonymousCount,
                reported: reportedCount,
            },
            riskDistribution: {
                high: highRiskCount,
                medium: mediumRiskCount,
                low: lowRiskCount,
            },
            categoryDistribution,
            severityDistribution,
            dailyTrend,
            topReportingDays: this.getTopReportingDays(reports),
            languageDistribution: this.groupBy(reports, 'language'),
        };
    }
    /**
     * Get case management analytics
     */
    async getCaseManagementAnalytics(days = 30) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const cases = await this.prisma.caseAssignment.findMany({
            where: { createdAt: { gte: fromDate } },
            include: {
                report: true,
                assignedTo: true,
                feedbacks: true,
            },
        });
        const casesByType = this.groupBy(cases, 'caseType');
        const casesByPriority = this.groupBy(cases, 'priority');
        const casesByStatus = this.groupBy(cases, 'status');
        const completedCases = cases.filter((c) => c.status === 'COMPLETED');
        const completionRate = cases.length > 0
            ? ((completedCases.length / cases.length) * 100).toFixed(2)
            : 0;
        const avgTimeToComplete = this.calculateAvgCompletionTime(completedCases);
        // Professional performance
        const professionalStats = this.getProfessionalStats(cases);
        return {
            summary: {
                totalCases: cases.length,
                completedCases: completedCases.length,
                completionRate: parseFloat(completionRate),
                averageTimeToComplete: avgTimeToComplete,
            },
            casesByType,
            casesByPriority,
            casesByStatus,
            professionalPerformance: professionalStats.slice(0, 10),
            feedback: {
                averageRating: cases.length > 0
                    ? (cases.reduce((acc, c) => {
                        const ratings = c.feedbacks.map((f) => f.rating);
                        const avg = ratings.length > 0
                            ? ratings.reduce((a, b) => a + b, 0) / ratings.length
                            : 0;
                        return acc + avg;
                    }, 0) / cases.length).toFixed(2)
                    : 0,
                totalRatings: cases.reduce((acc, c) => acc + c.feedbacks.length, 0),
            },
        };
    }
    /**
     * Get professional directory analytics
     */
    async getProfessionalAnalytics() {
        const professionals = await this.prisma.serviceProvider.findMany({
            include: {
                reviews: true,
                assignedCases: true,
                supportCases: true,
            },
        });
        const byType = this.groupBy(professionals, 'type');
        const verified = professionals.filter((p) => p.isVerified).length;
        const unverified = professionals.length - verified;
        const avgRating = professionals.length > 0
            ? (professionals.reduce((acc, p) => acc + (p.rating || 0), 0) /
                professionals.length).toFixed(2)
            : 0;
        const topRated = professionals
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 10);
        const languageCount = {};
        professionals.forEach((p) => {
            p.languages.forEach((lang) => {
                languageCount[lang] = (languageCount[lang] || 0) + 1;
            });
        });
        return {
            total: professionals.length,
            verified,
            unverified,
            byType,
            averageRating: parseFloat(avgRating),
            topRated,
            languageSupport: languageCount,
        };
    }
    /**
     * Generate anonymized report for stakeholders
     */
    async generateAnonymizedReport(days = 30) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const reports = await this.prisma.report.findMany({
            where: { createdAt: { gte: fromDate } },
        });
        const cases = await this.prisma.caseAssignment.findMany({
            where: { createdAt: { gte: fromDate } },
        });
        // Create anonymized snapshot
        const snapshot = {
            date: new Date(),
            totalReports: reports.length,
            reportsByCategory: JSON.stringify(this.groupBy(reports, 'category')),
            reportsBySeverity: JSON.stringify(this.groupBy(reports, 'severity')),
            resolutionRate: reports.length > 0
                ? Number(((reports.filter((r) => r.status === 'RESOLVED').length /
                    reports.length) *
                    100).toFixed(2))
                : 0,
            averageResolutionTime: this.calculateAverageResponseTime(cases),
            anonymousReportCount: reports.filter((r) => r.isAnonymous).length,
            publicReportCount: reports.filter((r) => !r.isAnonymous).length,
            casesByType: JSON.stringify(this.groupBy(cases, 'caseType')),
            uniqueReporters: new Set(reports.map((r) => r.reporterId)).size,
        };
        await this.prisma.analyticsSnapshot.create({
            data: snapshot,
        });
        return snapshot;
    }
    /**
     * Get high-risk reports for intervention
     */
    async getHighRiskInterventionData() {
        const highRiskReports = await this.prisma.report.findMany({
            where: {
                OR: [
                    { severity: 'CRITICAL' },
                    { riskScore: { gte: 80 } },
                    { flaggedAsRepetitive: true },
                ],
            },
            include: {
                reporter: { select: { id: true, email: true } },
                caseAssignment: true,
            },
            orderBy: { riskScore: 'desc' },
            take: 50,
        });
        return {
            criticalCaseCount: highRiskReports.length,
            reports: highRiskReports,
            recommendations: this.generateInterventionRecommendations(highRiskReports),
        };
    }
    /**
     * Helper: Group array by property
     */
    groupBy(array, property) {
        return array.reduce((acc, item) => {
            const key = item[property];
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    }
    /**
     * Helper: Get daily trend
     */
    getDailyTrend(reports, days) {
        const trend = {};
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            trend[dateStr] = 0;
        }
        reports.forEach((report) => {
            const dateStr = report.createdAt.toISOString().split('T')[0];
            if (trend[dateStr] !== undefined) {
                trend[dateStr]++;
            }
        });
        return trend;
    }
    /**
     * Helper: Get top reporting days
     */
    getTopReportingDays(reports) {
        const dayCount = {};
        reports.forEach((report) => {
            const day = report.createdAt.toISOString().split('T')[0];
            dayCount[day] = (dayCount[day] || 0) + 1;
        });
        return Object.entries(dayCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 7)
            .map(([day, count]) => ({ day, count }));
    }
    /**
     * Helper: Calculate average completion time
     */
    calculateAvgCompletionTime(cases) {
        if (cases.length === 0)
            return 0;
        const times = cases.map((c) => {
            const start = new Date(c.createdAt).getTime();
            const end = new Date(c.completedAt || new Date()).getTime();
            return (end - start) / (1000 * 60 * 60 * 24); // Days
        });
        return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    }
    /**
     * Helper: Calculate average response time
     */
    calculateAverageResponseTime(cases) {
        if (cases.length === 0)
            return 0;
        const times = cases.map((c) => {
            const start = new Date(c.createdAt).getTime();
            const end = new Date(c.dueDate || new Date()).getTime();
            return (end - start) / (1000 * 60 * 60 * 24); // Days
        });
        return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    }
    /**
     * Helper: Get professional stats
     */
    getProfessionalStats(cases) {
        const stats = {};
        cases.forEach((caseItem) => {
            const profId = caseItem.assignedToId;
            if (!stats[profId]) {
                stats[profId] = {
                    id: profId,
                    name: caseItem.assignedTo.name,
                    totalCases: 0,
                    completedCases: 0,
                    averageRating: 0,
                };
            }
            stats[profId].totalCases++;
            if (caseItem.status === 'COMPLETED') {
                stats[profId].completedCases++;
            }
            if (caseItem.feedbacks.length > 0) {
                const ratings = caseItem.feedbacks.map((f) => f.rating);
                stats[profId].averageRating =
                    ratings.reduce((a, b) => a + b, 0) / ratings.length;
            }
        });
        return Object.values(stats)
            .sort((a, b) => b.completedCases - a.completedCases);
    }
    /**
     * Helper: Generate intervention recommendations
     */
    generateInterventionRecommendations(reports) {
        const recommendations = [];
        const urgentReports = reports.filter((r) => r.severity === 'CRITICAL');
        if (urgentReports.length > 0) {
            recommendations.push({
                priority: 'URGENT',
                action: `${urgentReports.length} critical cases require immediate intervention`,
                targetGroup: 'Case Managers',
            });
        }
        const flaggedReports = reports.filter((r) => r.flaggedAsRepetitive || r.isDuplicate);
        if (flaggedReports.length > 0) {
            recommendations.push({
                priority: 'HIGH',
                action: `${flaggedReports.length} reports flagged for duplicate/fraud review`,
                targetGroup: 'Compliance Team',
            });
        }
        const unassignedReports = reports.filter((r) => !r.caseAssignment);
        if (unassignedReports.length > 0) {
            recommendations.push({
                priority: 'MEDIUM',
                action: `${unassignedReports.length} reports awaiting case assignment`,
                targetGroup: 'Case Assignment Team',
            });
        }
        return recommendations;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = AnalyticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map