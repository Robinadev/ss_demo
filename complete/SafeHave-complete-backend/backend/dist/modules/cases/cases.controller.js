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
exports.CasesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const case_management_service_1 = require("./services/case-management.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_case_assignment_dto_1 = require("./dtos/create-case-assignment.dto");
let CasesController = class CasesController {
    constructor(caseService) {
        this.caseService = caseService;
    }
    async autoRouteCase(reportId) {
        return this.caseService.autoRouteCase(reportId);
    }
    async assignCase(reportId, dto, req) {
        return this.caseService.assignCase(reportId, dto, req.user.id);
    }
    async getCasesForProfessional(professionalId, page, limit) {
        return this.caseService.getCasesForProfessional(professionalId, page, limit);
    }
    async updateCaseStatus(caseId, body) {
        return this.caseService.updateCaseStatus(caseId, body.status, body.feedback);
    }
    async getCaseStats() {
        return this.caseService.getCaseStats();
    }
};
exports.CasesController = CasesController;
__decorate([
    (0, common_1.Post)('auto-route/:reportId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Automatically route case to appropriate professional',
    }),
    __param(0, (0, common_1.Param)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CasesController.prototype, "autoRouteCase", null);
__decorate([
    (0, common_1.Post)('assign/:reportId'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually assign case to a professional' }),
    __param(0, (0, common_1.Param)('reportId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_case_assignment_dto_1.CreateCaseAssignmentDto, Object]),
    __metadata("design:returntype", Promise)
], CasesController.prototype, "assignCase", null);
__decorate([
    (0, common_1.Get)('professional/:professionalId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all cases assigned to a professional',
    }),
    __param(0, (0, common_1.Param)('professionalId')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CasesController.prototype, "getCasesForProfessional", null);
__decorate([
    (0, common_1.Put)(':caseId/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update case status' }),
    __param(0, (0, common_1.Param)('caseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CasesController.prototype, "updateCaseStatus", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get case statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CasesController.prototype, "getCaseStats", null);
exports.CasesController = CasesController = __decorate([
    (0, swagger_1.ApiTags)('cases'),
    (0, common_1.Controller)('cases'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [case_management_service_1.CaseManagementService])
], CasesController);
//# sourceMappingURL=cases.controller.js.map