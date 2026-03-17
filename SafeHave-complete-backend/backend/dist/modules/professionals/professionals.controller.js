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
exports.ProfessionalsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const professionals_service_1 = require("./services/professionals.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_service_provider_dto_1 = require("./dtos/create-service-provider.dto");
const client_1 = require("@prisma/client");
let ProfessionalsController = class ProfessionalsController {
    constructor(professionalsService) {
        this.professionalsService = professionalsService;
    }
    async createServiceProvider(dto) {
        return this.professionalsService.createServiceProvider(dto);
    }
    async getServiceProviders(page, limit, type, verified, city, search) {
        return this.professionalsService.getServiceProviders(page, limit, {
            type,
            verified: verified === undefined ? undefined : verified === 'true',
            city,
            search,
        });
    }
    async searchServiceDirectory(query, type, city, language) {
        return this.professionalsService.searchServiceDirectory(query, {
            type,
            city,
            language,
        });
    }
    async getServiceDirectory(type) {
        return this.professionalsService.getServiceDirectory(type);
    }
    async findSpecialists(category, location, language) {
        return this.professionalsService.findSpecialists(category, location, language);
    }
    async getRecommended(caseType, severity, location) {
        return this.professionalsService.getRecommendedProfessionals(caseType, severity, location);
    }
    async getStats() {
        return this.professionalsService.getProfessionalsStats();
    }
    async getServiceProvider(id) {
        return this.professionalsService.getServiceProvider(id);
    }
    async updateServiceProvider(id, dto) {
        return this.professionalsService.updateServiceProvider(id, dto);
    }
    async verifyServiceProvider(id) {
        return this.professionalsService.verifyServiceProvider(id);
    }
    async addReview(id, body) {
        return this.professionalsService.addReview(id, body.rating, body.feedback);
    }
};
exports.ProfessionalsController = ProfessionalsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new service provider' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_provider_dto_1.CreateServiceProviderDto]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "createServiceProvider", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all verified service providers' }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('verified')),
    __param(4, (0, common_1.Query)('city')),
    __param(5, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "getServiceProviders", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search service directory' }),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('city')),
    __param(3, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "searchServiceDirectory", null);
__decorate([
    (0, common_1.Get)('directory'),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete service directory' }),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "getServiceDirectory", null);
__decorate([
    (0, common_1.Get)('specialists'),
    (0, swagger_1.ApiOperation)({
        summary: 'Find specialists by category and location',
    }),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('location')),
    __param(2, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "findSpecialists", null);
__decorate([
    (0, common_1.Get)('recommended'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get recommended professionals for case type',
    }),
    __param(0, (0, common_1.Query)('caseType')),
    __param(1, (0, common_1.Query)('severity')),
    __param(2, (0, common_1.Query)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "getRecommended", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get professionals statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get service provider details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "getServiceProvider", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update service provider information' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "updateServiceProvider", null);
__decorate([
    (0, common_1.Post)(':id/verify'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Verify service provider (admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "verifyServiceProvider", null);
__decorate([
    (0, common_1.Post)(':id/review'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Add review to service provider' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfessionalsController.prototype, "addReview", null);
exports.ProfessionalsController = ProfessionalsController = __decorate([
    (0, swagger_1.ApiTags)('professionals'),
    (0, common_1.Controller)('professionals'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [professionals_service_1.ProfessionalsService])
], ProfessionalsController);
//# sourceMappingURL=professionals.controller.js.map