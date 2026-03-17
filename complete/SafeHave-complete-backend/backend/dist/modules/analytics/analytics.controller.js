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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./services/analytics.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getDashboardAnalytics(days) {
        return this.analyticsService.getDashboardAnalytics(days);
    }
    async getIncidentAnalytics(days) {
        return this.analyticsService.getIncidentAnalytics(days);
    }
    async getCaseManagementAnalytics(days) {
        return this.analyticsService.getCaseManagementAnalytics(days);
    }
    async getProfessionalAnalytics() {
        return this.analyticsService.getProfessionalAnalytics();
    }
    async getHighRiskData() {
        return this.analyticsService.getHighRiskInterventionData();
    }
    async generateAnonymizedReport(days) {
        return this.analyticsService.generateAnonymizedReport(days);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard analytics' }),
    __param(0, (0, common_1.Query)('days', new common_1.DefaultValuePipe(30), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getDashboardAnalytics", null);
__decorate([
    (0, common_1.Get)('incidents'),
    (0, swagger_1.ApiOperation)({ summary: 'Get incident analytics' }),
    __param(0, (0, common_1.Query)('days', new common_1.DefaultValuePipe(30), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getIncidentAnalytics", null);
__decorate([
    (0, common_1.Get)('cases'),
    (0, swagger_1.ApiOperation)({ summary: 'Get case management analytics' }),
    __param(0, (0, common_1.Query)('days', new common_1.DefaultValuePipe(30), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getCaseManagementAnalytics", null);
__decorate([
    (0, common_1.Get)('professionals'),
    (0, swagger_1.ApiOperation)({ summary: 'Get professional directory analytics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getProfessionalAnalytics", null);
__decorate([
    (0, common_1.Get)('high-risk'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get high-risk intervention data',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getHighRiskData", null);
__decorate([
    (0, common_1.Get)('report/anonymized'),
    (0, swagger_1.ApiOperation)({
        summary: 'Generate anonymized report for stakeholders',
    }),
    __param(0, (0, common_1.Query)('days', new common_1.DefaultValuePipe(30), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "generateAnonymizedReport", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('analytics'),
    (0, common_1.Controller)('analytics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map