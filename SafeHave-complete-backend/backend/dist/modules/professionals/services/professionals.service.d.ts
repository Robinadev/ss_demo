import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, ServiceProviderType } from '@prisma/client';
import { CreateServiceProviderDto } from '../dtos/create-service-provider.dto';
export declare class ProfessionalsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    /**
     * Create or update service provider (counselor, doctor, lawyer, etc.)
     */
    createServiceProvider(dto: CreateServiceProviderDto): Promise<{
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
    }>;
    /**
     * Get all service providers with filtering
     */
    getServiceProviders(page?: number, limit?: number, filters?: {
        type?: ServiceProviderType;
        verified?: boolean;
        city?: string;
        search?: string;
    }): Promise<{
        data: ({
            reviews: {
                id: string;
                createdAt: Date;
                rating: number;
                feedback: string | null;
                serviceProviderId: string;
            }[];
        } & {
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    /**
     * Get service provider by ID
     */
    getServiceProvider(id: string): Promise<{
        assignedCases: {
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
        }[];
        supportCases: {
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
        }[];
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            feedback: string | null;
            serviceProviderId: string;
        }[];
    } & {
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
    }>;
    /**
     * Update service provider
     */
    updateServiceProvider(id: string, dto: Partial<CreateServiceProviderDto>): Promise<{
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
    }>;
    /**
     * Verify service provider (admin only)
     */
    verifyServiceProvider(id: string): Promise<{
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
    }>;
    /**
     * Add review to service provider
     */
    addReview(providerId: string, rating: number, feedback?: string): Promise<{
        id: string;
        createdAt: Date;
        rating: number;
        feedback: string | null;
        serviceProviderId: string;
    }>;
    /**
     * Find specialists by category and location
     */
    findSpecialists(category: string, location?: string, language?: string): Promise<({
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            feedback: string | null;
            serviceProviderId: string;
        }[];
    } & {
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
    })[]>;
    /**
     * Get recommended professionals for case type
     */
    getRecommendedProfessionals(caseType: string, severity: string, location?: string): Promise<({
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            feedback: string | null;
            serviceProviderId: string;
        }[];
    } & {
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
    })[]>;
    /**
     * Get service directory by type
     */
    getServiceDirectory(type?: ServiceProviderType): Promise<Partial<Record<import(".prisma/client").$Enums.ServiceProviderType, ({
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            feedback: string | null;
            serviceProviderId: string;
        }[];
    } & {
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
    })[]>>>;
    /**
     * Search service directory
     */
    searchServiceDirectory(query: string, filters?: {
        type?: ServiceProviderType;
        city?: string;
        language?: string;
    }): Promise<({
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            feedback: string | null;
            serviceProviderId: string;
        }[];
    } & {
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
    })[]>;
    /**
     * Get professionals statistics
     */
    getProfessionalsStats(): Promise<{
        byType: (Prisma.PickEnumerable<Prisma.ServiceProviderGroupByOutputType, "type"[]> & {
            _count: number;
        })[];
        verified: number;
        total: number;
        unverified: number;
    }>;
}
//# sourceMappingURL=professionals.service.d.ts.map