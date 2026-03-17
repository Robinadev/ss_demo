import { ProfessionalsService } from './services/professionals.service';
import { CreateServiceProviderDto } from './dtos/create-service-provider.dto';
import { ServiceProviderType } from '@prisma/client';
export declare class ProfessionalsController {
    private professionalsService;
    constructor(professionalsService: ProfessionalsService);
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
    getServiceProviders(page: number, limit: number, type?: ServiceProviderType, verified?: string, city?: string, search?: string): Promise<{
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
    searchServiceDirectory(query: string, type?: ServiceProviderType, city?: string, language?: string): Promise<({
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
    getRecommended(caseType: string, severity: string, location?: string): Promise<({
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
    getStats(): Promise<{
        byType: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ServiceProviderGroupByOutputType, "type"[]> & {
            _count: number;
        })[];
        verified: number;
        total: number;
        unverified: number;
    }>;
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
    addReview(id: string, body: {
        rating: number;
        feedback?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        rating: number;
        feedback: string | null;
        serviceProviderId: string;
    }>;
}
//# sourceMappingURL=professionals.controller.d.ts.map