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
var ProfessionalsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProfessionalsService = ProfessionalsService_1 = class ProfessionalsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ProfessionalsService_1.name);
    }
    /**
     * Create or update service provider (counselor, doctor, lawyer, etc.)
     */
    async createServiceProvider(dto) {
        this.logger.log(`Creating service provider: ${dto.name}`);
        const serviceProvider = await this.prisma.serviceProvider.create({
            data: {
                name: dto.name,
                type: dto.type,
                email: dto.email || null,
                phone: dto.phone || null,
                address: dto.address || null,
                city: dto.city || null,
                country: dto.country || null,
                description: dto.description || null,
                website: dto.website || null,
                isVerified: false, // Must be verified by admin
                languages: dto.languages || ['en'],
                specializations: dto.specializations || [],
                availability: dto.availability || 'available',
            },
        });
        this.logger.log(`Service provider created: ${serviceProvider.id}`);
        return serviceProvider;
    }
    /**
     * Get all service providers with filtering
     */
    async getServiceProviders(page = 1, limit = 20, filters) {
        const skip = (page - 1) * limit;
        const where = {
            ...(filters?.type && { type: filters.type }),
            ...(filters?.verified !== undefined && { isVerified: filters.verified }),
            ...(filters?.city && { city: filters.city }),
            ...(filters?.search && {
                OR: [
                    {
                        name: {
                            contains: filters.search,
                            mode: client_1.Prisma.QueryMode.insensitive,
                        },
                    },
                    {
                        description: {
                            contains: filters.search,
                            mode: client_1.Prisma.QueryMode.insensitive,
                        },
                    },
                ],
            }),
        };
        const [providers, total] = await Promise.all([
            this.prisma.serviceProvider.findMany({
                where,
                skip,
                take: limit,
                include: {
                    reviews: true,
                },
                orderBy: {
                    rating: 'desc',
                },
            }),
            this.prisma.serviceProvider.count({ where }),
        ]);
        return {
            data: providers,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Get service provider by ID
     */
    async getServiceProvider(id) {
        const provider = await this.prisma.serviceProvider.findUnique({
            where: { id },
            include: {
                reviews: {
                    orderBy: { createdAt: 'desc' },
                },
                assignedCases: true,
                supportCases: true,
            },
        });
        if (!provider) {
            throw new common_1.BadRequestException('Service provider not found');
        }
        return provider;
    }
    /**
     * Update service provider
     */
    async updateServiceProvider(id, dto) {
        const provider = await this.prisma.serviceProvider.update({
            where: { id },
            data: {
                ...(dto.name && { name: dto.name }),
                ...(dto.email && { email: dto.email }),
                ...(dto.phone && { phone: dto.phone }),
                ...(dto.city && { city: dto.city }),
                ...(dto.country && { country: dto.country }),
                ...(dto.description && { description: dto.description }),
                ...(dto.website && { website: dto.website }),
                ...(dto.languages && { languages: dto.languages }),
                ...(dto.specializations && {
                    specializations: dto.specializations,
                }),
                ...(dto.availability && { availability: dto.availability }),
            },
        });
        return provider;
    }
    /**
     * Verify service provider (admin only)
     */
    async verifyServiceProvider(id) {
        this.logger.log(`Verifying service provider: ${id}`);
        const provider = await this.prisma.serviceProvider.update({
            where: { id },
            data: { isVerified: true },
        });
        return provider;
    }
    /**
     * Add review to service provider
     */
    async addReview(providerId, rating, feedback) {
        const review = await this.prisma.serviceProviderReview.create({
            data: {
                serviceProviderId: providerId,
                rating: Math.min(Math.max(rating, 1), 5),
                feedback: feedback || null,
            },
        });
        // Update provider's average rating
        const reviews = await this.prisma.serviceProviderReview.findMany({
            where: { serviceProviderId: providerId },
        });
        const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        await this.prisma.serviceProvider.update({
            where: { id: providerId },
            data: { rating: averageRating },
        });
        this.logger.log(`Review added for provider ${providerId}, new rating: ${averageRating}`);
        return review;
    }
    /**
     * Find specialists by category and location
     */
    async findSpecialists(category, location, language) {
        const where = {
            isVerified: true,
            specializations: {
                hasSome: [category],
            },
        };
        if (location) {
            where.city = location;
        }
        if (language) {
            where.languages = { hasSome: [language] };
        }
        return this.prisma.serviceProvider.findMany({
            where,
            include: {
                reviews: true,
            },
            orderBy: [{ rating: 'desc' }, { name: 'asc' }],
        });
    }
    /**
     * Get recommended professionals for case type
     */
    async getRecommendedProfessionals(caseType, severity, location) {
        // Map case type to required professional types
        const typeMapping = {
            COUNSELING: [client_1.ServiceProviderType.COUNSELOR],
            MEDICAL_SUPPORT: [client_1.ServiceProviderType.MEDICAL_PROFESSIONAL],
            LEGAL_ASSISTANCE: [client_1.ServiceProviderType.LEGAL_ADVISOR],
            EMERGENCY_SUPPORT: [
                client_1.ServiceProviderType.NGO,
                client_1.ServiceProviderType.GOVERNMENT_AGENCY,
            ],
            COMBINED_SUPPORT: [
                client_1.ServiceProviderType.COUNSELOR,
                client_1.ServiceProviderType.MEDICAL_PROFESSIONAL,
                client_1.ServiceProviderType.LEGAL_ADVISOR,
            ],
        };
        const requiredTypes = typeMapping[caseType] || [];
        const professionals = await this.prisma.serviceProvider.findMany({
            where: {
                type: { in: requiredTypes },
                isVerified: true,
                ...(location && { city: location }),
            },
            include: {
                reviews: true,
            },
            orderBy: [{ rating: 'desc' }],
            take: 5,
        });
        // Prioritize based on severity
        if (severity === 'CRITICAL') {
            return professionals.filter((p) => p.rating && p.rating >= 4);
        }
        return professionals;
    }
    /**
     * Get service directory by type
     */
    async getServiceDirectory(type) {
        const where = type ? { type } : {};
        const services = await this.prisma.serviceProvider.findMany({
            where: {
                ...where,
                isVerified: true,
            },
            include: {
                reviews: true,
            },
            orderBy: {
                rating: 'desc',
            },
        });
        // Group by type
        const grouped = {};
        services.forEach((service) => {
            if (!grouped[service.type]) {
                grouped[service.type] = [];
            }
            grouped[service.type].push(service);
        });
        return grouped;
    }
    /**
     * Search service directory
     */
    async searchServiceDirectory(query, filters) {
        const where = {
            isVerified: true,
            ...(filters?.type && { type: filters.type }),
            ...(filters?.city && { city: filters.city }),
            ...(filters?.language && { languages: { hasSome: [filters.language] } }),
            OR: [
                {
                    name: {
                        contains: query,
                        mode: client_1.Prisma.QueryMode.insensitive,
                    },
                },
                {
                    description: {
                        contains: query,
                        mode: client_1.Prisma.QueryMode.insensitive,
                    },
                },
                {
                    specializations: {
                        hasSome: [query],
                    },
                },
            ],
        };
        return this.prisma.serviceProvider.findMany({
            where,
            include: {
                reviews: true,
            },
            take: 20,
        });
    }
    /**
     * Get professionals statistics
     */
    async getProfessionalsStats() {
        const stats = await this.prisma.serviceProvider.groupBy({
            by: ['type'],
            _count: true,
        });
        const verified = await this.prisma.serviceProvider.count({
            where: { isVerified: true },
        });
        const totalCount = await this.prisma.serviceProvider.count();
        return {
            byType: stats,
            verified,
            total: totalCount,
            unverified: totalCount - verified,
        };
    }
};
exports.ProfessionalsService = ProfessionalsService;
exports.ProfessionalsService = ProfessionalsService = ProfessionalsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfessionalsService);
//# sourceMappingURL=professionals.service.js.map